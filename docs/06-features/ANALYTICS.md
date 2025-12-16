# Analytics & Event Tracking

Complete guide to analytics implementation, event taxonomy, and data collection strategy for Fabrk.

---

## Table of Contents

1. [Overview](#overview)
2. [Analytics Stack](#analytics-stack)
3. [Event Taxonomy](#event-taxonomy)
4. [Implementation Guide](#implementation-guide)
5. [Privacy & Compliance](#privacy--compliance)
6. [Debugging & Testing](#debugging--testing)

---

## Overview

Fabrk uses PostHog for product analytics and Google Tag Manager for marketing analytics. This document defines our event tracking strategy and naming conventions.

###Goals
- **Product Analytics:** Understand user behavior, feature usage, and conversion paths
- **Marketing Analytics:** Track acquisition, campaigns, and conversion funnels
- **Error Tracking:** Monitor application health and user experience issues
- **Performance Monitoring:** Track Core Web Vitals and user experience metrics

---

## Analytics Stack

| Tool | Purpose | Key Metrics |
|------|---------|-------------|
| **PostHog** | Product analytics, feature flags, session recordings | DAU/MAU, Feature adoption, User journeys |
| **Google Analytics 4** | Marketing analytics, acquisition | Traffic sources, Campaign ROI, Conversions |
| **Sentry** | Error tracking, performance monitoring | Error rate, Response times, Crashes |
| **Vercel Analytics** | Web vitals, performance | Core Web Vitals, Real User Monitoring |

---

## Event Taxonomy

### Naming Convention

**Format:** `category_action_target`

- **category:** Domain area (auth, payment, feature, navigation)
- **action:** User action (click, view, complete, error)
- **target:** Specific element or feature

**Examples:**
- `auth_click_signup` - User clicked sign-up button
- `payment_complete_purchase` - User completed purchase
- `feature_view_dashboard` - User viewed dashboard
- `navigation_click_pricing` - User clicked pricing link

### Core Events

#### Authentication Events

```typescript
// Sign Up Flow
'auth_view_signup_page'        // User lands on signup page
'auth_click_signup_button'     // User clicks "Sign Up"
'auth_complete_signup'         // Account created successfully
'auth_error_signup'            // Signup failed (with error_type property)

// Sign In Flow
'auth_view_signin_page'        // User lands on signin page
'auth_click_signin_button'     // User clicks "Sign In"
'auth_complete_signin'         // Login successful
'auth_error_signin'            // Login failed (with error_type property)

// OAuth Flow
'auth_click_google_oauth'      // User clicks "Sign in with Google"
'auth_complete_google_oauth'   // Google OAuth successful
'auth_error_google_oauth'      // Google OAuth failed

// Session Management
'auth_click_logout'            // User clicks logout
'auth_complete_logout'         // Logout successful
```

#### Payment Events

```typescript
// Purchase Flow
'payment_view_pricing'         // User views pricing page
'payment_click_plan'           // User clicks plan card (plan_name property)
'payment_view_checkout'        // Stripe checkout page loaded
'payment_complete_purchase'    // Payment successful (plan, amount properties)
'payment_error_purchase'       // Payment failed (error_type property)

// Subscription Management
'payment_click_upgrade'        // User clicks upgrade
'payment_click_downgrade'      // User clicks downgrade
'payment_complete_upgrade'     // Upgrade successful
'payment_cancel_subscription'  // User cancels subscription

// Webhook Events (server-side)
'payment_webhook_received'     // Webhook received from Stripe
'payment_webhook_processed'    // Webhook successfully processed
'payment_webhook_failed'       // Webhook processing failed
```

#### Feature Usage Events

```typescript
// AI Features
'feature_click_ai_generate'    // User clicks AI generate button
'feature_complete_ai_generate' // AI generation successful
'feature_error_ai_generate'    // AI generation failed
'feature_view_ai_result'       // User views AI result

// Dashboard
'feature_view_dashboard'       // User views main dashboard
'feature_click_nav_item'       // User clicks navigation item
'feature_search_docs'          // User searches documentation
'feature_view_settings'        // User views settings page

// Forms & Interactions
'feature_submit_contact'       // Contact form submitted
'feature_click_cta'            // CTA button clicked (cta_id property)
'feature_toggle_theme'         // User toggles dark/light theme
'feature_copy_code'            // User copies code snippet
```

#### Navigation Events

```typescript
'navigation_click_header_link'  // Header navigation click
'navigation_click_footer_link'  // Footer navigation click
'navigation_view_page'          // Page view (page_title property)
'navigation_search'             // Search performed (query property)
'navigation_404'                // User hits 404 page
```

#### Error Events

```typescript
'error_api_request'            // API request failed
'error_form_validation'        // Form validation error
'error_network'                // Network error
'error_timeout'                // Request timeout
'error_rate_limit'             // Rate limit exceeded
```

### Event Properties

Each event should include relevant properties:

```typescript
interface EventProperties {
  // User Context
  user_id?: string;              // Authenticated user ID
  anonymous_id?: string;         // Anonymous session ID

  // Page Context
  page_title?: string;           // Current page title
  page_url?: string;             // Current URL
  referrer?: string;             // Referrer URL

  // Action Context
  target_id?: string;            // Element ID clicked
  target_text?: string;          // Button/link text
  target_url?: string;           // Destination URL

  // Feature-Specific
  plan_name?: string;            // Pricing plan selected
  amount?: number;               // Transaction amount
  currency?: string;             // Currency code
  error_type?: string;           // Error category
  error_message?: string;        // Error details
  search_query?: string;         // Search terms
  form_id?: string;              // Form identifier

  // Technical Context
  user_agent?: string;           // Browser user agent
  screen_width?: number;         // Screen dimensions
  screen_height?: number;
  connection_type?: string;      // Network connection type
}
```

---

## Implementation Guide

### PostHog Setup

```typescript
// src/lib/analytics/posthog.ts
import posthog from 'posthog-js';

export const initPostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only', // Only create profiles for logged-in users
      capture_pageview: false, // Manual page view tracking
      capture_pageleave: true,
      autocapture: false, // Explicit tracking only
    });
  }
};

export const trackEvent = (
  event: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties);
  }
};

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, traits);
  }
};
```

### Track Events in Components

```typescript
// Example: Track button click
import { trackEvent } from '@/lib/analytics/posthog';

export function PricingCard({ plan }) {
  const handleClick = () => {
    trackEvent('payment_click_plan', {
      plan_name: plan.name,
      plan_price: plan.price,
      page_title: 'Pricing',
    });

    // Navigate to checkout
    router.push(`/checkout?plan=${plan.id}`);
  };

  return <Button onClick={handleClick}>Select {plan.name}</Button>;
}
```

### Track Page Views

```typescript
// src/app/layout.tsx or middleware
import { PostHogPageView } from '@/components/analytics/posthog-pageview';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Suspense>
          <PostHogPageView />  {/* Auto-tracks page views */}
        </Suspense>
        {children}
      </body>
    </html>
  );
}
```

### Server-Side Events

```typescript
// src/app/api/webhooks/stripe/route.ts
import { PostHog } from 'posthog-node';

const posthog = new PostHog(process.env.POSTHOG_API_KEY);

export async function POST(request: Request) {
  const event = await stripe.webhooks.constructEvent(...);

  // Track server-side event
  posthog.capture({
    distinctId: event.data.object.customer,
    event: 'payment_webhook_received',
    properties: {
      event_type: event.type,
      amount: event.data.object.amount_total / 100,
      currency: event.data.object.currency,
    },
  });

  await posthog.shutdown(); // Important: Flush events
}
```

---

## Privacy & Compliance

### GDPR Compliance

1. **Cookie Consent:**
   - Request consent before initializing PostHog
   - Store consent preference in localStorage
   - Provide opt-out mechanism

```typescript
// src/lib/analytics/consent.ts
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  const consent = localStorage.getItem('cookie-consent');
  return consent ? JSON.parse(consent).analytics === true : false;
};

export const initAnalytics = () => {
  if (hasAnalyticsConsent()) {
    initPostHog();
  }
};
```

2. **Data Retention:**
   - PostHog: 90 days default, configurable
   - GA4: 14 months default
   - Sentry: 90 days for errors

3. **PII Handling:**
   - Never track passwords, credit cards, or sensitive data
   - Hash email addresses before sending to analytics
   - Sanitize error messages to remove PII

### Privacy Policy Requirements

Must disclose in privacy policy:
- What data is collected (events, user properties)
- How data is used (product analytics, improvement)
- Third-party tools (PostHog, Google Analytics, Sentry)
- User rights (access, deletion, opt-out)
- Data retention periods

---

## Debugging & Testing

### PostHog Debug Mode

```typescript
// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
  posthog.init(key, {
    ...config,
    debug: true, // Logs all events to console
  });
}
```

### Test Events Locally

```typescript
// src/lib/analytics/__tests__/posthog.test.ts
import { trackEvent } from '../posthog';

describe('Analytics', () => {
  it('tracks events with correct properties', () => {
    const spy = jest.spyOn(posthog, 'capture');

    trackEvent('test_event', { foo: 'bar' });

    expect(spy).toHaveBeenCalledWith('test_event', { foo: 'bar' });
  });
});
```

### View Events in PostHog Dashboard

1. Go to PostHog Dashboard → Live Events
2. Filter by event name (e.g., `payment_complete_purchase`)
3. View event properties and user context
4. Create insights and dashboards from events

### Event Validation Checklist

- [ ] Event name follows `category_action_target` convention
- [ ] Required properties included (user_id, page_title, etc.)
- [ ] No PII in event properties
- [ ] Event fires only once per action (no duplicates)
- [ ] Server-side events use PostHog Node SDK
- [ ] Events appear in PostHog Live Events within 30 seconds

---

## Common Patterns

### Track Form Submissions

```typescript
const handleSubmit = async (data) => {
  trackEvent('feature_submit_contact', {
    form_id: 'contact-form',
    fields_filled: Object.keys(data).length,
  });

  try {
    await submitForm(data);
    trackEvent('feature_complete_contact', { form_id: 'contact-form' });
  } catch (error) {
    trackEvent('error_form_submission', {
      form_id: 'contact-form',
      error_type: error.name,
    });
  }
};
```

### Track Feature Usage

```typescript
// Track AI generation
const generateWithAI = async (prompt) => {
  trackEvent('feature_click_ai_generate', { prompt_length: prompt.length });

  try {
    const result = await callAI(prompt);
    trackEvent('feature_complete_ai_generate', {
      result_length: result.length,
      generation_time_ms: performance.now(),
    });
    return result;
  } catch (error) {
    trackEvent('feature_error_ai_generate', {
      error_type: error.code,
    });
    throw error;
  }
};
```

---

## Resources

- **PostHog Docs:** https://posthog.com/docs
- **GA4 Events:** https://developers.google.com/analytics/devguides/collection/ga4/events
- **Sentry:** https://docs.sentry.io/platforms/javascript/guides/nextjs/
- **Privacy Regulations:** https://gdpr.eu/, https://oag.ca.gov/privacy/ccpa

---

**Last Updated:** December 2025
**Maintainer:** Fabrk Team
