/**
 * Redis Client
 * Singleton connection for self-hosted Redis (Docker, AWS ElastiCache, etc.)
 *
 * Supports two modes:
 * - Self-hosted: ioredis with REDIS_URL (default: redis://localhost:6379)
 * - Upstash (serverless): @upstash/redis with REST API (existing rate-limit code)
 *
 * Enable with SERVICE_REDIS=true in .env.local
 */

import { logger } from '@/lib/logger';

let redisInstance: import('ioredis').default | null = null;
let connectionPromise: Promise<import('ioredis').default | null> | null = null;

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const SERVICE_REDIS = process.env.SERVICE_REDIS === 'true';

/**
 * Get or create the Redis client singleton.
 * Returns null if SERVICE_REDIS is not enabled or connection fails.
 */
export async function getRedis(): Promise<import('ioredis').default | null> {
  if (!SERVICE_REDIS) return null;
  if (redisInstance) return redisInstance;
  if (connectionPromise) return connectionPromise;

  connectionPromise = createConnection();
  return connectionPromise;
}

async function createConnection(): Promise<import('ioredis').default | null> {
  try {
    const { default: Redis } = await import('ioredis');

    const client = new Redis(REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > 5) return null; // stop retrying
        return Math.min(times * 200, 2000);
      },
      lazyConnect: true,
    });

    client.on('error', (err) => {
      logger.error('[Redis] Connection error', err);
    });

    client.on('connect', () => {
      logger.info('[Redis] Connected to', REDIS_URL.replace(/\/\/.*@/, '//<credentials>@'));
    });

    await client.connect();
    redisInstance = client;
    return client;
  } catch (error) {
    logger.error('[Redis] Failed to connect', error);
    connectionPromise = null;
    return null;
  }
}

/**
 * Check if Redis is available and healthy
 */
export async function isRedisHealthy(): Promise<boolean> {
  const redis = await getRedis();
  if (!redis) return false;

  try {
    const pong = await redis.ping();
    return pong === 'PONG';
  } catch {
    return false;
  }
}

/**
 * Graceful shutdown
 */
export async function disconnectRedis(): Promise<void> {
  if (redisInstance) {
    await redisInstance.quit();
    redisInstance = null;
    connectionPromise = null;
  }
}

// Graceful shutdown on process exit
if (typeof process !== 'undefined') {
  process.on('beforeExit', () => {
    void disconnectRedis();
  });
}
