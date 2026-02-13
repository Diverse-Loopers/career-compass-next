"use client";

import './settings.css';
import Script from "next/script";


export default function SettingsPage() {
  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* CDN Scripts */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/lucide@latest" strategy="beforeInteractive" />

      {/* Tailwind Config */}
      <Script id="tailwind-config" strategy="beforeInteractive">
        {`
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                colors: {
                  primary: '#4f46e5',
                  secondary: '#9333ea',
                  dark: '#0c0d19'
                }
              }
            }
          }
        `}
      </Script>

     <Script src="/js/settings.js" strategy="afterInteractive" />

      {/* TOAST */}
      <div
        id="toast"
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl transform -translate-y-[100px] transition-transform duration-500 flex items-center gap-3 font-bold text-sm"
      >
        <i id="toast-icon" className="w-4 h-4"></i>
        <span id="toast-message"></span>
      </div>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <a
              href="/profile"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition"
            >
              <i data-lucide="chevron-left" className="w-5 h-5 text-slate-500"></i>
            </a>
            <h1 className="text-3xl font-black tracking-tight">Settings</h1>
          </div>

          <button
            id="theme-toggle"
            className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
          >
            <i data-lucide="moon" id="theme-icon"></i>
          </button>
        </div>

        {/* CONTAINER */}
        <div className="glass-card rounded-[2.5rem] overflow-hidden shadow-sm">
          {/* TABS */}
          <div className="flex border-b border-slate-100 dark:border-white/5 px-8">
            <button
             onClick={() => window.switchTab && window.switchTab("profile")}

              id="tab-profile"
              className="tab-btn active px-6 py-5 text-sm font-bold transition"
            >
              Profile
            </button>
            <button
              onClick={() => window.switchTab && window.switchTab("career")}

              id="tab-career"
              className="tab-btn px-6 py-5 text-sm font-bold text-slate-400 transition"
            >
              Career & Skills
            </button>
            <button
             onClick={() => window.switchTab && window.switchTab("account")}

              id="tab-account"
              className="tab-btn px-6 py-5 text-sm font-bold text-slate-400 transition"
            >
              Account
            </button>
          </div>

          {/* PROFILE TAB */}
          <div id="view-profile" className="p-8 md:p-12 space-y-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10 bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                  <img id="avatar-preview" src="/images/logo.png" className="w-full h-full object-cover hidden" />
                  <i data-lucide="user" id="avatar-placeholder" className="w-12 h-12 text-slate-300"></i>
                </div>

                <label
                  htmlFor="avatar-input"
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition shadow-lg"
                >
                  <i data-lucide="camera" className="w-4 h-4"></i>
                  <input type="file" id="avatar-input" className="hidden" accept="image/*" />
                </label>
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold">Your Avatar</h3>
                <p className="text-sm text-slate-500">JPG or PNG. Max size of 800K.</p>
              </div>
            </div>

            <form id="profile-form" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Full Name
                </label>
                <input id="full-name" type="text" className="input-field" placeholder="e.g. John Doe" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Email Address (Auth)
                </label>
                <input id="email" type="email" className="input-field opacity-60 cursor-not-allowed" disabled />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Bio / Headline
                </label>
                <textarea id="bio" rows="3" className="input-field" placeholder="Briefly describe yourself..." />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2"
                >
                  Save Changes <i data-lucide="save" className="w-4 h-4"></i>
                </button>
              </div>
            </form>
          </div>

          {/* CAREER TAB */}
          <div id="view-career" className="hidden p-8 md:p-12 space-y-12"></div>

          {/* ACCOUNT TAB */}
          <div id="view-account" className="hidden p-8 md:p-12 space-y-8"></div>
        </div>
      </main>

      {/* ✅ External JS (UNCHANGED BUSINESS LOGIC) */}
      
    </>
  );
}
