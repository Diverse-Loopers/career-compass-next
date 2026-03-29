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
          <a className="navbar__link" href="/products">
            Products
          </a>
          {/* <a className="navbar__link" href="#">
            Partners
          </a> */}
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
      <br />

      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">

        {/* Background Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

        {/* Card */}
        <div className="relative z-10 max-w-xl w-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl rounded-3xl p-8 text-center">

          {/* Badge */}
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-indigo-600 bg-indigo-100 rounded-full">
            🚀 Launching Soon
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Something Amazing is Coming
          </h1>

          {/* Description */}
          <p className="text-slate-500 mb-6">
            We're building something powerful. Be the first to know when we go live.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">

            {/* Input */}
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
            >
              Remind Me
            </button>

          </form>
        </div>
      </section>
    </>
  );
}
