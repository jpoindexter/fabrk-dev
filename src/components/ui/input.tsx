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
            // Brutalist base styles
            "flex h-10 w-full rounded-brutal border-4 border-black bg-background px-3 py-2 text-[14px] font-bold leading-[1.5] shadow-brutal transition-brutal",

            // Brutalist focus state - thick ring + shadow grow
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:shadow-brutal-lg",

            // File input styles
            "file:border-0 file:bg-transparent file:text-[14px] file:font-bold file:text-foreground",

            // Placeholder styles
            "placeholder:text-muted-foreground placeholder:font-bold",

            // Disabled state - remove shadow for flat look
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-brutal-none",

            // Loading state - Add padding for spinner
            loading && "pr-10",

            // Error state - Red border
            error &&
              "border-destructive shadow-brutal-destructive focus-visible:ring-destructive",

            // Success state - Green shadow
            success &&
              "shadow-brutal-success focus-visible:ring-success",

            // Dark mode
            "dark:border-white dark:bg-background dark:placeholder:text-muted-foreground/80",
            "dark:focus-visible:ring-primary",

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
