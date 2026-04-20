const services = [
   { title: "Workshops & live sessions", description: "Engaging industry-led sessions that bridge theory and practice." },
   { title: "Hands-on practical labs", description: "Guided execution in real environments, giving students tangible building experience." },
   { title: "Curriculum & program support", description: "Tailored academic integration that aligns classroom learning with market needs." },
   { title: "Mentorship from industry professionals", description: "Direct guidance from veterans currently leading in their fields." },
];

export default function InstituteSection() {
   return (
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
         <div className="max-w-7xl mx-auto space-y-16">
            {/* Section Badge */}
            <span className="bg-green-50 text-green-600 border border-green-100 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 w-fit block">
               For Institutes
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
               {/* Left Column: Headline + Services + Stats */}
               <div className="space-y-12">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-manrope text-slate-900 leading-tight tracking-tighter">
                     Industry Meets Education.
                  </h2>

                  {/* Service List */}
                  <div className="space-y-8">
                     {services.map((service, index) => (
                        <div key={index} className="flex gap-4 items-start group p-3 -ml-3 rounded-2xl hover:bg-green-50/80 hover:scale-105 hover:shadow-sm transition-all cursor-default">
                           <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 mt-2 group-hover:scale-[1.8] group-hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all duration-300" />
                           <div>
                              <h4 className="text-lg lg:text-xl font-bold font-manrope text-slate-900 mb-1 group-hover:text-green-800 transition-colors">{service.title}</h4>
                              <p className="text-sm lg:text-base font-medium text-slate-400 font-inter leading-relaxed">{service.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8 py-8 border-y border-slate-100">
                     {[
                        { label: "Partner institutes", value: "Nationwide network" },
                        { label: "Workshops conducted", value: "Live execution" },
                        { label: "Students impacted", value: "Career outcomes" }
                     ].map((stat, index) => (
                        <div key={index} className="group hover:-translate-y-1 hover:scale-105 transition-all p-3 -ml-3 rounded-2xl hover:bg-slate-50 cursor-default">
                           <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.label}</p>
                           <p className="text-sm lg:text-base font-extrabold text-slate-900 font-manrope leading-tight group-hover:text-primary transition-colors">{stat.value}</p>
                        </div>
                     ))}
                  </div>

                  {/* CTA */}
                  <a
                     href="/institute"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-lg inline-block"
                  >
                     Explore Institute Programs →
                  </a>
               </div>

               {/* Right Column: Bento Grid */}
               <div className="grid grid-cols-2 gap-4">
                  {/* Box 1: Tall */}
                  <div className="row-span-2 bg-green-50 border border-green-100 rounded-3xl p-8 flex flex-col justify-between group transition-all hover:bg-green-100/50">
                     <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-10 shadow-lg shadow-green-500/20">
                        <span className="material-symbols-outlined text-white">school</span>
                     </div>
                     <div>
                        <h4 className="text-xl font-extrabold text-green-900 font-manrope mb-2">Institute Learning</h4>
                        <p className="text-sm font-medium text-green-700/80 leading-relaxed font-inter">Where the journey begins — structured curriculum mapped to industry.</p>
                     </div>
                  </div>

                  {/* Box 2: Dark */}
                  <div className="bg-slate-900 rounded-3xl p-6 flex flex-col justify-between group transition-all hover:scale-[1.02]">
                     <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-teal-300 text-xl font-variation-settings-fill-1">event_seat</span>
                     </div>
                     <h4 className="text-lg font-bold text-white font-manrope leading-tight">Workshops<br />& Labs</h4>
                  </div>

                  {/* Box 3: White Border */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between group transition-all hover:shadow-xl">
                     <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-amber-600 text-xl font-variation-settings-fill-1">explore</span>
                     </div>
                     <h4 className="text-lg font-bold text-slate-900 font-manrope leading-tight">Real-World<br />Exposure</h4>
                  </div>

                  {/* Box 4: Wide Blue */}
                  <div className="col-span-2 bg-blue-50 border border-blue-100 rounded-3xl p-8 flex items-center justify-between group transition-all hover:bg-blue-100/50">
                     <div className="space-y-4">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                           <span className="material-symbols-outlined text-white text-xl">trending_up</span>
                        </div>
                        <div>
                           <h4 className="text-lg font-extrabold text-blue-900 font-manrope mb-1">Skill Development</h4>
                           <p className="text-sm font-medium text-blue-600/80 font-inter">Structured growth mapped to outcomes</p>
                        </div>
                     </div>
                     <div className="text-right sr-only sm:not-sr-only">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-1">Final outcome</p>
                        <p className="text-lg font-extrabold text-blue-900 font-manrope">Career Readiness</p>
                     </div>
                  </div>

                  {/* Box 5: Wide Green Final */}
                  <div className="col-span-2 bg-green-500 rounded-3xl p-6 sm:p-8 flex items-center justify-between group transition-all hover:shadow-2xl hover:shadow-green-500/20">
                     <div className="flex items-center gap-4 sm:gap-6">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                           <span className="material-symbols-outlined text-white text-3xl font-variation-settings-fill-1">verified</span>
                        </div>
                        <div>
                           <h4 className="text-xl font-extrabold text-white font-manrope mb-1">ETS Verified Placement</h4>
                           <p className="text-sm font-medium text-green-100 font-inter">Global certification for every student</p>
                        </div>
                     </div>
                     <span className="material-symbols-outlined text-white/50 text-2xl group-hover:translate-x-2 transition-transform hidden sm:block">arrow_forward</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
