/**
 * Database-backed Feature Flags
 * Persistent feature flags with in-memory caching
 */

import { prisma } from '@/lib/prisma';

// In-memory cache for feature flags (refreshed every 60 seconds)
let flagCache: Map<string, { enabled: boolean; rolloutPercentage: number }> | null = null;
let lastCacheRefresh = 0;
const CACHE_TTL = 60 * 1000; // 60 seconds

/**
 * Refresh the feature flag cache from database
 */
async function refreshCache(): Promise<void> {
  try {
    const flags = await prisma.featureFlag.findMany({
      select: {
        name: true,
        enabled: true,
        rolloutPercentage: true,
      },
    });

    flagCache = new Map(
      flags.map((flag) => [
        flag.name,
        {
          enabled: flag.enabled,
          rolloutPercentage: flag.rolloutPercentage,
        },
      ])
    );

    lastCacheRefresh = Date.now();
  } catch (error: unknown) {
    console.error('Failed to refresh feature flag cache:', error);
  }
}

/**
 * Get flag from cache or database
 */
async function getFlag(
  name: string
): Promise<{ enabled: boolean; rolloutPercentage: number } | null> {
  // Refresh cache if stale or empty
  if (!flagCache || Date.now() - lastCacheRefresh > CACHE_TTL) {
    await refreshCache();
  }

  return flagCache?.get(name) || null;
}

/**
 * Check if a feature flag is enabled for a user
 * Uses rollout percentage for gradual rollouts
 */
export async function isDbFeatureEnabled(
  flagName: string,
  userId?: string
): Promise<boolean> {
  const flag = await getFlag(flagName);

  if (!flag) {
    return false; // Flag doesn't exist = disabled
  }

  if (!flag.enabled) {
    return false; // Flag explicitly disabled
  }

  // If no userId or rollout is 100%, return true
  if (!userId || flag.rolloutPercentage === 100) {
    return true;
  }

  // If rollout is 0%, return false
  if (flag.rolloutPercentage === 0) {
    return false;
  }

  // Calculate hash-based rollout (deterministic)
  // User always gets same result for same flag
  const hash = hashString(`${flagName}:${userId}`);
  const userPercentile = hash % 100;

  return userPercentile < flag.rolloutPercentage;
}

/**
 * Get all feature flags from database
 */
export async function getAllDbFlags() {
  return prisma.featureFlag.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}

/**
 * Create a new feature flag
 */
export async function createDbFlag(data: {
  name: string;
  description?: string;
  enabled?: boolean;
  rolloutPercentage?: number;
}) {
  const flag = await prisma.featureFlag.create({
    data: {
      name: data.name,
      description: data.description,
      enabled: data.enabled ?? false,
      rolloutPercentage: data.rolloutPercentage ?? 0,
    },
  });

  // Invalidate cache
  flagCache = null;

  return flag;
}

/**
 * Update a feature flag
 */
export async function updateDbFlag(
  id: string,
  data: {
    description?: string;
    enabled?: boolean;
    rolloutPercentage?: number;
  }
) {
  const flag = await prisma.featureFlag.update({
    where: { id },
    data,
  });

  // Invalidate cache
  flagCache = null;

  return flag;
}

/**
 * Delete a feature flag
 */
export async function deleteDbFlag(id: string) {
  await prisma.featureFlag.delete({
    where: { id },
  });

  // Invalidate cache
  flagCache = null;
}

/**
 * Simple string hash function (for rollout percentage)
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Force cache refresh (useful after bulk updates)
 */
export async function refreshDbFlagCache(): Promise<void> {
  await refreshCache();
}
