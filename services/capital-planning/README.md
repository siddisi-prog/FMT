# Capital Planning Service

The **Capital Planning Service** enables healthcare finance teams, clinical engineers, and executive leadership to plan, prioritise, approve, and track capital expenditure for medical equipment and facility assets.

## Responsibilities

- Accept and manage CapEx requests for new equipment, replacements, and upgrades.
- Manage annual and multi-year budget cycles with scenario modelling.
- Score and prioritise requests based on clinical risk, asset age, downtime, and maintenance cost.
- Perform financial modelling: NPV, IRR, ROI, TCO, and payback period calculations.
- Orchestrate multi-stage approval workflows.
- Integrate with ERP for GL accounts, cost centres, budget lines, and actuals vs. planned variance.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/capex-requests` | List all CapEx requests |
| POST | `/api/v1/capex-requests` | Submit a new CapEx request |
| GET | `/api/v1/capex-requests/:id` | Get CapEx request details |
| PUT | `/api/v1/capex-requests/:id/approve` | Approve a CapEx request |
| PUT | `/api/v1/capex-requests/:id/reject` | Reject a CapEx request |
| GET | `/api/v1/budget-cycles` | List budget cycles |
| POST | `/api/v1/budget-cycles` | Create a new budget cycle |
| GET | `/api/v1/scenarios` | List financial scenarios |
| POST | `/api/v1/scenarios` | Create a financial scenario |
| GET | `/api/v1/financial-metrics/:requestId` | Get financial metrics for a request |
| GET | `/health` | Service health check |

## Financial Modelling

The service calculates the following financial metrics for each CapEx request:

| Metric | Description |
|---|---|
| **NPV** | Net Present Value of the investment over its useful life |
| **IRR** | Internal Rate of Return |
| **ROI** | Return on Investment as a percentage |
| **TCO** | Total Cost of Ownership (acquisition + maintenance + disposal) |
| **Payback Period** | Time to recover the initial investment |

## Prioritisation Scoring

Requests are scored on a 0–100 scale using the following weighted criteria:

| Criterion | Weight | Data Source |
|---|---|---|
| Clinical criticality | 30% | Asset Management Service |
| Asset age vs. expected life | 20% | Asset Management Service |
| Maintenance cost trend | 20% | Asset Management Service |
| Downtime frequency | 15% | Asset Management Service |
| Regulatory compliance risk | 15% | Asset Management Service |

## Data Model

### CapexRequest

```json
{
  "id": "uuid",
  "title": "Replace 15-year-old CT Scanner in Radiology",
  "assetId": "uuid",
  "requestedBy": "uuid",
  "department": "Radiology",
  "requestType": "REPLACEMENT | NEW | UPGRADE",
  "estimatedCost": 850000,
  "priorityScore": 87,
  "status": "DRAFT | SUBMITTED | UNDER_REVIEW | APPROVED | REJECTED",
  "budgetCycleId": "uuid",
  "justification": "string",
  "createdAt": "ISO8601"
}
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Service listening port | `3003` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `KAFKA_BROKERS` | Kafka broker list | `localhost:9092` |
| `ASSET_SERVICE_URL` | Asset Management Service base URL | `http://asset-management:3001` |
| `DISCOUNT_RATE` | Default discount rate for NPV calculations | `0.07` |

## Running Locally

```bash
npm install
cp .env.example .env
npm start
```
