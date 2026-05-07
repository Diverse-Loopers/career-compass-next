const { Queue } = require('bullmq');
const connection = require('../config/redis');
const QUEUE_NAME = 'verification-request-queue';

const verificationQueue = new Queue(QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

console.log(`[Queue] Initialized: ${QUEUE_NAME}`);

verificationQueue.on('error', (err) => {
  if (err.code === 'ECONNRESET') {
    console.warn('[Queue] Connection reset by peer (ECONNRESET)');
  } else if (err.code === 'ENOTFOUND') {
    console.warn(`[Queue] DNS lookup failed (ENOTFOUND): ${err.hostname}`);
  } else {
    console.error('[Queue] Unexpected error:', err.message || err);
  }
});

module.exports = {
  verificationQueue,
  QUEUE_NAME,
};
