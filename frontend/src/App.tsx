import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/userprofile";
import LeadsPage from "./pages/homepage";
import CreateLeadPage from "./pages/createleadspage";
import MyLeadsPage from "./pages/myleads";
import LeadDetailsPage from "./pages/lead";
import UpdateLeadPage from "./pages/editlead";
import SettingsPage from "./pages/settingspage";

import BottomNavbar from "./components/navbar";

function App() {
  const { loading, user, checkAuth } = useAuthStore();
  const {theme}=useThemeStore();

  useEffect(() => {
    checkAuth();
  }, []);

   useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 text-base-content b-24">

      <Toaster position="top-right" />

      <Routes>

        <Route
          path="/"
          element={
            user ? (
              <LeadsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/settings"
          element={
            user ? (
              <SettingsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/leads/:leadId"
          element={
            user ? (
              <LeadDetailsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/update-lead/:leadId"
          element={
            user ? (
              <UpdateLeadPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <SignupPage />
            )
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <LoginPage />
            )
          }
        />

        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/create-lead"
          element={
            user ? (
              <CreateLeadPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/my-leads"
          element={
            user ? (
              <MyLeadsPage />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>

      {user && <BottomNavbar />}

    </div>
  );
}

export default App;