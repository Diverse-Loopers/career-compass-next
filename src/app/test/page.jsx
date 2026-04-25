"use client"

/**
 * App.jsx — Root orchestrator
 *
 * This file owns all shared state and wires the four screens together.
 * It contains NO UI of its own — purely logic + routing.
 *
 * FIX: localStorage is not defined (Next.js SSR)
 *   - useState initialisers run on the server where localStorage doesn't exist.
 *   - Solution: start with safe defaults (false / {}), then hydrate real values
 *     inside a useEffect which only ever runs in the browser after mount.
 *   - A `mounted` flag gates rendering so server HTML matches client HTML.
 *
 * Component tree:
 *   App
 *   ├── Header          (always visible)
 *   └── EntryScreen     (before test starts)
 *       OR
 *       TestScreen      (during test)
 *       OR
 *       SuccessScreen   (after submission)
 */

import { useState, useEffect, useRef, useCallback } from "react";

import Header        from "@/components/test/Header";
import EntryScreen   from "@/components/test/EntryScreen";
import TestScreen    from "@/components/test/TestScreen";
import SuccessScreen from "@/components/test/SuccessScreen";

import { useTimer }                                from "../../lib/Usetimer";
import { LS_KEYS, buildPayload, submitToSupabase } from "../../lib/utils";
import timerConfig                                 from "../../data/Timerconfig.json";

export default function App() {

  // ── 0. SSR hydration gate ─────────────────────────────────────────────────
  // Keeps the server render and first client render identical (both show a
  // blank shell). After mount, useEffect hydrates real values from localStorage.
  const [mounted, setMounted] = useState(false);

  // ── 1. Test lifecycle state — SSR-safe defaults ───────────────────────────
  // Do NOT read localStorage here — this code runs on the server too.
  const [testStarted, setTestStarted] = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // ── 2. Answers state — SSR-safe default ──────────────────────────────────
  // Do NOT read localStorage here — this code runs on the server too.
  const [answers, setAnswers] = useState({});

  // ── 3. Hydrate from localStorage after mount (browser-only) ──────────────
  useEffect(() => {
    const wasStarted = localStorage.getItem(LS_KEYS.started) === "true";
    const savedAnswers = (() => {
      try {
        return JSON.parse(localStorage.getItem(LS_KEYS.answers) || "{}");
      } catch {
        return {};
      }
    })();

    setTestStarted(wasStarted);
    setAnswers(savedAnswers);
    setMounted(true); // unlock rendering of browser-dependent UI
  }, []); // runs once, on mount, client-only

  // ── 4. Double-submit guard ────────────────────────────────────────────────
  const hasSubmitted = useRef(false);

  // ── 5. Submit handler (called by button OR timer expiry) ──────────────────
  const handleSubmit = useCallback(async () => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitToSupabase(buildPayload(answers));

      // Clean up all persisted state on success
      Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));

      setSubmitted(true);
    } catch (err) {
      hasSubmitted.current = false; // allow retry on error
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }, [answers]);

  // ── 6. Timer — gated by `mounted` so it never runs on the server ──────────
  const { timeLeft, isWarning } = useTimer({
    storageKey: LS_KEYS.timer,
    active: mounted && testStarted && !submitted && !submitting,
    onExpire: handleSubmit,
  });

  // ── 7. Auto-save answers to localStorage on every change ──────────────────
  useEffect(() => {
    if (!mounted || !testStarted) return;
    localStorage.setItem(LS_KEYS.answers, JSON.stringify(answers));
  }, [answers, testStarted, mounted]);

  // ── 8. Warn candidate before closing/refreshing mid-test ──────────────────
  useEffect(() => {
    if (!mounted || !testStarted || submitted) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "Your test is in progress. Are you sure you want to leave?";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [mounted, testStarted, submitted]);

  // ── 9. Start test ─────────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    localStorage.setItem(LS_KEYS.started, "true");
    localStorage.setItem(LS_KEYS.timer, String(timerConfig.testDuration));
    setTestStarted(true);
  }, []);

  // ── 10. Answer update ─────────────────────────────────────────────────────
  const handleAnswer = useCallback((questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  // Before hydration: render a blank shell that matches the server HTML exactly.
  // This prevents a React hydration mismatch warning.
  if (!mounted) {
    return <div className="min-h-screen bg-[#f6f6ff]" />;
  }

  return (
    <div className="min-h-screen bg-[#f6f6ff] font-sans">
      {/* Header is always visible (hides timer on entry screen) */}
      <Header
        testStarted={testStarted}
        timeLeft={timeLeft}
        isWarning={isWarning}
      />

      {/* Screen routing */}
      {submitted ? (
        <SuccessScreen />
      ) : !testStarted ? (
        <EntryScreen onStart={handleStart} />
      ) : (
        <TestScreen
          answers={answers}
          onAnswer={handleAnswer}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitError={submitError}
        />
      )}
    </div>
  );
}