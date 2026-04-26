import { mapUploadedFiles } from "../../../shared/services/upload.service.js"

export const processClaimFiles = (files, types) => {
  return mapUploadedFiles(files, types)
}