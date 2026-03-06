/**
 * Job Queue
 * BullMQ queue for background job processing.
 * Requires SERVICE_REDIS=true and a running Redis instance.
 */

import { Queue, type JobsOptions } from 'bullmq';
import { logger } from '@/lib/logger';
import type { JobName, JobPayloadMap } from './types';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const QUEUE_NAME = 'fabrk-jobs';

let queue: Queue | null = null;

function parseRedisUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: Number(parsed.port) || 6379,
    password: parsed.password || undefined,
    username: parsed.username || undefined,
  };
}

/**
 * Get or create the BullMQ queue singleton.
 * Returns null if SERVICE_REDIS is not enabled.
 */
export function getQueue(): Queue | null {
  if (process.env.SERVICE_REDIS !== 'true') {
    logger.warn('[Jobs] SERVICE_REDIS is not enabled. Background jobs disabled.');
    return null;
  }

  if (queue) return queue;

  queue = new Queue(QUEUE_NAME, {
    connection: parseRedisUrl(REDIS_URL),
    defaultJobOptions: {
      attempts: 3,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: { count: 1000 },
      removeOnFail: { count: 5000 },
    },
  });

  queue.on('error', (err) => {
    logger.error('[Jobs] Queue error', err);
  });

  logger.info('[Jobs] Queue initialized');
  return queue;
}

/**
 * Add a typed job to the queue.
 * Returns the job or null if the queue is unavailable.
 */
export async function addJob<N extends JobName>(
  name: N,
  data: JobPayloadMap[N],
  opts?: JobsOptions,
) {
  const q = getQueue();
  if (!q) return null;

  const job = await q.add(name, data, opts);
  logger.info(`[Jobs] Enqueued ${name}`, { jobId: job.id });
  return job;
}

/**
 * Close the queue connection gracefully.
 */
export async function closeQueue(): Promise<void> {
  if (queue) {
    await queue.close();
    queue = null;
  }
}
