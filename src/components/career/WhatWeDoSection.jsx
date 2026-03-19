// 'use client'

// import { Briefcase, Users, Zap, Award } from 'lucide-react'

// interface FeatureCardProps {
//   icon: React.ReactNode
//   title: string
//   description: string
//   delay: string
// }

// function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
//   return (
//     <div className={`group p-8 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ${delay}`}>
//       <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
//         <span className="text-primary">{icon}</span>
//       </div>
//       <h3 className="text-lg font-semibold text-foreground mb-3">{title}</h3>
//       <p className="text-foreground/60 leading-relaxed text-sm md:text-base">{description}</p>
//     </div>
//   )
// }

// export default function WhatWeDoSection() {
//   const features = [
//     {
//       icon: <Briefcase className="w-6 h-6" />,
//       title: 'Real Projects',
//       description: 'Students work on actual business challenges from leading companies and innovative startups.',
//       delay: 'hover:translate-y-[-4px]'
//     },
//     {
//       icon: <Users className="w-6 h-6" />,
//       title: 'Expert Mentorship',
//       description: 'Learn from industry professionals who guide your growth and career development.',
//       delay: 'hover:translate-y-[-4px]'
//     },
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: 'Fast-Track Growth',
//       description: 'Accelerate your career with hands-on experience that sets you apart from peers.',
//       delay: 'hover:translate-y-[-4px]'
//     },
//     {
//       icon: <Award className="w-6 h-6" />,
//       title: 'Recognized Impact',
//       description: 'Build a portfolio of achievements that impresses future employers and investors.',
//       delay: 'hover:translate-y-[-4px]'
//     }
//   ]

//   return (
//     <section className="py-20 md:py-28 lg:py-32 relative">
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      
//       <div className="container relative z-10 px-4 md:px-6">
//         <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
//             What We Do
//           </h2>
//           <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
//             At Diverse Loopers, we create meaningful opportunities for students to gain real-world experience while helping companies find fresh talent and innovative perspectives.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//           {features.map((feature, index) => (
//             <FeatureCard
//               key={index}
//               icon={feature.icon}
//               title={feature.title}
//               description={feature.description}
//               delay={feature.delay}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

import { Briefcase, Users, Layers, Sparkles } from "lucide-react";

export default function WhatWeDo() {
  return (
    <section className="relative bg-[#F5F7FB] py-24 overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-indigo-200 opacity-20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-200 opacity-20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>
          <p className="text-sm text-indigo-600 font-medium mb-3">
            How it works
          </p>

          <h2 className="text-4xl font-semibold text-gray-900 leading-tight mb-6">
            We don’t just teach. <br />
            We build professionals.
          </h2>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            At Diverse Loopers, students don’t learn through theory alone. 
            They work on real business problems, collaborate in teams, and 
            grow under mentorship — just like in real companies.
          </p>

          <p className="text-sm text-gray-500 font-medium">
            From learning → execution → professional growth
          </p>
        </div>

        {/* RIGHT SIDE (Staggered Cards) */}
        <div className="relative">

          {/* Card 1 */}
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Real Business Projects
                </h3>
                <p className="text-sm text-gray-600">
                  Work on live projects from real companies — not assignments or simulations.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative z-20 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 ml-8 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Mentorship That Guides Execution
                </h3>
                <p className="text-sm text-gray-600">
                  Learn how professionals think, build, and deliver with guidance from experts.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative z-10 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-green-50 text-green-600">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Work Like a Real Team
                </h3>
                <p className="text-sm text-gray-600">
                  Collaborate, communicate, and execute just like in real organizations.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="relative z-0 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 ml-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Build a Portfolio That Matters
                </h3>
                <p className="text-sm text-gray-600">
                  Showcase real impact and real work — not just certificates.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}