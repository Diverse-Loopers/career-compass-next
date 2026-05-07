const { Worker, UnrecoverableError } = require('bullmq');
const connection = require('../config/redis');
const { QUEUE_NAME } = require('../queues/verificationQueue');
const { runVerificationWorkflow } = require('../services/verificationProcessor');

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    const { entity_id, entity_type } = job.data;

    try {
      return await runVerificationWorkflow(job.id, entity_id, entity_type);
    } catch (error) {
      if (error.code === 'CLAIM_DATA_NOT_FOUND') {
        console.error(`[Worker] Fatal error for Job ${job.id}: ${error.message}. Stopping retries.`);
        throw new UnrecoverableError(error.message);
      }
      throw error;
    }
  },
  {
    connection,
    concurrency: 5
  }
);

worker.on('active', (job) => {
  console.log(`[Worker] ⚡ Job ${job.id} is now ACTIVE`);
});

worker.on('completed', (job, result) => {
  console.log(`[Worker] ✅ Job ${job.id} COMPLETED`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker] 🆘 Job ${job.id} FAILED:`, err.message);
});

worker.on('error', (err) => {
  if (err.code === 'ECONNRESET') {
    console.warn('[Worker] Connection reset by peer (ECONNRESET)');
  } else if (err.code === 'ENOTFOUND') {
    console.warn(`[Worker] DNS lookup failed (ENOTFOUND): ${err.hostname}`);
  } else {
    console.error('[Worker] Unexpected error:', err.message || err);
  }
});

console.log(`[Worker] 👂 Listening for jobs on ${QUEUE_NAME}...`);

module.exports = worker;
