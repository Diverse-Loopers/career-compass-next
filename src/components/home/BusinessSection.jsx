const deliveryPhases = [
  { id: "01", name: "Requirement", icon: "schedule", active: false },
  { id: "02", name: "Planning", icon: "format_list_bulleted", active: false },
  { id: "03", name: "Execution", icon: "dashboard_customize", active: false },
  { id: "04", name: "Delivery", icon: "check_circle", active: true },
];

const useCases = [
  { label: "Startup", title: "Build MVP quickly" },
  { label: "Company", title: "Internal tools" },
  { label: "Team", title: "Execution support" },
];

const stats = [
  { value: "500+", label: "Active clients" },
  { value: "1.2k", label: "Projects delivered" },
  { value: "8k+", label: "Workforce trained" },
  { value: "2k+", label: "Talent deployed" },
];

const services = [
  {
    title: "Custom software development",
    description: "Tailored digital architecture built for your unique operational scale.",
    icon: "code",
  },
  {
    title: "Dashboards & internal tools",
    description: "Visualize complex data and manage workflows with intuitive interfaces.",
    icon: "dashboard",
  },
  {
    title: "Automation systems",
    description: "Eliminate repetitive tasks with intelligent, reliable automated workflows.",
    icon: "sensors",
  },
  {
    title: "Trained workforce deployment",
    description: "Access elite professionals vetted through the ETS verification system.",
    icon: "group",
  },
];

export default function BusinessSection() {
  return (
    <section className="bg-slate-200/50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Badge */}
        <span className="bg-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 w-fit block">
          For Businesses
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Process & Stats */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* Phase Process Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-8">How we deliver</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {deliveryPhases.map((phase) => (
                  <div key={phase.id} className={`flex flex-col items-center gap-3 p-4 rounded-xl border hover:-translate-y-2 hover:shadow-md transition-all duration-300 cursor-default ${phase.active ? "bg-primary border-primary text-white" : "bg-slate-50 border-slate-100 hover:bg-slate-100/80"
                    }`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${phase.active ? "bg-white/20" : "bg-blue-50/50"
                      }`}>
                      <span className={`material-symbols-outlined text-xl ${phase.active ? "text-white" : "text-primary"}`}>
                        {phase.icon}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className={`text-[9px] font-bold uppercase tracking-wider mb-1 ${phase.active ? "text-white/60" : "text-slate-400"}`}>Phase {phase.id}</p>
                      <p className={`text-xs font-bold font-manrope ${phase.active ? "text-white" : "text-slate-900"}`}>{phase.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Use Cases Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-500">
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-6">Use cases</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {useCases.map((useCase, index) => (
                  <div key={index} className="group hover:-translate-y-1 transition-all duration-300 cursor-default hover:bg-slate-50 p-4 -ml-4 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{useCase.label}</p>
                    <p className="text-sm font-bold text-primary font-manrope group-hover:scale-105 transition-transform origin-left">{useCase.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="group hover:-translate-y-2 hover:scale-105 transition-all p-4 -m-4 text-center rounded-2xl hover:bg-white hover:shadow-xl border border-transparent hover:border-slate-100 cursor-default">
                  <p className="text-3xl font-extrabold text-slate-900 font-manrope mb-1 group-hover:text-primary transition-colors">{stat.value}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Title + Services */}
          <div className="space-y-12 order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-manrope text-slate-900 leading-tight tracking-tighter">
              Solutions That Actually Work.
            </h2>

            {/* Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-default">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                    <span className="material-symbols-outlined text-primary text-2xl font-variation-settings-fill-1 group-hover:scale-110 transition-transform">{service.icon}</span>
                  </div>
                  <h4 className="text-lg font-bold font-manrope text-slate-900 mb-3">{service.title}</h4>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed font-inter">{service.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="/business"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 text-lg inline-block"
            >
              Explore Business Solutions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
