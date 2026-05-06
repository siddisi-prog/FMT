# Reporting & Analytics Service

The **Reporting & Analytics Service** aggregates data from all domain services to provide actionable insights, pre-built dashboards, audit trails, and exportable reports for clinical engineers, finance teams, sustainability officers, and executive leadership.

## Responsibilities

- Aggregate and query data from Asset Management, Capital Planning, and Sustainability services.
- Serve pre-built and configurable dashboards for operational and strategic KPIs.
- Provide immutable, searchable audit trails for all asset and financial changes.
- Support CSV, Excel, and PDF export for regulatory and board-level reporting.
- Feed operational metrics into Prometheus/Grafana for infrastructure observability.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/dashboards` | List available dashboards |
| GET | `/api/v1/dashboards/:id` | Get dashboard data |
| GET | `/api/v1/reports` | List available report templates |
| POST | `/api/v1/reports/generate` | Generate a report (async) |
| GET | `/api/v1/reports/:jobId` | Get report generation status |
| GET | `/api/v1/reports/:jobId/download` | Download generated report |
| GET | `/api/v1/audit-logs` | Query audit logs (filterable) |
| GET | `/api/v1/kpis/assets` | Get asset management KPIs |
| GET | `/api/v1/kpis/maintenance` | Get maintenance performance KPIs |
| GET | `/api/v1/kpis/capex` | Get CapEx pipeline KPIs |
| GET | `/api/v1/kpis/esg` | Get ESG and sustainability KPIs |
| GET | `/health` | Service health check |

## Pre-Built Dashboards

| Dashboard | Audience | Key Metrics |
|---|---|---|
| Asset Health Overview | Clinical Engineering | Total assets, assets by status, overdue maintenance |
| Maintenance Performance | HTM / Biomedical | MTTR, MTBF, work order completion rate, backlog |
| CapEx Pipeline | Finance / Leadership | Requests by status, approved budget, spend vs. plan |
| Sustainability Overview | ESG / Facilities | Energy consumption, carbon emissions, KPI vs. target |
| Compliance Status | Quality / Compliance | Inspections due, overdue, pass/fail rates |
| Asset Lifecycle | Clinical Engineering | Asset age distribution, end-of-life forecast |

## Audit Log Schema

All audit log entries follow a standardised schema:

```json
{
  "id": "uuid",
  "tenantId": "string",
  "userId": "uuid",
  "userEmail": "string",
  "action": "CREATE | UPDATE | DELETE | APPROVE | REJECT",
  "resourceType": "Asset | WorkOrder | CapexRequest | ...",
  "resourceId": "uuid",
  "changes": {
    "field": "status",
    "oldValue": "ACTIVE",
    "newValue": "DECOMMISSIONED"
  },
  "ipAddress": "string",
  "timestamp": "ISO8601"
}
```

## Report Export Formats

| Format | Use Case |
|---|---|
| CSV | Raw data export for further analysis in Excel or BI tools |
| Excel (.xlsx) | Formatted reports for finance and management |
| PDF | Board-level presentations and regulatory submissions |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Service listening port | `3006` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `ASSET_SERVICE_URL` | Asset Management Service URL | `http://asset-management:3001` |
| `CAPITAL_SERVICE_URL` | Capital Planning Service URL | `http://capital-planning:3003` |
| `ESG_SERVICE_URL` | Sustainability Service URL | `http://sustainability-esg:3004` |
| `REPORT_STORAGE_BUCKET` | S3/Blob storage bucket for reports | — |
| `PROMETHEUS_PORT` | Port for Prometheus metrics scraping | `9090` |

## Running Locally

```bash
npm install
cp .env.example .env
npm start
```
