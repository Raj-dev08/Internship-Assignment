// components/BottomNavbar.tsx

import { Link, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">

      <div className="max-w-xl mx-auto mb-4 px-4">

        <div className="bg-base-100 border border-base-300 shadow-2xl rounded-2xl px-4 py-3 backdrop-blur">

          <div className="flex items-center justify-around ">

            <Link
              to="/"
              className={`btn btn-sm ${
                location.pathname === "/"
                  ? "btn-primary text-primary-content"
                  : "btn-ghost"
              }`}
            >
              Home
            </Link>

            <Link
              to="/my-leads"
              className={`btn btn-sm ${
                location.pathname === "/my-leads"
                  ? "btn-primary text-primary-content"
                  : "btn-ghost"
              }`}
            >
              My Leads
            </Link>

            <Link
              to="/create-lead"
              className={`btn btn-sm ${
                location.pathname === "/create-lead"
                  ? "btn-primary text-primary-content"
                  : "btn-ghost"
              }`}
            >
              Create
            </Link>

            <Link
              to="/profile"
              className={`btn btn-sm ${
                location.pathname === "/profile"
                  ? "btn-primary text-primary-content"
                  : "btn-ghost"
              }`}
            >
              Profile
            </Link>

            <Link
              to="/settings"
              className={`btn btn-sm ${
                location.pathname === "/settings"
                  ? "btn-primary text-primary-content"
                  : "btn-ghost"
              }`}
            >
              Settings
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}