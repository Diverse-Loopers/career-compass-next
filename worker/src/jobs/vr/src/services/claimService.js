const pools = require('../config/db');

const getClaimData = async (entity_id, entity_type) => {
  if (entity_type === 'EDUCATION') {
    const query = `
      SELECT entity_id, employee_id, institution_name, university_email, degree_name, specialization, passing_year, documents
      FROM education_claims
      WHERE entity_id = $1
    `;
    const result = await pools.educationClaim.query(query, [entity_id]);
    const row = result.rows[0];
    if (!row) return null;

    // Fetch student name and roll number from identity DB
    let student_name = 'Not Available';
    let roll_number = 'Not Available';

    if (pools.identity) {
      try {
        const identityRes = await pools.identity.query(
          'SELECT full_name, education_roll_no FROM candidates WHERE employee_id = $1',
          [row.employee_id]
        );
        if (identityRes.rows[0]) {
          student_name = identityRes.rows[0].full_name || student_name;
          roll_number = identityRes.rows[0].education_roll_no || roll_number;
        }
      } catch (err) {
        console.error(`[ClaimService] ⚠️ Failed to fetch candidate info for ${row.employee_id}:`, err.message);
      }
    }

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
      specialization: row.specialization,
      passing_year: row.passing_year,
      student_name,
      roll_number
      
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
