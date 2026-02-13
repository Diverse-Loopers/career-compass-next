"use client";

import Script from "next/script";
import "./career-analyzer.css";

export default function CareerAnalyzerPage() {
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
        src="/js/career-analyzer.js"
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

     
      <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center relative">
            {/* 1. Logo */}
            <a href="index.html" className="flex items-center space-x-3 group z-20">
              <img
                src="DIVERSE LOOPERS (1) bg.png"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=DL'; }}
                alt="Diverse Loopers Logo"
                className="h-10 md:h-14 w-auto transform transition-transform duration-300 group-hover:rotate-6"
              />
            </a>

            {/* 2. Desktop Menu (HIDDEN on Mobile) */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="index.html"
                className="nav-link text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="index.html#about"
                className="nav-link text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                About Us
              </a>
              <a
                href="index.html#contact"
                className="nav-link text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                Contact Us
              </a>

              {/* Tools Dropdown */}
              <div className="relative-group">
                <button id="desktop-tools-btn" className="tools-text-btn">
                  Tools
                  <i className="fa-solid fa-chevron-down text-xs transition-transform duration-300"></i>
                </button>

                {/* Dropdown Menu (Hidden by default) */}
                <div
                  id="desktop-tools-menu"
                  className="hidden absolute left-0 top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <a
                    href="career-analyzer.html"
                    className="block px-4 py-3 text-sm text-indigo-700 bg-indigo-50 font-semibold border-l-4 border-indigo-600 hover:bg-indigo-100 transition-colors"
                  >
                    <i className="fa-solid fa-bullseye mr-2"></i> Career Analyzer
                  </a>
                  <a
                    href="analyzer.html"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                  >
                    <i className="fa-solid fa-road mr-2 text-gray-400"></i> Path Analyzer
                  </a>
                </div>
              </div>

              {/* Auth Buttons */}
              <a
                href="profile.html"
                id="nav-profile"
                className="px-5 py-2 text-white bg-indigo-600 rounded-full font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <i className="fa-regular fa-user mr-1"></i> Profile
              </a>
              <a
                href="login.html"
                id="nav-login"
                className="px-5 py-2 text-white bg-indigo-600 rounded-full font-medium shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                Login
              </a>
            </div>

            {/* 3. Mobile Menu Button (Visible ONLY on Mobile) */}
            <button
              id="mobile-menu-btn"
              className="md:hidden text-gray-600 focus:outline-none p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors z-20"
            >
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>

          {/* 4. Mobile Menu Panel */}
          <div
            id="mobile-menu"
            className="hidden md:hidden bg-white border-t border-gray-100 mt-4 py-4 space-y-2 animate-fadeIn absolute w-full left-0 px-6 shadow-lg top-full"
          >
            <a
              href="index.html"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="index.html#about"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
            >
              About Us
            </a>

            {/* Mobile Tools */}
            <div className="px-4 py-2 border-t border-b border-gray-50 my-2">
              <div className="font-medium text-gray-400 text-sm mb-2 uppercase tracking-wide">
                Tools
              </div>
              <a
                href="career-analyzer.html"
                className="block py-2 text-indigo-600 font-medium pl-2 border-l-2 border-indigo-600"
              >
                Career Analyzer
              </a>
              <a
                href="analyzer.html"
                className="block py-2 text-gray-600 hover:text-indigo-600 font-medium pl-2 hover:border-l-2 hover:border-indigo-400"
              >
                Path Analyzer
              </a>
            </div>

            <a
              href="profile.html"
              id="mobile-nav-profile"
              className="block px-4 py-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors hidden"
            >
              Profile
            </a>
            <a
              href="login.html"
              id="mobile-nav-login"
              className="block px-4 py-3 rounded-lg text-white bg-indigo-600 text-center font-medium shadow-md mt-4"
            >
              Login
            </a>
          </div>
        </nav>

        {/* Main App Container */}
        <main id="app-container" className="flex-grow flex flex-col relative">
          {/* Views will be injected here via JavaScript */}
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-12 mt-auto z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand & Contact */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <img
                    src="DIVERSE LOOPERS (1) bg.png"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=DL'; }}
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Guiding Talents to their perfect career path.
                </p>
                <div className="space-y-2">
                  <a
                    href="mailto:support@diverseloopers.com"
                    className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <i className="fa-solid fa-envelope mr-2"></i> contact@diverseloopers.com
                  </a>
                  <a
                    href="mailto:contact@diverseloopers.com"
                    className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <i className="fa-solid fa-phone mr-2"></i> Contact Us
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="index.html"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="institute.html"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      For Universities
                    </a>
                  </li>
                  <li>
                    <a
                      href="business.html"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      For Businesses
                    </a>
                  </li>
                  <li>
                    <a
                      href="careers.html"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Tools */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="career-analyzer.html"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      Career Analyzer
                    </a>
                  </li>
                  <li>
                    <a
                      href="analyzer.html"
                      className="text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                      Path Analyzer
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/company/105277450"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300"
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300"
                  >
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/diverseloopers/"
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-all duration-300"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                &copy; 2024 Diverse Loopers. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}