const { arQueue } = require('../queues/arQueue');
const pools = require('../config/db');

/**
 * Adds an Authority Response job to the BullMQ queue
 */
const addARJob = async (emailData) => {
  const name = 'Authority Response Process';
  try {
    // Note: The worker expects data in the format { email_id, sender, subject, body, attachments }
    const addedJob = await arQueue.add('process_response', emailData);
    console.log(`[AR Producer] ✅ Added job: ${name} (ID: ${addedJob.id})`);
    return addedJob;
  } catch (error) {
    console.error(`[AR Producer] ❌ Failed to add job ${name}:`, error.message);
    throw error;
  }
};

/**
 * Polls the PostgreSQL automation queue for pending Authority Response jobs
 */
const pollJobsFromPostgres = async () => {
  try {
    const result = await pools.automationQueue.query(`
      SELECT job_id, entity_id, employee_id
      FROM jobs
      WHERE status = 'WAITING'
      AND job_type = 'AUTHORITY_RESPONSE'
    `);

    const jobs = result.rows;
    if (jobs.length > 0) {
      console.log(`[AR Poller] Found ${jobs.length} waiting AR jobs in PostgreSQL.`);
    }

    for (const job of jobs) {
      // 1. Fetch email data from verification_communication using entity_id (acting as message_id)
      const commRes = await pools.verificationEvidence.query(`
        SELECT 
          message_id as email_id, 
          sender_email as sender, 
          email_body as body, 
          verification_token
        FROM verification_communication
        WHERE message_id = $1
        LIMIT 1
      `, [job.entity_id]);

      if (commRes.rows.length === 0) {
        console.warn(`[AR Poller] ⚠️ Could not find email evidence for message_id: ${job.entity_id}`);
        await pools.automationQueue.query(`
          UPDATE jobs SET status = 'FAILED' WHERE job_id = $1
        `, [job.job_id]);
        continue;
      }

      const comm = commRes.rows[0];
      const emailData = {
        email_id: comm.email_id,
        sender: comm.sender,
        subject: `Re: Verification Request ${comm.verification_token}`,
        body: comm.body,
        attachments: [] // Attachments are not yet stored in DB communication table
      };

      // 2. Add to BullMQ
      await addARJob(emailData);

      // 3. Update status in Postgres
      await pools.automationQueue.query(`
        UPDATE jobs SET status = 'ACTIVE' WHERE job_id = $1
      `, [job.job_id]);
    }
  } catch (error) {
    console.error('[AR Poller] ❌ Error polling AR jobs:', error.message);
  }
};

module.exports = { addARJob, pollJobsFromPostgres };
