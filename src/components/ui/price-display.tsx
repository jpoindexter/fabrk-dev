/**
 * ✅ FABRK COMPONENT
 *
 * @example
 * ```tsx
 * <PriceDisplay />
 * ```
 */

"use client";

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import * as React from "react";






export interface PriceDisplayProps {
  amount: number;
  currency?: string;
  locale?: string;
  originalAmount?: number;
  badge?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    { amount, currency = "USD", locale = "en-US", originalAmount, badge, size = "md", className },
    ref
  ) => {
    const formatPrice = (value: number) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(value);
    };

    const sizeClasses = {
      sm: `"text-sm"`,
      md: `${tokens.text.size.base}`,
      lg: `"text-lg"`,
      xl: "text-xl",
    };

    const discount = originalAmount
      ? Math.round(((originalAmount - amount) / originalAmount) * 100)
      : 0;

    return (
      <div
      data-slot="price-display"
        ref={ref}
        className={cn("flex items-baseline gap-2", className, "")}
        aria-label={`Price: ${formatPrice(amount)}`}
      >
        <span className={cn("font-medium", sizeClasses[size], "")}>{formatPrice(amount)}</span>
        {originalAmount && originalAmount > amount && (
          <>
            <span
              className={cn(
                "text-muted-foreground line-through",
                size === "sm" ? `"text-xs"` : `"text-sm"`,
                ""
              )}
            >
              {formatPrice(originalAmount)}
            </span>
            <span className={`"text-xs" font-medium text-primary dark:text-primary`}>
              -{discount}%
            </span>
          </>
        )}
        {badge && (
          <span
            className={`"text-xs" ml-2 inline-flex items-center rounded-full bg-primary px-2 py-3 font-medium text-primary dark:bg-primary/10`}
          >
            {badge}
          </span>
        )}
      </div>
    );
  }
);
PriceDisplay.displayName = "PriceDisplay";
