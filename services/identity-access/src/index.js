'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'UP', service: 'identity-access', timestamp: new Date().toISOString() });
});

app.post('/api/v1/auth/token', (req, res) => {
  res.json({ access_token: 'stub-jwt-token', token_type: 'Bearer', expires_in: 3600 });
});

app.post('/api/v1/auth/refresh', (req, res) => {
  res.json({ access_token: 'stub-refreshed-jwt-token', token_type: 'Bearer', expires_in: 3600 });
});

app.get('/api/v1/users', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/users', (req, res) => {
  res.status(201).json({ message: 'User created', data: req.body });
});

app.get('/api/v1/roles', (req, res) => {
  res.json({
    data: [
      'platform-admin',
      'asset-manager',
      'maintenance-technician',
      'asset-viewer',
      'finance-approver',
      'esg-analyst',
      'report-viewer'
    ]
  });
});

app.post('/api/v1/roles', (req, res) => {
  res.status(201).json({ message: 'Role created', data: req.body });
});

app.get('/api/v1/tenants', (req, res) => {
  res.json({ data: [] });
});

app.post('/api/v1/tenants', (req, res) => {
  res.status(201).json({ message: 'Tenant created', data: req.body });
});

app.listen(port, () => {
  console.log(`[identity-access] Service listening on port ${port}`);
});

module.exports = app;
