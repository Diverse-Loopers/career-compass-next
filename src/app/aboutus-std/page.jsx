"use client";

import './aboutus-std.css';
import Script from "next/script";

export default function AboutPage() {
  return (
    <>
      {/* External Scripts */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="afterInteractive" />
      {/* <Script src="/about-three.js" strategy="afterInteractive" /> */}
      <Script src="/js/aboutus.js" strategy="afterInteractive" />

      <main className="antialiased selection:bg-indigo-500 selection:text-white bg-[#0f172a] text-slate-200 overflow-x-hidden">

        {/* 3D CANVAS */}
        <div id="canvas-container"></div>

        {/* ================= NAVBAR ================= */}
        <nav id="navbar" className="fixed w-full z-50 glass-panel">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">

              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => window.scrollTo(0, 0)}
              >
                <img src="/Diverse Loopers Black BG (2).png" className="h-10 w-10 object-contain" />
              </div>

              <div className="hidden md:flex space-x-8">
                <a href="#mission">Mission</a>
                <a href="#hybrid-hustle">Hybrid Hustle</a>
                <a href="#join-hustle">Register</a>
                <a href="/">Home</a>
                <a href="/#contact">Contact</a>
              </div>

              <button
                className="md:hidden"
                onClick={() =>
                  document.getElementById("mobile-menu")?.classList.toggle("hidden")
                }
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>

          <div id="mobile-menu" className="hidden md:hidden glass-panel">
            <a href="#mission" className="block px-3 py-2">Mission</a>
            <a href="#hybrid-hustle" className="block px-3 py-2">Hybrid Hustle</a>
            <a href="#join-hustle" className="block px-3 py-2">Register</a>
          </div>
        </nav>

        {/* ================= HERO ================= */}
        <header className="relative pt-32 pb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold">
            Learn Skills.<br />
            <span className="text-gradient">Do Real Work.</span><br />
            Earn & Grow.
          </h1>
        </header>

        {/* ================= MISSION ================= */}
        <section id="mission" className="py-20">
          <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                More Than Just a Platform
              </h2>
              <p className="text-lg text-gray-300">
                Diverse Loopers bridges the gap between academic theory and industry reality.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-xl">
                <h3>Real Skills</h3>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <h3>Live Projects</h3>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <h3>Earn</h3>
              </div>
              <div className="glass-card p-6 rounded-xl">
                <h3>Career Growth</h3>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY WE EXIST ================= */}
        <section className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why Diverse Loopers Exists
            </h2>
          </div>
        </section>

        {/* ================= HYBRID HUSTLE ================= */}
        <section id="hybrid-hustle" className="py-24 relative">
          <div id="journey" className="relative mt-20">
            <div className="journey-line"></div>

            {[1,2,3,4,5].map((step)=>(
              <div key={step} className="flex items-center justify-center my-12">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= JOIN FORM ================= */}
        <section id="join-hustle" className="py-24 flex justify-center">
          <div className="max-w-4xl w-full px-4">
            <form id="hustler-form" className="space-y-6 glass-panel p-8 rounded-2xl">

              <input id="hustler-name" name="name" required placeholder="Full Name"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3" />

              <input id="hustler-college" name="college" required placeholder="College"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3" />

              <input id="hustler-email" name="email" required type="email"
                placeholder="Email"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3" />

              <button type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold">
                Enroll in the Hustle!
              </button>

              <p id="hustler-message" className="hidden text-center"></p>

            </form>
          </div>
        </section>

        {/* ================= TRANSPARENCY ================= */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 px-4">
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-bold">Transparency Matters</h3>
            </div>
            <div className="glass-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-bold">Who Is This For?</h3>
            </div>
          </div>
        </section>

        {/* ================= OPPORTUNITIES ================= */}
        <section className="py-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-4">Leadership Roles</div>
            <div className="glass-card p-4">Mentorship</div>
            <div className="glass-card p-4">Company Placements</div>
            <div className="glass-card p-4">Core Team Access</div>
          </div>
        </section>

        {/* ================= TOOLS ================= */}
        <section className="py-20 bg-black/20">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-4">
            <div className="glass-card p-8 rounded-2xl">
              <h3>Path Analyzer Tool</h3>
            </div>
            <div className="glass-card p-8 rounded-2xl">
              <h3>Career Analyzer Tool</h3>
            </div>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Diverse Loopers. All rights reserved.
          </p>
        </footer>

      </main>
    </>
  );
}
