'use client';

import { useEffect } from 'react';

import * as HomeLogic from '@/lib/pages/home';
import "./(home)/home.css";


export default function HomePage() {
  useEffect(() => {
    // Initialize all home page functionality after DOM is ready
    HomeLogic.initHomePage();

    // Cleanup function (optional, for when component unmounts)
    return () => {
      // Clean up any event listeners if needed
    };
  }, []);

  return (
    <>


      {/* ================= NAVIGATION ================= */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex-shrink-0 flex items-center gap-2">
              <img src="/DIVERSE LOOPERS (1) bg.png" alt="Diverse Loopers" className="h-12 w-auto" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-1 p-1 bg-slate-100 rounded-full text-xs font-semibold mr-4">
                <a href="/" className="px-4 py-1.5 bg-white text-primary rounded-full shadow-sm">Students</a>
                <a href="/institute" className="px-4 py-1.5 text-slate-500 hover:text-slate-700 transition">Universities</a>
                <a href="/business" className="px-4 py-1.5 text-slate-500 hover:text-slate-700 transition">Businesses</a>
              </div>
              <a href="#about" className="text-slate-600 hover:text-primary font-medium transition">About</a>
              <a href="#programs" className="text-slate-600 hover:text-primary font-medium transition">Programs</a>
              <a href="/skillsynth" className="text-slate-600 hover:text-primary font-medium transition">SkillSynth</a>

              <div className="relative group">
                <button className="flex items-center gap-1 text-slate-600 hover:text-primary font-medium">
                  Tools 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="/career-analyzer" className="block px-4 py-3 hover:bg-slate-50 text-sm rounded-t-xl">Career Analyzer</a>
                  <a href="/analyzer" className="block px-4 py-3 hover:bg-slate-50 text-sm rounded-b-xl">Path Analyzer</a>
                </div>
              </div>

              <div id="auth-actions" className="flex items-center gap-4">
                <a href="/login" id="login-btn" className="text-slate-600 hover:text-primary font-semibold">Login</a>
                <a href="/profile" id="profile-btn" className="hidden px-5 py-2.5 bg-slate-100 text-slate-700 rounded-full font-semibold hover:bg-slate-200 transition">Profile</a>
                <a href="#hybrid-hustle" className="px-5 py-2.5 bg-primary text-white rounded-full font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition">Join Hustle</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button id="mobile-menu-toggle" className="p-2 text-slate-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div id="mobile-menu" className="hidden md:hidden bg-white border-b border-slate-100 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="px-4 pt-2 pb-8 space-y-1">
            {/* Mobile Persona Switcher */}
            <div className="flex flex-wrap gap-2 p-2 mb-4 bg-slate-50 rounded-xl">
              <a href="/" className="flex-grow text-center py-2 bg-white text-primary rounded-lg shadow-sm text-xs font-bold border border-slate-100">Students</a>
              <a href="/institute" className="flex-grow text-center py-2 text-slate-500 text-xs font-semibold">Universities</a>
              <a href="/business" className="flex-grow text-center py-2 text-slate-500 text-xs font-semibold">Businesses</a>
            </div>

            {/* Main Nav Links */}
            <a href="#about" className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">About Us</a>
            <a href="#programs" className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Programs</a>
            <a href="#hybrid-hustle" className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Hybrid Hustle</a>
            <a href="/skillsynth" className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">SkillSynth</a>
            <a href="#contact" className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl">Contact Us</a>

            {/* Tools Section */}
            <div className="pt-4 pb-2 px-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Exclusive Tools</p>
              <div className="grid grid-cols-1 gap-2">
                <a href="/career-analyzer" className="flex items-center gap-3 p-3 bg-blue-50 text-primary rounded-xl font-bold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  Career Analyzer
                </a>
                <a href="/analyzer" className="flex items-center gap-3 p-3 bg-pink-50 text-secondary rounded-xl font-bold text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Path Analyzer
                </a>
              </div>
            </div>

            {/* Auth Section */}
            <div className="pt-6 px-2 space-y-3">
              <a href="/login" id="mobile-login-btn" className="block w-full text-center py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold">Login</a>
              <a href="/profile" id="mobile-profile-btn" className="hidden block w-full text-center py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-blue-100">My Profile</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden hero-gradient">
          <canvas id="hero-canvas" className="absolute inset-0 pointer-events-none opacity-40"></canvas>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-primary text-sm font-bold tracking-wide uppercase mb-6 fade-in">
                Empowering Talents for Tomorrow
              </span>
              <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-slate-900 leading-tight mb-8 fade-in">
                Transforming Ambitious Learners into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Tech Professionals</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed fade-in">
                Stop guessing. Start planning your future with clarity, direction, and purpose through structured learning and real project exposure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
                <a href="/login" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-blue-700 shadow-xl shadow-blue-200 transition flex items-center justify-center gap-2">
                  Get Started
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a href="#hybrid-hustle" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition">
                  Explore Hybrid Hustle
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="fade-in">
                <div className="flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-wider">
                  <span className="h-px w-8 bg-primary"></span> Who We Are
                </div>
                <h2 className="text-4xl font-heading font-bold text-slate-900 mb-6">Bridging the Gap Between Classroom & Industry</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Diverse Loopers is a next-generation career and business solutions ecosystem. We operate differently from traditional training institutes.
                  <strong> We function like a technology company</strong>, building digital solutions for businesses while preparing learners to become job-ready through guided mentorship.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-2">Our Vision</h4>
                    <p className="text-sm text-slate-500">A sustainable ecosystem where learning, working, and earning exist together.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-2">Our Mission</h4>
                    <p className="text-sm text-slate-500">Equipping learners with in-demand skills and real project exposure.</p>
                  </div>
                </div>
              </div>
              <div className="relative fade-in">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-secondary opacity-10 blur-2xl rounded-3xl"></div>
                <img src="/team.jpg" alt="Our Team at Work" className="relative rounded-3xl shadow-2xl object-cover w-full aspect-video md:aspect-square" />
              </div>
            </div>
          </div>
        </section>

        {/* Hybrid Hustle Model */}
        <section id="hybrid-hustle" className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src="/hh bg.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-slate-900/80"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6">The Hybrid Hustle Model</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">The core foundation of Diverse Loopers. A structured career pathway that redefines how professionals build careers.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-20">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 fade-in">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center font-bold text-xl mb-6">01</div>
                <h3 className="text-2xl font-bold mb-4">Learn</h3>
                <p className="text-slate-300">Guided training across technologies and professional development essentials.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 fade-in">
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center font-bold text-xl mb-6">02</div>
                <h3 className="text-2xl font-bold mb-4">Work</h3>
                <p className="text-slate-300">Collaborate on internal company projects handled by Diverse Loopers.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 fade-in">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center font-bold text-xl mb-6">03</div>
                <h3 className="text-2xl font-bold mb-4">Earn</h3>
                <p className="text-slate-300">Unlock structured earning opportunities through contribution and performance.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 fade-in">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-xl mb-6">04</div>
                <h3 className="text-2xl font-bold mb-4">Grow</h3>
                <p className="text-slate-300">Progress toward full-time jobs, internships, or entrepreneurial paths.</p>
              </div>
            </div>

            {/* Enrollment Form */}
            <div className="max-w-4xl mx-auto bg-white text-slate-900 rounded-[2rem] p-8 md:p-12 shadow-2xl fade-in">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-heading font-bold mb-2">Enroll in the Hustle</h3>
                <p className="text-slate-500">Join our exclusive network and fast-track your path to tech mastery.</p>
              </div>
              <form id="hustler-form" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                  <input type="text" name="name" placeholder="Varun Awasthi" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email ID</label>
                  <input type="email" name="email" placeholder="varun@gmail.com" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">College Name</label>
                  <input type="text" name="college" placeholder="IIT Delhi" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Contact Number</label>
                  <input type="tel" name="contact" placeholder="+91 9876543210" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Core Technology</label>
                  <select name="tech" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition">
                    <option value="">Select Domain</option>
                    <option value="AI/ML">AI & Machine Learning</option>
                    <option value="WebDev">Full Stack Development</option>
                    <option value="GameDev">Game Development</option>
                    <option value="Cloud">Cloud Engineering</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Course Year</label>
                  <select name="year" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition">
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Semester</label>
                  <input type="number" name="semester" min="1" max="8" placeholder="7" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Roll No.</label>
                  <input type="text" name="roll" placeholder="IITDCS-3210" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none transition" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition transform hover:scale-[1.01] active:scale-95">
                    Submit Registration
                  </button>
                  <p id="hustler-message" className="hidden mt-4 text-center text-sm font-medium"></p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Career Compass Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <svg className="w-64 h-64 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <span className="text-primary font-bold uppercase tracking-widest text-sm">Exclusive Tool</span>
                  <h2 className="text-4xl font-heading font-extrabold text-slate-900 mt-4 mb-6 leading-tight">Career Compass: Path Analyzer</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Stop wasting time on irrelevant learning. Our tool analyzes thousands of job descriptions to identify the exact industry skills you're missing, providing a personalized roadmap.
                  </p>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <svg className="text-primary w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Identifies technical skill gaps
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <svg className="text-primary w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Personalized 12-month roadmaps
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <svg className="text-primary w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Engineering syllabus comparison
                    </li>
                  </ul>
                  <a href="/analyzer" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-700 transition group shadow-lg shadow-blue-100">
                    Try Path Analyzer
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                    <div className="text-3xl font-extrabold text-primary mb-1">2000+</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Job Postings Analyzed</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center translate-y-8">
                    <div className="text-3xl font-extrabold text-secondary mb-1">98%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Roadmap Accuracy</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                    <div className="text-3xl font-extrabold text-blue-600 mb-1">100%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Clarity Gained</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center translate-y-8">
                    <div className="text-3xl font-extrabold text-slate-900 mb-1">Free</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Initial Assessment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Career Analyzer Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 shadow-sm overflow-hidden relative">
              <div className="w-14 h-14 bg-pink-50 text-secondary rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <span className="text-primary font-bold uppercase tracking-widest text-sm">Exclusive Tool</span>
                  <h2 className="text-4xl font-heading font-extrabold text-slate-900 mt-4 mb-6 leading-tight">Career Compass: Career Analyzer</h2>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    Find the Tech Career That Actually Fits You. Not what is trending. Not what others say. But what matches your skills, interests, and learning style. A 5-7 minute assessment that gives you a clear career direction and next steps.
                  </p>
                  <ul className="space-y-4 mb-10">
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <svg className="text-primary w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Answer smart questions - Takes only 5-7 minutes
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <svg className="text-primary w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Get Fit Scores - See how careers match you
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <svg className="text-primary w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Get a clear roadmap - Know what to learn next
                    </li>
                  </ul>
                  <a href="/career-analyzer" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-blue-700 transition group shadow-lg shadow-blue-100">
                    Try Career Analyzer
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                    <div className="text-3xl font-extrabold text-primary mb-1">500+</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Career Suggestions Given</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center translate-y-8">
                    <div className="text-3xl font-extrabold text-secondary mb-1">98%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tool Accuracy</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                    <div className="text-3xl font-extrabold text-blue-600 mb-1">100%</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Clarity Gained</div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center translate-y-8">
                    <div className="text-3xl font-extrabold text-slate-900 mb-1">Free</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Initial Assessment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section id="programs" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-4">Programs for Students</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">Tailored pathways for every stage of your educational journey.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bento-card bg-surface p-10 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between" style={{backgroundColor:"#dbeafe"}}>
                <div>
                  <span className="inline-block px-4 py-1.5 bg-blue-100 text-primary text-xs font-bold rounded-full mb-6">12 MONTHS</span>
                  <h3 className="text-3xl font-heading font-bold mb-4">Vision Builders Program</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed">Designed for early-stage learners who want structured guidance and foundational skills.</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Basics of Coding & AI
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      Mini-projects
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Mentor Sessions
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Community Support
                    </li>
                  </ul>
                </div>
                <a href="/courses" className="w-full py-4 text-center bg-white border border-slate-200 rounded-2xl font-bold hover:border-primary hover:text-primary transition">Explore Curriculum</a>
              </div>

              <div className="bento-card bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-secondary text-white text-xs font-bold rounded-full mb-6">6 MONTHS</span>
                  <h3 className="text-3xl font-heading font-bold mb-4">Accelerate Program</h3>
                  <p className="text-slate-300 mb-8 leading-relaxed">For final-year students and graduates who want to become job-ready quickly with intensive training.</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    <li className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Intensive Tech Training
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Live Industry Projects
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Placement Guidance
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-200 font-medium">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Interview Prep
                    </li>
                  </ul>
                </div>
                <a href="/courses" className="w-full py-4 text-center bg-white/10 border border-white/20 rounded-2xl font-bold hover:bg-white hover:text-slate-900 transition">Get Fast-Tracked</a>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Benefits Section */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-4">Extra Features for Students</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">At Diverse Loopers we think only training is not enough for boost but also some activities that ask for students dedication.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bento-card bg-white p-10 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Portfolio Builder</h3>
                  <p className="text-slate-500">Create a professional project portfolio that showcases your real-world achievements to top recruiters.</p>
                </div>
                <div className="w-full md:w-1/3 h-32 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
              </div>
              <div className="bento-card bg-gradient-to-br from-primary to-blue-700 p-10 rounded-[2.5rem] text-white">
                <svg className="w-10 h-10 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <h3 className="text-2xl font-bold mb-4">Wall of Fame</h3>
                <p className="text-blue-100 text-sm">Recognition space dedicated to our outstanding contributors and top performers.</p>
              </div>
              <div className="bento-card bg-white p-10 rounded-[2.5rem] border border-slate-100">
                <svg className="w-10 h-10 text-secondary mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <h3 className="text-2xl font-bold mb-4">Mentorship Hub</h3>
                <p className="text-slate-500 text-sm">Direct access to experienced professionals across multiple domains.</p>
              </div>
              <div className="md:col-span-2 bento-card bg-white p-10 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Skillsynth Activities</h3>
                  <p className="text-slate-500">Direct access to technical events, cultural events, seminars, webinars, hackathons and many more activities organised by us.</p>
                </div>
                <div className="w-full md:w-1/3 h-32 bg-slate-100 rounded-2xl flex items-center justify-center" style={{backgroundColor:"#83b6b626"}}>
                  <svg className="w-12 h-12 text-slate-300" style={{color:"#e46962"}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-4">Join & Participate</h2>
                <p className="text-slate-500">Connect, learn, and grow with the Diverse Loopers community through interactive workshops.</p>
              </div>
              <div className="flex gap-4">
                <button id="scroll-left-btn" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:border-primary hover:text-primary transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button id="scroll-right-btn" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:border-primary hover:text-primary transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div id="events-grid-container" className="overflow-x-auto no-scrollbar scroll-smooth pb-8">
              <div id="events-grid" className="flex gap-8" style={{width: "max-content"}}>
                {/* Dynamically Loaded */}
                <div className="w-[350px] h-[400px] animate-pulse bg-slate-100 rounded-3xl"></div>
                <div className="w-[350px] h-[400px] animate-pulse bg-slate-100 rounded-3xl"></div>
                <div className="w-[350px] h-[400px] animate-pulse bg-slate-100 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-heading font-extrabold text-slate-900 mb-4">Get In Touch</h2>
                <p className="text-slate-500">Have questions or wish to collaborate? We'd be happy to connect.</p>
              </div>

              <form id="contact-form" className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input type="text" id="name" required placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input type="email" id="email" required placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Message</label>
                  <textarea id="message" rows="4" required placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary outline-none"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition">Send Message</button>
                <p id="contact-status" className="text-center text-sm font-medium hidden"></p>
              </form>
            </div>
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
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://www.instagram.com/diverseloopers/" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
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
                <li><a href="/aboutus-std" className="hover:text-white transition">About Us</a></li>
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
    </>
  );
}
