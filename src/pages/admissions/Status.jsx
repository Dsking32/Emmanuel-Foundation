import React, { useState } from "react";
export default function Status() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  function check(e){ e.preventDefault(); setStatus({ decision:"Admitted", program:"BSc Computer Science" }); }
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Check Admission Status</h2>
      <form onSubmit={check} className="flex gap-3">
        <input className="border rounded p-3 flex-1" placeholder="Your application email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Check</button>
      </form>
      {status && (
        <div className="mt-6 bg-white shadow rounded p-4">
          <p className="font-semibold">Decision: <span className="text-green-700">{status.decision}</span></p>
          <p>Program: {status.program}</p>
        </div>
      )}
    </div>
  );
}
