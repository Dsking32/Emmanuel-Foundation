import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const linkBase = "px-3 py-2 rounded-md text-sm font-medium";
const linkActive = "bg-white/10 text-white";
const linkIdle = "text-white/90 hover:bg-white/10";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[hsl(var(--brand))] text-white shadow">
      <nav className="container-wide h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {/* Crest placeholder (swap with your logo later) */}
          <div className="size-8 rounded-full bg-white/90 grid place-items-center text-[hsl(var(--brand))] font-bold">E</div>
          <div className="leading-tight">
            <p className="font-extrabold">Emmanuel Foundation</p>
            <p className="text-xs text-white/80 -mt-0.5">Secondary School</p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Home</NavLink>
          <NavLink to="/admissions/apply" className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Apply</NavLink>
          <NavLink to="/admissions/status" className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Admission List</NavLink>
          <NavLink to="/results" className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Results</NavLink>
          <Link to="/contact" className="btn btn-accent ml-2">Contact</Link>
        </div>

        {/* Mobile */}
        <button
          onClick={() => setOpen(v => !v)}
          className="md:hidden inline-flex items-center justify-center size-10 rounded-lg hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <span className="i">☰</span>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[hsl(var(--brand))] border-t border-white/10">
          <div className="container-wide py-3 grid gap-1">
            <NavLink onClick={()=>setOpen(false)} to="/" end className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Home</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/admissions/apply" className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Apply</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/admissions/status" className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Admission List</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/results" className={({isActive}) => `${linkBase} ${isActive?linkActive:linkIdle}`}>Results</NavLink>
            <Link onClick={()=>setOpen(false)} to="/contact" className="btn btn-accent mt-1 w-fit">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
