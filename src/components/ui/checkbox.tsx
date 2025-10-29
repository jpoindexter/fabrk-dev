/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 *
 * @example
 * ```tsx
 * <checkbox />
 * ```
 */

"use client";

import { cn } from "@/lib/design-system/utils";
import { Check } from "lucide-react";
import * as React from "react";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
  "aria-label"?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked,
      onCheckedChange,
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    // Handle controlled vs uncontrolled mode
    const isControlled = checked !== undefined;
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked || false);

    // Use controlled value if provided, otherwise use uncontrolled state
    const isChecked = isControlled ? checked : uncontrolledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;

      // Only update internal state if uncontrolled
      if (!isControlled) {
        setUncontrolledChecked(newChecked);
      }

      onCheckedChange?.(newChecked);
      props.onChange?.(e);
    };

    // UX Heuristic #4: Consistency & Standards
    return (
      <label data-slot="checkbox" className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          {...(isControlled ? { checked } : { defaultChecked })}
          onChange={handleChange}
          disabled={disabled}
          className={cn("peer sr-only", className)}
          aria-checked={isChecked}
          aria-label={ariaLabel || "Checkbox"}
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 shrink-0 rounded border border-primary shadow transition-all",
            "hover: hover:border-primary/80",
            "peer-focus-visible:outline-none peer-focus-visible:ring-2",
            "peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:hover:border-primary peer-disabled:hover:shadow",
            isChecked
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-background hover:bg-accent dark:bg-secondary dark:hover:bg-secondary",
            "border-border dark:border-border",
            className
          )}
        >
          {isChecked && <Check className="size-3" />}
        </div>
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
