'use client';

import { useState, useEffect, useRef } from 'react';
import './analyzer.css';
import Script from 'next/script';
import { supabase } from '@/lib/supabase';
import { 
  roleOptions, 
  updateTargetRoles, 
  handleFormSubmit, 
  renderResults, 
  saveAnalysisToSupabase,
  resetCurrentAnalysis 
} from '@/lib/pages/analyzer';

export default function AnalyzerPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Computer Science (CSE)');
  const [showForm, setShowForm] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    collegeName: '',
    targetCompany: '',
    branch: 'Computer Science (CSE)',
    targetRole: ''
  });

  const targetRoleRef = useRef(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setProfile(profile);
        
        if (profile) {
          setFormData(prev => ({
            ...prev,
            fullName: profile.full_name || '',
            email: user.email || ''
          }));
        }
      }
    };
    
    checkUser();

    if (localStorage.getItem('theme') === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
      }
    }, 100);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (targetRoleRef.current) {
      updateTargetRoles(selectedBranch, targetRoleRef.current);
    }
  }, [selectedBranch]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.lucide) {
        window.lucide.createIcons();
      }
    }, 100);
  };

  const handleBranchChange = (e) => {
    const branch = e.target.value;
    setSelectedBranch(branch);
    setFormData(prev => ({ ...prev, branch }));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setShowForm(false);
    setShowLoader(true);
    setShowResults(false);

    const result = await handleFormSubmit(e, formData);
    setShowLoader(false);

    if (result.success) {
      renderResults(result.data, result.userName, result.targetRole);
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('results-display')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setErrorMessage(result.error);
      setShowForm(true);
    }
  };

  const handleSaveResults = async () => {
    setSaveStatus({ show: false, message: '' });
    const result = await saveAnalysisToSupabase();
    
    if (result.success) {
      setSaveStatus({ 
        show: true, 
        message: 'Success! View results in your <a href="/dashboard" class="underline">Dashboard</a>.' 
      });
    } else {
      setSaveStatus({ 
        show: true, 
        message: 'Failed to save. Please try again.' 
      });
    }
  };

  const handleBackToForm = () => {
    setShowResults(false);
    setShowForm(true);
    resetCurrentAnalysis();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <>
      <Script 
        src="https://cdn.tailwindcss.com" 
        strategy="beforeInteractive"
        onLoad={() => {
          if (window.tailwind) {
            window.tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  colors: {
                    primary: '#4f46e5',
                    secondary: '#ec4899',
                    dark: '#0c0d19'
                  }
                }
              }
            };
          }
        }}
      />
      <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" onLoad={() => {
        if (window.lucide) window.lucide.createIcons();
      }} />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" strategy="afterInteractive" />

      <div className="min-h-screen flex flex-col overflow-x-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 -left-4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none"></div>
        <div className="absolute top-0 -right-4 w-64 md:w-96 h-64 md:h-96 bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <a href="/" className="flex-shrink-0 flex items-center gap-2">
                <img src="/DIVERSE LOOPERS (1) bg.png" alt="Diverse Loopers" className="h-10 md:h-12 w-auto" />
              </a>

              <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                <a href="/" className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium transition text-sm">Home</a>
                <a href="/#programs" className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium transition text-sm">Programs</a>
                <a href="/#events" className="text-slate-600 dark:text-slate-300 hover:text-primary font-medium transition text-sm">Events</a>

                <div className="relative group">
                  <button className="flex items-center gap-1 text-primary font-bold text-sm">
                    Tools <i data-lucide="chevron-down" className="w-4 h-4"></i>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark rounded-xl shadow-xl border border-slate-100 dark:border-white/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <a href="/career-analyzer" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 text-sm rounded-t-xl text-slate-700 dark:text-slate-300">Career Analyzer</a>
                    <a href="/analyzer" className="block px-4 py-3 bg-slate-50 dark:bg-white/10 text-sm rounded-b-xl text-primary font-bold">Path Analyzer</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/10 pl-6 lg:pl-8">
                  <button onClick={toggleTheme} className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition">
                    <i data-lucide={isDark ? "sun" : "moon"} className="w-5 h-5"></i>
                  </button>
                  {user ? (
                    <a href="/profile" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <i data-lucide="user" className="w-5 h-5 text-primary"></i>
                      )}
                    </a>
                  ) : (
                    <a href="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300">Login</a>
                  )}
                </div>
              </div>

              <div className="md:hidden flex items-center gap-4">
                <button onClick={toggleTheme} className="p-2 text-slate-500">
                  <i data-lucide={isDark ? "sun" : "moon"} className="w-5 h-5"></i>
                </button>
                <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-2 text-slate-600 dark:text-slate-300">
                  <i data-lucide="menu" className="w-6 h-6"></i>
                </button>
              </div>
            </div>
          </div>

          {showMobileMenu && (
            <div className="md:hidden bg-white dark:bg-dark border-b border-slate-100 dark:border-white/5 overflow-y-auto max-h-screen shadow-2xl">
              <div className="px-6 py-8 space-y-4 text-center">
                <a href="/" className="block text-lg font-bold text-slate-700 dark:text-slate-300" onClick={() => setShowMobileMenu(false)}>Home</a>
                <a href="/#programs" className="block text-lg font-bold text-slate-700 dark:text-slate-300" onClick={() => setShowMobileMenu(false)}>Programs</a>
                <a href="/#events" className="block text-lg font-bold text-slate-700 dark:text-slate-300" onClick={() => setShowMobileMenu(false)}>Events</a>
                <hr className="border-slate-100 dark:border-white/5 mx-auto w-1/2" />
                <a href="/career-analyzer" className="block text-lg font-bold text-slate-700 dark:text-slate-300" onClick={() => setShowMobileMenu(false)}>Career Analyzer</a>
                <a href="/analyzer" className="block text-lg font-bold text-primary" onClick={() => setShowMobileMenu(false)}>Path Analyzer</a>
                <div className="pt-6">
                  {user ? (
                    <a href="/profile" className="block w-full py-4 bg-primary text-white text-center rounded-2xl font-bold" onClick={() => setShowMobileMenu(false)}>My Profile</a>
                  ) : (
                    <a href="/login" className="block w-full py-4 bg-slate-100 dark:bg-white/5 text-center rounded-2xl font-bold" onClick={() => setShowMobileMenu(false)}>Login</a>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow pt-24 md:pt-32 pb-20">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 text-center space-y-8 pb-10">
            <h1 className="text-primary font-black uppercase tracking-[0.3em] text-sm">Path Analyzer</h1>
            <h2 className="text-3xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
              Your Personalized Career Roadmap — <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Powered by Real Industry Data</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium text-base md:text-xl leading-relaxed">
              Choosing the right career path should not feel like guesswork. The Path Analyzer by Diverse Loopers analyzes your interests, academic background, current skills, and industry demand to recommend the most suitable technology career track.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a href="#analyzer-tool" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-blue-700 hover:shadow-2xl transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                Start My Analysis <i data-lucide="zap" className="w-5 h-5"></i>
              </a>
              <a href="#how-it-works" className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-bold text-lg hover:bg-slate-50 transition">
                Learn How It Works
              </a>
            </div>
          </section>

          {/* What is Path Analyzer */}
          <section className="py-24 bg-white dark:bg-slate-900/20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white">What is the Path Analyzer?</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed italic">
                    "Which tech career is actually right for me — and what exactly should I learn next?"
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    Path Analyzer is an intelligent guidance system designed to bridge the gap between what students study in college and what companies actually expect. The tool evaluates your profile and generates a structured recommendation instead of generic advice.
                  </p>
                </div>
                <div className="p-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2.5rem] md:rounded-[3rem]">
                  <div className="bg-white dark:bg-dark p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] space-y-6 shadow-inner">
                    <h4 className="font-black text-primary uppercase tracking-widest text-xs">Evaluation Core</h4>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base">
                        <i data-lucide="check" className="text-primary"></i> Academic Background
                      </li>
                      <li className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base">
                        <i data-lucide="check" className="text-primary"></i> Interests and Strengths
                      </li>
                      <li className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base">
                        <i data-lucide="check" className="text-primary"></i> Current Skill Exposure
                      </li>
                      <li className="flex items-center gap-3 font-bold text-slate-700 dark:text-slate-300 text-sm md:text-base">
                        <i data-lucide="check" className="text-primary"></i> Future Career Goals
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who Should Use */}
          <section className="py-24 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Who Should Use the Path Analyzer?</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">The Path Analyzer is designed for anyone confused between multiple tech fields or unsure about specialization.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="p-6 md:p-8 glass-card rounded-[2rem] md:rounded-[2.5rem] space-y-4 hover:bg-primary hover:text-white transition group duration-500">
                <h4 className="font-black text-lg italic">Early Birds</h4>
                <p className="text-xs md:text-sm opacity-70">1st and 2nd year students exploring technology clarity before specialization.</p>
              </div>
              <div className="p-6 md:p-8 glass-card rounded-[2rem] md:rounded-[2.5rem] space-y-4 hover:bg-secondary hover:text-white transition group duration-500">
                <h4 className="font-black text-lg italic">Job-Ready</h4>
                <p className="text-xs md:text-sm opacity-70">Final-year students preparing for internships or placements seeking acceleration.</p>
              </div>
              <div className="p-6 md:p-8 glass-card rounded-[2rem] md:rounded-[2.5rem] space-y-4 hover:bg-slate-900 hover:text-white transition group duration-500">
                <h4 className="font-black text-lg italic">Graduates</h4>
                <p className="text-xs md:text-sm opacity-70">Graduates unsure about the depth or relevance of their current skill specialization.</p>
              </div>
              <div className="p-6 md:p-8 glass-card rounded-[2rem] md:rounded-[2.5rem] space-y-4 hover:bg-indigo-600 hover:text-white transition group duration-500">
                <h4 className="font-black text-lg italic">Switchers</h4>
                <p className="text-xs md:text-sm opacity-70">Learners switching career domains looking for a structured, risk-free plan.</p>
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section id="how-it-works" className="py-24 bg-dark text-white rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-6">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-black mb-16 md:mb-20 italic">Simple but Intelligent Process</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 relative text-left">
                <div className="space-y-4 relative z-10">
                  <div className="text-5xl md:text-6xl font-black opacity-10 italic">01</div>
                  <h4 className="text-lg md:text-xl font-bold text-primary">Input Your Profile</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">Answer guided questions about background, academic strengths, and preferred work style.</p>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="text-5xl md:text-6xl font-black opacity-10 italic">02</div>
                  <h4 className="text-lg md:text-xl font-bold text-secondary">Industry Alignment</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">System maps inputs with real job market requirements and salary trajectories.</p>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="text-5xl md:text-6xl font-black opacity-10 italic">03</div>
                  <h4 className="text-lg md:text-xl font-bold text-green-400">Recommendation</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">Receive a curated track suggestion like AI, DevOps, or Product Management.</p>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="text-5xl md:text-6xl font-black opacity-10 italic">04</div>
                  <h4 className="text-lg md:text-xl font-bold text-blue-400">Actionable Roadmap</h4>
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed">Step-by-step plan including tools, project ideas, and certification guidance.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ANALYZER TOOL */}
          <section id="analyzer-tool" className="py-24 bg-white dark:bg-transparent relative z-10">
            <div className="max-w-5xl mx-auto px-4 md:px-6">
              {showForm && (
                <div className="glass-card rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 shadow-2xl shadow-primary/10">
                  <div className="mb-12 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-black italic">Start Your Path Analysis</h2>
                    <p className="text-slate-400 font-medium text-sm md:text-base">Identify the gap between your curriculum and your goal.</p>
                  </div>

                  <form onSubmit={onSubmit} className="space-y-8 md:space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                        <input 
                          type="text" 
                          name="fullName" 
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required 
                          className="input-field" 
                          placeholder="Full Name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="input-field" 
                          placeholder="your@email.com" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">College Name</label>
                        <input 
                          type="text" 
                          name="collegeName" 
                          value={formData.collegeName}
                          onChange={handleInputChange}
                          required 
                          className="input-field" 
                          placeholder="College Name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Company (e.g., Google)</label>
                        <input 
                          type="text" 
                          name="targetCompany" 
                          value={formData.targetCompany}
                          onChange={handleInputChange}
                          className="input-field" 
                          placeholder="Target Company" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Engineering Branch</label>
                        <select 
                          name="branch" 
                          value={formData.branch}
                          onChange={handleBranchChange}
                          className="input-field"
                        >
                          <option>Computer Science (CSE)</option>
                          <option>Information Technology (IT)</option>
                          <option>Electronics & Communication (ECE)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Job Role</label>
                        <select 
                          ref={targetRoleRef}
                          name="targetRole" 
                          value={formData.targetRole}
                          onChange={handleInputChange}
                          className="input-field"
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold">
                        <strong>Error:</strong> {errorMessage}
                      </div>
                    )}

                    <div className="pt-4 md:pt-6 text-center">
                      <button 
                        type="submit" 
                        className="w-full py-5 bg-primary text-white rounded-[1.5rem] md:rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-blue-700 transition shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
                      >
                        Analyze My Track <i data-lucide="arrow-right" className="w-6 h-6"></i>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {showLoader && (
                <div className="py-24 text-center space-y-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="font-black text-slate-400 uppercase tracking-widest animate-pulse italic">Comparing Industry Standards...</p>
                </div>
              )}

              {showResults && (
                <div id="results-display" className="space-y-8 md:space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <button 
                      onClick={handleBackToForm}
                      className="flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary"
                    >
                      <i data-lucide="chevron-left" className="w-4 h-4"></i> Edit Profile
                    </button>
                    <button 
                      onClick={handleSaveResults}
                      className="w-full md:w-auto px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:scale-105 transition shadow-lg"
                    >
                      Save Results to Profile
                    </button>
                  </div>

                  <div className="glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path 
                          className="stroke-slate-100 dark:stroke-white/5 fill-none" 
                          strokeWidth="3" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                        <path 
                          id="result-match-circle" 
                          className="stroke-primary fill-none transition-all duration-1000" 
                          strokeWidth="3" 
                          strokeLinecap="round" 
                          strokeDasharray="0, 100" 
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                        />
                      </svg>
                      <div id="result-match-text" className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                        --%
                      </div>
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                      <h2 className="text-2xl md:text-3xl font-black italic text-slate-900 dark:text-white">Your Career Blueprint</h2>
                      <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-lg">
                        Hello <span id="user-name-result" className="text-primary font-black"></span>! Here is your personalized readiness report for the <strong id="user-role-result" className="text-dark dark:text-white"></strong> role.
                      </p>
                      {saveStatus.show && (
                        <div 
                          className="text-xs font-bold text-green-600 bg-green-50 p-3 rounded-xl border border-green-100 mt-4"
                          dangerouslySetInnerHTML={{ __html: saveStatus.message }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    <div className="glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[3rem]">
                      <h3 className="text-lg md:text-xl font-black flex items-center gap-3 mb-6 text-slate-900 dark:text-white">
                        <i data-lucide="book-check" className="text-primary"></i> Curriculum Focus
                      </h3>
                      <div id="core-focus-list" className="space-y-6"></div>
                    </div>
                    <div className="glass-card p-6 md:p-8 rounded-[2rem] md:rounded-[3rem]">
                      <h3 className="text-lg md:text-xl font-black flex items-center gap-3 mb-6 text-slate-900 dark:text-white">
                        <i data-lucide="alert-triangle" className="text-secondary"></i> Critical Gaps
                      </h3>
                      <div id="missing-skills-list" className="flex flex-wrap gap-2"></div>
                    </div>
                    <div className="md:col-span-2 glass-card p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem]">
                      <h3 className="text-xl md:text-2xl font-black flex items-center gap-3 mb-8 italic text-primary">
                        <i data-lucide="map-pinned"></i> Detailed Learning Roadmap
                      </h3>
                      <div id="roadmap-list" className="space-y-4"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24 max-w-3xl mx-auto px-6">
            <h3 className="text-2xl md:text-3xl font-black mb-10 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <details className="group glass-card rounded-2xl p-5 md:p-6 cursor-pointer hover:border-primary/30 transition">
                <summary className="font-bold list-none flex justify-between items-center text-sm md:text-base">
                  Is Path Analyzer a test? <i data-lucide="plus" className="w-4 h-4 group-open:rotate-45 transition"></i>
                </summary>
                <p className="mt-4 text-xs md:text-sm text-slate-500 leading-relaxed">No. It is a guided analysis tool that understands your strengths and industry opportunities to give you a clear growth plan.</p>
              </details>
              <details className="group glass-card rounded-2xl p-5 md:p-6 cursor-pointer hover:border-primary/30 transition">
                <summary className="font-bold list-none flex justify-between items-center text-sm md:text-base">
                  Does it guarantee jobs? <i data-lucide="plus" className="w-4 h-4 group-open:rotate-45 transition"></i>
                </summary>
                <p className="mt-4 text-xs md:text-sm text-slate-500 leading-relaxed">No. It provides clarity and direction. Success depends on your consistency and effort in executing the suggested roadmap.</p>
              </details>
              <details className="group glass-card rounded-2xl p-5 md:p-6 cursor-pointer hover:border-primary/30 transition">
                <summary className="font-bold list-none flex justify-between items-center text-sm md:text-base">
                  Does it replace counseling? <i data-lucide="plus" className="w-4 h-4 group-open:rotate-45 transition"></i>
                </summary>
                <p className="mt-4 text-xs md:text-sm text-slate-500 leading-relaxed">It enhances counseling with structured insights, and mentors can use the report to guide further.</p>
              </details>
              <details className="group glass-card rounded-2xl p-5 md:p-6 cursor-pointer hover:border-primary/30 transition">
                <summary className="font-bold list-none flex justify-between items-center text-sm md:text-base">
                  Is it only for tech students? <i data-lucide="plus" className="w-4 h-4 group-open:rotate-45 transition"></i>
                </summary>
                <p className="mt-4 text-xs md:text-sm text-slate-500 leading-relaxed">Primarily designed for technology careers, but helpful for anyone exploring digital roles.</p>
              </details>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white pt-20 pb-10 mt-auto">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers" className="h-10 md:h-12 w-auto mb-6" />
                <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">Empowering talents for tomorrow through structured career pathways and real industry exposure.</p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/105277450" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <i data-lucide="linkedin" className="w-4 h-4"></i>
                  </a>
                  <a href="https://www.instagram.com/diverseloopers/" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <i data-lucide="instagram" className="w-4 h-4"></i>
                  </a>
                  <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <i data-lucide="twitter" className="w-4 h-4"></i>
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">Quick Navigation</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="/about" className="hover:text-white transition">About Us</a></li>
                  <li><a href="mailto:contact@diverseloopers.com" className="hover:text-white transition">Contact Us</a></li>
                  <li><a href="/#programs" className="hover:text-white transition">Programs</a></li>
                  <li><a href="/#events" className="hover:text-white transition">Events</a></li>
                </ul>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">Specializations</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="/institute" className="hover:text-white transition">For Universities</a></li>
                  <li><a href="/business" className="hover:text-white transition">For Businesses</a></li>
                  <li><a href="#" className="hover:text-white transition">Placement Support</a></li>
                </ul>
              </div>

              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">Get In Touch</h4>
                <ul className="space-y-4 text-slate-400 text-sm mb-8 flex flex-col items-center sm:items-start">
                  <li className="flex gap-3">
                    <i data-lucide="mail" className="w-4 h-4 text-primary"></i> contact@diverseloopers.com
                  </li>
                  <li className="flex gap-3">
                    <i data-lucide="phone" className="w-4 h-4 text-primary"></i> +91 98393 50961
                  </li>
                </ul>

                {user && (
                  <div className="pt-6 border-t border-white/10 flex flex-col items-center sm:items-start">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold uppercase overflow-hidden">
                        {profile?.avatar_url ? (
                          <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <span>{profile?.full_name?.[0] || 'U'}</span>
                        )}
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">{profile?.full_name}</p>
                        <p className="text-[10px] text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-slate-500">
              <p>&copy; 2024 Diverse Loopers. All Rights Reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              </div>
              <p className="text-slate-600">Hybrid Hustle&reg; is a registered program concept.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}