import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/auth";
// If you already use lucide-react icons elsewhere you can uncomment these:
// import { LogOut, GraduationCap, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function Profile() {
  const { user, logout, updateBranch, BRANCHES } = useAuth();
  if (!user) return null;

  // Helpers
  const campusLabel =
    BRANCHES.find((b) => b.id === user.branch)?.label || "—";
  const initials = getInitials(user?.name || user?.admissionNo);
  const rows = [
    { k: "Full Name", v: user.name },
    { k: "Admission No.", v: user.admissionNo },
    { k: "Campus", v: campusLabel },
    { k: "Date of Birth", v: user.dob /*, icon: <Calendar size={14}/>*/ },
    { k: "Gender", v: user.gender },
    { k: "Class", v: user.class },
    { k: "Phone", v: user.phone /*, icon: <Phone size={14}/>*/ },
    { k: "Email", v: user.email /*, icon: <Mail size={14}/>*/ },
    { k: "State", v: user.state /*, icon: <MapPin size={14}/>*/ },
    { k: "LGA", v: user.lga },
    { k: "Address", v: user.address },
  ];

  return (
    <div className="container-wide py-6 md:py-10">
      {/* Header / Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(300px_200px_at_10%_0%,#000,transparent)]" />
        <div className="grid gap-5 p-5 md:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-emerald-600 text-white grid place-items-center text-xl md:text-2xl font-semibold shadow-sm ring-4 ring-white/70">
              {initials}
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl leading-tight">
                Student Profile
              </h1>
              <p className="text-sm text-gray-600">
                Welcome back{user?.name ? `, ${safe(user.name)}` : ""}.
              </p>
            </div>
          </div>

          {/* Campus switcher */}
          <div className="lg:justify-self-center">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Campus
            </label>
            <div className="flex items-center gap-2">
              {/* <GraduationCap size={16} className="text-emerald-700" /> */}
              <select
                value={user.branch}
                onChange={(e) => updateBranch(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Switch campus"
                title="Switch campus"
              >
                {BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions (top-right on desktop, flows below on mobile) */}
          <div className="flex items-center gap-2 justify-end">
            <Link
              to="/results"
              className="btn btn-primary whitespace-nowrap"
            >
              Check Results
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 hover:underline"
            >
              {/* <LogOut size={16}/> */}
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Bio card */}
        <section className="card p-6 lg:col-span-2">
          <h3 className="font-semibold text-base md:text-lg mb-4">
            Bio Information
          </h3>

          {/* Compact summary row for small screens */}
          <div className="md:hidden mb-4 grid gap-1 text-sm">
            <p className="font-medium">{safe(user.name) || "—"}</p>
            <p className="text-gray-600">
              {safe(user.admissionNo) || "—"} • {campusLabel}
            </p>
          </div>

          {/* Definition grid */}
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {rows.map(({ k, v /*, icon*/ }) => (
              <div key={k} className="flex">
                <dt className="w-36 shrink-0 text-gray-500">{k}</dt>
                <dd className="font-medium break-words">
                  {/* {icon && <span className="inline-flex -mt-0.5 mr-1 align-middle">{icon}</span>} */}
                  {safe(v) || <span className="text-gray-400">—</span>}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Quick Actions (sticky on desktop) */}
        <aside className="card p-6 lg:sticky lg:top-6 h-max">
          <h3 className="font-semibold text-base md:text-lg">Quick Actions</h3>
          <p className="text-sm text-gray-600 mt-1">
            Jump right to common tasks.
          </p>
          <div className="mt-4 grid gap-2">
            <Link to="/results" className="btn btn-primary w-full">
              View Results
            </Link>
            <Link to="/apply/program" className="btn btn-accent w-full">
              Start New Application
            </Link>
          </div>

          {/* Small helpful card */}
          <div className="mt-5 rounded-xl border bg-emerald-50 p-4 text-xs text-emerald-900">
            <p className="font-semibold mb-1">Tip</p>
            <p>
              Make sure your profile details are correct. If anything looks
              wrong, contact the school admin office to update your records.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function getInitials(name = "") {
  const parts = name
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
  if (!parts.length) return "ST";
  const first = parts[0]?.[0] || "";
  const last = parts[parts.length - 1]?.[0] || "";
  return (first + last).toUpperCase();
}

function safe(v) {
  if (v === null || v === undefined) return "";
  return String(v);
}
