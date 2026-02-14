'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import './career-analyzer.css';

export default function CareerAnalyzerPage() {
  const [view, setView] = useState('landing');
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "1st",
    skillLevel: "Beginner",
    answers: {},
  });
  const [results, setResults] = useState(null);

  const CAREER_DETAILS = {
    backend: {
      id: "backend",
      title: "Backend Developer",
      icon: "fa-terminal",
      description: "You build the logic, databases, and APIs that power applications. You prefer efficiency and logic over visual design.",
      roadmap: [
        { month: "1-2", topic: "Core Language", desc: "Master Python, Java, or Node.js logic and syntax." },
        { month: "3-4", topic: "Databases", desc: "Learn SQL (PostgreSQL) and NoSQL (MongoDB) basics." },
        { month: "5-6", topic: "APIs & Servers", desc: "Build RESTful APIs using Express or Django." },
        { month: "7+", topic: "Deployment", desc: "Learn Docker, AWS basics, and CI/CD pipelines." },
      ],
    },
    fullstack: {
      id: "fullstack",
      title: "Full Stack Developer",
      icon: "fa-globe",
      description: "The jack-of-all-trades. You enjoy building the entire product, from the user interface to the server logic.",
      roadmap: [
        { month: "1-2", topic: "Frontend Basics", desc: "HTML, CSS, JavaScript, and React." },
        { month: "3-4", topic: "Backend Basics", desc: "Node.js, Express, and connecting to databases." },
        { month: "5-6", topic: "Integration", desc: "Building full CRUD apps and handling state management." },
        { month: "7+", topic: "Advanced", desc: "Next.js, Authentication, and scalable architecture." },
      ],
    },
    data: {
      id: "data",
      title: "Data Analyst",
      icon: "fa-chart-line",
      description: "You find stories in numbers. You prefer patterns, statistics, and insights over writing software code.",
      roadmap: [
        { month: "1-2", topic: "Excel & SQL", desc: "Master advanced Excel and SQL querying." },
        { month: "3-4", topic: "Visualization", desc: "Learn PowerBI or Tableau to tell stories with data." },
        { month: "5-6", topic: "Python for Data", desc: "Pandas, NumPy, and basic data cleaning." },
        { month: "7+", topic: "Statistics", desc: "Basic statistical modeling and A/B testing." },
      ],
    },
    cybersecurity: {
      id: "cybersecurity",
      title: "Cybersecurity Analyst",
      icon: "fa-shield-halved",
      description: "The digital guardian. You enjoy finding vulnerabilities, protecting systems, and understanding how networks work.",
      roadmap: [
        { month: "1-2", topic: "Networking", desc: "CompTIA Network+ concepts, OSI model, TCP/IP." },
        { month: "3-4", topic: "OS & Linux", desc: "Master Linux command line and Windows administration." },
        { month: "5-6", topic: "Security Basics", desc: "CompTIA Security+, threat analysis, firewalls." },
        { month: "7+", topic: "Tools", desc: "Wireshark, Nmap, and basic penetration testing tools." },
      ],
    },
    qa: {
      id: "qa",
      title: "QA Automation Engineer",
      icon: "fa-check-circle",
      description: "The quality gatekeeper. You love breaking things to ensure they are fixed before reaching the user.",
      roadmap: [
        { month: "1-2", topic: "Testing Basics", desc: "Manual testing, writing test cases, Jira." },
        { month: "3-4", topic: "Coding for QA", desc: "Java or Python basics specifically for scripting." },
        { month: "5-6", topic: "Automation", desc: "Selenium, Cypress, or Playwright." },
        { month: "7+", topic: "CI Integration", desc: "Running tests in Jenkins or GitHub Actions." },
      ],
    },
  };

  const QUESTIONS = [
    {
      id: "interest",
      text: "What part of technology excites you the most?",
      options: [
        { text: "Building visual interfaces users interact with", scores: { fullstack: 5, backend: 1, qa: 1, data: 0, cybersecurity: 0 } },
        { text: "Designing the hidden logic and data flow", scores: { backend: 5, fullstack: 3, data: 2, cybersecurity: 1, qa: 0 } },
        { text: "Finding patterns and predicting trends", scores: { data: 5, backend: 1, fullstack: 0, cybersecurity: 1, qa: 1 } },
        { text: "Breaking systems to make them stronger", scores: { cybersecurity: 4, qa: 5, backend: 1, data: 0, fullstack: 0 } },
      ],
    },
    {
      id: "activity",
      text: "If you were working on a team project, which task would you volunteer for?",
      options: [
        { text: "Creating the dashboard and buttons", scores: { fullstack: 5, backend: 0, qa: 1, data: 1, cybersecurity: 0 } },
        { text: "Setting up the database and API", scores: { backend: 5, fullstack: 3, data: 2, cybersecurity: 1, qa: 0 } },
        { text: "Analyzing user behavior data", scores: { data: 5, backend: 1, fullstack: 0, cybersecurity: 0, qa: 1 } },
        { text: "Checking for bugs and security holes", scores: { qa: 5, cybersecurity: 5, backend: 1, data: 0, fullstack: 0 } },
      ],
    },
    {
      id: "mindset",
      text: "How do you approach a difficult problem?",
      options: [
        { text: "I construct a solution step-by-step from scratch", scores: { backend: 4, fullstack: 4, data: 1, cybersecurity: 1, qa: 1 } },
        { text: "I look for anomalies and potential points of failure", scores: { cybersecurity: 5, qa: 5, data: 2, backend: 1, fullstack: 0 } },
        { text: "I gather data to see what worked before", scores: { data: 5, backend: 2, fullstack: 1, cybersecurity: 1, qa: 1 } },
      ],
    },
    {
      id: "environment",
      text: "Which work environment sounds best?",
      options: [
        { text: "Fast-paced, building new features daily", scores: { fullstack: 5, backend: 4, data: 1, cybersecurity: 0, qa: 1 } },
        { text: "Stable, ensuring reliability and security", scores: { cybersecurity: 5, qa: 5, backend: 3, data: 2, fullstack: 1 } },
        { text: "Research-heavy, creating reports and insights", scores: { data: 5, backend: 1, cybersecurity: 2, fullstack: 0, qa: 1 } },
      ],
    },
  ];

  useEffect(() => {
    // Mobile menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
      mobileBtn.onclick = (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
      };
    }

    // Desktop tools
    const toolsBtn = document.getElementById('desktop-tools-btn');
    const toolsMenu = document.getElementById('desktop-tools-menu');
    if (toolsBtn && toolsMenu) {
      toolsBtn.onclick = (e) => {
        e.stopPropagation();
        toolsMenu.classList.toggle('hidden');
      };
    }

    document.onclick = (e) => {
      if (toolsMenu && !toolsMenu.contains(e.target) && !toolsBtn?.contains(e.target)) {
        toolsMenu.classList.add('hidden');
      }
      if (mobileMenu && !mobileMenu.contains(e.target) && !mobileBtn?.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    };
  }, []);

  const calculateResults = async () => {
    setView('calculating');
    
    let finalScores = { backend: 0, fullstack: 0, data: 0, cybersecurity: 0, qa: 0 };

    Object.values(formData.answers).forEach((scoreSet) => {
      Object.keys(scoreSet).forEach((career) => {
        finalScores[career] += scoreSet[career];
      });
    });

    if (formData.branch === "CSE" || formData.branch === "IT") {
      finalScores.backend += 2;
      finalScores.fullstack += 2;
    }
    if (formData.skillLevel === "Beginner") {
      finalScores.qa += 3;
      finalScores.data += 1;
    }
    if (formData.skillLevel === "Advanced") {
      finalScores.backend += 3;
      finalScores.cybersecurity += 3;
    }

    const maxPossible = 30;
    const sortedCareers = Object.entries(finalScores)
      .map(([key, value]) => ({
        key,
        score: Math.min(Math.round((value / maxPossible) * 100), 98),
        ...CAREER_DETAILS[key],
      }))
      .sort((a, b) => b.score - a.score);

    try {
      await supabase.from("career_analysis").insert([{
        student_info: { name: formData.name, branch: formData.branch, year: formData.year },
        answers: formData.answers,
        scores: finalScores,
        created_at: new Date().toISOString(),
      }]);
    } catch (error) {
      console.error("Error saving data:", error);
    }

    setTimeout(() => {
      setResults({
        top: sortedCareers[0],
        secondary: sortedCareers[1],
        low: sortedCareers[sortedCareers.length - 1],
      });
      setView('results');
    }, 2000);
  };

  const handleStartTest = () => {
    setView('form');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (step === 0) {
      setView('landing');
    } else {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleRetake = () => {
    setStep(0);
    setView('landing');
    setResults(null);
    setFormData({
      name: "",
      email: "",
      branch: "",
      year: "1st",
      skillLevel: "Beginner",
      answers: {},
    });
  };

  const totalSteps = 4 + QUESTIONS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet" />

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <a href="/" className="flex items-center space-x-3 group z-20">
            <img src="/DIVERSE LOOPERS (1) bg.png" alt="Diverse Loopers Logo" className="h-10 md:h-14 w-auto transform transition-transform duration-300 group-hover:rotate-6" />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="nav-link text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</a>
            <a href="/#about" className="nav-link text-gray-600 hover:text-indigo-600 font-medium transition-colors">About Us</a>
            <a href="/#contact" className="nav-link text-gray-600 hover:text-indigo-600 font-medium transition-colors">Contact Us</a>

            <div className="relative-group">
              <button id="desktop-tools-btn" className="tools-text-btn">
                Tools
                <i className="fa-solid fa-chevron-down text-xs transition-transform duration-300"></i>
              </button>
              <div id="desktop-tools-menu" className="hidden absolute left-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                <a href="/career-analyzer" className="block px-4 py-3 text-sm text-indigo-700 bg-indigo-50 font-semibold border-l-4 border-indigo-600 hover:bg-indigo-100 transition-colors">
                  <i className="fa-solid fa-bullseye mr-2"></i> Career Analyzer
                </a>
                <a href="/analyzer" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                  <i className="fa-solid fa-road mr-2 text-gray-400"></i> Path Analyzer
                </a>
              </div>
            </div>

            <a href="/profile" className="px-5 py-2 text-white bg-indigo-600 rounded-full font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <i className="fa-regular fa-user mr-1"></i> Profile
            </a>
          </div>

          <button id="mobile-menu-btn" className="md:hidden text-gray-600 focus:outline-none p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors z-20">
            <i className="fa-solid fa-bars text-2xl"></i>
          </button>
        </div>

        <div id="mobile-menu" className="hidden md:hidden bg-white border-t border-gray-100 mt-4 py-4 space-y-2 animate-fadeIn absolute w-full left-0 px-6 shadow-lg top-full">
          <a href="/" className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors">Home</a>
          <a href="/#about" className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors">About Us</a>
          <div className="px-4 py-2 border-t border-b border-gray-50 my-2">
            <div className="font-medium text-gray-400 text-sm mb-2 uppercase tracking-wide">Tools</div>
            <a href="/career-analyzer" className="block py-2 text-indigo-600 font-medium pl-2 border-l-2 border-indigo-600">Career Analyzer</a>
            <a href="/analyzer" className="block py-2 text-gray-600 hover:text-indigo-600 font-medium pl-2 hover:border-l-2 hover:border-indigo-400">Path Analyzer</a>
          </div>
          <a href="/profile" className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors">Profile</a>
          <a href="/login" className="block px-4 py-3 rounded-lg text-white bg-indigo-600 text-center font-medium shadow-md mt-4">Login</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col relative">
        {view === 'landing' && (
          <div className="fade-in">
            <section className="bg-gradient-to-b from-indigo-50 to-white pt-20 pb-16 px-4 text-center">
              <div className="max-w-4xl mx-auto">
                <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">Career Fit Tool for BTech Students</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                  Find the Tech Career That <span className="text-indigo-600">Actually Fits You</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Not what is trending. Not what others say. But what matches your skills, interests, and learning style. A 5-7 minute assessment that gives you a clear career direction and next steps.
                </p>
                <button onClick={handleStartTest} className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Start Free Career Fit Test
                </button>
              </div>
            </section>

            <section className="py-16 px-4 bg-white">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Confused about your tech career?</h2>
                <p className="text-lg text-gray-600 mb-12">You are not alone. Most BTech students struggle with:</p>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-default">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className="fa-solid fa-list-ul text-red-500 text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Overwhelmed?</h3>
                    <p className="text-gray-500 text-sm">Too many options like AI, Web3, Data... we filter the noise.</p>
                  </div>
                  <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-default">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className="fa-solid fa-comments text-orange-500 text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Confused?</h3>
                    <p className="text-gray-500 text-sm">Stop relying on generic advice. Get data-backed direction.</p>
                  </div>
                  <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-default">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <i className="fa-solid fa-check text-green-500 text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Get Clarity</h3>
                    <p className="text-gray-500 text-sm">A personalized roadmap to your first job.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 px-4 bg-indigo-900 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">This tool helps you choose smartly — with data.</h2>
                <p className="text-lg text-indigo-100 mb-10">
                  Our Career Fit Tool analyzes your interests, aptitude, learning behavior, and current skill level. We match you with real tech careers that suit you, not everyone.
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
                  <span className="px-4 py-2 bg-indigo-800 rounded-lg border border-indigo-700">No generic advice</span>
                  <span className="px-4 py-2 bg-indigo-800 rounded-lg border border-indigo-700">No random personality tests</span>
                </div>
              </div>
            </section>

            <section className="py-16 px-4 bg-white">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-black text-indigo-100 mb-4">01</div>
                    <h3 className="text-xl font-bold mb-2">Answer smart questions</h3>
                    <p className="text-gray-600">Takes only 5-7 minutes of your time.</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-indigo-100 mb-4">02</div>
                    <h3 className="text-xl font-bold mb-2">Get Fit Scores</h3>
                    <p className="text-gray-600">See how well different tech careers match you.</p>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-indigo-100 mb-4">03</div>
                    <h3 className="text-xl font-bold mb-2">Get a clear roadmap</h3>
                    <p className="text-gray-600">Know what to learn next and where to focus.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-16 px-4 bg-gray-50">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Will Get</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-green-500 w-8"></i> Your best-fit tech career</li>
                    <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-green-500 w-8"></i> A backup career option</li>
                    <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-green-500 w-8"></i> Careers you should avoid for now</li>
                    <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-green-500 w-8"></i> A clear learning roadmap</li>
                    <li className="flex items-center text-gray-700"><i className="fa-solid fa-check text-green-500 w-8"></i> Confidence in your decision</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Careers We Cover</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-700">Backend Developer</span>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-700">Full Stack Developer</span>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-700">Data Analyst</span>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-700">Cybersecurity Analyst</span>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-700">QA Automation Engineer</span>
                    <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded text-gray-500 italic">More coming soon</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-12 px-4 bg-white border-t border-gray-100">
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Honest & Student-First</h3>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center"><i className="fa-solid fa-lock text-gray-400 mr-2"></i> No forced sign-ups</span>
                  <span className="flex items-center"><i className="fa-solid fa-ban text-gray-400 mr-2"></i> No fake promises</span>
                  <span className="flex items-center"><i className="fa-solid fa-check-double text-gray-400 mr-2"></i> Clear, practical guidance</span>
                </div>
                <p className="mt-4 text-gray-500 text-sm">This tool is built to help you decide, not to sell you something.</p>
              </div>
            </section>

            <section className="py-20 px-4 bg-gray-900 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Find Your Path?</h2>
              <p className="text-gray-400 mb-8 text-lg">Stop guessing. Start choosing with clarity.</p>
              <button onClick={handleStartTest} className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-gray-900 transition-all duration-200 bg-white rounded-full hover:bg-gray-100 shadow-xl">
                Start Your Free Career Fit Test
              </button>
            </section>
          </div>
        )}

        {view === 'form' && (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 w-full">
            <div className="w-full max-w-2xl bg-gray-200 rounded-full h-2.5 mb-8">
              <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
              {step === 0 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-2xl font-bold text-gray-900">Let us get to know you</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm outline-none" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" placeholder="john@college.edu" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                        <select value={formData.branch} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                          <option value="">Select</option>
                          <option value="CSE">CSE</option>
                          <option value="IT">IT</option>
                          <option value="ECE">ECE</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <select value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
                          <option value="1st">1st Year</option>
                          <option value="2nd">2nd Year</option>
                          <option value="3rd">3rd Year</option>
                          <option value="4th">4th Year</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Tech Skill Level</label>
                      <div className="flex space-x-4">
                        {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                          <button key={lvl} onClick={() => setFormData({ ...formData, skillLevel: lvl })} className={`flex-1 py-2 px-3 rounded-lg text-sm border ${formData.skillLevel === lvl ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold" : "border-gray-300 hover:bg-gray-50"}`}>
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-6 mt-4 border-t border-gray-100">
                    <button onClick={handleBack} className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors flex items-center">
                      <i className="fa-solid fa-arrow-left mr-2"></i> Back
                    </button>
                    <button onClick={handleNext} disabled={!formData.name || !formData.branch} className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none transition-all flex items-center">
                      Next Step <i className="fa-solid fa-arrow-right ml-2"></i>
                    </button>
                  </div>
                </div>
              )}

              {step > 0 && step <= QUESTIONS.length && (
                <div className="space-y-6 fade-in">
                  <span className="uppercase tracking-wide text-xs font-bold text-indigo-500 mb-2 block">Question {step} of {QUESTIONS.length}</span>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{QUESTIONS[step - 1].text}</h2>
                  <div className="space-y-3">
                    {QUESTIONS[step - 1].options.map((opt, idx) => (
                      <button key={idx} onClick={() => {
                        const qId = QUESTIONS[step - 1].id;
                        setFormData({
                          ...formData,
                          answers: { ...formData.answers, [qId]: opt.scores }
                        });
                        setTimeout(() => setStep(step + 1), 250);
                      }} className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 group flex items-center justify-between">
                        <span className="font-medium text-gray-700 group-hover:text-indigo-900">{opt.text}</span>
                        <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-indigo-500 group-hover:bg-indigo-500"></div>
                      </button>
                    ))}
                  </div>
                  <div className="pt-6 mt-4 border-t border-gray-100">
                    <button onClick={handleBack} className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors flex items-center">
                      <i className="fa-solid fa-arrow-left mr-2"></i> Previous
                    </button>
                  </div>
                </div>
              )}

              {step > QUESTIONS.length && (
                <div className="text-center py-10 space-y-6 fade-in">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fa-solid fa-circle-check text-4xl text-indigo-600"></i>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">All Set!</h2>
                  <p className="text-gray-600">We have analyzed your inputs. Ready to see your future?</p>
                  <div className="flex flex-col gap-3">
                    <button onClick={calculateResults} className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors">
                      Reveal My Career Path
                    </button>
                    <button onClick={handleBack} className="text-gray-500 hover:text-gray-800 text-sm font-medium mt-2">
                      Go Back
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'calculating' && (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Analyzing your responses...</h2>
            <p className="text-sm text-gray-500 mt-2">Computing fit scores</p>
          </div>
        )}

        {view === 'results' && results && (
          <div className="bg-gray-50 py-12 px-4 w-full">
            <div className="max-w-4xl mx-auto space-y-8 fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Your Career Analysis Results</h1>
                <p className="text-gray-600 mt-2">Based on your interests, logic style, and patience levels.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-indigo-600 transform hover:scale-[1.01] transition-transform">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold tracking-wide uppercase mb-2">Best Fit • {results.top.score}% Match</span>
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 text-2xl">
                          <i className={`fa-solid ${results.top.icon}`}></i>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">{results.top.title}</h2>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 text-right hidden md:block">
                      <div className="text-5xl font-extrabold text-indigo-600">{results.top.score}%</div>
                      <div className="text-sm text-gray-400">Match Score</div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-indigo-200 pl-4 mb-8">
                    {results.top.description} <br/>
                    <span className="text-sm text-gray-500 mt-2 block">Why? Your answers indicate a preference for this work style.</span>
                  </p>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <i className="fa-solid fa-layer-group mr-2 text-indigo-600"></i>
                      Your 6-Month Roadmap
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.top.roadmap.map((step, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 relative">
                          <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                            Month {step.month}
                          </div>
                          <h4 className="font-bold text-indigo-900 mt-2">{step.topic}</h4>
                          <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-400">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Strong Alternative</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="p-2 bg-blue-50 rounded text-blue-500 text-xl"><i className={`fa-solid ${results.secondary.icon}`}></i></div>
                    <div>
                      <h4 className="font-bold text-gray-800">{results.secondary.title}</h4>
                      <p className="text-sm text-gray-500">{results.secondary.score}% Match</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-8 pb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to start?</h3>
                <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition shadow-lg">
                    Find Mentors
                  </button>
                  <button onClick={handleRetake} className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
                    Retake Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-12 mt-auto z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src="/DIVERSE LOOPERS (1) bg.png" alt="Logo" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-gray-500">Guiding Talents to their perfect career path.</p>
              <div className="space-y-2">
                <a href="mailto:contact@diverseloopers.com" className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                  <i className="fa-solid fa-envelope mr-2"></i> contact@diverseloopers.com
                </a>
                <a href="mailto:contact@diverseloopers.com" className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                  <i className="fa-solid fa-phone mr-2"></i> Contact Us
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</a></li>
                <li><a href="/institute" className="text-gray-600 hover:text-indigo-600 transition-colors">For Universities</a></li>
                <li><a href="/business" className="text-gray-600 hover:text-indigo-600 transition-colors">For Businesses</a></li>
                <li><a href="/careers" className="text-gray-600 hover:text-indigo-600 transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/career-analyzer" className="text-gray-600 hover:text-indigo-600 transition-colors">Career Analyzer</a></li>
                <li><a href="/analyzer" className="text-gray-600 hover:text-indigo-600 transition-colors">Path Analyzer</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/105277450" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300">
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/diverseloopers/" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm">&copy; 2024 Diverse Loopers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}