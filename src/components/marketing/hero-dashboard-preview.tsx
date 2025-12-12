/**
 * Hero Dashboard Preview
 * Simplified terminal-style proof component
 */
'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const stats = [
  { label: 'COMPONENTS', value: '60+', status: 'READY' },
  { label: 'TEMPLATES', value: '26', status: 'READY' },
  { label: 'SETUP_TIME', value: '< 5 MIN', status: 'FAST' },
];

export function HeroDashboardPreview() {
  return (
    <Card size="auto">
      <CardHeader code="0x04" title="SYSTEM STATUS.LOG" />
      <CardContent className="space-y-3 p-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-accent flex items-center border-l-2 pl-3">
            <div className="flex-1">
              <span className={cn('text-xs', mode.color.text.muted, mode.font)}>{stat.label}:</span>
              <span className={cn('ml-2 text-sm font-bold', mode.font, mode.color.text.accent)}>
                {stat.value}
              </span>
            </div>
            <span className={cn('text-xs', mode.color.text.success, mode.font)}>
              [{stat.status}]
            </span>
          </div>
        ))}

        <div className="border-accent mt-4 border-t pt-3">
          <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
            <span className={mode.color.text.accent}>▸</span> AUTH, BILLING, DASHBOARD
          </div>
          <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
            <span className={mode.color.text.accent}>▸</span> PAYMENTS, EMAIL, STORAGE
          </div>
          <div className={cn('text-xs', mode.color.text.success, mode.font)}>
            <span>▸</span> ALL SYSTEMS OPERATIONAL
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
