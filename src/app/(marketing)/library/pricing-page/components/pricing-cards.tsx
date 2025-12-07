/**
 * FABRK COMPONENT
 * Pricing Cards Grid - Terminal-styled pricing cards
 */

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
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
      {plans.map((plan, idx) => {
        const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
        const period = isYearly ? "/year" : "/month";

        return (
          <Card key={plan.id} tone={plan.badge ? "primary" : "neutral"}>
            {/* Card Header */}
            <CardHeader code={`0x0${idx}`} title={plan.name} meta={plan.badge || undefined} />

            <CardContent padding="md">
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
            </CardContent>

            <CardFooter>
              <Button
                variant={plan.ctaVariant}
                className={cn(mode.radius, mode.font, "w-full text-xs")}
              >
                &gt; {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
