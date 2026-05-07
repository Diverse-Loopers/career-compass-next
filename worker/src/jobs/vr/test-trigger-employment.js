const { v4: uuidv4 } = require('uuid');
const pools = require('./src/config/db');

async function triggerJob() {
  try {
    const jobId = uuidv4();
    const entityId = uuidv4();
    const employeeId = uuidv4();
    
    const query = `
      INSERT INTO jobs (job_id, created_at, entity_id, entity_type, status, employee_id, job_type) 
      VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      jobId, 
      entityId, 
      'EMPLOYMENT', 
      'WAITING', 
      employeeId,
      'EMP_VERIFICATION_REQUEST'
    ];

    const res = await pools.automationQueue.query(query, values);
    
    console.log("✅ Successfully inserted NEW EMPLOYMENT test job into PostgreSQL!");
    console.log("-------------------------------------------------");
    console.log("Job Details:", res.rows[0]);
    console.log("-------------------------------------------------");
    console.log("Wait up to 10 seconds, and watch your server terminal pick it up!");
    
  } catch (err) {
    console.error("❌ Error inserting job:", err.message);
  } finally {
    process.exit(0);
  }
}

triggerJob();
