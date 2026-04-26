// import express from "express"
// import { upload } from "../../shared/storage/cloudinaryStorage.js"
// import { submitClaim } from "./controllers/claim.controller.js"

// const router = express.Router()

// /**
//  * 🔹 Route: Submit Claim
//  * Handles:
//  * - File upload (Cloudinary via multer-storage-cloudinary)
//  * - Claim creation (education / employment)
//  * - Job enqueue (queue DB)
//  *
//  * Expected FormData:
//  * - type: "education" | "employment"
//  * - employee_id: string
//  * - other fields (based on claim type)
//  * - files: multiple files
//  * - types: array of file types (resume, aadhaar, etc.)
//  */
// router.post(
//   "/submit",
//   upload.array("files"),   // 🔥 Cloudinary handles upload here
//   submitClaim
// )

// export default router

import express from "express"
import { upload } from "../../registration/configs/cloudinaryStorage.js"
import { submitClaim } from "../controllers/claim.controller.js"

const router = express.Router()

router.post("/submit", upload.array("files"), submitClaim)

export default router