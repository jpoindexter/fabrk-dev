/**
 * Tier Configuration
 * Defines tier names, badges, and styling
 */

type TierName = "free" | "trial" | "starter" | "professional" | "enterprise";

/**
 * Display names for each tier
 */
export const TIER_NAMES: Record<TierName, string> = {
  free: "Free",
  trial: "Trial",
  starter: "Starter",
  professional: "Professional",
  enterprise: "Enterprise",
};

/**
 * Badge styling for each tier
 */
export const TIER_BADGES: Record<TierName, { bgColor: string; color: string }> = {
  free: {
    bgColor: "bg-muted",
    color: "text-muted-foreground",
  },
  trial: {
    bgColor: "bg-accent/10",
    color: "text-accent-foreground",
  },
  starter: {
    bgColor: "bg-primary/10",
    color: "text-primary",
  },
  professional: {
    bgColor: "bg-primary/20",
    color: "text-primary",
  },
  enterprise: {
    bgColor: "bg-primary",
    color: "text-primary-foreground",
  },
};
