"use client";

import { useState } from "react";
import Navbar from "@/components/education-claim/Navbar";
import PreviewModal from "@/components/education-claim/ui/PreviewModal";
import { EDUCATION_TEXT_FIELDS, EDUCATION_FILE_FIELDS } from "@/config/educationFields"; 
import StepIndicator from "@/components/education-claim/ui/StepIndicator";
import EducationFormCard from "@/components/education-claim/EducationFormCard";
import SuccessState from "@/components/education-claim/SuccessState";

const CURRENT_YEAR = new Date().getFullYear();

const initialForm = {
  institution_name: "",
  university_email: "",
  degree_name: "",
  specialization: "",
  passing_year: "",
  marksheet_upload: null,
  certificate_upload: null,
  college_id_upload: null,
};

const initialErrors = Object.fromEntries(
  Object.keys(initialForm).map((k) => [k, ""])
);

export default function EducationForm({ onBack, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitted, setSubmitted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);                    // ← ADD
  const [isSubmitting, setIsSubmitting] = useState(false);  

  /** Update a text field and clear its error */
  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  /** Update a file field (with optional validation error from FileUpload) */
  const setFileField = (key, file, err) => {
    setForm((prev) => ({ ...prev, [key]: file }));
    setErrors((prev) => ({ ...prev, [key]: err || "" }));
  };

  const validate = () => {
    const e = { ...initialErrors };
    let valid = true;

    if (!form.institution_name || form.institution_name.trim().length < 3) {
      e.institution_name = "Institution name must be at least 3 characters.";
      valid = false;
    }
    if (!form.university_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.university_email)) {
      e.university_email = "Enter a valid university email address.";
      valid = false;
    }
    if (!form.degree_name || form.degree_name.trim().length < 2) {
      e.degree_name = "Degree name must be at least 2 characters (e.g. B.Tech, MBA).";
      valid = false;
    }
    if (!form.specialization || form.specialization.trim().length < 2) {
      e.specialization = "Specialization must be at least 2 characters.";
      valid = false;
    }
    const yr = parseInt(form.passing_year);
    if (!form.passing_year || isNaN(yr) || yr < 1950 || yr > CURRENT_YEAR) {
      e.passing_year = `Year must be between 1950 and ${CURRENT_YEAR}.`;
      valid = false;
    }
    if (!form.marksheet_upload) {
      e.marksheet_upload = "Marksheet is required.";
      valid = false;
    }
    if (!form.certificate_upload) {
      e.certificate_upload = "Certificate is required.";
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleSubmit = () => {
    // if (validate()) {
    //   setSubmitted(true);
    //   onSubmit?.(form);
    // }
    if (validate()) {
      setShowPreview(true);
    }
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

  if (submitted) return <SuccessState />;

  return (
    <>

  {/* Modal sits here — has access to form data directly */}
      <PreviewModal                                                          // ← ADD
        isOpen={showPreview}
        title="Review Education Details"
        textFields={EDUCATION_TEXT_FIELDS}
        fileFields={EDUCATION_FILE_FIELDS}
        data={form}
        onEdit={() => setShowPreview(false)}    // close = back to form
        onConfirm={handleFinalSubmit}
        isSubmitting={isSubmitting}
      />


      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center px-3 sm:px-5 pt-10 pb-16 font-['DM_Sans']">

{/* {navbar} */}

  <Navbar />


        {/* Brand */}
        <div className="w-full max-w-[640px] mb-7">
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

        {/* Step indicator */}
        <div className="w-full max-w-[640px]">
          <StepIndicator currentStep={3} />
        </div>

        {/* Form card or success */}
        {submitted ? (
          <SuccessState />
        ) : (
          <EducationFormCard
            form={form}
            errors={errors}
            setField={setField}
            setFileField={setFileField}
            onSubmit={handleSubmit}
            onBack={onBack}
          />
        )}

      </div>
    </>
  );
}