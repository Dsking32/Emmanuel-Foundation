// src/pages/student/StudentLogin.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../app/auth";

const CAMPUSES = [
  { id: "makurdi", label: "Makurdi" },
  { id: "gboko", label: "Gboko" },
];

export default function StudentLogin() {
  const { login } = useAuth();                // âœ… use provider login
  const navigate = useNavigate();
  const { state } = useLocation();

  const [campus, setCampus] = React.useState("");
  const [schoolNo, setSchoolNo] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [err, setErr] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!campus || !schoolNo.trim() || !dob) {
      setErr("Please select campus, enter School Number, and choose Date of Birth.");
      return;
    }

    setLoading(true);
    try {
      // ðŸ”‘ Map UI fields to what AuthProvider expects
      await login({
        admissionNo: schoolNo.trim(),
        dob,           // YYYY-MM-DD
        branch: campus // must match ids in BRANCHES (auth.jsx)
      });

      // Go to the originally intended page if any, else /profile
      const to = state?.from?.pathname || "/profile";
      navigate(to, { replace: true });
    } catch (ex) {
      setErr(ex.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand / info panel (optional) */}
      <section className="hidden lg:block bg-blue-600 text-white p-10">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">Student Portal</h1>
          <p className="mt-3 text-emerald-50/90">
            Sign in to view your profile and results.
          </p>
        </div>
      </section>

      {/* Form panel */}
      <main className="flex items-center justify-center p-6">
        <form onSubmit={onSubmit} className="w-full max-w-md card p-6 space-y-4">
          <div>
            <p className="kicker text-xs tracking-wide text-emerald-700">Welcome back</p>
            <h2 className="font-display text-2xl mt-1">Student Login</h2>
            <p className="text-sm text-gray-600">Enter your details to continue.</p>
          </div>

          {err && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-3 py-2 text-sm">
              {err}
            </div>
          )}

          <label className="grid gap-1">
            <span className="text-sm font-semibold">Campus</span>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Select campus</option>
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-semibold">School Number</span>
            <input
              value={schoolNo}
              onChange={(e) => setSchoolNo(e.target.value)}
              placeholder="e.g. EF/MKD/2025/00123"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-semibold">Date of Birth</span>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <span className="text-xs text-gray-500">Format: YYYY-MM-DD</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full disabled:opacity-60"
          >
            {loading ? "Logging inâ€¦" : "Login"}
          </button>
        </form>
      </main>
    </div>
  );
}
