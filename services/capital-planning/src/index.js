'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'capital-planning', timestamp: new Date().toISOString() });
});

app.get('/api/v1/capex-requests', (req, res) => {
  res.json({ data: [], meta: { total: 0 } });
});

app.post('/api/v1/capex-requests', (req, res) => {
  res.status(201).json({ message: 'CapEx request submitted', data: req.body });
});

app.get('/api/v1/capex-requests/:id', (req, res) => {
  res.json({ data: { id: req.params.id } });
});

app.put('/api/v1/capex-requests/:id/approve', (req, res) => {
  res.json({ message: 'CapEx request approved', id: req.params.id });
});

app.put('/api/v1/capex-requests/:id/reject', (req, res) => {
  res.json({ message: 'CapEx request rejected', id: req.params.id });
});

app.get('/api/v1/budget-cycles', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/budget-cycles', (req, res) => {
  res.status(201).json({ message: 'Budget cycle created', data: req.body });
});

app.get('/api/v1/scenarios', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/scenarios', (req, res) => {
  res.status(201).json({ message: 'Scenario created', data: req.body });
});

app.get('/api/v1/financial-metrics/:requestId', (req, res) => {
  res.json({
    requestId: req.params.requestId,
    npv: null,
    irr: null,
    roi: null,
    tco: null,
    paybackPeriodYears: null
  });
});

app.listen(port, () => {
  console.log(`[capital-planning] Service listening on port ${port}`);
});

module.exports = app;
