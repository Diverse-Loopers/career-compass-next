const pools = require('./src/config/db');

async function seedData() {
  console.log('🌱 Seeding Mock Data...');

  try {
    // 1. Add Education Claims
    const eduClaims = [
      {
        entity_id: 'EDU-TEST-002',
        employee_id: 'EMP-103',
        institution_name: 'MIT',
        university_email: 'registrar@mit.edu',
        degree_name: 'M.S. Robotics',
        specialization: 'Computer Vision',
        passing_year: 2021,
        documents: JSON.stringify([{ type: 'DEGREE', url: 'https://example.com/degree.pdf' }])
      },
      {
        entity_id: 'EDU-TEST-003',
        employee_id: 'EMP-104',
        institution_name: 'Harvard',
        university_email: 'verify@harvard.edu',
        degree_name: 'MBA',
        specialization: 'Finance',
        passing_year: 2020,
        documents: JSON.stringify([{ type: 'TRANSCRIPT', url: 'https://example.com/transcript.pdf' }])
      }
    ];

    for (const claim of eduClaims) {
      await pools.educationClaim.query(`
        INSERT INTO education_claims (entity_id, employee_id, institution_name, university_email, degree_name, specialization, passing_year, documents, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'SUBMITTED')
        ON CONFLICT (entity_id) DO NOTHING
      `, [claim.entity_id, claim.employee_id, claim.institution_name, claim.university_email, claim.degree_name, claim.specialization, claim.passing_year, claim.documents]);
      console.log(`✅ Seeded Education Claim: ${claim.entity_id}`);
    }

    // 2. Add Employment Claims
    const empClaims = [
      {
        entity_id: 'EMP-TEST-002',
        employee_id: 'EMP-105',
        company_name: 'Meta',
        hr_email: 'verifications@meta.com',
        job_role: 'Product Manager',
        joining_date: '2022-01-15',
        documents: JSON.stringify([{ type: 'OFFER_LETTER', url: 'https://example.com/offer.pdf' }])
      },
      {
        entity_id: 'EMP-TEST-003',
        employee_id: 'EMP-106',
        company_name: 'Amazon',
        hr_email: 'hr-verify@amazon.com',
        job_role: 'Data Scientist',
        joining_date: '2021-06-10',
        documents: JSON.stringify([{ type: 'RELIEVING_LETTER', url: 'https://example.com/relieving.pdf' }])
      }
    ];

    for (const claim of empClaims) {
      await pools.employmentClaim.query(`
        INSERT INTO employment_claims (entity_id, employee_id, company_name, hr_email, job_role, joining_date, documents, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'SUBMITTED')
        ON CONFLICT (entity_id) DO NOTHING
      `, [claim.entity_id, claim.employee_id, claim.company_name, claim.hr_email, claim.job_role, claim.joining_date, claim.documents]);
      console.log(`✅ Seeded Employment Claim: ${claim.entity_id}`);
    }

    console.log('✨ Seeding Completed Successfully!');
  } catch (error) {
    console.error('❌ Seeding Failed:', error.message);
  } finally {
    process.exit(0);
  }
}

seedData();
