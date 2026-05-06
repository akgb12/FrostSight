from app.models.audit_event import AuditEvent, Finding

SENSITIVE_ACTIONS = {
    "iam:CreateAccessKey",
    "iam:AttachUserPolicy",
    "s3:PutBucketPolicy",
    "ec2:AuthorizeSecurityGroupIngress",
    "kms:DisableKey",
}


def detect_findings(event: AuditEvent) -> list[Finding]:
    findings: list[Finding] = []

    if event.action in SENSITIVE_ACTIONS:
        findings.append(
            Finding(
                rule_id="FS-001",
                title="Sensitive cloud action detected",
                risk_level="high",
                reason=f"{event.action} can materially change account security posture.",
            )
        )

    if event.metadata.get("mfa_authenticated") is False:
        findings.append(
            Finding(
                rule_id="FS-002",
                title="Privileged action without MFA",
                risk_level="medium",
                reason="The audit event was performed without MFA authentication.",
            )
        )

    if event.source_ip.startswith("185.") or event.source_ip.startswith("45."):
        findings.append(
            Finding(
                rule_id="FS-003",
                title="Unusual source IP range",
                risk_level="medium",
                reason="The source IP falls into a range marked as unusual for this demo environment.",
            )
        )

    return findings
