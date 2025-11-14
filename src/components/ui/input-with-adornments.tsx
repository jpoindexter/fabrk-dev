"use client";

/**
 * ✅ FABRK COMPONENT
 * Input component with prefix/suffix adornments.
 *
 * @example
 * ```tsx
 * <input-with-adornments />
 * ```
 */

import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface InputWithAdornmentsProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean;
  fullWidth?: boolean;
}

const InputWithAdornments = React.forwardRef<HTMLInputElement, InputWithAdornmentsProps>(
  (
    {
      className,
      startAdornment,
      endAdornment,
      error = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div
        data-slot="input-with-adornments"
        className={cn(
          "flex items-center rounded-md border bg-background text-sm ring-offset-background",
          "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          error ? "border-destructive focus-within:ring-destructive" : "border-input",
          disabled && "cursor-not-allowed opacity-50",
          fullWidth && "w-full",
          className
        )}
      >
        {startAdornment && (
          <div className="flex items-center pl-3 text-muted-foreground" aria-hidden="true">
            {startAdornment}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full bg-background/0 px-3 py-3 file:border-0 file:bg-background file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed",
            !startAdornment && "pl-3",
            !endAdornment && "pr-3"
          )}
          disabled={disabled}
          aria-invalid={error || props["aria-invalid"]}
          {...props}
        />
        {endAdornment && (
          <div className="flex items-center pr-3 text-muted-foreground" aria-hidden="true">
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);
InputWithAdornments.displayName = "InputWithAdornments";

export { InputWithAdornments };
