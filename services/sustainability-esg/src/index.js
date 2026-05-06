'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'sustainability-esg', timestamp: new Date().toISOString() });
});

app.get('/api/v1/energy-readings', (req, res) => {
  res.json({ data: [], meta: { total: 0 } });
});

app.post('/api/v1/energy-readings', (req, res) => {
  res.status(201).json({ message: 'Energy reading recorded', data: req.body });
});

app.get('/api/v1/emission-factors', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/emission-factors', (req, res) => {
  res.status(201).json({ message: 'Emission factor created', data: req.body });
});

app.get('/api/v1/metrics', (req, res) => {
  res.json({ data: { energyKwh: 0, carbonKgCo2e: 0, waterM3: 0 } });
});

app.get('/api/v1/targets', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/targets', (req, res) => {
  res.status(201).json({ message: 'Sustainability target created', data: req.body });
});

app.get('/api/v1/assets/:id/usage-profile', (req, res) => {
  res.json({ assetId: req.params.id, runtimeHours: 0, energyKwh: 0 });
});

app.listen(port, () => {
  console.log(`[sustainability-esg] Service listening on port ${port}`);
});

module.exports = app;
