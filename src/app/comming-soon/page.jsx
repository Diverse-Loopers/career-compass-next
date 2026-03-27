"use client";

import { useState } from "react";
import "./comming-soon.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__logo">Diverse Loopers</div>

        <div className="navbar__links">
          <a className="navbar__link" href="/">
            Home
          </a>
          <a className="navbar__link" href="#">
            Products
          </a>
          <a className="navbar__link" href="#">
            Partners
          </a>
          <a className="navbar__link" href="/about">
            About
          </a>
          <a className="navbar__link" href="/login">
            Login
          </a>
          <a className="navbar__btn-register" href="/login">
            Register
          </a>
        </div>

        <button
          className="navbar__menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}

export default function ComingSoon() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks! We'll notify you: ${email}`);
    setEmail("");
  };

  return (
    <>
      <Navbar />

      <section className="coming">
        <div className="coming__blob coming__blob--1"></div>
        <div className="coming__blob coming__blob--2"></div>

        <div className="coming__card">
          <span className="coming__badge">🚀 Launching Soon</span>

          <h1 className="coming__title text-gradient">
            Something Amazing is Coming
          </h1>

          <p className="coming__desc">
            We're building something powerful. Be the first to know when we go
            live.
          </p>

          <form className="coming__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="coming__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="coming__btn">
              Remind Me
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
