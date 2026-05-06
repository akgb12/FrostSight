from fastapi import FastAPI, Request
import time

from app.api.routes import router
from app.core.config import settings
from app.services.metrics import metrics_client

app = FastAPI(title=settings.app_name, version="1.0.0")


@app.middleware("http")
async def collect_request_metrics(request: Request, call_next):
    start = time.time()
    try:
        response = await call_next(request)
        metrics_client.increment("frostsight.api.requests", tags=[f"path:{request.url.path}"])
        return response
    except Exception:
        metrics_client.increment("frostsight.api.errors", tags=[f"path:{request.url.path}"])
        raise
    finally:
        latency_ms = (time.time() - start) * 1000
        metrics_client.gauge("frostsight.api.latency_ms", latency_ms, tags=[f"path:{request.url.path}"])


app.include_router(router)
