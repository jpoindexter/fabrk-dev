/**
 * FABRK COMPONENT
 * Filters Sidebar - Category and tag filters
 */

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

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
    <div className="w-full md:w-64 shrink-0 space-y-4">
      <div className="border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2">
          <div className="flex gap-2">
            <div className="size-2 rounded-none bg-destructive/50" />
            <div className="size-2 rounded-none bg-warning/50" />
            <div className="size-2 rounded-none bg-success/50" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            filters.tsx
          </span>
        </div>

        <div className="p-4 space-y-4">
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
                className="h-6 px-2 font-mono text-xs text-muted-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                CLEAR
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <div className="font-mono text-xs text-muted-foreground">
              [CATEGORY]:
            </div>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 font-mono text-xs border border-border transition-colors ${
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
            <div className="font-mono text-xs text-muted-foreground">
              [TAGS]:
            </div>
            <div className="space-y-1">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2 px-2 py-1"
                >
                  <Checkbox
                    id={tag.id}
                    checked={selectedTags.includes(tag.id)}
                    onCheckedChange={() => onTagToggle(tag.id)}
                    className="rounded-none"
                  />
                  <label
                    htmlFor={tag.id}
                    className="font-mono text-xs cursor-pointer"
                  >
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
