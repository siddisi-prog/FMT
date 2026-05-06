# Sustainability & ESG Service

The **Sustainability & ESG Service** enables healthcare organisations to measure, track, and reduce their environmental footprint in alignment with ESG reporting frameworks, net-zero commitments, and regulatory sustainability requirements.

## Responsibilities

- Ingest energy and resource consumption data from BMS/BAS, IoT sensors, smart meters, and ERP utility invoices.
- Calculate carbon emissions using configurable emission factors per asset type and energy source.
- Track sustainability KPIs at asset, department, and facility levels.
- Monitor progress against organisational sustainability targets.
- Record end-of-life asset disposal metrics for circular economy reporting.

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/energy-readings` | List energy readings (filterable by asset, date) |
| POST | `/api/v1/energy-readings` | Submit a new energy reading |
| GET | `/api/v1/emission-factors` | List emission factors |
| POST | `/api/v1/emission-factors` | Create or update an emission factor |
| GET | `/api/v1/metrics` | Get aggregated sustainability metrics |
| GET | `/api/v1/targets` | List sustainability targets |
| POST | `/api/v1/targets` | Create a sustainability target |
| GET | `/api/v1/assets/:id/usage-profile` | Get usage profile for an asset |
| GET | `/health` | Service health check |

## Key KPIs Tracked

| KPI | Unit | Aggregation Level |
|---|---|---|
| Energy consumption | kWh | Asset, Department, Facility |
| Water consumption | m³ | Location |
| Gas consumption | m³ | Location |
| Carbon emissions (Scope 1) | kg CO2e | Asset, Facility |
| Carbon emissions (Scope 2) | kg CO2e | Facility |
| Energy per bed | kWh/bed/day | Facility |
| Energy per procedure | kWh/procedure | Modality |
| Recycling rate | % | Facility |

## Data Ingestion Sources

| Source | Method | Frequency |
|---|---|---|
| BMS/BAS | REST API pull | Every 15 minutes |
| IoT Sensors | MQTT / Kafka | Real-time |
| Smart Meters | REST API pull | Hourly |
| ERP Utility Invoices | Integration Gateway event | Monthly |
| CMMS Runtime Hours | `AssetUsageUpdated` event | On change |

## Data Model

### EnergyReading

```json
{
  "id": "uuid",
  "assetId": "uuid",
  "locationId": "uuid",
  "readingType": "ELECTRICITY | WATER | GAS | FUEL",
  "value": 125.4,
  "unit": "kWh",
  "timestamp": "ISO8601",
  "sourceSystem": "BMS | SMART_METER | MANUAL",
  "createdAt": "ISO8601"
}
```

### EmissionFactor

```json
{
  "id": "uuid",
  "name": "UK Grid Electricity 2025",
  "energySource": "ELECTRICITY",
  "region": "GB",
  "factor": 0.23314,
  "unit": "kg CO2e per kWh",
  "effectiveFrom": "2025-01-01",
  "source": "DEFRA 2025"
}
```

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `PORT` | Service listening port | `3004` |
| `DATABASE_URL` | PostgreSQL connection string | — |
| `TIMESERIES_DB_URL` | TimescaleDB / InfluxDB connection | — |
| `KAFKA_BROKERS` | Kafka broker list | `localhost:9092` |
| `MQTT_BROKER_URL` | MQTT broker for IoT sensors | — |
| `DEFAULT_EMISSION_FACTOR_REGION` | Default region for emission factors | `GB` |

## Running Locally

```bash
npm install
cp .env.example .env
npm start
```
