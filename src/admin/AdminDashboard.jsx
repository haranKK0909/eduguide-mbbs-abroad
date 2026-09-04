import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  LogOut,
  Users,
  UserPlus,
  PhoneCall,
  Clock3,
  CheckCircle2,
  Eye,
  Download,
  Trash2,
  RefreshCw,
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CalendarDays,
  MessageSquare,
} from "lucide-react";

import "./admin.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://eduguide-backend-wtny.onrender.com";

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Follow-up",
  "Closed",
];

function AdminDashboard() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const [actionLoading, setActionLoading] = useState(false);
  const [actionId, setActionId] = useState(null);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const fetchEnquiries = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const params = new URLSearchParams();

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (statusFilter !== "All") {
          params.set("status", statusFilter);
        }

        const queryString = params.toString();

        const response = await fetch(
          `${API_URL}/api/admin/enquiries${
            queryString ? `?${queryString}` : ""
          }`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 401) {
          navigate("/admin/login", {
            replace: true,
          });
          return;
        }

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to load enquiries."
          );
        }

        setEnquiries(data.enquiries || []);
      } catch (error) {
        console.error(
          "Fetch enquiries error:",
          error
        );

        showToast(
          error.message ||
            "Unable to load enquiries.",
          "error"
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [navigate, search, statusFilter]
  );

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/admin/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          navigate("/admin/login", {
            replace: true,
          });
          return;
        }

        await fetchEnquiries();
      } catch (error) {
        console.error(
          "Admin verification error:",
          error
        );

        navigate("/admin/login", {
          replace: true,
        });
      }
    };

    verifyAdmin();
  }, [navigate, fetchEnquiries]);

  const handleRefresh = () => {
    fetchEnquiries(true);
  };

  const handleLogout = async () => {
    try {
      await fetch(
        `${API_URL}/api/admin/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      setActionLoading(true);
      setActionId(id);

      const response = await fetch(
        `${API_URL}/api/admin/enquiries/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (response.status === 401) {
        navigate("/admin/login", {
          replace: true,
        });
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to update status."
        );
      }

      setEnquiries((current) =>
        current.map((enquiry) =>
          enquiry.id === id
            ? {
                ...enquiry,
                status: newStatus,
              }
            : enquiry
        )
      );

      if (
        selectedEnquiry &&
        selectedEnquiry.id === id
      ) {
        setSelectedEnquiry((current) => ({
          ...current,
          status: newStatus,
        }));
      }

      showToast(
        `Enquiry #${id} updated to ${newStatus}.`
      );
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      showToast(
        error.message ||
          "Unable to update status.",
        "error"
      );
    } finally {
      setActionLoading(false);
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete enquiry #${id}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(true);
      setActionId(id);

      const response = await fetch(
        `${API_URL}/api/admin/enquiries/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        navigate("/admin/login", {
          replace: true,
        });
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to delete enquiry."
        );
      }

      setEnquiries((current) =>
        current.filter(
          (enquiry) => enquiry.id !== id
        )
      );

      if (
        selectedEnquiry &&
        selectedEnquiry.id === id
      ) {
        setSelectedEnquiry(null);
      }

      showToast(
        `Enquiry #${id} deleted successfully.`
      );
    } catch (error) {
      console.error(
        "Delete enquiry error:",
        error
      );

      showToast(
        error.message ||
          "Unable to delete enquiry.",
        "error"
      );
    } finally {
      setActionLoading(false);
      setActionId(null);
    }
  };

  const handleDownloadPDF = async (id) => {
    try {
      setActionLoading(true);
      setActionId(id);

      const response = await fetch(
        `${API_URL}/api/admin/enquiries/${id}/pdf`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 401) {
        navigate("/admin/login", {
          replace: true,
        });
        return;
      }

      if (!response.ok) {
        let message =
          "Unable to generate PDF.";

        try {
          const data =
            await response.json();

          if (data.message) {
            message = data.message;
          }
        } catch {
          // Ignore JSON parsing error.
        }

        throw new Error(message);
      }

      const blob = await response.blob();

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = `EduGuide-Enquiry-${id}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      showToast(
        `PDF for enquiry #${id} downloaded.`
      );
    } catch (error) {
      console.error(
        "PDF download error:",
        error
      );

      showToast(
        error.message ||
          "Unable to download PDF.",
        "error"
      );
    } finally {
      setActionLoading(false);
      setActionId(null);
    }
  };

  const statistics = useMemo(() => {
    return {
      total: enquiries.length,
      new: enquiries.filter(
        (item) => item.status === "New"
      ).length,
      contacted: enquiries.filter(
        (item) => item.status === "Contacted"
      ).length,
      followUp: enquiries.filter(
        (item) => item.status === "Follow-up"
      ).length,
      closed: enquiries.filter(
        (item) => item.status === "Closed"
      ).length,
    };
  }, [enquiries]);

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    return (
      `status-badge status-${String(
        status || ""
      )
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    );
  };

  return (
    <div className="admin-dashboard-page">

      {/* ================= HEADER ================= */}

      <header className="admin-header">
        <div className="admin-header-left">
          <div className="admin-header-logo">
            <ShieldIcon />
          </div>

          <div>
            <h1>EduGuide Admin</h1>
            <span>
              Enquiry Management
            </span>
          </div>
        </div>

        <div className="admin-header-actions">
          <button
            className="admin-icon-button"
            onClick={handleRefresh}
            disabled={refreshing}
            title="Refresh"
          >
            <RefreshCw
              size={19}
              className={
                refreshing
                  ? "rotate-icon"
                  : ""
              }
            />
          </button>

          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      {/* ================= CONTENT ================= */}

      <main className="admin-dashboard-content">

        <div className="admin-page-title">
          <div>
            <h2>Enquiries</h2>
            <p>
              Manage student enquiries and
              admission leads.
            </p>
          </div>
        </div>

        {/* ================= STATISTICS ================= */}

        <div className="admin-stats-grid">

          <StatCard
            title="Total Enquiries"
            value={statistics.total}
            icon={<Users size={22} />}
            className="stat-total"
          />

          <StatCard
            title="New"
            value={statistics.new}
            icon={<UserPlus size={22} />}
            className="stat-new"
          />

          <StatCard
            title="Contacted"
            value={statistics.contacted}
            icon={<PhoneCall size={22} />}
            className="stat-contacted"
          />

          <StatCard
            title="Follow-up"
            value={statistics.followUp}
            icon={<Clock3 size={22} />}
            className="stat-followup"
          />

          <StatCard
            title="Closed"
            value={statistics.closed}
            icon={<CheckCircle2 size={22} />}
            className="stat-closed"
          />

        </div>

        {/* ================= FILTERS ================= */}

        <div className="admin-filter-card">

          <div className="admin-search-box">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search by name, phone, email or country..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="search-clear-button"
                onClick={() => setSearch("")}
              >
                <X size={17} />
              </button>
            )}
          </div>

          <div className="admin-status-filter">
            <label htmlFor="status-filter">
              Status
            </label>

            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >
              <option value="All">
                All Statuses
              </option>

              {STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>

        </div>

        {/* ================= TABLE ================= */}

        <div className="admin-table-card">

          {loading ? (
            <div className="admin-table-loading">
              <div className="admin-spinner"></div>
              <p>Loading enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="admin-empty-state">
              <Users size={48} />
              <h3>No enquiries found</h3>
              <p>
                Try changing your search or
                status filter.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Contact</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {enquiries.map(
                    (enquiry) => (
                      <tr key={enquiry.id}>

                        <td>
                          <span className="enquiry-id">
                            #{enquiry.id}
                          </span>
                        </td>

                        <td>
                          <div className="student-cell">
                            <strong>
                              {enquiry.name}
                            </strong>

                            <span>
                              {enquiry.academic_status}
                            </span>
                          </div>
                        </td>

                        <td>
                          <div className="contact-cell">
                            <span>
                              {enquiry.phone}
                            </span>
                            <span>
                              {enquiry.email}
                            </span>
                          </div>
                        </td>

                        <td>
                          <span className="country-cell">
                            {enquiry.country}
                          </span>
                        </td>

                        <td>
                          <select
                            className={`status-select ${getStatusClass(
                              enquiry.status
                            )}`}
                            value={
                              enquiry.status
                            }
                            disabled={
                              actionLoading &&
                              actionId ===
                                enquiry.id
                            }
                            onChange={(event) =>
                              handleStatusChange(
                                enquiry.id,
                                event.target.value
                              )
                            }
                          >
                            {STATUS_OPTIONS.map(
                              (status) => (
                                <option
                                  key={status}
                                  value={status}
                                >
                                  {status}
                                </option>
                              )
                            )}
                          </select>
                        </td>

                        <td>
                          <span className="date-cell">
                            {formatDate(
                              enquiry.created_at
                            )}
                          </span>
                        </td>

                        <td>
                          <div className="action-buttons">

                            <button
                              className="table-action view"
                              title="View"
                              onClick={() =>
                                setSelectedEnquiry(
                                  enquiry
                                )
                              }
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              className="table-action pdf"
                              title="Download PDF"
                              disabled={
                                actionLoading &&
                                actionId ===
                                  enquiry.id
                              }
                              onClick={() =>
                                handleDownloadPDF(
                                  enquiry.id
                                )
                              }
                            >
                              <Download
                                size={17}
                              />
                            </button>

                            <button
                              className="table-action delete"
                              title="Delete"
                              disabled={
                                actionLoading &&
                                actionId ===
                                  enquiry.id
                              }
                              onClick={() =>
                                handleDelete(
                                  enquiry.id
                                )
                              }
                            >
                              <Trash2 size={17} />
                            </button>

                          </div>
                        </td>

                      </tr>
                    )
                  )}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

      {/* ================= DETAILS MODAL ================= */}

      {selectedEnquiry && (
        <div
          className="admin-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedEnquiry(null);
            }
          }}
        >
          <div className="admin-modal">

            <div className="admin-modal-header">

              <div>
                <span>
                  Enquiry #
                  {selectedEnquiry.id}
                </span>

                <h3>
                  {selectedEnquiry.name}
                </h3>
              </div>

              <button
                className="modal-close-button"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
              >
                <X size={21} />
              </button>

            </div>

            <div className="admin-modal-body">

              <div className="detail-grid">

                <DetailItem
                  icon={<Phone size={18} />}
                  label="Phone"
                  value={
                    selectedEnquiry.phone
                  }
                />

                <DetailItem
                  icon={<Mail size={18} />}
                  label="Email"
                  value={
                    selectedEnquiry.email
                  }
                />

                <DetailItem
                  icon={<MapPin size={18} />}
                  label="Preferred Country"
                  value={
                    selectedEnquiry.country
                  }
                />

                <DetailItem
                  icon={
                    <GraduationCap
                      size={18}
                    />
                  }
                  label="Academic Status"
                  value={
                    selectedEnquiry.academic_status
                  }
                />

                <DetailItem
                  icon={
                    <CalendarDays
                      size={18}
                    />
                  }
                  label="Submitted"
                  value={formatDate(
                    selectedEnquiry.created_at
                  )}
                />

                <DetailItem
                  icon={
                    <Clock3 size={18} />
                  }
                  label="Last Updated"
                  value={formatDate(
                    selectedEnquiry.updated_at
                  )}
                />

              </div>

              <div className="detail-message">

                <div className="detail-message-title">
                  <MessageSquare size={18} />
                  <span>Message</span>
                </div>

                <p>
                  {selectedEnquiry.message ||
                    "No message provided."}
                </p>

              </div>

              <div className="modal-status-section">

                <label>
                  Enquiry Status
                </label>

                <select
                  value={
                    selectedEnquiry.status
                  }
                  disabled={actionLoading}
                  onChange={(event) =>
                    handleStatusChange(
                      selectedEnquiry.id,
                      event.target.value
                    )
                  }
                >
                  {STATUS_OPTIONS.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    )
                  )}
                </select>

              </div>

            </div>

            <div className="admin-modal-footer">

              <button
                className="modal-secondary-button"
                onClick={() =>
                  setSelectedEnquiry(null)
                }
              >
                Close
              </button>

              <button
                className="modal-pdf-button"
                disabled={actionLoading}
                onClick={() =>
                  handleDownloadPDF(
                    selectedEnquiry.id
                  )
                }
              >
                <Download size={18} />
                Download PDF
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= TOAST ================= */}

      {toast && (
        <div
          className={`admin-toast ${
            toast.type === "error"
              ? "toast-error"
              : "toast-success"
          }`}
        >
          {toast.type === "error" ? (
            <X size={19} />
          ) : (
            <CheckCircle2 size={19} />
          )}

          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({
  title,
  value,
  icon,
  className,
}) {
  return (
    <div
      className={`admin-stat-card ${className}`}
    >
      <div className="stat-card-icon">
        {icon}
      </div>

      <div className="stat-card-content">
        <span>{title}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="detail-item">

      <div className="detail-icon">
        {icon}
      </div>

      <div className="detail-content">
        <span>{label}</span>
        <strong>{value || "-"}</strong>
      </div>

    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default AdminDashboard;