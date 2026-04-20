"use client";

// app/education/details/page.jsx
// Read-only view of already-submitted education data.
// Shown when user revisits after submitting.

import { useRouter } from "next/navigation";
import SavedDetailsPage from "@/components/education-claim/ui/SavedDetailsPage";
import { EDUCATION_TEXT_FIELDS, EDUCATION_FILE_FIELDS } from "@/config/educationFields";

// ── Mock data — replace with API fetch or store ───────────────────────────────
const SAVED_DATA = {
  institution_name: "Indian Institute of Technology, Delhi",
  university_email: "rahul@iitd.ac.in",
  degree_name: "B.Tech",
  specialization: "Computer Science",
  passing_year: "2023",
  marksheet_upload: { name: "marksheet_sem8.pdf", size: 204800 },
  certificate_upload: { name: "degree_certificate.pdf", size: 153600 },
  college_id_upload: { name: "college_id.jpg", size: 98304 },
};

export default function EducationDetailsPage() {
  const router = useRouter();

  return (
    <SavedDetailsPage
      title="Education Details"
      subtitle="Your submitted academic information."
      badge="Pending"                        // "Verified" | "Pending" | "Rejected"
      data={SAVED_DATA}
      textFields={EDUCATION_TEXT_FIELDS}
      fileFields={EDUCATION_FILE_FIELDS}
      submittedAt="2025-04-08T10:30:00"
      onEdit={() => router.push("/education")}
      onAddNew={() => router.push("/education?mode=add")}
    />
  );
}