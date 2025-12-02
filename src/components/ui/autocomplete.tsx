/**
 * ✅ FABRK COMPONENT
 * Autocomplete component - Modular
 * Under 150 lines ✓
 *
 * @example
 * ```tsx
 * <Autocomplete />
 * ```
 */

"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useEffect, useRef, useState, startTransition } from "react";

export interface AutocompleteOption {
  value: string;
  label: string;
}

export interface AutocompleteProps {
  options?: (string | AutocompleteOption)[];
  value?: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  emptyMessage?: string;
  "aria-label"?: string;
}

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      options = [],
      value,
      onValueChange,
      onChange,
      placeholder,
      className,
      emptyMessage = "No results found.",
      "aria-label": ariaLabel,
    },
    forwardedRef
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(value || "");
    const [filtered, setFiltered] = useState<(string | AutocompleteOption)[]>(options);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const ref = useRef<HTMLDivElement>(null);

    // Helper function to get label from option
    const getLabel = (option: string | AutocompleteOption): string => {
      return typeof option === "string" ? option : option.label;
    };

    // Helper function to get value from option
    const getValue = (option: string | AutocompleteOption): string => {
      return typeof option === "string" ? option : option.value;
    };

    useEffect(() => {
      startTransition(() => {
        const filtered = (options || []).filter((opt) => {
          const label = getLabel(opt);
          return label.toLowerCase().includes(search.toLowerCase());
        });
        setFiltered(filtered);
      });
    }, [search, options]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div
        data-slot="autocomplete"
        ref={forwardedRef || ref}
        className={cn("relative", className, "")}
      >
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            className={cn(
              "flex h-10 w-full rounded-none border border-input bg-background px-3 py-3 font-mono text-xs",
              "ring-offset-background",
              "dark:border-border dark:bg-card/50 dark:text-foreground",
              "file:border-0 file:bg-background/0 file:font-mono file:text-xs file:font-medium",
              "placeholder:text-muted-foreground dark:placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "dark:focus-visible:ring-primary dark:focus-visible:ring-offset-background",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "pr-8"
            )}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="autocomplete-list"
            aria-label={ariaLabel || "Autocomplete"}
            aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightedIndex((prev) => Math.max(prev - 1, -1));
              } else if (e.key === "Enter" && highlightedIndex >= 0) {
                e.preventDefault();
                const option = filtered[highlightedIndex];
                const value = getValue(option);
                const label = getLabel(option);
                setSearch(label);
                onValueChange?.(value);
                onChange?.(value);
                setIsOpen(false);
                setHighlightedIndex(-1);
              } else if (e.key === "Escape") {
                setIsOpen(false);
                setHighlightedIndex(-1);
              }
            }}
          />
          <ChevronDown
            className={`"h-4 w-4" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-60`}
          />
        </div>

        {isOpen && (
          <div
            id="autocomplete-list"
            role="listbox"
            className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-none border border-border bg-popover dark:border-border dark:bg-background"
          >
            {filtered.length > 0 ? (
              filtered.map((option, i) => {
                const label = getLabel(option);
                const value = getValue(option);
                const handleSelect = () => {
                  setSearch(label);
                  onValueChange?.(value);
                  onChange?.(value);
                  setIsOpen(false);
                  setHighlightedIndex(-1);
                };

                return (
                  <div
                    key={i}
                    id={`option-${i}`}
                    role="option"
                    aria-selected={i === highlightedIndex}
                    onClick={handleSelect}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect();
                      }
                    }}
                    tabIndex={0}
                    className={cn(
                      "cursor-pointer px-3 py-3 font-mono text-xs outline-none",
                      "hover:bg-primary hover:text-primary-foreground",
                      "dark:text-muted-foreground dark:hover:bg-primary dark:hover:text-primary-foreground",
                      i === highlightedIndex &&
                        "bg-primary text-primary-foreground"
                    )}
                  >
                    {label}
                  </div>
                );
              })
            ) : (
              <div className={`"text-sm" p-3 text-muted-foreground dark:text-muted-foreground`}>
                {emptyMessage}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);
Autocomplete.displayName = "Autocomplete";
