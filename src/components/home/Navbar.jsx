"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add scroll effect for dynamic glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Events", href: "https://www.diverseloopers.com/events", external: true },
    { name: "Career", href: "/career" },
  ];

  return (
    <nav
      className={`w-full top-0 sticky z-50 transition-all duration-500 ${scrolled
        ? "bg-white/90 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[80px]">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="https://www.diverseloopers.com/" target="_blank" rel="noopener noreferrer" className="flex items-center transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <Image
                src="/Diverse LOOPERS (1) bg.png"
                alt="Diverse Loopers Logo"
                width={140}
                height={50}
                className="object-contain h-10 w-auto lg:h-[3.25rem]"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1.5 rounded-full border border-slate-200/60 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const LinkComponent = link.external ? "a" : Link;
              const linkProps = link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

              return (
                <LinkComponent
                  key={link.name}
                  href={link.href}
                  {...linkProps}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                    ? "bg-white text-primary shadow-[0_2px_8px_rgba(0,0,0,0.06)] scale-105"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                >
                  {link.name}
                </LinkComponent>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
<a href="/comming-soon">

            <button className="group relative overflow-hidden bg-slate-900 text-white px-7 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Explore ETS
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
              </span>
            </button>
</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 mr-1 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between overflow-hidden">
                <span className={`w-full h-[2px] bg-slate-800 rounded-full transform transition-all duration-300 origin-left ${isOpen ? 'rotate-[42deg] w-[22px]' : ''}`} />
                <span className={`w-full h-[2px] bg-slate-800 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
                <span className={`w-full h-[2px] bg-slate-800 rounded-full transform transition-all duration-300 origin-left ${isOpen ? '-rotate-[42deg] w-[22px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out absolute w-full left-0 ${isOpen ? 'max-h-[420px] border-b border-slate-200/50 bg-white/95 backdrop-blur-xl shadow-xl' : 'max-h-0 bg-transparent'
          }`}
      >
        <div className="px-5 pt-4 pb-8 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const LinkComponent = link.external ? "a" : Link;
            const linkProps = link.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <LinkComponent
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                {...linkProps}
                className={`block px-5 py-3.5 text-base font-semibold rounded-2xl transition-all ${isActive
                  ? "bg-primary/5 text-primary border border-primary/10"
                  : "text-slate-600 border border-transparent hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                {link.name}
              </LinkComponent>
            );
          })}
          <div className="pt-6 flex gap-3">
<a href="/comming-soon" className="flex-1">

            <button className="flex-1 bg-slate-900 text-white flex justify-center items-center gap-2 px-6 py-4 rounded-2xl font-bold tracking-wide shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all">
              Explore ETS
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
