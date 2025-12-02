/**
 * FABRK COMPONENT
 * Popover Example - Contextual floating content
 */

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, X } from "lucide-react";

export function PopoverExample() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          popover.tsx
        </span>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Popover</h3>
          <p className="font-mono text-xs text-muted-foreground">
            Contextual floating content triggered by click
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-none font-mono text-xs">
              <Info className="mr-1 h-3 w-3" />
              &gt; MORE_INFO
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 rounded-none border-border">
            <div className="space-y-4">
              <div className="font-mono text-xs text-muted-foreground">
                [INFO]:
              </div>
              <div className="font-mono text-sm">
                This popover displays contextual information without blocking the
                page. Great for help text, quick actions, or mini forms.
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="rounded-none font-mono text-xs h-7"
                >
                  &gt; LEARN_MORE
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-none font-mono text-xs h-7"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [USE_CASE]: Tooltips, quick actions, filter dropdowns
        </div>
      </div>
    </div>
  );
}
