from collections import deque
from typing import Any


class EventRepository:
    def __init__(self) -> None:
        self._events: deque[dict[str, Any]] = deque(maxlen=500)

    def save(self, event: dict[str, Any]) -> None:
        self._events.appendleft(event)

    def list_recent(self, limit: int = 20) -> list[dict[str, Any]]:
        return list(self._events)[:limit]


event_repository = EventRepository()
