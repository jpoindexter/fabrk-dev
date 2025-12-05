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
import { mode } from "@/design-system";
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
          // Sharp mode typography
          "text-xs font-semibold",
          mode.font,
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
          <span className="text-destructive ml-1" aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";

export { Label };
