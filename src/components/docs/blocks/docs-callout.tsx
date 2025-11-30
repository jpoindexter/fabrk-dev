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
  { icon: typeof Info; borderColor: string; bgColor: string; iconColor: string; label: string; hexCode: string }
> = {
  info: {
    icon: Info,
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-500/5",
    iconColor: "text-blue-500",
    label: "INFO",
    hexCode: "00",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-yellow-500/50",
    bgColor: "bg-yellow-500/5",
    iconColor: "text-yellow-500",
    label: "WARNING",
    hexCode: "01",
  },
  tip: {
    icon: Lightbulb,
    borderColor: "border-green-500/50",
    bgColor: "bg-green-500/5",
    iconColor: "text-green-500",
    label: "TIP",
    hexCode: "02",
  },
  danger: {
    icon: AlertCircle,
    borderColor: "border-red-500/50",
    bgColor: "bg-red-500/5",
    iconColor: "text-red-500",
    label: "DANGER",
    hexCode: "03",
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
        "border border-border",
        className
      )}
    >
      {/* Terminal Header */}
      <div className={cn("border-b border-border px-4 py-2", config.bgColor)}>
        <span className={cn("font-mono text-xs", config.iconColor)}>
          [ [0x{config.hexCode}] {config.label} ]
        </span>
      </div>
      <div className={cn("p-4", config.bgColor)}>
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
    </div>
  );
}
