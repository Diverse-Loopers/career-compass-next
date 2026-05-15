const pools = require('../config/db');

/**
 * Updates the workflow state and records history
 */
const updateWorkflowStatus = async (entity_id, new_state, employee_id, entity_type) => {
  const client = await pools.workflow.connect();
  
  try {
    await client.query('BEGIN');

    // 1. Get current state
    const currentRes = await client.query(
      'SELECT internal_state FROM workflow_state WHERE entity_id = $1',
      [entity_id]
    );
    const from_state = currentRes.rows.length > 0 ? currentRes.rows[0].internal_state : 'UNKNOWN';

    // 2. Update current state
    const updateQuery = `
      UPDATE workflow_state 
      SET internal_state = $1, 
          user_state = $1,
          updated_by_service = 'AR_SERVICE',
          updated_at = NOW() 
      WHERE entity_id = $2
      RETURNING entity_id;
    `;
    await client.query(updateQuery, [new_state, entity_id]);

    // 3. Add to history
    const historyQuery = `
      INSERT INTO workflow_state_history (entity_id, employee_id, entity_type, from_state, to_state, updated_by_service, timestamp)
      VALUES ($1, $2, $3, $4, $5, 'AR_SERVICE', NOW());
    `;
    await client.query(historyQuery, [entity_id, employee_id, entity_type, from_state, new_state]);

    await client.query('COMMIT');
    console.log(`[WorkflowService] 🔄 Updated state from ${from_state} to ${new_state} for entity ${entity_id}`);
    
    return { entity_id };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('[WorkflowService] ❌ Failed to update status:', error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { updateWorkflowStatus };
