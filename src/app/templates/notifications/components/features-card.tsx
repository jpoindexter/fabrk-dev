/**
 * FABRK COMPONENT
 * Template features card
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
            <span className="text-success">&gt;</span> All/Unread tab filtering
          </div>
          <div>
            <span className="text-success">&gt;</span> Mark as read (individual
            or all)
          </div>
          <div>
            <span className="text-success">&gt;</span> Delete notifications
          </div>
          <div>
            <span className="text-success">&gt;</span> 5 notification types
            (info, success, warning, error, message)
          </div>
          <div>
            <span className="text-success">&gt;</span> Unread badge counter
          </div>
          <div>
            <span className="text-success">&gt;</span> Action URLs for navigation
          </div>
          <div>
            <span className="text-success">&gt;</span> Empty state handling
          </div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: Connect to your notification service (WebSockets, SSE) for
          real-time updates.
        </div>
      </div>
    </div>
  );
}
