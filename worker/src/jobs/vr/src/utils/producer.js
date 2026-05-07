const { verificationQueue } = require('../queues/verificationQueue');
const pools = require('../config/db');

const addJob = async (entity_id, entity_type) => {
  const name = `${entity_type} Verification Request`;
  const data = { entity_id, entity_type };
  
  try {
    const addedJob = await verificationQueue.add(name, data);
    console.log(`[Producer] ✅ Added job: ${name} (ID: ${addedJob.id})`);
    return addedJob;
  } catch (error) {
    console.error(`[Producer] ❌ Failed to add job ${name}:`, error.message);
    throw error;
  }
};

const pollJobsFromPostgres = async () => {
  try {
    const result = await pools.automationQueue.query(`
      SELECT job_id, entity_id, entity_type
      FROM jobs
      WHERE status = 'PENDING'
    `);

    const jobs = result.rows;
    if (jobs.length > 0) {
      console.log(`[Poller] Found ${jobs.length} pending jobs in PostgreSQL.`);
    }

    for (const job of jobs) {
      await addJob(job.entity_id, job.entity_type);
      
      // Update status to QUEUED so we don't process it again
      await pools.automationQueue.query(`
        UPDATE jobs SET status = 'QUEUED' WHERE job_id = $1
      `, [job.job_id]);
    }
  } catch (error) {
    console.error('[Poller] ❌ Error polling jobs:', error.message);
  }
};

const runPollerScript = async () => {
  console.log('\n[Producer] Polling pending jobs from PostgreSQL...');
  await pollJobsFromPostgres();
  try {
    await verificationQueue.close();
    const redisConn = require('../config/redis');
    redisConn.disconnect();
  } catch (e) {}
  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  runPollerScript();
}

module.exports = { addJob, pollJobsFromPostgres };
