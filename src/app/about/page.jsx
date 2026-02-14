'use client';

import { useState, useEffect } from 'react';
import './about.css';
import Script from 'next/script';
import { initThreeJsAnimation, initScrollReveal, registerHybridHustler } from '@/lib/pages/about';

export default function AboutPage() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [formMessage, setFormMessage] = useState({ text: '', color: '' });

    useEffect(() => {
        // Initialize Three.js animation
        const cleanupThree = initThreeJsAnimation();

        // Initialize scroll reveal
        const cleanupScroll = initScrollReveal();

        // Cleanup on unmount
        return () => {
            if (cleanupThree) cleanupThree();
            if (cleanupScroll) cleanupScroll();
        };
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormMessage({ text: '', color: '' });

        if (!e.target.checkValidity()) {
            setFormMessage({
                text: 'Please fill out all required fields correctly.',
                color: '#ef4444'
            });
            return;
        }

        setFormMessage({
            text: 'Registering...',
            color: 'var(--primary)'
        });

        const formData = new FormData(e.target);
        const result = await registerHybridHustler(formData);

        setFormMessage({
            text: result.message,
            color: result.success ? 'var(--primary)' : '#ef4444'
        });

        if (result.success) {
            e.target.reset();
        }
    };

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;600&display=swap"
                rel="stylesheet"
            />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            
            
            <Script 
                src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" 
                strategy="beforeInteractive"
            />

            <div className="antialiased selection:bg-indigo-500 selection:text-white">
                {/* 3D Background Canvas */}
                <div id="canvas-container"></div>

                {/* Navigation */}
                <nav className="fixed w-full z-50 transition-all duration-300 glass-panel border-b-0" id="navbar">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-20">
                            {/* Logo Section */}
                            <div className="flex-shrink-0 cursor-pointer flex items-center gap-3" onClick={() => window.scrollTo(0, 0)}>
                                <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers Logo" className="h-10 w-10 object-contain" />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-8">
                                    <a href="#mission" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Mission</a>
                                    <a href="#hybrid-hustle" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Hybrid Hustle</a>
                                    <a href="#join-hustle" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Register</a>
                                    <a href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                                    <a href="/#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact Us</a>
                                    <a href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30">
                                        Login
                                    </a>
                                </div>
                            </div>
                            {/* Mobile menu button */}
                            <div className="-mr-2 flex md:hidden">
                                <button 
                                    type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <i className="fas fa-bars text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Menu */}
                    {showMobileMenu && (
                        <div className="md:hidden glass-panel">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <a href="#mission" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Mission</a>
                                <a href="#hybrid-hustle" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Hybrid Hustle</a>
                                <a href="#join-hustle" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</a>
                                <a href="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
                                <a href="/#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
                                <a href="/" className="text-indigo-400 font-bold block px-3 py-2 rounded-md text-base">Visit Main Site</a>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 mb-8 backdrop-blur-sm reveal active">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                            Student-First Tech & Career Platform
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 reveal active" style={{ transitionDelay: '100ms' }}>
                            Learn Skills. <br />
                            <span className="text-gradient">Do Real Work.</span> <br />
                            Earn & Grow.
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 reveal active" style={{ transitionDelay: '200ms' }}>
                            Bridging the gap between college education and real-world careers. Move beyond theory into practical application.
                        </p>
                        <div className="mt-10 flex justify-center gap-4 reveal active" style={{ transitionDelay: '300ms' }}>
                            <a href="#mission" className="px-8 py-3.5 rounded-lg bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                Our Mission
                            </a>
                            <a href="#join-hustle" className="px-8 py-3.5 rounded-lg border border-gray-600 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm">
                                Join the Hustle
                            </a>
                        </div>
                    </div>
                </header>

                {/* Mission & Intro Section */}
                <section id="mission" className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="reveal">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">More Than Just a Platform</h2>
                                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                    Diverse Loopers is built to solve a critical problem: the gap between academic theory and industry reality. We help students move beyond textbooks by combining practical skill training, real industry projects, and earning opportunities into one structured journey.
                                </p>
                                <div className="glass-panel p-6 rounded-xl border-l-4 border-indigo-500">
                                    <p className="text-xl font-medium text-white italic">
                                        "So you don't just learn, you apply, earn, and grow."
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal">
                                <div className="glass-card p-6 rounded-xl">
                                    <i className="fas fa-laptop-code text-4xl text-indigo-400 mb-4"></i>
                                    <h3 className="text-xl font-bold mb-2">Real Skills</h3>
                                    <p className="text-gray-400 text-sm">Industry-relevant training focused on tools used in the workplace.</p>
                                </div>
                                <div className="glass-card p-6 rounded-xl">
                                    <i className="fas fa-briefcase text-4xl text-purple-400 mb-4"></i>
                                    <h3 className="text-xl font-bold mb-2">Live Projects</h3>
                                    <p className="text-gray-400 text-sm">Hands-on experience through real client and internal projects.</p>
                                </div>
                                <div className="glass-card p-6 rounded-xl">
                                    <i className="fas fa-wallet text-4xl text-teal-400 mb-4"></i>
                                    <h3 className="text-xl font-bold mb-2">Earn</h3>
                                    <p className="text-gray-400 text-sm">Performance-based earning opportunities as you grow.</p>
                                </div>
                                <div className="glass-card p-6 rounded-xl">
                                    <i className="fas fa-rocket text-4xl text-pink-400 mb-4"></i>
                                    <h3 className="text-xl font-bold mb-2">Career Growth</h3>
                                    <p className="text-gray-400 text-sm">Clear pathways instead of confusion. Build a real portfolio.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why We Exist Section */}
                <section className="py-20 bg-black/20 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 reveal">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Diverse Loopers Exists</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                We saw a pattern of challenges students face today, and we decided to build the solution.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i className="fas fa-book-open text-6xl"></i>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
                                    <p className="text-gray-300 text-sm">Students learn concepts but lack real experience.</p>
                                    <div className="my-4 h-px bg-gray-700"></div>
                                    <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
                                    <p className="text-gray-300 text-sm">Careers are built through doing real work, not just courses.</p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal" style={{ transitionDelay: '100ms' }}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i className="fas fa-folder-open text-6xl"></i>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
                                    <p className="text-gray-300 text-sm">Struggling to build meaningful portfolios.</p>
                                    <div className="my-4 h-px bg-gray-700"></div>
                                    <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
                                    <p className="text-gray-300 text-sm">Strong portfolios backed by real proof of work.</p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal" style={{ transitionDelay: '200ms' }}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i className="fas fa-hand-holding-dollar text-6xl"></i>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
                                    <p className="text-gray-300 text-sm">Want to earn, but lack credible opportunities.</p>
                                    <div className="my-4 h-px bg-gray-700"></div>
                                    <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
                                    <p className="text-gray-300 text-sm">Structured earning based on contribution and skill.</p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal" style={{ transitionDelay: '300ms' }}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i className="fas fa-graduation-cap text-6xl"></i>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-3 text-red-400">The Problem</h3>
                                    <p className="text-gray-300 text-sm">Feeling unprepared despite having degrees.</p>
                                    <div className="my-4 h-px bg-gray-700"></div>
                                    <h3 className="text-xl font-bold mb-3 text-green-400">Our Solution</h3>
                                    <p className="text-gray-300 text-sm">Preparation for real professional environments.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hybrid Hustle Section (Timeline) */}
                <section id="hybrid-hustle" className="py-24 relative z-10 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                        <div className="text-center mb-16 reveal">
                            <span className="text-indigo-400 font-bold tracking-widest uppercase text-sm">The Pathway</span>
                            <h2 className="text-4xl md:text-6xl font-bold mt-2 mb-6">
                                Hybrid <span className="text-gradient-accent">Hustle</span>
                            </h2>
                            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
                                Our structured "learn-work-earn" pathway. It's not a shortcut, it's how real careers are built.
                            </p>
                        </div>

                        <div id="journey" className="relative mt-20">
                            <div className="hidden md:block journey-line"></div>

                            <div className="space-y-12 md:space-y-24">
                                {/* Step 1 */}
                                <div className="relative flex flex-col md:flex-row items-center reveal">
                                    <div className="flex-1 text-center md:text-right md:pr-12 order-2 md:order-1 mt-6 md:mt-0">
                                        <h3 className="text-2xl font-bold text-white">1. Learn</h3>
                                        <p className="text-gray-400 mt-2">
                                            Start with structured training focused on tools, workflows, and industry standards.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_var(--primary)]">
                                        1
                                    </div>
                                    <div className="flex-1 md:pl-12 order-3"></div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex flex-col md:flex-row items-center reveal">
                                    <div className="flex-1 md:pr-12 order-3 md:order-1"></div>
                                    <div className="w-12 h-12 rounded-full bg-purple-600 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_var(--secondary)]">
                                        2
                                    </div>
                                    <div className="flex-1 text-center md:text-left md:pl-12 order-2 md:order-3 mt-6 md:mt-0">
                                        <h3 className="text-2xl font-bold text-white">2. Apply</h3>
                                        <p className="text-gray-400 mt-2">
                                            Complete tasks and internal projects to prove your readiness.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="relative flex flex-col md:flex-row items-center reveal">
                                    <div className="flex-1 text-center md:text-right md:pr-12 order-2 md:order-1 mt-6 md:mt-0">
                                        <h3 className="text-2xl font-bold text-white">3. Work</h3>
                                        <p className="text-gray-400 mt-2">
                                            Join live projects and contribute as a real team member.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-teal-500 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_var(--accent)]">
                                        3
                                    </div>
                                    <div className="flex-1 md:pl-12 order-3"></div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative flex flex-col md:flex-row items-center reveal">
                                    <div className="flex-1 md:pr-12 order-3 md:order-1"></div>
                                    <div className="w-12 h-12 rounded-full bg-pink-500 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_#ec4899]">
                                        4
                                    </div>
                                    <div className="flex-1 text-center md:text-left md:pl-12 order-2 md:order-3 mt-6 md:mt-0">
                                        <h3 className="text-2xl font-bold text-white">4. Earn</h3>
                                        <p className="text-gray-400 mt-2">
                                            Get paid based on skill level, work quality, and responsibility.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 5 */}
                                <div className="relative flex flex-col md:flex-row items-center reveal">
                                    <div className="flex-1 text-center md:text-right md:pr-12 order-2 md:order-1 mt-6 md:mt-0">
                                        <h3 className="text-2xl font-bold text-white">5. Grow</h3>
                                        <p className="text-gray-400 mt-2">
                                            Build portfolios, gain experience, and unlock advanced opportunities.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-yellow-500 border-4 border-gray-900 z-10 flex items-center justify-center text-white font-bold order-1 md:order-2 shadow-[0_0_15px_#eab308]">
                                        5
                                    </div>
                                    <div className="flex-1 md:pl-12 order-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Hybrid Hustle Form Section */}
                <section id="join-hustle" className="relative py-24 flex items-center justify-center overflow-hidden min-h-screen">
                    <div className="relative z-10 w-full max-w-4xl px-4">
                        <div className="glass-panel p-8 md:p-12 rounded-2xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.3)] reveal">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                                    Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Hybrid Hustler</span>
                                </h2>
                                <p className="text-gray-300">Join our exclusive network and fast-track your path to tech mastery.</p>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="hustler-name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            id="hustler-name" 
                                            name="name" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hustler-college" className="block text-sm font-medium text-gray-300 mb-2">College Name</label>
                                        <input 
                                            type="text" 
                                            id="hustler-college" 
                                            name="college" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hustler-email" className="block text-sm font-medium text-gray-300 mb-2">Email ID</label>
                                        <input 
                                            type="email" 
                                            id="hustler-email" 
                                            name="email" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hustler-contact" className="block text-sm font-medium text-gray-300 mb-2">Contact Number</label>
                                        <input 
                                            type="tel" 
                                            id="hustler-contact" 
                                            name="contact" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hustler-tech" className="block text-sm font-medium text-gray-300 mb-2">Core Technology</label>
                                        <select 
                                            id="hustler-tech" 
                                            name="tech" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-slate-900">Select Technology</option>
                                            <option value="AI/ML" className="bg-slate-900">AI/ML</option>
                                            <option value="WebDev" className="bg-slate-900">Web Development (Full Stack)</option>
                                            <option value="GameDev" className="bg-slate-900">Game Development</option>
                                            <option value="AndroidDev" className="bg-slate-900">Android Development</option>
                                            <option value="DataScience" className="bg-slate-900">Data Science</option>
                                            <option value="CyberSecurity" className="bg-slate-900">Cyber Security</option>
                                            <option value="Cloud" className="bg-slate-900">Cloud Engineering</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="hustler-year" className="block text-sm font-medium text-gray-300 mb-2">Course Year</label>
                                        <select 
                                            id="hustler-year" 
                                            name="year" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-slate-900">Select Year</option>
                                            <option value="1" className="bg-slate-900">1st Year</option>
                                            <option value="2" className="bg-slate-900">2nd Year</option>
                                            <option value="3" className="bg-slate-900">3rd Year</option>
                                            <option value="4" className="bg-slate-900">4th Year</option>
                                            <option value="Graduate" className="bg-slate-900">Graduate</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="hustler-semester" className="block text-sm font-medium text-gray-300 mb-2">Semester</label>
                                        <input 
                                            type="number" 
                                            id="hustler-semester" 
                                            name="semester" 
                                            min="1" 
                                            max="8" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="hustler-roll" className="block text-sm font-medium text-gray-300 mb-2">Roll No.</label>
                                        <input 
                                            type="text" 
                                            id="hustler-roll" 
                                            name="roll" 
                                            required
                                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button 
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:scale-[1.02] duration-200"
                                    >
                                        Enroll in the Hustle!
                                    </button>
                                </div>
                                {formMessage.text && (
                                    <p 
                                        className="mt-4 text-center font-medium"
                                        style={{ color: formMessage.color }}
                                    >
                                        {formMessage.text}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </section>

                {/* Transparency & Who Is This For */}
                <section className="py-20 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="glass-panel p-8 rounded-2xl reveal">
                                <div className="flex items-center mb-6">
                                    <i className="fas fa-search text-3xl text-indigo-400 mr-4"></i>
                                    <h3 className="text-2xl font-bold">Transparency Matters</h3>
                                </div>
                                <p className="text-gray-300 mb-6">
                                    We are clear and honest with every student. This approach prepares students for real professional expectations, not false promises.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <i className="fas fa-times text-red-500 mt-1 mr-3"></i>
                                        <span className="text-gray-400">No guaranteed income</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-times text-red-500 mt-1 mr-3"></i>
                                        <span className="text-gray-400">No fixed salary for everyone</span>
                                    </li>
                                    <li className="flex items-start">
                                        <i className="fas fa-check text-green-500 mt-1 mr-3"></i>
                                        <span className="text-white">Earnings depend on skills, performance, and project availability</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="glass-panel p-8 rounded-2xl reveal" style={{ transitionDelay: '100ms' }}>
                                <div className="flex items-center mb-6">
                                    <i className="fas fa-users text-3xl text-teal-400 mr-4"></i>
                                    <h3 className="text-2xl font-bold">Who Is This For?</h3>
                                </div>
                                <p className="text-gray-300 mb-6">
                                    Diverse Loopers is not for everyone. It is specifically for students who are serious about their future.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                                        Want real experience, not just certificates
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                                        Are willing to learn by doing
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                                        Want to earn through skill and effort
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                                        Serious about long-term career growth
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Opportunities & Launchpad */}
                <section className="py-20 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold mb-10 reveal">Opportunities Beyond Learning</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
                            <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
                                <i className="fas fa-crown text-3xl text-yellow-500 mb-3"></i>
                                <p className="font-medium">Leadership Roles</p>
                            </div>
                            <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
                                <i className="fas fa-chalkboard-teacher text-3xl text-blue-400 mb-3"></i>
                                <p className="font-medium">Mentorship</p>
                            </div>
                            <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
                                <i className="fas fa-building text-3xl text-purple-400 mb-3"></i>
                                <p className="font-medium">Company Placements</p>
                            </div>
                            <div className="p-4 glass-card rounded-lg hover:bg-white/5 transition-colors">
                                <i className="fas fa-users-cog text-3xl text-red-400 mb-3"></i>
                                <p className="font-medium">Core Team Access</p>
                            </div>
                        </div>
                        <p className="mt-12 text-xl text-gray-300 font-light italic reveal">
                            "For many students, Diverse Loopers becomes more than a platform — it becomes a career launchpad."
                        </p>
                    </div>
                </section>

                {/* Our Tools Section */}
                <section className="py-20 bg-black/20 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16 reveal">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                                Tools By Diverse Loopers For Learners
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                We have created custom tools to enhance the learning experience for our Learners. These tools are designed to provide data-backed suggestions for your future.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-5xl mx-auto">
                            {/* Path Analyzer Card */}
                            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal flex flex-col h-full border border-gray-700/50 hover:border-red-400/30 transition-all duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i className="fas fa-book-open text-8xl text-red-500"></i>
                                </div>

                                <div className="relative z-10 flex-grow">
                                    <h3 className="text-2xl font-bold mb-3 text-red-400">Path Analyzer Tool</h3>
                                    <p className="text-gray-300 text-sm mb-4">
                                        Analyze your current academic standing and get a calculated roadmap to reach your dream job.
                                    </p>

                                    <div className="bg-black/20 rounded-lg p-3 mb-4">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Key Features</h4>
                                        <ul className="text-sm text-gray-400 space-y-1">
                                            <li className="flex items-center"><i className="fas fa-check text-red-500 text-xs mr-2"></i> Skill Gap Analysis</li>
                                            <li className="flex items-center"><i className="fas fa-check text-red-500 text-xs mr-2"></i> Market Trend Matching</li>
                                            <li className="flex items-center"><i className="fas fa-check text-red-500 text-xs mr-2"></i> Course Suggestions</li>
                                        </ul>
                                    </div>

                                    <div className="my-4 h-px bg-gray-700"></div>

                                    <h3 className="text-lg font-bold mb-2 text-green-400">Outcome</h3>
                                    <p className="text-gray-300 text-sm">
                                        A personalized step-by-step learning path tailored to your specific goals.
                                    </p>
                                </div>

                                <div className="relative z-10 mt-6">
                                    <a href="/analyzer" className="w-full block text-center bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(248,113,113,0.3)]">
                                        Launch Path Analyzer <i className="fas fa-arrow-right ml-2"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Career Analyzer Card */}
                            <div className="glass-card p-8 rounded-2xl relative overflow-hidden group reveal flex flex-col h-full border border-gray-700/50 hover:border-indigo-400/30 transition-all duration-300" style={{ transitionDelay: '100ms' }}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <i className="fas fa-graduation-cap text-8xl text-indigo-500"></i>
                                </div>

                                <div className="relative z-10 flex-grow">
                                    <h3 className="text-2xl font-bold mb-3 text-indigo-400">Career Analyzer Tool</h3>
                                    <p className="text-gray-300 text-sm mb-4">
                                        Confused about which tech role fits you? Our logic-based assessment finds your perfect match.
                                    </p>

                                    <div className="bg-black/20 rounded-lg p-3 mb-4">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Key Features</h4>
                                        <ul className="text-sm text-gray-400 space-y-1">
                                            <li className="flex items-center"><i className="fas fa-check text-indigo-500 text-xs mr-2"></i> Interest Mapping</li>
                                            <li className="flex items-center"><i className="fas fa-check text-indigo-500 text-xs mr-2"></i> Aptitude Scoring</li>
                                            <li className="flex items-center"><i className="fas fa-check text-indigo-500 text-xs mr-2"></i> 6-Month Roadmap</li>
                                        </ul>
                                    </div>

                                    <div className="my-4 h-px bg-gray-700"></div>

                                    <h3 className="text-lg font-bold mb-2 text-green-400">Outcome</h3>
                                    <p className="text-gray-300 text-sm">
                                        Discover if you are meant for Backend, Data, Cyber Security, Full Stack or any other tech role.
                                    </p>
                                </div>

                                <div className="relative z-10 mt-6">
                                    <a href="/career-analyzer" className="w-full block text-center bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/50 py-3 rounded-xl font-semibold transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                        Find My Career <i className="fas fa-arrow-right ml-2"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8 relative z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                            <div className="col-span-1 md:col-span-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <img src="/Diverse Loopers Black BG (2).png" alt="Diverse Loopers Logo" className="h-8 w-8 object-contain" />
                                    <span className="text-2xl font-bold brand-font text-white tracking-wider">
                                        Diverse<span className="text-indigo-400">Loopers</span>
                                    </span>
                                </div>
                                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                                    To help students convert skills into experience, experience into earnings, and earnings into sustainable careers.
                                </p>
                            </div>
                            <div className="col-span-1 md:col-span-1">
                                <h4 className="text-white font-bold mb-4">Quick Links</h4>
                                <ul className="space-y-2 text-sm text-gray-400">
                                    <li><a href="#mission" className="hover:text-indigo-400 transition-colors">Mission</a></li>
                                    <li><a href="#hybrid-hustle" className="hover:text-indigo-400 transition-colors">Hybrid Hustle</a></li>
                                    <li><a href="#journey" className="hover:text-indigo-400 transition-colors">The Journey</a></li>
                                </ul>
                            </div>
                            <div className="col-span-1 md:col-span-1">
                                <h4 className="text-white font-bold mb-4">Connect</h4>
                                <p className="text-gray-400 text-sm mb-4">Ready to start your journey? Visit our main platform.</p>
                                <a href="/" target="_blank" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                    Home
                                </a>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                            <p>&copy; 2024 Diverse Loopers. All rights reserved.</p>
                            <p className="mt-2 text-xs">
                                Diverse Loopers is where students learn real skills, work on real projects, earn through performance, and grow into industry-ready professionals.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}