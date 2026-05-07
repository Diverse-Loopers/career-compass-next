const Redis = require('ioredis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
  keepAlive: 10000,
  family: 4,
  retryStrategy(times) {
    console.warn(`[Redis] Retrying connection: attempt ${times}`);
    const delay = Math.min(times * 100, 3000);
    return delay;
  },
  reconnectOnError(err) {
    if (err.message.includes('READONLY')) {
      return true;
    }
    if (err.code === 'ECONNRESET') {
      return true;
    }
    return false;
  },
});

connection.on('error', (err) => {
  if (err.code === 'ECONNRESET') {
    console.warn('[Redis] Connection reset by peer (ECONNRESET)');
  } else if (err.code === 'ENOTFOUND') {
    console.warn(`[Redis] DNS lookup failed (ENOTFOUND): ${err.hostname}`);
  } else {
    console.error('[Redis] Unexpected error:', err.message || err);
  }
});

connection.on('connect', () => {
  console.log('[Redis] Connected to Redis successfully');
});

connection.on('reconnecting', () => {
  console.log('[Redis] Reconnecting to Redis...');
});

connection.on('ready', () => {
  console.log('[Redis] Redis connection is ready');
});

module.exports = connection;
