/**
 * ✅ FABRK COMPONENT
 * Usage Metrics Card - Displays usage statistics with progress bars
 */

import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Users, HardDrive, Zap } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

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
    <Card tone="neutral">
      <CardHeader code="0x00" title="USAGE_METRICS" />
      <CardContent padding="md">
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [USAGE_THIS_MONTH]:
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div
              className={cn(
                mode.font,
                'flex items-center justify-between text-xs'
              )}
            >
              <span className="flex items-center gap-2">
                <Users className="size-3" />
                [TEAM_MEMBERS]:
              </span>
              <span>
                {usage.users.current} / {usage.users.limit}
              </span>
            </div>
            <Progress value={usage.users.percentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div
              className={cn(
                mode.font,
                'flex items-center justify-between text-xs'
              )}
            >
              <span className="flex items-center gap-2">
                <HardDrive className="size-3" />
                [STORAGE]:
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
            <div
              className={cn(
                mode.font,
                'flex items-center justify-between text-xs'
              )}
            >
              <span className="flex items-center gap-2">
                <Zap className="size-3" />
                [API_CALLS]:
              </span>
              <span>
                {usage.apiCalls.current.toLocaleString()} /{' '}
                {usage.apiCalls.limit.toLocaleString()}
              </span>
            </div>
            <Progress value={usage.apiCalls.percentage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
