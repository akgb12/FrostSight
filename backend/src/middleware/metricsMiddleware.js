import { timingMetric, incrementMetric } from '../services/datadogService.js';

export function metricsMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const route = req.route?.path || req.path;
    timingMetric('api.request.duration_ms', duration, [`method:${req.method}`, `route:${route}`, `status:${res.statusCode}`]);

    if (res.statusCode >= 500) {
      incrementMetric('api.error.count', [`route:${route}`]);
    }
  });

  next();
}
