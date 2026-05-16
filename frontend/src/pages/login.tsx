import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const { login, loading } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<any>({});

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err: any = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Invalid email";
    if (form.password.length < 4) err.password = "Min 4 chars";

    setError(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validate()) return;
    await login(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6 py-10">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-2xl border border-base-300">
          <div className="card-body p-8 space-y-5">

            {/* HEADER */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-bold">Welcome back</h2>
              <p className="text-sm opacity-60">
                Login to continue
              </p>
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                className="input input-bordered w-full my-2 px-4"
                placeholder="john@example.com"
                onChange={handleChange}
              />
              {error.email && (
                <span className="text-error text-xs mt-1">{error.email}</span>
              )}
            </div>

            {/* PASSWORD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full my-2 px-4"
                placeholder="••••••••"
                onChange={handleChange}
              />
              {error.password && (
                <span className="text-error text-xs mt-1">
                  {error.password}
                </span>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>

            {/* FOOTER */}
            <p className="text-sm text-center opacity-70 pt-2">
              Don’t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Signup
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}