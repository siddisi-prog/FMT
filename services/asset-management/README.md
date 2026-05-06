# Asset Management Service

The **Asset Management Service** is the core domain service of the Healthcare Asset Management Platform. It maintains a comprehensive, auditable registry of all healthcare assets and manages their complete lifecycle from procurement to decommissioning.

## Responsibilities

- Maintain the authoritative asset registry for all medical devices, facility assets, and IT assets.
- Manage asset lifecycle stages: procurement, commissioning, active use, maintenance, and decommissioning.
- Schedule and track preventive maintenance, corrective work orders, and calibration records.
- Record regulatory compliance inspections, certificates, and audit trails.
- Track asset location, ownership, and financial attributes (CapEx/OpEx, depreciation).
- Publish domain events to the message bus for downstream consumers.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/assets` | List all assets (paginated, filterable) |
| POST | `/api/v1/assets` | Create a new asset |
| GET | `/api/v1/assets/:id` | Get asset by ID |
| PUT | `/api/v1/assets/:id` | Update asset details |
| DELETE | `/api/v1/assets/:id` | Decommission an asset |
| GET | `/api/v1/assets/:id/work-orders` | List work orders for an asset |
| POST | `/api/v1/work-orders` | Create a new work order |
| GET | `/api/v1/maintenance-plans` | List maintenance plans |
| POST | `/api/v1/maintenance-plans` | Create a maintenance plan |
| GET | `/api/v1/compliance-records` | List compliance records |
| GET | `/health` | Service health check |

## Domain Events Published

| Event | Topic | Trigger |
|---|---|---|
| `AssetCreated` | `asset.events` | New asset registered |
| `AssetUpdated` | `asset.events` | Asset details changed |
| `AssetRetired` | `asset.events` | Asset decommissioned |
| `WorkOrderCreated` | `workorder.events` | New work order raised |
| `WorkOrderCompleted` | `workorder.events` | Work order closed |
| `ComplianceAlertRaised` | `compliance.events` | Inspection due or overdue |

## Data Model

### Asset

```json
{
  "id": "uuid",
  "assetTag": "MED-2024-001",
  "name": "Philips Ingenia 3T MRI",
  "categoryId": "uuid",
  "locationId": "uuid",
  "status": "ACTIVE | UNDER_MAINTENANCE | DECOMMISSIONED",
  "serialNumber": "PH-MRI-98765",
  "manufacturer": "Philips",
  "model": "Ingenia 3T",
  "purchaseDate": "2022-01-15",
  "warrantyExpiry": "2027-01-15",
  "capexOpexTag": "CAPEX",
  "depreciationScheduleId": "uuid",
  "residualValue": 150000,
  "ownerId": "uuid",
  "vendorId": "uuid",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601"
}
```

### WorkOrder

```json
{
  "id": "uuid",
  "assetId": "uuid",
  "type": "PREVENTIVE | CORRECTIVE | CALIBRATION | SAFETY_CHECK",
  "status": "OPEN | IN_PROGRESS | COMPLETED | CANCELLED",
  "priority": "LOW | MEDIUM | HIGH | CRITICAL",
  "assignedTechnicianId": "uuid",
  "scheduledDate": "ISO8601",
  "completedDate": "ISO8601",
  "notes": "string",
  "createdAt": "ISO8601"
}
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Service listening port | `3001` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `KAFKA_BROKERS` | Comma-separated Kafka broker list | `localhost:9092` |
| `KAFKA_TOPIC_ASSETS` | Kafka topic for asset events | `asset.events` |
| `JWT_SECRET` | JWT validation secret | — |
| `LOG_LEVEL` | Logging verbosity | `info` |

## Running Locally

```bash
npm install
cp .env.example .env
npm start
```

## Running Tests

```bash
npm test
```
