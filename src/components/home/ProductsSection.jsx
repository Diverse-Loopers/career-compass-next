import IdentityCard from "./IdentityCard";

export default function ProductsSection() {
  return (
    <section className="bg-slate-200/50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold font-manrope text-slate-900 tracking-tight">Our Products</h2>

        {/* CORE PRODUCT CARD — full width */}
        <div className="bg-[#E8EDF8] border border-[#D0D9EF] rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center overflow-hidden relative group">
          {/* Left Column: Content */}
          <div className="space-y-8 relative z-10">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase w-fit block">
              Golden Product
            </span>

            <h3 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold font-manrope text-slate-900 leading-tight tracking-tighter">
              The ETS Professional<br />Identity.
            </h3>

            <div className="space-y-2">
              <p className="text-lg font-bold text-slate-600">Hiring takes time. Verification is expensive.</p>
              <p className="text-xl font-extrabold text-primary">ETS makes it instant.</p>
            </div>

            {/* Bullets */}
            <ul className="space-y-4">
              {["Verified profiles", "Verified employment", "Trusted identity"].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-700 font-bold text-base sm:text-lg group hover:translate-x-2 transition-transform cursor-default">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 group-hover:scale-[2.5] group-hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all duration-300" />
                  <span className="group-hover:text-slate-900 transition-colors">{item}</span>
                </li>
              ))}
            </ul>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-12 py-8 border-y border-[#C7D2E8]">
              {[
                { value: "99.9%", label: "Verification Accuracy" },
                { value: "500+", label: "Global Partners" }
              ].map((stat, index) => (
                <div key={index} className="group hover:-translate-y-1 hover:scale-105 transition-all cursor-default p-4 -ml-4 rounded-2xl hover:bg-white/50 hover:shadow-sm border border-transparent hover:border-white/60">
                  <p className="text-3xl font-extrabold text-primary font-manrope mb-1 group-hover:text-indigo-800 transition-colors">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">{stat.label}</p>
                </div>
              ))}
            </div>
<a href="/comming-soon">
            <button 
          
            className="bg-indigo-700 text-white px-10 py-4 rounded-full font-bold shadow-2xl shadow-indigo-900/20 hover:shadow-indigo-900/30 transition-all hover:scale-105 active:scale-95 text-lg">
              Explore ETS →
            </button>
            </a>
          </div>

          {/* Right Column: Identity Card Decoration */}
          <div className="flex items-center justify-center relative z-10 scale-90 sm:scale-100 lg:scale-110 lg:translate-x-10 transition-transform duration-700 group-hover:translate-x-5">
            <IdentityCard
              name="Arjun V. Kulkarni"
              refId="DL-8842-ETS-01"
              skillIndex="Top 2%"
              status="Active Professional"
            />
          </div>

          {/* Abstract background shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* TWO SMALLER CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Career Analyzer */}
          <div className="bg-white border border-slate-200 rounded-3xl p-10 hover:shadow-xl transition-shadow group">
            <a
              href="/career-analyzer"
              rel="noopener noreferrer"
            >
              <h4 className="text-2xl font-extrabold font-manrope text-slate-900 mb-4 group-hover:text-primary transition-colors">
                Career Analyzer
              </h4>
            </a>
            <p className="text-lg text-slate-500 font-medium mb-8 leading-relaxed">Confused about your career path?</p>
            <a href="/career-analyzer" className="inline-flex items-center gap-2 group text-green-600 font-bold hover:gap-4 transition-all text-lg">
              Get clarity instantly
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
          </div>

          {/* Path Analyzer */}
          <div className="bg-white border border-slate-200 rounded-3xl p-10 hover:shadow-xl transition-shadow group">
            <a
              href="/analyzer"
              rel="noopener noreferrer"
            >
              <h4 className="text-2xl font-extrabold font-manrope text-slate-900 mb-4 group-hover:text-primary transition-colors">
                Path Analyzer
              </h4>
            </a>
            <p className="text-lg text-slate-500 font-medium mb-8 leading-relaxed">Stuck in preparation?</p>
            <a href="/analyzer" className="inline-flex items-center gap-2 group text-green-600 font-bold hover:gap-4 transition-all text-lg">
              Get a complete roadmap
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
