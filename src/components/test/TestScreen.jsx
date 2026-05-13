

// import testConfig from "../../data/Testconfig.json";
import { useEffect } from "react";

// ── QuestionCard ──────────────────────────────────────────────────────────────
function QuestionCard({ question, index,total, answer, onChange, locked }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-7 mb-5 hover:shadow-[0_2px_16px_rgba(99,102,241,0.08)] transition-shadow duration-200">

      {/* Q-number badge */}
      <div className="mb-3.5">
        <span className="font-mono text-[11px] font-semibold tracking-widest uppercase text-indigo-500 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md">
          Q{index + 1} of {total}
        </span>
      </div>

      {/* Question text */}
      <p className="text-[16px] font-medium text-[#1a1a2e] leading-[1.65] tracking-tight mb-5">
        {question.question}
      </p>

      {/* Answer textarea */}
      <textarea
        rows={6}
        disabled={locked}
        value={answer}
        onChange={(e) => onChange(question.id, e.target.value)}
        placeholder="Write your answer here…"
        onCopy={(e)  => e.preventDefault()}
  onPaste={(e) => e.preventDefault()}
  onCut={(e)   => e.preventDefault()}
        className={`w-full text-[14px] leading-relaxed text-[#1a1a2e] placeholder:text-slate-300
          bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 resize-y outline-none
          focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
          transition-all duration-150
          ${locked ? "opacity-60 cursor-not-allowed" : "hover:border-slate-300"}`}
      />
    </div>
  );
}

// ── SubmitButton ──────────────────────────────────────────────────────────────
function SubmitButton({ onSubmit, submitting }) {
  return (
    <button
      onClick={onSubmit}
      disabled={submitting}
      className={`flex items-center gap-2.5 px-10 py-3.5 rounded-xl text-[15px] font-semibold text-white
        transition-all duration-150
        ${submitting
          ? "bg-indigo-300 cursor-not-allowed shadow-none"
          : "bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:opacity-90 active:scale-[0.98]"
        }`}
    >
      {submitting && (
        // Spinner
        <span className="w-[15px] h-[15px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {submitting ? "Submitting…" : "Submit Assessment"}
    </button>
  );
}

// ── TestScreen export ─────────────────────────────────────────────────────────
export default function TestScreen({
  answers,
  onAnswer,
  onSubmit,
  submitting,
  submitError,
  questions,
   onWarning,
    warnings,
    testTitle
}) {

// useEffect(() => {
//   const handleVisibility = () => {
//     if (document.hidden) onWarning?.()
//   }
//   document.addEventListener("visibilitychange", handleVisibility)
//   return () => document.removeEventListener("visibilitychange", handleVisibility)
// }, [onWarning])


  return (
    <main className="max-w-[740px] mx-auto px-6 pt-12 pb-24 animate-fadeIn">

      {/* Section heading */}
      <div className="mb-8">
        <h2 className="text-[22px] font-bold text-[#1a1a2e] tracking-tight mb-1.5">
          {testTitle}
        </h2>
        <p className="text-[13px] text-slate-400">
          Answer all {questions.length} questions. Your progress is saved automatically.
        </p>
      </div>
     
     {warnings > 0 && (
  <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[13px] font-medium">
    ⚠ Tab switch detected — warning {warnings} of 3. Your test auto-submits on the 3rd warning.
  </div>
)}


      {/* Question cards */}
      {questions.map((q, i) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={i}
          total={questions.length}
          answer={answers[q.id] || ""}
          onChange={onAnswer}
          locked={submitting}
        />
      ))}

      {/* Submission error */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3.5 mb-5 text-[14px] text-red-700">
          {submitError}
        </div>
      )}

      {/* Footer row: hint + submit */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
        <p className="text-[13px] text-slate-300">
          All answers auto-saved · Submitting is permanent
        </p>
        <SubmitButton onSubmit={onSubmit} submitting={submitting} />
      </div>
    </main>
  );
}