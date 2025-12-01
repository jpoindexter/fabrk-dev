/**
 * ✅ FABRK COMPONENT
 * Section Header
 * Production-ready ✓
 */

import { type LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgClass?: string;
}

export function SectionHeader({ icon: Icon, title, description, iconBgClass = "bg-primary/10" }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`flex h-10 w-10 items-center justify-center border border-border ${iconBgClass}`}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h2 className="font-mono text-xs text-muted-foreground">[{title}]:</h2>
        <p className="font-mono text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
