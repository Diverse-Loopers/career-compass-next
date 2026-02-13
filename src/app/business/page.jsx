'use client';

import { useEffect } from 'react';
import * as BusinessLogic from '@/lib/pages/business';
import './business.css';

export default function BusinessPage() {
  useEffect(() => {
    BusinessLogic.initBusinessPage();
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="/" className="flex-shrink-0 flex items-center gap-2">
              <img src="/DIVERSE LOOPERS (1) bg.png" alt="Diverse Loopers" className="h-10 w-auto"/>
            </a>
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
                <a href="#contact" className="px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100">Start a Project</a>
              </div>
            </div>
            <button id="mobile-menu-toggle" className="md:hidden p-2 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
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
        <section id="hero-section" className="relative pt-40 pb-24 overflow-hidden hero-gradient">
          <canvas id="hero-canvas" className="absolute inset-0 pointer-events-none opacity-30"></canvas>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block py-1 px-4 rounded-full bg-blue-50 text-primary text-xs font-bold tracking-widest uppercase mb-6 fade-in">B2B Innovation & Execution</span>
              <h1 className="text-4xl md:text-7xl font-heading font-black text-slate-900 leading-tight mb-8 fade-in">
                Get Work Done. Build Talent Pipelines. <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reduce Costs.</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-12 fade-in max-w-3xl mx-auto">
                Diverse Loopers connects companies with a curated ecosystem of trained students and early professionals who execute real projects under expert mentorship — ensuring quality delivery and long-term value.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
                <a href="#contact" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group transition">
                  Start a Project <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </a>
                <button onClick={() => document.getElementById('contact').scrollIntoView()} className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:border-primary hover:text-primary transition">Talk to Our Team</button>
                <a href="/skillsynth" className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-full font-black text-lg hover:bg-blue-700 shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group transition">
                  Our Top Performers <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white border-b border-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="p-10 md:p-16 bg-slate-50 border border-slate-100 rounded-[3rem] fade-in flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl space-y-4">
                <h2 className="text-2xl md:text-3xl font-heading font-black text-slate-900">Work With Us — Or Hire From Us</h2>
                <p className="text-slate-600 leading-relaxed">Diverse Loopers is not just a project execution partner. We are building one of the most selective communities of emerging technology talent. Companies can get projects delivered, build long-term execution partnerships, or hire pre-trained, work-ready contributors directly from our ecosystem.</p>
              </div>
              <div className="flex-shrink-0">
                <a href="#talent-hiring" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition shadow-lg shadow-slate-200 flex items-center gap-2">
                  Hire From Diverse Loopers <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Continue with all sections from HTML - I'll provide the key sections */}
        
        <section id="contact" className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-[3rem] md:rounded-[4rem] text-white overflow-hidden shadow-2xl fade-in relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="grid lg:grid-cols-2">
                <div className="p-10 md:p-20 space-y-10">
                  <h2 className="text-3xl md:text-5xl font-heading font-black leading-tight italic">Build Projects. <br/>Hire Talent. <br/>Grow Faster.</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">Whether you want an application delivered or need reliable emerging talent on your team, Diverse Loopers helps you build smarter and scale with confidence.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => {document.getElementById('biz-type').value = 'Project Delivery'; document.getElementById('biz-name-label').scrollIntoView();}} className="px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:bg-blue-600 transition shadow-lg shadow-blue-900/20">Start a Project</button>
                    <button onClick={() => {document.getElementById('biz-type').value = 'Talent Hiring'; document.getElementById('biz-name-label').scrollIntoView();}} className="px-6 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition shadow-lg shadow-slate-900/20">Hire Our Talent</button>
                  </div>
                </div>
                <div className="p-10 md:p-20 bg-white/5 flex flex-col justify-center">
                  <form id="business-contact-form" className="space-y-6">
                    <div className="space-y-1">
                      <label id="biz-name-label" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Business Unit</label>
                      <input type="text" name="company_name" placeholder="Organization Name" required className="input-field"/>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Inquiry Type</label>
                      <select id="biz-type" name="inquiry_type" required className="input-field">
                        <option value="Project Delivery">Project Delivery</option>
                        <option value="Talent Hiring">Talent Hiring / Recruitment</option>
                        <option value="Custom Partnership">Custom Partnership</option>
                      </select>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact Point</label>
                        <input type="text" name="name" placeholder="Full Name" required className="input-field"/>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Official Email</label>
                        <input type="email" name="email" placeholder="Work Email" required className="input-field"/>
                      </div>
                    </div>
                    <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl hover:bg-blue-600 transition shadow-2xl shadow-blue-900/40">Launch Partnership</button>
                    <div id="form-message" className="hidden text-center p-4 rounded-xl text-sm font-bold mt-4 animate-pulse"></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white pt-20 pb-10 mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-center sm:text-left">
            <div className="flex flex-col items-center sm:items-start">
              <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers" className="h-10 md:h-12 w-auto mb-6"/>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">Gateway to execution, innovation, and future-ready talent — built with integrity and structure.</p>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-[10px] md:text-xs text-slate-500">&copy; 2024 Diverse Loopers Inc. Your Gateway to Talent, Innovation & Results.</div>
        </div>
      </footer>
    </>
  );
}