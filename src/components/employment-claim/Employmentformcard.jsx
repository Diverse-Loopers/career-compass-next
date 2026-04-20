"use client";

import TextInput from "@/components/education-claim/ui/TextInput";
import Label from "@/components/education-claim/ui/Label";
import HelperText from "@/components/education-claim/ui/HelperText";
import FileUpload from "@/components/education-claim/ui/FileUpload";

const TODAY = new Date().toISOString().split("T")[0];

export default function EmploymentFormCard({ form, errors, setField, setFileField, onSubmit, onBack }) {
  return (
    <div className="w-full max-w-[640px] min-w-0 bg-white rounded-2xl px-4 sm:px-9 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]">

      {/* Card header */}
      <h2 className="font-['DM_Sans'] text-[18px] font-bold text-gray-900 mb-1">
        Employment details
      </h2>
      <p className="font-['DM_Sans'] text-[13.5px] text-gray-500 mb-7 leading-relaxed">
        Provide your work history. All fields marked{" "}
        <span className="text-red-500">*</span> are required.
      </p>

      <div className="flex flex-col gap-5">

        {/* Company Name */}
        <div>
          <Label required htmlFor="company_name">Company Name</Label>
          <TextInput
            id="company_name"
            placeholder="e.g. Infosys, Tata Consultancy Services"
            value={form.company_name}
            onChange={(e) => setField("company_name", e.target.value)}
            error={errors.company_name}
          />
          <HelperText error={!!errors.company_name}>
            {errors.company_name || "Minimum 2 characters. Cannot be empty."}
          </HelperText>
        </div>

        {/* HR Email */}
        <div>
          <Label required htmlFor="hr_email">HR / Company Verification Email</Label>
          <TextInput
            id="hr_email"
            type="email"
            placeholder="e.g. hr@company.com"
            value={form.hr_email}
            onChange={(e) => setField("hr_email", e.target.value)}
            error={errors.hr_email}
          />
          <HelperText error={!!errors.hr_email}>
            {errors.hr_email || "HR / Company verification email (used to confirm your employment)."}
          </HelperText>
        </div>

        {/* Job Role + Joining Date — 2 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required htmlFor="job_role">Job Role</Label>
            <TextInput
              id="job_role"
              placeholder="e.g. Software Engineer"
              value={form.job_role}
              onChange={(e) => setField("job_role", e.target.value)}
              error={errors.job_role}
            />
            <HelperText error={!!errors.job_role}>
              {errors.job_role || "Min 2 characters."}
            </HelperText>
          </div>

          <div>
            <Label required htmlFor="joining_date">Joining Date</Label>
            <TextInput
              id="joining_date"
              type="date"
              value={form.joining_date}
              onChange={(e) => setField("joining_date", e.target.value)}
              error={errors.joining_date}
              max={TODAY}
            />
            <HelperText error={!!errors.joining_date}>
              {errors.joining_date || "Must be a past date."}
            </HelperText>
          </div>
        </div>

        {/* Section divider */}
        <div className="border-t border-gray-100 mt-1" />
        <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase -mt-2">
          Document Uploads
        </p>

        {/* Offer Letter — required */}
        <FileUpload
          label="Offer Letter"
          required
          value={form.offer_letter_upload}
          error={errors.offer_letter_upload}
          onChange={(file, err) => setFileField("offer_letter_upload", file, err)}
        />

        {/* Experience Letter — optional */}
        <FileUpload
          label="Experience Letter (Optional)"
          value={form.experience_letter_upload}
          error={errors.experience_letter_upload}
          onChange={(file, err) => setFileField("experience_letter_upload", file, err)}
        />

        {/* Payslip — optional */}
        <FileUpload
          label="Payslip (Optional)"
          value={form.payslip_upload}
          error={errors.payslip_upload}
          onChange={(file, err) => setFileField("payslip_upload", file, err)}
        />

      </div>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onSubmit}
          className="w-full py-[15px] bg-gray-900 hover:bg-blue-700 text-white rounded-xl
            text-[15px] font-bold tracking-[-0.01em] transition-colors duration-200 cursor-pointer"
        >
          Submit Employment Details →
        </button>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full py-[13px] bg-transparent text-gray-700 border-[1.5px]
              border-gray-200 hover:border-gray-400 rounded-xl text-[14px] font-semibold
              transition-colors duration-200 cursor-pointer"
          >
            ← Back to education details
          </button>
        )}
      </div>

    </div>
  );
}