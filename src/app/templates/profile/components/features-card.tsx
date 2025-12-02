/**
 * FABRK COMPONENT
 * Features Card - Template documentation
 */

"use client";

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
            <span className="text-success">&gt;</span> User info card with
            avatar
          </div>
          <div>
            <span className="text-success">&gt;</span> Stats display
            (projects, contributions, followers)
          </div>
          <div>
            <span className="text-success">&gt;</span> Achievement badges
          </div>
          <div>
            <span className="text-success">&gt;</span> Activity feed with
            timestamps
          </div>
          <div>
            <span className="text-success">&gt;</span> Projects tab with
            star counts
          </div>
          <div>
            <span className="text-success">&gt;</span> Edit profile and
            settings actions
          </div>
          <div>
            <span className="text-success">&gt;</span> Responsive layout
          </div>
        </div>
        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [NOTE]: Connect to your user service to populate real data and
          upload avatars.
        </div>
      </div>
    </div>
  );
}
