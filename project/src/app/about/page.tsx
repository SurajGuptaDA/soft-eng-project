import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MediMate",
  description:
    "A college Software Engineering project focused on helping senior citizens manage medicines, reminders, delivery, and doctor consultations. Built with Next.js, TypeScript, Tailwind, and Flask backend.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            About Us
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Helping Seniors Live Healthier, With Less Hassle
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            This is a college project for our Software Engineering course, exploring practical ways
            to support senior citizens with medication management, reminders, doorstep delivery, and easy doctor consultations.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Why this project</h2>
            <p className="mt-3 text-gray-600">
              Many seniors struggle with complex schedules, refills, and appointments. We designed this app to make daily health tasks simple, clear, and dependable—so families worry less, and seniors feel more in control.
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Medication tracking with friendly reminders
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Doorstep medicine delivery for convenience
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Seamless doctor consults and appointment booking
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">What we’re learning</h2>
            <p className="mt-3 text-gray-600">
              We’re applying Software Engineering principles: clear requirements, iterative design,
              accessible UI, robust APIs, testing, and deployment—aiming for a reliable, real-world solution.
            </p>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                User-centered design for senior accessibility
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                API design, validation, and security best practices
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                Testing, observability, and performance optimization
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Tech Stack</h2>
          <p className="mt-3 text-gray-600">
            Built with a modern, pragmatic stack for speed, reliability, and a great developer experience.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TechItem title="Next.js (App Router)">
              Server-first React framework for routing, SSR/SSG, and great DX.
            </TechItem>
            <TechItem title="TypeScript">
              Safer code with static types and clearer contracts.
            </TechItem>
            <TechItem title="Tailwind CSS">
              Utility-first styling for fast, consistent UI.
            </TechItem>
            <TechItem title="Flask (Backend)">
              Python microframework for APIs, business logic, and integrations.
            </TechItem>
            <TechItem title="REST APIs + JSON">
              Clean endpoints for medicines, reminders, orders, and appointments.
            </TechItem>
            <TechItem title="Auth & Validation">
              JWT/session auth, schema validation, and input sanitization.
            </TechItem>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">How it fits together</h2>
          <p className="mt-3 text-gray-600">
            The Next.js app handles UI, forms, and data fetching, while Flask powers backend operations like scheduling reminders, managing orders, and handling doctor bookings. The two communicate over secure REST APIs.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <IntegrationItem title="Frontend responsibilities" points={[
              "Pages: features, about, consults, orders, profile",
              "Forms with validation and accessible components",
              "Caching and optimistic updates for snappy UX",
            ]} />
            <IntegrationItem title="Backend responsibilities" points={[
              "CRUD for medicines, schedules, appointments, orders",
              "Reminder jobs, notifications, and webhooks",
              "Role-based access, audit logs, and rate limiting",
            ]} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="/features"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            See features
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Contact team
          </a>
        </div>
      </section>
    </main>
  );
}

function TechItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-1 text-sm text-gray-600">{children}</div>
    </div>
  );
}

function IntegrationItem({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-gray-700">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-500" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
