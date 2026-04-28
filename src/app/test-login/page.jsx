"use client";



import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"


// const VALID_USER_ID  = "1234";
// const VALID_PASSWORD = "Asses@123";

export default function LoginScreen() {
  const router = useRouter();

  const [userId,   setUserId]   = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [shaking,  setShaking]  = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!userId.trim() || !password.trim()) {
      triggerError("Please enter both Email and Password.");
      return;
    }

    setLoading(true);
    // await new Promise((r) => setTimeout(r, 700));

    // if (userId.trim() === VALID_USER_ID && password === VALID_PASSWORD) {
    //   router.push("/test");
    // } else {
    //   setLoading(false);
    //   triggerError("Invalid User ID or Password.");
    // }
    const { error: authError } = await supabase.auth.signInWithPassword({
  email: userId.trim(),
  password: password,
});

if (authError) {
  setLoading(false);
  triggerError("Invalid Email or Password.");
} else {
  router.push("/test");
}
  }

  function triggerError(msg) {
    setError(msg);
    setShaking(true);
    setTimeout(() => setShaking(false), 430);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@600&display=swap');
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        .shake { animation: shake 0.43s ease; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Page — pure white, no gradient */}
      <div
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        className="min-h-screen bg-white flex items-center justify-center px-4"
      >

        {/* Card — fixed 380px, never stretches */}
        <div
          className={`
            w-[380px] bg-white rounded-2xl
            border border-slate-200
            shadow-[0_4px_32px_rgba(0,0,0,0.07)]
            px-9 py-10
            transition-all duration-500
            ${visible  ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
            ${shaking  ? "shake" : ""}
          `}
        >

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-7">
            {/* <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="#8B8BFF" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="9" cy="9" r="2.5" fill="#8B8BFF"/>
              </svg>
            </div>
            <span
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#1a1a2e]"
            >
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

          {/* Title */}
          <div className="text-center mb-7">
            <h1 className="text-[19px] font-bold text-[#0f0f1a] tracking-tight mb-1">
              Candidate Login
            </h1>
            <p className="text-[13px] text-slate-400">
              Enter your credentials to access the assessment.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">

            {/* User ID */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="userId"
                className="text-[11px] font-semibold uppercase tracking-widest text-slate-400"
              >
                Email
              </label>
              <input
                id="userId"
                type="text"
                autoComplete="username"
                placeholder="Enter your Email"
                value={userId}
                onChange={(e) => { setUserId(e.target.value); setError(""); }}
                disabled={loading}
                className={`
                  h-10 px-3.5 rounded-lg text-[14px] text-[#0f0f1a]
                  border bg-white outline-none
                  placeholder:text-slate-300
                  transition-all duration-150
                  focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
                  disabled:opacity-50
                  ${error ? "border-red-300" : "border-slate-200 hover:border-slate-300"}
                `}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[11px] font-semibold uppercase tracking-widest text-slate-400"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  disabled={loading}
                  className={`
                    w-full h-10 px-3.5 pr-10 rounded-lg text-[14px] text-[#0f0f1a]
                    border bg-white outline-none
                    placeholder:text-slate-300
                    transition-all duration-150
                    focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100
                    disabled:opacity-50
                    ${error ? "border-red-300" : "border-slate-200 hover:border-slate-300"}
                  `}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-100 px-3 py-2.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-[12.5px] text-red-500">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`
                mt-1 h-10 rounded-lg text-[14px] font-semibold text-white
                flex items-center justify-center gap-2
                transition-all duration-150
                ${loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] shadow-[0_2px_10px_rgba(99,102,241,0.28)]"
                }
              `}
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying…
                </>
              ) : (
                "Continue to Assessment →"
              )}
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-[11px] text-slate-300 mt-7">
            Credentials are issued by your assessment coordinator.
          </p>

        </div>

        {/* Below card */}
        {/* <p
          className="absolute bottom-6 text-[11px] text-slate-300"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          © {new Date().getFullYear()} DiverseLoopers
        </p> */}

      </div>
    </>
  );
}