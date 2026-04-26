// import { createJob } from "../repositories/job.repo.js"

// export const enqueueJob = async ({
//   entityId,
//   employeeId,
//   type
// }) => {

//   let jobType = ""
//   let entityType = ""

//   if (type === "education") {
//     jobType = "EDU_VERIFICATION_REQUEST"
//     entityType = "EDUCATION"
//   }

//   if (type === "employment") {
//     jobType = "EMP_VERIFICATION_REQUEST"
//     entityType = "EMPLOYMENT"
//   }

//   return createJob({
//     job_type: jobType,
//     entity_id: entityId,
//     employee_id: employeeId,
//     entity_type: entityType
//   })
// }

import { createJob } from "../repositories/job.repo.js"

export const enqueueJob = async ({ entityId, employeeId, type }) => {
  const jobMap = {
    education: {
      job_type: "EDU_VERIFICATION_REQUEST",
      entity_type: "EDUCATION"
    },
    employment: {
      job_type: "EMP_VERIFICATION_REQUEST",
      entity_type: "EMPLOYMENT"
    }
  }

  const config = jobMap[type]

  return createJob({
    ...config,
    entity_id: entityId,
    employee_id: employeeId
  })
}