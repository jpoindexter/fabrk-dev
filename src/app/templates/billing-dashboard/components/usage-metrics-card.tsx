/**
 * ✅ FABRK COMPONENT
 * Usage Metrics Card - Displays usage statistics with progress bars
 */

import { Progress } from "@/components/ui/progress";
import { StyledCardHeader } from "@/components/ui/card";
import { Users, HardDrive, Zap } from "lucide-react";

interface UsageMetric {
  current: number;
  limit: number;
  percentage: number;
  unit?: string;
}

interface Usage {
  users: UsageMetric;
  projects: UsageMetric;
  storage: UsageMetric;
  apiCalls: UsageMetric;
}

interface UsageMetricsCardProps {
  usage: Usage;
}

export function UsageMetricsCard({ usage }: UsageMetricsCardProps) {
  return (
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="USAGE_METRICS" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[USAGE_THIS_MONTH]:</div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                TEAM_MEMBERS
              </span>
              <span>
                {usage.users.current} / {usage.users.limit}
              </span>
            </div>
            <Progress value={usage.users.percentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="flex items-center gap-2">
                <HardDrive className="h-3 w-3" />
                STORAGE
              </span>
              <span>
                {usage.storage.current}
                {usage.storage.unit} / {usage.storage.limit}
                {usage.storage.unit}
              </span>
            </div>
            <Progress value={usage.storage.percentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="flex items-center gap-2">
                <Zap className="h-3 w-3" />
                API_CALLS
              </span>
              <span>
                {usage.apiCalls.current.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
              </span>
            </div>
            <Progress value={usage.apiCalls.percentage} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
