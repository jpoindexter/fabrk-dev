/**
 * FABRK COMPONENT
 * Pricing Cards Grid - Terminal-styled pricing cards
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StyledCardHeader } from "@/components/ui/card";

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
                <div className="text-muted-foreground font-mono text-xs">[{plan.name}]:</div>
                {plan.badge && (
                  <Badge className="bg-primary text-primary-foreground rounded-none font-mono text-xs">
                    {plan.badge}
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="mb-4 text-3xl font-bold">
                ${price}
                <span className="text-muted-foreground text-lg font-normal">{period}</span>
              </div>

              {/* Features */}
              <div className="border-border mb-4 flex-1 border-t pt-4">
                <div className="text-muted-foreground mb-2 font-mono text-xs">[FEATURES]:</div>
                <div className="space-y-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-success">&gt;</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - At bottom */}
              <Button variant={plan.ctaVariant} className="w-full rounded-none font-mono text-xs">
                &gt; {plan.cta}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
