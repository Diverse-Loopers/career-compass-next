/**
 * components/SuccessScreen.jsx
 *
 * Shown after successful submission.
 * No props needed — purely presentational.
 */

export default function SuccessScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 py-16 animate-fadeIn">

      {/* Check circle */}
      <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M6 14L11 19L22 9"
            stroke="#22c55e"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1 className="text-[26px] font-bold text-[#1a1a2e] tracking-tight mb-3 text-center">
        Assessment Submitted
      </h1>

      <p className="text-[15px] text-slate-500 leading-relaxed text-center max-w-[380px]">
        Your responses have been recorded. Our team will be in touch regarding next steps. You may now close this window.
      </p>
    </div>
  );
}