"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Hamburger Icon ───────────────────────────────────────────────────────────
const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ─── Close Icon ───────────────────────────────────────────────────────────────
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Nav Links config ─────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For Employers", href: "#employers" },
  { label: "Pricing", href: "#pricing" },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
   const navRef = useRef(null);                         

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); 

  return (
    <nav ref={navRef} className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">

        {/* Brand */}
        <Link
          href="/"
          className="text-[17px] font-bold text-gray-900 tracking-tight flex-shrink-0"
        >
          SkillVerify
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13.5px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/login"
            className="text-[13.5px] font-semibold text-gray-700 hover:text-gray-900
              px-4 py-2 rounded-lg transition-colors duration-150"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="text-[13.5px] font-semibold text-white bg-gray-900
              hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden text-gray-700 p-1 -mr-1 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 pb-5 pt-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[14px] font-medium text-gray-600 hover:text-gray-900
                py-2.5 border-b border-gray-50 transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTAs */}
          <div className="flex flex-col gap-2 mt-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center text-[14px] font-semibold text-gray-700
                border border-gray-200 hover:border-gray-400 py-2.5 rounded-xl
                transition-colors duration-150"
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="w-full text-center text-[14px] font-semibold text-white
                bg-gray-900 hover:bg-blue-700 py-2.5 rounded-xl transition-colors duration-200"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}