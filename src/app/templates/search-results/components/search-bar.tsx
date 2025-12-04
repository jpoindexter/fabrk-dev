/**
 * FABRK COMPONENT
 * Search Bar - Terminal console style search input
 */

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TerminalCardHeader } from "@/components/ui/card";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
}

export function SearchBar({ searchQuery, onSearchChange, resultsCount }: SearchBarProps) {
  return (
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="SEARCH" />
      <div className="p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search components, templates, hooks..."
              className="rounded-none pl-8 font-mono text-sm"
            />
          </div>
          <Button className="rounded-none font-mono text-xs">&gt; SEARCH</Button>
        </div>
        <div className="text-muted-foreground mt-2 font-mono text-xs">
          [QUERY]: &quot;{searchQuery}&quot; | RESULTS: {resultsCount} | TIME: 0.042s
        </div>
      </div>
    </div>
  );
}
