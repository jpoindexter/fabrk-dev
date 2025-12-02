/**
 * FABRK COMPONENT
 * Badges Section - User achievements display
 */

"use client";

import { LucideIcon } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

interface BadgesSectionProps {
  badges: Badge[];
}

export function BadgesSection({ badges }: BadgesSectionProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          badges.tsx
        </span>
      </div>
      <div className="p-4">
        <div className="font-mono text-xs text-muted-foreground mb-4">
          [ACHIEVEMENTS]: {badges.length} BADGES_EARNED
        </div>
        <div className="flex flex-wrap gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="flex items-center gap-2 border border-border px-4 py-2 bg-muted/30"
              >
                <Icon className={`h-4 w-4 text-${badge.color}`} />
                <span className="font-mono text-xs">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
