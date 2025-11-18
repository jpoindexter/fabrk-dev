/**
 * PostHog Analytics Client
 * Server-side and client-side analytics integration
 */

import { PostHog } from 'posthog-node';
import { logger } from '@/lib/logger';

// Server-side PostHog client (singleton)
let posthogClient: PostHog | null = null;

export function getPostHogClient(): PostHog | null {
  // Only initialize if API key is configured
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    logger.warn('PostHog API key not configured. Analytics disabled.');
    return null;
  }

  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        // Flush events every 30 seconds or when 20 events are queued
        flushAt: 20,
        flushInterval: 30000,
      }
    );
  }

  return posthogClient;
}

// Graceful shutdown
export async function shutdownPostHog(): Promise<void> {
  if (posthogClient) {
    await posthogClient.shutdown();
  }
}
