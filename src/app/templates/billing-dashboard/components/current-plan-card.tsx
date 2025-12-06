/**
 * ✅ FABRK COMPONENT
 * Current Plan Card - Displays active subscription details
 */

import { Button } from "@/components/ui/button";
import { StyledCard, StyledCardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

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
    <StyledCard className="border-primary">
      <StyledCardHeader code="0x00" title="SUBSCRIPTION" />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                [CURRENT_PLAN]:
              </span>
              <span
                className={cn(
                  mode.font,
                  "border-success/50 text-success border px-2 py-0.5 text-xs"
                )}
              >
                ACTIVE
              </span>
            </div>
            <div className="mb-2 flex items-center gap-4">
              <Star className="text-primary h-5 w-5" />
              <span className={cn(mode.font, "text-2xl font-bold")}>{subscription.plan}</span>
            </div>
            <div className={cn(mode.font, "text-muted-foreground text-xs")}>
              STARTED: {formatDate(subscription.startDate)}
            </div>
          </div>
          <div className="text-right">
            <div className={cn(mode.font, "text-3xl font-bold")}>
              ${subscription.price}
              <span className="text-muted-foreground text-lg font-normal">/mo</span>
            </div>
            <div className={cn(mode.font, "text-muted-foreground mt-1 text-xs")}>
              NEXT_BILLING: {formatDate(subscription.nextBillingDate)}
            </div>
          </div>
        </div>

        <div className="border-border mt-4 border-t pt-4">
          <div className={cn(mode.font, "text-muted-foreground mb-4 text-xs")}>[FEATURES]:</div>
          <div className="grid grid-cols-2 gap-2">
            {subscription.features.map((feature, idx) => (
              <div key={idx} className={cn(mode.font, "flex items-center gap-2 text-xs")}>
                <span className="text-success">&gt;</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border mt-4 flex gap-2 border-t pt-4">
          <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, "text-xs")}>
            &gt; MANAGE_SUBSCRIPTION
          </Button>
          <Button variant="outline" size="sm" className={cn(mode.radius, mode.font, "text-xs")}>
            &gt; UPGRADE_TO_ENTERPRISE
          </Button>
        </div>
      </div>
    </StyledCard>
  );
}
