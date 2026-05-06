from fastapi import APIRouter

from app.models.audit_event import AuditEvent
from app.services.detector import detect_findings
from app.services.repository import event_repository
from app.services.metrics import metrics_client

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok", "service": "FrostSight"}


@router.get("/metrics/summary")
def metrics_summary():
    events = event_repository.list_recent(limit=100)
    suspicious = sum(1 for event in events if event.get("risk_level") in {"medium", "high", "critical"})
    return {
        "events_seen": len(events),
        "suspicious_events": suspicious,
        "datadog_enabled": metrics_client.enabled,
    }


@router.post("/events/analyze")
def analyze_event(event: AuditEvent):
    findings = detect_findings(event)
    enriched = event.model_dump()
    enriched["findings"] = [finding.model_dump() for finding in findings]
    enriched["risk_level"] = findings[0].risk_level if findings else "low"
    event_repository.save(enriched)
    metrics_client.increment("frostsight.audit.events_processed")
    if findings:
        metrics_client.increment("frostsight.audit.suspicious_events", tags=[f"risk:{enriched['risk_level']}"])
    return enriched


@router.get("/events/recent")
def recent_events(limit: int = 20):
    return {"events": event_repository.list_recent(limit=limit)}
