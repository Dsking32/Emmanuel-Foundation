import React from "react";
import { Link } from "react-router-dom";

export default function Confirmation(){
  const appId = localStorage.getItem("app.applicationId");
  const program = JSON.parse(localStorage.getItem("app.program")||"{}");
  const personal = JSON.parse(localStorage.getItem("app.personal")||"{}");

  return (
    <div className="container-wide py-16 text-center">
      <div className="mx-auto max-w-xl card p-8">
        <div className="size-14 rounded-full bg-green-100 text-green-700 grid place-items-center mx-auto text-2xl">?</div>
        <h2 className="font-display text-3xl mt-4">Application Submitted</h2>
        <p className="text-gray-700 mt-2">Thank you, {personal.firstName} {personal.lastName}. We have received your application.</p>

        <div className="bg-gray-50 rounded-lg p-4 mt-5 text-left">
          <p className="text-sm"><b>Application ID:</b> {appId || "—"}</p>
          <p className="text-sm"><b>Level:</b> {program.level || "—"} • Campus: {(program.branch==="makurdi"?"Makurdi":program.branch==="gboko"?"Gboko":"—")} {program.stream ? `• ${program.stream}` : ""}</p>
          <p className="text-sm"><b>Submitted:</b> {new Date().toLocaleString()}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          <button onClick={()=>window.print()} className="btn btn-accent">Print Confirmation</button>
        </div>
      </div>
    </div>
  );
}
