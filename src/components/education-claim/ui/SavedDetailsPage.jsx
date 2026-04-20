"use client";

// components/shared/SavedDetailsPage.jsx
// Shown when the user revisits after already submitting.
// Displays saved data in read-only mode with a verification badge.
// Works for Education AND Employment by passing the right field configs.
//
// Usage — Education:
//   <SavedDetailsPage
//     title="Education Details"
//     subtitle="Your submitted education information."
//     badge="Pending"                        // "Verified" | "Pending" | "Rejected"
//     data={savedEducationData}
//     textFields={EDUCATION_TEXT_FIELDS}
//     fileFields={EDUCATION_FILE_FIELDS}
//     onEdit={handleEdit}                    // optional — show edit button
//     onAddNew={handleAddNew}                // optional — add another record
//   />

import PageShell from "@/components/education-claim/ui/Pageshell";
import DetailCard, { DetailRow, FileRow, DetailSection } from "@/components/education-claim/ui/Detailcard";

// ─── Status banner config ─────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Verified: {
    bg: "bg-green-50",
    border: "border-green-100",
    text: "text-green-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    message: "Your details have been verified successfully.",
  },
  Pending: {
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    text: "text-yellow-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    message: "Your details are under review. This usually takes 1–2 business days.",
  },
  Rejected: {
    bg: "bg-red-50",
    border: "border-red-100",
    text: "text-red-700",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    message: "Verification failed. Please re-upload your documents and resubmit.",
  },
};

export default function SavedDetailsPage({
  title = "Submitted Details",
  subtitle = "Your previously submitted information.",
  badge = "Pending",
  data = {},
  textFields = [],
  fileFields = [],
  submittedAt,
  onEdit,
  onAddNew,
}) {
  const status = STATUS_CONFIG[badge] || STATUS_CONFIG.Pending;

  return (
    <PageShell
      heading={title}
      subheading={subtitle}
      primaryLabel={onAddNew ? "Add another record +" : undefined}
      primaryAction={onAddNew}
      secondaryLabel={onEdit && badge === "Rejected" ? "Re-upload & resubmit →" : onEdit ? "Edit details" : undefined}
      secondaryAction={onEdit}
    >
      {/* Status banner */}
      <div className={`w-full rounded-xl ${status.bg} border ${status.border} px-4 py-3 flex gap-3 items-start`}>
        <span className={`${status.text} mt-0.5 flex-shrink-0`}>{status.icon}</span>
        <div>
          <p className={`text-[13px] font-semibold ${status.text}`}>{badge}</p>
          <p className={`text-[13px] ${status.text} leading-relaxed`}>{status.message}</p>
        </div>
      </div>

      {/* Submitted timestamp */}
      {submittedAt && (
        <p className="text-[12px] text-gray-400 px-1">
          Submitted on {new Date(submittedAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric",
          })}
        </p>
      )}

      {/* Detail card */}
      <DetailCard
        title="Submitted information"
        badge={badge}
      >
        {/* Text fields */}
        {textFields.length > 0 && (
          <DetailSection title="Basic Details">
            {textFields.map(({ key, label }) => (
              <DetailRow
                key={key}
                label={label}
                value={data[key]}
                missing={!data[key]}
              />
            ))}
          </DetailSection>
        )}

        {/* File fields */}
        {fileFields.length > 0 && (
          <>
            <div className="border-t border-gray-100 my-4" />
            <DetailSection title="Uploaded Documents">
              {fileFields.map(({ key, label, required }) => (
                <FileRow
                  key={key}
                  label={label}
                  file={data[key]}
                  required={required}
                />
              ))}
            </DetailSection>
          </>
        )}
      </DetailCard>
    </PageShell>
  );
}