import "dotenv/config";

// Import each generated client
import { PrismaClient as IdentityClient } from "../../generated/identity/index.js";
import { PrismaClient as ExceptionClient } from "../../generated/exception/index.js";
import { PrismaClient as WorkflowClient } from "../../generated/workflow/index.js";
import { PrismaClient as EducationClient } from "../../generated/education/index.js";
import { PrismaClient as EmploymentClient } from "../../generated/employment/index.js";
import { PrismaClient as QueueClient } from "../../generated/queue/index.js";

// Prevent multiple instances (important for dev)
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || {
  identity: new IdentityClient(),
  exception: new ExceptionClient(),
  workflow: new WorkflowClient(),
  education: new EducationClient(),
  employment: new EmploymentClient(),
  queue: new QueueClient(),
};

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
