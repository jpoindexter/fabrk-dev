/**
 * ✅ FABRK COMPONENT
 * Plan Cards - Displays available subscription plans
 */

import { Button } from "@/components/ui/button";
import { StyledCardHeader } from "@/components/ui/card";

interface Plan {
  name: string;
  price: number;
  features: string[];
  current: boolean;
}

interface PlanCardsProps {
  plans: Plan[];
}

export function PlanCards({ plans }: PlanCardsProps) {
  return (
    <>
      {/* Alert */}
      <div className="border-warning bg-warning/10 border p-4 font-mono text-xs">
        <span className="text-warning-foreground font-bold">[WARNING]:</span>{" "}
        <span className="text-foreground">
          Changing your plan will take effect at the next billing cycle
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-card flex flex-col border ${plan.current ? "border-primary" : "border-border"}`}
          >
            <StyledCardHeader code="0x00" title={`${plan.name.toUpperCase()}_PLAN`} />
            <div className="flex flex-1 flex-col p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-muted-foreground font-mono text-xs">[{plan.name}]:</div>
                {plan.current && (
                  <span className="border-primary/50 text-primary border px-2 py-0.5 font-mono text-xs">
                    CURRENT
                  </span>
                )}
              </div>

              <div className="mb-4 text-3xl font-bold">
                ${plan.price}
                <span className="text-muted-foreground text-lg font-normal">/mo</span>
              </div>

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

              <Button
                className="w-full rounded-none font-mono text-xs"
                variant={plan.current ? "outline" : "default"}
                disabled={plan.current}
              >
                {plan.current ? "CURRENT_PLAN" : `> SELECT_${plan.name}`}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Plan */}
      <div className="border-border bg-card border p-4">
        <div className="text-muted-foreground mb-2 font-mono text-xs">[CUSTOM_PLAN]:</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-sm">Need a custom plan?</div>
            <div className="text-muted-foreground font-mono text-xs">
              Contact our sales team for custom pricing and features
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
            &gt; CONTACT_SALES
          </Button>
        </div>
      </div>
    </>
  );
}
