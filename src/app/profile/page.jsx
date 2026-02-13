'use client';

import { useEffect } from 'react';
import './profile.css';
import Script from 'next/script';
import { 
  initDashboard, 
  initDashboardListeners,
  toggleHustlerModal 
} from '@/lib/pages/profile';

export default function Dashboard() {
  useEffect(() => {
    initDashboardListeners();
    initDashboard();
  }, []);

  return (
    <>
      {/* External Scripts */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
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

      <div className="h-screen flex overflow-hidden">
        
        {/* Mobile Sidebar Overlay */}
        <div id="sidebar-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] hidden"></div>

        {/* Hustler ID Application Modal */}
        <div id="hustler-modal-overlay" className="fixed inset-0 z-[100] blur-backdrop flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden transform transition-all duration-300">
            <div className="p-8 md:p-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white italic">Hybrid Hustler ID</h2>
                <button 
                  onClick={() => toggleHustlerModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <i data-lucide="x"></i>
                </button>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Apply for your official ID to unlock exclusive project access and payment gateways.
              </p>

              <form id="hustler-id-form" className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Full Legal Name
                  </label>
                  <input 
                    type="text" 
                    id="hustler-name" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Course Registration ID
                  </label>
                  <input 
                    type="text" 
                    id="hustler-reg-id" 
                    required 
                    placeholder="ID from your welcome mail" 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Enrolled Course
                  </label>
                  <input 
                    type="text" 
                    id="hustler-course" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="hustler-email" 
                    required 
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition" 
                  />
                </div>

                <button 
                  type="submit" 
                  id="hustler-submit-btn" 
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center gap-2 mt-4"
                >
                  Submit Application <i data-lucide="send" className="w-4 h-4"></i>
                </button>
                <p id="hustler-form-status" className="text-center text-xs font-bold mt-4 hidden"></p>
              </form>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside id="sidebar" className="w-72 bg-dark flex flex-col fixed lg:static inset-y-0 left-0 z-[70]">
          <div className="p-8 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img src="/Diverse Loopers Black BG (2).png" alt="Logo" className="h-12 w-auto rounded-lg" />
            </a>
            <button id="close-sidebar" className="lg:hidden text-slate-400 hover:text-white">
              <i data-lucide="x"></i>
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            <a 
              href="/" 
              className="sidebar-link w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 font-semibold hover:bg-white/5 transition text-left"
            >
              <i data-lucide="home" className="w-5 h-5"></i> Home
            </a>
            <a 
              href="#" 
              className="sidebar-link active w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-white font-semibold transition text-left"
            >
              <i data-lucide="layout-dashboard" className="w-5 h-5"></i> Dashboard
            </a>
            <a 
              href="#roadmap-section" 
              className="sidebar-link w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 font-semibold hover:bg-white/5 transition text-left"
            >
              <i data-lucide="milestone" className="w-5 h-5"></i> My Analysis
            </a>
            <a 
              href="/career-analyzer" 
              className="sidebar-link w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 font-semibold hover:bg-white/5 transition text-left"
            >
              <i data-lucide="search" className="w-5 h-5"></i> Explore Careers
            </a>
            <a 
              href="/courses" 
              className="sidebar-link w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 font-semibold hover:bg-white/5 transition text-left"
            >
              <i data-lucide="book-open" className="w-5 h-5"></i> Courses
            </a>
            <a 
              href="#" 
              className="sidebar-link w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 font-semibold hover:bg-white/5 transition text-left"
            >
              <i data-lucide="book-open" className="w-5 h-5"></i> My Courses
            </a>
            <a 
              href="/settings" 
              className="sidebar-link w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 font-semibold hover:bg-white/5 transition text-left"
            >
              <i data-lucide="settings" className="w-5 h-5"></i> Settings
            </a>
          </nav>

          <div className="p-6 border-t border-white/5 space-y-4">
            <button 
              id="theme-toggle" 
              className="w-full flex items-center justify-between px-4 py-3 bg-white/5 text-slate-300 rounded-xl font-medium hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-2">
                <i data-lucide="moon" id="theme-icon" className="w-4 h-4"></i>
                <span id="theme-text">Dark Mode</span>
              </div>
              <div className="w-10 h-5 bg-slate-700 rounded-full relative p-1">
                <div 
                  id="theme-toggle-dot" 
                  className="w-3 h-3 bg-white rounded-full transition-all duration-300 transform translate-x-0"
                ></div>
              </div>
            </button>
            <button 
              id="logout-button" 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 rounded-xl font-bold hover:bg-red-500/20 transition"
            >
              <i data-lucide="log-out" className="w-4 h-4"></i> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main id="main-scroll-area" className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar scroll-smooth">
          
          {/* Top Bar (Mobile Only) */}
          <header className="lg:hidden bg-white dark:bg-dark border-b border-slate-200 dark:border-white/5 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <div id="mobile-nav-avatar" className="w-8 h-8 rounded-full border border-primary p-0.5 overflow-hidden hidden">
                <img id="mobile-nav-img" src="" className="profile-avatar rounded-full" />
              </div>
              <span className="font-black text-primary italic">DL Dashboard</span>
            </div>
            <button 
              id="open-sidebar" 
              className="p-2 bg-slate-100 dark:bg-white/5 rounded-xl text-slate-600 dark:text-slate-300"
            >
              <i data-lucide="menu"></i>
            </button>
          </header>

          <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-5">
                {/* Desktop Avatar */}
                <div 
                  id="desktop-profile-avatar" 
                  className="hidden md:block w-16 h-16 rounded-full border-2 border-primary/20 p-1 overflow-hidden"
                >
                  <img 
                    id="desktop-avatar-img" 
                    src="" 
                    className="profile-avatar rounded-full bg-slate-100 dark:bg-white/5" 
                  />
                </div>
                <div>
                  <h1 
                    id="welcome-message" 
                    className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white"
                  >
                    Welcome back!
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base mt-1">
                    Let's chart the course for your dream career.
                  </p>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <p 
                  id="current-date" 
                  className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]"
                ></p>
              </div>
            </div>

            {/* CTA Card */}
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-primary to-secondary text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 group-hover:scale-110 transition duration-700"></div>
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-xl md:text-3xl font-black mb-3">Ready to Discover Your Path?</h2>
                <p className="text-blue-50 opacity-90 mb-6 leading-relaxed text-sm md:text-base">
                  Identify the exact skills you need to land your target job with our AI-driven analyzer.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => window.location.href='/analyzer'} 
                    className="px-6 md:px-8 py-3 md:py-4 bg-white text-primary rounded-2xl font-bold hover:shadow-xl transition active:scale-95 text-sm md:text-base"
                  >
                    Start New Analysis
                  </button>
                  <button 
                    onClick={() => toggleHustlerModal(true)} 
                    className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white border border-white/20 rounded-2xl font-bold hover:bg-primary/90 transition active:scale-95 text-sm md:text-base flex items-center gap-2"
                  >
                    Apply for Hybrid Hustler ID <i data-lucide="id-card" className="w-5 h-5"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Core Progress Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Skills */}
              <div className="glass-card p-6 rounded-[2rem] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 text-primary rounded-xl flex items-center justify-center">
                    <i data-lucide="zap" className="w-5 h-5"></i>
                  </div>
                  <h3 className="font-bold">My Skills</h3>
                </div>
                <div id="skills-container" className="flex flex-wrap gap-2 flex-grow">
                  <div className="skeleton w-20 h-6 rounded-full"></div>
                  <div className="skeleton w-24 h-6 rounded-full"></div>
                </div>
                <a 
                  href="/settings" 
                  className="mt-6 text-xs font-bold text-primary flex items-center gap-1 hover:underline"
                >
                  Edit Skills <i data-lucide="arrow-right" className="w-3 h-3"></i>
                </a>
              </div>

              {/* Target Role */}
              <div className="glass-card p-6 rounded-[2rem] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-pink-50 dark:bg-pink-500/10 text-secondary rounded-xl flex items-center justify-center">
                    <i data-lucide="target" className="w-5 h-5"></i>
                  </div>
                  <h3 className="font-bold">Target Role</h3>
                </div>
                <div className="flex-grow">
                  <div id="target-role-name" className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-1">
                    ---
                  </div>
                  <p id="target-role-desc" className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    Defining destination...
                  </p>
                </div>
                <a 
                  href="/settings" 
                  className="mt-6 text-xs font-bold text-secondary flex items-center gap-1 hover:underline"
                >
                  Update Goal <i data-lucide="arrow-right" className="w-3 h-3"></i>
                </a>
              </div>

              {/* Match Progress */}
              <div className="glass-card p-6 rounded-[2rem] flex flex-col items-center">
                <h3 className="font-bold text-sm mb-4 w-full text-left">Match Confidence</h3>
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path 
                      className="stroke-slate-100 dark:stroke-white/5 fill-none" 
                      strokeWidth="3" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                    <path 
                      id="analysis-circle-fg" 
                      className="stroke-green-500 fill-none transition-all duration-1000" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeDasharray="0, 100" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                    />
                  </svg>
                  <div 
                    id="analysis-match-text" 
                    className="absolute inset-0 flex items-center justify-center text-xl md:text-2xl font-black text-slate-900 dark:text-white"
                  >
                    --%
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-[2rem] md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <i data-lucide="book-open" className="w-4 h-4 text-primary"></i> Active Learning
                  </h3>
                  <span 
                    id="course-count-badge" 
                    className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg"
                  >
                    0 Courses
                  </span>
                </div>
                <div id="enrolled-courses-list" className="space-y-3">
                  <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl animate-pulse h-12"></div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-[2rem] text-center">
                <h3 className="font-bold text-xs mb-4 uppercase text-slate-400">Attendance</h3>
                <div className="text-3xl font-black text-primary mb-1" id="attendance-value">--%</div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    id="attendance-bar" 
                    className="h-full bg-primary transition-all duration-1000" 
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-[2rem] text-center">
                <h3 className="font-bold text-xs mb-4 uppercase text-slate-400">Performance</h3>
                <div className="text-3xl font-black text-secondary mb-1" id="performance-value">--%</div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                  <div 
                    id="performance-bar" 
                    className="h-full bg-secondary transition-all duration-1000" 
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Secondary Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-[2rem]">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <i data-lucide="code-2" className="w-4 h-4 text-blue-500"></i> Course Projects
                </h3>
                <div id="projects-list" className="space-y-3 max-h-40 overflow-y-auto no-scrollbar"></div>
              </div>
              <div className="glass-card p-6 rounded-[2rem]">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <i data-lucide="briefcase" className="w-4 h-4 text-orange-500"></i> Interviews
                </h3>
                <div id="interviews-list" className="space-y-3 max-h-40 overflow-y-auto no-scrollbar"></div>
              </div>
              <div className="glass-card p-6 rounded-[2rem]">
                <h3 className="font-bold flex items-center gap-2 mb-4">
                  <i data-lucide="graduation-cap" className="w-4 h-4 text-green-500"></i> Exams
                </h3>
                <div id="exams-list" className="space-y-3 max-h-40 overflow-y-auto no-scrollbar"></div>
              </div>
            </div>

            {/* Redesigned Minimalist Roadmap */}
            <div 
              id="roadmap-section" 
              className="py-12 bg-white dark:bg-slate-900/30 rounded-[3rem] border border-slate-100 dark:border-white/5"
            >
              <div className="px-8 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <h2 
                    id="roadmap-title" 
                    className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white"
                  >
                    Career Milestone Track
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
                    AI-suggested ascent to industry proficiency.
                  </p>
                </div>
              </div>

              <div className="relative max-w-4xl mx-auto px-6">
                {/* Progress Spine */}
                <div className="absolute left-10 md:left-1/2 top-0 bottom-0 timeline-line -translate-x-1/2 rounded-full opacity-20"></div>

                {/* Milestone Items */}
                <div id="roadmap-items-container" className="relative space-y-10">
                  <div className="text-center py-20 text-slate-400">Loading your path...</div>
                </div>
              </div>
            </div>

            {/* Footer Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
              <div className="p-8 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden group">
                <h4 className="text-lg font-bold mb-1">Hybrid Hustle</h4>
                <p className="text-slate-400 text-xs mb-4">Real industry projects. Real pay.</p>
                <a 
                  href="/#hybrid-hustle" 
                  className="text-primary font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Enroll Now <i data-lucide="arrow-right" className="w-4 h-4"></i>
                </a>
              </div>
              <div className="p-8 glass-card rounded-[2.5rem] border-dashed text-center">
                <h4 className="text-lg font-bold mb-1">AI Suggestions</h4>
                <p id="suggestions-text" className="text-slate-500 text-xs italic leading-relaxed">
                  Analyzing metrics...
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}