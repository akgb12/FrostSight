# FrostSight

## Notice

This repository is a backup reconstruction of the FrostSight project. The original commit history and version control are not included in this repository. This repo is intended to preserve the project architecture, implementation scope, and technical responsibilities from the original system.

## Overview

FrostSight is a reconstructed cloud cost intelligence platform that ingests billing exports, stores raw cloud spend data, exposes hybrid REST and GraphQL APIs, and renders an interactive cost explorer with Vue.js and Three.js.

The platform processes cloud billing line items and converts them into dashboard-ready cost intelligence, including spend summaries, service-level breakdowns, cost spike alerts, and optimization insights.

## Tech Stack

### Frontend

- Vue.js
- Vite
- Three.js
- Axios

### Backend

- Node.js
- Express.js
- GraphQL
- MongoDB
- Redis
- AWS S3 compatible storage
- Datadog APM, logs, and custom metrics

### DevOps

- Docker
- Docker Compose
- GitHub Actions CI

## What FrostSight Does

FrostSight processes cloud billing line items and converts them into operational and dashboard-ready insights.

Core features include:

- Billing export ingestion from CSV or JSON files
- Raw export archival to AWS S3 compatible storage
- Spend data persistence in MongoDB
- REST API for dashboard summaries, anomaly alerts, and ingestion
- GraphQL API for client-driven spend retrieval and query composition
- Redis caching for dashboard reads
- Datadog instrumentation for API latency, ingestion volume, and cost spike alerts
- Vue.js dashboard for spend summaries and service breakdowns
- Three.js interactive cost explorer for visualizing service-level spend intensity

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
