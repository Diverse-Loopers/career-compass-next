const { verificationQueue } = require('../queues/verificationQueue');
const addJob = async (entity_id, entity_type) => {
  const name = `${entity_type} Verification Test`;
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
const addTestJobs = async () => {
  console.log('\n[Producer] Adding test jobs to queue...');

  const testJobs = [
    { entity_id: 'EDU-1001', entity_type: 'EDUCATION' },
    { entity_id: 'EMP-2001', entity_type: 'EMPLOYMENT' }
  ];

  for (const job of testJobs) {
    await addJob(job.entity_id, job.entity_type);
  }

  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  addTestJobs();
}

module.exports = { addJob };
