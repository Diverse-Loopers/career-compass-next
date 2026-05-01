const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));
// Basic health-check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'verification-request-automation'
  });
});
// Initialize Queues and Workers
require('./queues/verificationQueue');
require('./workers/verificationWorker');
module.exports = app;
