// import { prisma } from "../../../shared/config/prisma.js"

// export const createJob = async (data) => {
//   return prisma.queue.jobs.create({
//     data
//   })
// }

import { prisma } from "../../../shared/prisma.js"

export const createJob = (data) => {
  return prisma.queue.jobs.create({ data })
}