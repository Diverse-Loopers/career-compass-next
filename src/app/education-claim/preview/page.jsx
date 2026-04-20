"use client";

// app/education/preview/page.jsx
// Shows a preview of education form data before final submission.
// In a real app, read `data` from router state, zustand, context, or URL params.

import { useRouter } from "next/navigation";
import PreviewPage from "@/components/education-claim/ui/PreviewPage";
import { EDUCATION_TEXT_FIELDS, EDUCATION_FILE_FIELDS } from "@/config/educationFields";

// ── Mock data — replace with real state from your store / router ──────────────
const MOCK_DATA = {
  institution_name: "Indian Institute of Technology, Delhi",
  university_email: "rahul@iitd.ac.in",
  degree_name: "B.Tech",
  specialization: "Computer Science",
  passing_year: "2023",
  marksheet_upload: { name: "marksheet_sem8.pdf", size: 204800 },
  certificate_upload: { name: "degree_certificate.pdf", size: 153600 },
  college_id_upload: null,
};

export default function EducationPreviewPage() {
  const router = useRouter();

  return (
    <PreviewPage
      title="Review Education Details"
      subtitle="Confirm your academic information before submitting for verification."
      currentStep={3}
      data={MOCK_DATA}
      textFields={EDUCATION_TEXT_FIELDS}
      fileFields={EDUCATION_FILE_FIELDS}
      confirmLabel="Confirm & Submit Education →"
      editLabel="← Edit education details"
      onConfirm={() => router.push("/education/success")}
      onEdit={() => router.push("/education")}
    />
  );
}