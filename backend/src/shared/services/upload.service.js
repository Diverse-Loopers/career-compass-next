export const mapUploadedFiles = (files, types) => {
  const documents = {}

  files.forEach((file, index) => {
    const type = types[index]
    documents[type] = file.path
  })

  return documents
}