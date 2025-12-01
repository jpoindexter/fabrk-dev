/**
 * FABRK COMPONENT
 * Results Header - Sort controls and view toggle
 */

import { Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ResultsHeaderProps {
  resultsCount: number;
  sortBy: string;
  viewMode: "grid" | "list";
  onSortChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function ResultsHeader({
  resultsCount,
  sortBy,
  viewMode,
  onSortChange,
  onViewModeChange,
}: ResultsHeaderProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          results_header.tsx
        </span>
      </div>
      <div className="p-3 flex items-center justify-between">
        <div className="font-mono text-xs text-muted-foreground">
          [SHOWING]: {resultsCount} results
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[140px] h-8 rounded-none font-mono text-xs">
              <SlidersHorizontal className="h-3 w-3 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none font-mono text-xs">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border border-border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="rounded-none h-8 w-8 p-0"
            >
              <Grid className="h-3 w-3" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="rounded-none h-8 w-8 p-0 border-l border-border"
            >
              <List className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
