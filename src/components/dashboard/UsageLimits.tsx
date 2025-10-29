"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tokens } from "@/lib/design-system/tokens";
import { formatUsageDisplay, getUsagePercentage } from "@/lib/features/access-control";
import { AlertCircle, Database, FolderOpen, Globe, Users } from "lucide-react";
import Link from "next/link";

interface UsageLimitsProps {
  user: { subscriptionTier?: string; email?: string; name?: string };
}

const resourceIcons = {
  users: Users,
  projects: FolderOpen,
  apiCalls: Globe,
  storage: Database,
};

const resourceLabels = {
  users: "Users",
  projects: "Projects",
  apiCalls: "API Calls",
  storage: "Storage (MB)",
};

export function UsageLimits({ user }: UsageLimitsProps) {
  const resources = ["users", "projects", "apiCalls", "storage"] as const;

  // Create a full user object with defaults for missing fields
  const fullUser = {
    subscriptionTier: user.subscriptionTier || "trial",
    email: user.email || "",
    name: user.name || "",
    createdAt: new Date(),
    userCount: 0,
    apiCalls: 0,
    storageUsed: 0,
    projectCount: 0,
  };

  return (
    <div
      className={`rounded-lg border border-border bg-muted/30 ${tokens.components.card.content}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={`flex items-center ${tokens.spacing.gap[2]}`}>
          <AlertCircle
            className={`${tokens.sizes.icon.md} text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
          />
          <h3 className="font-medium text-muted-foreground dark:text-muted-foreground">
            Free Tier Usage Limits
          </h3>
        </div>
        <Link href="/pricing">
          <Button size="sm" variant="default">
            Upgrade for More
          </Button>
        </Link>
      </div>

      <div className={`grid grid-cols-1 ${tokens.spacing.gap[4]} md:grid-cols-2`}>
        {resources.map((resource) => {
          const Icon = resourceIcons[resource];
          const percentage = getUsagePercentage(fullUser, resource);
          const display = formatUsageDisplay(fullUser, resource);
          const isNearLimit = percentage >= 80;

          return (
            <div
              key={resource}
              className={`rounded-lg bg-background ${tokens.components.card.content} dark:bg-muted`}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className={`flex items-center ${tokens.spacing.gap[2]}`}>
                  <Icon className={`${tokens.sizes.icon.sm} text-muted-foreground`} />
                  <span
                    className={`${tokens.text.size.sm} font-medium text-muted-foreground dark:text-muted-foreground`}
                  >
                    {resourceLabels[resource]}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    isNearLimit
                      ? "text-destructive"
                      : "text-muted-foreground dark:text-muted-foreground"
                  }`}
                >
                  {display}
                </span>
              </div>
              <Progress
                value={percentage}
                className={`h-2 ${isNearLimit ? "bg-destructive" : ""}`}
              />
              {isNearLimit && (
                <p className={`mt-2 ${tokens.text.size.xs} text-destructive`}>
                  Approaching limit - upgrade recommended
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`mt-4 rounded-lg bg-primary ${tokens.components.card.content} dark:bg-primary/30`}
      >
        <p className={`${tokens.text.size.sm} text-primary dark:text-primary`}>
          💡 <strong>Tip:</strong> Upgrade to Starter to get 10x more resources and unlock premium
          features like OAuth, payments, and email integration.
        </p>
      </div>
    </div>
  );
}
