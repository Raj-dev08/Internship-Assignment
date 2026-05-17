// pages/CreateLeadPage.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLeadStore } from "../store/userLeadStore";

export default function CreateLeadPage() {
  const navigate = useNavigate();

  const { createLead, loading } = useLeadStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "new",
    source: "website",
  });

  const [error, setError] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const err: any = {};

    if (!form.name.trim()) {
      err.name = "Name required";
    }

    if (!form.email.trim()) {
      err.email = "Email required";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      err.email = "Invalid email";
    }

    setError(err);

    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validate()) return;

    const res = await createLead(form);

    if (res) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 px-4 py-8">

      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-4xl font-bold">
            Create Lead
          </h1>

          <p className="text-sm opacity-60 mt-2">
            Add and manage potential customers
          </p>

        </div>

        {/* FORM CARD */}
        <div className="card bg-base-100 shadow-2xl border border-base-300">

          <form
            onSubmit={handleSubmit}
            className="card-body space-y-5"
          >

            {/* NAME */}
            <div className="form-control">

              <label className="label">
                <span className="label-text">
                  Full Name
                </span>
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="input input-bordered w-full"
              />

              {error.name && (
                <span className="text-error text-sm mt-1">
                  {error.name}
                </span>
              )}

            </div>

            {/* EMAIL */}
            <div className="form-control">

              <label className="label">
                <span className="label-text">
                  Email Address
                </span>
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="input input-bordered w-full"
              />

              {error.email && (
                <span className="text-error text-sm mt-1">
                  {error.email}
                </span>
              )}

            </div>

            {/* STATUS */}
            <div className="form-control">

              <label className="label">
                <span className="label-text">
                  Lead Status
                </span>
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="new">New</option>
                <option value="contacted">
                  Contacted
                </option>
                <option value="qualified">
                  Qualified
                </option>
                <option value="lost">Lost</option>
              </select>

            </div>

            {/* SOURCE */}
            <div className="form-control">

              <label className="label">
                <span className="label-text">
                  Lead Source
                </span>
              </label>

              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="website">
                  Website
                </option>

                <option value="referral">
                  Referral
                </option>

                <option value="instagram">
                  Instagram
                </option>
              </select>

            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3 pt-3">

              <button
                type="submit"
                disabled={loading}
                className="btn bg-primary flex-1 text-primary-content"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Create Lead"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-outline"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}