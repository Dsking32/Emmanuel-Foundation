import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[hsl(var(--brand-600))]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/15"></div>

        <div className="container-wide relative py-16 md:py-24 text-center">
          <span className="badge badge-accent mb-4">Founded on Excellence & Character</span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Emmanuel Foundation Secondary School
          </h1>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">
            Nurturing bright minds with strong values. Apply for admission, view the admission list, and check results — all online.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/admissions/apply" className="btn btn-primary">Apply for 2025/2026</Link>
            <Link to="/admissions/status" className="btn btn-ghost">Check Admission List</Link>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="container-wide py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <article className="card p-6">
            <div className="size-10 rounded-lg bg-[hsl(var(--brand))/0.08] grid place-items-center mb-4">🎓</div>
            <h3 className="font-bold text-lg mb-2">Admissions</h3>
            <p className="text-[hsl(var(--muted))]">Simple online application with guided steps. Receive email updates.</p>
            <Link to="/admissions/apply" className="mt-4 inline-block text-[hsl(var(--brand))] font-semibold">Start Application →</Link>
          </article>
          <article className="card p-6">
            <div className="size-10 rounded-lg bg-[hsl(var(--brand))/0.08] grid place-items-center mb-4">📜</div>
            <h3 className="font-bold text-lg mb-2">Admission List</h3>
            <p className="text-[hsl(var(--muted))]">Instantly check admission status by email or application ID.</p>
            <Link to="/admissions/status" className="mt-4 inline-block text-[hsl(var(--brand))] font-semibold">Check Status →</Link>
          </article>
          <article className="card p-6">
            <div className="size-10 rounded-lg bg-[hsl(var(--brand))/0.08] grid place-items-center mb-4">📊</div>
            <h3 className="font-bold text-lg mb-2">Results</h3>
            <p className="text-[hsl(var(--muted))]">Secure results portal with session filtering and printable sheets.</p>
            <Link to="/results" className="mt-4 inline-block text-[hsl(var(--brand))] font-semibold">View Results →</Link>
          </article>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="container-wide pb-10">
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-3">Announcements</h3>
          <ul className="space-y-2 text-[hsl(var(--muted))]">
            <li>• 2025/2026 Admissions now open.</li>
            <li>• Orientation for new students: Oct 15, 2025.</li>
            <li>• PTA Meeting: Nov 2, 2025.</li>
          </ul>
        </div>
      </section>

      {/* STATS */}
      <section className="container-wide pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Years of Excellence", value: "25+" },
            { label: "Certified Teachers", value: "60+" },
            { label: "Average Class Size", value: "25" },
            { label: "Alumni Universities", value: "50+" },
          ].map(s => (
            <div key={s.label} className="card p-5 text-center">
              <div className="text-3xl font-extrabold text-[hsl(var(--brand))]">{s.value}</div>
              <div className="text-xs mt-1 text-[hsl(var(--muted))]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
