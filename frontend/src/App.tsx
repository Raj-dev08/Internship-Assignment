import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

function App() {
  const { loading, user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />

        <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignupPage />} />

        <Route path="/login" element={user ? <Navigate to="/home" /> : <LoginPage />} />

        <Route path="/home" element={user ? <div>Logged in</div> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;