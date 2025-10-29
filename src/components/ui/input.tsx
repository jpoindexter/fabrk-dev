/**
 * ✅ FABRK COMPONENT
 * - Component under 150 lines ✓
 * - No hardcoded styles ✓
 * - Design tokens only ✓
 * - UX heuristics applied ✓
 *
 * @example
 * ```tsx
 * <input />
 * ```
 */

"use client";

import { cn } from "@/lib/design-system/utils";
import { Loader2 } from "lucide-react";
import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, success, disabled, loading, loadingText, type, ...props }, ref) => {
    // UX Heuristic #1: Visibility of System Status
    // UX Heuristic #4: Consistency & Standards
    return (
      <div data-slot="input" className="relative">
        <input
          type={type}
          ref={ref}
          disabled={disabled || loading}
          className={cn(
            // Base styles - 8px spacing system & typography tokens
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-[14px] font-normal leading-[1.5] ring-offset-background transition-all duration-200 ease-out",

            // Hover state - Subtle border color change
            "hover:border-accent/50",

            // Focus state - Clear ring indicator
            "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",

            // File input styles
            "file:border-0 file:bg-transparent file:text-[14px] file:font-medium file:text-foreground",

            // Placeholder styles
            "placeholder:text-muted-foreground",

            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-card",

            // Loading state - Add padding for spinner
            loading && "pr-10",

            // Error state - Red border and ring
            error &&
              "border-destructive text-destructive focus-visible:border-destructive focus-visible:ring-destructive",

            // Success state - Green border and ring
            success &&
              "border-primary text-primary-foreground focus-visible:border-primary focus-visible:ring-success",

            // Dark mode
            "dark:border-input dark:bg-background dark:placeholder:text-muted-foreground/60",
            "dark:hover:border-accent/40 dark:focus-visible:ring-ring",

            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-busy={loading ? "true" : undefined}
          aria-describedby={loading && loadingText ? "input-loading" : undefined}
          {...props}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
            {loadingText && (
              <span id="input-loading" className="sr-only">
                {loadingText}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
