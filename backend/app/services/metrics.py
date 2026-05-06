from datadog import initialize, statsd
from app.core.config import settings


class MetricsClient:
    def __init__(self) -> None:
        self.enabled = settings.datadog_enabled
        if self.enabled:
            initialize(
                api_key=settings.datadog_api_key,
                statsd_host=settings.datadog_host,
                statsd_port=settings.datadog_port,
            )

    def increment(self, name: str, tags: list[str] | None = None) -> None:
        if self.enabled:
            statsd.increment(name, tags=tags or [])

    def gauge(self, name: str, value: float, tags: list[str] | None = None) -> None:
        if self.enabled:
            statsd.gauge(name, value, tags=tags or [])


metrics_client = MetricsClient()
