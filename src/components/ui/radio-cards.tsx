"use client";

/**
 * ✅ FABRK COMPONENT
 * Radio cards component for card-based selection.
 *
 * @example
 * ```tsx
 * <radio-cards />
 * ```
 */

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { Check } from "lucide-react";
import * as React from "react";

export interface RadioCardOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioCardsProps {
  options: RadioCardOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  disabled?: boolean;
  /**
   * Accessible label for the radio group
   * e.g., "Select a plan", "Choose payment method"
   */
  "aria-label"?: string;
}

const RadioCards = React.forwardRef<HTMLDivElement, RadioCardsProps>(
  (
    {
      options = [],
      value,
      defaultValue,
      onValueChange,
      orientation = "vertical",
      columns = 1,
      className,
      disabled = false,
      "aria-label": ariaLabel,
    },
    ref
  ) => {
    const gridColumns = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <RadioGroup
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        aria-label={ariaLabel}
        className={cn(
          orientation === "horizontal" ? "flex flex-row gap-6" : "grid gap-6",
          orientation === "vertical" && gridColumns[columns],
          className
        )}
      >
        {options.map((option) => (
          <div data-slot="radio-cards" key={option.value}>
            <RadioGroupItem
              value={option.value}
              id={option.value}
              disabled={option.disabled || disabled}
              className="peer sr-only"
            />
            <Label
              htmlFor={option.value}
              className={cn(
                "flex cursor-pointer flex-col rounded-lg border border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground",
                "peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary",
                "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
                option.disabled || disabled ? "cursor-not-allowed opacity-50" : ""
              )}
            >
              <div className="flex items-start justify-between">
                <div className={`flex items-start ${tokens.spacing.gap[3]}`}>
                  {option.icon && <div className="mt-0.5 text-muted-foreground" aria-hidden="true">{option.icon}</div>}
                  <div className="space-y-1">
                    <div className={`"text-sm" font-medium leading-none`}>{option.label}</div>
                    {option.description && (
                      <p className={`"text-sm" text-muted-foreground`}>{option.description}</p>
                    )}
                  </div>
                </div>
                <Check
                  className={cn(
                    "h-4 w-4 text-primary opacity-0 transition-opacity",
                    "peer-data-[state=checked]:opacity-100"
                  )}
                />
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    );
  }
);
RadioCards.displayName = "RadioCards";

export { RadioCards };
