/**
 * FABRK COMPONENT
 * Pricing Cards Grid - Terminal-styled pricing cards
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StyledCardHeader } from "@/components/ui/card";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge: string | null;
  features: string[];
  cta: string;
  ctaVariant: "outline" | "default";
}

interface PricingCardsProps {
  plans: Plan[];
  isYearly: boolean;
}

export function PricingCards({ plans, isYearly }: PricingCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => {
        const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
        const period = isYearly ? "/year" : "/month";

        return (
          <div
            key={plan.id}
            className={`bg-card flex flex-col border ${
              plan.badge ? "border-primary" : "border-border"
            }`}
          >
            {/* Card Header */}
            <StyledCardHeader code="0x00" title="PRICING" />

            <div className="flex flex-1 flex-col p-4">
              {/* Plan Label */}
              <div className="mb-4 flex items-center justify-between">
                <div className={cn(mode.font, "text-muted-foreground text-xs")}>[{plan.name}]:</div>
                {plan.badge && (
                  <Badge
                    className={cn(
                      mode.radius,
                      mode.font,
                      "bg-primary text-primary-foreground text-xs"
                    )}
                  >
                    {plan.badge}
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="mb-4 text-4xl font-semibold">
                ${price}
                <span className="text-muted-foreground text-lg font-normal">{period}</span>
              </div>

              {/* Features */}
              <div className="border-border mb-4 flex-1 border-t pt-4">
                <div className={cn(mode.font, "text-muted-foreground mb-2 text-xs")}>
                  [FEATURES]:
                </div>
                <div className="space-y-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className={cn(mode.font, "flex items-center gap-2 text-xs")}>
                      <span className="text-success">&gt;</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - At bottom */}
              <Button
                variant={plan.ctaVariant}
                className={cn(mode.radius, mode.font, "w-full text-xs")}
              >
                &gt; {plan.cta}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
