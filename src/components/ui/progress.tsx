/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 *
 * @example
 * ```tsx
 * <progress />
 * ```
 */

"use client";

// design-system-ignore: functional requirements for dynamic values
import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const getProgressColorClass = () => {
      if (percentage >= 75) return "bg-success";
      if (percentage >= 50) return "bg-warning";
      if (percentage >= 25) return "bg-primary";
      return "bg-destructive";
    };

    // UX Heuristic #1: Visibility of system status
    return (
      <div data-slot="progress"
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={`Progress: ${percentage}%`}
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary", className)}
        {...props}
      >
        <div
          className={cn("h-full transition-all", getProgressColorClass(), indicatorClassName)}
          style={
            {
              "--progress-width": `${percentage}%`,
              width: "var(--progress-width)",
            } as React.CSSProperties
          }
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
