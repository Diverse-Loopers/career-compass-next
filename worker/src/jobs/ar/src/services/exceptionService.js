const pools = require('../config/db');

/**
 * Logs an exception to the exception database
 */
const logException = async (entity_id, employee_id, exception_type, message, metadata = {}) => {
  const query = `
    INSERT INTO exceptions (entity_id, employee_id, exception_type, additional_info, status, created_at)
    VALUES ($1, $2, $3, $4, 'OPEN', NOW())
    RETURNING exception_id;
  `;
  
  try {
    const res = await pools.exception.query(query, [
      entity_id, 
      employee_id, 
      exception_type, 
      message
    ]);
    console.log(`[ExceptionService] 🚩 Logged exception: ${exception_type} (ID: ${res.rows[0].exception_id})`);
    return res.rows[0].exception_id;
  } catch (error) {
    console.error('[ExceptionService] ❌ Failed to log exception:', error.message);
  }
};

module.exports = { logException };
