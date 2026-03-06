/**
 * Background Jobs
 *
 * Usage:
 *   import { addJob, JOB_NAMES } from '@/lib/jobs';
 *
 *   await addJob(JOB_NAMES.SEND_EMAIL, {
 *     to: 'user@example.com',
 *     subject: 'Welcome!',
 *     html: '<p>Hello</p>',
 *   });
 *
 * Start the worker:
 *   npx tsx src/lib/jobs/worker.ts
 */

export { JOB_NAMES } from './types';
export type {
  JobName,
  JobPayloadMap,
  SendEmailPayload,
  DataCleanupPayload,
  UsageMeteringPayload,
  WebhookDeliveryPayload,
} from './types';

export { getQueue, addJob, closeQueue } from './queue';
export { startWorker, stopWorker } from './worker';
export { registerScheduledJobs } from './scheduler';
