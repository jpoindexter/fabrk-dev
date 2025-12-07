"use client";

import * as React from "react";
import { Search, X, Calendar, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

/* ----- Types ----- */

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterConfig {
  /** Unique filter ID */
  id: string;
  /** Display label */
  label: string;
  /** Filter type */
  type: "select" | "multi-select" | "date" | "date-range";
  /** Available options (for select types) */
  options?: FilterOption[];
  /** Placeholder text */
  placeholder?: string;
}

export interface ActiveFilter {
  filterId: string;
  value: string | string[] | Date | { from: Date; to: Date };
  label: string;
}

export interface FiltersBarProps {
  /** Filter configurations */
  filters?: FilterConfig[];
  /** Currently active filters */
  activeFilters?: ActiveFilter[];
  /** Search value */
  searchValue?: string;
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Show search input */
  showSearch?: boolean;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Filter change handler */
  onFilterChange?: (filterId: string, value: ActiveFilter["value"] | null) => void;
  /** Clear all filters handler */
  onClearAll?: () => void;
  /** Remove single filter handler */
  onRemoveFilter?: (filterId: string) => void;
  /** Additional actions on the right */
  actions?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function FiltersBar({
  filters = [],
  activeFilters = [],
  searchValue = "",
  searchPlaceholder = "Search...",
  showSearch = true,
  onSearchChange,
  onFilterChange,
  onClearAll,
  onRemoveFilter,
  actions,
  className,
}: FiltersBarProps) {
  const hasActiveFilters = activeFilters.length > 0 || searchValue.length > 0;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search Input */}
        {showSearch && (
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className={cn("pl-9", mode.radius, mode.font, "text-xs")}
            />
          </div>
        )}

        {/* Filter Dropdowns */}
        {filters.map((filter) => (
          <FilterDropdown
            key={filter.id}
            filter={filter}
            activeFilter={activeFilters.find((f) => f.filterId === filter.id)}
            onChange={(value) => onFilterChange?.(filter.id, value)}
          />
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        {actions}
      </div>

      {/* Active Filters Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("text-muted-foreground text-xs", mode.font)}>[ACTIVE_FILTERS]:</span>

          {/* Search tag */}
          {searchValue && (
            <FilterTag label={`Search: "${searchValue}"`} onRemove={() => onSearchChange?.("")} />
          )}

          {/* Filter tags */}
          {activeFilters.map((filter) => (
            <FilterTag
              key={filter.filterId}
              label={filter.label}
              onRemove={() => onRemoveFilter?.(filter.filterId)}
            />
          ))}

          {/* Clear all */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className={cn("h-6 px-2 text-xs", mode.radius, mode.font)}
          >
            <X className="mr-1 h-3 w-3" />
            CLEAR_ALL
          </Button>
        </div>
      )}
    </div>
  );
}

/* ----- Filter Tag Component ----- */

interface FilterTagProps {
  label: string;
  onRemove: () => void;
}

function FilterTag({ label, onRemove }: FilterTagProps) {
  return (
    <Badge variant="secondary" className={cn("gap-1 pr-1", mode.radius, mode.font)}>
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-muted ml-1 rounded-none p-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}

/* ----- Filter Dropdown Component ----- */

interface FilterDropdownProps {
  filter: FilterConfig;
  activeFilter?: ActiveFilter;
  onChange: (value: ActiveFilter["value"] | null) => void;
}

function FilterDropdown({ filter, activeFilter, onChange }: FilterDropdownProps) {
  const [dateRange, setDateRange] = React.useState<{ from?: Date; to?: Date }>({});

  if (filter.type === "select" && filter.options) {
    return (
      <Select
        value={activeFilter?.value as string | undefined}
        onValueChange={(value) => onChange(value || null)}
      >
        <SelectTrigger className={cn("w-[160px]", mode.radius, mode.font, "text-xs")}>
          <SelectValue placeholder={filter.placeholder || filter.label} />
        </SelectTrigger>
        <SelectContent className={mode.radius}>
          {filter.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={cn(mode.font, "text-xs")}
            >
              {option.label}
              {option.count !== undefined && (
                <span className="text-muted-foreground ml-2">({option.count})</span>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (filter.type === "date") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[160px] justify-start text-left",
              mode.radius,
              mode.font,
              "text-xs",
              !activeFilter && "text-muted-foreground"
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {activeFilter?.value instanceof Date
              ? format(activeFilter.value, "MMM d, yyyy")
              : filter.placeholder || filter.label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", mode.radius)} align="start">
          <CalendarComponent
            mode="single"
            selected={activeFilter?.value as Date | undefined}
            onSelect={(date) => onChange(date || null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }

  if (filter.type === "date-range") {
    const rangeValue = activeFilter?.value as { from: Date; to: Date } | undefined;

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left",
              mode.radius,
              mode.font,
              "text-xs",
              !rangeValue && "text-muted-foreground"
            )}
          >
            <Calendar className="mr-2 h-4 w-4" />
            {rangeValue?.from ? (
              rangeValue.to ? (
                <>
                  {format(rangeValue.from, "MMM d")} - {format(rangeValue.to, "MMM d, yyyy")}
                </>
              ) : (
                format(rangeValue.from, "MMM d, yyyy")
              )
            ) : (
              filter.placeholder || filter.label
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", mode.radius)} align="start">
          <CalendarComponent
            mode="range"
            selected={{ from: dateRange.from, to: dateRange.to }}
            onSelect={(range) => {
              setDateRange({ from: range?.from, to: range?.to });
              if (range?.from && range?.to) {
                onChange({ from: range.from, to: range.to });
              }
            }}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }

  // Multi-select (simplified as dropdown with checkboxes placeholder)
  if (filter.type === "multi-select" && filter.options) {
    const selectedValues = (activeFilter?.value as string[]) || [];

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[160px] justify-between", mode.radius, mode.font, "text-xs")}
          >
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              {selectedValues.length > 0
                ? `${filter.label} (${selectedValues.length})`
                : filter.label}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-[200px] p-2", mode.radius)} align="start">
          <div className="space-y-1">
            {filter.options.map((option) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    const newValues = isSelected
                      ? selectedValues.filter((v) => v !== option.value)
                      : [...selectedValues, option.value];
                    onChange(newValues.length > 0 ? newValues : null);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-2 py-1.5 text-xs",
                    mode.radius,
                    mode.font,
                    isSelected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  )}
                >
                  {option.label}
                  {option.count !== undefined && (
                    <span className={isSelected ? "opacity-70" : "text-muted-foreground"}>
                      ({option.count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return null;
}

/* ----- Preset Filter Bar Configurations ----- */

export interface QuickFiltersBarProps {
  /** Search value */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Quick filter buttons */
  quickFilters?: Array<{
    id: string;
    label: string;
    isActive?: boolean;
    onClick: () => void;
  }>;
  /** Additional actions */
  actions?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function QuickFiltersBar({
  searchValue = "",
  onSearchChange,
  quickFilters = [],
  actions,
  className,
}: QuickFiltersBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Search */}
      <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className={cn("pl-9", mode.radius, mode.font, "text-xs")}
        />
      </div>

      {/* Quick Filter Buttons */}
      {quickFilters.map((filter) => (
        <Button
          key={filter.id}
          variant={filter.isActive ? "default" : "outline"}
          size="sm"
          onClick={filter.onClick}
          className={cn(mode.radius, mode.font, "text-xs")}
        >
          {filter.isActive ? `> ${filter.label.toUpperCase()}` : filter.label}
        </Button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      {actions}
    </div>
  );
}

/* ----- Filters Summary Component ----- */

export interface FiltersSummaryProps {
  /** Total count before filtering */
  totalCount: number;
  /** Filtered count */
  filteredCount: number;
  /** Entity name (e.g., "users", "orders") */
  entityName?: string;
  /** Additional className */
  className?: string;
}

export function FiltersSummary({
  totalCount,
  filteredCount,
  entityName = "items",
  className,
}: FiltersSummaryProps) {
  const isFiltered = filteredCount !== totalCount;

  return (
    <p className={cn("text-muted-foreground text-xs", mode.font, className)}>
      {isFiltered ? (
        <>
          Showing{" "}
          <span className="text-foreground font-semibold">{filteredCount.toLocaleString()}</span> of{" "}
          <span className="text-foreground font-semibold">{totalCount.toLocaleString()}</span>{" "}
          {entityName}
        </>
      ) : (
        <>
          <span className="text-foreground font-semibold">{totalCount.toLocaleString()}</span>{" "}
          {entityName}
        </>
      )}
    </p>
  );
}
