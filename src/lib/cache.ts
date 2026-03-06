/**
 * Cache Implementation
 * Uses Redis when SERVICE_REDIS=true, falls back to in-memory.
 *
 * API is async to support both backends transparently.
 */

import { getRedis } from '@/lib/redis';
import { logger } from '@/lib/logger';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class InMemoryStore {
  private store = new Map<string, CacheEntry<unknown>>();
  private cleanupInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window === 'undefined') {
      this.cleanupInterval = setInterval(() => this.cleanup(), 60_000);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    this.store.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) this.store.delete(key);
    }
  }

  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

const memoryStore = new InMemoryStore();

/**
 * Get a value from cache.
 * Tries Redis first, falls back to in-memory.
 */
async function get<T>(key: string): Promise<T | null> {
  const redis = await getRedis();
  if (redis) {
    try {
      const raw = await redis.get(`cache:${key}`);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (error) {
      logger.error('[Cache] Redis get failed, using memory fallback', error);
    }
  }
  return memoryStore.get<T>(key);
}

/**
 * Set a value in cache with TTL in seconds.
 * Writes to Redis and in-memory (write-through).
 */
async function set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  // Always write to memory for fast reads
  await memoryStore.set(key, value, ttlSeconds);

  const redis = await getRedis();
  if (redis) {
    try {
      await redis.setex(`cache:${key}`, ttlSeconds, JSON.stringify(value));
    } catch (error) {
      logger.error('[Cache] Redis set failed', error);
    }
  }
}

/**
 * Delete a key from cache.
 */
async function del(key: string): Promise<void> {
  await memoryStore.delete(key);
  const redis = await getRedis();
  if (redis) {
    try {
      await redis.del(`cache:${key}`);
    } catch (error) {
      logger.error('[Cache] Redis delete failed', error);
    }
  }
}

/**
 * Clear all cache entries.
 */
async function clear(): Promise<void> {
  await memoryStore.clear();
  const redis = await getRedis();
  if (redis) {
    try {
      // Only clear cache-prefixed keys
      const keys = await redis.keys('cache:*');
      if (keys.length > 0) await redis.del(...keys);
    } catch (error) {
      logger.error('[Cache] Redis clear failed', error);
    }
  }
}

export const cache = { get, set, delete: del, clear };

// Clean up on process exit
if (typeof window === 'undefined') {
  process.on('beforeExit', () => {
    memoryStore.destroy();
  });
}
