/**
 * Access control and usage limits for subscription tiers
 */

type ResourceType = "users" | "projects" | "apiCalls" | "storage";

interface User {
  subscriptionTier?: string;
  userCount?: number;
  projectCount?: number;
  apiCalls?: number;
  storageUsed?: number;
}

const TIER_LIMITS = {
  free: {
    users: 1,
    projects: 3,
    apiCalls: 1000,
    storage: 100, // MB
  },
  trial: {
    users: 3,
    projects: 5,
    apiCalls: 5000,
    storage: 500,
  },
  starter: {
    users: 10,
    projects: 20,
    apiCalls: 50000,
    storage: 5000,
  },
  professional: {
    users: 50,
    projects: 100,
    apiCalls: 500000,
    storage: 50000,
  },
  enterprise: {
    users: -1, // unlimited
    projects: -1,
    apiCalls: -1,
    storage: -1,
  },
} as const;

export function getUsagePercentage(user: User, resource: ResourceType): number {
  const tier = (user.subscriptionTier || "trial") as keyof typeof TIER_LIMITS;
  const limit = TIER_LIMITS[tier]?.[resource] || TIER_LIMITS.trial[resource];

  // Unlimited tier
  if (limit === -1) return 0;

  const usage = getUserResourceUsage(user, resource);
  return Math.min(Math.round((usage / limit) * 100), 100);
}

export function formatUsageDisplay(user: User, resource: ResourceType): string {
  const tier = (user.subscriptionTier || "trial") as keyof typeof TIER_LIMITS;
  const limit = TIER_LIMITS[tier]?.[resource] || TIER_LIMITS.trial[resource];

  // Unlimited tier
  if (limit === -1) return "Unlimited";

  const usage = getUserResourceUsage(user, resource);

  if (resource === "storage") {
    return `${usage} / ${limit} MB`;
  }

  return `${usage} / ${limit}`;
}

function getUserResourceUsage(user: User, resource: ResourceType): number {
  switch (resource) {
    case "users":
      return user.userCount || 0;
    case "projects":
      return user.projectCount || 0;
    case "apiCalls":
      return user.apiCalls || 0;
    case "storage":
      return user.storageUsed || 0;
    default:
      return 0;
  }
}
