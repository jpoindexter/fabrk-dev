/**
 * Job Type Definitions
 * All background job payloads and names live here.
 */

export const JOB_NAMES = {
  SEND_EMAIL: 'send-email',
  DATA_CLEANUP: 'data-cleanup',
  USAGE_METERING: 'usage-metering',
  WEBHOOK_DELIVERY: 'webhook-delivery',
} as const;

export type JobName = (typeof JOB_NAMES)[keyof typeof JOB_NAMES];

/** send-email job payload */
export interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/** data-cleanup job payload */
export interface DataCleanupPayload {
  /** Which data to clean: expired sessions, old logs, etc. */
  target: 'sessions' | 'logs' | 'rate-limits' | 'all';
  /** Delete records older than this (ISO 8601 duration, e.g. "P30D") */
  olderThan?: string;
}

/** usage-metering job payload */
export interface UsageMeteringPayload {
  userId: string;
  feature: string;
  quantity: number;
  timestamp?: string;
}

/** webhook-delivery job payload */
export interface WebhookDeliveryPayload {
  url: string;
  event: string;
  payload: Record<string, unknown>;
  retryCount?: number;
}

/** Union of all job payloads keyed by job name */
export interface JobPayloadMap {
  [JOB_NAMES.SEND_EMAIL]: SendEmailPayload;
  [JOB_NAMES.DATA_CLEANUP]: DataCleanupPayload;
  [JOB_NAMES.USAGE_METERING]: UsageMeteringPayload;
  [JOB_NAMES.WEBHOOK_DELIVERY]: WebhookDeliveryPayload;
}
