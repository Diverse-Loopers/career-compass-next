'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import './business.css'
import { initBusinessPage, handleBusinessFormSubmit, setInquiryType, scrollToSection } from '@/lib/pages/business'

export default function BusinessPage() {
  useEffect(() => {
    initBusinessPage();
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      
      e.preventDefault()
      
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        const navbarHeight = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        
        const mobileMenu = document.getElementById('mobile-menu')
        if (mobileMenu) {
          mobileMenu.classList.add('hidden')
        }
      }
    }
    
    document.addEventListener('click', handleAnchorClick)
    
    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, []);

  return (
    <>
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Lucide Icons */}
      <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" onLoad={() => {
        if (typeof window !== 'undefined' && window.lucide) {
          window.lucide.createIcons();
        }
      }} />

      <div className="font-sans text-slate-700 bg-white min-h-screen flex flex-col overflow-x-hidden">
        {/* Navigation */}
        <nav className="glass-nav fixed top-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <a href="/" className="flex-shrink-0 flex items-center gap-2">
                <img src="/DIVERSE LOOPERS (1) bg.png" alt="Diverse Loopers" className="h-10 w-auto" />
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8">
                <div className="flex space-x-1 p-1 bg-slate-100 rounded-full text-xs font-semibold mr-4">
                  <a href="/" className="px-4 py-1.5 text-slate-500 hover:text-slate-700 transition">Students</a>
                  <a href="/institute" className="px-4 py-1.5 text-slate-500 hover:text-slate-700 transition">Universities</a>
                  <a href="/business" className="px-4 py-1.5 bg-white text-primary rounded-full shadow-sm">Businesses</a>
                </div>
                <a href="/business" className="text-slate-600 hover:text-primary font-medium transition text-sm">Home</a>
                <a href="#solutions" className="text-slate-600 hover:text-primary font-medium transition text-sm">Solutions</a>
                <a href="#talent-hiring" className="text-slate-600 hover:text-primary font-medium transition text-sm">Hire Talent</a>

                <div className="flex items-center gap-4">
                  <a href="#contact" className="px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                    Start a Project
                  </a>
                </div>
              </div>

              <button id="mobile-menu-toggle" className="md:hidden p-2 text-slate-600">
                <i data-lucide="menu" className="w-6 h-6"></i>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div id="mobile-menu" className="hidden md:hidden bg-white border-b border-slate-100 p-6 space-y-4 shadow-xl">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl text-center mb-4">
              <a href="/" className="flex-1 py-2 text-slate-500 text-xs font-bold">Students</a>
              <a href="/institute" className="flex-1 py-2 text-slate-500 text-xs font-bold">Universities</a>
              <a href="/business" className="flex-1 py-2 bg-white text-primary rounded-lg text-xs font-bold shadow-sm">Businesses</a>
            </div>
            <a href="/business" className="block font-bold py-2">Home</a>
            <a href="#solutions" className="block font-bold py-2">Our Solutions</a>
            <a href="#talent-hiring" className="block font-bold py-2">Hire Talent</a>
            <a href="#contact" className="block py-4 bg-primary text-white text-center rounded-2xl font-bold shadow-lg">Start a Project</a>
          </div>
        </nav>

        <main className="flex-grow">
          {/* Hero Section */}
          <section id="hero-section" className="hero-gradient relative pt-40 pb-24 overflow-hidden">
            <canvas id="hero-canvas" className="hero-canvas"></canvas>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-4xl mx-auto">
                <span className="fade-in inline-block py-1 px-4 rounded-full bg-blue-50 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                  B2B Innovation & Execution
                </span>
                <h1 className="fade-in text-4xl md:text-7xl font-heading font-black text-slate-900 leading-tight mb-8">
                  Get Work Done. Build Talent Pipelines. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reduce Costs.</span>
                </h1>
                <p className="fade-in text-xl text-slate-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                  Diverse Loopers connects companies with a curated ecosystem of trained students and early professionals who execute real projects under expert mentorship — ensuring quality delivery and long-term value.
                </p>
                <div className="fade-in flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="#contact" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group transition">
                    Start a Project <i data-lucide="zap" className="w-5 h-5"></i>
                  </a>
                  <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition">
                    Talk to Our Team
                  </button>
                  <a href="/skillsynth" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group transition">
                    Our Top Performers <i data-lucide="zap" className="w-5 h-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Work With Us Section */}
          <section className="py-12 bg-white border-b border-slate-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="fade-in p-10 md:p-16 bg-slate-50 border border-slate-100 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl space-y-4">
                  <h2 className="text-2xl md:text-3xl font-heading font-black text-slate-900">Work With Us — Or Hire From Us</h2>
                  <p className="text-slate-600 leading-relaxed">
                    Diverse Loopers is not just a project execution partner. We are building one of the most selective communities of emerging technology talent. Companies can get projects delivered, build long-term execution partnerships, or hire pre-trained, work-ready contributors directly from our ecosystem.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a href="#talent-hiring" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition shadow-lg shadow-slate-200 flex items-center gap-2">
                    Hire From Diverse Loopers <i data-lucide="users" className="w-5 h-5"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Why Work With Us Section */}
          <section id="solutions" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="fade-in text-center mb-20">
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Smarter Execution</h2>
                <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6">More Than Outsourcing — A Smarter Model</h3>
                <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
                  We combine capable talent, guided execution, industry mentorship, and structured delivery frameworks so your business benefits from innovation without compromising quality.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bento-card fade-in p-8 rounded-[2.5rem]">
                  <div className="w-12 h-12 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mb-6">
                    <i data-lucide="users"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-3 text-lg leading-tight">Trained on Real Projects</h4>
                  <p className="text-sm text-slate-500">Every contributor has worked on structured, supervised projects — not just classroom exercises.</p>
                </div>
                <div className="bento-card fade-in p-8 rounded-[2.5rem]">
                  <div className="w-12 h-12 bg-pink-50 text-secondary rounded-2xl flex items-center justify-center mb-6">
                    <i data-lucide="shield-check"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-3 text-lg leading-tight">Guided by Experts</h4>
                  <p className="text-sm text-slate-500">Industry mentors review strategy, code quality, timelines, and deliverables at every stage.</p>
                </div>
                <div className="bento-card fade-in p-8 rounded-[2.5rem]">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                    <i data-lucide="bar-chart-3"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-3 text-lg leading-tight">Outcome-Driven Workflows</h4>
                  <p className="text-sm text-slate-500">Clear milestones, transparent communication, and measurable results for every sprint.</p>
                </div>
                <div className="bento-card fade-in p-8 rounded-[2.5rem]">
                  <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                    <i data-lucide="coins"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-3 text-lg leading-tight">Cost-Efficient</h4>
                  <p className="text-sm text-slate-500">Our hybrid execution model reduces operational costs while maintaining professional quality.</p>
                </div>
              </div>
            </div>
          </section>

          {/* The Model Section */}
          <section className="py-24 bg-surface border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="fade-in sticky top-32">
                  <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">The Pipeline</h2>
                  <h3 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-8 leading-tight">
                    A Simple, Reliable, <br/>Repeatable Process.
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    Built for busy teams who need delivery without micro-management. Our workflow ensures risk prevention and performance validation.
                  </p>
                  <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                    <h4 className="font-bold text-slate-900 mb-4 italic">What You Get With Every Project</h4>
                    <ul className="space-y-3 text-sm font-medium">
                      <li className="flex items-center gap-3">
                        <i data-lucide="check-circle" className="text-primary w-5 h-5"></i> Dedicated project coordinator
                      </li>
                      <li className="flex items-center gap-3">
                        <i data-lucide="check-circle" className="text-primary w-5 h-5"></i> Clear timelines and deliverables
                      </li>
                      <li className="flex items-center gap-3">
                        <i data-lucide="check-circle" className="text-primary w-5 h-5"></i> Regular review meetings
                      </li>
                      <li className="flex items-center gap-3">
                        <i data-lucide="check-circle" className="text-primary w-5 h-5"></i> Full documentation & handover
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative pl-8 md:pl-12 space-y-16">
                  <div className="timeline-spine absolute left-0 top-4 bottom-4 rounded-full opacity-20"></div>

                  <div className="reveal relative">
                    <div className="absolute -left-[41px] md:-left-[57px] top-0 w-6 h-6 rounded-full bg-white border-4 border-primary"></div>
                    <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-3">Phase 01</h4>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Share Your Project</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      Tell us what you need delivered. We analyze scope, complexity, and expected outcomes to assemble the right execution team.
                    </p>
                    <a href="#contact" className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                      Submit Requirements <i data-lucide="arrow-right" className="w-4 h-4"></i>
                    </a>
                  </div>

                  <div className="reveal relative">
                    <div className="absolute -left-[41px] md:-left-[57px] top-0 w-6 h-6 rounded-full bg-white border-4 border-secondary"></div>
                    <h4 className="text-xs font-black text-secondary uppercase tracking-widest mb-3">Phase 02</h4>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Guided Execution</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      Your project is handled by trained contributors monitored by expert mentors responsible for architecture, quality reviews, and performance validation.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase text-slate-400">
                      <span>Architecture</span>
                      <span>Code Reviews</span>
                      <span>Performance Validation</span>
                      <span>Risk Prevention</span>
                    </div>
                  </div>

                  <div className="reveal relative">
                    <div className="absolute -left-[41px] md:-left-[57px] top-0 w-6 h-6 rounded-full bg-white border-4 border-green-500"></div>
                    <h4 className="text-xs font-black text-green-500 uppercase tracking-widest mb-3">Phase 03</h4>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Delivery & Partnership</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      We deliver clean, tested, documented solutions. Choose between one-time delivery, ongoing support, or ongoing execution partnerships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hire Our Talent Section */}
          <section id="talent-hiring" className="py-24 bg-white border-b border-slate-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div className="fade-in space-y-6">
                  <h2 className="text-primary font-bold uppercase tracking-widest text-sm">Talent Acquisition</h2>
                  <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                    Hire Pre-Trained, <br/>Industry-Ready Talent
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our community consists of carefully selected learners and early professionals who have demonstrated high learning capability, completed real mentored projects, and built verifiable work portfolios.
                  </p>
                  <ul className="space-y-4 text-sm font-semibold text-slate-700">
                    <li className="flex items-center gap-3">
                      <i data-lucide="check-circle" className="text-primary"></i> Documented Mentored Projects
                    </li>
                    <li className="flex items-center gap-3">
                      <i data-lucide="check-circle" className="text-primary"></i> Structured Delivery Training
                    </li>
                    <li className="flex items-center gap-3">
                      <i data-lucide="check-circle" className="text-primary"></i> Collaboration Discipline
                    </li>
                  </ul>
                </div>
                <div className="fade-in bg-slate-900 rounded-[3rem] p-10 md:p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <h4 className="text-xl font-bold mb-8 italic">Roles Companies Commonly Hire For</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-primary">Web Development</p>
                      <p className="text-xs text-slate-400">Front-End & Full-Stack Developers</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-secondary">Data & AI</p>
                      <p className="text-xs text-slate-400">AI / ML & Data Analysts</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-green-400">Security & Ops</p>
                      <p className="text-xs text-slate-400">Cybersecurity & DevOps Trainees</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-blue-400">Support & Design</p>
                      <p className="text-xs text-slate-400">Product, UI/UX & Tech Assistants</p>
                    </div>
                  </div>
                  <a href="/skillsynth#talent-request-form" className="inline-block w-full mt-12 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition shadow-lg text-center cursor-pointer">
                    Request Talent Profiles
                  </a>
                </div>
              </div>
              <div className="fade-in text-center">
                <p className="text-slate-500 font-medium italic">
                  Instead of hiring candidates who only studied theory, you hire people who already know how work actually happens.
                </p>
              </div>
            </div>
          </section>

          {/* Services Grid Section */}
          <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="fade-in text-center mb-20">
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Execution Menu</h2>
                <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 italic">Services We Offer</h3>
                <p className="text-slate-500 max-w-xl mx-auto">
                  From product development to cloud optimization, our ecosystem delivers high-precision technical results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bento-card fade-in p-8 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-blue-50 text-primary rounded-xl flex items-center justify-center">
                      <i data-lucide="code-2" className="w-5 h-5"></i>
                    </div>
                    <h4 className="font-bold text-slate-900">Tech & Product</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li>Web & Mobile Apps</li>
                    <li>Full-stack Systems</li>
                    <li>Dashboards & Admin Panels</li>
                    <li>API Architecture</li>
                  </ul>
                </div>

                <div className="bento-card fade-in p-8 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                      <i data-lucide="server" className="w-5 h-5"></i>
                    </div>
                    <h4 className="font-bold text-slate-900">Cloud & DevOps</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li>CI/CD Pipelines</li>
                    <li>Server Automation</li>
                    <li>Containerization (Docker/K8s)</li>
                    <li>Cloud Migration</li>
                  </ul>
                </div>

                <div className="bento-card fade-in p-8 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-pink-50 text-secondary rounded-xl flex items-center justify-center">
                      <i data-lucide="brain-circuit" className="w-5 h-5"></i>
                    </div>
                    <h4 className="font-bold text-slate-900">AI, Data & Auto</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li>AI-powered Assistants</li>
                    <li>Predictive Analytics</li>
                    <li>Workflow Automation</li>
                    <li>Data Visualization</li>
                  </ul>
                </div>

                <div className="bento-card fade-in p-8 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                      <i data-lucide="shield-alert" className="w-5 h-5"></i>
                    </div>
                    <h4 className="font-bold text-slate-900">Cybersecurity</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li>Vulnerability Checks</li>
                    <li>Security Implementation</li>
                    <li>Risk Assessment</li>
                    <li>Threat Monitoring</li>
                  </ul>
                </div>

                <div className="bento-card fade-in p-8 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
                      <i data-lucide="palette" className="w-5 h-5"></i>
                    </div>
                    <h4 className="font-bold text-slate-900">Digital & Creative</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li>Branding & Strategy</li>
                    <li>SEO Optimization</li>
                    <li>Content Campaigns</li>
                    <li>High-Conversion Funnels</li>
                  </ul>
                </div>

                <div className="bento-card fade-in p-8 rounded-[3rem]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                      <i data-lucide="settings-2" className="w-5 h-5"></i>
                    </div>
                    <h4 className="font-bold text-slate-900">Ops & Support</h4>
                  </div>
                  <ul className="space-y-3 text-sm text-slate-500 font-medium">
                    <li>Process Automation</li>
                    <li>CRM Configuration</li>
                    <li>Virtual Ops Support</li>
                    <li>Custom Workshops</li>
                  </ul>
                </div>
              </div>

              <div className="fade-in mt-12 text-center">
                <p className="text-slate-400 text-sm mb-6 italic">Requirement not listed? We design custom solutions.</p>
                <button onClick={() => scrollToSection('contact')} className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition shadow-lg">
                  Discuss a Custom Requirement
                </button>
              </div>
            </div>
          </section>

          {/* Elite Community Section */}
          <section className="py-24 bg-surface border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="fade-in text-center mb-16">
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Elite Partnership</h2>
                <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight italic">
                  A Highly Selective Talent Ecosystem
                </h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="fade-in space-y-6">
                  <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                    Diverse Loopers operates as a quality-first ecosystem. We focus on nurturing and retaining the top-performing talent within our platform.
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    Participants are continuously evaluated on skill growth, reliability, consistency, problem-solving ability, and professionalism. Over time, we retain only those who consistently perform — building a community that represents the top performers within our ecosystem and partner network. This allows businesses to work with individuals who have proven capability, not just certificates.
                  </p>
                </div>
                <div className="fade-in grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest text-primary mb-3">
                      Reliable Delivery
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Structured, reviewed, and milestone-based execution on every project.
                    </p>
                  </div>
                  <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest text-secondary mb-3">
                      Innovation Edge
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Fresh approaches from emerging talent backed by senior mentoring oversight.
                    </p>
                  </div>
                  <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest text-green-600 mb-3">
                      Long-Term Value
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Access rising talent pipelines rather than temporary freelancers.
                    </p>
                  </div>
                  <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                    <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest text-blue-600 mb-3">
                      Flexible Models
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Pay per project, retainers, pilots, or long-term collaboration options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="fade-in text-3xl font-heading font-bold text-slate-900 mb-12 text-center">
                Partnering FAQ
              </h3>
              <div className="fade-in space-y-4">
                <details className="group bg-surface border border-slate-100 rounded-2xl overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-slate-900 select-none">
                    Is Diverse Loopers cheaper than agencies?
                    <i data-lucide="plus" className="w-5 h-5 text-primary group-open:rotate-45 transition"></i>
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
                    Yes — our hybrid execution model significantly reduces costs while maintaining high quality through expert industry review cycles.
                  </div>
                </details>

                <details className="group bg-surface border border-slate-100 rounded-2xl overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-slate-900 select-none">
                    Will I have to manage students directly?
                    <i data-lucide="plus" className="w-5 h-5 text-primary group-open:rotate-45 transition"></i>
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
                    No. All work is guided, supervised, and reviewed by industry mentors and project leads who act as your primary point of contact.
                  </div>
                </details>

                <details className="group bg-surface border border-slate-100 rounded-2xl overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-slate-900 select-none">
                    Can we hire the top performers?
                    <i data-lucide="plus" className="w-5 h-5 text-primary group-open:rotate-45 transition"></i>
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
                    Yes — we help businesses connect with pre-trained candidates from their project teams when hiring needs arise.
                  </div>
                </details>

                <details className="group bg-surface border border-slate-100 rounded-2xl overflow-hidden">
                  <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-slate-900 select-none text-left">
                    Is the work original and secure?
                    <i data-lucide="plus" className="w-5 h-5 text-primary group-open:rotate-45 transition flex-shrink-0"></i>
                  </summary>
                  <div className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">
                    All work follows ethical practices, NDAs if needed, and original output policies to protect your intellectual property.
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="fade-in bg-slate-900 rounded-[3rem] md:rounded-[4rem] text-white overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="grid lg:grid-cols-2">
                  <div className="p-10 md:p-20 space-y-10">
                    <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight italic">
                      Build Projects. <br/>Hire Talent. <br/>Grow Faster.
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Whether you want an application delivered or need reliable emerging talent on your team, Diverse Loopers helps you build smarter and scale with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => setInquiryType('Project Delivery')} className="px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-900/20">
                        Start a Project
                      </button>
                      <button onClick={() => setInquiryType('Talent Hiring')} className="px-6 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition shadow-lg shadow-slate-900/20">
                        Hire Our Talent
                      </button>
                    </div>
                  </div>
                  <div className="p-10 md:p-20 bg-white/5 flex flex-col justify-center">
                    <form id="business-contact-form" onSubmit={handleBusinessFormSubmit} className="space-y-6">
                      <div className="space-y-1">
                        <label id="biz-name-label" className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Business Unit
                        </label>
                        <input type="text" name="company_name" placeholder="Organization Name" required className="input-field" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                          Inquiry Type
                        </label>
                        <select id="biz-type" name="inquiry_type" required className="input-field">
                          <option value="Project Delivery">Project Delivery</option>
                          <option value="Talent Hiring">Talent Hiring / Recruitment</option>
                          <option value="Custom Partnership">Custom Partnership</option>
                        </select>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Contact Point
                          </label>
                          <input type="text" name="name" placeholder="Full Name" required className="input-field" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                            Official Email
                          </label>
                          <input type="email" name="email" placeholder="Work Email" required className="input-field" />
                        </div>
                      </div>
                      <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-blue-600 transition shadow-2xl shadow-blue-900/40">
                        Launch Partnership
                      </button>
                      <div id="form-message" className="hidden text-center p-4 rounded-xl text-sm font-bold mt-4 animate-pulse"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white pt-20 pb-10 mt-auto border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start">
                <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers" className="h-10 md:h-12 w-auto mb-6" />
                <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                  Gateway to execution, innovation, and future-ready talent — built with integrity and structure.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/company/105277450" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <i data-lucide="linkedin" className="w-4 h-4"></i>
                  </a>
                  <a href="https://www.instagram.com/diverseloopers/" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                    <i data-lucide="instagram" className="w-4 h-4"></i>
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">Navigation</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="/" className="hover:text-white transition">For Students</a></li>
                  <li><a href="/institute" className="hover:text-white transition">For Universities</a></li>
                  <li><a href="/business" className="text-primary font-bold">For Businesses</a></li>
                </ul>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">Company</h4>
                <ul className="space-y-4 text-slate-400 text-sm">
                  <li><a href="/aboutus-std" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                </ul>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <h4 className="font-bold mb-6 text-xs uppercase tracking-widest text-slate-500">Contact</h4>
                <p className="text-sm text-slate-400 italic">contact@diverseloopers.com</p>
                <p className="text-sm text-slate-400 italic mt-2">+91 98393 50961</p>
              </div>
            </div>
            <div className="pt-10 border-t border-white/5 text-center text-[10px] md:text-xs text-slate-500">
              &copy; 2024 Diverse Loopers Inc. Your Gateway to Talent, Innovation & Results.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}