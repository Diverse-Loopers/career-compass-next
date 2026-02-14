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
              {/* Branding */}
              <div className="col-span-1 lg:col-span-1">
                <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers" className="h-12 w-auto mb-6" />
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Empowering talents for tomorrow through structured, future-ready career pathways and real industry exposure.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/105277450"
                    className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
                  >
                    <i data-lucide="linkedin" className="w-4 h-4"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/diverseloopers/"
                    className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
                  >
                    <i data-lucide="instagram" className="w-4 h-4"></i>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
                  >
                    <i data-lucide="twitter" className="w-4 h-4"></i>
                  </a>
                  <a
                    href="https://chat.whatsapp.com/B6XJSoLC2Hg7Wgg5lHRfSf"
                    className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.7 13.4c-.3-.2-1.7-.8-2-1-.3-.2-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-.3-.1-1.2-.4-2.2-1.3-1-1-1.3-1.9-1.4-2.2-.1-.3 0-.5.2-.7.2-.2.6-.7.8-1 .2-.3.1-.5 0-.7-.1-.2-.7-1.7-.9-2.1-.2-.4-.4-.3-.7-.3-.3 0-.6 0-.9.3-.3.3-1.1 1.1-1.1 2.6 0 1.5.9 3 1.1 3.2.1.2 2.1 3.2 5.1 4.4 1.9.8 2.6.9 3.5.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.4z" />
                      <path d="M21 12a9 9 0 1 0-16.5 5.2L3 21l3.8-1.5A9 9 0 0 0 21 12z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-xs">Quick Navigation</h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li>
                    <a href="/aboutus-std" className="hover:text-white transition">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="mailto:contact@diverseloopers.com" className="hover:text-white transition">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="/index#programs" className="hover:text-white transition">
                      Programs
                    </a>
                  </li>
                  <li>
                    <a href="/index#hybrid-hustle" className="hover:text-white transition">
                      Hybrid Hustle
                    </a>
                  </li>
                  <li>
                    <a href="/index#events" className="hover:text-white transition">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="/analyzer" className="hover:text-white transition">
                      Path Analyzer
                    </a>
                  </li>
                  <li>
                    <a href="/career-analyzer" className="hover:text-white transition">
                      Career Analyzer
                    </a>
                  </li>
                </ul>
              </div>

              {/* Specializations */}
              <div>
                <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-xs">Specializations</h4>
                <ul className="space-y-4 text-slate-400 text-sm font-medium">
                  <li>
                    <a href="/index" className="hover:text-white transition">
                      For Students
                    </a>
                  </li>
                  <li>
                    <a href="/institute" className="hover:text-white transition">
                      For Universities
                    </a>
                  </li>
                  <li>
                    <a href="/business" className="hover:text-white transition">
                      For Businesses
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Placement Support
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-bold mb-6 text-white uppercase tracking-wider text-xs">Get In Touch</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li className="flex gap-3">
                    <i data-lucide="mail" className="w-4 h-4 text-primary"></i>
                    contact@diverseloopers.com
                  </li>
                  <li className="flex gap-3">
                    <i data-lucide="phone" className="w-4 h-4 text-primary"></i> +91 98393 50961
                  </li>
                </ul>

                {/* Auth Section in Footer */}
                <div id="footer-auth" className="mt-8 pt-6 border-t border-white/10 hidden">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      id="footer-user-avatar"
                      className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold uppercase text-white"
                    >
                      U
                    </div>
                    <div>
                      <p id="footer-user-name" className="text-xs font-bold text-white"></p>
                      <p id="footer-user-email" className="text-[10px] text-slate-500"></p>
                    </div>
                  </div>
                  <button
                    id="logout-btn-footer"
                    className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-slate-500 font-medium">
              <p>&copy; 2024 Diverse Loopers. All Rights Reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </div>
              <p className="text-slate-600">Hybrid Hustle&reg; is a registered program concept.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}