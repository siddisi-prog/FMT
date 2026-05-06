# ADR-001: Apache Kafka as the Platform Message Bus

**Date**: 2026-05-06
**Status**: Accepted
**Author**: Niyas Ahamed

## Context

The Healthcare Asset Management Platform requires an asynchronous messaging layer to decouple microservices and enable reliable integration with external ERP/CMMS systems. Two primary options were evaluated: **Apache Kafka** and **RabbitMQ**.

## Decision

**Apache Kafka** is selected as the platform's primary message bus.

## Rationale

| Criterion | Kafka | RabbitMQ |
|---|---|---|
| Throughput | Very high (millions of events/sec) | Moderate |
| Message retention | Configurable log retention (days/weeks) | Messages deleted after consumption |
| Replay capability | Yes — consumers can re-read historical events | No |
| Consumer groups | Multiple independent consumers per topic | Competing consumers per queue |
| Ordering guarantees | Per-partition ordering | Per-queue ordering |
| Ecosystem maturity | Large (Kafka Connect, Kafka Streams) | Moderate |
| Operational complexity | Higher | Lower |

The ability to **replay historical events** is critical for this platform, as it enables new downstream services (e.g., a new analytics service) to bootstrap their state from historical asset events without requiring data migration. Kafka's log retention model also provides a natural audit trail for all domain events.

## Consequences

- **Positive**: High throughput, event replay, multiple independent consumers, strong ecosystem.
- **Negative**: Higher operational complexity; requires Zookeeper (or KRaft in newer versions) and careful partition management.
- **Mitigation**: Use a managed Kafka service (AWS MSK, Confluent Cloud) in production to reduce operational burden.
