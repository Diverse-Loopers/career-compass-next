const pools = require('../config/db');
const { 
  extractToken, 
  validateSender, 
  parseDecision, 
  storeEvidence 
} = require('./emailService');
const { logException } = require('./exceptionService');
const { updateWorkflowStatus } = require('./workflowService');

/**
 * Orchestrates the Authority Response (AR) Automation Flow
 */
const runARWorkflow = async (jobId, sender, subject, body, message_id) => {
  let token = null;
  let requestData = null;
  const PLATFORM_EMAIL = 'verification@platform.com';

  try {
    console.log(`\n--- Started AR Workflow (Job: ${jobId}) ---`);

    // STEP 2: Identify Verification Request
    token = extractToken(subject, body);
    
    if (!token) {
      console.warn('[ARProcessor] ⚠️ No token found in email.');
      await logException(null, null, 'AUTOMATION_FAILURE', 'No verification token found in email content', { sender, subject });
      throw { code: 'UNIDENTIFIED_RESPONSE', message: 'Token not found' };
    }

    // Retrieve request data
    const requestRes = await pools.verification.query(
      'SELECT entity_id, employee_id, entity_type FROM verification_request WHERE verification_token ILIKE $1 LIMIT 1',
      [token]
    );

    if (requestRes.rows.length === 0) {
      console.warn(`[ARProcessor] ⚠️ Token ${token} not found in database.`);
      await logException(null, null, 'AUTOMATION_FAILURE', `Token ${token} not found in database`, { sender, subject });
      throw { code: 'UNIDENTIFIED_RESPONSE', message: 'Invalid token' };
    }

    requestData = requestRes.rows[0];
    const { entity_id, employee_id, entity_type } = requestData;

    // STEP 3: Validate Sender Authority
    const validation = await validateSender(sender, token);
    if (!validation.valid) {
      console.warn(`[ARProcessor] ❌ Validation failed for ${sender}: ${validation.reason}`);
      await logException(entity_id, employee_id, 'AUTOMATION_FAILURE', `Sender ${sender} is not authorized for token ${token}`, { reason: validation.reason });
    }

    // STEP 5: Store Response (linked to token)
    await storeEvidence(token, sender, PLATFORM_EMAIL, body, message_id || `MSG-${jobId}`);

    // If validation failed, we stop updating the status
    if (!validation.valid) {
      return { status: 'INVALID_SENDER', token };
    }

    // STEP 4: Read Verification Decision
    const decision = parseDecision(body);
    console.log(`[ARProcessor] 🤖 Interpreted decision: ${decision}`);

    // STEP 6: Update Verification Status
    let finalStatus;
    if (decision === 'VERIFIED') finalStatus = 'VERIFIED';
    else if (decision === 'REJECTED') finalStatus = 'REJECTED';
    else finalStatus = 'MANUAL_REVIEW_REQUIRED';

    await updateWorkflowStatus(entity_id, finalStatus, employee_id, entity_type);

    console.log(`--- AR Workflow Completed Successfully (Result: ${finalStatus}) ---`);
    return { status: 'SUCCESS', token, decision: finalStatus };

  } catch (error) {
    console.error(`[ARProcessor] ❌ Error:`, error.message);
    
    // STEP 7: Exception Handling (if not already handled)
    if (error.code !== 'UNIDENTIFIED_RESPONSE') {
      const entity_id = requestData ? requestData.entity_id : null;
      const employee_id = requestData ? requestData.employee_id : null;
      await logException(entity_id, employee_id, 'AUTOMATION_FAILURE', error.message);
    }

    throw error;
  }
};

module.exports = { runARWorkflow };
