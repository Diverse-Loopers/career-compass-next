/**
 * utils/index.js
 *
 * Shared utility functions and constants.
 * Swap submitToSupabase() with real Supabase client in production.
 */

import testConfig from "../../data/Testconfig.json";
import timerConfig from "../../data/Timerconfig.json";

// ─── Candidate (replace with API/auth token in production) ────────────────────
export const CANDIDATE_NAME = "Ravi Singh";

// ─── localStorage keys (scoped per testId to avoid collisions) ────────────────
export const LS_KEYS = {
  timer:   `assessment_timer_${testConfig.testId}`,
  answers: `assessment_answers_${testConfig.testId}`,
  started: `assessment_started_${testConfig.testId}`,
};

// ─── Time formatting ─────────────────────────────────────────────────────────
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Build submission payload ─────────────────────────────────────────────────
export function buildPayload(answers) {
  return {
    candidateName: CANDIDATE_NAME,
    testId: testConfig.testId,
    answers: testConfig.questions.map((q) => ({
      questionId: q.id,
      answer: answers[q.id] || "",
    })),
    submittedAt: new Date().toISOString(),
  };
}

// ─── Supabase submission (mock-ready) ─────────────────────────────────────────
// Production: replace body with:
//   import { createClient } from '@supabase/supabase-js'
//   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
//   const { error } = await supabase.from('candidate_submissions').insert([payload])
//   if (error) throw new Error(error.message)
export async function submitToSupabase(payload) {
  await new Promise((r) => setTimeout(r, 1800)); // simulate network

  const mockSuccess = true; // flip to false to test error state
  if (!mockSuccess) throw new Error("Submission failed. Please try again.");

  console.log("[Supabase mock] Payload submitted:", payload);
  return { success: true };
}