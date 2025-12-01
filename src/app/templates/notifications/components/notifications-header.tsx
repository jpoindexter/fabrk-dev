/**
 * FABRK COMPONENT
 * Notifications header section
 */

export function NotificationsHeader() {
  return (
    <div className="space-y-2">
      <div className="inline-block border border-border px-3 py-1">
        <span className="font-mono text-xs text-muted-foreground">
          [TEMPLATE]: NOTIFICATIONS_CENTER
        </span>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">
        Notifications Center
      </h1>
      <p className="font-mono text-sm text-muted-foreground">
        Manage your notifications with filtering, actions, and real-time updates
      </p>
    </div>
  );
}
