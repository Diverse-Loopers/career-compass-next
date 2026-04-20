// 'use client';

// import { useState, useEffect } from 'react';
// import './about.css';
// import Script from 'next/script';
// import { initThreeJsAnimation, initScrollReveal, registerHybridHustler } from '@/lib/pages/about';

// export default function AboutPage() {
//     const [showMobileMenu, setShowMobileMenu] = useState(false);
//     const [formMessage, setFormMessage] = useState({ text: '', color: '' });

//     useEffect(() => {
//         // Initialize Three.js animation
//         const cleanupThree = initThreeJsAnimation();

//         // Initialize scroll reveal
//         const cleanupScroll = initScrollReveal();

//         // Cleanup on unmount
//         return () => {
//             if (cleanupThree) cleanupThree();
//             if (cleanupScroll) cleanupScroll();
//         };
//     }, []);

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         setFormMessage({ text: '', color: '' });

//         if (!e.target.checkValidity()) {
//             setFormMessage({
//                 text: 'Please fill out all required fields correctly.',
//                 color: '#ef4444'
//             });
//             return;
//         }

//         setFormMessage({
//             text: 'Registering...',
//             color: 'var(--primary)'
//         });

//         const formData = new FormData(e.target);
//         const result = await registerHybridHustler(formData);

//         setFormMessage({
//             text: result.message,
//             color: result.success ? 'var(--primary)' : '#ef4444'
//         });

//         if (result.success) {
//             e.target.reset();
//         }
//     };

//     return (
//         <>
//             <link rel="preconnect" href="https://fonts.googleapis.com" />
//             <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//             <link
//                 href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;600&display=swap"
//                 rel="stylesheet"
//             />
//             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />


//             <Script
//                 src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
//                 strategy="beforeInteractive"
//             />

//             <div className="antialiased selection:bg-indigo-500 selection:text-white">
//                 {/* 3D Background Canvas */}
//                 <div id="canvas-container"></div>

//                 {/* Navigation */}
//                 <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-md border-b border-slate-200 transition-all duration-300" id="navbar">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="flex items-center justify-between h-20">

//                             {/* Logo Section */}
//                             <div
//                                 className="flex-shrink-0 cursor-pointer flex items-center gap-3"
//                                 onClick={() => window.scrollTo(0, 0)}
//                             >
//                                 <img
//                                     src="/Diverse Loopers Black BG (2).png"
//                                     alt="Diverse Loopers Logo"
//                                     className="h-25 w-25 object-contain"
//                                 />
//                             </div>

//                             {/* Desktop Menu */}
//                             <div className="hidden md:block">
//                                 <div className="ml-10 flex items-baseline space-x-8">

//                                     <a href="#mission" className="text-slate-700 hover:text-primary px-3 py-2 text-sm font-medium transition">
//                                         Mission
//                                     </a>

//                                     <a href="#hybrid-hustle" className="text-slate-700 hover:text-primary px-3 py-2 text-sm font-medium transition">
//                                         Hybrid Hustle
//                                     </a>

//                                     <a href="#join-hustle" className="text-slate-700 hover:text-primary px-3 py-2 text-sm font-medium transition">
//                                         Register
//                                     </a>

//                                     <a href="/" className="text-slate-700 hover:text-primary px-3 py-2 text-sm font-medium transition">
//                                         Home
//                                     </a>

//                                     <a href="/#contact" className="text-slate-700 hover:text-primary px-3 py-2 text-sm font-medium transition">
//                                         Contact Us
//                                     </a>

//                                     {/* Login Button */}
//                                     <a
//                                         href="/login"
//                                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 shadow-md"
//                                     >
//                                         Login
//                                     </a>

//                                 </div>
//                             </div>

//                             {/* Mobile menu button */}
//                             <div className="-mr-2 flex md:hidden">
//                                 <button
//                                     type="button"
//                                     className="p-2 rounded-md text-slate-700 hover:text-primary hover:bg-slate-100 transition"
//                                     onClick={() => setShowMobileMenu(!showMobileMenu)}
//                                 >
//                                     <i className="fas fa-bars text-xl"></i>
//                                 </button>
//                             </div>

//                         </div>
//                     </div>

//                     {/* Mobile Menu */}
//                     {showMobileMenu && (
//                         <div className="md:hidden bg-white border-t border-slate-200 shadow-md">
//                             <div className="px-4 py-3 space-y-2">

//                                 <a href="#mission" className="block text-slate-700 hover:text-primary px-3 py-2 text-base font-medium">
//                                     Mission
//                                 </a>

//                                 <a href="#hybrid-hustle" className="block text-slate-700 hover:text-primary px-3 py-2 text-base font-medium">
//                                     Hybrid Hustle
//                                 </a>

//                                 <a href="#join-hustle" className="block text-slate-700 hover:text-primary px-3 py-2 text-base font-medium">
//                                     Register
//                                 </a>

//                                 <a href="/" className="block text-slate-700 hover:text-primary px-3 py-2 text-base font-medium">
//                                     Home
//                                 </a>

//                                 <a href="/#contact" className="block text-slate-700 hover:text-primary px-3 py-2 text-base font-medium">
//                                     Contact Us
//                                 </a>

//                                 <a href="/" className="block text-indigo-600 font-semibold px-3 py-2">
//                                     Visit Main Site
//                                 </a>

//                             </div>
//                         </div>
//                     )}
//                 </nav>

//                 {/* Hero Section */}
//                 <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
//                         <div className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 mb-8 backdrop-blur-sm reveal active">
//                             <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
//                             Student-First Tech & Career Platform
//                         </div>
//                         <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 reveal active" style={{ transitionDelay: '100ms' }}>
//                             Learn Skills. <br />
//                             <span className="text-gradient">Do Real Work.</span> <br />
//                             Earn & Grow.
//                         </h1>
//                         <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 reveal active" style={{ transitionDelay: '200ms' }}>
//                             Bridging the gap between college education and real-world careers. Move beyond theory into practical application.
//                         </p>
//                         <div className="mt-10 flex justify-center gap-4 reveal active" style={{ transitionDelay: '300ms' }}>
//                             <a href="#mission" className="px-8 py-3.5 rounded-lg bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
//                                 Our Mission
//                             </a>
//                             <a href="#join-hustle" className="px-8 py-3.5 rounded-lg border border-gray-600 text-black font-medium hover:bg-black/10 transition-colors backdrop-blur-sm">
//                                 Join the Hustle
//                             </a>
//                         </div>
//                     </div>
//                 </header>

//                 {/* Mission & Intro Section */}
//                 <section id="mission" className="py-20 relative z-10">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                             <div className="reveal">
//                                 <h2 className="text-3xl md:text-4xl font-bold mb-6">More Than Just a Platform</h2>
//                                 <p className="text-lg text-gray-500 mb-6 leading-relaxed">
//                                     Diverse Loopers is built to solve a critical problem: the gap between academic theory and industry reality. We help students move beyond textbooks by combining practical skill training, real industry projects, and earning opportunities into one structured journey.
//                                 </p>
//                                 <div className="glass-panel p-6 rounded-xl border-l-4 border-indigo-500">
//                                     <p className="text-xl font-medium text-white italic">
//                                         "So you don't just learn, you apply, earn, and grow."
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal">
//                                 <div className="glass-card p-6 rounded-xl">
//                                     <i className="fas fa-laptop-code text-4xl text-indigo-400 mb-4"></i>
//                                     <h3 className="text-xl font-bold mb-2">Real Skills</h3>
//                                     <p className="text-gray-700 text-sm">Industry-relevant training focused on tools used in the workplace.</p>
//                                 </div>
//                                 <div className="glass-card p-6 rounded-xl">
//                                     <i className="fas fa-briefcase text-4xl text-purple-400 mb-4"></i>
//                                     <h3 className="text-xl font-bold mb-2">Live Projects</h3>
//                                     <p className="text-gray-700 text-sm">Hands-on experience through real client and internal projects.</p>
//                                 </div>
//                                 <div className="glass-card p-6 rounded-xl">
//                                     <i className="fas fa-wallet text-4xl text-teal-400 mb-4"></i>
//                                     <h3 className="text-xl font-bold mb-2">Earn</h3>
//                                     <p className="text-gray-700 text-sm">Performance-based earning opportunities as you grow.</p>
//                                 </div>
//                                 <div className="glass-card p-6 rounded-xl">
//                                     <i className="fas fa-rocket text-4xl text-pink-400 mb-4"></i>
//                                     <h3 className="text-xl font-bold mb-2">Career Growth</h3>
//                                     <p className="text-gray-700 text-sm">Clear pathways instead of confusion. Build a real portfolio.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Why We Exist Section */}
//                 <section className="py-20 bg-black/20 relative z-10">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="text-center mb-16 reveal">
//                             <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Diverse Loopers Exists</h2>
//                             <p className="text-gray-700 max-w-2xl mx-auto">
//                                 We saw a pattern of challenges students face today, and we decided to build the solution.
//                             </p>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                             <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal">
//                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                                     <i className="fas fa-book-open text-6xl"></i>
//                                 </div>
//                                 <div className="relative z-10">
//                                     <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
//                                     <p className="text-gray-100 text-sm">Students learn concepts but lack real experience.</p>
//                                     <div className="my-4 h-px bg-gray-700"></div>
//                                     <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
//                                     <p className="text-gray-100 text-sm">Careers are built through doing real work, not just courses.</p>
//                                 </div>
//                             </div>

//                             <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal" style={{ transitionDelay: '100ms' }}>
//                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                                     <i className="fas fa-folder-open text-6xl"></i>
//                                 </div>
//                                 <div className="relative z-10">
//                                     <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
//                                     <p className="text-gray-100 text-sm">Struggling to build meaningful portfolios.</p>
//                                     <div className="my-4 h-px bg-gray-700"></div>
//                                     <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
//                                     <p className="text-gray-100 text-sm">Strong portfolios backed by real proof of work.</p>
//                                 </div>
//                             </div>

//                             <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal" style={{ transitionDelay: '200ms' }}>
//                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                                     <i className="fas fa-hand-holding-dollar text-6xl"></i>
//                                 </div>
//                                 <div className="relative z-10">
//                                     <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
//                                     <p className="text-gray-100 text-sm">Want to earn, but lack credible opportunities.</p>
//                                     <div className="my-4 h-px bg-gray-700"></div>
//                                     <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
//                                     <p className="text-gray-100 text-sm">Structured earning based on contribution and skill.</p>
//                                 </div>
//                             </div>

//                             <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal" style={{ transitionDelay: '300ms' }}>
//                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                                     <i className="fas fa-graduation-cap text-6xl"></i>
//                                 </div>
//                                 <div className="relative z-10">
//                                     <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
//                                     <p className="text-gray-100 text-sm">Feeling unprepared despite having degrees.</p>
//                                     <div className="my-4 h-px bg-gray-700"></div>
//                                     <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
//                                     <p className="text-gray-100 text-sm">Preparation for real professional environments.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Hybrid Hustle Section (Timeline) */}
//                 <section id="hybrid-hustle" className="py-24 relative z-10 overflow-hidden">
//                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent"></div>
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//                         <div className="text-center mb-16 reveal">
//                             <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">The Pathway</span>
//                             <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-6">
//                                 Hybrid <span className="text-gradient-accent">Hustle</span>
//                             </h2>
//                             <p className="text-gray-700 max-w-3xl mx-auto text-lg">
//                                 Our structured "learn-work-earn" pathway. It's not a shortcut, it's how real careers are built.
//                             </p>
//                         </div>

//                         <div id="journey" className="relative mt-20">
//                             <div className="hidden md:block journey-line"></div>

//                             <div className="space-y-12 md:space-y-24">
//                                 {/* Step 1 */}
//                                 <div className="relative flex flex-col md:flex-row items-center reveal">
//                                     <div className="flex-1 text-center md:text-right md:pr-12 order-2 md:order-1 mt-6 md:mt-0">
//                                         <h3 className="text-2xl font-bold text-blue">1. Learn</h3>
//                                         <p className="text-gray-700 mt-2">
//                                             Start with structured training focused on tools, workflows, and industry standards.
//                                         </p>
//                                     </div>
//                                     <div className="w-12 h-12 rounded-full bg-indigo-600 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_var(--primary)]">
//                                         1
//                                     </div>
//                                     <div className="flex-1 md:pl-12 order-3"></div>
//                                 </div>

//                                 {/* Step 2 */}
//                                 <div className="relative flex flex-col md:flex-row items-center reveal">
//                                     <div className="flex-1 md:pr-12 order-3 md:order-1"></div>
//                                     <div className="w-12 h-12 rounded-full bg-purple-600 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_var(--secondary)]">
//                                         2
//                                     </div>
//                                     <div className="flex-1 text-center md:text-left md:pl-12 order-2 md:order-3 mt-6 md:mt-0">
//                                         <h3 className="text-2xl font-bold text-blue">2. Apply</h3>
//                                         <p className="text-gray-700 mt-2">
//                                             Complete tasks and internal projects to prove your readiness.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Step 3 */}
//                                 <div className="relative flex flex-col md:flex-row items-center reveal">
//                                     <div className="flex-1 text-center md:text-right md:pr-12 order-2 md:order-1 mt-6 md:mt-0">
//                                         <h3 className="text-2xl font-bold text-blue">3. Work</h3>
//                                         <p className="text-gray-700 mt-2">
//                                             Join live projects and contribute as a real team member.
//                                         </p>
//                                     </div>
//                                     <div className="w-12 h-12 rounded-full bg-teal-500 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_var(--accent)]">
//                                         3
//                                     </div>
//                                     <div className="flex-1 md:pl-12 order-3"></div>
//                                 </div>

//                                 {/* Step 4 */}
//                                 <div className="relative flex flex-col md:flex-row items-center reveal">
//                                     <div className="flex-1 md:pr-12 order-3 md:order-1"></div>
//                                     <div className="w-12 h-12 rounded-full bg-pink-500 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_#ec4899]">
//                                         4
//                                     </div>
//                                     <div className="flex-1 text-center md:text-left md:pl-12 order-2 md:order-3 mt-6 md:mt-0">
//                                         <h3 className="text-2xl font-bold text-blue">4. Earn</h3>
//                                         <p className="text-gray-700 mt-2">
//                                             Get paid based on skill level, work quality, and responsibility.
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Step 5 */}
//                                 <div className="relative flex flex-col md:flex-row items-center reveal">
//                                     <div className="flex-1 text-center md:text-right md:pr-12 order-2 md:order-1 mt-6 md:mt-0">
//                                         <h3 className="text-2xl font-bold text-blue">5. Grow</h3>
//                                         <p className="text-gray-700 mt-2">
//                                             Build portfolios, gain experience, and unlock advanced opportunities.
//                                         </p>
//                                     </div>
//                                     <div className="w-12 h-12 rounded-full bg-yellow-500 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_#eab308]">
//                                         5
//                                     </div>
//                                     <div className="flex-1 md:pl-12 order-3"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Join Hybrid Hustle Form Section */}
//                 <section id="join-hustle" className="relative py-24 flex items-center justify-center overflow-hidden min-h-screen">
//                     <div className="relative z-10 w-full max-w-4xl px-4">
//                         <div className="glass-panel p-8 md:p-12 rounded-2xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)] reveal">
//                             <div className="text-center mb-10">
//                                 <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
//                                     Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hybrid Hustler</span>
//                                 </h2>
//                                 <p className="text-gray-300">Join our exclusive network and fast-track your path to tech mastery.</p>
//                             </div>

//                             <form onSubmit={handleFormSubmit} className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label htmlFor="hustler-name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
//                                         <input
//                                             type="text"
//                                             id="hustler-name"
//                                             name="name"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="hustler-college" className="block text-sm font-medium text-gray-300 mb-2">College Name</label>
//                                         <input
//                                             type="text"
//                                             id="hustler-college"
//                                             name="college"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="hustler-email" className="block text-sm font-medium text-gray-300 mb-2">Email ID</label>
//                                         <input
//                                             type="email"
//                                             id="hustler-email"
//                                             name="email"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="hustler-contact" className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
//                                         <input
//                                             type="tel"
//                                             id="hustler-contact"
//                                             name="contact"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="hustler-tech" className="block text-sm font-medium text-gray-300 mb-2">Core Technology</label>
//                                         <select
//                                             id="hustler-tech"
//                                             name="tech"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none"
//                                         >
//                                             <option value="" className="bg-slate-900">Select Technology</option>
//                                             <option value="AI/ML" className="bg-slate-900">AI/ML</option>
//                                             <option value="WebDev" className="bg-slate-900">Web Development (Full Stack)</option>
//                                             <option value="GameDev" className="bg-slate-900">Game Development</option>
//                                             <option value="AndroidDev" className="bg-slate-900">Android Development</option>
//                                             <option value="DataScience" className="bg-slate-900">Data Science</option>
//                                             <option value="CyberSecurity" className="bg-slate-900">Cyber Security</option>
//                                             <option value="Cloud" className="bg-slate-900">Cloud Engineering</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="hustler-year" className="block text-sm font-medium text-gray-300 mb-2">Course Year</label>
//                                         <select
//                                             id="hustler-year"
//                                             name="year"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none"
//                                         >
//                                             <option value="" className="bg-slate-900">Select Year</option>
//                                             <option value="1" className="bg-slate-900">1st Year</option>
//                                             <option value="2" className="bg-slate-900">2nd Year</option>
//                                             <option value="3" className="bg-slate-900">3rd Year</option>
//                                             <option value="4" className="bg-slate-900">4th Year</option>
//                                             <option value="Graduate" className="bg-slate-900">Graduate</option>
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label htmlFor="hustler-semester" className="block text-sm font-medium text-gray-300 mb-2">Semester</label>
//                                         <input
//                                             type="number"
//                                             id="hustler-semester"
//                                             name="semester"
//                                             min="1"
//                                             max="8"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label htmlFor="hustler-roll" className="block text-sm font-medium text-gray-300 mb-2">Roll No.</label>
//                                         <input
//                                             type="text"
//                                             id="hustler-roll"
//                                             name="roll"
//                                             required
//                                             className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div className="mt-8">
//                                     <button
//                                         type="submit"
//                                         className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:scale-[1.02] duration-200"
//                                     >
//                                         Enroll in the Hustle!
//                                     </button>
//                                 </div>
//                                 {formMessage.text && (
//                                     <p
//                                         className="mt-4 text-center font-medium"
//                                         style={{ color: formMessage.color }}
//                                     >
//                                         {formMessage.text}
//                                     </p>
//                                 )}
//                             </form>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Transparency & Who Is This For */}
//                 <section className="py-20 relative z-10">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                             <div className="glass-panel p-8 rounded-2xl reveal">
//                                 <div className="flex items-center mb-6">
//                                     <i className="fas fa-search text-3xl text-indigo-400 mr-4"></i>
//                                     <h3 className="text-2xl font-bold">Transparency Matters</h3>
//                                 </div>
//                                 <p className="text-gray-300 mb-6">
//                                     We are clear and honest with every student. This approach prepares students for real professional expectations, not false promises.
//                                 </p>
//                                 <ul className="space-y-4">
//                                     <li className="flex items-start">
//                                         <i className="fas fa-times text-red-500 mt-1 mr-3"></i>
//                                         <span className="text-gray-400">No guaranteed income</span>
//                                     </li>
//                                     <li className="flex items-start">
//                                         <i className="fas fa-times text-red-500 mt-1 mr-3"></i>
//                                         <span className="text-gray-400">No fixed salary for everyone</span>
//                                     </li>
//                                     <li className="flex items-start">
//                                         <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
//                                         <span className="text-white">Earnings depend on skills, performance, and project availability</span>
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className="glass-panel p-8 rounded-2xl reveal" style={{ transitionDelay: '100ms' }}>
//                                 <div className="flex items-center mb-6">
//                                     <i className="fas fa-users text-3xl text-teal-400 mr-4"></i>
//                                     <h3 className="text-2xl font-bold">Who Is This For?</h3>
//                                 </div>
//                                 <p className="text-gray-300 mb-6">
//                                     Diverse Loopers is not for everyone. It is specifically for students who are serious about their future.
//                                 </p>
//                                 <ul className="space-y-3">
//                                     <li className="flex items-center text-gray-300">
//                                         <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
//                                         Want real experience, not just certificates
//                                     </li>
//                                     <li className="flex items-center text-gray-300">
//                                         <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
//                                         Are willing to learn by doing
//                                     </li>
//                                     <li className="flex items-center text-gray-300">
//                                         <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
//                                         Want to earn through skill and effort
//                                     </li>
//                                     <li className="flex items-center text-gray-300">
//                                         <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
//                                         Serious about long-term career growth
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Opportunities & Launchpad */}
//                 <section className="py-20 relative z-10 text-center">
//                     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <h2 className="text-3xl font-bold mb-10 reveal">Opportunities Beyond Learning</h2>
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
//                             <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
//                                 <i className="fas fa-crown text-3xl text-yellow-500 mb-3"></i>
//                                 <p className="font-medium">Leadership Roles</p>
//                             </div>
//                             <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
//                                 <i className="fas fa-chalkboard-teacher text-3xl text-blue-400 mb-3"></i>
//                                 <p className="font-medium">Mentorship</p>
//                             </div>
//                             <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
//                                 <i className="fas fa-building text-3xl text-purple-400 mb-3"></i>
//                                 <p className="font-medium">Company Placements</p>
//                             </div>
//                             <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
//                                 <i className="fas fa-users-cog text-3xl text-red-400 mb-3"></i>
//                                 <p className="font-medium">Core Team Access</p>
//                             </div>
//                         </div>
//                         <p className="mt-12 text-xl text-gray-700 font-light italic reveal">
//                             "For many students, Diverse Loopers becomes more than a platform — it becomes a career launchpad."
//                         </p>
//                     </div>
//                 </section>

//                 {/* Our Tools Section */}
//                 <section className="py-20 bg-black/40 relative z-10">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="text-center mb-16 reveal">
//                             <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
//                                 Tools By Diverse Loopers For Learners
//                             </h2>
//                             <p className="text-white max-w-2xl mx-auto">
//                                 We have created custom tools to enhance the learning experience for our Learners. These tools are designed to provide data-backed suggestions for your future.
//                             </p>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-5xl mx-auto">
//                             {/* Path Analyzer Card */}
//                             <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal flex flex-col h-full border border-gray-700/50 hover:border-red-400/30 transition-all duration-300">
//                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                                     <i className="fas fa-book-open text-8xl text-red-500"></i>
//                                 </div>

//                                 <div className="relative z-10 flex-grow">
//                                     <h3 className="text-2xl font-bold mb-3 text-red-400">Path Analyzer Tool</h3>
//                                     <p className="text-gray-300 text-sm mb-4">
//                                         Analyze your current academic standing and get a calculated roadmap to reach your dream job.
//                                     </p>

//                                     <div className="bg-black/20 rounded-lg p-3 mb-4">
//                                         <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Key Features</h4>
//                                         <ul className="text-sm text-gray-400 space-y-1">
//                                             <li className="flex items-center"><i className="fas fa-check text-red-500 text-xs mr-2"></i> Skill Gap Analysis</li>
//                                             <li className="flex items-center"><i className="fas fa-check text-red-500 text-xs mr-2"></i> Market Trend Matching</li>
//                                             <li className="flex items-center"><i className="fas fa-check text-red-500 text-xs mr-2"></i> Course Suggestions</li>
//                                         </ul>
//                                     </div>

//                                     <div className="my-4 h-px bg-gray-700"></div>

//                                     <h3 className="text-lg font-bold mb-2 text-green-400">Outcome</h3>
//                                     <p className="text-gray-300 text-sm">
//                                         A personalized step-by-step learning path tailored to your specific goals.
//                                     </p>
//                                 </div>

//                                 <div className="relative z-10 mt-6">
//                                     <a href="/analyzer" className="w-full block text-center bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(248,113,113,0.3)]">
//                                         Launch Path Analyzer <i className="fas fa-arrow-right ml-2"></i>
//                                     </a>
//                                 </div>
//                             </div>

//                             {/* Career Analyzer Card */}
//                             <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal flex flex-col h-full border border-gray-700/50 hover:border-indigo-400/30 transition-all duration-300" style={{ transitionDelay: '100ms' }}>
//                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
//                                     <i className="fas fa-graduation-cap text-8xl text-indigo-500"></i>
//                                 </div>

//                                 <div className="relative z-10 flex-grow">
//                                     <h3 className="text-2xl font-bold mb-3 text-indigo-400">Career Analyzer Tool</h3>
//                                     <p className="text-gray-300 text-sm mb-4">
//                                         Confused about which tech role fits you? Our logic-based assessment finds your perfect match.
//                                     </p>

//                                     <div className="bg-black/20 rounded-lg p-3 mb-4">
//                                         <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Key Features</h4>
//                                         <ul className="text-sm text-gray-400 space-y-1">
//                                             <li className="flex items-center"><i className="fas fa-check text-indigo-500 text-xs mr-2"></i> Interest Mapping</li>
//                                             <li className="flex items-center"><i className="fas fa-check text-indigo-500 text-xs mr-2"></i> Aptitude Scoring</li>
//                                             <li className="flex items-center"><i className="fas fa-check text-indigo-500 text-xs mr-2"></i> 6-Month Roadmap</li>
//                                         </ul>
//                                     </div>

//                                     <div className="my-4 h-px bg-gray-700"></div>

//                                     <h3 className="text-lg font-bold mb-2 text-green-400">Outcome</h3>
//                                     <p className="text-gray-300 text-sm">
//                                         Discover if you are meant for Backend, Data, Cyber Security, Full Stack or any other tech role.
//                                     </p>
//                                 </div>

//                                 <div className="relative z-10 mt-6">
//                                     <a href="/career-analyzer" className="w-full block text-center bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/50 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
//                                         Find My Career <i className="fas fa-arrow-right ml-2"></i>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Footer */}
//                 <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 relative z-10">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
//                             <div className="col-span-1 md:col-span-1">
//                                 <div className="flex items-center gap-2 mb-4">
//                                     <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers Logo" className="h-8 w-8 object-contain" />
//                                     <span className="text-2xl font-bold brand-font text-white tracking-wider">
//                                         Diverse<span className="text-indigo-400">Loopers</span>
//                                     </span>
//                                 </div>
//                                 <p className="mt-4 text-gray-400 text-sm leading-relaxed">
//                                     To help students convert skills into experience, experience into earnings, and earnings into sustainable careers.
//                                 </p>
//                             </div>
//                             <div className="col-span-1 md:col-span-1">
//                                 <h4 className="text-white font-bold mb-4">Quick Links</h4>
//                                 <ul className="space-y-2 text-sm text-gray-400">
//                                     <li><a href="#mission" className="hover:text-indigo-400 transition-colors">Mission</a></li>
//                                     <li><a href="#hybrid-hustle" className="hover:text-indigo-400 transition-colors">Hybrid Hustle</a></li>
//                                     <li><a href="#journey" className="hover:text-indigo-400 transition-colors">The Journey</a></li>
//                                 </ul>
//                             </div>
//                             <div className="col-span-1 md:col-span-1">
//                                 <h4 className="text-white font-bold mb-4">Connect</h4>
//                                 <p className="text-gray-400 text-sm mb-4">Ready to start your journey? Visit our main platform.</p>
//                                 <a href="/" className="hover:text-indigo-400 transition-colors text-white/50">
//                                     Home
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
//                             <p>&copy; 2024 Diverse Loopers. All rights reserved.</p>
//                             <p className="mt-2 text-xs">
//                                 Diverse Loopers is where students learn real skills, work on real projects, earn through performance, and grow into industry-ready professionals.
//                             </p>
//                         </div>
//                     </div>
//                 </footer>
//             </div>
//         </>
//     );
// }

"use client";

import { useState, useEffect, useRef } from "react";

// ── Font + Icon Loader ────────────────────────────────────────────────────────
function FontLoader() {
  useEffect(() => {
    const hrefs = [
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap",
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap",
    ];
    hrefs.forEach((href) => {
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      }
    });
  }, []);
  return null;
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      if (e.target.closest(".ab-nav__menu-btn")) return;
      setMenuOpen(false);
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [menuOpen]);

  return (
    <>
      <nav className={`ab-nav${scrolled ? " ab-nav--scrolled" : ""}`}>
        <div className="ab-nav__inner">
          <a href="/" className="ab-nav__logo">
            <img src="/images/logo.png" alt="Diverse Loopers" className="ab-nav__logo-img" />
          </a>
          <div className="ab-nav__links">
            <a className="ab-nav__link" href="/">Home</a>
            <a className="ab-nav__link" href="/products">Products</a>
            <a className="ab-nav__link ab-nav__link--active" href="/about">About</a>
            <a className="ab-nav__link" href="/events">Events</a>
            <a className="ab-nav__cta" href="/login">Get Started</a>
          </div>
          <button className="ab-nav__menu-btn" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="ab-nav__mobile">
          <a href="/" onClick={() => setMenuOpen(false)} className="ab-nav__mob-link">Home</a>
          <a href="/products" onClick={() => setMenuOpen(false)} className="ab-nav__mob-link">Products</a>
          <a href="/about" onClick={() => setMenuOpen(false)} className="ab-nav__mob-link ab-nav__mob-link--active">About</a>
          <a href="/events" onClick={() => setMenuOpen(false)} className="ab-nav__mob-link">Events</a>
          <a href="/login" onClick={() => setMenuOpen(false)} className="ab-nav__mob-cta">Get Started</a>
        </div>
      )}
    </>
  );
}

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("revealed"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Counter animation ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(ease * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const PILLARS = [
  { icon: "school", title: "Learn Real Skills", desc: "Industry-relevant training on tools actually used in the workplace — not outdated theory." },
  { icon: "engineering", title: "Work on Live Projects", desc: "Get hands-on experience through real client and internal projects from day one." },
  { icon: "payments", title: "Earn While You Build", desc: "Performance-based earning opportunities as your skills and contributions grow." },
  { icon: "trending_up", title: "Grow Your Career", desc: "Clear pathways, mentorship, and company placements — not confusion and dead ends." },
];

const PROBLEMS = [
  { problem: "Students learn concepts but lack real experience", solution: "Careers are built through doing real work, not just completing courses" },
  { problem: "Struggling to build a meaningful portfolio", solution: "Strong portfolios backed by real proof of work — client projects, not dummy apps" },
  { problem: "Want to earn, but lack credible opportunities", solution: "Structured earning based on your actual contribution and skill level" },
  { problem: "Feeling unprepared despite having a degree", solution: "Preparation for real professional environments, not just exam rooms" },
];

const JOURNEY_STEPS = [
  { num: "01", icon: "menu_book", label: "Learn", desc: "Structured training on real tools, workflows, and industry standards." },
  { num: "02", icon: "bolt", label: "Apply", desc: "Complete tasks and internal projects to prove your readiness." },
  { num: "03", icon: "groups", label: "Work", desc: "Join live projects and contribute as a real team member." },
  { num: "04", icon: "currency_rupee", label: "Earn", desc: "Get paid based on skill level, work quality, and responsibility." },
  { num: "05", icon: "rocket_launch", label: "Grow", desc: "Build your portfolio, gain experience, and unlock advanced opportunities." },
];

const TOOLS = [
  {
    tag: "AI Tool",
    name: "Path Analyzer",
    icon: "route",
    desc: "Analyze your academic standing and get a calculated roadmap to your dream job — powered by thousands of real job descriptions.",
    features: ["Skill Gap Analysis", "Market Trend Matching", "Course Suggestions"],
    href: "/analyzer",
    color: "#0051d5",
  },
  {
    tag: "AI Tool",
    name: "Career Analyzer",
    icon: "analytics",
    desc: "Confused about which tech role fits you? Our logic-based assessment maps your interests and aptitude to the perfect career track.",
    features: ["Interest Mapping", "Aptitude Scoring", "6-Month Roadmap"],
    href: "/career-analyzer",
    color: "#059669",
  },
];

const VALUES = [
  { icon: "verified", title: "Radical Transparency", desc: "No false promises. We tell students exactly what to expect — including that earnings depend on skill and effort." },
  { icon: "handshake", title: "Student-First Always", desc: "Every decision we make puts the student's real growth ahead of vanity metrics or easy marketing." },
  { icon: "workspace_premium", title: "Proof Over Certificates", desc: "We believe your work should speak louder than your degree. Real projects, real proof." },
  { icon: "diversity_3", title: "Community & Mentorship", desc: "A growing ecosystem of learners, mentors, and employers who genuinely care about your success." },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const heroRef = useReveal();
  const missionRef = useReveal();
  const problemRef = useReveal();
  const journeyRef = useReveal();
  const toolsRef = useReveal();
  const valuesRef = useReveal();

  return (
    <>
      <FontLoader />
      <style>{CSS}</style>
      <Navbar />

      <main className="ab-main">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="ab-hero">
          <div className="ab-hero__bg-grid" aria-hidden="true" />
          <div className="ab-hero__blob ab-hero__blob--1" aria-hidden="true" />
          <div className="ab-hero__blob ab-hero__blob--2" aria-hidden="true" />

          <div className="ab-hero__inner reveal-el" ref={heroRef}>
            <div className="ab-hero__eyebrow">
              <span className="material-symbols-outlined">auto_awesome</span>
              About Diverse Loopers
            </div>

            <h1 className="ab-hero__title">
              We Build<br />
              <span className="ab-hero__title-grad">Career-Ready</span><br />
              Professionals.
            </h1>

            <p className="ab-hero__sub">
              Not just another e-learning platform. Diverse Loopers is a structured
              learn-work-earn ecosystem built to close the gap between college
              education and industry reality — permanently.
            </p>

            <div className="ab-hero__stats">
              {[
                { val: 500, suffix: "+", label: "Students Trained" },
                { val: 50, suffix: "+", label: "Live Projects" },
                { val: 5, suffix: "", label: "Tech Tracks" },
                { val: 100, suffix: "%", label: "Proof-Based Learning" },
              ].map((s) => (
                <div key={s.label} className="ab-hero__stat">
                  <div className="ab-hero__stat-num">
                    <AnimatedCounter target={s.val} suffix={s.suffix} />
                  </div>
                  <div className="ab-hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION ──────────────────────────────────────────────────── */}
        <section className="ab-mission reveal-el" ref={missionRef}>
          <div className="ab-container">
            <div className="ab-mission__inner">
              <div className="ab-mission__left">
                <div className="ab-section-tag">Our Mission</div>
                <h2 className="ab-h2">More Than<br />Just a Platform</h2>
                <p className="ab-body">
                  Diverse Loopers was built to solve a critical problem: the gap between
                  academic theory and industry reality. We help students move beyond
                  textbooks by combining practical skill training, real industry projects,
                  and earning opportunities into one structured journey.
                </p>
                <blockquote className="ab-mission__quote">
                  "So you don't just learn — you apply, earn, and grow."
                </blockquote>
              </div>
              <div className="ab-mission__pillars">
                {PILLARS.map((p, i) => (
                  <div key={p.title} className="ab-pillar" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="ab-pillar__icon">
                      <span className="material-symbols-outlined">{p.icon}</span>
                    </div>
                    <div>
                      <h4 className="ab-pillar__title">{p.title}</h4>
                      <p className="ab-pillar__desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY WE EXIST (problem/solution) ──────────────────────────── */}
        <section className="ab-problem reveal-el" ref={problemRef}>
          <div className="ab-container">
            <div className="ab-section-tag ab-section-tag--light">Why We Exist</div>
            <h2 className="ab-h2 ab-h2--center ab-h2--light">We Saw The Pattern.<br />We Built The Solution.</h2>
            <p className="ab-body ab-body--center ab-body--light">
              Every student faces the same walls. We tore them down.
            </p>

            <div className="ab-problem__grid">
              {PROBLEMS.map((item, i) => (
                <div key={i} className="ab-problem__card">
                  <div className="ab-problem__left">
                    <div className="ab-problem__tag">
                      <span className="material-symbols-outlined">report_problem</span>
                      Problem
                    </div>
                    <p className="ab-problem__text">{item.problem}</p>
                  </div>
                  <div className="ab-problem__arrow">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </div>
                  <div className="ab-problem__right">
                    <div className="ab-problem__tag ab-problem__tag--green">
                      <span className="material-symbols-outlined">check_circle</span>
                      Solution
                    </div>
                    <p className="ab-problem__text ab-problem__text--green">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HYBRID HUSTLE JOURNEY ─────────────────────────────────────── */}
        <section className="ab-journey reveal-el" ref={journeyRef}>
          <div className="ab-container">
            <div className="ab-section-tag">The Pathway</div>
            <h2 className="ab-h2">The Hybrid Hustle</h2>
            <p className="ab-body ab-body--max">
              Our structured learn-work-earn pathway. It's not a shortcut — it's how
              real careers are built.
            </p>

            <div className="ab-journey__steps">
              {JOURNEY_STEPS.map((step, i) => (
                <div key={step.num} className="ab-step" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="ab-step__num">{step.num}</div>
                  <div className="ab-step__icon">
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                  <h4 className="ab-step__label">{step.label}</h4>
                  <p className="ab-step__desc">{step.desc}</p>
                  {i < JOURNEY_STEPS.length - 1 && (
                    <div className="ab-step__connector" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            {/* Transparency note */}
            <div className="ab-transparency">
              <div className="ab-transparency__icon">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div>
                <h4 className="ab-transparency__title">Transparency Matters</h4>
                <p className="ab-transparency__body">
                  We are clear and honest with every student. No guaranteed income.
                  No fixed salary for everyone. Earnings depend on skills, performance,
                  and project availability. This prepares students for real professional
                  expectations — not false promises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI TOOLS ─────────────────────────────────────────────────── */}
        <section className="ab-tools reveal-el" ref={toolsRef}>
          <div className="ab-container">
            <div className="ab-section-tag">Built for You</div>
            <h2 className="ab-h2">Our AI-Powered Tools</h2>
            <p className="ab-body ab-body--max">
              We built custom tools that give students data-backed clarity — not
              generic advice.
            </p>

            <div className="ab-tools__grid">
              {TOOLS.map((tool) => (
                <div key={tool.name} className="ab-tool-card">
                  <div className="ab-tool-card__tag">{tool.tag}</div>
                  <div className="ab-tool-card__icon" style={{ background: `${tool.color}18`, color: tool.color }}>
                    <span className="material-symbols-outlined">{tool.icon}</span>
                  </div>
                  <h3 className="ab-tool-card__name">{tool.name}</h3>
                  <p className="ab-tool-card__desc">{tool.desc}</p>
                  <ul className="ab-tool-card__features">
                    {tool.features.map((f) => (
                      <li key={f}>
                        <span className="material-symbols-outlined" style={{ color: tool.color }}>check_circle</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href={tool.href} className="ab-tool-card__cta" style={{ background: tool.color }}>
                    Launch Tool
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ───────────────────────────────────────────────────── */}
        <section className="ab-values reveal-el" ref={valuesRef}>
          <div className="ab-container">
            <div className="ab-section-tag ab-section-tag--light">What We Stand For</div>
            <h2 className="ab-h2 ab-h2--light">Our Values</h2>
            <div className="ab-values__grid">
              {VALUES.map((v, i) => (
                <div key={v.title} className="ab-value-card" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="ab-value-card__icon">
                    <span className="material-symbols-outlined">{v.icon}</span>
                  </div>
                  <h4 className="ab-value-card__title">{v.title}</h4>
                  <p className="ab-value-card__desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────────────── */}
        <section className="ab-cta">
          <div className="ab-container">
            <div className="ab-cta__inner">
              <div className="ab-cta__blob" aria-hidden="true" />
              <div className="ab-cta__content">
                <h2 className="ab-cta__title">Ready to Build<br />Your Real Career?</h2>
                <p className="ab-cta__sub">
                  Join hundreds of students who chose real experience over empty theory.
                </p>
                <div className="ab-cta__actions">
                  <a href="/login" className="ab-cta__btn ab-cta__btn--primary">
                    Join the Hybrid Hustle
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </a>
                  <a href="/analyzer" className="ab-cta__btn ab-cta__btn--ghost">
                    Try Path Analyzer
                    <span className="material-symbols-outlined">route</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  :root {
    --blue: #0051d5;
    --green: #059669;
    --dark: #0a0f1e;
    --dark2: #111827;
    --surface: #f7f9fd;
    --white: #ffffff;
    --text: #1e293b;
    --muted: #64748b;
    --border: rgba(15,23,42,0.08);
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --nav-h: 72px;
    --max: 1200px;
    --radius: 1.5rem;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; }

  .ab-main { font-family: var(--font-body); padding-top: var(--nav-h); }

  /* Reveal */
  .reveal-el { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .reveal-el.revealed { opacity: 1; transform: none; }

  /* Containers */
  .ab-container { max-width: var(--max); margin: 0 auto; padding: 0 1.5rem; }
  .ab-section-tag {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: var(--font-display); font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--blue); background: rgba(0,81,213,0.08);
    padding: 0.35rem 0.9rem; border-radius: 999px; margin-bottom: 1rem;
  }
  .ab-section-tag--light { color: #93c5fd; background: rgba(147,197,253,0.12); }
  .ab-h2 {
    font-family: var(--font-display); font-size: clamp(2rem,4vw,3rem);
    font-weight: 800; color: var(--text); line-height: 1.1;
    letter-spacing: -0.03em; margin-bottom: 1rem;
  }
  .ab-h2--center { text-align: center; }
  .ab-h2--light { color: #fff; }
  .ab-body { font-size: 1.05rem; color: var(--muted); line-height: 1.8; margin-bottom: 1rem; }
  .ab-body--center { text-align: center; }
  .ab-body--max { max-width: 560px; }
  .ab-body--light { color: #94a3b8; }

  /* ── NAVBAR ── */
  .ab-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    height: var(--nav-h);
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s;
  }
  .ab-nav--scrolled { box-shadow: 0 4px 24px -4px rgba(15,23,42,0.10); }
  .ab-nav__inner {
    max-width: var(--max); margin: 0 auto; height: 100%;
    padding: 0 1.5rem; display: flex; align-items: center; justify-content: space-between;
  }
  .ab-nav__logo { display: flex; align-items: center; text-decoration: none; }
  .ab-nav__logo-img { height: 40px; width: auto; object-fit: contain; }
  .ab-nav__links { display: flex; align-items: center; gap: 2rem; }
  .ab-nav__link {
    font-family: var(--font-body); font-size: 0.9rem; font-weight: 500;
    color: var(--muted); text-decoration: none; transition: color 0.2s;
  }
  .ab-nav__link:hover { color: var(--text); }
  .ab-nav__link--active { color: var(--blue); font-weight: 600; }
  .ab-nav__cta {
    padding: 0.55rem 1.4rem; border-radius: 999px;
    background: var(--blue); color: #fff;
    font-family: var(--font-display); font-size: 0.85rem; font-weight: 700;
    text-decoration: none; transition: background 0.2s, transform 0.2s;
  }
  .ab-nav__cta:hover { background: #1d4ed8; transform: translateY(-1px); }
  .ab-nav__menu-btn {
    display: none; background: none; border: none; cursor: pointer; padding: 0.4rem;
    color: var(--text);
  }
  .ab-nav__menu-btn .material-symbols-outlined { font-size: 26px; }
  .ab-nav__mobile {
    position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 99;
    background: rgba(255,255,255,0.98); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; flex-direction: column;
    padding: 1.25rem 1.5rem 1.75rem; gap: 0.25rem;
    box-shadow: 0 8px 24px -4px rgba(15,23,42,0.10);
  }
  .ab-nav__mob-link {
    font-size: 0.95rem; font-weight: 500; color: var(--muted);
    text-decoration: none; padding: 0.7rem 0.5rem; border-radius: 0.5rem;
    transition: color 0.2s, background 0.2s;
  }
  .ab-nav__mob-link:hover { color: var(--text); background: var(--surface); }
  .ab-nav__mob-link--active { color: var(--blue); font-weight: 600; }
  .ab-nav__mob-cta {
    margin-top: 0.75rem; padding: 0.75rem 1.5rem; border-radius: 999px;
    background: var(--blue); color: #fff; font-weight: 700; font-size: 0.875rem;
    text-decoration: none; text-align: center;
  }
  @media (max-width: 767px) {
    .ab-nav__links { display: none; }
    .ab-nav__menu-btn { display: block; }
  }

  /* ── HERO ── */
  .ab-hero {
    position: relative; overflow: hidden;
    background: var(--dark);
    padding: 7rem 1.5rem 6rem;
    min-height: 90vh; display: flex; align-items: center;
  }
  .ab-hero__bg-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .ab-hero__blob {
    position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none;
  }
  .ab-hero__blob--1 {
    width: 500px; height: 500px; top: -100px; right: -100px;
    background: rgba(0,81,213,0.18);
  }
  .ab-hero__blob--2 {
    width: 400px; height: 400px; bottom: -80px; left: -80px;
    background: rgba(5,150,105,0.14);
  }
  .ab-hero__inner {
    position: relative; z-index: 1;
    max-width: var(--max); margin: 0 auto; width: 100%;
  }
  .ab-hero__eyebrow {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: var(--font-display); font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #93c5fd; background: rgba(147,197,253,0.12);
    border: 1px solid rgba(147,197,253,0.2);
    padding: 0.4rem 1rem; border-radius: 999px; margin-bottom: 2rem;
  }
  .ab-hero__eyebrow .material-symbols-outlined { font-size: 14px; }
  .ab-hero__title {
    font-family: var(--font-display); font-size: clamp(3rem,7vw,5.5rem);
    font-weight: 800; color: #fff; line-height: 1.0;
    letter-spacing: -0.04em; margin-bottom: 1.5rem;
  }
  .ab-hero__title-grad {
    background: linear-gradient(135deg, #60a5fa, #34d399);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .ab-hero__sub {
    font-size: 1.15rem; color: #94a3b8; line-height: 1.8;
    max-width: 600px; margin-bottom: 3.5rem;
  }
  .ab-hero__stats {
    display: flex; flex-wrap: wrap; gap: 2rem;
    padding-top: 2.5rem; border-top: 1px solid rgba(255,255,255,0.08);
  }
  .ab-hero__stat-num {
    font-family: var(--font-display); font-size: 2.25rem; font-weight: 800;
    color: #fff; line-height: 1;
  }
  .ab-hero__stat-label {
    font-size: 0.8rem; color: #64748b; font-weight: 500; margin-top: 0.3rem;
    text-transform: uppercase; letter-spacing: 0.08em;
  }

  /* ── MISSION ── */
  .ab-mission { padding: 7rem 0; background: var(--white); }
  .ab-mission__inner {
    display: grid; grid-template-columns: 1fr; gap: 4rem; align-items: start;
  }
  @media (min-width: 1024px) {
    .ab-mission__inner { grid-template-columns: 1fr 1fr; gap: 6rem; }
  }
  .ab-mission__quote {
    font-family: var(--font-display); font-size: 1.2rem; font-weight: 600;
    color: var(--blue); border-left: 3px solid var(--blue);
    padding: 0.75rem 1.25rem; margin-top: 1.5rem;
    background: rgba(0,81,213,0.04); border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
  }
  .ab-mission__pillars { display: flex; flex-direction: column; gap: 1.5rem; }
  .ab-pillar {
    display: flex; align-items: flex-start; gap: 1.25rem;
    padding: 1.5rem; border-radius: 1rem;
    border: 1.5px solid var(--border); background: var(--surface);
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  }
  .ab-pillar:hover {
    border-color: rgba(0,81,213,0.2); transform: translateX(4px);
    box-shadow: 0 4px 20px -4px rgba(0,81,213,0.10);
  }
  .ab-pillar__icon {
    width: 48px; height: 48px; border-radius: 0.875rem; flex-shrink: 0;
    background: rgba(0,81,213,0.08); color: var(--blue);
    display: flex; align-items: center; justify-content: center;
  }
  .ab-pillar__icon .material-symbols-outlined { font-size: 22px; }
  .ab-pillar__title {
    font-family: var(--font-display); font-size: 1rem; font-weight: 700;
    color: var(--text); margin-bottom: 0.3rem;
  }
  .ab-pillar__desc { font-size: 0.88rem; color: var(--muted); line-height: 1.65; }

  /* ── PROBLEM ── */
  .ab-problem { padding: 7rem 0; background: var(--dark); }
  .ab-problem__grid { display: flex; flex-direction: column; gap: 1rem; margin-top: 3rem; }
  .ab-problem__card {
    display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1.5rem;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 1.25rem; padding: 1.75rem 2rem;
    transition: background 0.25s;
  }
  .ab-problem__card:hover { background: rgba(255,255,255,0.07); }
  .ab-problem__tag {
    display: inline-flex; align-items: center; gap: 0.35rem;
    font-family: var(--font-display); font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #f87171; background: rgba(248,113,113,0.12);
    padding: 0.28rem 0.7rem; border-radius: 999px; margin-bottom: 0.6rem;
  }
  .ab-problem__tag--green { color: #34d399; background: rgba(52,211,153,0.12); }
  .ab-problem__tag .material-symbols-outlined,
  .ab-problem__tag--green .material-symbols-outlined { font-size: 13px; }
  .ab-problem__text { font-size: 0.95rem; color: #cbd5e1; line-height: 1.6; }
  .ab-problem__text--green { color: #a7f3d0; }
  .ab-problem__arrow {
    color: rgba(255,255,255,0.3);
    display: flex; align-items: center; justify-content: center;
  }
  .ab-problem__arrow .material-symbols-outlined { font-size: 22px; }
  @media (max-width: 639px) {
    .ab-problem__card { grid-template-columns: 1fr; }
    .ab-problem__arrow { display: none; }
  }

  /* ── JOURNEY ── */
  .ab-journey { padding: 7rem 0; background: var(--white); }
  .ab-journey__steps {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 0; margin-top: 3.5rem; position: relative;
  }
  .ab-step {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: 2rem 1.5rem; position: relative;
  }
  .ab-step__num {
    font-family: var(--font-display); font-size: 0.65rem; font-weight: 800;
    letter-spacing: 0.16em; color: var(--blue); margin-bottom: 1rem;
    background: rgba(0,81,213,0.08); padding: 0.25rem 0.6rem; border-radius: 999px;
  }
  .ab-step__icon {
    width: 60px; height: 60px; border-radius: 50%;
    background: var(--dark); color: #fff;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem; box-shadow: 0 8px 24px -4px rgba(10,15,30,0.25);
    transition: transform 0.3s;
  }
  .ab-step:hover .ab-step__icon { transform: scale(1.1); }
  .ab-step__icon .material-symbols-outlined { font-size: 26px; }
  .ab-step__label {
    font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;
    color: var(--text); margin-bottom: 0.5rem;
  }
  .ab-step__desc { font-size: 0.85rem; color: var(--muted); line-height: 1.65; }
  .ab-step__connector {
    position: absolute; top: 72px; right: -24px;
    width: 48px; height: 2px;
    background: linear-gradient(90deg, var(--border), rgba(0,81,213,0.3));
    z-index: 1;
  }
  @media (max-width: 767px) { .ab-step__connector { display: none; } }

  .ab-transparency {
    display: flex; align-items: flex-start; gap: 1.5rem;
    background: #fffbeb; border: 1.5px solid #fde68a;
    border-radius: 1.25rem; padding: 2rem; margin-top: 3rem;
  }
  .ab-transparency__icon {
    width: 48px; height: 48px; border-radius: 0.875rem; flex-shrink: 0;
    background: #fef3c7; color: #d97706;
    display: flex; align-items: center; justify-content: center;
  }
  .ab-transparency__icon .material-symbols-outlined { font-size: 22px; }
  .ab-transparency__title {
    font-family: var(--font-display); font-size: 1rem; font-weight: 700;
    color: #92400e; margin-bottom: 0.4rem;
  }
  .ab-transparency__body { font-size: 0.9rem; color: #78350f; line-height: 1.7; }

  /* ── TOOLS ── */
  .ab-tools { padding: 7rem 0; background: var(--surface); }
  .ab-tools__grid {
    display: grid; grid-template-columns: 1fr; gap: 2rem; margin-top: 3rem;
  }
  @media (min-width: 768px) { .ab-tools__grid { grid-template-columns: 1fr 1fr; } }
  .ab-tool-card {
    background: var(--white); border: 1.5px solid var(--border);
    border-radius: var(--radius); padding: 2.5rem;
    transition: box-shadow 0.3s, border-color 0.3s, transform 0.3s;
  }
  .ab-tool-card:hover {
    box-shadow: 0 20px 40px -8px rgba(15,23,42,0.12);
    transform: translateY(-4px);
  }
  .ab-tool-card__tag {
    font-family: var(--font-display); font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--muted); margin-bottom: 1.25rem; display: block;
  }
  .ab-tool-card__icon {
    width: 56px; height: 56px; border-radius: 1rem;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.25rem;
  }
  .ab-tool-card__icon .material-symbols-outlined { font-size: 26px; }
  .ab-tool-card__name {
    font-family: var(--font-display); font-size: 1.5rem; font-weight: 800;
    color: var(--text); margin-bottom: 0.75rem;
  }
  .ab-tool-card__desc { font-size: 0.95rem; color: var(--muted); line-height: 1.75; margin-bottom: 1.5rem; }
  .ab-tool-card__features { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
  .ab-tool-card__features li {
    display: flex; align-items: center; gap: 0.6rem;
    font-size: 0.9rem; color: var(--text); font-weight: 500;
  }
  .ab-tool-card__features .material-symbols-outlined { font-size: 18px; }
  .ab-tool-card__cta {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.85rem 1.75rem; border-radius: 0.875rem;
    color: #fff; font-family: var(--font-display); font-size: 0.875rem; font-weight: 700;
    text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .ab-tool-card__cta:hover { opacity: 0.88; transform: translateY(-2px); }
  .ab-tool-card__cta .material-symbols-outlined { font-size: 16px; }

  /* ── VALUES ── */
  .ab-values { padding: 7rem 0; background: var(--dark2); }
  .ab-values__grid {
    display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-top: 3rem;
  }
  @media (min-width: 640px) { .ab-values__grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 1024px) { .ab-values__grid { grid-template-columns: repeat(4,1fr); } }
  .ab-value-card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 1.25rem; padding: 2rem;
    transition: background 0.25s, border-color 0.25s, transform 0.25s;
  }
  .ab-value-card:hover {
    background: rgba(255,255,255,0.08); border-color: rgba(96,165,250,0.25);
    transform: translateY(-4px);
  }
  .ab-value-card__icon {
    width: 48px; height: 48px; border-radius: 0.875rem;
    background: rgba(96,165,250,0.12); color: #60a5fa;
    display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;
  }
  .ab-value-card__icon .material-symbols-outlined { font-size: 22px; }
  .ab-value-card__title {
    font-family: var(--font-display); font-size: 1rem; font-weight: 700;
    color: #fff; margin-bottom: 0.5rem;
  }
  .ab-value-card__desc { font-size: 0.875rem; color: #64748b; line-height: 1.7; }

  /* ── CTA ── */
  .ab-cta { padding: 7rem 0; background: var(--white); }
  .ab-cta__inner {
    position: relative; overflow: hidden;
    background: var(--dark); border-radius: 2rem;
    padding: 5rem 3rem; text-align: center;
  }
  .ab-cta__blob {
    position: absolute; top: -80px; right: -80px;
    width: 360px; height: 360px; border-radius: 50%;
    background: rgba(0,81,213,0.25); filter: blur(80px); pointer-events: none;
  }
  .ab-cta__content { position: relative; z-index: 1; }
  .ab-cta__title {
    font-family: var(--font-display); font-size: clamp(2rem,4vw,3rem);
    font-weight: 800; color: #fff; line-height: 1.1;
    letter-spacing: -0.03em; margin-bottom: 1rem;
  }
  .ab-cta__sub { font-size: 1.05rem; color: #94a3b8; margin-bottom: 2.5rem; }
  .ab-cta__actions { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; }
  .ab-cta__btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 1rem 2rem; border-radius: 999px;
    font-family: var(--font-display); font-size: 0.95rem; font-weight: 700;
    text-decoration: none; transition: transform 0.2s, opacity 0.2s;
  }
  .ab-cta__btn:hover { transform: translateY(-2px); opacity: 0.9; }
  .ab-cta__btn .material-symbols-outlined { font-size: 18px; }
  .ab-cta__btn--primary { background: var(--blue); color: #fff; }
  .ab-cta__btn--ghost {
    background: rgba(255,255,255,0.08); color: #fff;
    border: 1px solid rgba(255,255,255,0.15);
  }
`;