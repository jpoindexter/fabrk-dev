"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface BillingInfo {
  plan: string;
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: string;
  amount: string;
}

export function BillingSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Placeholder billing data - replace with actual data from your backend
  const billingInfo: BillingInfo = {
    plan: "Pro Plan",
    status: "active",
    currentPeriodEnd: "2024-11-30",
    amount: "$29.99",
  };

  async function handleManageBilling() {
    setIsLoading(true);

    try {
      // TODO: Replace with actual Stripe portal API call
      // const response = await fetch('/api/create-portal-session', {
      //   method: 'POST',
      // });
      // const { url } = await response.json();
      // window.location.href = url;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Redirecting to billing portal",
        description: "You'll be redirected to manage your subscription.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "canceled":
        return "secondary";
      case "past_due":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing & Subscription</CardTitle>
        <CardDescription>
          Manage your subscription and billing information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current Plan</p>
              <p className="text-2xl font-bold">{billingInfo.plan}</p>
            </div>
            <Badge variant={getStatusBadgeVariant(billingInfo.status)}>
              {billingInfo.status.charAt(0).toUpperCase() +
                billingInfo.status.slice(1)}
            </Badge>
          </div>

          <Separator />

          <div className="grid gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">{billingInfo.amount}/month</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current period ends</span>
              <span className="font-medium">{billingInfo.currentPeriodEnd}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button
              onClick={handleManageBilling}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Loading..." : "Manage Billing"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              You'll be redirected to Stripe's secure portal to manage your
              subscription, payment methods, and view invoices.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
