/**
 * FABRK COMPONENT
 * Notifications header section
 */

export function NotificationsHeader() {
  return (
    <div className="space-y-2">
      <div className="border-border inline-block border px-4 py-1">
        <span className="text-muted-foreground font-mono text-xs">
          [TEMPLATE]: NOTIFICATIONS_CENTER
        </span>
      </div>
      <h1 className="font-mono text-4xl font-semibold tracking-tight">Notifications Center</h1>
      <p className="text-muted-foreground font-mono text-sm">
        Manage your notifications with filtering, actions, and real-time updates
      </p>
    </div>
  );
}
