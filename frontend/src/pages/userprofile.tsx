import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfilePage() {
  const {
    user,
    loading,
    updateProfile,
    beAdmin,
    cancelAdmin,
    logout,
  } = useAuthStore();

  const [form, setForm] = useState({
    name: user?.name || "",
    adminPass: "",
  });

  const [error, setError] = useState<any>({});

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateProfile = () => {
    const err: any = {};

    if (!form.name) {
      err.name = "Name required";
    }

    setError(err);

    return Object.keys(err).length === 0;
  };

  const validateAdmin = () => {
    const err: any = {};

    if (!form.adminPass) {
      err.adminPass = "Admin password required";
    }

    setError(err);

    return Object.keys(err).length === 0;
  };

  const handleProfileUpdate = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!validateProfile()) return;

    await updateProfile({ name: form.name });
  };

  const handleBeAdmin = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!validateAdmin()) return;

    await beAdmin({ adminPass: form.adminPass });

    setForm({
      ...form,
      adminPass: "",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-lg font-medium">Please login first</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6 py-10">
      <div className="w-full max-w-md">

        <div className="card bg-base-100 shadow-2xl border border-base-300">

          <div className="card-body p-8 space-y-5">

            {/* HEADER */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-bold">Profile</h2>
              <p className="text-sm opacity-60">
                Manage your account details
              </p>
            </div>

            {/* USER INFO */}
            <div className="bg-base-200 rounded-xl p-4 space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="font-semibold">Email</span>
                <span>{user.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">Role</span>
                <span>{user.isAdmin ? "Admin" : "User"}</span>
              </div>

            </div>

            {/* NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input input-bordered w-full my-2 px-4"
                placeholder="Enter name"
              />

              {error.name && (
                <span className="text-error text-xs mt-1">
                  {error.name}
                </span>
              )}
            </div>

            {/* UPDATE BUTTON */}
            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="btn bg-primary w-full text-primary-content"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Update Profile"
              )}
            </button>

            {/* ADMIN SECTION */}
            {!user.isAdmin ? (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Admin Password
                    </span>
                  </label>

                  <input
                    type="password"
                    name="adminPass"
                    value={form.adminPass}
                    onChange={handleChange}
                    className="input input-bordered w-full my-2 px-4"
                    placeholder="Enter admin password"
                  />

                  {error.adminPass && (
                    <span className="text-error text-xs mt-1">
                      {error.adminPass}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleBeAdmin}
                  disabled={loading}
                  className="btn bg-secondary w-full text-secondary-content"
                >
                  Become Admin
                </button>
              </>
            ) : (
              <button
                onClick={cancelAdmin}
                className="btn bg-error w-full text-error-content"
              >
                Cancel Admin
              </button>
            )}

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="btn bg-red-500 text-white w-full"
            >
              Logout
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}