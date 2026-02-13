"use client";

import { useEffect } from "react";
import "./login.css";
import { 
  togglePanel, 
  showMessage, 
  handleRegister, 
  handleLogin, 
  handleForgotPassword, 
  handleOtpVerify, 
  showForgotPasswordOverlay, 
  initAuthListeners 
} from "@/lib/pages/login";

export default function HomePage() {
  useEffect(() => {
    initAuthListeners();
  }, []);

  return (
    <>
      <a href="/" className="home-link">
        <img 
          src="/DIVERSE LOOPERS (1) bg.png" 
          onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/40?text=DL')}
          alt="Logo" 
        />
      </a>
      <a href="javascript:history.back()" className="back-link">
        <i className='bx bx-arrow-back'></i> Back
      </a>

      <div className="auth-wrapper" id="authWrapper">
        <div className="auth-form-box register-form-box">
          <form id="register-form">
            <h1>Create Account</h1>
            <span>Join our professional community</span>
            <div className="input-group">
              <input type="text" id="register-username" placeholder="Username" required />
            </div>
            <div className="input-group">
              <input type="email" id="register-email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <input type="password" id="register-password" placeholder="Password" required />
            </div>
            <button type="submit">Sign Up</button>
            <div className="mobile-switch">
              <p>Already have an account?</p>
              <button type="button" onClick={() => togglePanel(false)}>Sign In</button>
            </div>
          </form>
        </div>

        <div className="auth-form-box login-form-box">
          <form id="login-form">
            <h1>Sign In</h1>
            <span>Welcome back to Diverse Loopers</span>
            <div className="input-group">
              <input type="email" id="login-email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <input type="password" id="login-password" placeholder="Password" required />
            </div>
            <a className="forgot-link" id="forgot-password-trigger">Forgot your password?</a>
            <button type="submit">Sign In</button>
            <div className="mobile-switch">
              <p>Don't have an account?</p>
              <button type="button" onClick={() => togglePanel(true)}>Sign UP</button>
            </div>
          </form>
        </div>

        <div className="slide-panel-wrapper">
          <div className="slide-panel">
            <div className="panel-content panel-content-right">
              <h1>Welcome Back!</h1>
              <p>Keep connected with us by logging into your account.</p>
              <button className="transparent-btn" id="registerBtn">Sign In</button>
            </div>
            <div className="panel-content panel-content-left">
              <h1>Hello there!</h1>
              <p>Start your journey with us and discover your potential.</p>
              <button className="transparent-btn" id="loginBtn">Sign Up</button>
            </div>
          </div>
        </div>

        {/* Forgot Password Overlay */}
        <div id="forgot-overlay">
          <i className='bx bx-lock-open-alt' style={{fontSize: '60px', color: '#ec4899', marginBottom: '20px'}}></i>
          <h1>Reset Password</h1>
          <p>Enter your email address to receive a password reset link.</p>
          <form id="forgot-form" style={{background: 'transparent', height: 'auto', padding: 0, width: '300px'}}>
            <div className="input-group">
              <input type="email" id="forgot-email" placeholder="Enter your email" required />
            </div>
            <button type="submit" style={{width: '100%'}}>Send Reset Link</button>
            <a href="#" onClick={() => window.location.reload()} className="forgot-link">Back to Login</a>
          </form>
        </div>

        {/* OTP Overlay */}
        <div id="otp-overlay">
          <i className='bx bx-mail-send' style={{fontSize: '60px', color: '#3b82f6', marginBottom: '20px'}}></i>
          <h1>Verify Email</h1>
          <p>Enter the code sent to your email.</p>
          <form id="otp-form" style={{background: 'transparent', height: 'auto', padding: 0, width: '300px'}}>
            <input 
              type="text" 
              id="otp-token" 
              placeholder="000000" 
              required 
              maxLength={6}
              style={{textAlign: 'center', letterSpacing: 4, fontWeight: 'bold', fontSize: 20}} 
            />
            <button type="submit" style={{width: '100%'}}>Verify</button>
            <a href="#" onClick={() => window.location.reload()} className="forgot-link">Back</a>
          </form>
        </div>
      </div>

      <div id="message-box" className="message-box"></div>

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
                  <i data-lucide="linkedin" className="w-4 h-4"></i>
                </a>
                <a href="https://www.instagram.com/diverseloopers/" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                  <i data-lucide="instagram" className="w-4 h-4"></i>
                </a>
                <a href="#" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                  <i data-lucide="twitter" className="w-4 h-4"></i>
                </a>
                <a href="https://chat.whatsapp.com/B6XJSoLC2Hg7Wgg5lHRfSf" className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
                  <i data-lucide="mail" className="w-4 h-4 text-primary"></i>
                  contact@diverseloopers.com
                </li>
                <li className="flex gap-3">
                  <i data-lucide="phone" className="w-4 h-4 text-primary"></i>
                  +91 98393 50961
                </li>
              </ul>

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
                <button id="logout-btn" className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest">
                  Sign Out
                </button>
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