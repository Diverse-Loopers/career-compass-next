const { addJob } = require('./src/utils/producer');
require('dotenv').config();

async function runTest() {
  const entityId = process.argv[2];
  const entityType = process.argv[3] || 'EDUCATION';

  if (!entityId) {
    console.error('Usage: node testRealClaim.js <entity_id> <entity_type>');
    console.log('Example: node testRealClaim.js EDU-123 EDUCATION');
    process.exit(1);
  }

  console.log(`[Test] Adding real claim for testing: ${entityId} (${entityType})`);
  
  try {
    await addJob(entityId, entityType);
    console.log('[Test] Job added successfully. Check worker logs for progress.');
    
    // Keep process alive for a bit to ensure job is sent to Redis
    setTimeout(() => process.exit(0), 1000);
  } catch (error) {
    console.error('[Test] Error adding job:', error.message);
    process.exit(1);
  }
}

runTest();
