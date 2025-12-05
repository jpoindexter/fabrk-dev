"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode, formatButtonText } from "@/design-system";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      {Icon && (
        <div className={cn("bg-muted mb-4 border p-4", mode.radius)}>
          <Icon className="text-muted-foreground h-12 w-12" />
        </div>
      )}
      <h3 className="text-foreground mb-2 text-lg font-semibold">{title}</h3>
      {description && (
        <p className={cn("text-muted-foreground mb-4 max-w-sm text-xs", mode.font)}>
          {description}
        </p>
      )}
      {action && <Button onClick={action.onClick}>{formatButtonText(action.label)}</Button>}
    </div>
  );
}
