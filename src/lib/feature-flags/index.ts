/**
 * Feature Flags System
 * Control feature rollouts, A/B tests, and experimental features
 *
 * Features:
 * - Simple on/off toggles
 * - Percentage-based rollouts
 * - User-based targeting
 * - Environment-based flags
 * - A/B testing variants
 * - Server and client-side support
 */

export type FeatureFlagValue = boolean | string | number | object;

export interface FeatureFlag {
  key: string;
  enabled: boolean;
  description?: string;
  rolloutPercentage?: number; // 0-100
  targetUsers?: string[]; // User IDs
  targetRoles?: string[]; // User roles
  environments?: ("development" | "production" | "staging")[];
  variants?: Record<string, FeatureFlagValue>; // For A/B testing
  expiresAt?: Date;
}

export interface FeatureFlagContext {
  userId?: string;
  email?: string;
  role?: string;
  environment?: string;
  customProperties?: Record<string, any>;
}

// Default feature flags configuration
const defaultFlags: Record<string, FeatureFlag> = {
  // Example flags
  new_dashboard: {
    key: "new_dashboard",
    enabled: false,
    description: "New dashboard UI redesign",
    rolloutPercentage: 0,
    environments: ["development", "staging"],
  },
  ai_features: {
    key: "ai_features",
    enabled: false,
    description: "AI-powered features",
    targetRoles: ["admin"],
  },
  advanced_analytics: {
    key: "advanced_analytics",
    enabled: true,
    description: "Advanced analytics dashboard",
    rolloutPercentage: 50, // 50% rollout
  },
  dark_mode: {
    key: "dark_mode",
    enabled: true,
    description: "Dark mode theme",
  },
  beta_features: {
    key: "beta_features",
    enabled: false,
    description: "Beta features access",
    targetUsers: [], // Add specific user IDs
  },
};

let flags: Record<string, FeatureFlag> = { ...defaultFlags };

/**
 * Initialize feature flags
 */
export function initFeatureFlags(customFlags?: Record<string, Partial<FeatureFlag>>) {
  if (customFlags) {
    Object.entries(customFlags).forEach(([key, value]) => {
      flags[key] = { ...flags[key], key, ...value } as FeatureFlag;
    });
  }
}

/**
 * Check if feature flag is enabled
 */
export function isFeatureEnabled(
  flagKey: string,
  context?: FeatureFlagContext
): boolean {
  const flag = flags[flagKey];

  if (!flag) {
    console.warn(`[Feature Flags] Flag "${flagKey}" not found`);
    return false;
  }

  // Check if flag is globally disabled
  if (!flag.enabled) return false;

  // Check expiration
  if (flag.expiresAt && new Date() > flag.expiresAt) {
    return false;
  }

  // Check environment
  if (flag.environments && context?.environment) {
    if (!flag.environments.includes(context.environment as any)) {
      return false;
    }
  }

  // Check user targeting
  if (flag.targetUsers && flag.targetUsers.length > 0 && context?.userId) {
    if (!flag.targetUsers.includes(context.userId)) {
      return false;
    }
  }

  // Check role targeting
  if (flag.targetRoles && flag.targetRoles.length > 0 && context?.role) {
    if (!flag.targetRoles.includes(context.role)) {
      return false;
    }
  }

  // Check rollout percentage
  if (flag.rolloutPercentage !== undefined && flag.rolloutPercentage < 100) {
    if (!context?.userId) return false;

    const userHash = hashString(context.userId + flagKey);
    const userPercentile = userHash % 100;

    if (userPercentile >= flag.rolloutPercentage) {
      return false;
    }
  }

  return true;
}

/**
 * Get feature flag variant (for A/B testing)
 */
export function getFeatureVariant(
  flagKey: string,
  context?: FeatureFlagContext
): string | null {
  const flag = flags[flagKey];

  if (!flag || !flag.variants || !isFeatureEnabled(flagKey, context)) {
    return null;
  }

  if (!context?.userId) return null;

  const variantKeys = Object.keys(flag.variants);
  const userHash = hashString(context.userId + flagKey);
  const variantIndex = userHash % variantKeys.length;

  return variantKeys[variantIndex];
}

/**
 * Get feature flag value (for config flags)
 */
export function getFeatureValue<T extends FeatureFlagValue = any>(
  flagKey: string,
  context?: FeatureFlagContext,
  defaultValue?: T
): T | null {
  const flag = flags[flagKey];

  if (!flag || !isFeatureEnabled(flagKey, context)) {
    return defaultValue ?? null;
  }

  const variant = getFeatureVariant(flagKey, context);
  if (variant && flag.variants) {
    return flag.variants[variant] as T;
  }

  return defaultValue ?? null;
}

/**
 * Get all enabled flags for context
 */
export function getEnabledFlags(context?: FeatureFlagContext): string[] {
  return Object.keys(flags).filter((key) => isFeatureEnabled(key, context));
}

/**
 * Update feature flag at runtime
 */
export function updateFeatureFlag(
  flagKey: string,
  updates: Partial<FeatureFlag>
) {
  if (!flags[flagKey]) {
    console.warn(`[Feature Flags] Cannot update non-existent flag "${flagKey}"`);
    return;
  }

  flags[flagKey] = { ...flags[flagKey], ...updates };
}

/**
 * Enable feature flag
 */
export function enableFeature(flagKey: string) {
  updateFeatureFlag(flagKey, { enabled: true });
}

/**
 * Disable feature flag
 */
export function disableFeature(flagKey: string) {
  updateFeatureFlag(flagKey, { enabled: false });
}

/**
 * Set rollout percentage
 */
export function setRolloutPercentage(flagKey: string, percentage: number) {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Rollout percentage must be between 0 and 100");
  }
  updateFeatureFlag(flagKey, { rolloutPercentage: percentage });
}

/**
 * Simple hash function for consistent user bucketing
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get all flags (for admin UI)
 */
export function getAllFlags(): Record<string, FeatureFlag> {
  return { ...flags };
}

/**
 * Export flags to JSON (for debugging)
 */
export function exportFlags(): string {
  return JSON.stringify(flags, null, 2);
}

/**
 * Import flags from JSON
 */
export function importFlags(json: string) {
  try {
    const importedFlags = JSON.parse(json);
    Object.entries(importedFlags).forEach(([key, value]) => {
      flags[key] = value as FeatureFlag;
    });
  } catch (error) {
    console.error("[Feature Flags] Failed to import flags:", error);
  }
}

// Pre-defined feature flags (you can customize these)
export const FeatureFlags = {
  NEW_DASHBOARD: "new_dashboard",
  AI_FEATURES: "ai_features",
  ADVANCED_ANALYTICS: "advanced_analytics",
  DARK_MODE: "dark_mode",
  BETA_FEATURES: "beta_features",
} as const;
