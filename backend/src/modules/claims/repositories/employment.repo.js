// import { prisma } from "../../../shared/config/prisma.js"

// export const createEmploymentClaim = async (data) => {
//   return prisma.employment.employment_claims.create({
//     data
//   })
// }

import { prisma } from "../../../shared/prisma.js"

export const createEmploymentClaim = (data) => {
  return prisma.employment.employment_claims.create({ data })
}