'use client'
import { FaUserGraduate, FaTrophy } from "react-icons/fa";

// interface TimelineItemProps {
//   period: string
//   title: string
//   description: string
//   highlights: string[]
// }

// function TimelineItem({ period, title, description, highlights }: TimelineItemProps) {
//   return (
//     <div className="relative">
//       {/* Timeline dot and line */}
//       <div className="flex gap-8">
//         <div className="relative flex flex-col items-center">
//           <div className="w-4 h-4 rounded-full bg-primary border-4 border-background dark:border-slate-950 z-10 relative" />
//           <div className="w-1 h-full bg-gradient-to-b from-primary/50 to-transparent absolute top-6" />
//         </div>
        
//         {/* Content */}
//         <div className="pb-12 flex-1">
//           <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">{period}</p>
//           <h4 className="text-xl md:text-2xl font-bold text-foreground mb-3">{title}</h4>
//           <p className="text-foreground/70 leading-relaxed mb-4">{description}</p>
//           <ul className="space-y-2">
//             {highlights.map((highlight, index) => (
//               <li key={index} className="flex gap-3 text-foreground/60 text-sm">
//                 <span className="text-accent font-bold">•</span>
//                 <span>{highlight}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

export default function GrowthTimelineSection() {
  // const timeline = [
  //   {
  //     period: 'Months 1-3',
  //     title: 'Foundation & Onboarding',
  //     description: 'Get up to speed with comprehensive onboarding, meet your team, and start your first projects.',
  //     highlights: [
  //       'Orientation and culture immersion',
  //       'Technology stack training',
  //       'Meet mentors and team leads',
  //       'Complete first micro-project'
  //     ]
  //   },
  //   {
  //     period: 'Months 4-6',
  //     title: 'Building Skills',
  //     description: 'Take on more complex projects and responsibilities as you develop domain expertise.',
  //     highlights: [
  //       'Own a major project component',
  //       'Receive structured feedback',
  //       'Expand technical skills',
  //       'Lead code reviews'
  //     ]
  //   },
  //   {
  //     period: 'Months 7-9',
  //     title: 'Demonstrating Impact',
  //     description: 'Showcase your growth through significant contributions and leadership in team initiatives.',
  //     highlights: [
  //       'Lead cross-functional project',
  //       'Mentor new team members',
  //       'Present work to stakeholders',
  //       'Career development planning'
  //     ]
  //   },
  //   {
  //     period: 'Months 10-12',
  //     title: 'Career Advancement',
  //     description: 'Celebrate your achievements and plan your next career moves with confidence.',
  //     highlights: [
  //       'Comprehensive performance review',
  //       'Discuss advancement opportunities',
  //       'Build professional network',
  //       'Shape your career path'
  //     ]
  //   }
  // ]

  return (
    // <section className="py-20 md:py-28 lg:py-32 relative">
    //   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      
    //   <div className="container relative z-10 px-4 md:px-6">
    //     <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
    //       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
    //         Your Growth Journey
    //       </h2>
    //       <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
    //         We've designed a clear progression path to help you develop, achieve, and advance in your career throughout your time with us.
    //       </p>
    //     </div>

    //     {/* Timeline */}
    //     <div className="max-w-2xl mx-auto">
    //       {timeline.map((item, index) => (
    //         <TimelineItem
    //           key={index}
    //           period={item.period}
    //           title={item.title}
    //           description={item.description}
    //           highlights={item.highlights}
    //         />
    //       ))}
    //     </div>

    //     {/* Bottom CTA */}
    //     <div className="mt-16 md:mt-24 text-center">
    //       <div className="inline-block p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
    //         <p className="text-foreground/70 mb-4">
    //           This timeline is a guide—your growth journey may be faster or take different directions based on your pace and aspirations.
    //         </p>
    //         <p className="text-sm text-foreground/60">
    //           We're committed to supporting your development every step of the way.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    // <!-- Culture & Programs Insights -->
<section className="py-24 px-8 max-w-7xl mx-auto">
<div className="grid lg:grid-cols-3 gap-8">
<div className="lg:col-span-2 space-y-8">
<div className="p-8 bg-surface-container-lowest rounded-3xl flex gap-8 items-center group bg-white">
{/* <div className="w-24 h-24 rounded-2xl bg-tertiary-container/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl text-tertiary" data-icon="code_blocks">{"<>"}</span>
</div> */}
<div className="bg-gray-200 p-4 rounded-xl">
          <FaUserGraduate className="text-blue-600 text-xl" />
        </div>
<div>
<h3 className="text-2xl font-bold mb-2 ">Personal Mentorship</h3>
<p className="text-on-surface-variant">Every looper is paired with a senior professional for weekly 1-on-1 career mapping and technical deep dives.</p>
</div>
</div>
<div className="p-8 bg-surface-container-lowest rounded-3xl flex gap-8 items-center bg-white">
{/* <div className="w-24 h-24 rounded-2xl bg-secondary-container/20 flex items-center justify-center shrink-0 overflow-hidden">
<img alt="Mentorship" className="w-full h-full object-cover" data-alt="Abstract soft focus workspace" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY8tee0Aj_0_ScvDJA1VyzxQ6EkfET001C0OFU4Mr7WdsZ9KN82UKqr4bD89SqYrergIqWLnSYoR8bLnSX0MV2yybCpMV7n_sNALLEDhFuECJPuTSGz7kzCwvtn4HUcZ7fCv3CN_8U0MaMRVHYRnbES9oLrYff8R5Jh3PC5tJzhKG5CfKJyaGGjk96mVz_kkLdIqZ5gom6Yk5yqbTqD_HYxs_R67m7cETYY4a0dp3cNbWp8dOREgKd8tuVJaA4M7Eyu90lCQGbZl8"/>
</div> */}
<div className="bg-gray-200 p-4 rounded-xl">
          <FaTrophy className="text-blue-600 text-xl" />
        </div>
<div>
<h3 className="text-2xl font-bold mb-2">The Wall of Fame</h3>
<p className="text-on-surface-variant">Our digital and physical monument celebrating those who made the leap from students to industry-leading professionals.</p>
</div>
</div>
</div>
<div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col bg-white">
<h3 className="text-2xl font-bold mb-6">Global Offsites</h3>
<div className="h-48 w-full bg-slate-100 rounded-2xl mb-6 overflow-hidden">
<img alt="Offsite" className="w-full h-full object-cover" data-alt="Team having a social gathering at sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD21VtuAxtqxh6iz6ZjJ3o6splMNNlYjdPCpXz8GqpYlW87wY9zQ0sPqrscXOn5UEXj6eNnNeBnTJsA7-MbEifahMdItyUSQJ_-_XL4sWVMIxYBGxl5DA3KWsZILlp8CWQl_nO9mWSNLjsJjWtxbKPrrysBjoiuFGKKUJccEWTkp_rdBeFKkTUnO_L5h79QMIJ_XCAtt0DAM64dn8-rzAFA-7Zrp1ocGbKbBLnQuj3W5go2bAQnq6D-_9HIWdc82-f8ZRh0icxnggI"/>
</div>
<p className="text-on-surface-variant mb-auto">Twice a year, we gather the global cohort in inspiring locations to reset and reconnect.</p>
{/* <div className="mt-8 flex -space-x-3">
<img alt="User" className="w-10 h-10 rounded-full border-4 border-white object-cover" data-alt="Team member headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjFflJdL3GliGIWI5EnsA7XHrfBaczFeqNopAIkRnB8t7iMHSpHAMO0yH7ls7Q5PDku0AJMiFdHwvKeimNEQ7hpAagnXmTDGp0J9YX7NZFz3h0NYg4y3VYyP2qQ_phDBKjDBAIx8KvPowcpdUsJRer7JAFTyIMoCRkMLQWr8vTUa61dmRK1FbjtV27kDLIQeBcKTgL420Nx-la-ScZFER__l4HNaPe1fdatslpZ-Q-w4xskldLo1mk_DW7eZwcMHOF4DFE0bF6IBE"/>
<img alt="User" className="w-10 h-10 rounded-full border-4 border-white object-cover" data-alt="Team member headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0pA44LKOTMClp5kTqlKJ4lrEZWs79mcjtEfceLkIOwpEHcIrU5NxST0g2c5fsZ6Ily0EhK_Z3CCEsU8DhHPmbnr2Ncq0C0PoRThPubIYq_Q-Qu6itIhNhrXRMWnZGtxIbEOKibbP36N-is6EHpO1HnMnrj7zc9d-t_eAFYx7dUx1MrBiY3c43u8O4chyavUmBpqmiBEA1gE_6DdRhQGlcvjjC--BnYZaf3O9ouW1gqCmW6tew_p05dgtV-GFg0Zt5SvmS9LqP-zA"/>
<img alt="User" className="w-10 h-10 rounded-full border-4 border-white object-cover" data-alt="Team member headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO1kyjsPfUlk4-NiwisLTI8BEEJ7OnCQhjVbUor2XgW7Qbvd8oPcAA-jDAAgHlmc7RYT0Did2-zzj5UqsCz56oc65KqCSuhd_7rprju4GRG17Tjha06_O-zddw2Mk7mwpFHL00B3ZrjZeLonoMBAmU3P_SA57IQgeRnuC3bu1TvAlrvtrYyi9tvfANr9O2VTNA1mtOpwR5iu2S2qvklDTRbUOjohWvoQwpmnJo9gP8zeeYCTzR5e6KelwmBjti9SDW-GxQ9vuBrSM"/>
<div className="w-10 h-10 rounded-full border-4 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">+12</div>
</div> */}
</div>
</div>
</section>
  )
}
