/**
 * Components Grid - Column 3: Radio Groups, Switches, Mini Table, Filter Chips, Date/Time
 */
'use client';

import { useState } from 'react';
import { Clock, Calendar, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

export function GridColumnThree() {
  const [switchEnabled, setSwitchEnabled] = useState(true);

  return (
    <div className="space-y-4">
      {/* Radio Group - Border only, no card */}
      <div className="border-primary/30 bg-primary/5 border-2 p-4">
        <h3 className={cn('text-primary mb-4 text-xs font-semibold', mode.font)}>[RADIO GROUP]</h3>
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="option-1" />
            <Label htmlFor="option-1" className="text-xs">
              Option 1
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="option-2" />
            <Label htmlFor="option-2" className="text-xs">
              Option 2
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Switches - Terminal style with border */}
      <div className="border-border bg-card border p-4">
        <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[SWITCHES]</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Enable notifications</Label>
            <Switch checked={switchEnabled} onCheckedChange={setSwitchEnabled} />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-xs">Dark mode</Label>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Mini Data Table - Dense with separators */}
      <div className="divide-border border-border bg-card divide-y border">
        <div className="bg-muted/50 p-4">
          <h3 className={cn('text-xs font-semibold', mode.font)}>[DATA TABLE]</h3>
        </div>
        <div className="space-y-0">
          {[
            { metric: 'Users', value: '1,234', change: '+12%' },
            { metric: 'Revenue', value: '$45.2K', change: '+8%' },
          ].map((row, i) => (
            <div
              key={i}
              className="border-border flex items-center justify-between border-b p-4 text-xs last:border-b-0"
            >
              <span>{row.metric}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{row.value}</span>
                <span className="text-success">{row.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Chips - Terminal card style */}
      <div className="border-border bg-card border p-4">
        <h3 className={cn('mb-4 text-xs font-semibold', mode.font)}>[ACTIVE FILTERS]</h3>
        <div className="flex flex-wrap gap-2">
          {['Status: Active', 'Role: Admin'].map((filter, i) => (
            <Badge key={i} variant="secondary" className="gap-1">
              {filter}
              <X className="h-3 w-3 cursor-pointer" />
            </Badge>
          ))}
        </div>
      </div>

      {/* Date & Time - Outline style */}
      <div className="border-muted-foreground/30 border-2 border-dashed p-4">
        <h3 className={cn('text-muted-foreground mb-4 text-xs font-semibold', mode.font)}>
          [TIMESTAMPS]
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span>Last updated: 2 min ago</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span>Created: Dec 11, 2025</span>
          </div>
        </div>
      </div>

      {/* Statistics - Accent background with border */}
      <div className="border-success/50 bg-success/10 space-y-4 border-2 p-4">
        <h3 className={cn('text-success text-xs font-semibold', mode.font)}>[REVENUE UP]</h3>
        <div className="flex justify-between text-xs">
          <span>Total</span>
          <span className="text-2xl font-bold">$12,450</span>
        </div>
        <Separator />
        <div className="flex justify-between text-xs">
          <span>Change</span>
          <span className="text-success text-2xl font-bold">+15.3%</span>
        </div>
      </div>
    </div>
  );
}
