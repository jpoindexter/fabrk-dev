/**
 * ✅ FABRK COMPONENT
 * Current Plan Card - Displays active subscription details
 */

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

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
    <div className="border border-primary bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">subscription.config</span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-muted-foreground">[CURRENT_PLAN]:</span>
              <span className="border border-success/50 px-2 py-0.5 font-mono text-xs text-success">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <Star className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{subscription.plan}</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              STARTED: {formatDate(subscription.startDate)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              ${subscription.price}
              <span className="text-lg text-muted-foreground font-normal">/mo</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground mt-1">
              NEXT_BILLING: {formatDate(subscription.nextBillingDate)}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="font-mono text-xs text-muted-foreground mb-4">[FEATURES]:</div>
          <div className="grid grid-cols-2 gap-2">
            {subscription.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 font-mono text-xs">
                <span className="text-success">&gt;</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex gap-2">
          <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
            &gt; MANAGE_SUBSCRIPTION
          </Button>
          <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
            &gt; UPGRADE_TO_ENTERPRISE
          </Button>
        </div>
      </div>
    </div>
  );
}
