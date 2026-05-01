const app = require('./app');
const pools = require('./config/db');
require('./config/redis'); // Initialize Redis connection

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    console.log('\n[Server] Starting Verification Automation System...');
    console.log('----------------------------------------------------');

    // 1. Verify all 8 PostgreSQL Database Connections
    console.log('[Server] Verifying 8 Database Connections...');
    const dbChecks = Object.entries(pools).map(async ([name, pool]) => {
      try {
        await pool.query('SELECT 1');
        console.log(`[DB] ✅ ${name.toUpperCase()} database connected`);
        return { name, status: 'ok' };
      } catch (err) {
        console.error(`[DB] ❌ ${name.toUpperCase()} database connection failed:`, err.message);
        return { name, status: 'error', error: err.message };
      }
    });

    const results = await Promise.all(dbChecks);
    const failedDbs = results.filter(r => r.status === 'error');

    if (failedDbs.length > 0) {
      console.warn(`\n[Server] Warning: ${failedDbs.length} database(s) failed TO CONNECT.`);
      console.warn('Ensure connection strings in .env are correct and databases are reachable.');
    }

    // 2. Start Express Server
    app.listen(PORT, () => {
      console.log('----------------------------------------------------');
      console.log(`[Server] 🚀 System is running on port ${PORT}`);
      console.log(`[Server] 🏥 Health check: http://localhost:${PORT}/health`);
      console.log('----------------------------------------------------\n');
    });

  } catch (error) {
    console.error('[Server] Fatal error during startup:', error);
    process.exit(1);
  }
}

// Global error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Process] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('[Process] Uncaught Exception:', error);
  process.exit(1);
});

startServer();
