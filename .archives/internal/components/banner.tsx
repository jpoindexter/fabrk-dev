"use client";

import * as React from "react";
import { X, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { Button } from "@/components/ui/button";

export type BannerVariant = "info" | "success" | "warning" | "error";

interface BannerProps {
  variant?: BannerVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const variantStyles: Record<BannerVariant, string> = {
  info: "bg-info/10 border-info text-info-foreground",
  success: "bg-success/10 border-success text-success-foreground",
  warning: "bg-warning/10 border-warning text-warning-foreground",
  error: "bg-destructive/10 border-destructive text-destructive-foreground",
};

const variantIcons: Record<BannerVariant, React.ReactNode> = {
  info: <Info className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
};

export function Banner({
  variant = "info",
  title,
  children,
  onDismiss,
  action,
  className,
}: BannerProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 border-l-4 p-4",
        mode.radius,
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <div className="flex-shrink-0">{variantIcons[variant]}</div>
      <div className="flex-1">
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className={cn("text-xs", mode.font)}>{children}</div>
      </div>
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick} className="flex-shrink-0">
          {action.label}
        </Button>
      )}
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={cn("hover:bg-muted flex-shrink-0 p-1 transition-colors", mode.radius)}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
