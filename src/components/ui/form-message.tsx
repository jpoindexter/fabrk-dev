/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 *
 * @example
 * ```tsx
 * <form-message>Content</form-message>
 * ```
 */

import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: "error" | "success" | "info";
  /**
   * Accessible label for the message
   */
  "aria-label"?: string;
}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, type = "info", "aria-label": ariaLabel, ...props }, ref) => {
    // UX Heuristic #9: Error Recovery - Clear error messages
    const getColorClass = () => {
      switch (type) {
        case "error":
          return "text-destructive";
        case "success":
          return "text-primary";
        default:
          return "text-muted-foreground";
      }
    };

    if (!children) {
      return <div data-slot="form-message" ref={ref} className="hidden" />;
    }

    return (
      <p
        data-slot="form-message"
        ref={ref}
        className={cn("mt-2 flex items-center gap-2 text-sm", getColorClass(), className)}
        role={type === "error" ? "alert" : "status"}
        aria-live="polite"
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export { FormMessage };
