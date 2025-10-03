import React from "react";
import { useNavigate } from "react-router-dom";
import { BRANCHES } from "../../components/branches";

const ENTRY_CLASSES = ["JSS1","JSS2","JSS3","SS1","SS2","SS3"];
const STREAMS = ["Science","Arts","Commercial"]; // for SS only

function Icon({ name }) {
  // Lightweight inline icons (no library)
  const map = {
    campus: <svg viewBox="0 0 24 24" className="size-5"><path fill="currentColor" d="M12 3l10 6-10 6-10-6 10-6Zm0 8.7L20 7.1v6.2L12 18l-8-4.7V7.1l8 4.6Z"/></svg>,
    book:   <svg viewBox="0 0 24 24" className="size-5"><path fill="currentColor" d="M3 4h13a3 3 0 013 3v13H6a3 3 0 01-3-3V4Zm3 2v11a1 1 0 001 1h11V7a1 1 0 00-1-1H6Z"/></svg>,
    arrow:  <svg viewBox="0 0 24 24" className="size-5"><path fill="currentColor" d="M13 5l7 7-7 7v-4H4v-6h9V5z"/></svg>
  };
  return <span className="text-[hsl(var(--brand))]">{map[name] || map.book}</span>;
}

export default function ProgramSelect() {
  const nav = useNavigate();
  const [branch, setBranch] = React.useState("");
  const [entryClass, setEntryClass] = React.useState("");
  const [applicantType, setApplicantType] = React.useState(""); // new | transfer
  const [stream, setStream] = React.useState("");

  const isSenior = (c)=>String(c).startsWith("SS");

  function proceed() {
    if (!branch || !entryClass || !applicantType) return;
    const payload = { branch, entryClass, applicantType, stream: isSenior(entryClass) ? stream : "" };
    localStorage.setItem("app.program", JSON.stringify(payload));
    nav("/apply/form");
  }

  return (
    <div className="container-wide py-10">
      <div className="text-center">
        <p className="kicker">Admissions</p>
        <h2 className="font-display text-3xl sm:text-4xl mt-2">Choose Your Path</h2>
        <p className="text-gray-600 mt-2">Select campus, entry class, and type of applicant.</p>
      </div>

      {/* Selection grid */}
      <div className="mt-8 grid lg:grid-cols-3 gap-5">
        {/* Column 1: Campus */}
        <section className="card p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Icon name="campus" /><h3 className="font-semibold">Campus</h3>
          </div>
          <div className="grid gap-3 mt-4">
            {BRANCHES.map(b => {
              const active = branch === b.id;
              return (
                <button
                  key={b.id}
                  onClick={()=>setBranch(b.id)}
                  className={[
                    "rounded-xl border px-4 py-3 text-left transition",
                    active ? "border-[hsl(var(--brand))] bg-[hsl(var(--brand))/0.06]" : "border-gray-200 hover:bg-gray-50"
                  ].join(" ")}
                >
                  <div className="font-medium">{b.label}</div>
                  <div className="text-xs text-gray-600">Benue State, Nigeria</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Column 2: Entry Class */}
        <section className="card p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Icon name="book" /><h3 className="font-semibold">Entry Class</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {ENTRY_CLASSES.map(c => {
              const active = entryClass === c;
              return (
                <button
                  key={c}
                  onClick={()=>{ setEntryClass(c); if(!String(c).startsWith("SS")) setStream(""); }}
                  className={[
                    "rounded-xl border px-3 py-2 text-sm font-semibold transition",
                    active ? "border-[hsl(var(--brand))] bg-[hsl(var(--brand))/0.06]" : "border-gray-200 hover:bg-gray-50"
                  ].join(" ")}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Stream for SS */}
          <div className="mt-4">
            <label className="text-sm font-semibold">Stream (SS only)</label>
            <select
              className="mt-1 border rounded-lg w-full px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
              value={stream}
              onChange={(e)=>setStream(e.target.value)}
              disabled={!isSenior(entryClass)}
            >
              <option value="">Select stream</option>
              {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {!isSenior(entryClass) && <p className="text-xs text-gray-500 mt-1">Stream not required for JSS.</p>}
          </div>
        </section>

        {/* Column 3: Type + Summary */}
        <section className="card p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Icon name="arrow" /><h3 className="font-semibold">Applicant Type</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { id:"new", label:"New" },
              { id:"transfer", label:"Transfer" },
            ].map(t => {
              const active = applicantType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={()=>setApplicantType(t.id)}
                  className={[
                    "rounded-xl border px-3 py-2 font-semibold transition",
                    active ? "border-[hsl(var(--brand))] bg-[hsl(var(--brand))/0.06]" : "border-gray-200 hover:bg-gray-50"
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Inline requirements hint */}
          <div className="mt-5 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
            <b>Heads-up:</b> Requirements depend on your selection.
            <ul className="list-disc pl-5 mt-1 space-y-0.5">
              <li><b>JSS1 (New):</b> FSLC</li>
              <li><b>SS1 (New):</b> FSLC + Junior WAEC</li>
              <li><b>JSS Transfer:</b> FSLC + Transfer Letter + Previous School</li>
              <li><b>SS Transfer:</b> FSLC + Junior WAEC + Previous School</li>
            </ul>
          </div>

          <button
            onClick={proceed}
            disabled={!branch || !entryClass || !applicantType || (isSenior(entryClass) && !stream)}
            className={[
              "btn mt-4 w-full",
              (!branch || !entryClass || !applicantType || (isSenior(entryClass) && !stream))
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "btn-primary"
            ].join(" ")}
          >
            Continue
          </button>
        </section>
      </div>
    </div>
  );
}
