const pools = require('../config/db');
const crypto = require('crypto');

const createVerificationRequest = async (entity_id, employee_id, entity_type, authority_email) => {
  const verification_token = `VER-${crypto.randomUUID()}`;
  const query = `
    INSERT INTO verification_request (verification_token, employee_id, entity_id, entity_type, authority_email, status, email_sent)
    VALUES ($1, $2, $3, $4, $5, 'REQUEST_CREATED', false)
    RETURNING verification_token
  `;
  try {
    const result = await pools.verification.query(query, [
      verification_token,
      employee_id,
      entity_id,
      entity_type,
      authority_email
    ]);
    console.log(`[VerificationService] 📨 Created request record for Entity: ${entity_id}`);
    return result.rows[0].verification_token;
  } catch (error) {
    console.error(`[VerificationService] ❌ Failed to create request for ${entity_id}:`, error.message);
    throw error;
  }
};

const updateVerificationAudit = async (entity_id, tracking_id) => {
  // Tracking_id is from emailService (SMTP messageId)
  const query = `
    UPDATE verification_request
    SET status = 'AUTHORITY_CONTACTED',
        email_sent = true
    WHERE entity_id = $1
  `;
  try {
    await pools.verification.query(query, [entity_id]);
    console.log(`[VerificationService] 📝 Audit log updated (email_sent=true) for Entity: ${entity_id}`);
  } catch (error) {
    console.error(`[VerificationService] ❌ Failed to update audit log for ${entity_id}:`, error.message);
  }
};

const updateVerificationStatus = async (entity_id, status) => {
  const query = `
    UPDATE verification_request
    SET status = $2
    WHERE entity_id = $1
  `;
  try {
    await pools.verification.query(query, [entity_id, status]);
    console.log(`[VerificationService] 🔄 Status updated to ${status} for Entity: ${entity_id}`);
  } catch (error) {
    console.error(`[VerificationService] ❌ Failed to update status for ${entity_id}:`, error.message);
  }
};

/**
 * Logs communication evidence to verification_evidence_db
 */
const logVerificationCommunication = async (message_id, token, sender, receiver, body) => {
  const query = `
    INSERT INTO verification_communication (message_id, verification_token, sender_email, receiver_email, email_body, direction)
    VALUES ($1, $2, $3, $4, $5, 'OUTGOING')
  `;
  try {
    await pools.verificationEvidence.query(query, [message_id, token, sender, receiver, body]);
    console.log(`[VerificationService] 📊 Evidence logged for Message: ${message_id}`);
  } catch (error) {
    console.error(`[VerificationService] ❌ Failed to log communication evidence:`, error.message);
  }
};

module.exports = { 
  createVerificationRequest, 
  updateVerificationAudit,
  updateVerificationStatus,
  logVerificationCommunication
};
