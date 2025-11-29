/**
 * DocsCallout - Warning, info, tip callout boxes
 */

import { AlertTriangle, Info, Lightbulb, AlertCircle } from "lucide-react";
import { docsTypography } from "../typography";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "tip" | "danger";

interface DocsCalloutProps {
  /** Type of callout */
  variant?: CalloutVariant;
  /** Callout title (optional) */
  title?: string;
  /** Callout content */
  children: React.ReactNode;
  /** Optional className */
  className?: string;
}

const variantConfig: Record<
  CalloutVariant,
  { icon: typeof Info; borderColor: string; bgColor: string; iconColor: string }
> = {
  info: {
    icon: Info,
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-500/5",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-yellow-500/50",
    bgColor: "bg-yellow-500/5",
    iconColor: "text-yellow-500",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-green-500/50",
    bgColor: "bg-green-500/5",
    iconColor: "text-green-500",
  },
  danger: {
    icon: AlertCircle,
    borderColor: "border-red-500/50",
    bgColor: "bg-red-500/5",
    iconColor: "text-red-500",
  },
};

export function DocsCallout({
  variant = "info",
  title,
  children,
  className,
}: DocsCalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "border-l-4 p-4",
        config.borderColor,
        config.bgColor,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconColor)} aria-hidden="true" />
        <div className="space-y-1">
          {title && (
            <p className={`font-bold uppercase ${docsTypography.h4}`}>{title}</p>
          )}
          <div className={docsTypography.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
