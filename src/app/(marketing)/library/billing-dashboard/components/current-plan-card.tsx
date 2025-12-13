/**
 * ✅ FABRK COMPONENT
 * Current Plan Card - Displays active subscription details
 */

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface Subscription {
  plan: string;
  status: string;
  price: number;
  billingCycle: string;
  nextBillingDate: string;
  startDate: string;
  features: string[];
}

interface CurrentPlanCardProps {
  subscription: Subscription;
  formatDate: (date: string) => string;
}

export function CurrentPlanCard({ subscription, formatDate }: CurrentPlanCardProps) {
  return (
    <Card tone="primary">
      <CardHeader code="0x00" title="SUBSCRIPTION" icon={<Star className="size-4" />} />
      <CardContent padding="md">
        <div className="text-4xl font-semibold">
          ${subscription.price}
          <span className="text-muted-foreground text-lg font-normal">/mo</span>
        </div>
        <div className={cn(mode.font, 'text-muted-foreground mb-4 text-xs')}>
          [NEXT BILLING]: {formatDate(subscription.nextBillingDate)}
        </div>

        <div className="border-border mb-4 border-t pt-4">
          <div className="grid grid-cols-2 gap-2">
            {subscription.features.map((feature, idx) => (
              <div key={idx} className={cn(mode.font, 'flex items-center gap-2 text-xs')}>
                <span className="text-success">&gt;</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border border-t pt-4">
          <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>
            &gt; UPGRADE TO ENTERPRISE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
