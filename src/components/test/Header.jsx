/**
 * components/Header.jsx
 *
 * Sticky top bar shown on both entry screen and during test.
 * Props:
 *   testStarted  — bool   → controls whether TimerBadge renders
 *   timeLeft     — number → seconds remaining
 *   isWarning    — bool   → true when < warningThreshold seconds
 */

import { CANDIDATE_NAME, formatTime } from "../../lib/utils";

// ── Company Logo ──────────────────────────────────────────────────────────────
function CompanyLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="#8B8BFF" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="2.5" fill="#8B8BFF" />
        </svg>
      </div>
      <span className="font-mono text-[13px] font-semibold tracking-widest text-[#1a1a2e] uppercase">
        DiverseLoopers
      </span> */}
      <div className="flex items-center gap-2">

          <img
            src="/images/logo.png"
            alt="Company Logo"

            className="h-12 object-contain"
          />
        </div>
    </div>
  );
}

// ── Timer Badge ───────────────────────────────────────────────────────────────
function TimerBadge({ timeLeft, isWarning }) {
  return (
    <div
      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border-[1.5px] transition-all duration-300
        ${isWarning
          ? "bg-red-50 border-red-300"
          : "bg-indigo-50 border-indigo-200"
        }`}
    >
      {/* Pulsing indicator dot */}
      <span
        className={`w-[7px] h-[7px] rounded-full shrink-0 animate-pulse
          ${isWarning ? "bg-red-500" : "bg-indigo-500"}`}
      />
      <span
        className={`font-mono text-[15px] font-semibold tracking-wide min-w-[44px]
          ${isWarning ? "text-red-700" : "text-indigo-700"}`}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
}

// ── Candidate Avatar ──────────────────────────────────────────────────────────
function CandidateAvatar() {
  const initials = CANDIDATE_NAME.split(" ").map((n) => n[0]).join("");
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full bg-indigo-100 border-[1.5px] border-indigo-200 flex items-center justify-center text-[12px] font-bold text-indigo-700 shrink-0">
        {initials}
      </div>
      <span className="text-[14px] font-medium text-[#1a1a2e] tracking-tight">
        {CANDIDATE_NAME}
      </span>
    </div>
  );
}

// ── Main Header Export ────────────────────────────────────────────────────────
export default function Header({ testStarted, timeLeft, isWarning }) {
  return (
    <header className="sticky top-0 z-50 w-full h-[60px] flex items-center justify-between px-8 bg-white/90 backdrop-blur-md border-b border-slate-100">
      {/* Left — logo */}
       <CompanyLogo />

      {/* Right — Candidate info + Timer */}
      <div className="flex items-center gap-5">
       
        <CandidateAvatar />
        {testStarted && (
          <TimerBadge timeLeft={timeLeft} isWarning={isWarning} />
        )}
      </div>
    </header>
  );
}