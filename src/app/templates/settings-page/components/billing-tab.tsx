/**
 * ✅ FABRK COMPONENT
 * Billing Tab Content
 * Production-ready ✓
 */

import { DangerZone } from "@/components/settings/danger-zone";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertTriangle } from "lucide-react";
import { TerminalWindow } from "./terminal-window";
import { SectionHeader } from "./section-header";

export function BillingTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Subscription */}
      <TerminalWindow filename="subscription.json">
        <div className="p-4">
          <SectionHeader
            icon={CreditCard}
            title="SUBSCRIPTION_BILLING"
            description="Manage your subscription plan and payment methods"
          />
          <div className="border border-border p-4 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-mono text-xs text-muted-foreground">[CURRENT_PLAN]:</div>
                <div className="text-2xl font-bold">Pro</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs text-muted-foreground">[BILLING_CYCLE]:</div>
                <div className="text-xl font-bold">$29/month</div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-none flex-1 font-mono text-xs">&gt; CHANGE_PLAN</Button>
              <Button variant="outline" className="rounded-none flex-1 font-mono text-xs">&gt; VIEW_INVOICES</Button>
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-muted-foreground mb-3">[PAYMENT_METHODS]:</div>
            <div className="text-center py-4 font-mono text-xs text-muted-foreground border border-border">
              No payment methods added yet. Use Stripe Customer Portal to manage payment methods.
            </div>
            <Button variant="outline" className="rounded-none w-full mt-3 font-mono text-xs">
              &gt; ADD_PAYMENT_METHOD
            </Button>
          </div>
        </div>
      </TerminalWindow>

      {/* Danger Zone */}
      <TerminalWindow filename="danger_zone.tsx" borderColor="border-destructive">
        <div className="p-4">
          <SectionHeader
            icon={AlertTriangle}
            title="DANGER_ZONE"
            description="Irreversible and destructive actions"
            iconBgClass="bg-destructive/10"
          />
          <DangerZone />
        </div>
      </TerminalWindow>
    </div>
  );
}
