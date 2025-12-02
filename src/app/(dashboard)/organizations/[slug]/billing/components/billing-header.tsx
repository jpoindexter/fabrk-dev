/**
 * Billing Header Component
 * Displays the page header with organization name
 */

import { CreditCard } from "lucide-react";
import type { Organization } from "./types";

interface BillingHeaderProps {
  organization: Organization;
}

export function BillingHeader({ organization }: BillingHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-none border border-border bg-primary p-2">
          <CreditCard className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage billing for {organization.name}
          </p>
        </div>
      </div>
    </div>
  );
}
