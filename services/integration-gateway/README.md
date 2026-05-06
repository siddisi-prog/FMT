# Integration Gateway Service

The **Integration Gateway Service** provides bi-directional data exchange between the Healthcare Asset Management Platform and external enterprise systems including ERP platforms (SAP, Oracle, Microsoft Dynamics) and existing hospital CMMS/HTM tools.

## Responsibilities

- Expose standardised REST/GraphQL APIs for asset master data, work orders, and financial attributes.
- Consume external ERP/CMMS APIs for purchase orders, invoices, GL accounts, and cost centres.
- Publish and consume domain events via the Kafka message bus.
- Implement connector/adapter microservices for each external system.
- Maintain a canonical internal data model and translate to/from each external system's schema.
- Ensure idempotency, retry handling, and dead-letter queue management.

## Connector Adapters

| Adapter | External System | Integration Type |
|---|---|---|
| `sap-adapter` | SAP ERP (S/4HANA, ECC) | REST API + RFC |
| `oracle-adapter` | Oracle Fusion / EBS | REST API |
| `dynamics-adapter` | Microsoft Dynamics 365 | REST API (OData) |
| `cmms-adapter` | Generic CMMS/HTM tools | REST / CSV import |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/integrations` | List configured integrations |
| POST | `/api/v1/integrations/:system/sync` | Trigger manual sync for a system |
| GET | `/api/v1/integrations/:system/status` | Get sync status and last run |
| GET | `/api/v1/canonical/assets` | Get assets in canonical format |
| POST | `/api/v1/webhooks/:system` | Receive inbound webhook from external system |
| GET | `/health` | Service health check |

## Canonical Data Model

The gateway maintains a canonical model that acts as the lingua franca between all systems:

```json
{
  "canonicalAsset": {
    "id": "uuid",
    "externalIds": {
      "sap": "EQUI-100001",
      "oracle": "ASSET-9876",
      "cmms": "WO-55432"
    },
    "name": "string",
    "category": "string",
    "location": "string",
    "status": "string",
    "financials": {
      "glAccount": "string",
      "costCenter": "string",
      "capexBudgetLine": "string"
    }
  }
}
```

## Event Consumption

| Event | Source Topic | Action |
|---|---|---|
| `AssetCreated` | `asset.events` | Sync new asset to ERP |
| `AssetRetired` | `asset.events` | Update ERP asset status |
| `WorkOrderCompleted` | `workorder.events` | Close work order in CMMS |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Service listening port | `3002` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `KAFKA_BROKERS` | Kafka broker list | `localhost:9092` |
| `SAP_API_URL` | SAP API base URL | — |
| `SAP_CLIENT_ID` | SAP OAuth2 client ID | — |
| `SAP_CLIENT_SECRET` | SAP OAuth2 client secret | — |
| `ORACLE_API_URL` | Oracle API base URL | — |
| `DYNAMICS_TENANT_ID` | Azure AD tenant ID for Dynamics | — |
| `SYNC_SCHEDULE_CRON` | Cron expression for nightly sync | `0 2 * * *` |

## Running Locally

```bash
npm install
cp .env.example .env
npm start
```
