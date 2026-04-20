// components/ui/DetailCard.jsx
// Reusable card that renders a list of label/value rows + optional file rows.
// Used by both the Preview page and the Saved Details page.

import { FileIcon } from "@/components/education-claim/ui/Icons";

// ─── Single text row ──────────────────────────────────────────────────────────
export function DetailRow({ label, value, missing }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-0.5 sm:gap-4 py-3.5 border-b border-gray-100 last:border-0">
      <span className="w-full sm:w-48 flex-shrink-0 text-[11px] font-bold tracking-widest uppercase text-gray-400">
        {label}
      </span>
      <span className={`text-[14px] font-medium ${missing ? "text-gray-300 italic" : "text-gray-900"}`}>
        {value || "—"}
      </span>
    </div>
  );
}

// ─── Single file row ──────────────────────────────────────────────────────────
export function FileRow({ label, file, required }) {
  const hasFile = !!file;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-4 py-3.5 border-b border-gray-100 last:border-0">
      <span className="w-full sm:w-48 flex-shrink-0 text-[11px] font-bold tracking-widest uppercase text-gray-400">
        {label}
        {!required && (
          <span className="ml-1.5 text-[10px] font-medium text-gray-300 normal-case tracking-normal">
            optional
          </span>
        )}
      </span>
      {hasFile ? (
        <div className="flex items-center gap-2">
          <span className="text-blue-700"><FileIcon /></span>
          <span className="text-[13px] font-medium text-gray-700">{file.name}</span>
          <span className="text-[12px] text-gray-400">
            ({(file.size / 1024).toFixed(0)} KB)
          </span>
        </div>
      ) : (
        <span className="text-[13px] text-gray-300 italic">No file uploaded</span>
      )}
    </div>
  );
}

// ─── Section heading inside card ──────────────────────────────────────────────
export function DetailSection({ title, children }) {
  return (
    <div className="mb-2">
      <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-1">
        {title}
      </p>
      <div>{children}</div>
    </div>
  );
}

// ─── The card shell ───────────────────────────────────────────────────────────
export default function DetailCard({ title, subtitle, badge, children }) {
  return (
    <div className="w-full max-w-[640px] min-w-0 bg-white rounded-2xl px-4 sm:px-9 py-8
      shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]">

      {/* Card header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h2 className="font-['DM_Sans'] text-[18px] font-bold text-gray-900 mb-1">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13px] text-gray-500 leading-relaxed">{subtitle}</p>
          )}
        </div>
        {badge && (
          <span className={`flex-shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide
            ${badge === "Verified"
              ? "bg-green-100 text-green-700"
              : badge === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-500"
            }`}>
            {badge}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-4" />

      {children}
    </div>
  );
}