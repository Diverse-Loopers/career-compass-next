"use client";

import Script from "next/script";
import { useEffect } from "react";
import "./courses.css";
import { initCourses } from "@/lib/pages/courses";

export default function CoursesPage() {
  useEffect(() => {
    initCourses();
  }, []);

  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Scripts */}

      <Script src="https://unpkg.com/lucide@latest" strategy="beforeInteractive" />



      <div className="bg-white font-sans text-slate-800 selection:bg-primary selection:text-white flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <a href="/index" className="flex items-center gap-2">
                <img src="/DIVERSE LOOPERS (1) bg.png" alt="DL" className="h-10 w-auto" style={{ height: "65px" }} />
              </a>

              <div className="hidden md:flex items-center space-x-8">
                <a href="/" className="text-slate-600 hover:text-primary font-semibold transition">
                  Home
                </a>
                <a href="/courses" className="text-primary font-bold transition">
                  Courses
                </a>

                <a
                  href="/login"
                  id="nav-login-btn"
                  className="px-5 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                >
                  Login
                </a>
                <a
                  href="/profile"
                  id="nav-profile-btn"
                  className="hidden w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition shadow-sm border border-slate-200"
                >
                  <i data-lucide="user" className="w-5 h-5"></i>
                </a>
              </div>

              <button id="mobile-menu-toggle" className="md:hidden p-2 text-slate-600">
                <i data-lucide="menu"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <div id="mobile-menu" className="hidden md:hidden bg-white border-b border-slate-100 px-6 py-8 space-y-4">
            <a href="/" className="block text-lg font-bold text-slate-700">
              Home
            </a>
            <a href="/courses" className="block text-lg font-bold text-primary">
              Courses
            </a>
            <hr className="border-slate-100" />
            <a href="/login" id="mobile-login-link" className="block text-lg font-bold text-slate-700">
              Login
            </a>
            <a href="/profile" id="mobile-profile-link" className="hidden block text-lg font-bold text-slate-700">
              My Profile
            </a>
          </div>
        </nav>

        <main className="pt-20 flex-grow">
          {/* Hero Area */}
          <section className="relative py-24 md:py-32 overflow-hidden hero-gradient">
            <ul className="circles">
              <li style={{ left: "25%", width: "80px", height: "80px", animationDelay: "0s" }}></li>
              <li style={{ left: "10%", width: "20px", height: "20px", animationDelay: "2s", animationDuration: "12s" }}></li>
              <li style={{ left: "70%", width: "20px", height: "20px", animationDelay: "4s" }}></li>
              <li style={{ left: "40%", width: "60px", height: "60px", animationDelay: "0s", animationDuration: "18s" }}></li>
            </ul>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
              <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-primary text-xs font-bold tracking-widest uppercase mb-6 fade-in">
                Knowledge Ecosystem
              </span>
              <h1 className="text-4xl md:text-7xl font-heading font-black text-slate-900 leading-tight mb-6 fade-in">
                A New Model of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Learning.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed fade-in">
                Our programs are structured career pathways designed to take you from fundamentals to real-world contribution.
                Build proof of capability, not just certificates.
              </p>
            </div>
          </section>

          {/* New Learning Model Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="fade-in">
                  <h2 className="text-3xl font-heading font-black text-slate-900 mb-6">Built for Real Careers</h2>
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    Instead of memorizing concepts, learners build proof of capability through an industry-embedded ecosystem.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 text-primary rounded-lg">
                        <i data-lucide="milestone" className="w-4 h-4"></i>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">Structured Milestones</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-pink-50 text-secondary rounded-lg">
                        <i data-lucide="briefcase" className="w-4 h-4"></i>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">Industry Projects</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                        <i data-lucide="user-check" className="w-4 h-4"></i>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">Practitioner Mentors</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                        <i data-lucide="zap" className="w-4 h-4"></i>
                      </div>
                      <p className="text-sm font-semibold text-slate-700">Hybrid Hustle Access</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 fade-in shadow-inner">
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-slate-100">
                      <span className="w-8 h-8 flex items-center justify-center bg-blue-100 text-primary rounded-full font-bold text-xs">
                        1
                      </span>
                      <p className="text-sm font-medium">Guided learning with structured milestones</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-slate-100">
                      <span className="w-8 h-8 flex items-center justify-center bg-pink-100 text-secondary rounded-full font-bold text-xs">
                        2
                      </span>
                      <p className="text-sm font-medium">Portfolio-building & documentation support</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-slate-100">
                      <span className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full font-bold text-xs">
                        3
                      </span>
                      <p className="text-sm font-medium">Interview prep & role-specific guidance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Tracks (Aspire & Sprint) */}
          <section className="py-24 bg-surface border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 fade-in">
                <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6">
                  Choose Your Learning Path
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Every learner starts at a different stage. We created two tracks designed for different journeys.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10 mb-20">
                {/* Track 1: Aspire */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 fade-in flex flex-col hover:border-primary transition duration-500">
                  <div className="w-16 h-16 bg-blue-50 text-primary rounded-3xl flex items-center justify-center mb-8">
                    <i data-lucide="compass" className="w-10 h-10"></i>
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">Aspire</h3>
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mb-6">
                    Foundation + Exploration
                  </p>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Best for 1st/2nd year students and beginners who want clarity before choosing a specialization.
                  </p>
                  <ul className="space-y-4 mb-10 flex-grow">
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-primary w-5 h-5"></i> Fundamentals of programming
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-primary w-5 h-5"></i> Logical problem-solving
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-primary w-5 h-5"></i> Exposure to multiple tech domains
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-primary w-5 h-5"></i> Guided mini-projects
                    </li>
                  </ul>
                  <div className="p-6 bg-slate-50 rounded-2xl italic text-xs text-slate-500">
                    "Aspire creates clarity before commitment."
                  </div>
                </div>

                {/* Track 2: Sprint */}
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 fade-in flex flex-col hover:border-secondary transition duration-500">
                  <div className="w-16 h-16 bg-pink-50 text-secondary rounded-3xl flex items-center justify-center mb-8">
                    <i data-lucide="rocket" className="w-10 h-10"></i>
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4">Sprint</h3>
                  <p className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">
                    Job-Ready Acceleration
                  </p>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    Best for graduates and job-seekers preparing for internships or professional career transitions.
                  </p>
                  <ul className="space-y-4 mb-10 flex-grow">
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-secondary w-5 h-5"></i> Specialization-based learning
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-secondary w-5 h-5"></i> Live business-driven projects
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-secondary w-5 h-5"></i> Portfolio & GitHub readiness
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <i data-lucide="check" className="text-secondary w-5 h-5"></i> Mock interviews & career mentorship
                    </li>
                  </ul>
                  <div className="p-6 bg-slate-50 rounded-2xl italic text-xs text-slate-500">
                    "Move from knowledge to work-ready contribution."
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="fade-in overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-8 py-6 text-xs font-black uppercase text-slate-400">Track</th>
                        <th className="px-8 py-6 text-xs font-black uppercase text-slate-400">Best For</th>
                        <th className="px-8 py-6 text-xs font-black uppercase text-slate-400">Primary Goal</th>
                        <th className="px-8 py-6 text-xs font-black uppercase text-slate-400">Style</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-sm">
                      <tr className="hover:bg-blue-50 transition duration-300">
                        <td className="px-8 py-6 text-primary font-bold">Aspire</td>
                        <td className="px-8 py-6">Beginners, early-year students</td>
                        <td className="px-8 py-6">Explore & build basics</td>
                        <td className="px-8 py-6">Steady and guided</td>
                      </tr>
                      <tr className="hover:bg-pink-50 transition duration-300">
                        <td className="px-8 py-6 text-secondary font-bold">Sprint</td>
                        <td className="px-8 py-6">Final-year, graduates, job-seekers</td>
                        <td className="px-8 py-6">Become job-ready & specialize</td>
                        <td className="px-8 py-6">Fast-paced and focused</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Program Structure (4 Pillars) */}
          <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 fade-in">
                <h2 className="text-3xl font-heading font-black text-slate-900 mb-4">How Learning Happens</h2>
                <p className="text-slate-500">Every program is structured across four high-impact pillars.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { num: "1", title: "Learn", desc: "Concepts explained through practical, industry-driven sessions." },
                  { num: "2", title: "Apply", desc: "Hands-on tasks, challenges, and guided assignments." },
                  { num: "3", title: "Build", desc: "Capstone projects and case studies added to your portfolio." },
                  { num: "4", title: "Contribute", desc: "Opportunities to engage in Hybrid Hustle real-world projects." },
                ].map((pillar) => (
                  <div key={pillar.num} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 fade-in text-center">
                    <div className="w-12 h-12 bg-white text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                      {pillar.num}
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 mb-3">{pillar.title}</h4>
                    <p className="text-sm text-slate-500">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Outcomes Section */}
          <section className="py-24 bg-surface border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-primary p-12 md:p-20 rounded-[4rem] text-white overflow-hidden relative fade-in shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-4xl font-heading font-black mb-6">What You Will Gain</h2>
                    <p className="text-blue-100 mb-8 leading-relaxed">
                      Diverse Loopers ensures that learning becomes measurable, visible, and career-oriented from day one.
                    </p>
                    <a
                      href="#courses-grid"
                      className="inline-flex px-8 py-4 bg-white text-primary rounded-2xl font-bold hover:shadow-xl transition"
                    >
                      Start Your Journey
                    </a>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      "Strong foundations and specialization clarity",
                      "Real project portfolio instead of only certificates",
                      "Exposure to tools used in real companies",
                      "Improved interview readiness & confidence",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                        <i data-lucide="check-circle" className="w-5 h-5 text-blue-200"></i>
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Courses Grid */}
          <section className="py-24 bg-white" id="courses-section">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div className="fade-in">
                  <h2 className="text-3xl font-heading font-black text-slate-900 mb-2">Available Paths</h2>
                  <p className="text-slate-500">Our latest domain-specific programs.</p>
                </div>
                <div id="category-filters" className="flex flex-wrap gap-2 fade-in"></div>
              </div>

              <div id="courses-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Skeleton Loaders */}
                <div className="animate-pulse bg-slate-50 rounded-[2.5rem] h-96 border border-slate-100"></div>
                <div className="animate-pulse bg-slate-50 rounded-[2.5rem] h-96 border border-slate-100"></div>
                <div className="animate-pulse bg-slate-50 rounded-[2.5rem] h-96 border border-slate-100"></div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-in">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                <i data-lucide="compass" className="w-10 h-10"></i>
              </div>
              <h2 className="text-3xl font-heading font-black text-slate-900 mb-6">Not Sure Where to Start?</h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                Use our Career Compass to discover your strengths, your ideal tech track, and the program that best fits your
                journey.
              </p>
              <a
                href="/career-analyzer"
                className="inline-flex px-12 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition shadow-2xl shadow-slate-200 items-center gap-3"
              >
                Explore Career Compass <i data-lucide="arrow-right" className="w-5 h-5"></i>
              </a>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 lg:col-span-1">
                <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers" className="h-12 w-auto mb-6" />
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Empowering talents for tomorrow through structured, future-ready career pathways and real industry exposure.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/105277450" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </a>
                  <a href="https://www.instagram.com/diverseloopers/" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                  </a>
                  <a href="https://chat.whatsapp.com/B6XJSoLC2Hg7Wgg5lHRfSf" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M16.7 13.4c-.3-.2-1.7-.8-2-1-.3-.2-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.2-1.3-1-1-1.3-1.9-1.4-2.2-.1-.3 0-.5.2-.7.2-.2.6-.7.8-1 .2-.3.1-.5 0-.7-.1-.2-.7-1.7-.9-2.1-.2-.4-.4-.3-.7-.3-.3 0-.6 0-.9.3-.3.3-1.1 1.1-1.1 2.6 0 1.5.9 3 1.1 3.2.1.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4z" />
                      <path d="M21 12a9 9 0 1 0-16.5 5.2L3 21l3.8-1.5A9 9 0 0 0 21 12z" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-6">Quick Navigation</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                  <li><a href="mailto:contact@diverseloopers.com" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="#programs" className="hover:text-white transition">Programs</a></li>
                  <li><a href="#hybrid-hustle" className="hover:text-white transition">Hybrid Hustle</a></li>
                  <li><a href="/skillsynth" className="hover:text-white transition">SkillSynth</a></li>
                  <li><a href="/analyzer" className="hover:text-white transition">Path Analyzer</a></li>
                  <li><a href="/career-analyzer" className="hover:text-white transition">Career Analyzer</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6">Specializations</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="/" className="hover:text-white transition">For Students</a></li>
                  <li><a href="/institute" className="hover:text-white transition">For Universities</a></li>
                  <li><a href="/business" className="hover:text-white transition">For Businesses</a></li>
                  <li><a href="#" className="hover:text-white transition">Placement Support</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6">Contact Us</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li className="flex gap-3">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    contact@diverseloopers.com
                  </li>
                  <li className="flex gap-3">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91 98393 50961
                  </li>
                </ul>

                {/* Auth Section in Footer */}
                <div id="footer-auth" className="mt-8 pt-6 border-t border-white/10 hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div id="footer-user-avatar" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold uppercase">
                      U
                    </div>
                    <div>
                      <p id="footer-user-name" className="text-xs font-bold text-white"></p>
                      <p id="footer-user-email" className="text-[10px] text-slate-500"></p>
                    </div>
                  </div>
                  <button id="logout-btn" className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest">Sign Out</button>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
              <p>&copy; 2024 Diverse Loopers. All Rights Reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              </div>
              <p>Hybrid Hustle&reg; is a registered program concept.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}