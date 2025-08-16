import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | MediMate",
  description:
    "Get help with medicine tracking, reminders, delivery, and doctor consultations.",
};

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Help Center
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Quick answers for tracking medicines, reminders, delivery, and doctor bookings.
          </p>
        </div>

        {/* Search (UI only) */}
        <div className="mx-auto mt-8 max-w-2xl">
          <label className="sr-only" htmlFor="help-search">Search help</label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.2-4.2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input
              id="help-search"
              placeholder="Search: reminders, delivery, consults…"
              className="w-full border-0 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <FAQCard
            title="Medicine Tracking"
            items={[
              {
                q: "How do I add a medicine?",
                a: "Go to Medicines → Add Medicine → enter name, dose, frequency, and start date, then save.",
              },
              {
                q: "Can I set custom schedules?",
                a: "Yes. Choose daily, weekly, or ‘as needed (PRN)’, then set times like 8:00, 14:00, 20:00.",
              },
              {
                q: "How do I edit or stop a medicine?",
                a: "Open the medicine → Edit to change details, or Pause/Archive to stop reminders.",
              },
            ]}
          />

          <FAQCard
            title="Reminders"
            items={[
              {
                q: "How do reminders work?",
                a: "We trigger alerts at your set times. You can take, snooze, or mark as missed.",
              },
              {
                q: "What if I’m traveling?",
                a: "Turn on timezone-aware reminders in Settings → Notifications to adjust times automatically.",
              },
              {
                q: "I’m not receiving alerts.",
                a: "Check app notification permissions, ensure do-not-disturb is off, and verify your schedule times.",
              },
            ]}
          />

          <FAQCard
            title="Delivery & Orders"
            items={[
              {
                q: "How to order medicines?",
                a: "Open Delivery → Search or upload prescription → add to cart → checkout.",
              },
              {
                q: "What are delivery times?",
                a: "Standard: 24–48h. Express options may be available at checkout depending on location.",
              },
              {
                q: "How do I track my order?",
                a: "Go to Orders → select order → view live status and ETA updates.",
              },
            ]}
          />

          <FAQCard
            title="Doctor Consults"
            items={[
              {
                q: "How do I book a consult?",
                a: "Go to Consults → pick specialty → select a doctor → choose a slot → confirm.",
              },
              {
                q: "Can I do video calls?",
                a: "Yes, for supported doctors. You’ll see a Join Call button 5 minutes before the slot.",
              },
              {
                q: "How to reschedule?",
                a: "Open the appointment → Reschedule. Some doctors require 12–24h notice.",
              },
            ]}
          />

          <FAQCard
            title="Account & Privacy"
            items={[
              {
                q: "How do I update my profile?",
                a: "Profile → Edit → change name, phone, emergency contact, and preferences.",
              },
              {
                q: "Is my data secure?",
                a: "We use encrypted transport and secure storage. Only authorized roles can access sensitive info.",
              },
              {
                q: "How to delete my account?",
                a: "Settings → Account → Delete Account. This will remove medicines, schedules, and bookings.",
              },
            ]}
          />

          <FAQCard
            title="Using with Seniors"
            items={[
              {
                q: "Can family help manage?",
                a: "Yes. Invite a caregiver in Profile → Care Circle to share reminders and updates.",
              },
              {
                q: "Large text and contrast?",
                a: "Enable Accessibility Mode in Settings for bigger text and higher contrast UI.",
              },
              {
                q: "Voice reminders?",
                a: "Turn on Voice Alerts in Notifications to get spoken reminders at dose times.",
              },
            ]}
          />
        </div>

        {/* Contact & Quick Links */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <HelpCard title="Still stuck?">
            <p className="text-sm text-gray-600">
              Email us at support@medimate.example or call +91 98765 43210.
            </p>
            <a
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Contact Support
            </a>
          </HelpCard>

          <HelpCard title="Guides">
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              <li>- Getting started with medicines</li>
              <li>- Setting up reminders</li>
              <li>- Booking your first consult</li>
            </ul>
          </HelpCard>

          <HelpCard title="System Status">
            <p className="text-sm text-gray-600">All systems operational.</p>
            <p className="text-xs text-gray-500">Last updated just now.</p>
          </HelpCard>
        </div>
      </section>
    </main>
  );
}

type FAQ = { q: string; a: string };
function FAQCard({ title, items }: { title: string; items: FAQ[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="mt-4 divide-y divide-gray-100">
        {items.map((it) => (
          <details key={it.q} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-gray-900">
              {it.q}
              <span className="ml-4 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 group-open:hidden">Show</span>
              <span className="ml-4 hidden rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 group-open:inline">Hide</span>
            </summary>
            <p className="mt-2 text-sm text-gray-700">{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function HelpCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-6">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}
