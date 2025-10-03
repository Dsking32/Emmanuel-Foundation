import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Landing from "../pages/landing/Landing";
import Info from "../pages/admissions/Info";
import Auth from "../pages/auth/Auth";
import Dashboard from "../pages/dashboard/Dashboard";
import ProgramSelect from "../pages/application/ProgramSelect";
import ApplicationWizard from "../pages/application/ApplicationWizard";
import ReviewPay from "../pages/application/ReviewPay";
import Confirmation from "../pages/application/Confirmation";
import Results from "../pages/results/Results";
import StudentLogin from "../pages/student/StudentLogin";
import Profile from "../pages/student/Profile";
import NotFound from "../pages/NotFound";
import { RequireAuth } from "./auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Landing /> },
      { path: "admissions/info", element: <Info /> },

      // (Optional legacy) generic auth + dashboard
      { path: "auth", element: <Auth /> },
      { path: "dashboard", element: <Dashboard /> },

      // Admissions flow
      { path: "apply/program", element: <ProgramSelect /> },
      { path: "apply/form", element: <ApplicationWizard /> },
      { path: "apply/review", element: <ReviewPay /> },
      { path: "apply/confirmation", element: <Confirmation /> },

      // Student area (protected)
      { path: "student-login", element: <StudentLogin /> },
      { path: "profile", element: <RequireAuth><Profile /></RequireAuth> },
      { path: "results", element: <RequireAuth><Results /></RequireAuth> },
    ],
  },
]);
