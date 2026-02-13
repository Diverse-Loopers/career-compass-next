'use client';


import Script from 'next/script';
import './fame-wall.css';

export default function WallOfFame() {
 

  return (
    <>
      {/* Tailwind CSS */}
            <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      
            {/* Supabase JS Client */}
            <Script
              src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"
              strategy="beforeInteractive"
            />
      
      
       <Script
              src="/js/fame-wall.js"
              strategy="afterInteractive"
            />
            
            {/* Font Awesome for Icons */}
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
            <link
              rel="icon"
              type="image/png"
              href="/https://diverseloopers.com/my-favicon/favicon.ico, enter /my-favicon/favicon-96x96.png"
              sizes="96x96"
            />
            <link
              rel="icon"
              type="image/svg+xml"
              href="/https://diverseloopers.com/my-favicon/favicon.ico, enter /my-favicon/favicon.svg"
            />
            <link
              rel="shortcut icon"
              href="/https://diverseloopers.com/my-favicon/favicon.ico, enter /my-favicon/favicon.ico"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/https://diverseloopers.com/my-favicon/favicon.ico, enter /my-favicon/apple-touch-icon.png"
            />
            <meta name="apple-mobile-web-app-title" content="DLPT" />
            <link
              rel="manifest"
              href="/https://diverseloopers.com/my-favicon/favicon.ico, enter /my-favicon/site.webmanifest"
            />
            {/* Google Fonts */}
            <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap"
              rel="stylesheet"
            />

      <div className="font-sans bg-slate-900 text-slate-300 min-h-screen flex flex-col">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <a href="index.html" className="flex-shrink-0 flex items-center gap-2">
                <img 
                  src="Diverse Loopers Black BG (2).png" 
                  onError={(e) => { e.target.src = 'DIVERSE LOOPERS (1) bg.png'; }} 
                  alt="Diverse Loopers" 
                  className="h-10 w-auto" 
                />
              </a>

              <div className="hidden md:flex items-center space-x-8">
                <a href="skillsynth.html" className="text-slate-300 hover:text-white font-medium transition text-sm">Home</a>
                <a href="fame-wall.html" className="text-white font-bold transition text-sm border-b-2 border-primary pb-1">Wall of Fame</a>
                <a href="index.html#events" className="text-slate-300 hover:text-white font-medium transition text-sm">Events</a>
                <a href="#hiring-form" className="text-slate-300 hover:text-white font-medium transition text-sm">Hire Talent</a>
              </div>

              <button id="mobile-menu-toggle" className="md:hidden p-2 text-slate-300">
                <i data-lucide="menu"></i>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div id="mobile-menu" className="hidden md:hidden bg-slate-900 border-b border-slate-800 p-6 space-y-4 shadow-xl text-center">
            <a href="skillsynth.html" className="block font-bold text-white">Home</a>
            <a href="fame-wall.html" className="block font-bold text-primary">Wall of Fame</a>
            <a href="index.html#events" className="block font-bold text-white">Events</a>
            <a href="#hiring-form" className="block font-bold text-white">Hire Talent</a>
          </div>
        </nav>

        <main className="flex-grow pt-32 pb-20">
          
          {/* Go Back Button */}
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center gap-2 text-slate-400 hover:text-white transition group text-sm font-bold uppercase tracking-widest"
            >
              <i data-lucide="arrow-left" className="w-4 h-4 group-hover:-translate-x-1 transition-transform"></i>
              Go Back
            </button>
          </div>

          {/* Header */}
          <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest mb-6 fade-in">
              Hall of Excellence
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 fade-in">
              The Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Wall of Fame</span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg fade-in">
              A chronological archive of brilliance. Every week, we highlight the individuals who went above and beyond.
            </p>
          </div>

          {/* Timeline Container */}
          <div id="wall-container" className="max-w-7xl mx-auto px-6 space-y-24 min-h-[30vh] mb-32">
            {/* Dynamic Content Injected Here */}
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mb-4"></div>
              <p className="text-slate-500 text-sm uppercase tracking-widest">Loading History...</p>
            </div>
          </div>

          {/* Hiring Form Section */}
          <section id="hiring-form" className="py-12 relative border-t border-slate-800">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-slate-800/50 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-slate-700 shadow-2xl reveal">
                <div className="mb-10 text-center space-y-2">
                  <h3 className="text-3xl font-heading font-black text-white italic">Hire Talent Requirements</h3>
                  <p className="text-slate-400 font-medium">See potential here? Share your hiring needs and our team will connect you with these profiles.</p>
                </div>

                <form id="talent-request-form" className="space-y-6 text-left">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Company Name</label>
                      <input type="text" name="company_name" required className="dark-input" placeholder="Organization" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Hiring Contact Person</label>
                      <input type="text" name="contact_name" required className="dark-input" placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Business Email</label>
                      <input type="email" name="contact_email" required className="dark-input" placeholder="email@company.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Contact Number</label>
                      <input type="tel" name="contact_phone" required className="dark-input" placeholder="+91 ..." />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Role / Requirement</label>
                      <input type="text" name="role_requirement" required className="dark-input" placeholder="e.g. AI Analyst" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Type of Hiring</label>
                      <select name="hiring_type" required className="dark-input">
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract / Project Based</option>
                        <option value="Full-Time">Trial to Full-Time</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Preferred Skills / Stack</label>
                    <input type="text" name="preferred_skills" className="dark-input" placeholder="e.g. React, Python, Docker" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Additional Notes</label>
                    <textarea name="notes" rows={4} className="dark-input" placeholder="Any specific requirements..."></textarea>
                  </div>
                  
                  <div className="pt-6">
                    <button type="submit" className="w-full py-5 bg-primary text-white rounded-3xl font-black text-xl uppercase tracking-widest hover:bg-indigo-600 transition shadow-xl shadow-indigo-900/20">
                      Submit Requirement
                    </button>
                  </div>
                  <p className="text-[9px] text-center font-bold text-slate-500 uppercase tracking-wider italic mt-4">
                    * We respect confidentiality. Your information is used only for collaboration and hiring support.
                  </p>
                  <div id="form-msg" className="hidden text-center p-4 rounded-2xl text-sm font-bold mt-4 animate-pulse"></div>
                </form>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="bg-slate-950 text-white py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">&copy; 2024 Diverse Loopers. Celebrating Talent.</p>
          </div>
        </footer>

      </div>
    </>
  );
}