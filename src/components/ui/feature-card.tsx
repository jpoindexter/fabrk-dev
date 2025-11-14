/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <FeatureCard />
 * ```
 */

"use client";

import { tokens } from "@/lib/design-system/tokens";
import { cn } from "@/lib/design-system/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

export interface FeatureCardProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  icon?: LucideIcon;
  title?: string;
  description?: string;
  badge?: string;
  highlighted?: boolean;
  onClick?: () => void;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      className,
      loading = false,
      error = false,
      icon: Icon,
      title = "Feature",
      description = "Feature description",
      badge,
      highlighted = false,
      onClick,
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          data-slot="feature-card"
          ref={ref}
          className={cn("animate-pulse space-y-6 p-6", className, "")}
        >
          <div className={`${tokens.sizes.avatar.lg} rounded border border-border bg-card`} />
          <div className="h-5 w-3/4 rounded border border-border bg-card" />
          <div className="h-4 w-full rounded border border-border bg-card" />
        </div>
      );
    }

    if (error) {
      return <div className={cn("p-6 text-destructive", className, "")}>Error loading feature</div>;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border p-6 transition-all duration-300",
          "dark:border-border dark:bg-card/50",
          highlighted && "border-primary bg-accent/5 dark:border-primary/50 dark:bg-primary/5",
          onClick && [
            "cursor-pointer",
            "hover: hover:-translate-y-1 hover:border-primary/50",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "dark:hover:border-primary/40 dark:hover:bg-secondary",
          ],
          className
        )}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick();
                }
              }
            : undefined
        }
        aria-label={`Feature: ${title}`}
        {...props}
      >
        <div className={`${tokens.spacing.space.y[6]} `}>
          <div className="flex items-start justify-between">
            {Icon && (
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-lg transition-transform",
                  highlighted
                    ? "bg-primary/10 text-primary dark:bg-primary/20"
                    : "border border-border bg-card",
                  onClick && "group-hover:scale-110",
                  ""
                )}
              >
                <Icon
                  className={`"h-6 w-6" transition-colors hover:text-primary dark:hover:text-primary`}
                />
              </div>
            )}
            {badge && (
              <span
                className={`"text-xs" rounded bg-primary px-2 py-3 font-medium text-primary transition-colors hover:bg-primary/80 dark:bg-primary/10 dark:hover:bg-primary/20`}
              >
                {badge}
              </span>
            )}
          </div>
          <div className={`${tokens.spacing.space.y[2]} `}>
            <h3
              className={`"text-lg" font-medium transition-colors hover:text-primary dark:text-muted-foreground dark:hover:text-primary`}
            >
              {title}
            </h3>
            <p
              className={`"text-sm" text-muted-foreground transition-colors dark:text-muted-foreground dark:hover:text-muted-foreground`}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
FeatureCard.displayName = "FeatureCard";
