/**
 * Organization Billing Page
 * Manage organization-level subscriptions, payment methods, and billing
 */

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  CreditCard,
  DollarSign,
  Calendar,
  Download,
  ExternalLink,
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  customerId: string | null;
  subscriptionId: string | null;
  role: string;
}

interface Subscription {
  id: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  plan: {
    name: string;
    amount: number;
    interval: "month" | "year";
  };
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface Invoice {
  id: string;
  amount: number;
  status: "paid" | "open" | "void" | "uncollectible";
  created: string;
  invoicePdf: string | null;
}

interface Usage {
  users: { current: number; limit: number };
  storage: { current: number; limit: number };
  apiCalls: { current: number; limit: number };
}

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="gap-1"><CheckCircle2 className="h-3 w-3" />Active</Badge>;
      case "trialing":
        return <Badge variant="secondary" className="gap-1"><Zap className="h-3 w-3" />Trial</Badge>;
      case "past_due":
        return <Badge variant="accent" className="gap-1"><AlertTriangle className="h-3 w-3" />Past Due</Badge>;
      case "canceled":
        return <Badge variant="outline" className="gap-1"><XCircle className="h-3 w-3" />Canceled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge variant="default">Paid</Badge>;
      case "open":
        return <Badge variant="secondary">Open</Badge>;
      case "void":
        return <Badge variant="outline">Void</Badge>;
      case "uncollectible":
        return <Badge variant="accent">Uncollectible</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
      <Card className="rounded-brutal border-2 border-brutal">
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-brutal border-2 border-brutal bg-primary p-2">
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

      {/* Current Plan */}
      <Card className="rounded-brutal border-2 border-brutal shadow-brutal">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Your organization's subscription and billing details
              </CardDescription>
            </div>
            {subscription && getStatusBadge(subscription.status)}
          </div>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{subscription.plan.name}</p>
                  <p className="text-muted-foreground">
                    ${(subscription.plan.amount / 100).toFixed(2)} / {subscription.plan.interval}
                  </p>
                </div>
                {isOwnerOrAdmin && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleUpgrade}>
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Upgrade Plan
                    </Button>
                    <Button
                      onClick={handleManageBilling}
                      disabled={loadingPortal}
                    >
                      {loadingPortal && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Manage Billing
                    </Button>
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-brutal border-2 border-brutal bg-card p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Billing Period
                  </div>
                  <p className="mt-2 font-medium">
                    Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                </div>

                <div className="rounded-brutal border-2 border-brutal bg-card p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    Next Payment
                  </div>
                  <p className="mt-2 font-medium">
                    ${(subscription.plan.amount / 100).toFixed(2)}
                  </p>
                </div>

                <div className="rounded-brutal border-2 border-brutal bg-card p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4" />
                    Status
                  </div>
                  <p className="mt-2 font-medium capitalize">{subscription.status}</p>
                </div>
              </div>

              {subscription.cancelAtPeriodEnd && (
                <div className="rounded-brutal border-2 border-brutal border-destructive bg-destructive/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <h4 className="font-medium text-destructive">Subscription Ending</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Your subscription will end on{" "}
                        {new Date(subscription.currentPeriodEnd).toLocaleDateString()}. You can
                        reactivate it anytime before then.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Active Subscription</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Upgrade to a paid plan to unlock premium features
              </p>
              {isOwnerOrAdmin && (
                <Button onClick={handleUpgrade} className="mt-4">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Plans
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Stats */}
      {usage && (
        <Card className="rounded-brutal border-2 border-brutal shadow-brutal">
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>
              Track your organization's resource consumption
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Team Members</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.users.current} / {usage.users.limit}
                  </span>
                </div>
                <Progress
                  value={(usage.users.current / usage.users.limit) * 100}
                  className="h-2"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.storage.current} GB / {usage.storage.limit} GB
                  </span>
                </div>
                <Progress
                  value={(usage.storage.current / usage.storage.limit) * 100}
                  className="h-2"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">API Calls</span>
                  <span className="text-sm text-muted-foreground">
                    {usage.apiCalls.current.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
                  </span>
                </div>
                <Progress
                  value={(usage.apiCalls.current / usage.apiCalls.limit) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoices */}
      {invoices.length > 0 && (
        <Card className="rounded-brutal border-2 border-brutal shadow-brutal">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View and download past invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      {new Date(invoice.created).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${(invoice.amount / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {getInvoiceStatusBadge(invoice.status)}
                    </TableCell>
                    <TableCell>
                      {invoice.invoicePdf && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <a
                            href={invoice.invoicePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
