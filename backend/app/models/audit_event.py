from datetime import datetime
from typing import Any
from pydantic import BaseModel, Field


class AuditEvent(BaseModel):
    event_id: str
    timestamp: datetime
    cloud_provider: str = Field(default="aws")
    account_id: str
    actor: str
    source_ip: str
    action: str
    resource: str
    region: str
    metadata: dict[str, Any] = Field(default_factory=dict)


class Finding(BaseModel):
    rule_id: str
    title: str
    risk_level: str
    reason: str
