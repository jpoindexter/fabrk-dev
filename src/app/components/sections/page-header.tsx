/**
 * ✅ FABRK COMPONENT
 * Page Header - Terminal-style header for components page
 * Production-ready ✓
 */

export function PageHeader() {
  return (
    <section className="space-y-4">
      <div className="inline-block border border-border bg-card px-4 py-1">
        <span className="text-xs text-muted-foreground">[ [0x00] SHOWCASE ] UI_COMPONENTS</span>
      </div>
      <div>
        <span className="text-sm text-muted-foreground">FABRK_COMPONENTS:</span>
        <h1 className="text-3xl font-bold tracking-tight">UI_COMPONENTS</h1>
      </div>
      <div className="border border-border bg-card p-4 max-w-2xl">
        <div className="mb-2 text-xs text-muted-foreground">
          [ STATUS ]────────────────────────
        </div>
        <p className="text-xs text-muted-foreground">
          100+ production-ready components with clean, modern styling. Copy-paste ready for your project.
        </p>
      </div>
    </section>
  );
}
