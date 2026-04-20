"use client";

// components/shared/PreviewPage.jsx
// Shown before final submission. Pass textFields + fileFields config arrays
// and the form data object. Works for Education AND Employment.
//
// Usage — Education:
//   <PreviewPage
//     title="Education Preview"
//     subtitle="Review your education details before submitting."
//     currentStep={3}
//     data={educationFormData}
//     textFields={EDUCATION_TEXT_FIELDS}
//     fileFields={EDUCATION_FILE_FIELDS}
//     onConfirm={handleFinalSubmit}
//     onEdit={() => router.back()}
//   />
//
// Usage — Employment:
//   <PreviewPage ... textFields={EMPLOYMENT_TEXT_FIELDS} fileFields={EMPLOYMENT_FILE_FIELDS} />

import PageShell from "@/components/education-claim/ui/Pageshell";
import DetailCard, { DetailRow, FileRow, DetailSection } from "@/components/education-claim/ui/Detailcard";

export default function PreviewPage({
  title = "Review your details",
  subtitle = "Please confirm everything looks correct before submitting.",
  currentStep,
  data = {},
  textFields = [],
  fileFields = [],
  onConfirm,
  onEdit,
  confirmLabel = "Confirm & Submit →",
  editLabel = "← Edit details",
}) {
  return (
    <PageShell
      heading={title}
      subheading={subtitle}
      currentStep={currentStep}
      primaryLabel={confirmLabel}
      primaryAction={onConfirm}
      secondaryLabel={editLabel}
      secondaryAction={onEdit}
    >
      {/* Info banner */}
      <div className="w-full rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 flex gap-3 items-start">
        <span className="text-blue-500 mt-0.5 flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </span>
        <p className="text-[13px] text-blue-700 leading-relaxed">
          Once submitted, your details will be sent for verification. You won't be able to edit them until the review is complete.
        </p>
      </div>

      {/* Detail card */}
      <DetailCard
        title="Your information"
        subtitle="Verify all details are accurate before confirming."
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