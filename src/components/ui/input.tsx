/**
 * ✅ FABRK COMPONENT
 * Input component with validation states and loading indicator.
 * Uses Visual Mode System for aesthetic switching.
 *
 * Design System Integration:
 * - Imports from @/lib/design-system for static mode (server components)
 * - Radius and font from visual mode config
 * - Focus ring using design tokens (focus-visible:ring-primary)
 * - Height follows 8-point grid: h-8 (32px)
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter email" error={hasError} />
 * ```
 */

"use client";

import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";
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
            // Base styles - radius and font from Visual Mode System
            "bg-background flex h-8 w-full border px-4 py-2 text-xs font-normal transition-colors",
            mode.radius,
            mode.font,

            // Vercel focus state - thin ring
            "focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",

            // File input styles - font from Visual Mode System
            "file:text-foreground file:border-0 file:bg-transparent file:text-xs file:font-normal",
            mode.font.replace("font-", "file:font-"),

            // Placeholder styles
            "placeholder:text-muted-foreground placeholder:font-normal",

            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50",

            // Loading state - Add padding for spinner
            loading && "pr-10",

            // Error state - Red border
            error && "border-destructive focus-visible:ring-destructive",

            // Success state - Green ring
            success && "focus-visible:ring-success",

            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-busy={loading ? "true" : undefined}
          aria-describedby={loading && loadingText ? "input-loading" : undefined}
          {...props}
        />
        {loading && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Loader2 className="text-muted-foreground size-4 animate-spin" />
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
