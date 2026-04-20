import Image from "next/image";

// IdentityCardProps {
//   name: string;
//   refId: string;
//   skillIndex: string;
//   status: string;
//   imageUrl?: string;
// }

export default function IdentityCard({
  name,
  refId,
  skillIndex,
  status,
  imageUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
}) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl shadow-primary/5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
             <span className="material-symbols-outlined text-green-600 text-2xl font-variation-settings-fill-1">verified</span>
          </div>
          <span className="text-[9px] font-bold text-green-600 uppercase tracking-[0.2em] font-inter">Verified ETS ID</span>
        </div>
        {/* QR Placeholder */}
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg grid grid-cols-2 gap-1 p-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
           <div className="bg-slate-300 rounded-sm" />
           <div className="bg-slate-100 rounded-sm" />
           <div className="bg-slate-100 rounded-sm" />
           <div className="bg-slate-300 rounded-sm" />
        </div>
      </div>

      {/* Profile Row */}
      <div className="flex gap-6 items-start mb-8 pb-8 border-b border-slate-50">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0 border-2 border-slate-50 shadow-sm">
           <Image src={imageUrl} width={80} height={80} alt={name} className="object-cover h-full w-full" />
        </div>
        <div className="space-y-4">
           <div>
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-1 font-inter">Full Name</p>
              <p className="text-[17px] font-bold text-slate-900 font-inter tracking-tight leading-tight">{name}</p>
           </div>
           <div>
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-1 font-inter">Employee Ref</p>
              <p className="text-[12.5px] font-medium text-slate-600 tracking-[0.12em] font-inter">{refId}</p>
           </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-8">
        <div>
           <p className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-2 font-inter">Skill Index</p>
           <p className="text-[20px] font-bold text-green-600 font-inter tracking-tight leading-none">{skillIndex}</p>
        </div>
        <div>
           <p className="text-[9.5px] font-semibold uppercase tracking-[0.15em] text-slate-500 mb-2 font-inter">Status</p>
           <p className="text-[11px] font-bold text-primary font-inter leading-tight uppercase tracking-wider">{status}</p>
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}
