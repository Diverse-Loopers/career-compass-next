"use client";

import Script from "next/script";
import './events.css';

export default function EventDetailsPage() {
  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {/* Icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* FIX: Added Supabase SDK */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
        strategy="beforeInteractive"
      />
      <Script
        src="/js/events.js"
        strategy="afterInteractive"
      />

     

      <div>
        {/* 1. Event Banner Area */}
        <section className="event-banner" id="event-hero">
          <div className="banner-content container">
            {/* Added ID for easier selection */}
            <span className="event-tag" id="event-status-tag">
              Upcoming Event
            </span>
            <h1 id="event-title">Loading Event...</h1>
            <p className="event-short-desc" id="event-short-desc">
              Please wait while we fetch the event details.
            </p>

            <div className="event-meta">
              <div className="meta-item">
                <i className="fa-regular fa-calendar"></i>
                <span id="event-date">--/--/----</span>
              </div>
              <div className="meta-item">
                <i className="fa-solid fa-location-dot"></i>
                <span id="event-location">---</span>
              </div>
            </div>

            <button className="btn-primary" id="open-register-btn">
              Register Now
            </button>
          </div>
          {/* Background Image Overlay */}
          <div className="banner-overlay"></div>
        </section>

        {/* 2. Event Gallery Section */}
        <section className="section-container" id="gallery-section">
          <div className="container">
            <h2 className="section-heading">Event Highlights</h2>
            {/* Grid Layout for 4 photos */}
            <div className="gallery-grid">
              <div className="gallery-item large">
                <div className="placeholder-img">Photo 1 (Main)</div>
                {/* In future: <img src="..." alt="..."> */}
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Photo 2</div>
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Photo 3</div>
              </div>
              <div className="gallery-item">
                <div className="placeholder-img">Photo 4</div>
              </div>
            </div>

            {/* Video Section */}
            <div className="video-container">
              <h3 className="sub-heading">Event Teaser</h3>
              <div className="video-placeholder">
                <i className="fa-solid fa-play-circle"></i>
                <p>Video Placeholder (YouTube/Local)</p>
              </div>
              {/* Future: <iframe ...></iframe> or <video ...></video> */}
            </div>
          </div>
        </section>

        {/* 3. Event Details Section */}
        <section className="section-container bg-light" id="details-section">
          <div className="container content-wrapper">
            <div className="main-content">
              <h2 className="section-heading">About the Event</h2>
              <div id="event-full-desc" className="rich-text">
                <p>Loading detailed description...</p>
              </div>

              <div className="highlights-box">
                <h3>Key Highlights</h3>
                {/* Added ID to fetch dynamic highlights */}
                <ul id="event-highlights">
                  <li>Loading highlights...</li>
                </ul>
              </div>
            </div>

            <div className="sidebar">
              <div className="info-card">
                <h3>Who Should Attend?</h3>
                {/* Added ID */}
                <ul className="check-list" id="who-attend-list">
                  <li>Loading...</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>What You&apos;ll Gain</h3>
                {/* Added ID */}
                <ul className="star-list" id="gain-list">
                  <li>Loading...</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Registration Modal */}
        <div className="modal-overlay" id="registration-modal">
          <div className="modal-container">
            <button className="close-modal-btn" id="close-modal-btn">
              &times;
            </button>

            <div className="modal-header">
              <h2>Event Registration</h2>
              <p>
                Secure your spot for <span id="modal-event-name">this event</span>
              </p>
            </div>

            <form id="registration-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="organization">College / Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    placeholder="University Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Year / Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    required
                    placeholder="e.g. 3rd Year / Developer"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reason">Why do you want to attend?</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows={3}
                  required
                  placeholder="Briefly explain your interest..."
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" id="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="btn-primary full-width">
                  Submit Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}