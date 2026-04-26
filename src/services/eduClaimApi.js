export const submitEducationClaim = async (form) => {
  const formData = new FormData()

  formData.append("type", "education")
  formData.append("employee_id", "EMP123")

  formData.append("institution_name", form.institution_name)
  formData.append("university_email", form.university_email)
  formData.append("degree_name", form.degree_name)
  formData.append("specialization", form.specialization)
  formData.append("passing_year", form.passing_year)

  // files
  formData.append("files", form.marksheet_upload)
  formData.append("types", "marksheet")

  formData.append("files", form.certificate_upload)
  formData.append("types", "certificate")

  if (form.college_id_upload) {
    formData.append("files", form.college_id_upload)
    formData.append("types", "college_id")
  }

  const res = await fetch("http://localhost:5000/api/claim/submit", {
    method: "POST",
    body: formData,
  })

  return res.json()
}