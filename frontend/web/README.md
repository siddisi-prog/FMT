# Web Application — Healthcare Asset Management Platform

The web application provides the primary user interface for clinical engineers, finance teams, and sustainability officers to interact with the platform.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | UI component framework |
| TypeScript | Type-safe JavaScript |
| TailwindCSS | Utility-first CSS framework |
| React Router v6 | Client-side routing |
| Zustand / Redux Toolkit | State management |
| React Query (TanStack) | Server state and data fetching |
| Axios | HTTP client for API calls |

## Key Pages

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Overview KPIs and alerts |
| Asset Registry | `/assets` | Browse and search all assets |
| Asset Detail | `/assets/:id` | Full asset profile and history |
| Work Orders | `/work-orders` | Maintenance work order management |
| CapEx Planner | `/capex` | Capital expenditure requests and approvals |
| Sustainability | `/sustainability` | ESG metrics and targets |
| Reports | `/reports` | Generate and download reports |
| Admin | `/admin` | User, role, and tenant management |

## Running Locally

```bash
npm install
npm run dev
# Application available at http://localhost:5173
```

## Building for Production

```bash
npm run build
# Output in dist/
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for the API Gateway |
| `VITE_KEYCLOAK_URL` | Keycloak server URL |
| `VITE_KEYCLOAK_REALM` | Keycloak realm |
| `VITE_KEYCLOAK_CLIENT_ID` | Keycloak client ID |
