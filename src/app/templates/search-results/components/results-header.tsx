/**
 * FABRK COMPONENT
 * Results Header - Sort controls and view toggle
 */

import { Grid, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TerminalCardHeader } from "@/components/ui/card";
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
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="RESULTS" />
      <div className="flex items-center justify-between p-4">
        <div className="text-muted-foreground font-mono text-xs">
          [SHOWING]: {resultsCount} results
        </div>
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-8 w-[140px] rounded-none font-mono text-xs">
              <SlidersHorizontal className="mr-1 h-3 w-3" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-none font-mono text-xs">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>
          <div className="border-border flex border">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="h-8 w-8 rounded-none p-0"
            >
              <Grid className="h-3 w-3" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="border-border h-8 w-8 rounded-none border-l p-0"
            >
              <List className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
