"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    tag: "INTRODUCING THE GOLDEN TOOL",
    title: "The ETS Professional Identity.",
    description: "A timeless, affordable, and easy background verification system. One digital ID to unlock global professional trust.",
    primaryCTA: "Get Your Verified ID",
    secondaryCTA: "How it Works",
    primaryLink:"./comming-soon",
    variant: "primary",
    visual: "identity-card",
  },
  {
    id: 2,
    tag: "FOR STUDENTS",
    title: "Build Your Professional Identity.",
    description: "Work on real projects, not practice tasks. Learn what companies actually expect, while building a portfolio that proves it.",
    primaryCTA: "Start Your Journey",
    primaryLink: "./students",
    variant: "blue-tint",
    visual: "code-editor",
  },
  {
    id: 3,
    tag: "FOR BUSINESSES",
    title: "Get Work Done That Actually Delivers.",
    description: "From custom tools to full execution, we build solutions that solve real problems. Work with teams who understand your business, not just your tech stack.",
    primaryCTA: "Explore Solutions",
    primaryLink: "./business",
    variant: "grey-tint",
    visual: "dashboard",
  },
  {
    id: 4,
    tag: "FOR INSTITUTES",
    title: "Bring Industry Into Learning.",
    description: "Go beyond theory with hands-on workshops, labs, and real-world exposure. Help students build skills that truly matter.",
    primaryCTA: "Partner With Us",
    primaryLink: "./institute",
    variant: "green-tint",
    visual: "institute-photo",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Set the autoscroll slide duration here (in milliseconds)
  const AUTOSCROLL_SPEED = 4000;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, AUTOSCROLL_SPEED);
    
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 overflow-hidden">
      <div 
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[600px] sm:h-[520px] shadow-2xl shadow-primary/10 group outline-none"
        tabIndex={0}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <SlideContent slide={slide} />
            </div>
          ))}
        </div>

        {/* Navigation Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              className={`w-2 h-2 sm:w-12 sm:h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white sm:w-16" : "bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Manual Scrolling Arrows */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 sm:px-6 opacity-0 focus-within:opacity-100 group-focus:opacity-100 transition-opacity duration-300 z-10">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-slate-900/30 hover:bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto transition-all active:scale-95 shadow-lg border border-white/20"
            aria-label="Previous slide"
          >
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-slate-900/30 hover:bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white pointer-events-auto transition-all active:scale-95 shadow-lg border border-white/20"
            aria-label="Next slide"
          >
            <span className="material-symbols-outlined text-3xl">chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function SlideContent({ slide }) {
  const isImageVariant = slide.variant !== "primary";

  return (
    <div className={`w-full h-full relative overflow-hidden ${isImageVariant ? 'bg-slate-900' : 'bg-linear-to-br from-[#003d9b] to-[#0052cc]'}`}>
      {/* Background Visual */}
      <div className="absolute inset-0 z-0">
        <SlideVisual type={slide.visual} variant={slide.variant} />
      </div>

      {/* Dark Overlays for Image Backgrounds to Ensure 100% Text Consistency */}
      {isImageVariant && (
        <>
          <div className="absolute inset-0 bg-slate-900/30 z-0" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900/90 via-slate-900/50 to-transparent z-0 hidden md:block" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/95 via-slate-900/60 to-transparent md:hidden z-0" />
        </>
      )}

      {/* Content Side */}
      <div className="relative z-10 w-full h-full p-6 sm:p-12 md:p-16 flex flex-col justify-end md:justify-center md:max-w-xl lg:max-w-2xl pb-20 md:pb-16 pt-8">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6 w-fit bg-white/10 text-white border border-white/30 backdrop-blur-md shadow-sm">
          {slide.tag}
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-manrope leading-tight mb-4 sm:mb-6 tracking-tight text-white drop-shadow-md">
          {slide.title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg text-slate-100 drop-shadow-md font-medium">
          {slide.description}
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          
          <button 
          onClick={() => window.location.href = slide.primaryLink}
          className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold transition-all shadow-xl active:scale-95 bg-primary text-white hover:bg-white hover:text-primary border border-transparent">
            {slide.primaryCTA}
          </button>
          {slide.secondaryCTA && (
            <button 
            onClick={() => window.location.href = slide.primaryLink}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-all border border-white/20 shadow-lg">
              {slide.secondaryCTA}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideVisual({ type, variant }) {
  if (type === "identity-card") {
    return (
      <div className="hidden md:flex absolute inset-y-0 right-0 items-center justify-center w-[45%] pr-8 xl:pr-16 z-0">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden transform hover:scale-105 transition-transform duration-500">
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Employee Ref</span>
              <span className="text-xl font-bold text-slate-900 font-manrope">Arjun V. Kulkarni</span>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 font-variation-settings-fill-1">verified</span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden shrink-0 border-2 border-primary/10">
                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" width={56} height={56} alt="Profile" className="object-cover" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Status</span>
                <span className="text-sm font-bold text-green-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  ACTIVE VERIFIED
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Issue Date</span>
                <span className="text-sm font-bold text-slate-900">Oct 24, 2023</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Tier</span>
                <span className="text-sm font-bold text-slate-900">Global Executive</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full" />
        </div>
      </div>
    );
  }

  if (type === "code-editor") {
    return <Image src="/student_new.png" fill alt="Student" className="object-cover object-center" priority />;
  }

  if (type === "dashboard") {
    return <Image src="/business_new.png" fill alt="Business" className="object-cover object-center" priority />;
  }

  if (type === "institute-photo") {
    return <Image src="/institute_new.png" fill alt="Institute" className="object-cover object-center" priority />;
  }

  return null;
}
