/**
 * Feature Flags React Hooks
 */

"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  isFeatureEnabled,
  getFeatureVariant,
  getFeatureValue,
  type FeatureFlagContext,
  type FeatureFlagValue,
} from "./index";

/**
 * Hook to check if a feature is enabled
 */
export function useFeatureFlag(flagKey: string): boolean {
  const { data: session } = useSession();

  const context: FeatureFlagContext = useMemo(
    () => ({
      userId: session?.user?.id,
      email: session?.user?.email || undefined,
      role: (session?.user as any)?.role,
      environment: process.env.NODE_ENV,
    }),
    [session]
  );

  return useMemo(
    () => isFeatureEnabled(flagKey, context),
    [flagKey, context]
  );
}

/**
 * Hook to get feature variant (A/B testing)
 */
export function useFeatureVariant(flagKey: string): string | null {
  const { data: session } = useSession();

  const context: FeatureFlagContext = useMemo(
    () => ({
      userId: session?.user?.id,
      email: session?.user?.email || undefined,
      role: (session?.user as any)?.role,
      environment: process.env.NODE_ENV,
    }),
    [session]
  );

  return useMemo(() => getFeatureVariant(flagKey, context), [flagKey, context]);
}

/**
 * Hook to get feature value (config flags)
 */
export function useFeatureValue<T extends FeatureFlagValue = any>(
  flagKey: string,
  defaultValue?: T
): T | null {
  const { data: session } = useSession();

  const context: FeatureFlagContext = useMemo(
    () => ({
      userId: session?.user?.id,
      email: session?.user?.email || undefined,
      role: (session?.user as any)?.role,
      environment: process.env.NODE_ENV,
    }),
    [session]
  );

  return useMemo(
    () => getFeatureValue<T>(flagKey, context, defaultValue),
    [flagKey, context, defaultValue]
  );
}

/**
 * Hook to check multiple features at once
 */
export function useFeatureFlags(
  flagKeys: string[]
): Record<string, boolean> {
  const { data: session } = useSession();

  const context: FeatureFlagContext = useMemo(
    () => ({
      userId: session?.user?.id,
      email: session?.user?.email || undefined,
      role: (session?.user as any)?.role,
      environment: process.env.NODE_ENV,
    }),
    [session]
  );

  return useMemo(() => {
    const results: Record<string, boolean> = {};
    flagKeys.forEach((key) => {
      results[key] = isFeatureEnabled(key, context);
    });
    return results;
  }, [flagKeys, context]);
}
