import React from "react";
import { useAuth } from "../../app/auth";

const sessions = ["2024/2025", "2023/2024", "2022/2023"];
const terms = ["First", "Second", "Third"];

function computeGPA(rows) {
  if (!rows?.length) return { totalUnits: 0, totalPoints: 0, gpa: 0 };
  const gp = (g) => ({ A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 }[g] ?? 0);
  let totalUnits = 0,
    totalPoints = 0;
  for (const r of rows) {
    totalUnits += r.unit;
    totalPoints += r.unit * gp(r.grade);
  }
  return {
    totalUnits,
    totalPoints,
    gpa: totalUnits ? (totalPoints / totalUnits).toFixed(2) : 0,
  };
}

export default function Results() {
  const { user, BRANCHES } = useAuth();
  const [form, setForm] = React.useState({ session: sessions[0], term: terms[0] });
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    setData(null);
    setError("");
  }, [form.session, form.term]);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function fetchResults() {
    setError("");
    setLoading(true);
    setData(null);

    try {
      // TODO: Replace with real API call:
      // GET /api/results?admissionNo=&dob=&branch=&session=&term=
      // Use user.admissionNo, user.dob, user.branch
      await new Promise((r) => setTimeout(r, 500)); // simulate network

      // Mock data (remove when backend is wired)
      const mock = {
        student: {
          name: user.name,
          admissionNo: user.admissionNo,
          class: form.session.startsWith("2024") ? "SS1 Science" : "JSS3",
          dob: user.dob,
          branch: user.branch,
        },
        session: form.session,
        term: form.term,
        courses: [
          { code: "ENG201", title: "English Language", grade: "A", unit: 3 },
          { code: "MAT201", title: "Mathematics", grade: "B", unit: 3 },
          { code: "BIO201", title: "Biology", grade: "A", unit: 2 },
          { code: "CHM201", title: "Chemistry", grade: "B", unit: 2 },
          { code: "PHY201", title: "Physics", grade: "A", unit: 2 },
        ],
      };

      // Example "not found" behavior:
      if (user.admissionNo.length < 5) {
        setError("No results found for the selected session/term.");
      } else {
        setData(mock);
      }
    } catch (err) {
      setError("Unable to fetch results. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const summary = data?.courses
    ? computeGPA(data.courses)
    : { totalUnits: 0, totalPoints: 0, gpa: 0 };

  const branchLabel =
    BRANCHES.find((b) => b.id === user?.branch)?.label || "—";

  return (
    <div className="container-wide py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-3xl">Results</h2>
        <div className="text-sm text-gray-600">
          {user?.name} — {user?.admissionNo} • <b>{branchLabel}</b>
        </div>
      </div>

      <div className="card p-6 mt-6">
        <div className="grid md:grid-cols-3 gap-4">
          <label className="grid gap-1">
            <span className="text-sm font-semibold">Session</span>
            <select
              name="session"
              value={form.session}
              onChange={onChange}
              className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
            >
              {sessions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-semibold">Term</span>
            <select
              name="term"
              value={form.term}
              onChange={onChange}
              className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
            >
              {terms.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button
              onClick={fetchResults}
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch Results"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {data && (
        <div className="mt-6 card p-6 overflow-x-auto">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold">{data.student.name}</h3>
              <p className="text-sm text-gray-600">
                {data.student.class} • {data.session} • {data.term} Term
              </p>
              <p className="text-sm text-gray-600">
                Admission No: <b>{data.student.admissionNo}</b> • DOB:{" "}
                {data.student.dob} • Campus:{" "}
                {BRANCHES.find((b) => b.id === data.student.branch)?.label ||
                  "—"}
              </p>
            </div>
            <button onClick={() => window.print()} className="btn btn-accent">
              Print
            </button>
          </div>

          <table className="w-full text-left mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Course Code</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Unit</th>
                <th className="px-4 py-2">Grade</th>
              </tr>
            </thead>
            <tbody>
              {data.courses.map((c) => (
                <tr key={c.code} className="border-t">
                  <td className="px-4 py-2">{c.code}</td>
                  <td className="px-4 py-2">{c.title}</td>
                  <td className="px-4 py-2">{c.unit}</td>
                  <td className="px-4 py-2">{c.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
            <div className="bg-gray-50 rounded-lg p-3">
              <b>Total Units:</b> {summary.totalUnits}
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <b>Total Points:</b> {summary.totalPoints}
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <b>GPA (5-pt):</b> {summary.gpa}
            </div>
          </div>

          <div className="mt-6 text-xs text-gray-500">
            * Display GPA uses a 5-point scale (A=5, B=4, C=3, D=2, E=1, F=0). Adjust to your policy if different.
          </div>
        </div>
      )}
    </div>
  );
}
