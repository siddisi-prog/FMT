# Architecture Overview

## Design Principles

The Healthcare Asset Management Platform is designed around the following core principles:

1. **Domain-Driven Design (DDD)**: Each microservice maps to a well-defined bounded context with its own data model, business logic, and API surface.
2. **API-First**: All service capabilities are exposed via versioned REST APIs before any UI is built. OpenAPI 3.0 specifications are the source of truth.
3. **Event-Driven Integration**: Asynchronous communication via Kafka decouples services and enables reliable, scalable integration with external systems.
4. **Security by Design**: Authentication, authorisation, audit logging, and data encryption are built into the platform from the ground up, not added as afterthoughts.
5. **Observability First**: Every service emits structured logs, metrics, and distributed traces from day one.
6. **Infrastructure as Code**: All cloud infrastructure is provisioned and managed via Terraform, ensuring repeatability and auditability.

## Bounded Contexts

| Bounded Context | Service | Core Aggregate |
|---|---|---|
| Asset Lifecycle | asset-management | `Asset` |
| Enterprise Integration | integration-gateway | `CanonicalAsset` |
| Capital Planning | capital-planning | `CapexRequest` |
| Sustainability | sustainability-esg | `EnergyReading` |
| Identity | identity-access | `User`, `Tenant` |
| Analytics | reporting-analytics | `AuditLog`, `Dashboard` |

## Data Architecture

Each service owns its own database schema, enforcing the microservices principle of data isolation. Cross-service data access is achieved via API calls or event consumption, never via direct database access.

| Service | Database | Schema |
|---|---|---|
| asset-management | PostgreSQL | `asset_mgmt` |
| integration-gateway | PostgreSQL | `integration` |
| capital-planning | PostgreSQL | `capital` |
| sustainability-esg | PostgreSQL + TimescaleDB | `esg`, `timeseries` |
| identity-access | PostgreSQL | `identity` |
| reporting-analytics | PostgreSQL (read replica) | `reporting` |

## Architecture Decision Records (ADRs)

Architecture Decision Records are stored in `docs/architecture/adr/`. Key decisions include:

- **ADR-001**: Choice of Apache Kafka over RabbitMQ for the message bus (higher throughput, log retention).
- **ADR-002**: PostgreSQL as the primary relational database (ACID compliance, JSON support, mature ecosystem).
- **ADR-003**: Keycloak as the identity provider (open-source, OIDC-compliant, LDAP federation support).
- **ADR-004**: Node.js as the default service runtime (async I/O, fast prototyping, large ecosystem).
- **ADR-005**: Kubernetes for container orchestration (portability, auto-scaling, health management).
