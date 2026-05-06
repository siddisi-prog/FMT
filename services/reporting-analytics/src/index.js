'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3006;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'reporting-analytics', timestamp: new Date().toISOString() });
});

app.get('/api/v1/dashboards', (req, res) => {
  res.json({
    data: [
      { id: 'asset-health', name: 'Asset Health Overview' },
      { id: 'maintenance-perf', name: 'Maintenance Performance' },
      { id: 'capex-pipeline', name: 'CapEx Pipeline' },
      { id: 'sustainability', name: 'Sustainability Overview' },
      { id: 'compliance', name: 'Compliance Status' }
    ]
  });
});

app.get('/api/v1/dashboards/:id', (req, res) => {
  res.json({ id: req.params.id, data: {} });
});

app.get('/api/v1/reports', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/reports/generate', (req, res) => {
  res.status(202).json({ message: 'Report generation queued', jobId: 'stub-job-id' });
});

app.get('/api/v1/reports/:jobId', (req, res) => {
  res.json({ jobId: req.params.jobId, status: 'PENDING' });
});

app.get('/api/v1/reports/:jobId/download', (req, res) => {
  res.json({ message: 'Report not yet available', jobId: req.params.jobId });
});

app.get('/api/v1/audit-logs', (req, res) => {
  res.json({ data: [], meta: { total: 0 } });
});

app.get('/api/v1/kpis/assets', (req, res) => {
  res.json({ totalAssets: 0, activeAssets: 0, underMaintenance: 0, decommissioned: 0 });
});

app.get('/api/v1/kpis/maintenance', (req, res) => {
  res.json({ openWorkOrders: 0, overdueWorkOrders: 0, completedThisMonth: 0, mttr: null });
});

app.get('/api/v1/kpis/capex', (req, res) => {
  res.json({ pendingRequests: 0, approvedBudget: 0, spendToDate: 0 });
});

app.get('/api/v1/kpis/esg', (req, res) => {
  res.json({ totalEnergyKwh: 0, totalCarbonKgCo2e: 0, targetProgress: null });
});

app.listen(port, () => {
  console.log(`[reporting-analytics] Service listening on port ${port}`);
});

module.exports = app;
