const { 
  processPrepPhase, 
  processGenerationPhase, 
  processNoticePhase, 
  processSyncPhase 
} = require('./phaseProcessors');
const { logException } = require('./exceptionService');
const { initializeWorkflow, updateWorkflowState } = require('./workflowService');

/**
 * Orchestrates the 5 phases of verification automation
 */
const runVerificationWorkflow = async (jobId, entity_id, entity_type) => {
  let employee_id = null;
  let claimData = null;

  try {
    console.log(`\n--- Started Verification Workflow (Job: ${jobId}) ---`);

    // Phase 2: Prep
    claimData = await processPrepPhase(entity_id, entity_type);
    employee_id = claimData.employee_id;

    // Phase 3: Generation
    const token = await processGenerationPhase(
      entity_id, 
      employee_id, 
      entity_type, 
      claimData.authority_email
    );

    // Phase 4: Notice (Formerly Communication/Email)
    const noticeResult = await processNoticePhase(entity_id, claimData, token);

    // Phase 5: Sync
    await processSyncPhase(entity_id, noticeResult.trackingId);

    console.log(`--- Workflow Completed Successfully ---`);
    return { status: 'SUCCESS', entity_id, trackingId: noticeResult.trackingId };

  } catch (error) {
    console.error(`[WorkflowProcessor] ❌ Error:`, error.message || error.code);
    
    if (error.code === 'CLAIM_DATA_NOT_FOUND') {
      await logException(entity_id, null, 'CLAIM_FAILURE', error.message);
      await initializeWorkflow(entity_id, null, entity_type, 'FAILED', 'CLAIM_DATA_NOT_FOUND');
    } else if (error.code === 'EMAIL_DELIVERY_FAILED') {
      const { updateVerificationStatus } = require('./verificationService');
      await updateVerificationStatus(entity_id, 'EMAIL_DELIVERY_FAILED');
      await logException(entity_id, employee_id, 'AUTOMATION_FAILURE', error.message);
    } else {
      await logException(entity_id, employee_id, 'AUTOMATION_FAILURE', error.message || 'Unknown error');
    }

    throw error;
  }
};

module.exports = { runVerificationWorkflow };
