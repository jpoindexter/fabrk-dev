/**
 * Job Worker
 * Processes background jobs from the BullMQ queue.
 *
 * Start the worker alongside your app or as a separate process:
 *   npx tsx src/lib/jobs/worker.ts
 */

import { Worker, type Job } from 'bullmq';
import { logger } from '@/lib/logger';
import { JOB_NAMES } from './types';
import type {
  SendEmailPayload,
  DataCleanupPayload,
  UsageMeteringPayload,
  WebhookDeliveryPayload,
} from './types';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const QUEUE_NAME = 'fabrk-jobs';

function parseRedisUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: Number(parsed.port) || 6379,
    password: parsed.password || undefined,
    username: parsed.username || undefined,
  };
}

/** Route jobs to their handlers */
async function processJob(job: Job): Promise<void> {
  logger.info(`[Worker] Processing ${job.name}`, { jobId: job.id, attempt: job.attemptsMade + 1 });

  switch (job.name) {
    case JOB_NAMES.SEND_EMAIL:
      await handleSendEmail(job.data as SendEmailPayload);
      break;
    case JOB_NAMES.DATA_CLEANUP:
      await handleDataCleanup(job.data as DataCleanupPayload);
      break;
    case JOB_NAMES.USAGE_METERING:
      await handleUsageMetering(job.data as UsageMeteringPayload);
      break;
    case JOB_NAMES.WEBHOOK_DELIVERY:
      await handleWebhookDelivery(job.data as WebhookDeliveryPayload);
      break;
    default:
      logger.warn(`[Worker] Unknown job: ${job.name}`);
  }
}

// ---------------------------------------------------------------------------
// Job Handlers — Replace stubs with real implementations
// ---------------------------------------------------------------------------

async function handleSendEmail(data: SendEmailPayload): Promise<void> {
  logger.info(`[Worker] Sending email to ${data.to}: ${data.subject}`);
  // TODO: Import from @/lib/email and call sendEmail(data)
}

async function handleDataCleanup(data: DataCleanupPayload): Promise<void> {
  logger.info(`[Worker] Running data cleanup: ${data.target}`);
  // TODO: Delete expired sessions, old logs, etc. via Prisma
}

async function handleUsageMetering(data: UsageMeteringPayload): Promise<void> {
  logger.info(`[Worker] Recording usage: ${data.feature} for ${data.userId}`);
  // TODO: Write usage record to database
}

async function handleWebhookDelivery(data: WebhookDeliveryPayload): Promise<void> {
  logger.info(`[Worker] Delivering webhook: ${data.event} to ${data.url}`);

  const response = await fetch(data.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: data.event, data: data.payload }),
  });

  if (!response.ok) {
    throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
  }
}

// ---------------------------------------------------------------------------
// Worker Lifecycle
// ---------------------------------------------------------------------------

let worker: Worker | null = null;

export function startWorker(): Worker {
  if (worker) return worker;

  worker = new Worker(QUEUE_NAME, processJob, {
    connection: parseRedisUrl(REDIS_URL),
    concurrency: 5,
  });

  worker.on('completed', (job) => {
    logger.info(`[Worker] Completed ${job.name}`, { jobId: job.id });
  });

  worker.on('failed', (job, err) => {
    logger.error(`[Worker] Failed ${job?.name}`, { jobId: job?.id, error: err.message });
  });

  worker.on('error', (err) => {
    logger.error('[Worker] Error', err);
  });

  logger.info('[Worker] Started processing jobs');
  return worker;
}

export async function stopWorker(): Promise<void> {
  if (worker) {
    await worker.close();
    worker = null;
    logger.info('[Worker] Stopped');
  }
}

// Run directly: npx tsx src/lib/jobs/worker.ts
if (require.main === module) {
  startWorker();
  logger.info('[Worker] Running as standalone process. Press Ctrl+C to stop.');

  process.on('SIGINT', async () => {
    await stopWorker();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await stopWorker();
    process.exit(0);
  });
}
