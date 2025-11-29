/**
 * ✅ FABRK COMPONENT
 * Interactive pricing table with feature comparison checkmarks.
 *
 * @example
 * ```tsx
 * <PricingComparison plans={plans} features={features} />
 * ```
 */

"use client";

import * as React from "react";
import { Check, X, Crown, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PricingPlan {
  id: string;
  name: string;
  price: number | "Custom";
  interval?: "month" | "year";
  description: string;
  popular?: boolean;
  cta: string;
  onSelect?: () => void;
}

export interface PricingFeature {
  name: string;
  category?: string;
  plans: {
    [planId: string]: boolean | string | number;
  };
}

interface PricingComparisonProps {
  plans: PricingPlan[];
  features: PricingFeature[];
  showCategories?: boolean;
  className?: string;
}

export function PricingComparison({
  plans,
  features,
  showCategories = true,
  className,
}: PricingComparisonProps) {
  const categories = showCategories
    ? Array.from(new Set(features.map((f) => f.category).filter(Boolean)))
    : [];

  const getFeaturesByCategory = (category?: string) => {
    return features.filter((f) => f.category === category);
  };

  const renderFeatureValue = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-primary" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground" />
      );
    }
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Plan Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              "relative overflow-hidden transition-all duration-200 hover:shadow",
              plan.popular && "ring-2 ring-primary shadow"
            )}
          >
            {plan.popular && (
              <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                Popular
              </div>
            )}

            <CardHeader className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-black text-foreground">{plan.name}</h3>
                  {plan.name === "Enterprise" && <Crown className="h-5 w-5 text-primary" />}
                  {plan.popular && <Zap className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-1">
                {plan.price === "Custom" ? (
                  <div className="text-3xl font-black text-foreground">Custom</div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-foreground">${plan.price}</span>
                      {plan.interval && (
                        <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                      )}
                    </div>
                  </>
                )}
              </div>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
                onClick={plan.onSelect}
              >
                {plan.cta}
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="p-4 text-left">
                  <span className="text-sm font-black text-foreground">Features</span>
                </th>
                {plans.map((plan) => (
                  <th key={plan.id} className="p-4 text-center min-w-[120px]">
                    <span className="text-sm font-black text-foreground">{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {showCategories ? (
                <>
                  {categories.map((category, categoryIndex) => (
                    <React.Fragment key={category || "uncategorized"}>
                      {/* Category Header */}
                      <tr className="border-t border-border">
                        <td colSpan={plans.length + 1} className="p-3">
                          <span className="text-xs font-black text-foreground uppercase tracking-wide">
                            {category || "Other Features"}
                          </span>
                        </td>
                      </tr>
                      {/* Category Features */}
                      {getFeaturesByCategory(category).map((feature, featureIndex) => (
                        <tr
                          key={`${category}-${featureIndex}`}
                          className="border-t border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-4">
                            <span className="text-sm text-foreground">{feature.name}</span>
                          </td>
                          {plans.map((plan) => (
                            <td key={plan.id} className="p-4 text-center">
                              {renderFeatureValue(feature.plans[plan.id])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>
                  {features.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-t border-border hover:bg-accent/5 transition-colors"
                    >
                      <td className="p-4">
                        <span className="text-sm text-foreground">{feature.name}</span>
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="p-4 text-center">
                          {renderFeatureValue(feature.plans[plan.id])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-md border border-border bg-card p-6 text-center">
        <h3 className="text-xl font-black text-foreground mb-2">Need help choosing?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Contact our team for personalized recommendations
        </p>
        <Button variant="outline">Contact Sales</Button>
      </div>
    </div>
  );
}
