'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-white font-bold text-sm">DL</span>
          </div>
          <span className="font-bold text-foreground">Diverse Loopers</span> */}
          <img
              src="/images/logo.png"
              alt="Company Logo"
              style={{ height: "65px",margin: "0 auto", marginBottom: "1rem" }}
            />
        </div>

        {/* Nav links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-12 mr-4">
          <a href="#what-we-do" className="text-foreground/70 hover:text-blue-600 transition-colors text-sm font-medium">
            Home
          </a>
          {/* <a href="#why-join" className="text-foreground/70 hover:text-foreground transition-colors text-sm font-medium">
            Products
          </a> */}
          {/* <a> */}
          <div className="relative group">
  <button className="text-gray-700 text-sm font-medium hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer">
    Exclusive Tools
    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  </button>
           {/* Dropdown */}
  <div className="absolute left-0 top-full mt-3 w-72 bg-white shadow-xl border border-gray-200 rounded-xl z-50
  opacity-0 invisible group-hover:opacity-100 group-hover:visible
  transition-all duration-200 delay-200">

    <div className="pt-4 pb-2 px-4">
      

      <div className="grid grid-cols-1 gap-2">

        <a href="/career-analyzer" className="flex items-center gap-3 p-3 bg-blue-50 text-primary rounded-xl font-bold text-sm hover:scale-[1.02] transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          Career Analyzer
        </a>

        <a href="/analyzer" className="flex items-center gap-3 p-3 bg-pink-50 text-primary rounded-xl font-bold text-sm hover:scale-[1.02] transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Path Analyzer
        </a>

      </div>
    </div>

  </div>

</div>
{/* </a> */}
        <div>
          <a href="#open-roles" className="text-foreground/70 hover:text-blue-600 transition-colors text-sm font-medium">
            Open Roles
          </a>
        </div>

        {/* CTA Button */}
        {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-6 h-10 rounded-lg">
          Apply Now
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button> */}
      </div>
      </div>
    </nav>
  )
}
