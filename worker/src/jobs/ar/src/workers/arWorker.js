const { Worker, UnrecoverableError } = require('bullmq');
const connection = require('../config/redis');
const { QUEUE_NAME } = require('../queues/arQueue');
const { runARWorkflow } = require('../services/arProcessor');

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    const { email_id, sender, subject, body, attachments } = job.data;

    try {
      console.log(`[Worker] 📨 Processing incoming email from ${sender} (Job: ${job.id})`);
      return await runARWorkflow(job.id, sender, subject, body, email_id);
    } catch (error) {
      console.error(`[Worker] Error in job ${job.id}:`, error.message);
      
      // If it's a fatal identification error, we might not want to retry
      if (error.code === 'UNIDENTIFIED_RESPONSE') {
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
  console.error('[Worker] Unexpected worker error:', err.message || err);
});

console.log(`[Worker] 👂 Listening for authority responses on ${QUEUE_NAME}...`);

module.exports = worker;
