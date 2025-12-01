/**
 * FABRK COMPONENT
 * Pricing Header - Title, description, and billing toggle
 */

import { Badge } from "@/components/ui/badge";

interface PricingHeaderProps {
  isYearly: boolean;
  onToggleBilling: (isYearly: boolean) => void;
}

export function PricingHeader({ isYearly, onToggleBilling }: PricingHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="inline-block border border-border px-3 py-1">
        <span className="font-mono text-xs text-muted-foreground">
          [TEMPLATE]: PRICING_PAGE
        </span>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight">
        Simple, Transparent Pricing
      </h1>
      <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto">
        Choose the plan that fits your needs. All plans include a 14-day free trial.
      </p>

      {/* Billing Toggle - Terminal Style */}
      <div className="flex items-center justify-center gap-2 pt-4">
        <div className="inline-flex border border-border font-mono text-xs">
          <button
            onClick={() => onToggleBilling(false)}
            className={`px-4 py-2 transition-colors ${
              !isYearly
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            [MONTHLY]
          </button>
          <button
            onClick={() => onToggleBilling(true)}
            className={`px-4 py-2 border-l border-border transition-colors ${
              isYearly
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            [YEARLY]
          </button>
        </div>
        {isYearly && (
          <Badge variant="secondary" className="rounded-none font-mono text-xs">
            SAVE 17%
          </Badge>
        )}
      </div>
    </div>
  );
}
