import React from "react";
import useReveal from "../../hooks/useReveal";
import heroImg from "../../assets/hero.jpg"; // optional; replace or remove
import { Link } from "react-router-dom";

export default function Landing() {
  useReveal();

  return (
    <div>
      {/* ===== HERO ===== */}
      <section
        className="relative"
        style={{
          backgroundImage: heroImg ? `url(${heroImg})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className={`absolute inset-0 ${heroImg ? "bg-black/55" : "bg-[hsl(var(--brand))]"}`} />
        {/* Subtle light blobs */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(900px 400px at 10% 20%, #fff 0, transparent 60%), radial-gradient(700px 400px at 90% 30%, #fff 0, transparent 60%)",
          }}
        />
        <div className="relative container-wide min-h-[70vh] md:min-h-[78vh] py-16 md:py-24 text-white grid">
          <div className="place-self-center text-center prose-max px-2">
            <span className="kicker reveal">Makurdi • Gboko • Benue State</span>
            <h1 className="font-display leading-tight mt-3 reveal delay-1 text-4xl sm:text-5xl md:text-6xl">
              Emmanuel Foundation Secondary School
            </h1>
            <p className="mt-4 text-white/90 reveal delay-2 text-base sm:text-lg">
              Excellence, discipline, and character — preparing students for WAEC/NECO and life.
            </p>
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 reveal delay-3">
              <Link to="/admissions/info" className="btn btn-accent w-full sm:w-auto">Apply for Admission</Link>
              <Link to="/results" className="btn btn-ghost w-full sm:w-auto">Access Results</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS STRIP ===== */}
      <section className="bg-white border-y border-black/5">
        <div className="container-wide py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { t: "Small Class Size", s: "Avg. 25 students" },
            { t: "Qualified Staff", s: "60+ certified teachers" },
            { t: "STEM & Clubs", s: "Robotics • Debate • ICT" },
            { t: "Strong Values", s: "Discipline & leadership" },
          ].map((x) => (
            <div key={x.t} className="flex items-start gap-3 reveal">
              <div className="size-9 shrink-0 rounded-full bg-[hsl(var(--brand))] text-white grid place-items-center font-bold">✓</div>
              <div>
                <p className="font-semibold">{x.t}</p>
                <p className="text-sm text-gray-600">{x.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROGRAMS / ENTRY PATHS ===== */}
      <section className="container-wide py-14 md:py-16">
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl reveal">Admissions Pathways</h2>
          <p className="text-gray-600 mt-2 reveal">Choose your entry route and campus.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          {[
            {
              tag: "JSS1 — New",
              title: "Junior Secondary Entry",
              points: ["FSLC required", "Makurdi or Gboko", "Entrance assessment"],
              href: "/apply/program",
            },
            {
              tag: "SS1 — New",
              title: "Senior Secondary Entry",
              points: ["FSLC + Junior WAEC (BECE)", "Stream: Science/Arts/Commercial", "Makurdi or Gboko"],
              href: "/apply/program",
            },
            {
              tag: "Transfer (JSS/SS)",
              title: "Transfer Admissions",
              points: ["From JSS1–JSS3: FSLC + Transfer Letter", "From SS1–SS3: FSLC + Junior WAEC", "Previous school name"],
              href: "/apply/program",
            },
          ].map((c) => (
            <article key={c.title} className="card p-6 hover:shadow-lg transition reveal">
              <span className="badge badge-accent">{c.tag}</span>
              <h3 className="font-semibold text-lg mt-2">{c.title}</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-1">
                {c.points.map((p) => <li key={p}>• {p}</li>)}
              </ul>
              <Link to={c.href} className="btn btn-primary mt-4 w-full">Start Application</Link>
            </article>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="container-wide py-14 md:py-16 scroll-section">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          <div className="reveal prose-max">
            <h2 className="font-display text-3xl sm:text-4xl">About Emmanuel Foundation</h2>
            <p className="text-gray-700 mt-3 text-sm sm:text-base">
              For over two decades, we’ve nurtured bright minds with a balanced focus on academics, discipline,
              and values. Our labs, clubs, and mentorship programs build confidence and real-world skills.
            </p>
            <ul className="mt-5 text-gray-700 space-y-2 text-sm sm:text-base">
              <li>• State-of-the-art science & ICT labs</li>
              <li>• Leadership & character development</li>
              <li>• Strong alumni network and outcomes</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Link to="/admissions/info" className="btn btn-primary">Admissions Info</Link>
              <a href="#contact" className="btn bg-gray-100 font-semibold hover:bg-gray-200">Contact Us</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 reveal delay-1">
            <div className="card overflow-hidden h-40 sm:h-48 md:h-56">
              <div className="img-cover bg-gradient-to-br from-blue-200 to-blue-100 h-full" />
            </div>
            <div className="card overflow-hidden h-40 sm:h-48 md:h-56">
              <div className="img-cover bg-gradient-to-br from-amber-200 to-amber-100 h-full" />
            </div>
            <div className="card overflow-hidden h-40 sm:h-48 md:h-56">
              <div className="img-cover bg-gradient-to-br from-emerald-200 to-emerald-100 h-full" />
            </div>
            <div className="card overflow-hidden h-40 sm:h-48 md:h-56">
              <div className="img-cover bg-gradient-to-br from-fuchsia-200 to-fuchsia-100 h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAND ===== */}
      <section className="bg-[hsl(var(--brand))] text-white">
        <div className="container-wide py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["Years of Excellence", "25+"],
            ["Certified Teachers", "60+"],
            ["Avg. Class Size", "25"],
            ["Clubs & Societies", "15+"],
          ].map(([k, v]) => (
            <div key={k} className="reveal">
              <div className="text-3xl font-extrabold">{v}</div>
              <div className="text-sm text-white/80 mt-1">{k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section id="blog" className="bg-gray-50 border-y border-black/5 scroll-section">
        <div className="container-wide py-14 md:py-16">
          <div className="flex items-end justify-between gap-4 reveal">
            <h2 className="font-display text-3xl sm:text-4xl">From Our Blog</h2>
            <a href="#" className="hidden sm:inline text-[hsl(var(--brand))] font-semibold">View all →</a>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mt-6">
            {[
              { title: "Entrance Exam Tips for JSS1 Applicants", date: "Sep 15, 2025" },
              { title: "How We Support WAEC/NECO Success", date: "Sep 01, 2025" },
              { title: "Clubs Spotlight: Robotics & Debate", date: "Aug 20, 2025" },
            ].map((post, i) => (
              <article key={i} className="card overflow-hidden transition hover:-translate-y-1 hover:shadow-xl reveal delay-1">
                <div className="h-40 sm:h-44 md:h-48 bg-gradient-to-br from-blue-200 to-blue-100" />
                <div className="p-4 sm:p-5">
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--brand))/0.08] text-[hsl(var(--brand))]">{post.date}</span>
                  <h3 className="font-semibold mt-2 text-base sm:text-lg">{post.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Helpful insights for students and parents to thrive at Emmanuel Foundation.
                  </p>
                  <a href="#" className="text-[hsl(var(--brand))] font-semibold inline-block mt-3">Read more →</a>
                </div>
              </article>
            ))}
          </div>
          <div className="sm:hidden mt-4">
            <a href="#" className="text-[hsl(var(--brand))] font-semibold">View all →</a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonials" className="bg-white scroll-section">
        <div className="container-wide py-14 md:py-16">
          <h2 className="font-display text-3xl sm:text-4xl text-center reveal">What Parents Say</h2>
          <div className="mt-8 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            <div className="flex gap-4 min-w-full px-2">
              {[
                { name: "Mrs. Adeyemi", text: "My daughter’s confidence and grades improved tremendously. The teachers truly care." },
                { name: "Mr. Okonkwo", text: "Discipline with kindness — Emmanuel Foundation builds character and excellence." },
                { name: "Mrs. Hassan", text: "The labs, clubs, and mentorship are top-notch. Highly recommend the school!" },
                { name: "Mr. Ibrahim", text: "Excellent communication with parents and strong academic support for students." },
              ].map((t, i) => (
                <figure key={i} className="snap-center shrink-0 w-[88%] sm:w-[340px] md:w-[380px] card p-5 sm:p-6 reveal">
                  <div className="text-3xl leading-none">“</div>
                  <blockquote className="text-gray-700 mt-2 text-sm sm:text-base">{t.text}</blockquote>
                  <figcaption className="mt-4 font-semibold text-[hsl(var(--brand))]">— {t.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section id="contact" className="relative overflow-hidden scroll-section">
        <div className="absolute inset-0 bg-[hsl(var(--brand))]" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(600px 300px at 20% 30%, #fff, transparent 60%)" }} />
        <div className="relative container-wide py-14 md:py-16 text-white">
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="reveal prose-max">
              <h2 className="font-display text-3xl sm:text-4xl">Ready to Enroll?</h2>
              <p className="text-white/90 mt-2 text-sm sm:text-base">Start your application or contact our admissions office for guidance.</p>
            </div>
            <div className="reveal delay-1 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Link to="/admissions/info" className="btn btn-accent">Start Application</Link>
              <a href="mailto:info@emmanuelfoundation.edu.ng" className="btn btn-ghost">Email Admissions</a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Apply (mobile) */}
      <a
        href="/admissions/info"
        className="fixed bottom-5 right-5 md:hidden btn btn-accent shadow-lg safe-bottom"
        aria-label="Apply now"
      >
        Apply
      </a>
    </div>
  );
}
