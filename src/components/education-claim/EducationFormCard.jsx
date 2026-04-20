"use client";

import TextInput from "@/components/education-claim/ui/TextInput";
import Label from "@/components/education-claim/ui/Label";
import HelperText from "@/components/education-claim/ui/HelperText";
import FileUpload from "@/components/education-claim/ui/FileUpload";

const CURRENT_YEAR = new Date().getFullYear();

export default function EducationFormCard({ form, errors, setField, setFileField, onSubmit, onBack }) {
  return (
    <div className="w-full max-w-[640px] bg-white rounded-2xl min-w-0 px-4 sm:px-9 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]">

      {/* Card header */}
      <h2 className="font-['DM_Sans'] text-[18px] font-bold text-gray-900 mb-1">
        Education details
      </h2>
      <p className="font-['DM_Sans'] text-[13.5px] text-gray-500 mb-7 leading-relaxed">
        Provide your academic background. All fields marked{" "}
        <span className="text-red-500">*</span> are required.
      </p>

      <div className="flex flex-col gap-5">

        {/* Institution Name */}
        <div>
          <Label required htmlFor="institution_name">Institution Name</Label>
          <TextInput
            id="institution_name"
            placeholder="e.g. Indian Institute of Technology, Delhi"
            value={form.institution_name}
            onChange={(e) => setField("institution_name", e.target.value)}
            error={errors.institution_name}
          />
          <HelperText error={!!errors.institution_name}>
            {errors.institution_name || "Minimum 3 characters. Cannot be empty."}
          </HelperText>
        </div>

        {/* University Email */}
        <div>
          <Label required htmlFor="university_email">University Verification Email</Label>
          <TextInput
            id="university_email"
            type="email"
            placeholder="e.g. rahul@university.ac.in"
            value={form.university_email}
            onChange={(e) => setField("university_email", e.target.value)}
            error={errors.university_email}
          />
          <HelperText error={!!errors.university_email}>
            {errors.university_email || "University verification email (used to confirm your degree)."}
          </HelperText>
        </div>

        {/* Degree + Specialization — 2 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label required htmlFor="degree_name">Degree Name</Label>
            <TextInput
              id="degree_name"
              placeholder="e.g. B.Tech, MBA, M.Sc."
              value={form.degree_name}
              onChange={(e) => setField("degree_name", e.target.value)}
              error={errors.degree_name}
            />
            <HelperText error={!!errors.degree_name}>
              {errors.degree_name || "Min 2 characters."}
            </HelperText>
          </div>
          <div>
            <Label required htmlFor="specialization">Specialization</Label>
            <TextInput
              id="specialization"
              placeholder="e.g. Computer Science, Finance"
              value={form.specialization}
              onChange={(e) => setField("specialization", e.target.value)}
              error={errors.specialization}
            />
            <HelperText error={!!errors.specialization}>
              {errors.specialization || "Min 2 characters."}
            </HelperText>
          </div>
        </div>

        {/* Passing Year */}
        <div>
          <Label required htmlFor="passing_year">Year of Passing</Label>
          <TextInput
            id="passing_year"
            type="number"
            placeholder={`e.g. ${CURRENT_YEAR - 2}`}
            value={form.passing_year}
            onChange={(e) => setField("passing_year", e.target.value)}
            error={errors.passing_year}
            min={1950}
            max={CURRENT_YEAR}
          />
          <HelperText error={!!errors.passing_year}>
            {errors.passing_year || `Between 1950 and ${CURRENT_YEAR} inclusive.`}
          </HelperText>
        </div>

        {/* Section divider */}
        <div className="border-t border-gray-100 mt-1" />
        <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase -mt-2">
          Document Uploads
        </p>

        {/* Marksheet */}
        <FileUpload
          label="Marksheet / Transcript"
          required
          value={form.marksheet_upload}
          error={errors.marksheet_upload}
          onChange={(file, err) => setFileField("marksheet_upload", file, err)}
        />

        {/* Certificate */}
        <FileUpload
          label="Degree Certificate"
          required
          value={form.certificate_upload}
          error={errors.certificate_upload}
          onChange={(file, err) => setFileField("certificate_upload", file, err)}
        />

        {/* College ID — optional */}
        <FileUpload
          label="College ID Card (Optional)"
          value={form.college_id_upload}
          error={errors.college_id_upload}
          onChange={(file, err) => setFileField("college_id_upload", file, err)}
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
          Submit Education Details →
        </button>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full py-[13px] bg-transparent text-gray-700 border-[1.5px]
              border-gray-200 hover:border-gray-400 rounded-xl text-[14px] font-semibold
              transition-colors duration-200 cursor-pointer"
          >
            ← Back to identity proof
          </button>
        )}
      </div>

    </div>
  );
}