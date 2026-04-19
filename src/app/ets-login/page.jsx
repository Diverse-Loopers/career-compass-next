"use client";

import { useState } from "react";
import "../register/register.css"; // reuse same styles

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const err = {};

    if (!email || !email.includes("@")) {
      err.email = "Enter a valid email";
    }

    if (!password) {
      err.password = "Password is required";
    }

    setErrors(err);

    if (Object.keys(err).length > 0) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email, // 🔥 FIX
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.error || "Login failed" });
        return;
      }

      if (data.success) {
        setSuccessMsg(data.message); // ✅ SHOW MESSAGE
        setErrors({});
      } else {
        setErrors({ general: data.message });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container" style={{ maxWidth: "480px" }}>
        {/* Header */}
        <div className="register-header">
          <p className="register-header__logo">SkillVerify</p>
          <h1 className="register-header__title">Welcome back</h1>
        </div>

        {/* Card */}
        <div className="register-card">
          <h2 className="register-card__title">Login</h2>
          <p className="register-card__desc">
            Enter your credentials to access your account.
          </p>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              className={`form-input${errors.email ? " form-input--error" : ""}`}
              type="email"
              placeholder="rahul@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="form-hint form-hint--error">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrap">
              <input
                className={`form-input${errors.password ? " form-input--error" : ""}`}
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: "2.75rem" }}
              />
              <button
                className="toggle-pass"
                type="button"
                onClick={() => setShowPass((v) => !v)}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>

            {errors.password && (
              <span className="form-hint form-hint--error">
                {errors.password}
              </span>
            )}
          </div>

          {/* Forgot Password */}
          <div
            style={{
              textAlign: "right",
              marginBottom: "1rem",
              fontSize: "0.8rem",
            }}
          >
            <a
              href="#"
              style={{
                color: "#0051d5",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Forgot password?
            </a>
          </div>

          {/* General Error */}
          {errors.general && (
            <div
              className="form-hint form-hint--error"
              style={{ marginBottom: "1rem" }}
            >
              {errors.general}
            </div>
          )}
          {successMsg && (
            <div
              style={{
                background: "#e6f9ec",
                color: "#0a7a33",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "1rem",
                fontSize: "0.9rem",
              }}
            >
              {successMsg}
            </div>
          )}

          {/* Login Button */}
          <button
            className="btn-register"
            onClick={handleLogin}
            type="button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          {/* Divider */}
          <div
            style={{
              margin: "1.5rem 0",
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#777",
            }}
          >
            — OR —
          </div>

          {/* Go to Register */}
          <button
            className="btn-back"
            onClick={() => (window.location.href = "/register")}
            type="button"
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}
