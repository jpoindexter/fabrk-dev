/**
 * Current Plan Card Component
 * Displays subscription details, billing period, and management actions
 */

import {
  DollarSign,
  Calendar,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertTriangle,
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
import { Separator } from "@/components/ui/separator";
import type { Organization, Subscription } from "./types";
import { getStatusBadge } from "./utils";

interface CurrentPlanCardProps {
  organization: Organization;
  subscription: Subscription | null;
  isOwnerOrAdmin: boolean;
  loadingPortal: boolean;
  onManageBilling: () => void;
  onUpgrade: () => void;
}

export function CurrentPlanCard({
  subscription,
  isOwnerOrAdmin,
  loadingPortal,
  onManageBilling,
  onUpgrade,
}: CurrentPlanCardProps) {
  return (
    <Card className="rounded-none border border-border shadow-sm">
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
                  <Button variant="outline" onClick={onUpgrade}>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                  <Button
                    onClick={onManageBilling}
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
              <div className="rounded-none border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Billing Period
                </div>
                <p className="mt-2 font-medium">
                  Renews {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              </div>

              <div className="rounded-none border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  Next Payment
                </div>
                <p className="mt-2 font-medium">
                  ${(subscription.plan.amount / 100).toFixed(2)}
                </p>
              </div>

              <div className="rounded-none border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                  Status
                </div>
                <p className="mt-2 font-medium capitalize">{subscription.status}</p>
              </div>
            </div>

            {subscription.cancelAtPeriodEnd && (
              <div className="rounded-none border border-border border-destructive bg-destructive/10 p-4">
                <div className="flex items-start gap-4">
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
              <Button onClick={onUpgrade} className="mt-4">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Plans
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
