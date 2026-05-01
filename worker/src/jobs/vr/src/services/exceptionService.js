const pools = require('../config/db');
const logException = async (entity_id, employee_id, exception_type, additional_info) => {
  const query = `
    INSERT INTO exceptions (entity_id, employee_id, exception_type, additional_info)
    VALUES ($1, $2, $3, $4)
  `;
  try {
    // Note: If employee_id is not available, it might be null
    await pools.exception.query(query, [entity_id, employee_id || null, exception_type, additional_info]);
    console.log(`[ExceptionService] ⚠️ Logged ${exception_type} for Entity: ${entity_id}`);
  } catch (error) {
    console.error('[ExceptionService] ❌ Failed to log exception:', error.message);
  }
};

module.exports = { logException };
