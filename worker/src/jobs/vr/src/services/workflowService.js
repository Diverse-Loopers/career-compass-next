const pools = require('../config/db');

const initializeWorkflow = async (entity_id, employee_id, entity_type, user_state = 'PROCESSING', internal_state = 'REQUEST_CREATED') => {
  const client = await pools.workflow.connect();
  try {
    await client.query('BEGIN');

    const stateQuery = `
      INSERT INTO workflow_state (entity_id, employee_id, entity_type, user_state, internal_state, updated_by_service)
      VALUES ($1, $2, $3, $4, $5, 'verification-request-automation')
      ON CONFLICT (entity_id) DO UPDATE SET
        employee_id = EXCLUDED.employee_id,
        entity_type = EXCLUDED.entity_type,
        user_state = EXCLUDED.user_state,
        internal_state = EXCLUDED.internal_state,
        updated_by_service = EXCLUDED.updated_by_service,
        updated_at = CURRENT_TIMESTAMP
    `;
    await client.query(stateQuery, [entity_id, employee_id, entity_type, user_state, internal_state]);

    // Insert history
    const historyQuery = `
      INSERT INTO workflow_state_history (entity_id, employee_id, entity_type, from_state, to_state, updated_by_service)
      VALUES ($1, $2, $3, NULL, $4, 'verification-request-automation')
    `;
    await client.query(historyQuery, [entity_id, employee_id, entity_type, internal_state]);

    await client.query('COMMIT');
    console.log(`[WorkflowService] ✅ Initialized/Updated workflow for Entity: ${entity_id} (${internal_state})`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const updateWorkflowState = async (entity_id, internal_state, user_state = 'PROCESSING') => {
  const query = `
    UPDATE workflow_state
    SET internal_state = $2, 
        user_state = $3,
        updated_by_service = 'verification-request-automation',
        updated_at = CURRENT_TIMESTAMP
    WHERE entity_id = $1
  `;
  try {
    await pools.workflow.query(query, [entity_id, internal_state, user_state]);
    console.log(`[WorkflowService] 🔄 Updated Entity: ${entity_id} -> Internal: ${internal_state}, User: ${user_state}`);
  } catch (error) {
    console.error(`[WorkflowService] ❌ Failed to update state for ${entity_id}:`, error.message);
  }
};

module.exports = { initializeWorkflow, updateWorkflowState };
