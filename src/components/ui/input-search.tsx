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
        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
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
          <div className="absolute top-2.5 right-2.5">
            <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
          </div>
        ) : (
          showClearButton &&
          value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={`hover:bg-background/0 absolute top-0 right-0 h-full px-4 py-1`}
              onClick={handleClear}
              disabled={disabled}
              aria-label="Clear search"
            >
              <X className="text-muted-foreground h-4 w-4" />
            </Button>
          )
        )}
      </div>
    );
  }
);
InputSearch.displayName = "InputSearch";

export { InputSearch };
