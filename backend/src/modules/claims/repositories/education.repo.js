// import { prisma } from "../../../shared/config/prisma.js"

// export const createEducationClaim = async (data) => {
//   return prisma.education.education_claims.create({
//     data
//   })
// }

import { prisma } from "../../../shared/prisma.js"

export const createEducationClaim = (data) => {
  return prisma.education.education_claims.create({ data })
}