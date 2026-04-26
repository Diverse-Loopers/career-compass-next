import { processClaimFiles } from "../services/claimUpload.service.js"
import { createClaim } from "../services/claim.service.js"

export const submitClaim = async (req, res) => {
  try {
    const { type, ...rest } = req.body

    const documents = processClaimFiles(
      req.files,
      req.body.types
    )

    const payload = {
      ...rest,
      documents
    }

    const result = await createClaim({
      type,
      payload
    })

    res.json({
      success: true,
      data: result
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}