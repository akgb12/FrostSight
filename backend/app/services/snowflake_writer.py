from typing import Any
from app.core.config import settings
from app.services.metrics import metrics_client


def write_event_to_snowflake(event: dict[str, Any]) -> None:
    if not settings.snowflake_enabled:
        return

    try:
        # Add Snowpark session creation here when real credentials are available.
        # This scaffold keeps credentials out of source control.
        pass
    except Exception:
        metrics_client.increment("frostsight.pipeline.storage_failures", tags=["target:snowflake"])
        raise
