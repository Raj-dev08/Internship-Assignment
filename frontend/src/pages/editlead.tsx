// pages/UpdateLeadPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useLeadStore } from "../store/userLeadStore";

export default function UpdateLeadPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const { selectedLead, getLeadById, updateLead, loading } =
    useLeadStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    status: "new",
    source: "website",
  });

  const [error, setError] = useState<any>({});

  useEffect(() => {
    if (leadId) {
      getLeadById(leadId);
    }
  }, [leadId]);

  useEffect(() => {
    if (selectedLead) {
      setForm({
        name: selectedLead.name || "",
        email: selectedLead.email || "",
        status: selectedLead.status || "new",
        source: selectedLead.source || "website",
      });
    }
  }, [selectedLead]);

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

    if (!form.name.trim()) err.name = "Name required";
    if (!form.email.trim()) err.email = "Email required";

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

    if (!leadId) return;

    if (!validate()) return;

    const res = await updateLead(leadId, form);

    if (res) {
      navigate(`/leads/${leadId}`);
    }
  };

  if (loading && !selectedLead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10 pb-28">

      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">

          <h1 className="text-4xl font-bold">
            Update Lead
          </h1>

          <p className="text-sm opacity-60 mt-2">
            Edit lead information
          </p>

        </div>

        {/* FORM */}
        <div className="card bg-base-100 border border-base-300 shadow-2xl">

          <form
            onSubmit={handleSubmit}
            className="card-body space-y-5"
          >

            {/* NAME */}
            <div className="form-control">

              <label className="label">
                <span className="label-text">
                  Name
                </span>
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
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
                  Email
                </span>
              </label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
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
                  Status
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
                  Source
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
            <div className="flex gap-3 pt-3">

              <button
                type="submit"
                disabled={loading}
                className="btn bg-primary flex-1 text-primary-content"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Update Lead"
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/leads/${leadId}`)
                }
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