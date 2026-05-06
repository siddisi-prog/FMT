# Identity & Access Service

The **Identity & Access Service** provides centralised authentication, authorisation, and multi-tenancy management for the Healthcare Asset Management Platform. It acts as the security backbone for all other services.

## Responsibilities

- Provide OIDC/OAuth2 authentication via integration with Keycloak or Auth0.
- Enforce Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC).
- Manage users, roles, permissions, and organisational tenants.
- Issue and validate JWT access tokens for all platform services.
- Support SSO integration with hospital Active Directory / LDAP.
- Log all authentication and authorisation events immutably.

## Predefined Roles

| Role | Description | Key Permissions |
|---|---|---|
| `platform-admin` | Full platform administrator | All permissions |
| `asset-manager` | Clinical engineering manager | Create/update/delete assets, approve work orders |
| `maintenance-technician` | Field technician | View assets, create/update work orders in own department |
| `asset-viewer` | Read-only observer | View assets and work orders |
| `finance-approver` | Finance team member | View/approve CapEx requests, view financial data |
| `esg-analyst` | Sustainability analyst | View/create ESG readings and metrics |
| `report-viewer` | Reporting consumer | View dashboards and export reports |

## ABAC Attributes

In addition to roles, the following attributes are used for fine-grained access control:

| Attribute | Description | Example |
|---|---|---|
| `department` | User's assigned department | `Radiology` |
| `location` | User's assigned location/campus | `Main Campus` |
| `tenantId` | Organisation tenant identifier | `hospital-group-001` |
| `assetCategory` | Allowed asset categories | `MEDICAL_DEVICE` |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/auth/token` | Issue access token (OAuth2 client credentials) |
| POST | `/api/v1/auth/refresh` | Refresh access token |
| GET | `/api/v1/users` | List users (admin only) |
| POST | `/api/v1/users` | Create a user |
| GET | `/api/v1/roles` | List roles |
| POST | `/api/v1/roles` | Create a custom role |
| GET | `/api/v1/tenants` | List tenants |
| POST | `/api/v1/tenants` | Create a tenant |
| GET | `/health` | Service health check |

## JWT Token Structure

```json
{
  "sub": "user-uuid",
  "tenantId": "hospital-group-001",
  "roles": ["maintenance-technician"],
  "attributes": {
    "department": "Radiology",
    "location": "Main Campus"
  },
  "iat": 1714987200,
  "exp": 1714990800
}
```

## Multi-Tenancy

The platform supports two multi-tenancy models:

| Model | Description | Use Case |
|---|---|---|
| **Single-tenant** | Dedicated deployment per hospital group | Large hospital networks with strict isolation requirements |
| **Multi-tenant** | Shared deployment with schema-level DB isolation | Smaller facilities or SaaS deployment |

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Service listening port | `3005` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `KEYCLOAK_URL` | Keycloak server URL | — |
| `KEYCLOAK_REALM` | Keycloak realm name | `healthcare-platform` |
| `KEYCLOAK_CLIENT_ID` | Keycloak client ID | — |
| `KEYCLOAK_CLIENT_SECRET` | Keycloak client secret | — |
| `JWT_EXPIRY` | JWT token expiry in seconds | `3600` |
| `LDAP_URL` | Hospital LDAP/AD server URL | — |

## Running Locally

```bash
npm install
cp .env.example .env
npm start
```
