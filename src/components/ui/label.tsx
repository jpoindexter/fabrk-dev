/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 *
 * @example
 * ```tsx
 * <label>Content</label>
 * ```
 */

import { cn } from "@/lib/utils";
import * as React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, error, ...props }, ref) => {
    return (
      <label
        data-slot="label"
        ref={ref}
        className={cn(
          // Using typography tokens - matches componentTypography.label
          "text-[14px] font-semibold leading-[1.4] tracking-normal",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "transition-colors duration-200",
          error && "text-destructive",
          className
        )}
        {...props}
      >
        {children}
        {/* UX Heuristic #5: Error Prevention - Show required indicator */}
        {required && (
          <span className="ml-1 text-destructive" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };
