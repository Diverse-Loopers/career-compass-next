// config/employmentFields.js

export const EMPLOYMENT_TEXT_FIELDS = [
  { key: "company_name",  label: "Company Name" },
  { key: "hr_email",      label: "HR / Company Verification Email" },
  { key: "job_role",      label: "Job Role" },
  { key: "joining_date",  label: "Joining Date" },
];

export const EMPLOYMENT_FILE_FIELDS = [
  { key: "offer_letter_upload",      label: "Offer Letter",        required: true },
  { key: "experience_letter_upload", label: "Experience Letter",   required: false },
  { key: "payslip_upload",           label: "Payslip",             required: false },
];