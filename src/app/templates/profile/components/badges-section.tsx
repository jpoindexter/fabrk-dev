/**
 * FABRK COMPONENT
 * Badges Section - User achievements display
 */

"use client";

import { StyledCardHeader } from "@/components/ui/card";
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
    <div className="border-border bg-card border">
      <StyledCardHeader code="0x00" title="BADGES" />
      <div className="p-4">
        <div className="text-muted-foreground mb-4 font-mono text-xs">
          [ACHIEVEMENTS]: {badges.length} BADGES_EARNED
        </div>
        <div className="flex flex-wrap gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.id}
                className="border-border bg-muted/30 flex items-center gap-2 border px-4 py-2"
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
