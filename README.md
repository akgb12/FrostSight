# FrostSight

## NOTICE

This is the Back Up of this Project. All commit history and version control is not on this repository. This is just an artifact of the original repository. 

## Overview

FrostSight is a SaaS style cloud security observability platform that ingests cloud audit events, processes suspicious activity signals, stores enriched records, and exposes operational metrics through Datadog dashboards.

This repository is a rebuilt version of the project scaffold based on the original architecture and resume description. It is intended to be pushed to GitHub and extended locally.

## What FrostSight Does

FrostSight monitors cloud audit activity and turns raw events into useful security and operations signals.

Core capabilities:

- Ingests audit events from a Kafka compatible stream
- Normalizes event payloads into a consistent schema
- Flags suspicious activity using simple rule based detection
- Stores enriched events in Snowflake or local development storage
- Uploads archived events to AWS S3 compatible storage
- Emits Datadog metrics for dashboards and alerts
- Provides a FastAPI backend for health checks, metrics, and event queries

## Architecture

```text
CloudTrail or audit logs
        ↓
Kafka topic
        ↓
FrostSight worker
        ↓
Rule based detection
        ↓
Snowflake and S3 archive
        ↓
FastAPI backend
        ↓
Datadog metrics, logs, dashboards, and alerts
```

Datadog is used as the observability layer. It tracks service health, ingestion volume, suspicious event count, API latency, pipeline failures, and processing latency. This is a normal SaaS use case because Datadog is commonly used to monitor backend services, pipelines, infrastructure, and application metrics.

## Tech Stack

- Python
- FastAPI
- Kafka compatible event streaming
- Snowflake Snowpark Python
- AWS S3 compatible object storage
- Datadog custom metrics and logs
- Docker Compose for local development
- Pytest for tests

## Repository Layout

```text
backend/                  FastAPI app and FrostSight services
backend/app/api/          API routes
backend/app/core/         Configuration and shared utilities
backend/app/models/       Pydantic schemas
backend/app/services/     Detection, storage, metrics, and ingestion logic
backend/tests/            Unit tests
infra/datadog/            Example Datadog dashboard and monitor definitions
infra/docker/             Datadog agent example config
scripts/                  Local run and smoke test scripts
sample_data/              Example audit events
```

## Local Setup

Create a virtual environment and install dependencies.

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Copy the environment file.

```bash
cp .env.example .env
```

Run the API.

```bash
uvicorn app.main:app --reload --port 8000
```

Run the worker simulation.

```bash
python -m app.worker
```

Run tests.

```bash
pytest
```

## Docker Compose

```bash
docker compose up --build
```

The compose file starts:

- FrostSight API
- FrostSight worker
- Redpanda as a local Kafka compatible broker
- Datadog agent container placeholder

Datadog requires a real API key in `.env`.

## Environment Variables

```bash
APP_NAME=FrostSight
ENVIRONMENT=development
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
KAFKA_TOPIC=frostsight.audit.events
DATADOG_ENABLED=false
DATADOG_API_KEY=
DATADOG_HOST=localhost
DATADOG_PORT=8125
SNOWFLAKE_ENABLED=false
S3_ENABLED=false
AWS_REGION=us-east-1
S3_BUCKET=frostsight-audit-archive
```

## Datadog Metrics

FrostSight emits custom metrics such as:

```text
frostsight.audit.events_processed
frostsight.audit.suspicious_events
frostsight.pipeline.processing_latency_ms
frostsight.pipeline.storage_failures
frostsight.api.requests
frostsight.api.errors
```

These metrics can be placed on Datadog dashboards to monitor the SaaS backend and cloud security pipeline.

## Example API Routes

```text
GET  /health
GET  /metrics/summary
POST /events/analyze
GET  /events/recent
```

## GitHub Push

```bash
git init
git add .
git commit -m "Initial FrostSight scaffold"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
