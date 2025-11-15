/**
 * Webhook Event Types
 * Defines all available webhook events that organizations can subscribe to
 */

export const WEBHOOK_EVENTS = {
  // Organization member events
  ORG_MEMBER_INVITED: "org.member.invited",
  ORG_MEMBER_ADDED: "org.member.added",
  ORG_MEMBER_REMOVED: "org.member.removed",
  ORG_MEMBER_ROLE_CHANGED: "org.member.role_changed",

  // Organization events
  ORG_CREATED: "org.created",
  ORG_UPDATED: "org.updated",
  ORG_DELETED: "org.deleted",

  // Payment events
  PAYMENT_SUCCEEDED: "payment.succeeded",
  PAYMENT_FAILED: "payment.failed",

  // Subscription events
  SUBSCRIPTION_CREATED: "subscription.created",
  SUBSCRIPTION_UPDATED: "subscription.updated",
  SUBSCRIPTION_CANCELLED: "subscription.cancelled",
  SUBSCRIPTION_EXPIRED: "subscription.expired",

  // API Key events
  API_KEY_CREATED: "api_key.created",
  API_KEY_REVOKED: "api_key.revoked",

  // Security events
  SECURITY_2FA_ENABLED: "security.2fa_enabled",
  SECURITY_2FA_DISABLED: "security.2fa_disabled",
  SECURITY_PASSWORD_CHANGED: "security.password_changed",
} as const;

export type WebhookEvent = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS];

/**
 * Event categories for grouping in UI
 */
export const EVENT_CATEGORIES = {
  organization: [
    WEBHOOK_EVENTS.ORG_MEMBER_INVITED,
    WEBHOOK_EVENTS.ORG_MEMBER_ADDED,
    WEBHOOK_EVENTS.ORG_MEMBER_REMOVED,
    WEBHOOK_EVENTS.ORG_MEMBER_ROLE_CHANGED,
    WEBHOOK_EVENTS.ORG_CREATED,
    WEBHOOK_EVENTS.ORG_UPDATED,
    WEBHOOK_EVENTS.ORG_DELETED,
  ],
  payment: [
    WEBHOOK_EVENTS.PAYMENT_SUCCEEDED,
    WEBHOOK_EVENTS.PAYMENT_FAILED,
  ],
  subscription: [
    WEBHOOK_EVENTS.SUBSCRIPTION_CREATED,
    WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED,
    WEBHOOK_EVENTS.SUBSCRIPTION_CANCELLED,
    WEBHOOK_EVENTS.SUBSCRIPTION_EXPIRED,
  ],
  apiKey: [
    WEBHOOK_EVENTS.API_KEY_CREATED,
    WEBHOOK_EVENTS.API_KEY_REVOKED,
  ],
  security: [
    WEBHOOK_EVENTS.SECURITY_2FA_ENABLED,
    WEBHOOK_EVENTS.SECURITY_2FA_DISABLED,
    WEBHOOK_EVENTS.SECURITY_PASSWORD_CHANGED,
  ],
} as const;

/**
 * Event descriptions for UI
 */
export const EVENT_DESCRIPTIONS: Record<WebhookEvent, string> = {
  [WEBHOOK_EVENTS.ORG_MEMBER_INVITED]: "Member invited to organization",
  [WEBHOOK_EVENTS.ORG_MEMBER_ADDED]: "Member added to organization",
  [WEBHOOK_EVENTS.ORG_MEMBER_REMOVED]: "Member removed from organization",
  [WEBHOOK_EVENTS.ORG_MEMBER_ROLE_CHANGED]: "Member role changed",
  [WEBHOOK_EVENTS.ORG_CREATED]: "Organization created",
  [WEBHOOK_EVENTS.ORG_UPDATED]: "Organization updated",
  [WEBHOOK_EVENTS.ORG_DELETED]: "Organization deleted",
  [WEBHOOK_EVENTS.PAYMENT_SUCCEEDED]: "Payment succeeded",
  [WEBHOOK_EVENTS.PAYMENT_FAILED]: "Payment failed",
  [WEBHOOK_EVENTS.SUBSCRIPTION_CREATED]: "Subscription created",
  [WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED]: "Subscription updated",
  [WEBHOOK_EVENTS.SUBSCRIPTION_CANCELLED]: "Subscription cancelled",
  [WEBHOOK_EVENTS.SUBSCRIPTION_EXPIRED]: "Subscription expired",
  [WEBHOOK_EVENTS.API_KEY_CREATED]: "API key created",
  [WEBHOOK_EVENTS.API_KEY_REVOKED]: "API key revoked",
  [WEBHOOK_EVENTS.SECURITY_2FA_ENABLED]: "Two-factor authentication enabled",
  [WEBHOOK_EVENTS.SECURITY_2FA_DISABLED]: "Two-factor authentication disabled",
  [WEBHOOK_EVENTS.SECURITY_PASSWORD_CHANGED]: "Password changed",
};

/**
 * Get all available events
 */
export function getAllEvents(): WebhookEvent[] {
  return Object.values(WEBHOOK_EVENTS);
}

/**
 * Check if event is valid
 */
export function isValidEvent(event: string): event is WebhookEvent {
  return Object.values(WEBHOOK_EVENTS).includes(event as WebhookEvent);
}

/**
 * Get events by category
 */
export function getEventsByCategory(category: keyof typeof EVENT_CATEGORIES): readonly WebhookEvent[] {
  return EVENT_CATEGORIES[category];
}
