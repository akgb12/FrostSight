import json
from datetime import datetime, timezone
from typing import Any

import boto3
from app.core.config import settings
from app.services.metrics import metrics_client


def archive_to_s3(event: dict[str, Any]) -> None:
    if not settings.s3_enabled:
        return

    key = f"audit-events/{datetime.now(timezone.utc).date()}/{event['event_id']}.json"
    client = boto3.client("s3", region_name=settings.aws_region)
    try:
        client.put_object(
            Bucket=settings.s3_bucket,
            Key=key,
            Body=json.dumps(event, default=str).encode("utf-8"),
            ContentType="application/json",
        )
    except Exception:
        metrics_client.increment("frostsight.pipeline.storage_failures", tags=["target:s3"])
        raise
