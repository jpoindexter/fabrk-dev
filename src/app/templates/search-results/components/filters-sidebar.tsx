/**
 * FABRK COMPONENT
 * Filters Sidebar - Category and tag filters
 */

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StyledCard, StyledCardHeader, StyledLabel } from "@/components/ui/card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface FilterCategory {
  id: string;
  label: string;
  count: number;
}

interface FilterTag {
  id: string;
  label: string;
}

interface FiltersSidebarProps {
  categories: FilterCategory[];
  tags: FilterTag[];
  selectedCategory: string;
  selectedTags: string[];
  onCategoryChange: (categoryId: string) => void;
  onTagToggle: (tagId: string) => void;
  onClearFilters: () => void;
}

export function FiltersSidebar({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  onCategoryChange,
  onTagToggle,
  onClearFilters,
}: FiltersSidebarProps) {
  const hasActiveFilters = selectedCategory !== "all" || selectedTags.length > 0;

  return (
    <div className="w-full shrink-0 space-y-4 md:w-64">
      <StyledCard>
        <StyledCardHeader code="0x01" title="FILTERS" />
        <div className="space-y-4 p-4">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <div className={cn(mode.font, "flex items-center gap-2 text-xs")}>
              <Filter className="h-3 w-3" />
              <StyledLabel showColon={false}>ACTIVE</StyledLabel>
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className={cn(mode.font, "text-muted-foreground h-6 px-2 text-xs")}
              >
                <X className="mr-1 h-3 w-3" />
                CLEAR
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <StyledLabel>CATEGORY</StyledLabel>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    mode.font,
                    "border-border flex w-full items-center justify-between border px-2 py-2 text-xs transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <span>{category.label}</span>
                  <span className="text-xs">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2">
            <StyledLabel>TAGS</StyledLabel>
            <div className="space-y-1">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2 px-2 py-1">
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => onTagToggle(tag.id)}
                  />
                  <label htmlFor={tag.id} className={cn(mode.font, "cursor-pointer text-xs")}>
                    {tag.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </StyledCard>
    </div>
  );
}
