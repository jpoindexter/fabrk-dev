/**
 * FABRK COMPONENT
 * Features Card - List of template features
 */

export function FeaturesCard() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
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
            <span className="text-success">&gt;</span> Confirmation dialog for
            destructive actions
          </div>
          <div>
            <span className="text-success">&gt;</span> Form dialog with inputs and
            validation
          </div>
          <div>
            <span className="text-success">&gt;</span> Side sheet for
            settings/navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Popover for contextual
            content
          </div>
          <div>
            <span className="text-success">&gt;</span> Accessible with keyboard
            navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Terminal-styled headers and
            labels
          </div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: All patterns use Radix UI primitives for accessibility.
        </div>
      </div>
    </div>
  );
}
