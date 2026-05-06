'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'asset-management', timestamp: new Date().toISOString() });
});

// Asset routes (stub — replace with full controller implementations)
app.get('/api/v1/assets', (req, res) => {
  res.json({ data: [], meta: { total: 0, page: 1, limit: 20 } });
});

app.post('/api/v1/assets', (req, res) => {
  res.status(201).json({ message: 'Asset created', data: req.body });
});

app.get('/api/v1/assets/:id', (req, res) => {
  res.json({ data: { id: req.params.id } });
});

app.put('/api/v1/assets/:id', (req, res) => {
  res.json({ message: 'Asset updated', data: req.body });
});

app.delete('/api/v1/assets/:id', (req, res) => {
  res.json({ message: 'Asset decommissioned', id: req.params.id });
});

// Work order routes (stub)
app.get('/api/v1/assets/:id/work-orders', (req, res) => {
  res.json({ data: [], assetId: req.params.id });
});

app.post('/api/v1/work-orders', (req, res) => {
  res.status(201).json({ message: 'Work order created', data: req.body });
});

// Maintenance plan routes (stub)
app.get('/api/v1/maintenance-plans', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/maintenance-plans', (req, res) => {
  res.status(201).json({ message: 'Maintenance plan created', data: req.body });
});

// Compliance records (stub)
app.get('/api/v1/compliance-records', (req, res) => {
  res.json({ data: [] });
});

app.listen(port, () => {
  console.log(`[asset-management] Service listening on port ${port}`);
});

module.exports = app;
