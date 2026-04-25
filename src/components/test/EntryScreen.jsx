/**
 * components/EntryScreen.jsx
 *
 * Pre-test landing screen shown before candidate clicks "Begin Assessment".
 * Displays: test title, instructions, meta-info strip, CTA button.
 *
 * Props:
 *   onStart — () => void   called when user clicks Begin
 */

import { useEffect, useState } from "react";
import testConfig from "../../data/Testconfig.json";
import timerConfig from "../../data/Timerconfig.json";
import { CANDIDATE_NAME } from "../../lib/utils";

const META_ITEMS = [
  { value: `${timerConfig.testDuration / 60} min`, label: "Duration" },
  { value: `${testConfig.questions.length}`,        label: "Questions" },
  { value: "Written",                               label: "Format" },
];

export default function EntryScreen({ onStart }) {
  // Fade-in on mount
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 py-16
        bg-gradient-to-br from-indigo-50 via-slate-50 to-white
        transition-all duration-500
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >
      <div className="max-w-[520px] w-full text-center">

        {/* Round label */}
        <div className="inline-block font-mono text-[11px] tracking-widest uppercase text-indigo-500 bg-indigo-50 border border-indigo-200 px-3.5 py-1 rounded-md mb-6">
          Engineering · Round 1
        </div>

        {/* Title */}
        <h1 className="text-[clamp(28px,5vw,38px)] font-bold text-[#1a1a2e] leading-tight tracking-tight mb-4">
          {testConfig.testTitle}
        </h1>

        {/* Instructions */}
        <p className="text-[15px] text-slate-500 leading-relaxed max-w-[440px] mx-auto mb-10">
          {testConfig.instructions}
        </p>

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
          <strong className="text-indigo-700 font-semibold">{CANDIDATE_NAME}</strong>
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="px-12 py-4 rounded-xl text-[16px] font-semibold text-white
            bg-gradient-to-r from-indigo-600 to-indigo-500
            shadow-[0_6px_28px_rgba(99,102,241,0.4)]
            hover:shadow-[0_10px_32px_rgba(99,102,241,0.5)]
            hover:-translate-y-0.5
            active:scale-[0.98]
            transition-all duration-150"
        >
          Begin Assessment →
        </button>

        <p className="text-[12px] text-slate-300 mt-5">
          Timer starts immediately. Ensure a stable connection before proceeding.
        </p>
      </div>
    </div>
  );
}