import React, { useState } from "react";
export default function Apply() {
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", program:"" });
  function onChange(e){ setForm(f => ({...f, [e.target.name]: e.target.value})); }
  function onSubmit(e){ e.preventDefault(); alert("Submitted (mock)."); }
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Admission Application</h2>
      <form onSubmit={onSubmit} className="grid gap-4 bg-white shadow p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border rounded p-3" name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange}/>
          <input className="border rounded p-3" name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange}/>
        </div>
        <input className="border rounded p-3" name="email" placeholder="Email" value={form.email} onChange={onChange}/>
        <select className="border rounded p-3" name="program" value={form.program} onChange={onChange}>
          <option value="">Select Program</option>
          <option value="BSc Computer Science">BSc Computer Science</option>
          <option value="BSc Economics">BSc Economics</option>
          <option value="B.Eng Electrical">B.Eng Electrical</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">Submit Application</button>
      </form>
    </div>
  );
}
