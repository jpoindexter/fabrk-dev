/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - Error/loading states ✓
 *
 * @example
 * ```tsx
 * <LogoCloud />
 * ```
 */

"use client";

import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface Logo {
  name: string;
  url: string;
  href?: string;
}

export interface LogoCloudProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
  logos?: Logo[];
  title?: string;
}

export const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(
  (
    {
      className,
      loading = false,
      error = false,
      logos = [],
      title = "Trusted by leading companies",
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div data-slot="logo-cloud" ref={ref} className={cn("space-y-8", className, "")}>
          <div className="mx-auto h-6 w-48 animate-pulse rounded border border-border bg-card" />
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 w-24 animate-pulse rounded border border-border bg-card"
              />
            ))}
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={cn("text-center text-destructive", className, "")}>Error loading logos</div>
      );
    }

    return (
      <section
        ref={ref}
        className={cn("space-y-8", className, "")}
        aria-label="Partner logos"
        {...props}
      >
        {title && (
          <p className="text-center font-medium text-muted-foreground dark:text-muted-foreground">
            {title}
          </p>
        )}
        <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((logo, i) => (
            <div key={i} className="flex justify-center">
              {logo.href ? (
                <a
                  href={logo.href}
                  className="opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label={`Visit ${logo.name}`}
                >
                  <img src={logo.url} alt={logo.name} className="h-12 w-auto" />
                </a>
              ) : (
                <img src={logo.url} alt={logo.name} className="h-12 w-auto opacity-60" />
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
);
LogoCloud.displayName = "LogoCloud";
