import React, { useEffect, useRef, useState } from "react";
import { Outlet, Link, NavLink, useLocation } from "react-router-dom";

const cx = (...a) => a.filter(Boolean).join(" ");

function SectionLink({ onLanding, id, children, className }) {
  const href = onLanding ? `#${id}` : `/#${id}`;
  return (
    <a href={href} className={className}>
      <span className="relative inline-block">
        {children}
        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[hsl(var(--brand))] transition-all duration-300 group-hover:w-full" />
      </span>
    </a>
  );
}

export default function RootLayout() {
  const { pathname, hash } = useLocation();
  const onLanding = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);

  // shadow on scroll for desktop header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile panel on route/hash change
  useEffect(() => { setOpen(false); }, [pathname, hash]);

  // close when clicking outside panel (not strictly needed for full-screen, but safe)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // lock page scroll when mobile menu is open
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  const linkBase = "group relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-[hsl(var(--brand))] transition";
  const activeLink = "text-[hsl(var(--brand))]";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header (light, always readable) */}
      <header
        className={cx(
          "sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition",
          scrolled ? "shadow-sm border-gray-200" : "border-gray-200"
        )}
      >
        <nav className="container-wide h-16 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-[hsl(var(--brand))] grid place-items-center text-white font-extrabold">E</div>
            <div className="leading-tight">
              <p className="font-extrabold font-display tracking-tight text-[hsl(var(--brand))]">
                Emmanuel Foundation
              </p>
              <p className="text-[11px] text-gray-500 -mt-0.5">Secondary School</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink end to="/" className={({ isActive }) => cx(linkBase, isActive && activeLink)}>
              <span className="relative inline-block">
                Home
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[hsl(var(--brand))] transition-all duration-300 group-hover:w-full" />
              </span>
            </NavLink>

            <SectionLink onLanding={onLanding} id="about" className={linkBase}>About</SectionLink>
            <SectionLink onLanding={onLanding} id="blog" className={linkBase}>Blog</SectionLink>
            <SectionLink onLanding={onLanding} id="contact" className={linkBase}>Contact Us</SectionLink>

            <NavLink to="/profile" className={({ isActive }) => cx(linkBase, isActive && activeLink)}>
              <span className="relative inline-block">
                Student Profile
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[hsl(var(--brand))] transition-all duration-300 group-hover:w-full" />
              </span>
            </NavLink>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/admissions/info" className="btn btn-accent">Apply</Link>
            <Link to="/results" className="btn btn-primary">Results</Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center size-10 rounded-lg text-[hsl(var(--brand))] hover:bg-gray-100"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-fullscreen"
          >
            {open ? "?" : "?"}
          </button>
        </nav>
      </header>

      {/* FULL-SCREEN MOBILE MENU (white background covering hero) */}
      <div
        id="mobile-fullscreen"
        className={cx(
          "md:hidden fixed inset-0 z-50 transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div
          ref={panelRef}
          className={cx(
            "absolute inset-0 bg-white flex flex-col",
            "animate-in fade-in duration-150"
          )}
        >
          {/* Top bar inside overlay */}
          <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-[hsl(var(--brand))] grid place-items-center text-white font-bold">E</div>
              <span className="font-display text-lg text-[hsl(var(--brand))]">Emmanuel Foundation</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="size-10 -m-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Close menu"
            >
              ?
            </button>
          </div>

          {/* Menu list */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-4 grid gap-2">
              <NavLink
                end
                to="/"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cx("px-3 py-3 rounded-lg text-base font-medium",
                    isActive ? "bg-gray-100 text-[hsl(var(--brand))]" : "text-gray-800 hover:bg-gray-50")
                }
              >
                Home
              </NavLink>

              <a href="/#about" onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50">
                About
              </a>
              <a href="/#blog" onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50">
                Blog
              </a>
              <a href="/#contact" onClick={() => setOpen(false)} className="px-3 py-3 rounded-lg text-base font-medium text-gray-800 hover:bg-gray-50">
                Contact Us
              </a>

              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cx("px-3 py-3 rounded-lg text-base font-medium",
                    isActive ? "bg-gray-100 text-[hsl(var(--brand))]" : "text-gray-800 hover:bg-gray-50")
                }
              >
                Student Profile
              </NavLink>
            </div>

            <div className="px-4 pt-2 pb-6 grid gap-2">
              <Link to="/admissions/info" onClick={() => setOpen(false)} className="btn btn-accent w-full">Apply</Link>
              <Link to="/results" onClick={() => setOpen(false)} className="btn btn-primary w-full">Results</Link>
            </div>
          </div>

          {/* Footer inside overlay */}
          <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-500">
            © {new Date().getFullYear()} Emmanuel Foundation
          </div>
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1"><Outlet /></main>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white">
        <div className="container-wide py-12 grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl leading-none">Emmanuel Foundation</p>
            <p className="text-sm text-white/70 mt-1">Secondary School</p>
            <p className="text-sm text-white/70 mt-4">Excellence, discipline & character for modern learners.</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Explore</p>
            <ul className="text-white/90 text-sm space-y-1">
              <li><Link to="/admissions/info" className="hover:underline">Admissions</Link></li>
              <li><Link to="/results" className="hover:underline">Check Results</Link></li>
              <li><a href="/#blog" className="hover:underline">Blog</a></li>
              <li><a href="/#contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Contact</p>
            <p className="text-sm text-white/90">info@emmanuelfoundation.edu.ng</p>
            <p className="text-sm text-white/90">+234 800 000 0000</p>
            <p className="text-sm text-white/90">City, State, Nigeria</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Newsletter</p>
            <form onSubmit={(e)=>{e.preventDefault(); alert("Subscribed (demo)");}} className="grid gap-2">
              <input className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 placeholder-white/60" placeholder="Your email" />
              <button className="btn btn-accent">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container-wide py-4 text-xs text-white/60">
            © {new Date().getFullYear()} Emmanuel Foundation Secondary School. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
