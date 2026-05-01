const pools = require('../config/db');

const getClaimData = async (entity_id, entity_type) => {
  if (entity_type === 'EDUCATION') {
    const query = `
      SELECT entity_id, employee_id, institution_name, university_email, degree_name, specialization, documents
      FROM education_claims
      WHERE entity_id = $1
    `;
    const result = await pools.educationClaim.query(query, [entity_id]);
    const row = result.rows[0];
    if (!row) return null;

    return {
      entity_id: row.entity_id,
      employee_id: row.employee_id,
      authority_email: row.university_email,
      institution_company: row.institution_name,
      claim_details: `${row.degree_name}${row.specialization ? ' - ' + row.specialization : ''}`,
      documents: row.documents,
      entity_type: 'EDUCATION',
      university_name: row.institution_name,
      degree_name: row.degree_name,
      specialization: row.specialization
    };
  } else if (entity_type === 'EMPLOYMENT') {
    const query = `
      SELECT entity_id, employee_id, company_name, hr_email, job_role, documents
      FROM employment_claims
      WHERE entity_id = $1
    `;
    const result = await pools.employmentClaim.query(query, [entity_id]);
    const row = result.rows[0];
    if (!row) return null;

    return {
      entity_id: row.entity_id,
      employee_id: row.employee_id,
      authority_email: row.hr_email,
      institution_company: row.company_name,
      claim_details: row.job_role,
      documents: row.documents,
      entity_type: 'EMPLOYMENT',
      company_name: row.company_name,
      job_role: row.job_role
    };
  }
  return null;
};

module.exports = { getClaimData };
