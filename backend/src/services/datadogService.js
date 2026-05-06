import StatsD from 'hot-shots';
import { env } from '../config/env.js';

const dogstatsd = new StatsD({
  host: env.datadogHost,
  port: env.datadogPort,
  prefix: 'frostsight.',
  errorHandler: () => {}
});

export function incrementMetric(name, tags = []) {
  dogstatsd.increment(name, 1, tags);
}

export function gaugeMetric(name, value, tags = []) {
  dogstatsd.gauge(name, value, tags);
}

export function timingMetric(name, value, tags = []) {
  dogstatsd.timing(name, value, tags);
}

export function recordIngestion(lineItemCount) {
  incrementMetric('billing.ingestion.count');
  gaugeMetric('billing.line_items.ingested', lineItemCount);
}

export function recordCostSpike(service, amount) {
  incrementMetric('alerts.cost_spike.count', [`service:${service}`]);
  gaugeMetric('alerts.cost_spike.amount', amount, [`service:${service}`]);
}

export function recordCacheHit(route) {
  incrementMetric('cache.hit', [`route:${route}`]);
}

export function recordCacheMiss(route) {
  incrementMetric('cache.miss', [`route:${route}`]);
}
