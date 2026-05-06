# Project Notes

This rebuilt FrostSight repository is structured to support resume and interview discussion around SaaS observability, security event processing, and cloud audit analytics.

## How to Explain Datadog

Datadog was used as the observability layer rather than the customer facing product UI. FrostSight emits custom metrics from the backend and worker pipeline so dashboards can show ingestion volume, suspicious event trends, API latency, processing latency, and storage failures.

A good interview explanation:

FrostSight used Datadog to monitor the health of the cloud audit pipeline. The backend and worker emitted custom metrics for processed audit events, suspicious activity counts, API latency, and storage failures. These metrics were visualized in Datadog dashboards and used for alerting so operators could quickly detect pipeline issues or spikes in risky cloud activity.

## Suggested Resume Bullet

Built FrostSight, a cloud security observability platform using FastAPI, Kafka, Snowflake, AWS S3, and Datadog to process audit events, surface suspicious activity, and monitor pipeline health through custom dashboards and alerts.
