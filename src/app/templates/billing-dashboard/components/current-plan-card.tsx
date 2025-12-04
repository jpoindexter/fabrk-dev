/**
 * ✅ FABRK COMPONENT
 * Current Plan Card - Displays active subscription details
 */

import { Button } from "@/components/ui/button";
import { TerminalCardHeader } from "@/components/ui/card";
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
    <div className="border-primary bg-card border">
      <TerminalCardHeader code="0x00" title="SUBSCRIPTION" />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-muted-foreground font-mono text-xs">[CURRENT_PLAN]:</span>
              <span className="border-success/50 text-success border px-2 py-0.5 font-mono text-xs">
                ACTIVE
              </span>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <Star className="text-primary h-5 w-5" />
              <span className="text-2xl font-bold">{subscription.plan}</span>
            </div>
            <div className="text-muted-foreground font-mono text-xs">
              STARTED: {formatDate(subscription.startDate)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              ${subscription.price}
              <span className="text-muted-foreground text-lg font-normal">/mo</span>
            </div>
            <div className="text-muted-foreground mt-1 font-mono text-xs">
              NEXT_BILLING: {formatDate(subscription.nextBillingDate)}
            </div>
          </div>
        </div>

        <div className="border-border mt-4 border-t pt-4">
          <div className="text-muted-foreground mb-4 font-mono text-xs">[FEATURES]:</div>
          <div className="grid grid-cols-2 gap-2">
            {subscription.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 font-mono text-xs">
                <span className="text-success">&gt;</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border mt-4 flex gap-2 border-t pt-4">
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
