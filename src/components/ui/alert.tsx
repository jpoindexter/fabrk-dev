/**
 * ✅ FABRK COMPONENT
 * Alert component for displaying important messages.
 * Uses Visual Mode System for aesthetic switching.
 *
 * Design System Integration:
 * - Imports from @/lib/design-system for static mode
 * - Radius and font from visual mode config
 * - Spacing follows 8-point grid: px-6 (24px), py-4 (16px), gap-x-4 (16px)
 *
 * @example
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertCircle className="h-4 w-4" />
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong.</AlertDescription>
 * </Alert>
 * ```
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";

/**
 * Alert Variants using Design System Tokens
 *
 * Color tokens:
 * - bg-primary, text-primary-foreground → Default info
 * - bg-destructive, text-destructive-foreground → Error/warning
 * - bg-accent, text-accent-foreground → Success
 */
const alertVariants = cva(
  // Base styles - grid layout for icon + content, padding follows 8-point grid
  "relative w-full border px-6 py-4 text-xs grid has-[>svg]:grid-cols-[calc(1.5rem)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-4 gap-y-1 items-start [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        // Default - primary info alert
        default: "bg-primary text-primary-foreground",
        // Destructive - error/warning alert
        destructive: "bg-destructive text-destructive-foreground",
        // Success - confirmation alert
        success: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), mode.radius, mode.font, className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-xs font-normal [&_p]:leading-relaxed",
        mode.font,
        className
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
