"use client";

// app/employment/details/page.jsx

import { useRouter } from "next/navigation";
import SavedDetailsPage from "@/components/education-claim/ui/SavedDetailsPage";
import { EMPLOYMENT_TEXT_FIELDS, EMPLOYMENT_FILE_FIELDS } from "@/config/employmentFields";

// ── Mock data — replace with API fetch or store ───────────────────────────────
const SAVED_DATA = {
  company_name: "Tata Consultancy Services",
  hr_email: "hr@tcs.com",
  job_role: "Software Engineer",
  joining_date: "2023-07-01",
  offer_letter_upload: { name: "offer_letter_tcs.pdf", size: 178432 },
  experience_letter_upload: { name: "experience_letter.pdf", size: 145920 },
  payslip_upload: null,
};

export default function EmploymentDetailsPage() {
  const router = useRouter();

  return (
    <SavedDetailsPage
      title="Employment Details"
      subtitle="Your submitted work history information."
      badge="Verified"                       // "Verified" | "Pending" | "Rejected"
      data={SAVED_DATA}
      textFields={EMPLOYMENT_TEXT_FIELDS}
      fileFields={EMPLOYMENT_FILE_FIELDS}
      submittedAt="2025-04-05T09:00:00"
      onEdit={() => router.push("/employment")}
      onAddNew={() => router.push("/employment?mode=add")}
    />
  );
}