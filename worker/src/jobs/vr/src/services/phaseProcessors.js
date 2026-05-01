const { getClaimData } = require('./claimService');
const { initializeWorkflow, updateWorkflowState } = require('./workflowService');
const { createVerificationRequest, updateVerificationAudit } = require('./verificationService');
const { logException } = require('./exceptionService');

const processPrepPhase = async (entity_id, entity_type) => {
  console.log(`[Phase 2: Prep] Fetching data for ${entity_id}...`);
  const claimData = await getClaimData(entity_id, entity_type);
  
  if (!claimData) {
    throw { code: 'CLAIM_DATA_NOT_FOUND', message: `No record in ${entity_type} table` };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!claimData.authority_email || !emailRegex.test(claimData.authority_email)) {
    console.error(`[Phase 2: Prep] ❌ Invalid authority email: ${claimData.authority_email}`);
    throw { code: 'CLAIM_DATA_NOT_FOUND', message: `Invalid or missing authority email for ${entity_id}` };
  }

  console.log(`[Phase 2: Prep] ✅ Data fetched and email validated: ${claimData.authority_email}`);
  return claimData;
};

const processGenerationPhase = async (entity_id, employee_id, entity_type, authority_email) => {
  console.log(`[Phase 3: Generation] Creating token and record...`);
  // Keeping authority_email in DB record for reference, but not for sending
  const token = await createVerificationRequest(entity_id, employee_id, entity_type, authority_email);
  await initializeWorkflow(entity_id, employee_id, entity_type, 'PROCESSING', 'REQUEST_CREATED');
  return token;
};

const { sendVerificationEmail } = require('./emailService');

const processNoticePhase = async (entity_id, claimData, token) => {
  console.log(`[Phase 4: Communication] Dispatching email for ${entity_id}...`);
  const result = await sendVerificationEmail(entity_id, claimData, token);
  return { success: true, trackingId: result.messageId };
};

const processSyncPhase = async (entity_id, trackingId) => {
  console.log(`[Phase 5: Sync] Synchronizing states and audit log...`);
  await updateWorkflowState(entity_id, 'AUTHORITY_CONTACTED', 'PROCESSING');
  await updateVerificationAudit(entity_id, trackingId);
};

module.exports = {
  processPrepPhase,
  processGenerationPhase,
  processNoticePhase,
  processSyncPhase
};
