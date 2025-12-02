/**
 * FABRK COMPONENT
 * Pricing Cards Grid - Terminal-styled pricing cards
 */

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
        const period = isYearly ? "/year" : "/month";

        return (
          <div
            key={plan.id}
            className={`border bg-card flex flex-col ${
              plan.badge ? "border-primary" : "border-border"
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-2">
                <div className="size-2 rounded-none bg-destructive/50" />
                <div className="size-2 rounded-none bg-warning/50" />
                <div className="size-2 rounded-none bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                {plan.id}_plan.json
              </span>
            </div>

            <div className="p-4 flex flex-col flex-1">
              {/* Plan Label */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs text-muted-foreground">
                  [{plan.name}]:
                </div>
                {plan.badge && (
                  <Badge className="rounded-none font-mono text-xs bg-primary text-primary-foreground">
                    {plan.badge}
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="text-3xl font-bold mb-4">
                ${price}
                <span className="text-lg text-muted-foreground font-normal">
                  {period}
                </span>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-4 mb-4 flex-1">
                <div className="font-mono text-xs text-muted-foreground mb-2">
                  [FEATURES]:
                </div>
                <div className="space-y-1">
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 font-mono text-xs"
                    >
                      <span className="text-success">&gt;</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - At bottom */}
              <Button
                variant={plan.ctaVariant}
                className="w-full rounded-none font-mono text-xs"
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
