/**
 * Job Scheduler
 * Registers recurring cron jobs via BullMQ repeat.
 *
 * Call registerScheduledJobs() once at app startup.
 */

import { logger } from '@/lib/logger';
import { getQueue } from './queue';
import { JOB_NAMES } from './types';
import type { DataCleanupPayload } from './types';

/**
 * Register all scheduled/recurring jobs.
 * Safe to call multiple times — BullMQ deduplicates by repeat key.
 */
export async function registerScheduledJobs(): Promise<void> {
  const queue = getQueue();
  if (!queue) return;

  // Clean expired sessions daily at 3 AM
  await queue.add(
    JOB_NAMES.DATA_CLEANUP,
    { target: 'sessions', olderThan: 'P30D' } satisfies DataCleanupPayload,
    {
      repeat: { pattern: '0 3 * * *' },
      jobId: 'scheduled-cleanup-sessions',
    },
  );

  // Clean old logs weekly on Sunday at 4 AM
  await queue.add(
    JOB_NAMES.DATA_CLEANUP,
    { target: 'logs', olderThan: 'P90D' } satisfies DataCleanupPayload,
    {
      repeat: { pattern: '0 4 * * 0' },
      jobId: 'scheduled-cleanup-logs',
    },
  );

  // Clean expired rate limit entries hourly
  await queue.add(
    JOB_NAMES.DATA_CLEANUP,
    { target: 'rate-limits' } satisfies DataCleanupPayload,
    {
      repeat: { pattern: '0 * * * *' },
      jobId: 'scheduled-cleanup-rate-limits',
    },
  );

  logger.info('[Scheduler] Registered scheduled jobs');
}
