/**
 * FABRK COMPONENT
 * Popover Example - Contextual floating content
 */

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info, X } from "lucide-react";

export function PopoverExample() {
  return (
    <div className="border-border bg-card border">
      <div className="border-border border-b px-4 py-2">
        <span className="text-muted-foreground font-mono text-xs">[ [0x00] POPOVER ]</span>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-1 font-mono font-semibold">Popover</h3>
          <p className="text-muted-foreground font-mono text-xs">
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
          <PopoverContent className="border-border w-80 rounded-none">
            <div className="space-y-4">
              <div className="text-muted-foreground font-mono text-xs">[INFO]:</div>
              <div className="font-mono text-sm">
                This popover displays contextual information without blocking the page. Great for
                help text, quick actions, or mini forms.
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" className="h-7 rounded-none font-mono text-xs">
                  &gt; LEARN_MORE
                </Button>
                <Button variant="ghost" size="sm" className="h-7 rounded-none font-mono text-xs">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="text-muted-foreground mt-4 font-mono text-xs">
          [USE_CASE]: Tooltips, quick actions, filter dropdowns
        </div>
      </div>
    </div>
  );
}
