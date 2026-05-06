import Redis from 'ioredis';
import { env } from '../config/env.js';
import { recordCacheHit, recordCacheMiss } from './datadogService.js';

const redis = new Redis(env.redisUrl, { lazyConnect: true, maxRetriesPerRequest: 1 });
let connected = false;

async function ensureRedis() {
  if (connected) return true;
  try {
    await redis.connect();
    connected = true;
    return true;
  } catch {
    return false;
  }
}

export async function getCachedJson(key, route) {
  const available = await ensureRedis();
  if (!available) return null;

  const value = await redis.get(key);
  if (value) {
    recordCacheHit(route);
    return JSON.parse(value);
  }

  recordCacheMiss(route);
  return null;
}

export async function setCachedJson(key, payload, seconds = 60) {
  const available = await ensureRedis();
  if (!available) return;
  await redis.set(key, JSON.stringify(payload), 'EX', seconds);
}
