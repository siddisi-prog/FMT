# Healthcare Asset Management Platform

> **A production-grade, microservices-based platform for end-to-end healthcare asset lifecycle management, capital planning, ERP/CMMS integration, and sustainability tracking.**

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Domain Modules](#domain-modules)
4. [Repository Structure](#repository-structure)
5. [Technology Stack](#technology-stack)
6. [Getting Started](#getting-started)
7. [Service Reference](#service-reference)
8. [Integration Patterns](#integration-patterns)
9. [Security & Compliance](#security--compliance)
10. [Observability](#observability)
11. [Infrastructure & Deployment](#infrastructure--deployment)
12. [Contributing](#contributing)
13. [License](#license)

---

## Overview

The **Healthcare Asset Management Platform** is a comprehensive digital health solution built for hospital networks, integrated health systems, and healthcare facility operators. It provides a unified, auditable, and extensible system to manage the full lifecycle of healthcare assets — from procurement and commissioning through maintenance, compliance, and eventual decommissioning.

The platform is designed by **Niyas Ahamed**, Digital Health Architect, and follows modern cloud-native principles: domain-driven design, event-driven integration, API-first communication, and infrastructure-as-code deployment.

### Key Capabilities at a Glance

| Capability | Module |
|---|---|
| Medical device & facility asset registry | Asset Management |
| Preventive, corrective & calibration maintenance | Asset Management |
| Regulatory compliance & audit trails | Asset Management |
| ERP/CMMS bi-directional integration | Integration Gateway |
| SAP, Oracle, Dynamics adapters | Integration Gateway |
| CapEx requests, budget cycles, approvals | Capital Planning |
| NPV, ROI, TCO financial modeling | Capital Planning |
| Energy & carbon footprint tracking | Sustainability & ESG |
| RBAC/ABAC identity management | Identity & Access |
| Dashboards, analytics & audit logs | Reporting & Analytics |

---

## Architecture

### Architectural Style

The platform adopts a **microservices architecture** with clear bounded contexts, enabling independent deployment, scaling, and evolution of each domain module. A modular monolith deployment option is also supported for smaller healthcare organisations.

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                       │
│         Web App (React/TypeScript)  │  Mobile (Flutter)         │
└───────────────────────┬─────────────────────────────────────────┘
                        │ HTTPS / WebSocket
┌───────────────────────▼─────────────────────────────────────────┐
│                         API GATEWAY                             │
│          REST APIs  │  GraphQL Gateway  │  Auth (OIDC/JWT)      │
└──────┬──────────────┬──────────────┬──────────────┬─────────────┘
       │              │              │              │
┌──────▼──────┐ ┌─────▼──────┐ ┌────▼──────┐ ┌────▼──────────────┐
│   Asset     │ │Integration │ │  Capital  │ │ Sustainability     │
│ Management  │ │  Gateway   │ │ Planning  │ │    & ESG           │
│  Service    │ │  Service   │ │  Service  │ │   Service          │
└──────┬──────┘ └─────┬──────┘ └────┬──────┘ └────┬──────────────┘
       │              │              │              │
┌──────▼──────────────▼──────────────▼──────────────▼─────────────┐
│                       MESSAGE BUS (Kafka / RabbitMQ)            │
│  AssetCreated │ AssetUpdated │ WorkOrderCreated │ ESGReading     │
└──────┬──────────────┬──────────────┬──────────────┬─────────────┘
       │              │              │              │
┌──────▼──────┐ ┌─────▼──────┐ ┌────▼──────┐ ┌────▼──────────────┐
│ PostgreSQL  │ │  External  │ │Time-Series│ │  Identity &       │
│  (Primary)  │ │ ERP / CMMS │ │  DB (IoT) │ │  Access Service   │
└─────────────┘ └────────────┘ └───────────┘ └───────────────────┘
```

### Core Architectural Layers

| Layer | Technology | Purpose |
|---|---|---|
| Presentation | React 18, TypeScript, Flutter | Web and mobile client applications |
| API Gateway | Kong / AWS API Gateway / Nginx | Routing, rate limiting, auth enforcement |
| Services | Node.js / Python / Java (per service) | Domain business logic |
| Messaging | Apache Kafka / RabbitMQ | Async event-driven integration |
| Relational DB | PostgreSQL 15 / SQL Server | Transactional data storage |
| Time-Series DB | InfluxDB / TimescaleDB | IoT sensor and energy data |
| Cache | Redis | Session cache, rate limiting |
| Observability | OpenTelemetry, Prometheus, Grafana | Metrics, tracing, dashboards |
| Identity | Keycloak / Auth0 | OIDC/OAuth2 identity provider |
| Infrastructure | Kubernetes, Terraform, Helm | Container orchestration and IaC |

---

## Domain Modules

### 1. Healthcare Asset Management

The **Asset Management Service** is the core of the platform. It maintains a comprehensive registry of all assets across the healthcare organisation and manages their complete lifecycle.

#### Lifecycle Stages

```
Procurement → Commissioning → Active Use → Maintenance → Inspection → Decommissioning
```

#### Key Capabilities

- **Asset Registry**: Tracks medical devices, imaging equipment (MRI, CT, X-ray), laboratory analysers, facility assets (HVAC, electrical), and IT assets.
- **Lifecycle Management**: Full traceability from purchase order through to disposal.
- **Maintenance Management**: Preventive maintenance schedules, corrective work orders, calibration records, and safety checks.
- **Compliance Management**: Regulatory inspection records, audit trails, certificates of conformity, and expiry alerts.
- **Location & Ownership**: Department, cost centre, building, room, and responsible owner tracking.
- **Financial Attributes**: CapEx/OpEx tagging, depreciation reference, and residual value.

#### Core Data Entities

| Entity | Description |
|---|---|
| `Asset` | The central entity representing any physical or digital asset |
| `AssetCategory` | Hierarchical classification (e.g., Medical Device > Imaging > MRI) |
| `Location` | Physical location (campus, building, floor, room) |
| `WorkOrder` | A maintenance or inspection task assigned to a technician |
| `MaintenancePlan` | A recurring schedule of preventive maintenance tasks |
| `Vendor` / `Contract` | Supplier and service contract information |
| `ComplianceRecord` | Regulatory inspection results and certificates |

---

### 2. Integration Gateway Service (ERP & CMMS)

The **Integration Gateway** provides a robust, bi-directional data exchange layer between the platform and external enterprise systems such as SAP, Oracle, Microsoft Dynamics, and existing hospital CMMS/HTM tools.

#### Integration Patterns

**API-First Integration**: The gateway exposes standardised REST/GraphQL APIs for asset master data, work orders, and financial attributes. It simultaneously consumes external ERP/CMMS APIs for purchase orders, invoices, GL accounts, and cost centres.

**Event-Driven Integration**: A message bus (Kafka/RabbitMQ) is used for near-real-time synchronisation. Key events include:

| Event | Producer | Consumers |
|---|---|---|
| `AssetCreated` | Asset Management | ERP, Capital Planning |
| `AssetUpdated` | Asset Management | ERP, Reporting |
| `AssetRetired` | Asset Management | ERP, Sustainability |
| `WorkOrderCreated` | Asset Management | CMMS, Reporting |
| `WorkOrderCompleted` | Asset Management | CMMS, Capital Planning |

**Connector/Adapter Pattern**: Each external system integration is implemented as a separate microservice adapter with its own data mapping logic, isolating changes in external systems from the core platform.

#### Technical Considerations

- **Data Mapping**: A canonical internal data model is maintained. Each adapter translates between the canonical model and the external system's schema.
- **Idempotency**: All event consumers and API endpoints are designed to handle duplicate events and retries gracefully using idempotency keys.
- **Security**: OAuth2/OIDC for API authentication, API keys for legacy systems, and mTLS where required for high-security integrations.
- **Scheduling**: Nightly batch sync jobs are supplemented with near-real-time event streaming where the external system supports it.

---

### 3. Capital Expenditure (CapEx) Planning Module

The **Capital Planning Service** enables healthcare finance and clinical engineering teams to plan, prioritise, and approve capital expenditure for medical equipment and facility assets.

#### Key Capabilities

- **CapEx Requests**: Structured submission of requests for new equipment, replacements, and upgrades, with supporting clinical and financial justification.
- **Budget Cycles**: Annual and multi-year planning with scenario modelling and approval workflows.
- **Prioritisation Engine**: Scores requests based on clinical risk, asset age, downtime history, maintenance cost trends, and regulatory compliance status.
- **Financial Modelling**: Calculates Net Present Value (NPV), Internal Rate of Return (IRR), Return on Investment (ROI), and Total Cost of Ownership (TCO).

#### Core Data Entities

| Entity | Description |
|---|---|
| `CapexRequest` | A formal request for capital investment in an asset |
| `CapexProject` | An approved and funded capital project |
| `BudgetCycle` | An annual or multi-year budget planning period |
| `Scenario` | A what-if financial scenario for comparison |
| `ApprovalWorkflow` | A configurable multi-stage approval process |
| `FinancialMetric` | Calculated financial indicators (NPV, IRR, payback period) |

#### Integration Points

The Capital Planning Service integrates with the ERP system for GL accounts, cost centres, budget lines, and actuals vs. planned variance. It also pulls asset age, maintenance cost history, downtime records, and risk scores from the Asset Management Service.

---

### 4. Sustainability & ESG Module

The **Sustainability & ESG Service** enables healthcare organisations to measure, track, and reduce their environmental footprint in alignment with ESG reporting frameworks and net-zero commitments.

#### Key Capabilities

- **Energy & Resource Tracking**: Monitors kWh, water consumption, gas usage, and medical consumables per asset or per location.
- **Carbon Footprint Calculation**: Applies emission factors per asset type or energy source to calculate Scope 1, 2, and 3 emissions.
- **Sustainability KPIs**: Tracks energy per bed, energy per procedure, energy per modality, and emissions per asset category.
- **End-of-Life Management**: Records recycling, disposal, and circular economy metrics for decommissioned assets.

#### Core Data Entities

| Entity | Description |
|---|---|
| `EnergyReading` | A time-stamped energy or resource consumption measurement |
| `EmissionFactor` | A conversion factor for calculating CO2e from energy or fuel |
| `SustainabilityMetric` | An aggregated KPI for a given period and scope |
| `SustainabilityTarget` | An organisational target (e.g., 30% energy reduction by 2030) |
| `AssetUsageProfile` | Runtime hours and usage intensity for an asset |

#### Data Sources

The service ingests data from Building Management Systems (BMS/BAS), IoT sensors, smart meters, ERP utility invoices, and CMMS runtime hours.

---

### 5. Identity & Access Service

The **Identity & Access Service** provides centralised authentication and authorisation for all platform services and users.

- **Authentication**: OIDC/OAuth2 via Keycloak or Auth0, supporting SSO with hospital Active Directory/LDAP.
- **Authorisation**: Role-Based Access Control (RBAC) combined with Attribute-Based Access Control (ABAC) for fine-grained permissions (e.g., a technician can only view assets in their department).
- **Multi-Tenancy**: Supports single-tenant deployments per hospital group and multi-tenant deployments with strict tenant isolation at the database or schema level.
- **Audit Logging**: All authentication events and permission changes are logged immutably.

---

### 6. Reporting & Analytics Service

The **Reporting & Analytics Service** aggregates data from all domain services to provide actionable insights for clinical engineers, finance teams, and sustainability officers.

- **Dashboards**: Pre-built and configurable dashboards for asset health, maintenance KPIs, CapEx pipeline, and ESG metrics.
- **Audit Trails**: Immutable, searchable logs of all asset and financial changes across the platform.
- **Data Export**: CSV, Excel, and PDF export for regulatory reporting and board-level presentations.
- **Observability Integration**: Feeds into Prometheus/Grafana for operational monitoring.

---

## Repository Structure

```
healthcare-asset-platform/
├── README.md                          # This file
├── .gitignore
├── scaffold.sh                        # Bootstrap script
│
├── services/
│   ├── asset-management/              # Core asset lifecycle service
│   │   ├── src/
│   │   │   ├── index.js               # Service entry point
│   │   │   ├── routes/                # API route handlers
│   │   │   ├── models/                # Data models (Asset, WorkOrder, etc.)
│   │   │   ├── services/              # Business logic layer
│   │   │   └── events/                # Kafka event producers/consumers
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── integration-gateway/           # ERP/CMMS integration adapters
│   │   ├── src/
│   │   │   ├── index.js
│   │   │   ├── adapters/              # SAP, Oracle, Dynamics connectors
│   │   │   ├── canonical/             # Internal canonical data model
│   │   │   └── events/                # Event consumers and producers
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── capital-planning/              # CapEx planning and approvals
│   │   ├── src/
│   │   │   ├── index.js
│   │   │   ├── routes/
│   │   │   ├── models/                # CapexRequest, BudgetCycle, etc.
│   │   │   ├── services/
│   │   │   └── financial/             # NPV, IRR, TCO calculators
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── sustainability-esg/            # Energy, carbon, and ESG tracking
│   │   ├── src/
│   │   │   ├── index.js
│   │   │   ├── routes/
│   │   │   ├── models/                # EnergyReading, EmissionFactor, etc.
│   │   │   ├── services/
│   │   │   └── ingest/                # IoT/BMS data ingestion pipelines
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── identity-access/               # Authentication and authorisation
│   │   ├── src/
│   │   │   ├── index.js
│   │   │   ├── rbac/                  # Role and permission definitions
│   │   │   └── middleware/            # Auth middleware for other services
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── reporting-analytics/           # Dashboards, audit logs, exports
│       ├── src/
│       │   ├── index.js
│       │   ├── routes/
│       │   ├── dashboards/            # Dashboard definitions
│       │   └── export/                # CSV, PDF export logic
│       ├── Dockerfile
│       ├── package.json
│       └── README.md
│
├── frontend/
│   ├── web/                           # React TypeScript web application
│   │   ├── src/
│   │   │   ├── pages/                 # Page components
│   │   │   ├── components/            # Reusable UI components
│   │   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── services/              # API client layer
│   │   │   └── store/                 # State management (Redux/Zustand)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── mobile/                        # Flutter mobile application
│       ├── lib/
│       │   ├── screens/               # App screens
│       │   ├── widgets/               # Reusable widgets
│       │   └── services/              # API client and state
│       └── pubspec.yaml
│
├── infra/
│   ├── docker-compose.yml             # Local development stack
│   ├── k8s/                           # Kubernetes manifests
│   │   ├── namespaces.yaml
│   │   ├── asset-management/
│   │   ├── integration-gateway/
│   │   └── ...
│   └── terraform/                     # Infrastructure as Code
│       ├── main.tf
│       ├── variables.tf
│       └── modules/
│
└── docs/
    ├── architecture/
    │   ├── overview.md                # This document
    │   ├── adr/                       # Architecture Decision Records
    │   └── diagrams/                  # Architecture diagrams
    ├── api/                           # OpenAPI specifications
    └── runbooks/                      # Operational runbooks
```

---

## Technology Stack

| Category | Technology | Rationale |
|---|---|---|
| Backend Services | Node.js 18 / Python 3.11 | Lightweight, async-friendly microservices |
| Web Frontend | React 18, TypeScript, TailwindCSS | Type-safe, component-driven UI |
| Mobile | Flutter 3 | Single codebase for iOS and Android |
| API Gateway | Kong / Nginx | Routing, rate limiting, auth |
| Message Broker | Apache Kafka | High-throughput, durable event streaming |
| Primary Database | PostgreSQL 15 | ACID-compliant relational storage |
| Time-Series DB | TimescaleDB / InfluxDB | IoT and energy data |
| Cache | Redis 7 | Session management, rate limiting |
| Identity Provider | Keycloak | Open-source OIDC/OAuth2 |
| Container Runtime | Docker | Consistent build and deploy |
| Orchestration | Kubernetes (K8s) | Production-grade container management |
| IaC | Terraform | Repeatable infrastructure provisioning |
| CI/CD | GitHub Actions | Automated build, test, and deploy |
| Observability | OpenTelemetry + Prometheus + Grafana | Unified metrics, tracing, dashboards |

---

## Getting Started

### Prerequisites

Ensure the following tools are installed on your development machine:

- [Docker](https://docs.docker.com/get-docker/) (v24+) and Docker Compose (v2+)
- [Node.js](https://nodejs.org/) (v18+) and npm
- [Flutter SDK](https://flutter.dev/docs/get-started/install) (v3+) for mobile development
- [kubectl](https://kubernetes.io/docs/tasks/tools/) for Kubernetes deployments
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (v1.5+) for infrastructure provisioning

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/healthcare-asset-platform.git
cd healthcare-asset-platform
```

### 2. Configure Environment Variables

Copy the example environment file and populate the required values:

```bash
cp .env.example .env
# Edit .env with your database credentials, Kafka brokers, and API keys
```

### 3. Start the Local Development Stack

The `docker-compose.yml` in the `infra/` directory starts all services, PostgreSQL, Kafka, and Redis:

```bash
cd infra
docker-compose up -d
```

Verify all containers are running:

```bash
docker-compose ps
```

### 4. Run Individual Services

To develop a specific service in isolation:

```bash
cd services/asset-management
npm install
npm start
# Service available at http://localhost:3001
```

### 5. Run the Web Frontend

```bash
cd frontend/web
npm install
npm run dev
# Application available at http://localhost:5173
```

### 6. Health Check Endpoints

Each service exposes a `/health` endpoint:

| Service | Default Port | Health URL |
|---|---|---|
| asset-management | 3001 | http://localhost:3001/health |
| integration-gateway | 3002 | http://localhost:3002/health |
| capital-planning | 3003 | http://localhost:3003/health |
| sustainability-esg | 3004 | http://localhost:3004/health |
| identity-access | 3005 | http://localhost:3005/health |
| reporting-analytics | 3006 | http://localhost:3006/health |

---

## Service Reference

Detailed documentation for each service is available in its respective `README.md`:

- [`services/asset-management/README.md`](services/asset-management/README.md)
- [`services/integration-gateway/README.md`](services/integration-gateway/README.md)
- [`services/capital-planning/README.md`](services/capital-planning/README.md)
- [`services/sustainability-esg/README.md`](services/sustainability-esg/README.md)
- [`services/identity-access/README.md`](services/identity-access/README.md)
- [`services/reporting-analytics/README.md`](services/reporting-analytics/README.md)

OpenAPI specifications for all services are located in [`docs/api/`](docs/api/).

---

## Integration Patterns

### API-First

All services expose versioned REST APIs (`/api/v1/...`). An optional GraphQL gateway aggregates these APIs for the frontend. API contracts are defined using OpenAPI 3.0 specifications and are the source of truth for integration.

### Event-Driven

The platform uses Apache Kafka as its primary message bus. Events follow a standard envelope schema:

```json
{
  "eventId": "uuid-v4",
  "eventType": "AssetCreated",
  "source": "asset-management",
  "timestamp": "2026-05-06T10:00:00Z",
  "tenantId": "hospital-group-001",
  "payload": { ... }
}
```

### ERP/CMMS Adapters

Each external system adapter is a self-contained microservice. It is responsible for translating between the platform's canonical data model and the external system's schema. Adapters are designed to be stateless and idempotent.

---

## Security & Compliance

The platform is designed with healthcare-grade security requirements:

- **Authentication**: All API requests require a valid JWT issued by the Identity & Access Service (Keycloak/Auth0).
- **Authorisation**: RBAC defines roles (e.g., `asset-viewer`, `maintenance-technician`, `finance-approver`). ABAC adds attribute-level constraints (e.g., department, location).
- **Data Residency**: The platform supports deployment within specific geographic regions to comply with data sovereignty requirements.
- **PHI Separation**: If clinical data is linked to assets, it is stored in a separate, access-controlled data store to comply with HIPAA/GDPR requirements.
- **Audit Logging**: All create, update, and delete operations on assets and financial records are logged immutably with user identity, timestamp, and change details.
- **Transport Security**: All service-to-service communication uses TLS. mTLS is enforced for high-security integrations (e.g., ERP financial data).

---

## Observability

The platform implements the three pillars of observability:

| Pillar | Tool | Description |
|---|---|---|
| Metrics | Prometheus + Grafana | Service health, throughput, latency, error rates |
| Tracing | OpenTelemetry + Jaeger | Distributed request tracing across services |
| Logging | Fluentd + Elasticsearch + Kibana | Centralised structured log aggregation |

Pre-built Grafana dashboards are available in `infra/grafana/dashboards/` for asset management KPIs, maintenance performance, and ESG metrics.

---

## Infrastructure & Deployment

### Docker Compose (Local Development)

```bash
cd infra && docker-compose up -d
```

### Kubernetes (Production)

Kubernetes manifests are located in `infra/k8s/`. Deploy using `kubectl`:

```bash
kubectl apply -f infra/k8s/namespaces.yaml
kubectl apply -f infra/k8s/asset-management/
```

Helm charts are planned for a future release to simplify parameterised deployments.

### Terraform (Cloud Infrastructure)

Terraform modules in `infra/terraform/` provision the required cloud infrastructure (VPC, managed Kubernetes, managed PostgreSQL, Kafka, etc.) on AWS, Azure, or GCP.

```bash
cd infra/terraform
terraform init
terraform plan
terraform apply
```

### CI/CD

GitHub Actions workflows are defined in `.github/workflows/`:

- `ci.yml`: Runs linting, unit tests, and integration tests on every pull request.
- `cd.yml`: Builds Docker images and deploys to the target environment on merge to `main`.

---

## Contributing

Contributions are welcome. Please follow the standard GitHub flow:

1. Fork the repository and create a feature branch (`git checkout -b feature/your-feature`).
2. Make your changes and write tests.
3. Commit with a descriptive message following [Conventional Commits](https://www.conventionalcommits.org/).
4. Open a pull request against the `main` branch.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines on code style, testing requirements, and the review process.

---

## License

This project is licensed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

*Designed and architected by **Niyas Ahamed**, Digital Health Architect.*
*Repository scaffolded with Manus AI.*
