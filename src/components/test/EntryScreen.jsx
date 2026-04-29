

import { useEffect, useState } from "react";

export default function EntryScreen({ 
  onStart, 
  onLogout,
  candidateName, 
  jobTitle, 
  testTitle, 
  instructions, 
  questions,
  questionCount, 
  examLocked, 
  examStartTime,
  durationMins,
  // FIX: two new props from page.jsx for start feedback
  startError,   // string | null — shown below the button on API failure
  starting,     // bool — disables button + shows spinner during API call
}) {

  const META_ITEMS = [
    { value: `${durationMins} min`,                   label: "Duration" },
    { value: questionCount || questions.length,        label: "Questions" },
    { value: "Written",                                label: "Format" },
  ];

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`relative min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 py-16
        bg-gradient-to-br from-indigo-50 via-slate-50 to-white
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >

<div className="absolute top-6 right-6">
  <button
    onClick={() => {
  if (confirm("Are you sure you want to logout?")) {
    onLogout();
  }
}}
    className="text-[12px] font-medium text-slate-400 hover:text-red-500 transition-colors"
  >
    Logout
  </button>
</div>

      <div className="max-w-[520px] w-full text-center">

        {/* Job label */}
        <div className="inline-block font-mono text-[11px] tracking-widest uppercase text-indigo-500 bg-indigo-50 border border-indigo-200 px-3.5 py-1 rounded-md mb-6">
          {jobTitle}
        </div>

        {/* Title */}
        <h1 className="text-[clamp(28px,5vw,38px)] font-bold text-[#1a1a2e] leading-tight tracking-tight mb-4">
          {testTitle}
        </h1>

        {/* Instructions */}
        {/* <p className="text-[15px] text-slate-500 leading-relaxed max-w-[440px] mx-auto mb-10">
          {instructions}
        </p> */}
        {/* Instructions */}
{(() => {
  const parts = instructions.split("\n\nImportant:");

  const mainInstruction = parts[0];
  const importantPart = parts[1];

  return (
    <>
      {/* Main instruction */}
      <p className="text-[15px] text-slate-500 leading-relaxed max-w-[440px] mx-auto mb-8">
        {mainInstruction}
      </p>

      {/* Important Guidelines Box */}
      {importantPart && (
        <div className="text-left bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10">
          <p className="text-[13px] font-semibold text-amber-800 mb-3">
            Important Guidelines
          </p>

          <ul className="list-disc pl-5 space-y-2 text-[13px] text-amber-700">
            {importantPart
              .split("\n")
              .filter(line => line.trim())
              .map((line, i) => (
                <li key={i}>
                  {line.replace("•", "").trim()}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
})()}

        {/* Meta strip */}
        <div className="flex items-center justify-center gap-8 mb-10 flex-wrap">
          {META_ITEMS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-mono text-xl font-semibold text-indigo-700 leading-none">
                {value}
              </div>
              <div className="text-[11px] text-slate-400 tracking-widest uppercase mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Candidate acknowledgement */}
        <p className="text-[13px] text-slate-400 mb-7">
          Appearing as{" "}
          <strong className="text-indigo-700 font-semibold">{candidateName}</strong>
        </p>

        {/* CTA button */}
        <button
          onClick={() => { if (!examLocked && !starting) onStart(); }}
          disabled={examLocked || starting}
          className={`px-12 py-4 rounded-xl text-[16px] font-semibold text-white
            transition-all duration-150 flex items-center gap-3 mx-auto
            ${examLocked || starting
              ? "bg-indigo-300 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-[0_6px_28px_rgba(99,102,241,0.4)] hover:shadow-[0_10px_32px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-[0.98]"
            }`}
        >
          {/* FIX: show spinner during API call so candidate knows something is happening */}
          {starting && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {examLocked
            ? "Exam Not Started Yet"
            : starting
            ? "Starting…"
            : "Begin Assessment →"
          }
        </button>

        {/* FIX Bug 4: show start error below the button — was invisible before */}
        {startError && (
          <div className="mt-4 flex items-center justify-center gap-2 text-[13px] text-red-500">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {startError}
          </div>
        )}

        {/* Below button message */}
        {examLocked ? (
          <>
            <p className="text-[12px] text-red-400 mt-5">
              Your exam begins at{" "}
              {new Date(examStartTime).toLocaleTimeString("en-IN", {
                day: "2-digit", month: "short", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
              . This page will unlock at that time.
            </p>
            <button
              onClick={onLogout}
              className="mt-4 text-[12px] text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
            >
              Sign out and come back later
            </button>
          </>
        ) : (
          !startError && !starting && (
            <p className="text-[12px] text-slate-300 mt-5">
              Timer starts immediately. Ensure a stable connection before proceeding.
            </p>
          )
        )}

      </div>
    </div>
  );
}