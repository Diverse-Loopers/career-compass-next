export const mapUploadedFiles = (files, types) => {
  const result = {}

  files.forEach((file, index) => {
    const type = types[index]
    result[type] = file.path // Cloudinary URL
  })

  return result
}