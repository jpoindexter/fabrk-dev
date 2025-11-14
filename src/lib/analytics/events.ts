/**
 * Typed Event Tracking Functions
 * Server-side analytics event tracking with PostHog
 */

import { getPostHogClient } from './posthog';

// Event type definitions for type safety
export type AnalyticsEvent =
  | 'user_signed_up'
  | 'user_logged_in'
  | 'user_logged_out'
  | 'org_created'
  | 'org_updated'
  | 'org_deleted'
  | 'member_invited'
  | 'member_joined'
  | 'member_removed'
  | 'subscription_started'
  | 'subscription_cancelled'
  | 'subscription_renewed'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'feature_flag_viewed'
  | 'api_key_created'
  | 'api_key_revoked'
  | '2fa_enabled'
  | '2fa_disabled'
  | 'password_changed'
  | 'file_uploaded'
  | 'admin_impersonation_started'
  | 'admin_impersonation_ended';

interface BaseEventProperties {
  userId: string;
  email?: string;
  [key: string]: any;
}

/**
 * Track a custom event with PostHog
 */
export async function trackEvent(
  event: AnalyticsEvent,
  properties: BaseEventProperties
): Promise<void> {
  const client = getPostHogClient();
  if (!client) {
    return; // Analytics disabled
  }

  try {
    client.capture({
      distinctId: properties.userId,
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

/**
 * Identify a user with PostHog
 */
export async function identifyUser(
  userId: string,
  properties: {
    email?: string;
    name?: string;
    role?: string;
    tier?: string;
    createdAt?: Date;
    [key: string]: any;
  }
): Promise<void> {
  const client = getPostHogClient();
  if (!client) {
    return;
  }

  try {
    client.identify({
      distinctId: userId,
      properties,
    });
  } catch (error) {
    console.error('Failed to identify user:', error);
  }
}

/**
 * Track user signup event
 */
export async function trackUserSignup(
  userId: string,
  email: string,
  metadata?: Record<string, any>
): Promise<void> {
  await trackEvent('user_signed_up', {
    userId,
    email,
    signupMethod: metadata?.provider || 'credentials',
    ...metadata,
  });

  // Also identify the user
  await identifyUser(userId, {
    email,
    createdAt: new Date(),
    ...metadata,
  });
}

/**
 * Track organization creation
 */
export async function trackOrgCreated(
  userId: string,
  orgId: string,
  orgName: string,
  metadata?: Record<string, any>
): Promise<void> {
  await trackEvent('org_created', {
    userId,
    orgId,
    orgName,
    ...metadata,
  });
}

/**
 * Track member invitation
 */
export async function trackMemberInvited(
  userId: string,
  orgId: string,
  invitedEmail: string,
  role: string
): Promise<void> {
  await trackEvent('member_invited', {
    userId,
    orgId,
    invitedEmail,
    role,
  });
}

/**
 * Track subscription start
 */
export async function trackSubscriptionStarted(
  userId: string,
  plan: string,
  amount: number,
  interval: 'month' | 'year'
): Promise<void> {
  await trackEvent('subscription_started', {
    userId,
    plan,
    amount,
    interval,
  });
}

/**
 * Track payment success
 */
export async function trackPaymentSucceeded(
  userId: string,
  amount: number,
  productId?: string
): Promise<void> {
  await trackEvent('payment_succeeded', {
    userId,
    amount,
    productId,
  });
}

/**
 * Track payment failure
 */
export async function trackPaymentFailed(
  userId: string,
  amount: number,
  errorMessage?: string
): Promise<void> {
  await trackEvent('payment_failed', {
    userId,
    amount,
    errorMessage,
  });
}

/**
 * Track admin impersonation
 */
export async function trackAdminImpersonation(
  adminUserId: string,
  targetUserId: string,
  action: 'started' | 'ended'
): Promise<void> {
  const event = action === 'started' ? 'admin_impersonation_started' : 'admin_impersonation_ended';

  await trackEvent(event, {
    userId: adminUserId,
    targetUserId,
  });
}
