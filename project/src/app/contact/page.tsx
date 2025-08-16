import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | sandpiper",
  description:
    "Get in touch with the sandpiper team. Email, phone, address, and a quick contact form.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            Contact Us
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            We’d love to hear from you
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Questions, feedback, or ideas for helping seniors better? Reach out anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-5">
          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            <ContactCard title="Email">
              <div className="text-gray-900">hello@sandpiper.example</div>
              <div className="text-sm text-gray-600">We reply within 1–2 business days.</div>
            </ContactCard>

            <ContactCard title="Phone">
              <div className="text-gray-900">+91 98765 43210</div>
              <div className="text-sm text-gray-600">Mon–Fri, 10:00–18:00 IST</div>
            </ContactCard>

            <ContactCard title="Address">
              <div className="text-gray-900">sandpiper Project Lab</div>
              <div className="text-gray-700">4th Floor, Tech Block</div>
              <div className="text-gray-700">Green Valley College</div>
              <div className="text-gray-700">Pune, Maharashtra 411001</div>
              <div className="text-sm text-gray-600">India</div>
            </ContactCard>

            <ContactCard title="Support Hours">
              <div className="text-gray-900">Mon–Fri: 10:00–18:00 IST</div>
              <div className="text-gray-900">Sat: 11:00–15:00 IST</div>
              <div className="text-gray-700">Sun & holidays: Email only</div>
            </ContactCard>

            <ContactCard title="Social">
              <div className="text-gray-900">@sandpiper_app</div>
              <div className="text-sm text-gray-600">Instagram · X · LinkedIn</div>
            </ContactCard>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Send a message</h2>
              <p className="mt-2 text-sm text-gray-600">
                Fill this out and we’ll get back to you shortly.
              </p>

              <form action="" method="post" className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First name</label>
                    <input
                      name="firstName"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last name</label>
                    <input
                      name="lastName"
                      required
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    name="subject"
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                    placeholder="I have a question about…"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-indigo-500 focus:ring-2"
                    placeholder="Write your message here…"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" name="consent" className="h-4 w-4 rounded border-gray-300" required />
                    I agree to be contacted regarding my inquiry.
                  </label>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Send message
                  </button>
                </div>
              </form>

              <p className="mt-4 text-xs text-gray-500">
                By submitting, you agree to our terms and acknowledge our privacy policy.
              </p>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-gray-200">
          <div className="flex h-72 items-center justify-center bg-gray-50 text-sm text-gray-500">
            Map placeholder
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-1 text-sm">{children}</div>
    </div>
  );
}
