import React from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [tab, setTab] = React.useState("login"); // "login" | "signup"
  const [otpStage, setOtpStage] = React.useState(false);
  const nav = useNavigate();

  function handleSignup(e){
    e.preventDefault();
    // Mock: show OTP stage after sign up
    setOtpStage(true);
  }
  function verifyOtp(e){
    e.preventDefault();
    // Mock success ? go to dashboard
    nav("/dashboard");
  }
  function handleLogin(e){
    e.preventDefault();
    // Mock success ? go to dashboard
    nav("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <div className="bg-white rounded-xl border border-black/5 p-6 shadow-sm">
        <div className="flex gap-2 mb-4">
          <button onClick={()=>{setTab("login"); setOtpStage(false);}}
            className={`px-4 py-2 rounded-lg font-semibold ${tab==="login"?"bg-[var(--blue)] text-white":"bg-gray-100"}`}>
            Login
          </button>
          <button onClick={()=>{setTab("signup"); setOtpStage(false);}}
            className={`px-4 py-2 rounded-lg font-semibold ${tab==="signup"?"bg-[var(--blue)] text-white":"bg-gray-100"}`}>
            Sign Up
          </button>
        </div>

        {tab==="signup" && !otpStage && (
          <form onSubmit={handleSignup} className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm font-semibold">Full Name</span>
              <input className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--blue)] outline-none" required/>
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold">Email</span>
              <input type="email" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--blue)] outline-none" required/>
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold">Phone (+234...)</span>
              <input type="tel" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--blue)] outline-none" required/>
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold">Password</span>
              <input type="password" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--blue)] outline-none" required/>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" required/> I agree to the terms
            </label>
            <button className="bg-[var(--blue)] text-white px-4 py-2 rounded-lg font-semibold hover:brightness-110">
              Create Account
            </button>
          </form>
        )}

        {tab==="signup" && otpStage && (
          <form onSubmit={verifyOtp} className="grid gap-3">
            <p className="text-sm text-gray-600">Enter the OTP sent to your email/phone.</p>
            <label className="grid gap-1">
              <span className="text-sm font-semibold">OTP Code</span>
              <input inputMode="numeric" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--blue)] outline-none" required/>
            </label>
            <button className="bg-[var(--green)] text-white px-4 py-2 rounded-lg font-semibold hover:brightness-110">
              Verify & Continue
            </button>
          </form>
        )}

        {tab==="login" && (
          <form onSubmit={handleLogin} className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm font-semibold">Email or Phone</span>
              <input className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--blue)] outline-none" required/>
            </label>
            <label className="grid gap-1">
              <span className="text-sm font-semibold">Password</span>
              <input type="password" className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[var(--blue)] outline-none" required/>
            </label>
            <div className="text-right text-sm">
              <a className="text-[var(--blue)]" href="#">Forgot Password?</a>
            </div>
            <button className="bg-[var(--blue)] text-white px-4 py-2 rounded-lg font-semibold hover:brightness-110">
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
