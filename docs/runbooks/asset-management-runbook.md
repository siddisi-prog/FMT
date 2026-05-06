# Runbook: Asset Management Service

## Overview

This runbook covers operational procedures for the Asset Management Service in production.

## Health Checks

Verify the service is healthy:

```bash
curl http://asset-management:3001/health
# Expected: {"status":"UP","service":"asset-management","timestamp":"..."}
```

Check Kubernetes pod status:

```bash
kubectl get pods -n healthcare-platform -l app=asset-management
```

## Common Issues

### Service Not Starting

**Symptom**: Pod in `CrashLoopBackOff` or `Error` state.

**Diagnosis**:
```bash
kubectl logs -n healthcare-platform deployment/asset-management --previous
```

**Common causes**:
- `DATABASE_URL` environment variable not set or incorrect.
- PostgreSQL not yet ready (check `postgres` pod health).
- Kafka brokers unreachable.

### High Latency on Asset List Endpoint

**Symptom**: `GET /api/v1/assets` response time > 2 seconds.

**Diagnosis**:
- Check PostgreSQL slow query log for missing indexes.
- Verify the `assets` table has indexes on `status`, `categoryId`, and `locationId`.
- Check Grafana dashboard for database connection pool exhaustion.

**Resolution**:
```sql
-- Add missing index if not present
CREATE INDEX CONCURRENTLY idx_assets_status ON asset_mgmt.assets(status);
CREATE INDEX CONCURRENTLY idx_assets_category ON asset_mgmt.assets(category_id);
```

### Kafka Events Not Being Published

**Symptom**: Asset changes not appearing in downstream services.

**Diagnosis**:
```bash
# Check Kafka topic for recent messages
kafka-console-consumer.sh --bootstrap-server kafka:9092 \
  --topic asset.events --from-beginning --max-messages 10
```

**Resolution**: Restart the service pod to re-establish Kafka producer connection.

## Scaling

Scale the deployment horizontally:

```bash
kubectl scale deployment/asset-management --replicas=4 -n healthcare-platform
```

## Database Migrations

Run pending database migrations:

```bash
kubectl exec -it deployment/asset-management -n healthcare-platform -- npm run migrate
```

## Rollback

Roll back to the previous deployment:

```bash
kubectl rollout undo deployment/asset-management -n healthcare-platform
```
