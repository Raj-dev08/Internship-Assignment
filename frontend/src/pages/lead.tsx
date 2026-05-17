// pages/LeadDetailsPage.tsx

import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { useLeadStore } from "../store/userLeadStore";
import { useAuthStore } from "../store/useAuthStore";

export default function LeadDetailsPage() {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const {
    selectedLead,
    loading,
    getLeadById,
    deleteLead,
  } = useLeadStore();

  useEffect(() => {
    if (leadId) {
      getLeadById(leadId);
    }
  }, [leadId]);

  const handleDelete = async () => {
    if (!leadId) return;

    const ok = confirm("Delete this lead?");
    if (!ok) return;

    const res = await deleteLead(leadId);

    if (res) {
      navigate("/");
    }
  };

  if (loading || !selectedLead) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const lead = selectedLead;

  const canEdit =
    user?.isAdmin || user?._id === lead.userId;

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10 pb-28">

      <div className="max-w-2xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-4"
        >
          Back
        </button>

        {/* CARD */}
        <div className="card bg-base-100 border border-base-300 shadow-2xl">

          <div className="card-body space-y-5">

            {/* HEADER */}
            <div className="flex items-start justify-between">

              <div>
                <h1 className="text-3xl font-bold">
                  {lead.name}
                </h1>

                <p className="opacity-60 mt-1">
                  Lead details
                </p>
              </div>

              <div
                className={`badge ${
                  lead.status === "qualified"
                    ? "badge-success"
                    : lead.status === "lost"
                    ? "badge-error"
                    : lead.status === "contacted"
                    ? "badge-warning"
                    : "badge-info"
                }`}
              >
                {lead.status}
              </div>

            </div>

            {/* INFO */}
            <div className="bg-base-200 rounded-xl p-4 space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="opacity-60">
                  Email
                </span>
                <span>{lead.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="opacity-60">
                  Source
                </span>
                <span className="capitalize">
                  {lead.source}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="opacity-60">
                  Created
                </span>
                <span>
                  {new Date(
                    lead.createdAt
                  ).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="opacity-60">
                  Updated
                </span>
                <span>
                  {new Date(
                    lead.updatedAt
                  ).toLocaleString()}
                </span>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">

              <Link
                to="/"
                className="btn btn-outline flex-1"
              >
                All Leads
              </Link>

              {canEdit && (
                <Link
                  to={`/update-lead/${lead._id}`}
                  className="btn btn-info flex-1"
                >
                  Edit
                </Link>
              )}

            </div>

            {/* DELETE */}
            {canEdit && (
              <button
                onClick={handleDelete}
                className="btn bg-error w-full text-error-content"
              >
                Delete Lead
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}