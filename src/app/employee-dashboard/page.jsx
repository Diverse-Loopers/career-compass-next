'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import './employee-dashboard.css';
import { initEmployeeDashboard } from '@/lib/pages/employee';

export default function EmployeeDashboardPage() {
  useEffect(() => {
    initEmployeeDashboard();
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <Script
        src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"
        strategy="beforeInteractive"
      />

      <div className="dashboard-container">
        {/* Mobile Menu Button */}
        <button id="mobile-menu-btn">☰</button>

        {/* Sidebar */}
        <aside className="sidebar" id="sidebar">
          <div className="logo">
            <img 
              src="/images/logo.png" 
              alt="Logo"
              style={{
                width: '80%',
                marginBottom: '1rem',
                borderRadius: '8px',
                background: 'white',
                padding: '5px'
              }}
            />
            <br />
            Employee Panel
          </div>
          <div className="user-profile-summary" style={{ textAlign: 'center', marginBottom: '2rem', color: '#a6a6b7' }}>
            <div id="sidebar-user-name" style={{ fontWeight: 600, color: 'white' }}>Loading...</div>
            <div id="sidebar-user-id" style={{ fontSize: '0.8rem' }}>...</div>
          </div>
          <nav className="nav-links">
            <button className="active" onClick={() => window.showSection && window.showSection('dashboard')}>
              Dashboard
            </button>
            <button onClick={() => window.showSection && window.showSection('tasks')}>
              My Tasks
            </button>
            <button onClick={() => window.showSection && window.showSection('leaves')}>
              Apply Leave
            </button>
            <button onClick={() => window.logoutUser && window.logoutUser()} style={{ marginTop: 'auto', color: '#ef4444' }}>
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* SECTION: DASHBOARD */}
          <section id="dashboard-section">
            <div className="header flex justify-between items-center" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <div>
                <h2>Welcome back, <span id="welcome-name">User</span>!</h2>
                <p className="text-muted">Here is your daily overview.</p>
              </div>

              <div className="flex items-center" style={{ gap: '15px' }}>
                <div id="attendance-box">
                  <button 
                    id="mark-attendance-btn" 
                    className="btn-primary" 
                    onClick={() => window.markAttendance && window.markAttendance()}
                  >
                    📷 Mark Attendance
                  </button>
                  <p 
                    id="attendance-status" 
                    className="text-muted"
                    style={{ fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'right' }}
                  ></p>
                </div>

                {/* Notification Bell */}
                <div className="notification-wrapper" style={{ position: 'relative' }}>
                  <button 
                    id="notif-btn"
                    style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
                  >
                    🔔 <span id="notif-count" className="badge hidden">0</span>
                  </button>
                  <div id="notif-dropdown" className="dropdown-content hidden">
                    <div className="dropdown-header">
                      Notifications{' '}
                      <button onClick={() => window.markAllRead && window.markAllRead()} className="mark-read-btn">
                        Mark all read
                      </button>
                    </div>
                    <ul id="notif-list">
                      <li className="empty-notif">No new notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-grid">
              <div className="card">
                <h3>Tasks Pending</h3>
                <div className="stat-value" id="stat-pending-tasks">0</div>
              </div>
              <div className="card">
                <h3>Attendance (This Month)</h3>
                <div className="stat-value" id="stat-attendance">0%</div>
              </div>
              <div className="card">
                <h3>Leaves Taken</h3>
                <div className="stat-value" id="stat-leaves">0</div>
              </div>
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Recent Attendance</h3>
            <div className="table-container">
              <table id="recent-attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Status</th>
                    <th>Verification</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </section>

          {/* SECTION: TASKS */}
          <section id="tasks-section" className="hidden">
            <h2>My Tasks</h2>
            <div className="table-container">
              <table id="my-tasks-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date Assigned</th>
                    <th>Deadline</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </section>

          {/* SECTION: LEAVES */}
          <section id="leaves-section" className="hidden">
            <div className="flex items-center justify-between" style={{ marginBottom: '1.5rem' }}>
              <h2>Leave Applications</h2>
              <button 
                className="btn-primary" 
                style={{ width: 'auto' }} 
                onClick={() => window.openLeaveModal && window.openLeaveModal()}
              >
                + Apply Leave
              </button>
            </div>
            <div className="table-container">
              <table id="my-leaves-table">
                <thead>
                  <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      {/* MODAL: SUBMIT TASK */}
      <div id="submit-task-modal" className="modal hidden">
        <div className="modal-content" style={{ textAlign: 'left' }}>
          <h2 style={{ marginBottom: '1rem' }}>Submit Task</h2>
          <form id="submit-task-form" onSubmit={(e) => window.handleSubmitTask && window.handleSubmitTask(e)}>
            <input type="hidden" id="submit-task-id" />
            <div className="input-group">
              <label>Submission Link / Notes</label>
              <textarea 
                id="submission-link" 
                rows={4}
                placeholder="Paste drive link or describe work..."
                required
              ></textarea>
            </div>
            <div className="flex" style={{ gap: '1rem' }}>
              <button type="submit" className="btn-primary">Submit</button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => window.closeModal && window.closeModal('submit-task-modal')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL: APPLY LEAVE */}
      <div id="apply-leave-modal" className="modal hidden">
        <div className="modal-content" style={{ textAlign: 'left' }}>
          <h2 style={{ marginBottom: '1rem' }}>Apply for Leave</h2>
          <form id="apply-leave-form" onSubmit={(e) => window.handleApplyLeave && window.handleApplyLeave(e)}>
            <div className="input-group">
              <label>Start Date</label>
              <input type="date" id="leave-start" required />
            </div>
            <div className="input-group">
              <label>End Date</label>
              <input type="date" id="leave-end" required />
            </div>
            <div className="input-group">
              <label>Reason</label>
              <textarea id="leave-reason" rows={3} required></textarea>
            </div>
            <div className="flex" style={{ gap: '1rem' }}>
              <button type="submit" className="btn-primary">Apply</button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => window.closeModal && window.closeModal('apply-leave-modal')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL: CAMERA (Face Verification) */}
      <div id="camera-modal" className="modal hidden">
        <div className="modal-content">
          <h2>Verify Attendance</h2>
          <div className="camera-feed">
            <video id="video" width="400" height="300" autoPlay muted></video>
            <canvas id="overlay"></canvas>
          </div>
          <p id="status-msg">Loading models...</p>
          <button id="capture-btn" className="btn-secondary" disabled>
            Verify & Check In
          </button>
          <button 
            id="close-modal" 
            className="btn-text" 
            onClick={() => window.closeModal && window.closeModal('camera-modal')}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}