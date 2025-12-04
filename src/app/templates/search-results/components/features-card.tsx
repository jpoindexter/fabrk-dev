/**
 * FABRK COMPONENT
 * Features Card - Template features documentation
 */

import { TerminalCardHeader } from "@/components/ui/card";

export function FeaturesCard() {
  return (
    <div className="border-border bg-card border">
      <TerminalCardHeader code="0x00" title="FEATURES" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-success">&gt;</span> Search bar with query display
          </div>
          <div>
            <span className="text-success">&gt;</span> Category filter sidebar
          </div>
          <div>
            <span className="text-success">&gt;</span> Tag checkboxes with multi-select
          </div>
          <div>
            <span className="text-success">&gt;</span> Sort dropdown (relevance, newest, rating)
          </div>
          <div>
            <span className="text-success">&gt;</span> Grid/list view toggle
          </div>
          <div>
            <span className="text-success">&gt;</span> Result cards with ratings
          </div>
          <div>
            <span className="text-success">&gt;</span> Pagination controls
          </div>
        </div>
        <div className="text-muted-foreground mt-4 font-mono text-xs">
          [NOTE]: Connect to your search backend (Algolia, Elasticsearch, etc.) for real results.
        </div>
      </div>
    </div>
  );
}
