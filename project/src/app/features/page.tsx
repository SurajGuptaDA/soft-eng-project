import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | MediMate",
  description:
    "Track medicines, get timely reminders, order refills to your doorstep, and book doctor consultations—without hassle.",
};

type Feature = {
  title: string;
  desc: string;
  bullets: string[];
  icon: React.ReactNode;
};

function PillIcon() {
  return (
    <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" d="M3.5 14.5 14.5 3.5a4.95 4.95 0 1 1 7 7L10.5 21.5a4.95 4.95 0 1 1-7-7z" />
      <path strokeWidth="1.5" d="M8 16l8-8" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" d="M15 17H5a4 4 0 0 0 4-4V9a5 5 0 0 1 10 0v4l2 2h-6" />
      <path strokeWidth="1.5" d="M9 17a3 3 0 0 0 6 0" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg className="h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeWidth="1.5" d="M16 2v3M8 2v3M3 8h18M5 8v12h14V8" />
      <rect x="7" y="11" width="4" height="3" rx="0.5" />
      <rect x="13" y="11" width="4" height="3" rx="0.5" />
    </svg>
  );
}

const features: Feature[] = [
  {
    title: "Medicine Tracking",
    desc:
      "Log medicines, doses, and schedules in one place—stay organized and never miss a dose.",
    bullets: [
      "Custom schedules (daily, weekly, PRN)",
      "Dose, frequency, and notes per medicine",
      "Refill and low-supply alerts",
    ],
    icon: <PillIcon />,
  },
  {
    title: "Smart Reminders",
    desc:
      "Timely reminders tell you exactly when to take your medicines, with flexible snooze and follow-ups.",
    bullets: ["Push and in-app alerts", "Snooze and missed-dose handling", "Timezone-aware reminders"],
    icon: <BellIcon />,
  },
  {
    title: "Doorstep Delivery",
    desc:
      "Order medicines in a few taps and get them delivered to your home—fast and reliable.",
    bullets: ["Real-time availability", "Secure checkout and COD options", "Order tracking updates"],
    icon: <TruckIcon />,
  },
  {
    title: "Doctor Consults & Appointments",
    desc:
      "Find doctors, book appointments, and join consultations without the back-and-forth.",
    bullets: ["Specialty search and filters", "Instant or scheduled bookings", "Video consult support"],
    icon: <CalendarIcon />,
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Everything for smarter health routines
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Track meds, get reminders, order refills, and book doctors—hassle-free.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600">{f.desc}</p>
              <ul className="mt-4 space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-indigo-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Sign-Up Now
          </a>
          {/* <a
            href="/consult"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Book a consult
          </a> */}
        </div>
      </section>

      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <StatCard label="On-time doses" value="95%" note="avg. adherence with reminders" />
            <StatCard label="Delivery coverage" value="24/7" note="major city service" />
            <StatCard label="Doctors onboard" value="1,200+" note="across specialties" />
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="text-3xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
      {note ? <div className="mt-2 text-xs text-gray-500">{note}</div> : null}
    </div>
  );
}
