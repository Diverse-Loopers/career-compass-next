const app = require('./app');
const pools = require('./config/db');
require('./config/redis'); // Initialize Redis connection
require('./workers/arWorker'); // Start the worker

const PORT = process.env.PORT || 3001; // AR service on 3001

async function startServer() {
  try {
    console.log('\n[AR Server] Starting Authority Response Automation System...');
    console.log('----------------------------------------------------');

    // 1. Verify Database Connections
    console.log('[AR Server] Verifying Database Connections...');
    const requiredDbs = ['exception', 'workflow', 'verification', 'verificationEvidence'];
    
    const dbChecks = requiredDbs.map(async (name) => {
      const pool = pools[name];
      if (!pool) {
        console.error(`[DB] ❌ ${name.toUpperCase()} database pool not initialized`);
        return { name, status: 'error', error: 'Not initialized' };
      }
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
      console.warn(`\n[AR Server] Warning: ${failedDbs.length} required database(s) failed TO CONNECT.`);
    }

    // 2. Start Express Server
    app.listen(PORT, () => {
      console.log('----------------------------------------------------');
      console.log(`[AR Server] 🚀 System is running on port ${PORT}`);
      console.log(`[AR Server] 🏥 Health check: http://localhost:${PORT}/health`);
      console.log('----------------------------------------------------\n');

      // 3. Start Automatic Database Polling
      const { pollJobsFromPostgres } = require('./utils/producer');
      setInterval(() => {
        pollJobsFromPostgres().catch(err => console.error('[AR Server] Polling error:', err));
      }, 10000);
      console.log('[AR Server] 🔄 Automatic PostgreSQL polling started (every 10s)');
    });

  } catch (error) {
    console.error('[AR Server] Fatal error during startup:', error);
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
