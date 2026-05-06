'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'integration-gateway', timestamp: new Date().toISOString() });
});

app.get('/api/v1/integrations', (req, res) => {
  res.json({ data: ['sap', 'oracle', 'dynamics', 'cmms'] });
});

app.post('/api/v1/integrations/:system/sync', (req, res) => {
  res.json({ message: `Sync triggered for ${req.params.system}`, jobId: 'uuid-stub' });
});

app.get('/api/v1/integrations/:system/status', (req, res) => {
  res.json({ system: req.params.system, status: 'IDLE', lastRun: null });
});

app.get('/api/v1/canonical/assets', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/webhooks/:system', (req, res) => {
  res.json({ received: true, system: req.params.system });
});

app.listen(port, () => {
  console.log(`[integration-gateway] Service listening on port ${port}`);
});

module.exports = app;
