/**
 * Analytics Provider Component
 * Initializes analytics and provides tracking context
 */

"use client";

import { useEffect } from "react";
import { initAnalytics } from "./tracking";
import { usePageTracking } from "./hooks";

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Initialize analytics on mount
    initAnalytics({
      providers: getEnabledProviders(),
      debug: process.env.NODE_ENV === "development",
      enabled: process.env.NODE_ENV === "production",
      ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
      plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    });
  }, []);

  // Automatically track page views
  usePageTracking();

  return <>{children}</>;
}

function getEnabledProviders() {
  const providers: any[] = [];

  if (process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID) {
    providers.push("ga4");
  }

  if (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    providers.push("plausible");
  }

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    providers.push("posthog");
  }

  // Always enable custom analytics endpoint
  providers.push("custom");

  return providers;
}
