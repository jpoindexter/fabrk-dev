/**
 * FABRK COMPONENT
 * Features Card - Template features and usage notes
 */

export function FeaturesCard() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          features.md
        </span>
      </div>
      <div className="p-4">
        <div className="mb-4 font-mono text-xs text-muted-foreground">
          [TEMPLATE_FEATURES]:
        </div>
        <div className="space-y-1.5 font-mono text-xs">
          <div>
            <span className="text-success">&gt;</span> 3-tier pricing cards with
            terminal styling
          </div>
          <div>
            <span className="text-success">&gt;</span> Monthly/yearly toggle with
            savings badge
          </div>
          <div>
            <span className="text-success">&gt;</span> Feature comparison table
          </div>
          <div>
            <span className="text-success">&gt;</span> Expandable FAQ accordion
          </div>
          <div>
            <span className="text-success">&gt;</span> Popular plan highlight
          </div>
          <div>
            <span className="text-success">&gt;</span> Responsive grid layout
          </div>
          <div>
            <span className="text-success">&gt;</span> Design token colors (no
            hardcoded values)
          </div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: Connect to your payment provider (Stripe/Polar.sh) for live
          checkout.
        </div>
      </div>
    </div>
  );
}
