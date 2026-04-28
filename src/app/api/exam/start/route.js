

import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    // ── 1. Get token from request header ──────────────────────────────────────
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");

    // ── 2. Verify token — server side, cannot be spoofed ──────────────────────
    const baseClient = getSupabase();
    const { data: { user }, error: authError } =
      await baseClient.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ── 3. Per-request client with user token so RLS runs as this candidate ───
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession:   false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    // ── 4. Get candidate job title from applications table ────────────────────
    const { data: apps, error: appError } = await supabase
      .from("applications")
      .select("job_title, applicant_id, applicant_name")
      .eq("applicant_email", user.email)
      .order("id", { ascending: false })
      .limit(1);

    if (appError || !apps || apps.length === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const { job_title } = apps[0];

    // ── 5. Get exam config — checks schedule ──────────────────────────────────
    // FIX: treat NULL is_active as active — only block if explicitly false.
    // Previously: !config.is_active blocked NULL values causing 403 for valid candidates.
    const { data: config, error: configError } = await supabase
      .from("exam_config")
      .select("exam_start, duration_mins, is_active")
      .eq("job_title", job_title)
      .single();

    if (configError || !config) {
      return NextResponse.json(
        { error: "Exam not configured for your role" },
        { status: 403 }
      );
    }

    // is_active === false means admin explicitly disabled — NULL means not set, treat as active
    if (config.is_active === false) {
      return NextResponse.json(
        { error: "Exam not configured for your role" },
        { status: 403 }
      );
    }

    // ── 6. Server-side time validation — cannot be bypassed from browser ──────
    const now       = new Date();
    const examStart = new Date(config.exam_start);
    const examEnd   = new Date(examStart.getTime() + config.duration_mins * 60 * 1000);

    if (now < examStart) {
      return NextResponse.json(
        {
          error:         "Exam not started yet",
          examStartTime: config.exam_start,
          locked:        true,
        },
        { status: 403 }
      );
    }

    if (now > examEnd) {
      return NextResponse.json(
        { error: "Exam window has closed", locked: true },
        { status: 403 }
      );
    }

    // ── 7. Check already submitted — server side ──────────────────────────────
    const { data: existing } = await supabase
      .from("assessment_submissions")
      .select("id")
      .eq("applicant_email", user.email)
      .eq("is_draft", false)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "Already submitted" }, { status: 403 });
    }

    // ── 8. Fetch questions — served only after all server checks pass ─────────
    const { data: questions, error: qError } = await supabase
      .from("exam_questions")
      .select("id, question, order_num")
      .eq("job_title", job_title)
      .order("order_num", { ascending: true });

    if (qError || !questions || questions.length === 0) {
      return NextResponse.json({ error: "Questions not available" }, { status: 403 });
    }

    // ── 9. Calculate remaining seconds from server time ───────────────────────
    // This is the source of truth for the timer — not the client clock
    const remainingSecs = Math.floor((examEnd - now) / 1000);

    return NextResponse.json({
      success:      true,
      questions:    questions.map((q) => ({ id: q.id, question: q.question })),
      remainingSecs,
    });

  } catch (err) {
    console.error("Exam start API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}