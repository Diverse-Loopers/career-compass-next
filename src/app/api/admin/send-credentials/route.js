import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getSupabase } from "@/lib/supabase";

// ── SMTP transporter — created once, reused for all emails ───────────────────
const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

  

// ── Email template ────────────────────────────────────────────────────────────
function buildEmailHtml({ name, email, password, jobTitle, loginUrl }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body style="margin:0; padding:0; background:#f3f4f6;">

      <div style="max-width:520px; margin:40px auto; padding:0 16px;">

        <!-- Card -->
        <div style="background:#ffffff; border-radius:16px; border:1px solid #e5e7eb; padding:40px 36px;">

          <!-- Logo / Brand -->
          <div style="margin-bottom:28px;">
            <span style="font-size:18px; font-weight:700; color:#1a1a2e; letter-spacing:-0.3px;">
              DiverseLoopers
            </span>
          </div>

          <!-- Greeting -->
          <h2 style="margin:0 0 8px; font-size:20px; font-weight:700; color:#1a1a2e;">
            Hello ${name},
          </h2>

          <p style="margin:0 0 28px; font-size:14px; color:#6b7280; line-height:1.7;">
            Congratulations! You have been shortlisted for the
            <strong style="color:#1a1a2e;">${jobTitle}</strong> assessment.
            Please use the credentials below to log in at the scheduled exam time.
          </p>

          <!-- Credentials box -->
          <div style="background:#f8f9ff; border:1px solid #e0e7ff; border-radius:12px; padding:24px; margin-bottom:28px;">

            <div style="margin-bottom:20px;">
              <p style="margin:0 0 5px; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em;">
                Login Email
              </p>
              <p style="margin:0; font-size:15px; font-weight:600; color:#1a1a2e;">
                ${email}
              </p>
            </div>

            <div>
              <p style="margin:0 0 5px; font-size:11px; font-weight:600; color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em;">
                Password
              </p>
              <p style="margin:0; font-size:20px; font-weight:700; color:#4f46e5; letter-spacing:0.15em;">
                ${password}
              </p>
            </div>

          </div>

          <!-- CTA Button -->
          <a href="${loginUrl}"
             style="display:inline-block; background:#4f46e5; color:#ffffff; padding:13px 28px; border-radius:10px; text-decoration:none; font-weight:600; font-size:14px; margin-bottom:28px;">
            Go to Assessment Login →
          </a>

          <!-- Warning -->
          <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:14px 16px; margin-bottom:24px;">
            <p style="margin:0; font-size:13px; color:#92400e; line-height:1.6;">
              ⚠ Do not share these credentials with anyone.
              The exam must be completed individually within the scheduled time window.
            </p>
          </div>

          <!-- Divider -->
          <hr style="border:none; border-top:1px solid #f3f4f6; margin:0 0 20px;"/>

          <!-- Footer -->
          <p style="margin:0; font-size:12px; color:#d1d5db; line-height:1.6;">
            This is an automated message from DiverseLoopers.
            Please do not reply to this email.
            For any issues contact admin.it@diverseloopers.com
          </p>

        </div>

        <!-- Below card -->
        <p style="text-align:center; font-size:12px; color:#9ca3af; margin-top:16px;">
          © ${new Date().getFullYear()} DiverseLoopers. All rights reserved.
        </p>

      </div>

    </body>
    </html>
  `;
}

// ── POST /api/admin/send-credentials ─────────────────────────────────────────
export async function POST() {
  
  console.log("ENV CHECK:");
console.log("HOST:", process.env.SMTP_HOST);
console.log("PORT:", process.env.SMTP_PORT);
console.log("USER:", process.env.SMTP_USER);
console.log("PASS:", process.env.SMTP_PASS ? "SET" : "NOT SET");
console.log("FROM:", process.env.SMTP_FROM);

  try {
    const supabase = getSupabase();

    // 1. Fetch all applicants with credentials not yet sent
    const { data: applicants, error: fetchError } = await supabase
      .from("applications")
      .select("id, applicant_name, applicant_email, applicant_id, applicant_password, job_title")
      .not("applicant_id",       "is", null)
      .not("applicant_password", "is", null)
      .eq("credentials_sent",   false);
      // .or("credentials_sent.is.null,credentials_sent.eq.false");

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch applicants" },
        { status: 500 }
      );
    }

    if (!applicants || applicants.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No pending applicants — all credentials already sent.",
        summary: { total: 0, sent: 0, failed: 0 },
        results: [],
      });
    }

    const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/test-login`;
    const results  = [];

    // 2. Loop each applicant — send email then update DB
    for (const applicant of applicants) {
       console.log("Processing:", applicant.applicant_email);
      try {
        // Send email
       const info = await transporter.sendMail({
          from:    `"DiverseLoopers Hiring" <${process.env.SMTP_FROM}>`,
          to:      applicant.applicant_email,
          subject: `Your Assessment Credentials — ${applicant.job_title} | DiverseLoopers`,
          html:    buildEmailHtml({
            name:     applicant.applicant_name,
            email:    applicant.applicant_email,
            password: applicant.applicant_password,
            jobTitle: applicant.job_title,
            loginUrl,
          }),
        });
        console.log("EMAIL SENT ✅:", info);

        // Mark credentials_sent = true in DB
        const { error: updateError } = await supabase
          .from("applications")
          .update({ credentials_sent: true })
          .eq("id", applicant.id);

        if (updateError) {
          console.error(`DB update failed for ${applicant.applicant_email}:`, updateError);
        }

        results.push({
          name:   applicant.applicant_name,
          email:  applicant.applicant_email,
          status: "sent",
        });

        console.log(results)

      } catch (emailError) {
        console.error(`Email failed for ${applicant.applicant_email}:`, emailError.message);
        results.push({
          name:   applicant.applicant_name,
          email:  applicant.applicant_email,
          status: "failed",
          reason: emailError.message,
        });
        console.log(results)
      }
    }

    // 3. Build and return summary
    const sent   = results.filter(r => r.status === "sent").length;
    const failed = results.filter(r => r.status === "failed").length;

    return NextResponse.json({
      success: true,
      summary: { total: results.length, sent, failed },
      results,
    });

  } catch (err) {
    console.error("Send credentials route error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}