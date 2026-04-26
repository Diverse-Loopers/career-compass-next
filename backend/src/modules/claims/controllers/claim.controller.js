import { processClaimFiles } from "../services/claimUpload.service.js"
import { createClaim } from "../services/claim.service.js"
import { successResponse, errorResponse } from "../../../shared/services/response.service.js"

export const submitClaim = async (req, res) => {
  console.log("submit claim fn triggered");
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);
    const { type, ...rest } = req.body

    if (rest.passing_year) rest.passing_year = parseInt(rest.passing_year)

    const documents = processClaimFiles(req.files, req.body.types)
    console.log("Processed documents:", documents);

    const entity_id = "EDU-112345";

    const payload = {
      ...rest,
      documents,
      entity_id
    }
    console.log("Final claim payload:", payload);

    const result = await createClaim({ type, payload })
    console.log("Claim created result:", result);

    return successResponse(res, result)

  } catch (err) {
    console.error(err)
    return errorResponse(res, err)
  }
}