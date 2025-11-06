/**
 * Monitoring Provider
 * Initializes error tracking and performance monitoring
 */

"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  initErrorTracking,
  setUserContext,
  clearUserContext,
  trackPageLoad,
} from "@/lib/monitoring/error-tracker";
import {
  trackWebVitals,
  trackResourceLoad,
  trackMemoryUsage,
} from "@/lib/monitoring/performance";

interface MonitoringProviderProps {
  children: React.ReactNode;
  sentryDsn?: string;
  enablePerformance?: boolean;
  enableMemoryTracking?: boolean;
}

export function MonitoringProvider({
  children,
  sentryDsn,
  enablePerformance = true,
  enableMemoryTracking = false,
}: MonitoringProviderProps) {
  const { data: session } = useSession();

  useEffect(() => {
    // Initialize error tracking
    initErrorTracking({
      sentryDsn,
      environment: process.env.NODE_ENV,
      release: process.env.NEXT_PUBLIC_APP_VERSION,
      enablePerformance,
    });

    // Track page load
    trackPageLoad();

    // Track Web Vitals
    if (enablePerformance) {
      trackWebVitals();
      trackResourceLoad("script");
      trackResourceLoad("stylesheet");
      trackResourceLoad("img");
    }

    // Track memory usage (optional, Chrome only)
    if (enableMemoryTracking) {
      trackMemoryUsage();
    }
  }, [sentryDsn, enablePerformance, enableMemoryTracking]);

  // Set user context when session changes
  useEffect(() => {
    if (session?.user) {
      setUserContext({
        id: session.user.id!,
        email: session.user.email || undefined,
        name: session.user.name || undefined,
      });
    } else {
      clearUserContext();
    }
  }, [session]);

  return <>{children}</>;
}
