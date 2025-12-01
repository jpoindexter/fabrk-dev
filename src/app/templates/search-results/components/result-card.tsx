/**
 * FABRK COMPONENT
 * Result Card - Individual search result display
 */

import { Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Result {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  updated: string;
}

interface ResultCardProps {
  result: Result;
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="border border-border bg-card hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
        <div className="flex gap-1">
          <div className="size-1.5 rounded-full bg-destructive/50" />
          <div className="size-1.5 rounded-full bg-warning/50" />
          <div className="size-1.5 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          result_{result.id}.tsx
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold">{result.title}</h3>
          <div className="flex items-center gap-1 font-mono text-xs text-warning">
            <Star className="h-3 w-3 fill-current" />
            {result.rating}
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground mb-3">
          {result.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {result.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline" className="rounded-none font-mono text-[10px] border-border"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {result.updated}
          </div>
        </div>
      </div>
    </div>
  );
}
