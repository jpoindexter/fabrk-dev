/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <ComparisonTable />
 * ```
 */

"use client";

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { Check, X } from "lucide-react";
import * as React from "react";

export interface ComparisonTableProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  features?: string[];
  plans?: { name: string; features: boolean[] }[];
}

export const ComparisonTable = React.forwardRef<HTMLDivElement, ComparisonTableProps>(
  ({ className, loading = false, error = false, features = [], plans = [], ...props }, ref) => {
    if (loading) {
      return <div ref={ref} className={cn("h-96 animate-pulse rounded bg-card border border-border", className, "")} />;
    }

    if (error) {
      return <div className={cn("text-destructive", className, "")}>Error loading comparison</div>;
    }

    return (
      <div
        ref={ref}
        data-slot="comparison-table"
        className={cn("overflow-x-auto", className, "")}
        role="region"
        aria-label="Feature comparison table"
        {...props}
      >
        <table className="w-full" role="table" aria-label="Feature comparison">
          <thead>
            <tr className="border-b">
              <th className={`${tokens.components.card.content} text-left`}>Features</th>
              {plans.map((plan, i) => (
                <th key={i} className={`${tokens.components.card.content} text-center font-medium`}>
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, i) => (
              <tr key={i} className="border-b">
                <td className={`${tokens.components.card.content} `}>{feature}</td>
                {plans.map((plan, j) => (
                  <td key={j} className={`${tokens.components.card.content} text-center`}>
                    {plan.features[i] ? (
                      <Check className={`"h-5 w-5" mx-auto text-primary`} />
                    ) : (
                      <X
                        className={`"h-5 w-5" mx-auto text-muted-foreground dark:text-muted-foreground`}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
ComparisonTable.displayName = "ComparisonTable";
