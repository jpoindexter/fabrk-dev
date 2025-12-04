/**
 * ✅ FABRK COMPONENT
 * Billing Tab Content
 * Production-ready ✓
 */

import { DangerZone } from "@/components/settings/danger-zone";
import { Button } from "@/components/ui/button";
import { CreditCard, AlertTriangle } from "lucide-react";
import { CodeWindow } from "./code-window";
import { SectionHeader } from "./section-header";

export function BillingTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Subscription */}
      <CodeWindow filename="subscription.json">
        <div className="p-4">
          <SectionHeader
            icon={CreditCard}
            title="SUBSCRIPTION_BILLING"
            description="Manage your subscription plan and payment methods"
          />
          <div className="border-border mb-4 border p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-muted-foreground font-mono text-xs">[CURRENT_PLAN]:</div>
                <div className="text-2xl font-bold">Pro</div>
              </div>
              <div className="text-right">
                <div className="text-muted-foreground font-mono text-xs">[BILLING_CYCLE]:</div>
                <div className="text-xl font-bold">$29/month</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 rounded-none font-mono text-xs">
                &gt; CHANGE_PLAN
              </Button>
              <Button variant="outline" className="flex-1 rounded-none font-mono text-xs">
                &gt; VIEW_INVOICES
              </Button>
            </div>
          </div>
          <div>
            <div className="text-muted-foreground mb-4 font-mono text-xs">[PAYMENT_METHODS]:</div>
            <div className="text-muted-foreground border-border border py-4 text-center font-mono text-xs">
              No payment methods added yet. Use Stripe Customer Portal to manage payment methods.
            </div>
            <Button variant="outline" className="mt-4 w-full rounded-none font-mono text-xs">
              &gt; ADD_PAYMENT_METHOD
            </Button>
          </div>
        </div>
      </CodeWindow>

      {/* Danger Zone */}
      <CodeWindow filename="danger_zone.tsx" borderColor="border-destructive">
        <div className="p-4">
          <SectionHeader
            icon={AlertTriangle}
            title="DANGER_ZONE"
            description="Irreversible and destructive actions"
            iconBgClass="bg-destructive/10"
          />
          <DangerZone />
        </div>
      </CodeWindow>
    </div>
  );
}
