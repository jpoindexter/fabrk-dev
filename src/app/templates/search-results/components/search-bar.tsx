/**
 * FABRK COMPONENT
 * Search Bar - Terminal console style search input
 */

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
}

export function SearchBar({ searchQuery, onSearchChange, resultsCount }: SearchBarProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          search.tsx
        </span>
      </div>
      <div className="p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search components, templates, hooks..."
              className="pl-10 rounded-none font-mono text-sm"
            />
          </div>
          <Button className="rounded-none font-mono text-xs">
            &gt; SEARCH
          </Button>
        </div>
        <div className="mt-2 font-mono text-xs text-muted-foreground">
          [QUERY]: &quot;{searchQuery}&quot; | RESULTS: {resultsCount} | TIME: 0.042s
        </div>
      </div>
    </div>
  );
}
