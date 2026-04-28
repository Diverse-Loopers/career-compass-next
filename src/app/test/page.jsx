

"use client"

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase, getSupabase } from "../../lib/supabase";
import Header        from "@/components/test/Header";
import EntryScreen   from "@/components/test/EntryScreen";
import TestScreen    from "@/components/test/TestScreen";
import SuccessScreen from "@/components/test/SuccessScreen";

import { useTimer }                                          from "../../lib/Usetimer";
import { LS_KEYS, submitToSupabase, checkAlreadySubmitted } from "../../lib/utils";
import testConfig                                            from "../../data/Testconfig.json";

export default function App() {
  const router = useRouter();

  const [mounted,          setMounted]          = useState(false);
  const [testStarted,      setTestStarted]      = useState(false);
  const [submitted,        setSubmitted]        = useState(false);
  const [submitting,       setSubmitting]       = useState(false);
  const [submitError,      setSubmitError]      = useState(null);
  const [candidateInfo,    setCandidateInfo]    = useState(null);
  const [warnings,         setWarnings]         = useState(0);
  const [examLocked,       setExamLocked]       = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [isFullscreen,     setIsFullscreen]     = useState(true);
  const [startError,       setStartError]       = useState(null);
  const [starting,         setStarting]         = useState(false);
  const [initError,        setInitError]        = useState(null); // NEW: surface init failures
  const [answers,          setAnswers]          = useState({});



  useEffect(() => {
  if (!alreadySubmitted) return;

  const timer = setTimeout(async () => {
    const client = getSupabase();
    await client.auth.signOut();
    Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
    router.replace("/test-login");
  }, 3000); // 3 seconds

  return () => clearTimeout(timer);
}, [alreadySubmitted, router]);

  // ── 3. Init — runs once after mount using getSession() ────────────────────
  useEffect(() => {
    const client = getSupabase();

    async function init(session) {
      // Restore answers
      const savedAnswers = (() => {
        try { return JSON.parse(localStorage.getItem(LS_KEYS.answers) || "{}"); }
        catch { return {}; }
      })();
      setAnswers(savedAnswers);

      const email = session.user.email;

      // ── Fetch candidate row ──────────────────────────────────────────────
      const { data, error: appError } = await client
        .from("applications")
        .select("applicant_name, applicant_id, job_title")
        .eq("applicant_email", email)
        .order("id", { ascending: false })
        .limit(1);

      if (appError || !data || data.length === 0) {
        console.error("Application not found:", appError?.message);
        // FIX: show error instead of redirect so candidate knows what happened
        setInitError("Your application was not found. Please contact the coordinator.");
        setMounted(true);
        return;
      }

      const row    = data[0];
      // FIX Cause 1: trim whitespace from job_title before matching
      const jobKey = row.job_title?.trim() ?? "";

      // FIX Cause 4: safe fallback for testConfig — never crash if key missing
      const jobConfig = testConfig.jobs?.[jobKey] ?? testConfig.default ?? {
        testTitle:    "Technical Screening Assessment",
        instructions: "Answer each question clearly and concisely.",
      };

      // ── Fetch exam config — use maybeSingle() not single() ───────────────
      // FIX Cause 3: .single() throws PGRST116 when 0 rows found.
      // .maybeSingle() returns null safely — no error on 0 rows.
      const { data: configData, error: configError } = await client
        .from("exam_config")
        .select("exam_start, duration_mins, is_active")
        .eq("job_title", jobKey)   // FIX Cause 1: use trimmed jobKey
        .maybeSingle();            // FIX Cause 3: safe — returns null not error

      if (configError) {
        console.error("exam_config fetch error:", configError.message);
        // Don't block — continue without exam schedule
      }

      // ── Fetch question count ─────────────────────────────────────────────
      const { count: questionCount } = await client
        .from("exam_questions")
        .select("id", { count: "exact", head: true })
        .eq("job_title", jobKey);  // FIX Cause 1: use trimmed jobKey

      const examStartTime = configData?.exam_start   ?? null;
      const durationMins  = configData?.duration_mins ?? 60;

      const info = {
        applicantName: row.applicant_name,
        applicantId:   row.applicant_id,
        email,
        jobTitle:      row.job_title,
        testTitle:     jobConfig.testTitle,
        instructions:  jobConfig.instructions,
        questions:     [],
        questionCount: questionCount ?? 0,
        examStartTime,
        durationMins,
      };

      setCandidateInfo(info);

      // ── Exam schedule gate ───────────────────────────────────────────────
      // FIX Cause 2: only lock if examStartTime exists AND is in the future
      if (examStartTime && Date.now() < new Date(examStartTime).getTime()) {
        setExamLocked(true);
        setMounted(true);
        return;
      }

      // ── Already submitted check ──────────────────────────────────────────
      const done = await checkAlreadySubmitted(email);
      if (done) {
        setAlreadySubmitted(true);
        Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
        setMounted(true);
        return;
      }

      // Restore mid-test state on page refresh
      const wasStarted = localStorage.getItem(LS_KEYS.started) === "true";
      setTestStarted(wasStarted);

      // FIX: always call setMounted(true) — was missing in some error paths
      setMounted(true);
    }

    // getSession() fires exactly once — no double-fire
    client.auth.getSession().then(({ data: { session }, error }) => {
      if (error || !session) {
        router.replace("/test-login");
        return;
      }
      init(session).catch((err) => {
        // FIX: catch any unhandled error in init so setMounted(true) always runs
        console.error("Init crashed:", err);
        setInitError("Something went wrong loading your exam. Please refresh the page.");
        setMounted(true);
      });
    });

    // onAuthStateChange only handles logout
    const { data: { subscription } } = client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        router.replace("/test-login");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── 4. Double-submit guard ────────────────────────────────────────────────
  const hasSubmitted = useRef(false);

  // ── 5. Submit handler ─────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitToSupabase(
        answers,
        candidateInfo?.questions ?? [],
        candidateInfo,
        warnings
      );
      Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
      setSubmitted(true);
      setTimeout(async () => { await supabase.auth.signOut(); }, 3000);
    } catch (err) {
      hasSubmitted.current = false;
      // setSubmitError(err.message);
      setSubmitError(
      "Submission failed. Your test session has ended. Please contact support."
    );
    setTimeout(async () => { await supabase.auth.signOut(); }, 4000);

    } finally {
      setSubmitting(false);
    }
  }, [answers, candidateInfo, warnings]);

  // ── 6. Timer ──────────────────────────────────────────────────────────────
  const { timeLeft, isWarning } = useTimer({
    storageKey: LS_KEYS.timer,
    active: mounted && testStarted && !submitted && !submitting,
    onExpire: handleSubmit,
  });

  // ── 7. Auto-save answers ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !testStarted) return;
    localStorage.setItem(LS_KEYS.answers, JSON.stringify(answers));
  }, [answers, testStarted, mounted]);

  // ── 8. Warn before closing mid-test ───────────────────────────────────────
  useEffect(() => {
    if (!mounted || !testStarted || submitted) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "Your test is in progress. Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [mounted, testStarted, submitted]);

  // ── 11. Warning handler ───────────────────────────────────────────────────
  const handleVisibilityWarning = useCallback(() => {
    setWarnings((prev) => {
      const next = prev + 1;
      if (next >= 3) handleSubmit();
      return next;
    });
  }, [handleSubmit]);

  // ── 8a. Fullscreen exit ───────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !testStarted || submitted) return;
    let justEntered = true;
    const t = setTimeout(() => { justEntered = false; }, 1000);
    const onFsChange = () => {
      const inFs = !!document.fullscreenElement;
      setIsFullscreen(inFs);
      if (!inFs && !justEntered) {
        handleVisibilityWarning();
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => { clearTimeout(t); document.removeEventListener("fullscreenchange", onFsChange); };
  }, [mounted, testStarted, submitted, handleVisibilityWarning]);

  // ── 8b. Block exit shortcuts ──────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !testStarted || submitted) return;
    const block = (e) => {
      if (e.key === "Escape" || e.key === "F11" ||
        (e.altKey && e.key === "F4") || (e.altKey && e.key === "Tab") ||
        (e.metaKey && e.key === "Tab")) {
        e.preventDefault(); e.stopPropagation();
      }
    };
    window.addEventListener("keydown", block, true);
    return () => window.removeEventListener("keydown", block, true);
  }, [mounted, testStarted, submitted]);

  // ── 8c. Tab visibility warning ────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !testStarted || submitted) return;
    let handler = null;
    const delay = setTimeout(() => {
      handler = () => {
        if (document.hidden) { handleVisibilityWarning(); setIsFullscreen(false); }
      };
      document.addEventListener("visibilitychange", handler);
    }, 2000);
    return () => { clearTimeout(delay); if (handler) document.removeEventListener("visibilitychange", handler); };
  }, [mounted, testStarted, submitted, handleVisibilityWarning]);

  // ── 8d. Block right click ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted || !testStarted || submitted) return;
    const block = (e) => e.preventDefault();
    window.addEventListener("contextmenu", block);
    return () => window.removeEventListener("contextmenu", block);
  }, [mounted, testStarted, submitted]);

  // ── 9. Start test ─────────────────────────────────────────────────────────
  const handleStart = useCallback(async () => {
    if (starting) return;
    setStartError(null);
    setStarting(true);

    // Fullscreen FIRST before any await
    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } catch {
      setIsFullscreen(true); // set true so overlay never fires on start
    }

    try {
      const client = getSupabase();
      const { data: { session } } = await client.auth.getSession();
      if (!session) { router.replace("/test-login"); return; }

      const res = await fetch("/api/exam/start", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
          "Content-Type":  "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.locked) {
          setExamLocked(true);
          document.exitFullscreen?.().catch(() => {});
          setIsFullscreen(true);
          setStarting(false);
          return;
        }
        if (result.error === "Already submitted") {
          setAlreadySubmitted(true);
          setStarting(false);
          return;
        }
        setStartError(result.error || "Could not start the exam. Please try again.");
        document.exitFullscreen?.().catch(() => {});
        setIsFullscreen(true);
        setStarting(false);
        return;
      }

      setCandidateInfo((prev) => ({ ...prev, questions: result.questions }));

      if (!localStorage.getItem(LS_KEYS.timer)) {
        localStorage.setItem(LS_KEYS.timer, String(result.remainingSecs));
      }
      localStorage.setItem(LS_KEYS.started, "true");
      setTestStarted(true);

    } catch (err) {
      console.error("handleStart error:", err);
      setStartError("Network error. Please check your connection and try again.");
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } finally {
      setStarting(false);
    }
  }, [starting, router]);

  // ── 10. Answer update ─────────────────────────────────────────────────────
  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  // ── 12. Logout ────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    const client = getSupabase();
    await client.auth.signOut();
    Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
    router.replace("/test-login");
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f6ff]" />;
  }

  // FIX: surface init errors — was a blank frozen screen before
  if (initError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-[400px]">
          <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center mb-5 mx-auto">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h1 className="text-[18px] font-bold text-slate-800 mb-2">Unable to Load Exam</h1>
          <p className="text-[13px] text-slate-400 leading-relaxed mb-6">{initError}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-indigo-600 text-white text-[13px] font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (alreadySubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-[420px]">
          <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mb-6 mx-auto">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 9v6M14 18h.01" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="14" cy="14" r="11" stroke="#f59e0b" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="text-[20px] font-bold text-slate-800 mb-2">Assessment Already Submitted</h1>
          <p className="text-[14px] text-slate-400 leading-relaxed">
            You have already completed this assessment. Retakes are not permitted.
            Our team will be in touch regarding the next steps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6ff] font-sans">

      {testStarted && !submitted && !isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center">
          <div className="text-center px-8">
            <h2 className="text-white text-xl font-bold mb-3">Fullscreen Required</h2>
            <p className="text-slate-300 text-sm mb-6">You must stay in fullscreen during the assessment.</p>
            <button
              onClick={() => {
                document.documentElement.requestFullscreen?.()
                  .then(() => setIsFullscreen(true))
                  .catch(() => setIsFullscreen(true));
              }}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Return to Fullscreen
            </button>
          </div>
        </div>
      )}

      <Header
        testStarted={testStarted}
        timeLeft={timeLeft}
        isWarning={isWarning}
        candidateName={candidateInfo?.applicantName}
        warnings={warnings}
      />

      {submitted ? (
        <SuccessScreen />
      ) : !testStarted ? (
        <EntryScreen
          onStart={handleStart}
          onLogout={handleLogout}
          candidateName={candidateInfo?.applicantName}
          jobTitle={candidateInfo?.jobTitle}
          testTitle={candidateInfo?.testTitle}
          instructions={candidateInfo?.instructions}
          questions={candidateInfo?.questions ?? []}
          questionCount={candidateInfo?.questionCount ?? 0}
          examLocked={examLocked}
          examStartTime={candidateInfo?.examStartTime}
          durationMins={candidateInfo?.durationMins ?? 60}
          startError={startError}
          starting={starting}
        />
      ) : (
        <TestScreen
          answers={answers}
          onAnswer={handleAnswer}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
          questions={candidateInfo?.questions ?? []}
          onWarning={handleVisibilityWarning}
          warnings={warnings}
          testTitle={candidateInfo?.testTitle}
        />
      )}
    </div>
  );
}
