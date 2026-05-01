const Redis = require('ioredis');
require('dotenv').config();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const connection = new Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

connection.on('error', (err) => {
  console.error('[Redis] Unexpected error:', err);
});

connection.on('connect', () => {
  console.log('[Redis] Connected to Redis successfully');
});

module.exports = connection;
