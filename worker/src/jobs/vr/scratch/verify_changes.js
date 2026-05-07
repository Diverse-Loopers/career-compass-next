const { runVerificationWorkflow } = require('../src/services/verificationProcessor');
require('dotenv').config();

async function test() {
  const entityId = 'EDU-TEST-001';
  const entityType = 'EDUCATION';
  
  try {
    console.log(`🚀 Starting test for ${entityId}...`);
    const result = await runVerificationWorkflow('test-job-id', entityId, entityType);
    console.log('✅ Test Result:', result);
  } catch (error) {
    console.error('❌ Test Failed:', error);
  } finally {
    process.exit(0);
  }
}

test();
