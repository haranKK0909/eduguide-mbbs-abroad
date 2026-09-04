import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff, ShieldCheck } from "lucide-react";
import "./admin.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://eduguide-backend-wtny.onrender.com";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const checkSession = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      // Already logged in
      if (response.ok) {
        navigate("/admin/dashboard", {
          replace: true,
        });
        return;
      }

      // 401 simply means no active admin session.
      // This is normal on the login page.
      if (response.status === 401) {
        return;
      }

      console.warn(
        `Admin session check returned ${response.status}`
      );
    } catch (error) {
      console.error(
        "Session check failed:",
        error
      );
    } finally {
      setCheckingSession(false);
    }
  };

  checkSession();
}, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="admin-auth-page">
        <div className="admin-loading-card">
          <div className="admin-spinner"></div>
          <p>Checking admin session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-auth-page">
      <div className="admin-login-card">

        <div className="admin-logo">
          <ShieldCheck size={34} />
        </div>

        <div className="admin-login-heading">
          <h1>EduGuide Admin</h1>
          <p>Secure administration panel</p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-input-group">
            <label htmlFor="admin-email">
              Admin Email
            </label>

            <div className="admin-input-wrapper">
              <Mail size={19} />

              <input
                id="admin-email"
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                autoComplete="username"
              />
            </div>
          </div>

          <div className="admin-input-group">
            <label htmlFor="admin-password">
              Password
            </label>

            <div className="admin-input-wrapper">
              <LockKeyhole size={19} />

              <input
                id="admin-password"
                type={
                  showPassword ? "text" : "password"
                }
                placeholder="Enter admin password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

        </form>

        <div className="admin-security-note">
          <LockKeyhole size={15} />
          <span>Protected admin area</span>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;