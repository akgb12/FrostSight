import json
import time
from pathlib import Path

from app.models.audit_event import AuditEvent
from app.services.detector import detect_findings
from app.services.metrics import metrics_client
from app.services.repository import event_repository
from app.services.storage import archive_to_s3
from app.services.snowflake_writer import write_event_to_snowflake


def process_event(raw_event: dict) -> dict:
    start = time.time()
    event = AuditEvent(**raw_event)
    findings = detect_findings(event)
    enriched = event.model_dump()
    enriched["findings"] = [finding.model_dump() for finding in findings]
    enriched["risk_level"] = findings[0].risk_level if findings else "low"

    event_repository.save(enriched)
    write_event_to_snowflake(enriched)
    archive_to_s3(enriched)

    metrics_client.increment("frostsight.audit.events_processed")
    if findings:
        metrics_client.increment("frostsight.audit.suspicious_events", tags=[f"risk:{enriched['risk_level']}"])
    metrics_client.gauge("frostsight.pipeline.processing_latency_ms", (time.time() - start) * 1000)
    return enriched


def main() -> None:
    path = Path(__file__).resolve().parents[1] / "sample_data" / "audit_events.jsonl"
    for line in path.read_text().splitlines():
        enriched = process_event(json.loads(line))
        print(json.dumps(enriched, default=str))
        time.sleep(0.5)


if __name__ == "__main__":
    main()
