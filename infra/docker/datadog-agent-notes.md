# Datadog Agent Notes

The Docker Compose file includes a Datadog Agent container configured for DogStatsD traffic on UDP port 8125.

To enable metrics:

1. Add a real Datadog API key to `.env`
2. Set `DATADOG_ENABLED=true`
3. Start the stack with Docker Compose
4. Import the sample dashboard JSON in `infra/datadog/frostsight_dashboard.json`

In production, the Datadog Agent would usually run as a sidecar, DaemonSet, host agent, or managed integration depending on deployment target.
