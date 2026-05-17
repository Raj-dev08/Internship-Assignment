import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLeadStore } from "../store/userLeadStore";
import { useAuthStore } from "../store/useAuthStore";
import type { Lead } from "../store/userLeadStore";

export default function LeadsPage() {
  const { user } = useAuthStore();

  const {
    leads,
    loading,
    page,
    hasMore,
    total,
    getLeads,
    deleteLead,
  } = useLeadStore();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
  });

  useEffect(() => {
    getLeads({
      page: 1,
      limit: 6,
    });
  }, []);

  const handleSearch = async () => {
    await getLeads({
      page: 1,
      limit: 6,
      search: filters.search,
      status: filters.status,
      source: filters.source,
    });
  };

  const nextPage = async () => {
    await getLeads({
      page: page + 1,
      limit: 6,
      search: filters.search,
      status: filters.status,
      source: filters.source,
    });
  };

  const prevPage = async () => {
    if (page === 1) return;

    await getLeads({
      page: page - 1,
      limit: 6,
      search: filters.search,
      status: filters.status,
      source: filters.source,
    });
  };

  return (
    <div className="min-h-screen bg-base-200 pb-28">

      {/* TOP */}
      <div className="max-w-6xl mx-auto px-4 py-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Leads Dashboard
            </h1>

            <p className="text-sm opacity-60 mt-1">
              Total Leads: {total}
            </p>
          </div>

          <Link
            to="/create-lead"
            className="btn btn-primary"
          >
            Create Lead
          </Link>

        </div>

        {/* FILTERS */}
        <div className="card bg-base-100 shadow-xl border border-base-300 mb-6">

          <div className="card-body grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Search name or email"
              className="input input-bordered w-full"
              value={filters.search}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
            />

            <select
              className="select select-bordered w-full"
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="lost">Lost</option>
            </select>

            <select
              className="select select-bordered w-full"
              value={filters.source}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  source: e.target.value,
                })
              }
            >
              <option value="">All Sources</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="instagram">Instagram</option>
            </select>

            <button
              onClick={handleSearch}
              className="btn btn-secondary"
            >
              Apply Filters
            </button>

          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : leads.length === 0 ? (
          <div className="card bg-base-100 shadow-lg border border-base-300">

            <div className="card-body text-center py-14">

              <h2 className="text-2xl font-bold">
                No Leads Found
              </h2>

              <p className="opacity-60 mt-2">
                Create a lead or try different filters
              </p>

            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {leads.map((lead: Lead) => (
              <div
                key={lead._id}
                className="card bg-base-100 shadow-xl border border-base-300 hover:scale-[1.01] transition-all"
              >

                <div className="card-body space-y-3">

                  <div className="flex items-center justify-between">

                    <h2 className="card-title">
                      {lead.name}
                    </h2>

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

                  <p className="text-sm opacity-70">
                    {lead.email}
                  </p>

                  <div className="flex items-center justify-between text-sm">

                    <span className="opacity-60">
                      Source
                    </span>

                    <span className="font-medium capitalize">
                      {lead.source}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="opacity-60">
                      Created
                    </span>

                    <span>
                      {new Date(
                        lead.createdAt
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <div className="card-actions justify-end pt-3">

                    <Link
                      to={`/leads/${lead._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      View
                    </Link>

                    {(user?.isAdmin ||
                      user?._id === lead.userId) && (
                      <>
                        <Link
                          to={`/update-lead/${lead._id}`}
                          className="btn btn-sm btn-info"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            deleteLead(lead._id)
                          }
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </>
                    )}

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-4 mt-10">

          <button
            onClick={prevPage}
            disabled={page === 1}
            className="btn btn-outline"
          >
            Prev
          </button>

          <div className="font-semibold">
            Page {page}
          </div>

          <button
            onClick={nextPage}
            disabled={!hasMore}
            className="btn btn-primary"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}