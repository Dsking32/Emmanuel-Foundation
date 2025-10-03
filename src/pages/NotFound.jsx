import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[50vh] grid place-items-center p-10 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Page not found</h1>
        <Link to="/" className="text-[var(--blue)] underline">Back to Home</Link>
      </div>
    </div>
  );
}
