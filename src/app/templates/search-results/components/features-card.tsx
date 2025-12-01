/**
 * FABRK COMPONENT
 * Features Card - Template features documentation
 */

export function FeaturesCard() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          features.md
        </span>
      </div>
      <div className="p-4">
        <div className="mb-3 font-mono text-xs text-muted-foreground">
          [TEMPLATE_FEATURES]:
        </div>
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
        <div className="mt-3 font-mono text-xs text-muted-foreground">
          [NOTE]: Connect to your search backend (Algolia, Elasticsearch, etc.) for real results.
        </div>
      </div>
    </div>
  );
}
