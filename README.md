# FrostSight

<<<<<<< Updated upstream
## NOTICE

This is the Back Up of this Project. All commit history and version control is not on this repository. This is just an artifact of the original repository. 

## Overview

FrostSight is a SaaS style cloud security observability platform that ingests cloud audit events, processes suspicious activity signals, stores enriched records, and exposes operational metrics through Datadog dashboards.
=======
FrostSight is a reconstructed cloud cost intelligence platform that ingests billing exports, stores raw cloud spend data, exposes hybrid REST and GraphQL APIs, and renders an interactive cost explorer with Vue.js and Three.js.
>>>>>>> Stashed changes

This repository is a GitHub ready rebuild based on the original FrostSight architecture and resume scope. It is not the lost original repository, but it is structured to represent the same system design and technical responsibilities.

## Tech Stack

Frontend
- Vue.js
- Vite
- Three.js
- Axios

Backend
- Node.js
- Express.js
- GraphQL
- MongoDB
- Redis
- AWS S3 compatible storage
- Datadog APM, logs, and custom metrics

DevOps
- Docker
- Docker Compose
- GitHub Actions CI

## What FrostSight Does

FrostSight processes cloud billing line items and converts them into dashboard ready cost intelligence.

Core features include:
- Billing export ingestion from CSV or JSON files
- Raw export archival to AWS S3 compatible storage
- Spend data persistence in MongoDB
- REST API for dashboard summaries, anomaly alerts, and ingestion
- GraphQL API for client driven spend retrieval and query composition
- Redis caching for dashboard reads
- Datadog instrumentation for API latency, ingestion volume, and cost spike alerts
- Vue.js dashboard for spend summaries and service breakdowns
- Three.js interactive cost explorer for visualizing service level spend intensity

## Architecture

```text
Billing CSV or JSON Export
        |
        v
Node.js Express Ingestion API
        |
        |---- raw export archived to S3
        |---- normalized line items stored in MongoDB
        |---- dashboard summaries cached in Redis
        |---- custom metrics sent to Datadog
        |
        v
REST and GraphQL API Layer
        |
        v
Vue.js Dashboard + Three.js Cost Explorer
```

## Repository Layout

```text
FrostSight/
  backend/
    src/
      config/
      data/
      graphql/
      middleware/
      routes/
      services/
      utils/
    tests/
  frontend/
    src/
      components/
      services/
      views/
  docker-compose.yml
  .github/workflows/ci.yml
```

## Quick Start

Run the full stack locally:

```bash
docker compose up --build
```

Backend API:

```text
http://localhost:4000
```

Frontend dashboard:

```text
http://localhost:5173
```

GraphQL endpoint:

```text
http://localhost:4000/graphql
```

## Local Development

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## API Examples

Health check:

```bash
curl http://localhost:4000/health
```

Ingest sample billing data:

```bash
curl -X POST http://localhost:4000/api/ingest/sample
```

Get dashboard summary:

```bash
curl http://localhost:4000/api/spend/summary
```

Get alerts:

```bash
curl http://localhost:4000/api/alerts
```

GraphQL query:

```graphql
query {
  spendSummary {
    totalSpend
    topService
    lineItemCount
  }
  serviceSpend {
    service
    amount
  }
}
```

## Datadog Usage

FrostSight includes Datadog hooks for realistic SaaS observability:

- API request latency
- API error count
- Billing line items ingested
- Spend anomaly count
- Cache hit and miss count
- Cost spike alert events

In a production deployment, the Datadog Agent would run beside the backend service or as a sidecar. The backend emits application metrics through DogStatsD style calls and uses Datadog APM tracing for Express routes.

## Resume Mapping

This repo maps to the project bullets as follows:

- Cost intelligence microservice that ingests cloud billing data and recommends cost optimizations
- Hybrid GraphQL and HTTP REST API layer for flexible dashboard retrieval
- Raw billing export archival through AWS S3 compatible storage
- MongoDB backed spend querying and aggregation
- Automated cost spike detection and alerting
- Redis dashboard caching for faster reads
- Vue.js and Three.js interactive cost explorer
- Dockerized deployment with Datadog instrumentation and GitHub Actions CI
