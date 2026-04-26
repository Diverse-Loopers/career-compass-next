import { createEducationClaim } from "../repositories/education.repo.js"
import { createEmploymentClaim } from "../repositories/employment.repo.js"
import { enqueueJob } from "./job.service.js"

export const createClaim = async ({ type, payload }) => {
  let result

  if (type === "education") {
    result = await createEducationClaim(payload)
  }

  if (type === "employment") {
    result = await createEmploymentClaim(payload)
  }

  if (!result) throw new Error("Invalid claim type")

  // queue job
  await enqueueJob({
    entityId: result.entity_id,
    employeeId: result.employee_id,
    type
  })

  return result
}