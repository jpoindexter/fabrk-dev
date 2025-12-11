/**
 * Hero Dashboard Preview
 * Mini analytics dashboard showing terminal UI in action
 */
'use client';

import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const metrics = [
  { label: 'REVENUE', value: '$12,450', change: '+12.5%', icon: DollarSign },
  { label: 'USERS', value: '2,847', change: '+8.2%', icon: Users },
];

const recentActivity = [
  { event: 'New subscription', user: 'user_4821', time: '2m ago' },
  { event: 'Payment received', user: 'user_3792', time: '5m ago' },
  { event: 'Trial started', user: 'user_5634', time: '12m ago' },
];

export function HeroDashboardPreview() {
  return (
    <div className="space-y-4">
      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <Card key={metric.label} size="auto">
            <CardContent className="p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className={cn('text-xs', mode.color.text.muted, mode.font)}>
                  {metric.label}
                </span>
                <metric.icon className={cn('h-3 w-3', mode.color.text.muted)} />
              </div>
              <div className="flex items-baseline gap-2">
                <span className={cn('text-lg font-bold', mode.font)}>{metric.value}</span>
                <span className={cn('text-xs', mode.color.text.success, mode.font)}>
                  {metric.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Feed */}
      <Card size="auto">
        <CardHeader code="0x05" title="RECENT_ACTIVITY" />
        <CardContent className="space-y-2 p-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="border-accent flex items-start gap-2 border-l-2 pl-2">
              <div className="flex-1">
                <p className={cn('text-xs', mode.font, mode.color.text.primary)}>
                  {activity.event}
                </p>
                <p className={cn('text-xs', mode.color.text.muted, mode.font)}>
                  {activity.user} · {activity.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
