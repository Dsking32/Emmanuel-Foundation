import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-extrabold">Hello, Applicant</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white border border-black/5 rounded-xl p-5">
          <p className="text-gray-600 text-sm">Status</p>
          <p className="font-bold mt-1">Not Started</p>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-5">
          <p className="text-gray-600 text-sm">Applications</p>
          <p className="font-bold mt-1">0</p>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-5">
          <p className="text-gray-600 text-sm">Actions</p>
          <button onClick={()=>nav("/apply/program")} className="mt-2 bg-[var(--blue)] text-white px-4 py-2 rounded-lg font-semibold">
            Start New Application
          </button>
        </div>
      </div>
      <p className="mt-6 text-sm text-gray-600">Or go back to <Link to="/" className="text-[var(--blue)] underline">Home</Link>.</p>
    </div>
  );
}
