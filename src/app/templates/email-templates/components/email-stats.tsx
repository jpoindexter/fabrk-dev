/**
 * Email stats cards component
 */

export function EmailStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[TOTAL_TEMPLATES]:</div>
        <div className="text-3xl font-bold">5</div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[CATEGORIES]:</div>
        <div className="text-3xl font-bold">3</div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[EMAIL_PROVIDER]:</div>
        <div className="text-3xl font-bold">Resend</div>
      </div>
      <div className="border border-border bg-card p-4">
        <div className="font-mono text-xs text-muted-foreground mb-1">[COMPATIBILITY]:</div>
        <div className="text-3xl font-bold">100%</div>
      </div>
    </div>
  );
}
