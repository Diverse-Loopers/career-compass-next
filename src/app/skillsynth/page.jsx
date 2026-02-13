"use client";

import './skillsynth.css'
import Script from "next/script";

export default function FameWallPage() {
  return (
    <>
      {/* External Libraries */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="afterInteractive" />
      <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />

      {/* YOUR EXTERNAL LOGIC FILE */}
      <Script src="/js/skillsynth.js" strategy="afterInteractive" />

      <main className="font-sans text-slate-700 bg-white min-h-screen flex flex-col overflow-x-hidden">

        {/* NAV */}
        <nav className="fixed top-0 w-full z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <a href="/" className="flex items-center gap-2">
                <img src="/DIVERSE LOOPERS (1) bg.png" className="h-10 md:h-12 w-auto" />
              </a>

              <div className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-slate-600 hover:text-primary font-medium text-sm">Home</a>
                <a href="#wall-of-fame" className="text-slate-600 hover:text-primary font-medium text-sm">Wall of Fame</a>
                <a href="#events" className="text-slate-600 hover:text-primary font-medium text-sm">Events</a>
                <a href="#hire-talent" className="text-slate-600 hover:text-primary font-medium text-sm">Hire Talent</a>
              </div>

              <button
                id="mobile-menu-toggle"
                className="md:hidden p-2 text-slate-600"
              >
                <i data-lucide="menu"></i>
              </button>
            </div>
          </div>

          <div
            id="mobile-menu"
            className="hidden md:hidden bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl text-center"
          >
            <a href="/" className="block font-bold">Home</a>
            <a href="#wall-of-fame" className="block font-bold">Wall of Fame</a>
            <a href="#events" className="block font-bold">Events</a>
            <a href="#hire-talent" className="block font-bold">Hire Talent</a>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative pt-40 pb-24 text-center bg-slate-900">

          <div className="absolute top-24 left-4 md:left-8 z-30">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm"
            >
              <i data-lucide="arrow-left" className="w-4 h-4"></i>
              Go Back
            </button>
          </div>

          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            <h1 className="text-4xl md:text-7xl font-black text-white">
              Celebrating Excellence.
            </h1>
          </div>
        </section>

        {/* WALL OF FAME */}
        <section id="wall-of-fame" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div
              id="achiever-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              <div className="animate-pulse bg-slate-100 rounded-[2.5rem] h-[480px]"></div>
              <div className="animate-pulse bg-slate-100 rounded-[2.5rem] h-[480px] hidden md:block"></div>
              <div className="animate-pulse bg-slate-100 rounded-[2.5rem] h-[480px] hidden lg:block"></div>
            </div>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div
              id="dynamic-events-grid"
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="animate-pulse bg-white rounded-[3.5rem] h-72"></div>
              <div className="animate-pulse bg-white rounded-[3.5rem] h-72 hidden md:block"></div>
            </div>
          </div>
        </section>

        {/* HIRING FORM */}
        <section id="hiring-form" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <form id="talent-request-form" className="space-y-6">
              <input
                name="company_name"
                required
                className="input-field"
                placeholder="Company Name"
              />
              <button
                type="submit"
                className="w-full py-5 bg-primary text-white rounded-3xl font-black"
              >
                Submit Requirement
              </button>

              <div id="form-msg" className="hidden"></div>
            </form>
          </div>
        </section>

      </main>
    </>
  );
}
