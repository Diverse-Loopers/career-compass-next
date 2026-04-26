export const submitEmploymentClaim = async (form) => {
  const formData = new FormData()

  formData.append("type", "employment")
  formData.append("employee_id", "EMP123")

  formData.append("company_name", form.company_name)
  formData.append("hr_email", form.hr_email)
  formData.append("job_role", form.job_role)
  formData.append("joining_date", form.joining_date)

  // files
  formData.append("files", form.offer_letter_upload)
  formData.append("types", "offer_letter")

  formData.append("files", form.experience_letter_upload)
  formData.append("types", "experience_letter")

  if (form.salary_slip_upload) {
    formData.append("files", form.salary_slip_upload)
    formData.append("types", "salary_slip")
  }

  const res = await fetch("http://localhost:5000/api/claim/submit", {
    method: "POST",
    body: formData,
  })

  return res.json()
}