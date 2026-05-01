const pools = require('../config/db');

const seedData = async () => {
  console.log('--- Seeding Mock Data ---');

  try {
    // 1. Seed Education Claim
    await pools.educationClaim.query(`
      INSERT INTO education_claims (entity_id, employee_id, institution_name, university_email, degree_name, specialization, documents, passing_year, submission_timestamp, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, $9)
      ON CONFLICT (entity_id) DO NOTHING
    `, ['EDU-TEST-001', 'EMP-101', 'Stanford University', 'verify@stanford.edu', 'B.S. Computer Science', 'AI', '{"transcript": "link"}', 2022, 'SUBMITTED']);

    // 2. Seed Employment Claim
    await pools.employmentClaim.query(`
      INSERT INTO employment_claims (entity_id, employee_id, company_name, hr_email, job_role, documents, joining_date, submission_timestamp, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, $8)
      ON CONFLICT (entity_id) DO NOTHING
    `, ['EMP-TEST-001', 'EMP-102', 'Google', 'hr@google.com', 'Software Engineer', '{"payslip": "link"}', '2022-01-01', 'SUBMITTED']);

    

    // 4. Seed an Invalid Email case for testing
    await pools.educationClaim.query(`
      INSERT INTO education_claims (entity_id, employee_id, institution_name, university_email, degree_name, specialization, documents, passing_year, submission_timestamp, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, $9)
      ON CONFLICT (entity_id) DO NOTHING
    `, ['EDU-TEST-002', 'EMP-104', 'Invalid School', 'invalid-email', 'B.A. Arts', 'General', '{}', 2021, 'SUBMITTED']);

    console.log('✅ Mock data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding mock data:', error.message);
    process.exit(1);
  }
};

seedData();
