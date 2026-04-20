// config/educationFields.js
// Describes every education field: used by preview + saved detail pages.

export const EDUCATION_TEXT_FIELDS = [
  { key: "institution_name",  label: "Institution Name" },
  { key: "university_email",  label: "University Verification Email" },
  { key: "degree_name",       label: "Degree Name" },
  { key: "specialization",    label: "Specialization" },
  { key: "passing_year",      label: "Year of Passing" },
];

export const EDUCATION_FILE_FIELDS = [
  { key: "marksheet_upload",   label: "Marksheet / Transcript",  required: true },
  { key: "certificate_upload", label: "Degree Certificate",      required: true },
  { key: "college_id_upload",  label: "College ID Card",         required: false },
];