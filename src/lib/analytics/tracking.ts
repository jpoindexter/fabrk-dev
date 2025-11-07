/**
 * Analytics Tracking System
 * Type-safe event tracking for Google Analytics 4, Plausible, and custom analytics
 *
 * Features:
 * - Type-safe event definitions
 * - Multiple provider support (GA4, Plausible, PostHog, etc.)
 * - Automatic user property tracking
 * - Conversion funnel tracking
 * - Revenue tracking
 * - Error tracking
 */

export type AnalyticsProvider = "ga4" | "plausible" | "posthog" | "mixpanel" | "custom";

// Event definitions (type-safe)
export type AnalyticsEvent =
  // Authentication events
  | { name: "sign_up"; props: { method: "email" | "google" | "github" } }
  | { name: "sign_in"; props: { method: "email" | "google" | "github" } }
  | { name: "sign_out"; props?: Record<string, never> }
  | { name: "email_verified"; props?: Record<string, never> }
  | { name: "password_reset_requested"; props?: Record<string, never> }
  | { name: "password_reset_completed"; props?: Record<string, never> }

  // Payment events
  | {
      name: "checkout_started";
      props: { plan: string; price: number; currency: string };
    }
  | {
      name: "payment_completed";
      props: { plan: string; price: number; currency: string; transaction_id: string };
    }
  | { name: "payment_failed"; props: { plan: string; error: string } }
  | { name: "subscription_cancelled"; props: { plan: string; reason?: string } }
  | { name: "subscription_upgraded"; props: { from: string; to: string } }
  | { name: "subscription_downgraded"; props: { from: string; to: string } }

  // Engagement events
  | { name: "page_view"; props: { page: string; title?: string } }
  | { name: "feature_used"; props: { feature: string; context?: string } }
  | { name: "button_clicked"; props: { button: string; location: string } }
  | { name: "form_submitted"; props: { form: string; success: boolean } }
  | { name: "search_performed"; props: { query: string; results: number } }
  | { name: "file_downloaded"; props: { file: string; type: string } }
  | { name: "video_played"; props: { video: string; duration?: number } }
  | { name: "tutorial_completed"; props: { tutorial: string; step: number } }

  // Conversion funnel events
  | { name: "funnel_step_viewed"; props: { funnel: string; step: number } }
  | { name: "funnel_step_completed"; props: { funnel: string; step: number } }
  | { name: "funnel_abandoned"; props: { funnel: string; step: number } }

  // User feedback events
  | { name: "feedback_submitted"; props: { rating: number; category: string } }
  | { name: "nps_score_submitted"; props: { score: number; comment?: string } }
  | { name: "feature_requested"; props: { feature: string; priority: string } }

  // Error events
  | { name: "error_occurred"; props: { error: string; page: string; severity: string } }
  | { name: "api_error"; props: { endpoint: string; status: number; error: string } }

  // Custom events
  | { name: string; props?: Record<string, any> };

// User properties (for segmentation)
export interface UserProperties {
  user_id?: string;
  email?: string;
  plan?: "free" | "starter" | "pro" | "enterprise";
  role?: "user" | "admin";
  signup_date?: string;
  subscription_status?: "active" | "cancelled" | "trial" | "expired";
  total_revenue?: number;
  account_age_days?: number;
}

/**
 * Analytics configuration
 */
interface AnalyticsConfig {
  providers: AnalyticsProvider[];
  debug?: boolean;
  enabled?: boolean;
  ga4MeasurementId?: string;
  plausibleDomain?: string;
}

let config: AnalyticsConfig = {
  providers: [],
  debug: false,
  enabled: true,
};

/**
 * Initialize analytics
 */
export function initAnalytics(options: AnalyticsConfig) {
  config = { ...config, ...options };

  if (config.debug) {
    console.log("[Analytics] Initialized with providers:", config.providers);
  }
}

/**
 * Track event
 * Type-safe event tracking with automatic provider routing
 */
export function trackEvent<T extends AnalyticsEvent>(
  event: T["name"],
  props?: T["props"]
) {
  if (!config.enabled) return;

  if (config.debug) {
    console.log("[Analytics] Event:", event, props);
  }

  config.providers.forEach((provider) => {
    switch (provider) {
      case "ga4":
        trackGA4Event(event, props);
        break;
      case "plausible":
        trackPlausibleEvent(event, props);
        break;
      case "posthog":
        trackPostHogEvent(event, props);
        break;
      case "custom":
        trackCustomEvent(event, props);
        break;
    }
  });
}

/**
 * Track page view
 */
export function trackPageView(page: string, title?: string) {
  trackEvent("page_view", { page, title });
}

/**
 * Identify user (set user properties)
 */
export function identifyUser(userId: string, properties?: UserProperties) {
  if (!config.enabled) return;

  if (config.debug) {
    console.log("[Analytics] Identify user:", userId, properties);
  }

  config.providers.forEach((provider) => {
    switch (provider) {
      case "ga4":
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("set", "user_properties", properties);
        }
        break;
      case "posthog":
        if (typeof window !== "undefined" && (window as any).posthog) {
          (window as any).posthog.identify(userId, properties);
        }
        break;
    }
  });
}

/**
 * Track revenue (for conversion tracking)
 */
export function trackRevenue(
  amount: number,
  currency: string = "USD",
  transactionId: string,
  metadata?: Record<string, any>
) {
  if (!config.enabled) return;

  if (config.debug) {
    console.log("[Analytics] Revenue:", amount, currency, transactionId);
  }

  // GA4 purchase event
  if (config.providers.includes("ga4") && typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: amount,
      currency,
      ...metadata,
    });
  }

  // PostHog revenue tracking
  if (
    config.providers.includes("posthog") &&
    typeof window !== "undefined" &&
    (window as any).posthog
  ) {
    (window as any).posthog.capture("purchase", {
      transaction_id: transactionId,
      value: amount,
      currency,
      ...metadata,
    });
  }
}

/**
 * Track conversion funnel step
 */
export function trackFunnelStep(
  funnel: string,
  step: number,
  status: "viewed" | "completed" | "abandoned"
) {
  const eventMap = {
    viewed: "funnel_step_viewed",
    completed: "funnel_step_completed",
    abandoned: "funnel_abandoned",
  } as const;

  trackEvent(eventMap[status] as any, { funnel, step } as any);
}

/**
 * Start conversion funnel tracking
 */
export function startFunnel(funnelName: string) {
  trackFunnelStep(funnelName, 1, "viewed");
}

/**
 * Complete funnel step
 */
export function completeFunnelStep(funnelName: string, step: number) {
  trackFunnelStep(funnelName, step, "completed");
  trackFunnelStep(funnelName, step + 1, "viewed");
}

/**
 * Abandon funnel
 */
export function abandonFunnel(funnelName: string, step: number) {
  trackFunnelStep(funnelName, step, "abandoned");
}

// Provider-specific implementations

function trackGA4Event(event: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, props);
  }
}

function trackPlausibleEvent(event: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(event, { props });
  }
}

function trackPostHogEvent(event: string, props?: Record<string, any>) {
  if (typeof window !== "undefined" && (window as any).posthog) {
    (window as any).posthog.capture(event, props);
  }
}

function trackCustomEvent(event: string, props?: Record<string, any>) {
  // Send to custom endpoint
  if (typeof window !== "undefined") {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, props, timestamp: new Date().toISOString() }),
    }).catch((error) => {
      console.error("[Analytics] Failed to send custom event:", error);
    });
  }
}

// Type declarations for global analytics objects
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (event: string, options?: any) => void;
    posthog?: any;
  }
}

/**
 * React hook for tracking page views
 */
export function usePageView() {
  if (typeof window !== "undefined") {
    const url = window.location.pathname + window.location.search;
    trackPageView(url, document.title);
  }
}

/**
 * Common conversion funnels
 */
export const Funnels = {
  SIGNUP: "signup",
  CHECKOUT: "checkout",
  ONBOARDING: "onboarding",
  UPGRADE: "upgrade",
} as const;

/**
 * Helper: Track signup funnel
 */
export const signupFunnel = {
  start: () => startFunnel(Funnels.SIGNUP),
  viewForm: () => trackFunnelStep(Funnels.SIGNUP, 1, "viewed"),
  submitForm: () => completeFunnelStep(Funnels.SIGNUP, 1),
  verifyEmail: () => completeFunnelStep(Funnels.SIGNUP, 2),
  complete: () => completeFunnelStep(Funnels.SIGNUP, 3),
  abandon: (step: number) => abandonFunnel(Funnels.SIGNUP, step),
};

/**
 * Helper: Track checkout funnel
 */
export const checkoutFunnel = {
  start: (plan: string) => {
    startFunnel(Funnels.CHECKOUT);
    trackEvent("checkout_started", { plan, price: 0, currency: "USD" });
  },
  viewPricing: () => trackFunnelStep(Funnels.CHECKOUT, 1, "viewed"),
  selectPlan: () => completeFunnelStep(Funnels.CHECKOUT, 1),
  enterPayment: () => completeFunnelStep(Funnels.CHECKOUT, 2),
  complete: (transactionId: string, amount: number) => {
    completeFunnelStep(Funnels.CHECKOUT, 3);
    trackRevenue(amount, "USD", transactionId);
  },
  abandon: (step: number) => abandonFunnel(Funnels.CHECKOUT, step),
};
