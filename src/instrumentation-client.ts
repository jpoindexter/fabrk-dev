/**
 * Client-side Instrumentation
 *
 * This file runs once when the client-side JavaScript bundle loads.
 * Perfect for initializing analytics and monitoring tools.
 *
 * Next.js 15+ feature - lighter and faster than provider-based approach.
 */

import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false, // We'll capture manually for more control
    capture_pageleave: true,
  });
}

export { posthog };
