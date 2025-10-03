import React from "react";
import { Link } from "react-router-dom";

const Check = () => (
  <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M9 16.2l-3.5-3.5-1.4 1.4L9 19 20.3 7.7l-1.4-1.4z"/></svg>
);
const Calendar = () => (
  <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 8H6v10h14V10zM6 8h14V6H6v2z"/></svg>
);
const Naira = () => (
  <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M7 4h2l6 8V4h2v8h2v2h-2v6h-2v-6H9v6H7v-6H5v-2h2V4zm2 8h6l-6-8v8z"/></svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" className="size-4"><path fill="currentColor" d="M4 11h12.17l-4.58-4.59L13 5l7 7-7 7-1.41-1.41L16.17 13H4z"/></svg>
);

function Pill({ children }) {
  return <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">{children}</span>;
}

function PathCard({ tag, title, items, cta }) {
  return (
    <article className="card p-5 hover:shadow-lg transition">
      <div className="flex items-center gap-2 text-[hsl(var(--brand))]">
        <Check /> <span className="text-xs font-semibold">{tag}</span>
      </div>
      <h3 className="mt-2 font-semibold text-lg">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-gray-700">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-2">
            <span className="mt-1 size-4 text-[hsl(var(--brand))]"><Check /></span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {cta}
    </article>
  );
}

export default function AdmissionsInfo() {
  return (
    <div className="bg-white">
      {/* Sub-hero header */}
      <section className="relative border-b border-black/5">
        <div className="absolute inset-0 bg-[hsl(var(--brand))] opacity-[.03]" />
        <div className="container-wide py-10 md:py-14">
          <p className="kicker">Admissions</p>
          <h1 className="font-display text-3xl sm:text-4xl mt-2">Apply to Emmanuel Foundation</h1>
          <p className="text-gray-600 mt-2 prose-max">
            A simple, clear process. Choose your campus (Makurdi or Gboko), entry class, and provide the required documents.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <Pill><Calendar /> 2025/2026 Admissions</Pill>
            <Pill><Naira /> Application Fee: ?10,000</Pill>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="container-wide py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Left column */}
          <div className="grid gap-8">
            {/* Paths */}
            <div>
              <h2 className="font-display text-2xl">Entry Pathways</h2>
              <p className="text-gray-600 text-sm mt-1">Requirements depend on your selection.</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <PathCard
                  tag="JSS1 — New"
                  title="Junior Secondary Entry"
                  items={["FSLC (First School Leaving Certificate)", "Makurdi or Gboko campus", "Entrance assessment"]}
                  cta={<Link to="/apply/program" className="btn btn-primary w-full mt-4">Start JSS Application</Link>}
                />
                <PathCard
                  tag="SS1 — New"
                  title="Senior Secondary Entry"
                  items={["FSLC", "Junior WAEC (BECE)", "Choose Stream: Science, Arts, Commercial"]}
                  cta={<Link to="/apply/program" className="btn btn-primary w-full mt-4">Start SS Application</Link>}
                />
                <PathCard
                  tag="JSS/SS — Transfer"
                  title="Transfer Students"
                  items={[
                    "JSS1–JSS3: FSLC + Transfer Letter + Previous School name",
                    "SS1–SS3: FSLC + Junior WAEC + Previous School name",
                  ]}
                  cta={<Link to="/apply/program" className="btn btn-primary w-full mt-4">Start Transfer Application</Link>}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-5">
              <h2 className="font-semibold">Timeline</h2>
              <div className="mt-3 grid sm:grid-cols-3 gap-3">
                {[
                  ["Applications Open", "Jan 10, 2025"],
                  ["Entrance Assessments", "Mar 15–29, 2025"],
                  ["Admissions List", "Apr 10, 2025"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-gray-200 p-3">
                    <div className="text-xs text-gray-500">{k}</div>
                    <div className="font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3">Dates may adjust slightly; you’ll be notified via email/SMS.</p>
            </div>

            {/* Fees */}
            <div className="card p-5">
              <h2 className="font-semibold">Fees</h2>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="text-xs text-gray-500">Application Fee</div>
                  <div className="font-semibold">?10,000</div>
                </div>
                <div className="rounded-lg border border-gray-200 p-3">
                  <div className="text-xs text-gray-500">Acceptance (upon offer)</div>
                  <div className="font-semibold">Notified in offer</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Fees are non-refundable. Secure card, bank transfer, and USSD options available at payment.
              </p>
            </div>

            {/* FAQs / Notes */}
            <div className="card p-5">
              <h2 className="font-semibold">Helpful Notes</h2>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Uploads must be PDF/JPG/PNG and not exceed 2MB each.</li>
                <li>• Ensure names and dates match official certificates.</li>
                <li>• For transfers, ensure your previous school details are accurate.</li>
              </ul>
            </div>
          </div>

          {/* Right column (sticky) */}
          <aside className="lg:sticky lg:top-24 h-max">
            <div className="card p-5">
              <h3 className="font-semibold">Get Started</h3>
              <p className="text-sm text-gray-600 mt-1">Pick your campus and class in a few clicks.</p>
              <Link to="/apply/program" className="btn btn-primary w-full mt-3">Begin Application</Link>
              <Link to="/student-login" className="btn bg-gray-100 font-semibold hover:bg-gray-200 w-full mt-2">Student Login</Link>
              <hr className="my-4" />
              <div className="text-xs text-gray-600 grid gap-2">
                <div className="flex items-center gap-2"><Calendar /> Mon–Fri: 8:00–16:00</div>
                <div className="flex items-center gap-2"><Naira /> Paystack/Flutterwave supported</div>
              </div>
              <a href="#requirements" className="text-[hsl(var(--brand))] text-sm font-semibold inline-flex items-center gap-1 mt-4">
                View requirements <Arrow />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Requirements anchor (nice spacing for anchor jump) */}
      <section id="requirements" className="container-wide pb-12 scroll-section">
        <div className="rounded-2xl border border-gray-200 p-5 md:p-6 bg-gray-50">
          <h2 className="font-display text-2xl">All Requirements (Quick View)</h2>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-xl bg-white border border-gray-200 p-4">
              <h4 className="font-semibold">New Students</h4>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>• JSS1: FSLC</li>
                <li>• SS1: FSLC + Junior WAEC (BECE)</li>
              </ul>
            </div>
            <div className="rounded-xl bg-white border border-gray-200 p-4">
              <h4 className="font-semibold">Transfer Students</h4>
              <ul className="mt-2 text-sm text-gray-700 space-y-1">
                <li>• JSS1–JSS3: FSLC + Transfer Letter + Previous School</li>
                <li>• SS1–SS3: FSLC + Junior WAEC (BECE) + Previous School</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Files must be clear scans; unclear documents may delay processing.
          </div>
        </div>
      </section>
    </div>
  );
}
