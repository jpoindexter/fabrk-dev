/**
 * FABRK COMPONENT
 * Filters Sidebar - Category and tag filters
 */

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StyledCardHeader } from "@/components/ui/card";

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
      <div className="border-border bg-card border">
        <StyledCardHeader code="0x00" title="FILTERS" />

        <div className="space-y-4 p-4">
          {/* Filter Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Filter className="h-3 w-3" />
              [FILTERS]
            </div>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground h-6 px-2 font-mono text-xs"
              >
                <X className="mr-1 h-3 w-3" />
                CLEAR
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <div className="text-muted-foreground font-mono text-xs">[CATEGORY]:</div>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`border-border flex w-full items-center justify-between border px-2 py-1.5 font-mono text-xs transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>{category.label}</span>
                  <span className="text-xs">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2">
            <div className="text-muted-foreground font-mono text-xs">[TAGS]:</div>
            <div className="space-y-1">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2 px-2 py-1">
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => onTagToggle(tag.id)}
                    className="rounded-none"
                  />
                  <label htmlFor={tag.id} className="cursor-pointer font-mono text-xs">
                    {tag.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
