/**
 * Tier configuration for subscription/license tiers
 */

export const TIER_NAMES = {
  free: "Free",
  trial: "Trial",
  starter: "Starter",
  professional: "Professional",
  enterprise: "Enterprise",
} as const;

export const TIER_BADGES = {
  free: {
    bgColor: "bg-gray-100 dark:bg-gray-800",
    color: "text-gray-700 dark:text-gray-300",
  },
  trial: {
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    color: "text-blue-700 dark:text-blue-300",
  },
  starter: {
    bgColor: "bg-green-100 dark:bg-green-900/30",
    color: "text-green-700 dark:text-green-300",
  },
  professional: {
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    color: "text-purple-700 dark:text-purple-300",
  },
  enterprise: {
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    color: "text-amber-700 dark:text-amber-300",
  },
} as const;

export type TierName = keyof typeof TIER_NAMES;
