import Image from "next/image";

const journeySteps = [
  {
    icon: "school",
    title: "Student Phase",
    description: "Foundation and skill mapping",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "dashboard_customize",
    title: "Real Projects",
    description: "Execution-based learning",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: "person_celebrate",
    title: "Expert Mentorship",
    description: "Industry-led feedback loops",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: "verified",
    title: "Verified Portfolio",
    description: "Evidence of capability",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: "shield",
    title: "Professional Identity",
    description: "ETS Global Certification outcome",
    color: "bg-blue-900 text-blue-200",
    isDark: true,
  },
];

export default function StudentSection() {
  return (
    <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Badge */}
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 w-fit">
            For Students
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Content */}
          <div className="space-y-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-manrope text-slate-900 leading-tight tracking-tighter">
              Start as a Student.<br />Grow into a Professional.
            </h2>

            {/* Checklist */}
            <ul className="space-y-6">
              {["Work on real projects", "Learn industry skills", "Build a real portfolio", "Earn opportunities based on performance"].map((item, index) => (
                <li key={index} className="flex items-center gap-4 text-slate-800 font-medium text-lg group p-2 -ml-2 rounded-xl hover:bg-slate-200/50 hover:translate-x-2 transition-all cursor-default">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0 group-hover:scale-125 group-hover:shadow-lg transition-transform">
                    <span className="material-symbols-outlined text-white text-sm font-bold">check</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* Tools Card */}
            <div className="bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 space-y-6">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Tools to move forward</p>
              <div className="divide-y divide-slate-100">
                <a href="https://www.diverseloopers.com/career-analyzer" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center py-4 px-4 -mx-4 group cursor-pointer hover:bg-white/60 hover:shadow-sm rounded-xl hover:translate-x-1 transition-all duration-300">
                  <span className="font-bold text-primary font-manrope text-lg">Career Analyzer <span className="font-normal opacity-40 ml-1 group-hover:opacity-100 group-hover:translate-x-1 inline-block transition-all">→</span></span>
                  <span className="text-sm text-slate-500 font-medium">for career clarity</span>
                </a>
                <a href="https://www.diverseloopers.com/analyzer" target="_blank" rel="noopener noreferrer" className="flex justify-between items-center py-4 px-4 -mx-4 group cursor-pointer hover:bg-white/60 hover:shadow-sm rounded-xl hover:translate-x-1 transition-all duration-300">
                  <span className="font-bold text-primary font-manrope text-lg">Path Analyzer <span className="font-normal opacity-40 ml-1 group-hover:opacity-100 group-hover:translate-x-1 inline-block transition-all">→</span></span>
                  <span className="text-sm text-slate-500 font-medium">for structured roadmap</span>
                </a>
              </div>
            </div>

            <p className="text-primary font-bold tracking-wide text-lg sm:text-xl">10K+ students reached</p>

            <a
              href="/students"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3730A3] text-white px-10 py-4 rounded-full font-bold shadow-2xl shadow-indigo-900/20 hover:shadow-indigo-900/30 transition-all hover:scale-105 active:scale-95 text-lg inline-block"
            >
              Explore Student Journey →
            </a>
          </div>

          {/* Right Column: Timeline */}
          <div className="space-y-2 relative">
            <div className="absolute left-6 lg:left-8 top-10 bottom-10 w-px bg-slate-200" />
            {journeySteps.map((step, index) => (
              <div key={index} className="flex gap-6 lg:gap-8 items-stretch group relative z-10">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${step.color}`}>
                    <span className={`material-symbols-outlined text-2xl lg:text-3xl ${step.isDark ? "font-variation-settings-fill-1" : ""}`}>
                      {step.icon}
                    </span>
                  </div>
                </div>
                <div className={`flex-1 rounded-2xl p-5 lg:p-6 mb-4 border transition-all duration-300 group-hover:translate-x-2 ${step.isDark ? "bg-[#1E1B4B] border-[#1E1B4B] text-white shadow-xl shadow-indigo-900/10" : "bg-white border-slate-100/50 shadow-sm hover:shadow-md"
                  }`}>
                  <h4 className={`text-lg lg:text-xl font-bold font-manrope mb-1 ${step.isDark ? "text-white" : "text-slate-900"}`}>{step.title}</h4>
                  <p className={`text-sm lg:text-base font-medium ${step.isDark ? "text-indigo-200" : "text-slate-400"}`}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
