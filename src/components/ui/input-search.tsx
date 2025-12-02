"use client";

/**
 * ✅ FABRK COMPONENT
 * Search input component.
 *
 * @example
 * ```tsx
 * <input-search />
 * ```
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, Search, X } from "lucide-react";
import * as React from "react";

export interface InputSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  loading?: boolean;
  showClearButton?: boolean;
}

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      value,
      onValueChange,
      onClear,
      loading = false,
      showClearButton = true,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleClear = () => {
      onValueChange?.("");
      onClear?.();
    };

    return (
      <div data-slot="input-search" className="relative">
        <Search className={`"h-4 w-4" absolute left-2.5 top-2.5 text-muted-foreground`} />
        <Input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          className={cn("pl-8", (showClearButton || loading) && "pr-8", className)}
          disabled={disabled}
          {...props}
        />
        {loading ? (
          <div className="absolute right-2.5 top-2.5">
            <Loader2 className={`"h-4 w-4" animate-spin text-muted-foreground`} />
          </div>
        ) : (
          showClearButton &&
          value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`absolute right-0 top-0 h-full px-4 py-1 hover:bg-background/0`}
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear search"
            >
              <X className={`"h-4 w-4" text-muted-foreground`} />
            </Button>
          )
        )}
      </div>
    );
  }
);
InputSearch.displayName = "InputSearch";

export { InputSearch };
