"use client";

import Script from "next/script";
import { useEffect } from "react";
import "./hrms-login.css";
import { initAuthListeners, switchTab } from "@/lib/pages/auth";

export default function HRMSLoginPage() {
  useEffect(() => {
    // Initialize auth listeners
    initAuthListeners();
    
    // Expose switchTab to window for onclick handlers
    if (typeof window !== 'undefined') {
      window.switchTab = switchTab;
    }
  }, []);

  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Scripts */}
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="beforeInteractive" />

      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="login-container">
          <div className="header">
            <img
              src="/assets/images/logo.png"
              alt="Company Logo"
              style={{ height: "80px", marginBottom: "1rem" }}
            />
            <h1>HRMS Portal</h1>
            <p>Welcome back! Please login to continue.</p>
          </div>

          <div className="tabs">
            <button 
              className="tab active" 
              onClick={() => switchTab('employee')}
            >
              Employee Login
            </button>
            <button 
              className="tab" 
              onClick={() => switchTab('admin')}
            >
              Admin Login
            </button>
          </div>

          {/* Employee Login Form */}
          <div id="employee-login" className="form-section">
            <div className="input-group">
              <label htmlFor="emp-id">Employee ID</label>
              <input type="text" id="emp-id" placeholder="e.g. AB123" maxLength={5} required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" id="emp-password" placeholder="Enter your password" required />
            </div>

            <button type="button" id="emp-login-btn" className="btn-primary" style={{ marginTop: "1rem" }}>
              Login
            </button>
            <p id="emp-error" className="error-msg"></p>
          </div>

          {/* Admin Login Form */}
          <div id="admin-login" className="form-section hidden">
            <div className="input-group">
              <label htmlFor="admin-email">Email</label>
              <input type="email" id="admin-email" placeholder="admin@hrms.com" />
            </div>
            <div className="input-group">
              <label htmlFor="admin-password">Password</label>
              <input type="password" id="admin-password" placeholder="********" />
            </div>

            <button id="admin-login-btn" className="btn-primary">
              Login as Admin
            </button>
            <p id="admin-error" className="error-msg"></p>
          </div>
        </div>

        {/* Face Verification Modal */}
        <div id="camera-modal" className="modal hidden">
          <div className="modal-content">
            <h2>Face Verification</h2>
            <div className="camera-feed">
              <video id="video" width="400" height="300" autoPlay muted></video>
              <canvas id="overlay"></canvas>
            </div>
            <p id="status-msg">Loading models...</p>
            <button id="capture-btn" className="btn-secondary" disabled>
              Verify
            </button>
            <button id="close-modal" className="btn-text">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}