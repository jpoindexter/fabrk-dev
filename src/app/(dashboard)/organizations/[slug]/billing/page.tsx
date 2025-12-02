/**
 * Organization Billing Page
 * Manage organization-level subscriptions, payment methods, and billing
 */

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import type { Organization, Subscription, Invoice, Usage } from "./components/types";
import { BillingHeader } from "./components/billing-header";
import { CurrentPlanCard } from "./components/current-plan-card";
import { UsageStatsCard } from "./components/usage-stats-card";
import { BillingHistoryCard } from "./components/billing-history-card";

export default function OrganizationBillingPage() {
  const router = useRouter();
  const params = useParams();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(true);
  const [organization, setOrganization] = React.useState<Organization | null>(null);
  const [subscription, setSubscription] = React.useState<Subscription | null>(null);
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);
  const [usage, setUsage] = React.useState<Usage | null>(null);
  const [loadingPortal, setLoadingPortal] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch organization
        const orgResponse = await fetch(`/api/organizations/${params.slug}`);
        if (!orgResponse.ok) throw new Error("Failed to fetch organization");
        const orgData = await orgResponse.json();
        setOrganization(orgData.organization);

        // Fetch billing data if customer exists
        if (orgData.organization.customerId) {
          const [subResponse, invoicesResponse, usageResponse] = await Promise.all([
            fetch(`/api/organizations/${orgData.organization.id}/billing/subscription`),
            fetch(`/api/organizations/${orgData.organization.id}/billing/invoices`),
            fetch(`/api/organizations/${orgData.organization.id}/billing/usage`),
          ]);

          if (subResponse.ok) {
            const subData = await subResponse.json();
            setSubscription(subData.subscription);
          }

          if (invoicesResponse.ok) {
            const invoicesData = await invoicesResponse.json();
            setInvoices(invoicesData.invoices);
          }

          if (usageResponse.ok) {
            const usageData = await usageResponse.json();
            setUsage(usageData.usage);
          }
        }
      } catch (error: unknown) {
        console.error("Failed to fetch billing data:", error);
        toast.error("Failed to load billing information");
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      fetchData();
    }
  }, [params.slug]);

  const handleManageBilling = async () => {
    if (!organization) return;

    setLoadingPortal(true);
    try {
      const response = await fetch(`/api/organizations/${organization.id}/billing/portal`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to create portal session");

      const data = await response.json();
      window.location.href = data.url;
    } catch (error: unknown) {
      toast.error("Failed to open billing portal");
      setLoadingPortal(false);
    }
  };

  const handleUpgrade = () => {
    if (!organization) return;
    router.push(`/organizations/${organization.slug}/billing/upgrade`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!organization) {
    return (
      <Card className="rounded-none border border-border">
        <CardContent className="py-12">
          <div className="text-center">
            <h3 className="text-lg font-medium">Organization not found</h3>
            <Button onClick={() => router.push("/dashboard")} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isOwnerOrAdmin = ["OWNER", "ADMIN"].includes(organization.role);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <BillingHeader organization={organization} />

      <CurrentPlanCard
        organization={organization}
        subscription={subscription}
        isOwnerOrAdmin={isOwnerOrAdmin}
        loadingPortal={loadingPortal}
        onManageBilling={handleManageBilling}
        onUpgrade={handleUpgrade}
      />

      {usage && <UsageStatsCard usage={usage} />}

      <BillingHistoryCard invoices={invoices} />
    </div>
  );
}
