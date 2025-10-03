// src/pages/admissions/Info.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Info() {
  return (
    <div className="bg-white">
      {/* Slim hero */}
      <section className="border-b border-black/5">
        <div className="container-wide py-12">
          <p className="kicker">Admissions</p>
          <h1 className="font-display text-4xl leading-tight mt-2">Admissions 2025/2026</h1>
          <p className="text-gray-600 mt-2 prose-max">
            Choose campus (Makurdi or Gboko), select entry class, and upload the required documents.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">Applications Open: Jan 10, 2025</span>
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">Application Fee: ₦10,000</span>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link to="/apply/program" className="btn btn-primary w-full sm:w-auto">Start Application</Link>
            <Link to="/profile" className="w-full sm:w-auto px-4 py-2 rounded-xl font-semibold bg-gray-100 hover:bg-gray-200 text-center">
              Student Login
            </Link>
          </div>
        </div>
      </section>

      {/* Three simple pathway cards */}
      <section className="container-wide py-12">
        <div className="grid md:grid-cols-3 gap-5">
          <article className="card p-6">
            <span className="text-xs font-semibold text-[hsl(var(--brand))]">JSS1 — New</span>
            <h3 className="font-semibold text-lg mt-1">Junior Secondary Entry</h3>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• FSLC (First School Leaving Certificate)</li>
              <li>• Makurdi or Gboko campus</li>
              <li>• Entrance assessment</li>
            </ul>
            <Link to="/apply/program" className="btn btn-primary w-full mt-4">Apply</Link>
          </article>

          <article className="card p-6">
            <span className="text-xs font-semibold text-[hsl(var(--brand))]">SS1 — New</span>
            <h3 className="font-semibold text-lg mt-1">Senior Secondary Entry</h3>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• FSLC</li>
              <li>• Junior WAEC (BECE)</li>
              <li>• Choose stream: Science, Arts, Commercial</li>
            </ul>
            <Link to="/apply/program" className="btn btn-primary w-full mt-4">Apply</Link>
          </article>

          <article className="card p-6">
            <span className="text-xs font-semibold text-[hsl(var(--brand))]">JSS/SS — Transfer</span>
            <h3 className="font-semibold text-lg mt-1">Transfer Students</h3>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• JSS1–JSS3: FSLC + Transfer Letter + Previous School</li>
              <li>• SS1–SS3: FSLC + Junior WAEC + Previous School</li>
            </ul>
            <Link to="/apply/program" className="btn btn-primary w-full mt-4">Apply</Link>
          </article>
        </div>
      </section>

      {/* Requirements + Timeline + Fees (simple three-up grid) */}
      <section className="container-wide pb-14">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="card p-6">
            <h3 className="font-semibold">Key Requirements</h3>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• FSLC (all entries)</li>
              <li>• Junior WAEC (BECE) for SS1 New & SS Transfers</li>
              <li>• Transfer Letter & Previous School (for JSS Transfers)</li>
              <li>• Birth certificate & passport photo</li>
            </ul>
            <p className="text-xs text-gray-500 mt-3">Uploads: PDF/JPG/PNG • Max 2MB each</p>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold">Timeline</h3>
            <div className="mt-3 grid gap-3 text-sm">
              <div className="rounded-lg border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Applications Open</div>
                <div className="font-semibold">Jan 10, 2025</div>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Entrance Assessments</div>
                <div className="font-semibold">Mar 15–29, 2025</div>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Admissions List</div>
                <div className="font-semibold">Apr 10, 2025</div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold">Fees</h3>
            <div className="mt-3 grid gap-3 text-sm">
              <div className="rounded-lg border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Application Fee</div>
                <div className="font-semibold">₦10,000</div>
              </div>
              <div className="rounded-lg border border-gray-200 p-3">
                <div className="text-xs text-gray-500">Acceptance (if admitted)</div>
                <div className="font-semibold">Communicated in offer</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Pay with card, bank transfer, or USSD.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
