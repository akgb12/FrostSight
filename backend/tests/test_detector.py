from app.models.audit_event import AuditEvent
from app.services.detector import detect_findings


def test_sensitive_action_is_high_risk():
    event = AuditEvent(
        event_id="evt-test",
        timestamp="2026-05-06T14:00:00Z",
        account_id="123456789012",
        actor="test@example.com",
        source_ip="10.0.0.1",
        action="iam:CreateAccessKey",
        resource="arn:aws:iam::123456789012:user/test",
        region="us-east-1",
        metadata={"mfa_authenticated": True},
    )

    findings = detect_findings(event)

    assert findings
    assert findings[0].risk_level == "high"
