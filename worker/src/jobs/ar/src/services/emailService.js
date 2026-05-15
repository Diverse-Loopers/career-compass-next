const pools = require('../config/db');

/**
 * Extracts the verification token from the email body
 */
const extractToken = (subject, body) => {
  // Look for VER- followed by UUID pattern or similar
  const tokenRegex = /VER-[a-f0-9-]{36}|VER-\d+/i;
  const match = (subject + ' ' + body).match(tokenRegex);
  return match ? match[0] : null;
};

/**
 * Validates if the sender is authorized
 */
const validateSender = async (senderEmail, token) => {
  // 1. Get the original request associated with the token
  const query = `
    SELECT authority_email 
    FROM verification_request 
    WHERE verification_token = $1 
    LIMIT 1;
  `;
  
  const res = await pools.verification.query(query, [token]);
  if (res.rows.length === 0) return { valid: false, reason: 'TOKEN_NOT_FOUND' };
  
  const expectedEmail = res.rows[0].authority_email;
  
  // 2. Compare emails (case-insensitive)
  if (senderEmail.toLowerCase() === expectedEmail.toLowerCase()) {
    return { valid: true };
  }
  
  // 3. Optional: Domain check if specific email doesn't match
  const senderDomain = senderEmail.split('@')[1];
  const expectedDomain = expectedEmail.split('@')[1];
  
  if (senderDomain === expectedDomain) {
    return { valid: true, note: 'DOMAIN_MATCH_ONLY' };
  }

  return { valid: false, reason: 'INVALID_AUTHORITY' };
};

/**
 * Interprets the authority's decision based on keywords
 */
const parseDecision = (body) => {
  const text = body.toLowerCase();
  
  const positiveKeywords = ['verified', 'confirmed', 'correct', 'accurate', 'yes', 'validated'];
  const negativeKeywords = ['rejected', 'incorrect', 'false', 'invalid', 'no', 'cannot verify', 'unauthorized'];
  
  if (negativeKeywords.some(kw => text.includes(kw))) {
    return 'REJECTED';
  }
  
  if (positiveKeywords.some(kw => text.includes(kw))) {
    return 'VERIFIED';
  }
  
  return 'NEED_REVIEW';
};

/**
 * Stores email evidence
 */
const storeEvidence = async (token, sender, receiver, body, message_id) => {
  const query = `
    INSERT INTO verification_communication (verification_token, sender_email, receiver_email, email_body, direction, timestamp, message_id)
    VALUES ($1, $2, $3, $4, 'INBOUND', NOW(), $5)
    RETURNING timestamp;
  `;
  
  try {
    const res = await pools.verificationEvidence.query(query, [token, sender, receiver, body, message_id]);
    return res.rows[0].timestamp;
  } catch (error) {
    console.error('[EmailService] ❌ Failed to store evidence:', error.message);
    throw error;
  }
};

module.exports = { 
  extractToken, 
  validateSender, 
  parseDecision, 
  storeEvidence 
};
