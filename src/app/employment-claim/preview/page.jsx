"use client";

// app/employment/preview/page.jsx

import { useRouter } from "next/navigation";
import PreviewPage from "@/components/education-claim/ui/PreviewPage";
import { EMPLOYMENT_TEXT_FIELDS, EMPLOYMENT_FILE_FIELDS } from "@/config/employmentFields";

// ── Mock data — replace with real state ──────────────────────────────────────
const MOCK_DATA = {
  company_name: "Tata Consultancy Services",
  hr_email: "hr@tcs.com",
  job_role: "Software Engineer",
  joining_date: "2023-07-01",
  offer_letter_upload: { name: "offer_letter_tcs.pdf", size: 178432 },
  experience_letter_upload: { name: "experience_letter.pdf", size: 145920 },
  payslip_upload: null,
};

export default function EmploymentPreviewPage() {
  const router = useRouter();

  return (
    <PreviewPage
      title="Review Employment Details"
      subtitle="Confirm your work information before submitting for verification."
      currentStep={4}
      data={MOCK_DATA}
      textFields={EMPLOYMENT_TEXT_FIELDS}
      fileFields={EMPLOYMENT_FILE_FIELDS}
      confirmLabel="Confirm & Submit Employment →"
      editLabel="← Edit employment details"
      onConfirm={() => router.push("/employment/success")}
      onEdit={() => router.push("/employment")}
    />
  );
}