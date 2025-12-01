/**
 * Implementation note card showing template features
 */

export function FeaturesNote() {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">features.md</span>
      </div>
      <div className="p-4">
        <div className="mb-3 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
        <div className="space-y-1.5 font-mono text-xs">
          <div><span className="text-success">&gt;</span> TanStack Table v8 with sorting, filtering, pagination</div>
          <div><span className="text-success">&gt;</span> Bulk actions (select multiple users)</div>
          <div><span className="text-success">&gt;</span> Column visibility toggle</div>
          <div><span className="text-success">&gt;</span> Search by name/email</div>
          <div><span className="text-success">&gt;</span> Export to CSV functionality</div>
          <div><span className="text-success">&gt;</span> Role badges (Admin, User, Guest)</div>
          <div><span className="text-success">&gt;</span> Status indicators (Active, Inactive, Suspended)</div>
          <div><span className="text-success">&gt;</span> Row actions menu (Edit, Suspend, Delete)</div>
          <div><span className="text-success">&gt;</span> Stats cards (Total, Active, Admins, Enterprise)</div>
          <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
        </div>
        <div className="mt-3 font-mono text-xs text-muted-foreground">
          [NOTE]: Replace mockUsers with your API data. Add API routes for edit/delete/suspend actions.
        </div>
      </div>
    </div>
  );
}
