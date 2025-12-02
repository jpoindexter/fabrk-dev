/**
 * ✅ FABRK COMPONENT
 * Plan Cards - Displays available subscription plans
 */

import { Button } from "@/components/ui/button";

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
      <div className="border border-warning bg-warning/10 p-4 font-mono text-xs">
        <span className="font-bold text-warning-foreground">[WARNING]:</span> <span className="text-foreground">Changing your plan will take effect at the next billing cycle</span>
      </div>

      {/* Plan Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border bg-card flex flex-col ${plan.current ? "border-primary" : "border-border"}`}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-2">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">{plan.name.toLowerCase()}_plan.json</span>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs text-muted-foreground">[{plan.name}]:</div>
                {plan.current && (
                  <span className="border border-primary/50 px-2 py-0.5 font-mono text-xs text-primary">
                    CURRENT
                  </span>
                )}
              </div>

              <div className="text-3xl font-bold mb-4">
                ${plan.price}
                <span className="text-lg text-muted-foreground font-normal">/mo</span>
              </div>

              <div className="border-t border-border pt-4 mb-4 flex-1">
                <div className="font-mono text-xs text-muted-foreground mb-2">[FEATURES]:</div>
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
                className="w-full font-mono text-xs rounded-none"
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
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-2">[CUSTOM_PLAN]:</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-sm">Need a custom plan?</div>
            <div className="font-mono text-xs text-muted-foreground">
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
