/**
 * Usage Stats Card Component
 * Displays resource consumption metrics with progress bars
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Usage } from "./types";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface UsageStatsCardProps {
  usage: Usage;
}

export function UsageStatsCard({ usage }: UsageStatsCardProps) {
  return (
    <Card className={cn("border-border border", mode.radius)}>
      <CardHeader>
        <CardTitle>Usage This Month</CardTitle>
        <CardDescription>Track your organization's resource consumption</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Team Members</span>
              <span className="text-muted-foreground text-sm">
                {usage.users.current} / {usage.users.limit}
              </span>
            </div>
            <Progress value={(usage.users.current / usage.users.limit) * 100} className="h-2" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">Storage</span>
              <span className="text-muted-foreground text-sm">
                {usage.storage.current} GB / {usage.storage.limit} GB
              </span>
            </div>
            <Progress value={(usage.storage.current / usage.storage.limit) * 100} className="h-2" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">API Calls</span>
              <span className="text-muted-foreground text-sm">
                {usage.apiCalls.current.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
              </span>
            </div>
            <Progress
              value={(usage.apiCalls.current / usage.apiCalls.limit) * 100}
              className="h-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
