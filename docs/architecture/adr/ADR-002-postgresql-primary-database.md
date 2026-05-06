# ADR-002: PostgreSQL as the Primary Relational Database

**Date**: 2026-05-06
**Status**: Accepted
**Author**: Niyas Ahamed

## Context

The platform requires a reliable, ACID-compliant relational database for transactional data storage across all microservices. Options evaluated include PostgreSQL, MySQL/MariaDB, and Microsoft SQL Server.

## Decision

**PostgreSQL 15** is selected as the primary relational database for all microservices.

## Rationale

- **ACID compliance**: Critical for financial data (CapEx requests, budget cycles) and audit trails.
- **JSON/JSONB support**: Enables flexible schema evolution for asset attributes without full migrations.
- **Row-level security (RLS)**: Supports multi-tenancy isolation at the database level.
- **TimescaleDB extension**: Enables time-series capabilities for IoT and energy data within the same database ecosystem.
- **Open-source**: No per-core licensing costs, unlike SQL Server.
- **Mature ecosystem**: Excellent tooling, ORM support, and managed cloud offerings (AWS RDS, Azure Database for PostgreSQL).

## Consequences

- **Positive**: Full ACID compliance, flexible JSON support, RLS for multi-tenancy, no licensing costs.
- **Negative**: Requires careful index management at scale; not ideal for extremely high write throughput (use TimescaleDB extension for time-series).
- **Mitigation**: Use read replicas for reporting queries. Use TimescaleDB for the Sustainability & ESG service's time-series data.
