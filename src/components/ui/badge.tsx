/**
 * ✅ FABRK COMPONENT
 * badge component
 *
 * @example
 * ```tsx
 * <badge variant="default" />
 * ```
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/design-system/utils";

const badgeVariants = cva(
  "inline-flex cursor-default items-center justify-center rounded border border-border px-5 py-1 text-xs font-semibold uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:scale-105 hover:bg-primary/80 dark:hover:bg-primary/70",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:scale-105 hover:bg-secondary/80 dark:hover:bg-secondary",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:scale-105 hover:bg-destructive/80 dark:hover:bg-destructive/80",
        outline:
          "bg-background text-foreground hover:scale-105 hover:bg-accent hover:text-accent-foreground dark:hover:bg-secondary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * BadgeProps
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  "aria-label"?: string;
  /**
   * Whether this badge contains dynamic/status information
   * If true, adds role="status" for screen readers to announce changes
   */
  isStatus?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, isStatus = false, ...props }, ref) => {
    return (
      <div
        data-slot="badge"
        ref={ref}
        className={cn(badgeVariants({ variant }), className)}
        role={isStatus ? "status" : undefined}
        aria-live={isStatus ? "polite" : undefined}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
