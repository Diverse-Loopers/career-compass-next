const pools = require('../src/config/db');

async function checkSchema() {
  try {
    const res = await pools.educationClaim.query('SELECT * FROM education_claims LIMIT 1');
    console.log('Education Claims Columns:', Object.keys(res.rows[0] || {}));
    console.log('Sample Row:', res.rows[0]);
    
    // Also check identity DB if possible
    if (pools.identity) {
        try {
            const res2 = await pools.identity.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'candidates'");
            console.log('Candidates Columns:', res2.rows.map(r => r.column_name));
            
            const res3 = await pools.identity.query("SELECT * FROM candidates LIMIT 1");
            console.log('Sample Candidate:', res3.rows[0]);
        } catch (e) {
            console.log('Error querying identity DB:', e.message);
        }
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    process.exit(0);
  }
}

checkSchema();
