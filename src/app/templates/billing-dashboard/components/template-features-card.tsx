/**
 * ✅ FABRK COMPONENT
 * Template Features Card - Documents template capabilities
 */

export function TemplateFeaturesCard() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">features.md</span>
      </div>
      <div className="p-4">
        <div className="mb-4 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div><span className="text-success">&gt;</span> 3-tab navigation (Overview, Plans & Pricing, Billing History)</div>
          <div><span className="text-success">&gt;</span> Current subscription card with plan details and features</div>
          <div><span className="text-success">&gt;</span> Usage metrics with progress bars (team, storage, API calls)</div>
          <div><span className="text-success">&gt;</span> Payment methods management (add, remove, set default)</div>
          <div><span className="text-success">&gt;</span> Recent invoices preview with download buttons</div>
          <div><span className="text-success">&gt;</span> Plan comparison cards (Free, Pro, Enterprise)</div>
          <div><span className="text-success">&gt;</span> Complete billing history table with status badges</div>
          <div><span className="text-success">&gt;</span> Stripe integration ready</div>
          <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: Connect to Stripe API for live data.
        </div>
      </div>
    </div>
  );
}
