'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-25 py-20 md:py-32 lg:py-40">
      {/* Gradient background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none mx-10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                Join Our Mission
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Shape the Future of{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Student Careers
                </span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl">
              Diverse Loopers connects talented students with real-world business projects. We're building the bridge between education and industry expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 h-12 text-base font-semibold"
              >
                Explore Roles
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-primary/20 hover:border-primary/40 text-foreground rounded-lg px-8 h-12 text-base font-semibold"
              >
                Learn About Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 md:pt-12 border-t border-border">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-foreground/60 mt-1">Students Connected</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
                <p className="text-sm text-foreground/60 mt-1">Project Partners</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-foreground/60 mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          {/* Right visual */}
         <div className="relative lg:pl-10">
<div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-slate-100">
<img alt="Diverse students collaborating" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf1dvqeUSNnH7BlxLGx34sbj0I91sPqJgbEIE3bOXK3fmbdw6QUKYhEVhHhOJ-NiGjG6VbhCcB9w5OBkkCDzeAwmscIq4zmF7eCWIivcW4SVr6ZC3cJohMNmOLP5ROco85cE5vhmfdVYQf6Ba2BZQdUQwoD4P4WvLDzQ-mmQU1yPmTEngNQx--FDpcdtqpNWQ1sDsay46tNH9H5KAoVhuO3bE1ttUWg0EFXll74XPeNdmHL1xAroR7tVDaDJKAZVga2KoAMjC_IeM"/>
<div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none"></div>
</div>
{/* <!-- Float Badge --> */}
{/* <div className="absolute -bottom-6 -left-4 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-50">
<div className="size-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
<span className="material-symbols-outlined text-2xl">verified_user</span>
</div>
<div>
<p className="font-bold text-slate-900 text-sm">Industry Certified</p>
<p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Accredited by Top Tech Firms</p>
</div>
</div> */}
</div>
        </div>
      </div>
    </section>
  )
}
