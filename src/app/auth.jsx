import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { BRANCHES } from "../components/branches";

const AuthCtx = createContext(null);
export function useAuth(){ return useContext(AuthCtx); }

const LS_KEY = "app.auth";

/** Simple mock auth (replace with API later) */
export function AuthProvider({ children }){
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const login = async ({ admissionNo, dob, branch }) => {
    if (!admissionNo || admissionNo.trim().length < 5) throw new Error("Invalid School/Admission Number.");
    if (!dob) throw new Error("Date of Birth is required.");
    if (!branch) throw new Error("Please select your campus.");

    // TODO: call backend with {admissionNo, dob, branch}
    const profile = {
      admissionNo: admissionNo.trim(),
      dob,
      branch, // "makurdi" | "gboko"
      name: "Okafor Chinedu",
      gender: "Male",
      class: "SS1 Science",
      state: "Benue",
      lga: "Makurdi",
      address: "12 Example Street, Benue",
      phone: "+2348000000000",
      email: "student@example.com",
    };
    localStorage.setItem(LS_KEY, JSON.stringify(profile));
    setUser(profile);
    return profile;
  };

  const logout = () => {
    localStorage.removeItem(LS_KEY);
    setUser(null);
  };

  const updateBranch = (branchId) => {
    setUser(prev => {
      if (!prev) return prev;
      const next = { ...prev, branch: branchId };
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(() => ({ user, login, logout, updateBranch, BRANCHES }), [user]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function RequireAuth({ children }){
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/student-login" replace state={{ from: location }} />;
  return children;
}
