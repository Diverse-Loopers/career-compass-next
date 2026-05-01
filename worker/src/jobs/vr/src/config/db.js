const { Pool } = require('pg');
require('dotenv').config();
const configs = {
  identity: process.env.IDENTITY_DB_URL,
  exception: process.env.EXCEPTION_DB_URL,
  workflow: process.env.WORKFLOW_DB_URL,
  educationClaim: process.env.EDUCATION_CLAIM_DB_URL,
  employmentClaim: process.env.EMPLOYMENT_CLAIM_DB_URL,
  projectClaim: process.env.PROJECT_CLAIM_DB_URL,
  automationQueue: process.env.AUTOMATION_QUEUE_DB_URL,
  verification: process.env.VERIFICATION_DB_URL,
  verificationEvidence: process.env.VERIFICATION_EVIDENCE_DB_URL,
};

const pools = {};

Object.entries(configs).forEach(([key, url]) => {
  if (!url) {
    console.warn(`[DB] Warning: ${key.toUpperCase()}_DB_URL is not defined in environment variables.`);
    return;
  }
  
  pools[key] = new Pool({
    connectionString: url,
    ssl: url.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
  });

  pools[key].on('error', (err) => {
    console.error(`[DB] Unexpected error on idle client for ${key} database:`, err);
  });
});

module.exports = pools;
