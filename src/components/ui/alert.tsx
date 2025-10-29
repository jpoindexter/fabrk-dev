/**
 * ✅ FABRK COMPONENT
 * alert component
 * Updated: Soft blue styling for info variant
 */

/**
 * Alert component for displaying important messages to users.
 * Supports default and destructive variants with proper ARIA roles.
 *
 * @example
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Your session has expired.</AlertDescription>
 * </Alert>
 * ```
 */

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/design-system/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-6 py-4 transition-all duration-200 [&>svg+div]:-translate-y-1 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-6",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-foreground [&>svg]:text-foreground",
        destructive:
          "border-destructive/50 bg-destructive/20 text-destructive [&>svg]:text-destructive [&_[data-slot=alert-description]]:text-destructive/90 [&_[data-slot=alert-title]]:text-destructive",
        success:
          "border-primary/50 bg-success/20 text-primary [&>svg]:text-primary [&_[data-slot=alert-description]]:text-primary/90 [&_[data-slot=alert-title]]:text-primary",
        warning:
          "border-warning/50 bg-warning/20 text-accent-foreground [&>svg]:text-accent-foreground [&_[data-slot=alert-description]]:text-accent-foreground/90 [&_[data-slot=alert-title]]:text-accent-foreground",
        info: "border-info/50 bg-info/20 text-info [&>svg]:text-info [&_[data-slot=alert-description]]:text-info/90 [&_[data-slot=alert-title]]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      data-slot="alert"
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h5
      data-slot="alert-title"
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight text-inherit", className)}
      {...props}
    >
      {children}
    </h5>
  )
);
AlertTitle.displayName = "AlertTitle";

export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      data-slot="alert-description"
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
