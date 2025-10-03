import React from "react";
import { useNavigate } from "react-router-dom";

function Row({ label, value }) {
  return (
    <div className="flex text-sm">
      <dt className="w-44 text-gray-500">{label}</dt>
      <dd className="font-medium">{value || "—"}</dd>
    </div>
  );
}

function isSenior(entryClass){ return String(entryClass).startsWith("SS"); }
function isJunior(entryClass){ return String(entryClass).startsWith("JSS"); }

function requiredUploads(program){
  const { entryClass, applicantType } = program || {};
  // Rules:
  // New JSS1: FSLC
  // New SS1: FSLC + Junior WAEC
  // Transfer JSS1–JSS3: FSLC + Transfer Letter + Previous School
  // Transfer SS1–SS3: FSLC + Junior WAEC + Previous School
  return {
    needFSLC: true,
    needJnrWaec: (applicantType==="new" && entryClass==="SS1") || (applicantType==="transfer" && isSenior(entryClass)),
    needTransferLetter: applicantType==="transfer" && isJunior(entryClass),
    needPrevSchool: applicantType==="transfer",
  };
}

function ruleSentence(program){
  const r = requiredUploads(program);
  const items = [];
  if (r.needFSLC) items.push("FSLC");
  if (r.needJnrWaec) items.push("Junior WAEC (BECE)");
  if (r.needTransferLetter) items.push("Transfer Letter");
  if (r.needPrevSchool) items.push("Previous School Name");
  const typ = program.applicantType==="transfer" ? "Transfer" : "New";
  const cls = program.entryClass || "—";
  return { text: `Because you selected ${cls} (${typ}), required uploads: ${items.join(", ")}.`, items };
}

export default function ReviewPay(){
  const nav = useNavigate();

  const program   = JSON.parse(localStorage.getItem("app.program")   || "{}");
  const personal  = JSON.parse(localStorage.getItem("app.personal")  || "{}");
  const guardian  = JSON.parse(localStorage.getItem("app.guardian")  || "{}");
  const academics = JSON.parse(localStorage.getItem("app.academics") || "{}");
  const uploads   = JSON.parse(localStorage.getItem("app.uploads")   || "{}");
  const declare   = JSON.parse(localStorage.getItem("app.declare")   || "false");

  const rule = ruleSentence(program);

  function edit(stepIndex){
    localStorage.setItem("app.wizard.jumpTo", String(stepIndex));
    nav("/apply/form");
  }

  function submitApplication(){
    const id = `EF-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
    localStorage.setItem("app.applicationId", id);
    nav("/apply/confirmation");
  }

  return (
    <div className="container-wide py-10">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl">Review Your Application</h2>
        <button onClick={()=>nav(-1)} className="text-sm text-gray-600 hover:underline">Back</button>
      </div>

      {/* Program */}
      <section className="card p-6 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Program</h3>
          <button onClick={()=>edit(0)} className="text-sm text-[hsl(var(--brand))] hover:underline">Edit</button>
        </div>
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-3">
          <Row label="Campus" value={program.branch==="makurdi" ? "Makurdi" : program.branch==="gboko" ? "Gboko" : "—"} />
          <Row label="Entry Class" value={program.entryClass}/>
          <Row label="Applicant Type" value={program.applicantType==="transfer" ? "Transfer" : "New"}/>
          <Row label="Stream (Senior)" value={program.stream}/>
        </dl>

        {/* Rule label */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-sm">
          {rule.text}
        </div>
      </section>

      {/* Personal */}
      <section className="card p-6 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Personal Details</h3>
          <button onClick={()=>edit(0)} className="text-sm text-[hsl(var(--brand))] hover:underline">Edit</button>
        </div>
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-3">
          <Row label="First Name" value={personal.firstName}/>
          <Row label="Last Name" value={personal.lastName}/>
          <Row label="Date of Birth" value={personal.dob}/>
          <Row label="Gender" value={personal.gender}/>
          <Row label="State of Origin" value={personal.state}/>
          <Row label="LGA" value={personal.lga}/>
          <Row label="Phone" value={personal.phone}/>
          <Row label="Email" value={personal.email}/>
          <Row label="Address" value={personal.address}/>
        </dl>
      </section>

      {/* Guardian */}
      <section className="card p-6 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Guardian</h3>
          <button onClick={()=>edit(1)} className="text-sm text-[hsl(var(--brand))] hover:underline">Edit</button>
        </div>
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-3">
          <Row label="Full Name" value={guardian.name}/>
          <Row label="Relationship" value={guardian.rel}/>
          <Row label="Occupation" value={guardian.job}/>
          <Row label="Phone" value={guardian.phone}/>
          <Row label="Email" value={guardian.email}/>
        </dl>
      </section>

      {/* Academics */}
      <section className="card p-6 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Academic Info</h3>
          <button onClick={()=>edit(2)} className="text-sm text-[hsl(var(--brand))] hover:underline">Edit</button>
        </div>
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-3">
          <Row label="Previous School (if transfer)" value={academics.previousSchool}/>
        </dl>
      </section>

      {/* Uploads */}
      <section className="card p-6 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Uploads</h3>
          <button onClick={()=>edit(3)} className="text-sm text-[hsl(var(--brand))] hover:underline">Edit</button>
        </div>
        <dl className="grid md:grid-cols-2 gap-x-8 gap-y-3 mt-3">
          <Row label="FSLC" value={uploads.fslc}/>
          <Row label="Junior WAEC (BECE)" value={uploads.juniorWaec}/>
          <Row label="Transfer Letter" value={uploads.transferLetter}/>
        </dl>
        <p className="text-xs text-gray-500 mt-2">* Max 2MB per file. Formats: PDF/JPG/PNG.</p>
      </section>

      {/* Declaration */}
      <section className="card p-6 mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Declaration</h3>
          <button onClick={()=>edit(4)} className="text-sm text-[hsl(var(--brand))] hover:underline">Edit</button>
        </div>
        <p className="text-sm mt-2">
          {declare ? "? You confirmed the information is accurate and agree to the NDPR policy." : "— Not yet confirmed"}
        </p>
      </section>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mt-6">
        <button onClick={()=>nav("/apply/form")} className="px-4 py-2 rounded-lg bg-gray-100 font-semibold hover:bg-gray-200">
          Back to Form
        </button>
        <button
          onClick={submitApplication}
          className="btn btn-primary"
          disabled={!declare}
          title={!declare ? "Please accept the declaration in the form." : ""}
        >
          Submit Application (Mock)
        </button>
      </div>
    </div>
  );
}
