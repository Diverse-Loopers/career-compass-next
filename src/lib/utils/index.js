// /**
//  * utils/index.js
//  *
//  * Shared utility functions and constants.
//  * Swap submitToSupabase() with real Supabase client in production.
//  */

// import testConfig from "../../data/Testconfig.json";
// import timerConfig from "../../data/Timerconfig.json";

// // ─── Candidate (replace with API/auth token in production) ────────────────────
// export const CANDIDATE_NAME = "Ravi Singh";

// // ─── localStorage keys (scoped per testId to avoid collisions) ────────────────
// export const LS_KEYS = {
//   timer:   `assessment_timer_${testConfig.testId}`,
//   answers: `assessment_answers_${testConfig.testId}`,
//   started: `assessment_started_${testConfig.testId}`,
// };

// // ─── Time formatting ─────────────────────────────────────────────────────────
// export function formatTime(seconds) {
//   const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//   const s = (seconds % 60).toString().padStart(2, "0");
//   return `${m}:${s}`;
// }

// // ─── Build submission payload ─────────────────────────────────────────────────
// export function buildPayload(answers) {
//   return {
//     candidateName: CANDIDATE_NAME,
//     testId: testConfig.testId,
//     answers: testConfig.questions.map((q) => ({
//       questionId: q.id,
//       answer: answers[q.id] || "",
//     })),
//     submittedAt: new Date().toISOString(),
//   };
// }

// // ─── Supabase submission (mock-ready) ─────────────────────────────────────────
// // Production: replace body with:
// //   import { createClient } from '@supabase/supabase-js'
// //   const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
// //   const { error } = await supabase.from('candidate_submissions').insert([payload])
// //   if (error) throw new Error(error.message)
// export async function submitToSupabase(payload) {
//   await new Promise((r) => setTimeout(r, 1800)); // simulate network

//   const mockSuccess = true; // flip to false to test error state
//   if (!mockSuccess) throw new Error("Submission failed. Please try again.");

//   console.log("[Supabase mock] Payload submitted:", payload);
//   return { success: true };
// }


// import { createClient } from "@supabase/supabase-js";
// import { supabase } from "@/lib/supabase";
// import timerConfig from "../../data/Timerconfig.json";
// import testConfig  from "../../data/Testconfig.json";

// // export const supabase = createClient(
// //   process.env.NEXT_PUBLIC_SUPABASE_URL,
// //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// // );

// // ─── localStorage keys ────────────────────────────────────────────────────────
// export const LS_KEYS = {
//   timer:   `assessment_timer_${testConfig.testId}`,
//   answers: `assessment_answers_${testConfig.testId}`,
//   started: `assessment_started_${testConfig.testId}`,
// };

// // ─── Time formatting ──────────────────────────────────────────────────────────
// export function formatTime(seconds) {
//   const m = Math.floor(seconds / 60).toString().padStart(2, "0");
//   const s = (seconds % 60).toString().padStart(2, "0");
//   return `${m}:${s}`;
// }

// // ─── Get candidate info + job-based questions from Supabase ──────────────────
// export async function getCandidateInfo() {
//   const { data: { session } } = await supabase.auth.getSession();
//   if (!session) return null;

//   const email = session.user.email;

// //   const { data, error } = await supabase
// //   .from("applications")
// //   .select("applicant_name, applicant_id, job_title")
// //   .eq("applicant_email", email)
// //   .order("id", { ascending: false })  // get latest application
// //   .limit(1)
// //   .single();

// // if (error || !data) return null;
// const { data, error } = await supabase
//   .from("applications")
//   .select("applicant_name, applicant_id, job_title")
//   .eq("applicant_email", email)
//   .order("id", { ascending: false })
//   .limit(1);

// if (error || !data || data.length === 0) return null;

// const row = data[0];

//   // Resolve questions based on job_title
//   const jobKey    = row.job_title?.trim();
//   const jobConfig = testConfig.jobs[jobKey] ?? testConfig.default;

//   return {
//     applicantName: row.applicant_name,
//     applicantId:   row.applicant_id,
//     email,
//     jobTitle:      row.job_title,
//     testTitle:     jobConfig.testTitle,
//     instructions:  jobConfig.instructions,
//     questions:     jobConfig.questions,
//   };
// }

// // to prevent resubmission of the exam
// // export async function checkAlreadySubmitted(email) {
// //   const { data, error } = await supabase
// //     .from("assessment_submissions")
// //     .select("id, submitted_at")
// //     .eq("applicant_email", email)
// //     .single();

// //   if (error || !data) return false;
// //   return true;
// // }

// export async function checkAlreadySubmitted(email) {
//   const { data, error } = await supabase
//     .from("assessment_submissions")
//     .select("id")
//     .eq("applicant_email", email)
//     .eq("is_draft", false)  // only final submissions count
//     .limit(1);              // safe with 0, 1, or many rows

//   if (error) return false;
//   return data && data.length > 0;
// }

// // ─── Build submission payload ─────────────────────────────────────────────────
// export function buildPayload(answers, questions) {
//   return questions.map((q) => ({
//     questionId: q.id,
//     question:   q.question,
//     answer:     answers[q.id] || "",
//   }));
// }

// // ─── Submit to Supabase ───────────────────────────────────────────────────────
// export async function submitToSupabase(answers, questions, candidateInfo, warnings = 0) {
//   const { error } = await supabase
//     .from("assessment_submissions")
//     .insert({
//       applicant_id:    candidateInfo.applicantId,
//       applicant_email: candidateInfo.email,
//       job_title:       candidateInfo.jobTitle,
//       answers:         buildPayload(answers, questions),
//       warnings,
//     });

//   if (error) throw new Error(error.message);
//   return { success: true };
// }


// lib/utils.js — complete fixed file
// Changes from original marked with — FIX N:

import { supabase } from "@/lib/supabase";
import timerConfig from "../../data/Timerconfig.json";
import testConfig  from "../../data/Testconfig.json";

// ─── localStorage keys ────────────────────────────────────────────────────────
// FIX 2: testConfig.testId does not exist in your Testconfig.json.
// It has a `jobs` object, not a top-level testId.
// Use a hardcoded stable key — safe, simple, no JSON dependency.
export const LS_KEYS = {
  timer:   "assessment_timer_v1",
  answers: "assessment_answers_v1",
  started: "assessment_started_v1",
};

// ─── Time formatting ──────────────────────────────────────────────────────────
// No change — correct as-is
export function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ─── Get candidate info + job-based questions from Supabase ──────────────────
// No change — correct as-is
export async function getCandidateInfo() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const email = session.user.email;

  const { data, error } = await supabase
    .from("applications")
    .select("applicant_name, applicant_id, job_title")
    .eq("applicant_email", email)
    .order("id", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) return null;

  const row     = data[0];
  const jobKey  = row.job_title?.trim();
  const jobConfig = testConfig.jobs?.[jobKey] ?? testConfig.default;

  return {
    applicantName: row.applicant_name,
    applicantId:   row.applicant_id,
    email,
    jobTitle:      row.job_title,
    testTitle:     jobConfig.testTitle,
    instructions:  jobConfig.instructions,
    questions:     jobConfig.questions,
  };
}

// ─── Check already submitted ──────────────────────────────────────────────────
// No change — correct as-is
export async function checkAlreadySubmitted(email) {
  const { data, error } = await supabase
    .from("assessment_submissions")
    .select("id")
    .eq("applicant_email", email)
    .eq("is_draft", false)
    .limit(1);

  if (error) return false;
  return data && data.length > 0;
}

// ─── Build answers payload ────────────────────────────────────────────────────
// FIX 3: handle empty questions array — fall back to raw answers object
// so no candidate work is ever lost even if questions array is stale.
export function buildPayload(answers, questions) {
  // Normal path — questions array is populated
  if (questions && questions.length > 0) {
    return questions.map((q) => ({
      questionId: q.id,
      question:   q.question,
      answer:     answers[q.id] ?? "",
    }));
  }

  // Fallback — questions empty (e.g. timer fired before handleStart completed)
  // Preserve all answers keyed by questionId so nothing is lost
  return Object.entries(answers).map(([questionId, answer]) => ({
    questionId,
    question: "",   // question text unavailable — id still preserved
    answer,
  }));
}

// ─── Submit to Supabase ───────────────────────────────────────────────────────
// FIX 1: added is_draft: false to the insert payload.
// Without this, the column is NULL in the DB and checkAlreadySubmitted
// (.eq("is_draft", false)) never matches — candidate can resubmit.
// Also added explicit null guard on applicantId with a clear error message.
export async function submitToSupabase(answers, questions, candidateInfo, warnings = 0) {

  // Explicit guard — throws before hitting Supabase with a null value
  // that produces the "violates not-null constraint" error
  if (!candidateInfo?.applicantId) {
    throw new Error(
      "Session expired or applicant ID missing. Please log out and log in again."
    );
  }

  if (!candidateInfo?.email) {
    throw new Error(
      "Session expired. Please log out and log in again."
    );
  }

  const { error } = await supabase
    .from("assessment_submissions")
    .insert({
      applicant_id:    candidateInfo.applicantId,   // camelCase from candidateInfo
      applicant_email: candidateInfo.email,
      job_title:       candidateInfo.jobTitle,
      answers:         buildPayload(answers, questions),
      warnings,
      is_draft:        false,                        // FIX 1: required for checkAlreadySubmitted
      submitted_at:    new Date().toISOString(),     // explicit timestamp
    });

  if (error) {
    console.error("Supabase submission error:", error);
    throw new Error(error.message || "Submission failed. Please try again.");
  }

  return { success: true };
}