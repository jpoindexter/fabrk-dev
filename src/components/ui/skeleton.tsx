/**
 * ✅ FABRK COMPONENT
 * Skeleton loading component with shimmer animation effect.
 *
 * @example
 * ```tsx
 * <skeleton />
 * ```
 */

import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => {
  return (
    <div data-slot="skeleton"
      ref={ref}
      className={cn(
        "animate-pulse rounded-md bg-card/80",
        "relative overflow-hidden",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-background/40 before:to-transparent",
        "before:animate-shimmer",
        "dark:bg-card/80 dark:before:via-background/20",
        className,
        ""
      )}
      aria-hidden="true"
      {...props}
    />
  );
});
Skeleton.displayName = "Skeleton";

export { Skeleton };
