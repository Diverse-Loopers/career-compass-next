"use client";

import { useState } from "react";
import StepIndicator from "@/components/education-claim/ui/StepIndicator";
import PreviewModal from "@/components/education-claim/ui/PreviewModal";
import { EMPLOYMENT_TEXT_FIELDS, EMPLOYMENT_FILE_FIELDS } from "@/config/employmentFields";
import EmploymentFormCard from "@/components/employment-claim/Employmentformcard";
import EmploymentSuccessState from "@/components/employment-claim/Employmentsuccessstate";

const TODAY = new Date().toISOString().split("T")[0];

const initialForm = {
  company_name: "",
  hr_email: "",
  job_role: "",
  joining_date: "",
  offer_letter_upload: null,
  experience_letter_upload: null,
  payslip_upload: null,
};

const initialErrors = Object.fromEntries(
  Object.keys(initialForm).map((k) => [k, ""])
);

export default function EmploymentForm({ onBack, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);                    // ← ADD
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const setFileField = (key, file, err) => {
    setForm((prev) => ({ ...prev, [key]: file }));
    setErrors((prev) => ({ ...prev, [key]: err || "" }));
  };

  const validate = () => {
    const e = { ...initialErrors };
    let valid = true;

    if (!form.company_name || form.company_name.trim().length < 2) {
      e.company_name = "Company name must be at least 2 characters.";
      valid = false;
    }
    if (!form.hr_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.hr_email)) {
      e.hr_email = "Enter a valid HR / company email address.";
      valid = false;
    }
    if (!form.job_role || form.job_role.trim().length < 2) {
      e.job_role = "Job role must be at least 2 characters.";
      valid = false;
    }
    if (!form.joining_date) {
      e.joining_date = "Joining date is required.";
      valid = false;
    } else if (form.joining_date > TODAY) {
      e.joining_date = "Joining date cannot be a future date.";
      valid = false;
    }
    if (!form.offer_letter_upload) {
      e.offer_letter_upload = "Offer letter is required.";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowPreview(true);
    }
//     // if (validate()) {
//       if (validate()) {
//   router.push("/education/preview"); // save form data to store first
// }
//     //   setSubmitted(true);
//     //   onSubmit?.(form);
//     // }
  };

  // ← ADD: called from modal confirm button
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit?.(form);   // your API call goes here
      setShowPreview(false);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-3 sm:px-5 pt-10 pb-16 font-['DM_Sans'] overflow-x-hidden w-full">
<PreviewModal
  isOpen={showPreview}
  title="Review Employment Details"
  textFields={EMPLOYMENT_TEXT_FIELDS}
  fileFields={EMPLOYMENT_FILE_FIELDS}
  data={form}
  onEdit={() => setShowPreview(false)}
  onConfirm={handleFinalSubmit}
  isSubmitting={isSubmitting}
/>



      {/* Brand */}
      <div className="w-full max-w-[640px] mb-7 px-1 sm:px-0">
        <span className="text-[17px] font-bold text-gray-900 tracking-tight">
          SkillVerify
        </span>
      </div>

      {/* Page heading */}
      <div className="w-full max-w-[640px] mb-7 px-1 sm:px-0">
        <h1 className="font-['Playfair_Display'] text-[30px] font-bold text-gray-900 tracking-tight mb-1.5">
          Create your account
        </h1>
        <p className="text-sm text-gray-500">
          Complete all steps to register and verify your identity.
        </p>
      </div>

      {/* Step indicator — step 4 = Employment */}
      <div className="w-full max-w-[640px] px-1 sm:px-0">
        <StepIndicator currentStep={4} />
      </div>

      {/* Card or success */}
      {submitted ? (
        <EmploymentSuccessState />
      ) : (
        <EmploymentFormCard
          form={form}
          errors={errors}
          setField={setField}
          setFileField={setFileField}
          onSubmit={handleSubmit}
          onBack={onBack}
        />
      )}
    </div>
  );
}