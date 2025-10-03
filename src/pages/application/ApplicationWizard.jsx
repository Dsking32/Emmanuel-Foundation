import React from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../components/ui/Stepper";
import { Field, Select, FileField, Help } from "../../components/ui/Form";

const STEPS = ["Personal", "Guardian", "Academics", "Uploads", "Declaration"];

function useLocalState(key, init){
  const [v, setV] = React.useState(()=> {
    try { return JSON.parse(localStorage.getItem(key)) ?? init; } catch { return init; }
  });
  React.useEffect(()=>{ localStorage.setItem(key, JSON.stringify(v)); }, [key, v]);
  return [v, setV];
}

const genders = ["Male","Female"];

function isSenior(c){ return String(c).startsWith("SS"); }
function isJunior(c){ return String(c).startsWith("JSS"); }

function getRules(program){
  const { entryClass, applicantType } = program || {};
  return {
    needFSLC: true,
    needJnrWaec: (applicantType==="new" && entryClass==="SS1") || (applicantType==="transfer" && isSenior(entryClass)),
    needTransferLetter: applicantType==="transfer" && isJunior(entryClass),
    needPrevSchool: applicantType==="transfer",
  };
}

export default function ApplicationWizard(){
  const nav = useNavigate();
  const program = React.useMemo(()=> JSON.parse(localStorage.getItem("app.program")||"{}"), []);
  const rules = getRules(program);

  const [current, setCurrent] = React.useState(() => {
    const j = localStorage.getItem("app.wizard.jumpTo");
    localStorage.removeItem("app.wizard.jumpTo");
    const i = Number(j);
    return Number.isInteger(i) && i>=0 && i<STEPS.length ? i : 0;
  });

  const [personal, setPersonal] = useLocalState("app.personal", {
    firstName:"", lastName:"", dob:"", gender:"", state:"", lga:"", phone:"", email:"", address:""
  });
  const [guardian, setGuardian] = useLocalState("app.guardian", {
    name:"", rel:"", job:"", phone:"", email:""
  });
  const [academics, setAcademics] = useLocalState("app.academics", {
    previousSchool:""
  });
  const [uploads, setUploads] = useLocalState("app.uploads", {
    fslc:"", juniorWaec:"", transferLetter:""
  });
  const [declare, setDeclare] = useLocalState("app.declare", false);

  function toast(msg){ alert(msg); return false; }

  function validateStep(i){
    if(i===0){
      const req = ["firstName","lastName","dob","gender","state","lga","phone","address"];
      for(const k of req){ if(!personal[k]) return toast(`Please fill ${k.replace(/([A-Z])/g," $1")}.`); }
      return true;
    }
    if(i===1){
      const req = ["name","rel","phone"];
      for(const k of req){ if(!guardian[k]) return toast(`Please fill guardian ${k}.`); }
      return true;
    }
    if(i===2){
      if(rules.needPrevSchool && !academics.previousSchool) return toast("Please provide previous school name.");
      return true;
    }
    if(i===3){
      if(rules.needFSLC && !uploads.fslc) return toast("Please upload FSLC.");
      if(rules.needJnrWaec && !uploads.juniorWaec) return toast("Please upload Junior WAEC (BECE).");
      if(rules.needTransferLetter && !uploads.transferLetter) return toast("Please upload Transfer Letter.");
      return true;
    }
    if(i===4){
      if(!declare) return toast("Please confirm the declaration to proceed.");
      return true;
    }
    return true;
  }

  function handleFile(e, key){
    const file = e.target.files?.[0];
    if(!file) return;
    if(file.size > 2 * 1024 * 1024) { alert("Max file size is 2MB."); e.target.value=""; return; }
    const entry = `${file.name} • ${(file.size/1024).toFixed(0)} KB`;
    setUploads(u => ({ ...u, [key]: entry }));
  }

  function next(){ if(validateStep(current)) setCurrent(c=>Math.min(c+1, STEPS.length-1)); }
  function prev(){ setCurrent(c=>Math.max(c-1, 0)); }

  const summaryRows = [
    ["Campus", program.branch==="makurdi"?"Makurdi":program.branch==="gboko"?"Gboko":"—"],
    ["Entry Class", program.entryClass || "—"],
    ["Type", program.applicantType==="transfer"?"Transfer":"New"],
    ["Stream", isSenior(program.entryClass) ? (program.stream || "—") : "—"],
    ["Name", `${personal.firstName||"—"} ${personal.lastName||""}`.trim()],
    ["DOB", personal.dob || "—"],
    ["Guardian", guardian.name || "—"],
    ["Prev. School", rules.needPrevSchool ? (academics.previousSchool || "—") : "—"],
    ["FSLC", uploads.fslc ? "? Uploaded" : "—"],
    ["Jnr WAEC", rules.needJnrWaec ? (uploads.juniorWaec ? "? Uploaded" : "—") : "—"],
    ["Transfer Letter", rules.needTransferLetter ? (uploads.transferLetter ? "? Uploaded" : "—") : "—"],
  ];

  return (
    <div className="container-wide py-6 md:py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="kicker">Application</p>
          <h2 className="font-display text-2xl sm:text-3xl">Fill Your Details</h2>
        </div>
        <div className="text-xs sm:text-sm text-gray-600">
          {program.entryClass || "—"} {isSenior(program.entryClass)&&program.stream?`• ${program.stream}`:""} • {program.applicantType==="transfer"?"Transfer":"New"}
        </div>
      </div>

      {/* Stepper */}
      <div className="mt-4 md:mt-6">
        <Stepper steps={STEPS} current={current}/>
      </div>

      {/* Layout: form + sticky summary */}
      <div className="mt-4 md:mt-6 grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Form card */}
        <div className="card p-5 sm:p-6 grid gap-4">
          {current===0 && (
            <div className="grid gap-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="First Name" value={personal.firstName} onChange={v=>setPersonal(p=>({...p, firstName:v}))} required />
                <Field label="Last Name" value={personal.lastName} onChange={v=>setPersonal(p=>({...p, lastName:v}))} required />
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field type="date" label="Date of Birth" value={personal.dob} onChange={v=>setPersonal(p=>({...p, dob:v}))} required />
                <Select label="Gender" value={personal.gender} onChange={v=>setPersonal(p=>({...p, gender:v}))}
                        options={genders.map(g=>({label:g, value:g}))} required />
                <Field label="Phone" value={personal.phone} onChange={v=>setPersonal(p=>({...p, phone:v}))} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Email" value={personal.email} onChange={v=>setPersonal(p=>({...p, email:v}))} placeholder="optional" />
                <Field label="State of Origin" value={personal.state} onChange={v=>setPersonal(p=>({...p, state:v}))} required />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="LGA" value={personal.lga} onChange={v=>setPersonal(p=>({...p, lga:v}))} required />
                <Field label="Home Address" value={personal.address} onChange={v=>setPersonal(p=>({...p, address:v}))} required />
              </div>
              <Help>Use your legal name as it appears on certificates.</Help>
            </div>
          )}

          {current===1 && (
            <div className="grid gap-3">
              <Field label="Guardian Full Name" value={guardian.name} onChange={v=>setGuardian(g=>({...g, name:v}))} required />
              <div className="grid sm:grid-cols-3 gap-3">
                <Select label="Relationship" value={guardian.rel} onChange={v=>setGuardian(g=>({...g, rel:v}))}
                        options={[{label:"Parent", value:"Parent"},{label:"Guardian", value:"Guardian"},{label:"Other", value:"Other"}]} required />
                <Field label="Occupation" value={guardian.job} onChange={v=>setGuardian(g=>({...g, job:v}))} />
                <Field label="Phone" value={guardian.phone} onChange={v=>setGuardian(g=>({...g, phone:v}))} required />
              </div>
              <Field label="Email" value={guardian.email} onChange={v=>setGuardian(g=>({...g, email:v}))} placeholder="optional" />
              <Help>Provide a reachable phone number for notifications.</Help>
            </div>
          )}

          {current===2 && (
            <div className="grid gap-3">
              <p className="text-sm text-gray-600">Academic info. {program.applicantType==="transfer" ? <b>Previous school is required for transfer students.</b> : "New students may leave previous school blank."}</p>
              <Field label="Previous School" value={academics.previousSchool} onChange={v=>setAcademics(a=>({...a, previousSchool:v}))} required={rules.needPrevSchool} />
            </div>
          )}

          {current===3 && (
            <div className="grid gap-3">
              <div className="bg-gray-50 border border-black/5 rounded-lg p-3 text-sm">
                <b>Required for your selection ({program.entryClass} • {program.applicantType==="transfer" ? "Transfer":"New"}):</b>
                <ul className="list-disc pl-5 mt-1">
                  <li>FSLC</li>
                  {rules.needJnrWaec && <li>Junior WAEC (BECE)</li>}
                  {rules.needTransferLetter && <li>Transfer Letter</li>}
                  {rules.needPrevSchool && <li>Previous School Name</li>}
                </ul>
              </div>
              <FileField label="FSLC (First School Leaving Certificate)" required value={uploads.fslc} onChange={(e)=>handleFile(e,"fslc")} help="PDF/JPG/PNG • Max 2MB" />
              {rules.needJnrWaec && (
                <FileField label="Junior WAEC (BECE)" required value={uploads.juniorWaec} onChange={(e)=>handleFile(e,"juniorWaec")} help="PDF/JPG/PNG • Max 2MB" />
              )}
              {rules.needTransferLetter && (
                <FileField label="Transfer Letter" required value={uploads.transferLetter} onChange={(e)=>handleFile(e,"transferLetter")} help="PDF/JPG/PNG • Max 2MB" />
              )}
            </div>
          )}

          {current===4 && (
            <div className="grid gap-3">
              <label className="flex items-start gap-2">
                <input type="checkbox" checked={declare} onChange={e=>setDeclare(e.target.checked)} />
                <span className="text-sm">
                  I confirm the information provided is accurate and I agree to the school&apos;s NDPR-compliant policy.
                </span>
              </label>
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
                Tip: You can always go back and edit before submission.
              </div>
            </div>
          )}
        </div>

        {/* Sticky summary (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 card p-5">
            <h3 className="font-semibold">Live Summary</h3>
            <dl className="mt-3 grid gap-2 text-sm">
              {summaryRows.map(([k,v]) => (
                <div key={k} className="flex">
                  <dt className="w-36 text-gray-500">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              onClick={()=>{ if(validateStep(current)) window.location.href="/apply/review"; }}
              className="btn btn-primary w-full mt-4"
              disabled={current<STEPS.length-1}
              title={current<STEPS.length-1 ? "Complete all steps first" : ""}
            >
              Review & Submit
            </button>
          </div>
        </aside>
      </div>

      {/* Floating controls (mobile-first) */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-30 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
        <button onClick={prev} disabled={current===0} className={["px-4 py-2 rounded-lg font-semibold",
          current===0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"].join(" ")}>
          Previous
        </button>
        {current<STEPS.length-1 ? (
          <button onClick={next} className="btn btn-primary">Next</button>
        ) : (
          <button onClick={()=>{ if(validateStep(4)) window.location.href="/apply/review"; }} className="btn btn-primary">Review</button>
        )}
      </div>

      {/* Desktop controls */}
      <div className="hidden md:flex items-center justify-between mt-4">
        <button onClick={prev} disabled={current===0} className={["px-4 py-2 rounded-lg font-semibold",
          current===0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-200"].join(" ")}>
          Previous
        </button>
        {current<STEPS.length-1 ? (
          <button onClick={next} className="btn btn-primary">Next</button>
        ) : (
          <button onClick={()=>{ if(validateStep(4)) window.location.href="/apply/review"; }} className="btn btn-primary">Review</button>
        )}
      </div>
    </div>
  );
}
