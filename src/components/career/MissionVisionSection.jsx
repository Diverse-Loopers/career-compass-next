'use client'

// interface PillarProps {
//   title: string
//   description: string
//   points: string[]
// }

// function MissionPillar({ title, description, points }: PillarProps) {
//   return (
//     <div className="text-center">
//       <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{title}</h3>
//       <p className="text-foreground/70 mb-6 leading-relaxed">{description}</p>
//       <ul className="space-y-3">
//         {points.map((point, index) => (
//           <li key={index} className="text-sm md:text-base text-foreground/60">
//             ✓ {point}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

export default function MissionVisionSection() {
  return (
    // <section className="py-20 md:py-28 lg:py-32 relative bg-slate-50 dark:bg-slate-950/50">
    //   <div className="absolute inset-0 bg-gradient-to-b from-accent/3 via-transparent to-primary/3 pointer-events-none" />
      
    //   <div className="container relative z-10 px-4 md:px-6">
    //     {/* Header */}
    //     <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
    //       <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
    //         Our Mission & Values
    //       </h2>
    //       <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
    //         Everything we do at Diverse Loopers is guided by our commitment to empowering students and creating equitable opportunities for professional growth.
    //       </p>
    //     </div>

    //     {/* Mission & Vision Cards */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
    //       {/* Mission */}
    //       <div className="group p-8 md:p-12 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-500">
    //         <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
    //           <span className="text-2xl">🎯</span>
    //         </div>
    //         <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h3>
    //         <p className="text-foreground/70 leading-relaxed mb-6">
    //           To democratize access to meaningful career experiences by connecting diverse students with real-world opportunities where they can learn, grow, and make immediate impact.
    //         </p>
    //         <div className="space-y-3">
    //           <p className="flex items-start gap-3 text-foreground/60">
    //             <span className="text-primary font-bold">→</span>
    //             <span>Provide real, valuable work experiences</span>
    //           </p>
    //           <p className="flex items-start gap-3 text-foreground/60">
    //             <span className="text-primary font-bold">→</span>
    //             <span>Bridge the gap between education and industry</span>
    //           </p>
    //           <p className="flex items-start gap-3 text-foreground/60">
    //             <span className="text-primary font-bold">→</span>
    //             <span>Create pathways for all to succeed</span>
    //           </p>
    //         </div>
    //       </div>

    //       {/* Vision */}
    //       <div className="group p-8 md:p-12 rounded-2xl border border-accent/20 bg-accent/5 hover:bg-accent/10 hover:border-accent/40 transition-all duration-500">
    //         <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
    //           <span className="text-2xl">🌟</span>
    //         </div>
    //         <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Vision</h3>
    //         <p className="text-foreground/70 leading-relaxed mb-6">
    //           A world where talent matters more than background, where every student has access to opportunities, and where diverse perspectives drive innovation in every organization.
    //         </p>
    //         <div className="space-y-3">
    //           <p className="flex items-start gap-3 text-foreground/60">
    //             <span className="text-accent font-bold">→</span>
    //             <span>Empower the next generation of leaders</span>
    //           </p>
    //           <p className="flex items-start gap-3 text-foreground/60">
    //             <span className="text-accent font-bold">→</span>
    //             <span>Champion diversity and inclusion</span>
    //           </p>
    //           <p className="flex items-start gap-3 text-foreground/60">
    //             <span className="text-accent font-bold">→</span>
    //             <span>Transform how companies discover talent</span>
    //           </p>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Core Values */}
    //     <div className="max-w-4xl mx-auto">
    //       <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
    //         Our Core Values
    //       </h3>
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    //         <MissionPillar
    //           title="Equity"
    //           description="We believe in fair and equal access to opportunities"
    //           points={[
    //             'Remove barriers to entry',
    //             'Support underrepresented groups',
    //             'Transparent and merit-based'
    //           ]}
    //         />
    //         <MissionPillar
    //           title="Excellence"
    //           description="We strive for the highest quality in everything"
    //           points={[
    //             'High standards for all',
    //             'Continuous improvement',
    //             'Best-in-class experiences'
    //           ]}
    //         />
    //         <MissionPillar
    //           title="Integrity"
    //           description="We act with honesty and strong moral principles"
    //           points={[
    //             'Transparent communication',
    //             'Keep our commitments',
    //             'Ethical decision-making'
    //           ]}
    //         />
    //         <MissionPillar
    //           title="Impact"
    //           description="We measure success by the difference we make"
    //           points={[
    //             'Real-world outcomes',
    //             'Meaningful contributions',
    //             'Lasting relationships'
    //           ]}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>
    // <!-- Mission & Vision Statement -->
<section className="py-24 px-8 bg-surface-container-low">
<div className="max-w-4xl mx-auto text-center">
<h2 className="text-sm font-bold tracking-[0.2em] uppercase text-primary mb-6">Our Mission</h2>
<p className="text-3xl md:text-4xl font-semibold leading-snug text-on-surface">To democratize professional growth by creating a world-class ecosystem where student potential meets real-world execution.</p>
 <div className="mt-12 flex justify-center gap-4">
{/* <div className="w-12 h-1 bg-primary rounded-full"></div> */}
 <div className="w-72 h-1 bg-primary/30 rounded-full"></div>
{/*<div className="w-4 h-1 bg-primary/10 rounded-full"></div> */}
</div>
</div>
</section>
  )
}
