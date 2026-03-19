'use client'

import { Star } from 'lucide-react'

// interface TestimonialProps {
//   quote: string
//   author: string
//   title: string
//   role: string
//   avatar: string
// }

// function TestimonialCard({ quote, author, title, role, avatar }: TestimonialProps) {
//   return (
//     <div className="group p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 h-full flex flex-col">
//       {/* Stars */}
//       <div className="flex gap-1 mb-4">
//         {[...Array(5)].map((_, i) => (
//           <Star key={i} className="w-4 h-4 fill-accent text-accent" />
//         ))}
//       </div>

//       {/* Quote */}
//       <p className="text-foreground/80 leading-relaxed mb-6 flex-1 text-sm md:text-base">
//         "{quote}"
//       </p>

//       {/* Author */}
//       <div className="flex items-center gap-4 pt-6 border-t border-border/30">
//         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex-shrink-0 flex items-center justify-center">
//           <span className="text-lg">{avatar}</span>
//         </div>
//         <div>
//           <p className="font-semibold text-foreground">{author}</p>
//           <p className="text-xs md:text-sm text-foreground/60">{title}</p>
//           <p className="text-xs text-primary">{role}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function TestimonialsSection() {
  // const testimonials = [
  //   {
  //     quote: 'Working at Diverse Loopers gave me real-world experience I could never get in college. The mentorship was invaluable and helped me land my dream job.',
  //     author: 'Sarah Chen',
  //     title: 'Software Engineer',
  //     role: 'Now at Google',
  //     avatar: '👩‍💻'
  //   },
  //   {
  //     quote: 'I was nervous about my background, but DL created an incredibly inclusive environment where I felt valued and supported from day one.',
  //     author: 'Marcus Johnson',
  //     title: 'Product Manager',
  //     role: 'Now at Meta',
  //     avatar: '👨‍💼'
  //   },
  //   {
  //     quote: 'The projects were challenging and meaningful. I learned more in 6 months here than in years of academic study. Highly recommended!',
  //     author: 'Aisha Patel',
  //     title: 'Data Scientist',
  //     role: 'Now at Microsoft',
  //     avatar: '👩‍🔬'
  //   },
  //   {
  //     quote: 'The flexibility to work around my schedule while contributing to real projects was perfect. DL respects students and treats them as real team members.',
  //     author: 'James Lee',
  //     title: 'Full Stack Developer',
  //     role: 'Now at Stripe',
  //     avatar: '👨‍💻'
  //   },
  //   {
  //     quote: 'Best career decision I made as a student. The network I built, the skills I gained, and the confidence boost were all game-changers.',
  //     author: 'Priya Sharma',
  //     title: 'Business Development',
  //     role: 'Now at LinkedIn',
  //     avatar: '👩‍💼'
  //   },
  //   {
  //     quote: 'Beyond the work itself, the mentorship and guidance from experienced professionals shaped how I think about my career trajectory.',
  //     author: 'Daniel Martinez',
  //     title: 'Software Engineer',
  //     role: 'Now at Apple',
  //     avatar: '👨‍💻'
  //   }
  // ]

  return (
    // <section className="py-20 md:py-28 lg:py-32 relative bg-slate-50 dark:bg-slate-950/50">
    //   <div className="absolute inset-0 bg-gradient-to-b from-accent/3 via-transparent to-primary/3 pointer-events-none" />
      
    //   <div className="container relative z-10 px-4 md:px-6">
    //     <div className=" mx-auto text-center mb-16 md:mb-24">
    //       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
    //         {/* What Our Team Says */}
    //         From Interns to Professionals
    //       </h2>
    //       <p className="max-w-2xl text-center text-lg md:text-xl text-foreground/70 leading-relaxed">
    //         Don't just take our word for it—hear directly from the talented individuals who have grown their careers with Diverse Loopers.
    //       </p>
    //     </div>

    //     {/* Testimonials Grid */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    //       {testimonials.map((testimonial, index) => (
    //         <TestimonialCard
    //           key={index}
    //           quote={testimonial.quote}
    //           author={testimonial.author}
    //           title={testimonial.title}
    //           role={testimonial.role}
    //           avatar={testimonial.avatar}
    //         />
    //       ))}
    //     </div>

    //     {/* Bottom insight */}
    //     <div className="mt-16 md:mt-24 text-center">
    //       <div className="inline-block">
    //         <p className="text-lg md:text-xl text-foreground font-semibold mb-2">
    //           Thousands of careers transformed
    //         </p>
    //         <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-accent rounded-full" />
    //       </div>
    //     </div>
    //   </div>
    // </section>
    // <!-- Testimonials -->
<section className="py-24 bg-[#f8fafc]">
<div className="max-w-7xl mx-auto px-6">
<h2 className="text-4xl font-bold mb-16 text-center text-slate-900">From Interns to Professionals</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* <!-- Testimonial 1 --> */}
<div className="bg-white p-10 rounded-3xl border border-slate-50 flex flex-col gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
<div className="flex items-center gap-4">
<div className="size-12 rounded-full overflow-hidden bg-slate-200">
<img alt="David Chen" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEDqfjKdtambtSSGiFd_pnn-v1OZ2dOlc19wmfNkl5z-MA3slZ1vB76VXRym0I3pUFBSXbfsmkmS_34PXJz7iekbdHst2HeuiYu4gTXtK__Y4lPL595MiQix7FscJMIhKXjRztWjdwlMeXEo3n4VWqE5AdpD2fYFO2iBJQGa6mIdHzbVynI3uOf_TnDvyYRBCwEyKgePZTN_SRkNHZEKr_s-rAEx3-1Z8GCgoq-9AGwPy_a_uikXAGZ4fyqzcy-TO4JcxEHMn6zUE"/>
</div>
<div>
<h4 className="font-bold text-slate-900 text-sm">David Chen</h4>
<p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Senior Cloud Architect</p>
</div>
</div>
<p className="text-slate-500 italic leading-relaxed text-sm">"Diverse Loopers gave me the chance to work on actual infrastructure at scale when I was still in university. That hands-on experience was exactly what recruiters were looking for."</p>
</div>
{/* <!-- Testimonial 2 --> */}
<div className="bg-white p-10 rounded-3xl border border-slate-50 flex flex-col gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
<div className="flex items-center gap-4">
<div className="size-12 rounded-full overflow-hidden bg-slate-200">
<img alt="Sarah Jenkins" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAU-4VEHLUOEDCDpKHVEwkp_4EmuoZA3TIQ0UZHSZn1ur5axhTUjX4sXp66wSVQqih0d-ME2DpJsmyDQhzuInzCgWrCodMb0YTsuwnvp9zUTlmpZ8ykbBXxYwWHMKisQGhkXwFdtm4P5CoMuqUZ3GA84d6bmvIVePBm9oDMskTe2l6Y9QACLWGe1nVkpSBocQsLwNo37_1MKDZjEg1_OYy1B44vEVxbZqOHD7AXQPmPXTJKyllrWInDb1D4YM5Pjda5Lvgvgcu9fXU"/>
</div>
<div>
<h4 className="font-bold text-slate-900 text-sm">Sarah Jenkins</h4>
<p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Product Designer</p>
</div>
</div>
<p className="text-slate-500 italic leading-relaxed text-sm">"The mentorship here is unparalleled. I didn't just learn tools; I learned the 'why' behind product decisions and how to advocate for users in a business context."</p>
</div>
{/* <!-- Testimonial 3 --> */}
<div className="bg-white p-10 rounded-3xl border border-slate-50 flex flex-col gap-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
<div className="flex items-center gap-4">
<div className="size-12 rounded-full overflow-hidden bg-slate-200">
<img alt="Marcus Thorne" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfDlMiPw0UWTNI57I6TjlC6LZe-nAdkssH1iT-MypSxQJNhuoW81zN-r9y4usZd2GBFK-B_uKGu6gvTPa14arSnYVMraS92aZvAjpVtPg791-abHRMBr514d9SaKATE_pB_-YpmIBNZfleQ4rALJUbm8B_dqjiCvNSaqIT6aPemPvVArVc9wQw8fSBu2sNKxIZ5sV1_Nu4f7royBrc-dmRim8oKqZgbjEw_6iTpb2wLfmDWqL-C1n9z6K-wQkgwXXviIISM0zdZtM"/>
</div>
<div>
<h4 className="font-bold text-slate-900 text-sm">Marcus Thorne</h4>
<p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">SOC Lead</p>
</div>
</div>
<p className="text-slate-500 italic leading-relaxed text-sm">"Coming from a cybersecurity background, the 'Real Team' environment was vital. Running incident response drills as a student prepared me for the real world."</p>
</div>
</div>
</div>
</section>
  )
}
