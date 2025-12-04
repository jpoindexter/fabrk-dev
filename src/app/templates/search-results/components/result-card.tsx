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
    <div className="border-border bg-card hover:bg-muted/30 border transition-colors">
      <div className="border-border flex items-center gap-2 border-b px-4 py-1.5">
        <div className="flex gap-1">
          <div className="bg-destructive/50 size-1.5 rounded-none" />
          <div className="bg-warning/50 size-1.5 rounded-none" />
          <div className="bg-success/50 size-1.5 rounded-none" />
        </div>
        <span className="text-muted-foreground font-mono text-xs">result_{result.id}.tsx</span>
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-mono font-semibold">{result.title}</h3>
          <div className="text-warning flex items-center gap-1 font-mono text-xs">
            <Star className="h-3 w-3 fill-current" />
            {result.rating}
          </div>
        </div>
        <p className="text-muted-foreground mb-4 font-mono text-xs">{result.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {result.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-border rounded-none font-mono text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
            <Clock className="h-3 w-3" />
            {result.updated}
          </div>
        </div>
      </div>
    </div>
  );
}
