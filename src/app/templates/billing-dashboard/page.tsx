/**
 * ✅ FABRK COMPONENT
 * Billing Dashboard Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { ArrowUpRight } from "lucide-react";
import { TemplatePageHeader } from "@/components/ui/card";

// Extracted components
import { CurrentPlanCard } from "./components/current-plan-card";
import { UsageMetricsCard } from "./components/usage-metrics-card";
import { PaymentMethodsCard } from "./components/payment-methods-card";
import { RecentInvoicesCard } from "./components/recent-invoices-card";
import { PlanCards } from "./components/plan-cards";
import { BillingHistoryTable } from "./components/billing-history-table";
import { TemplateFeaturesCard } from "./components/template-features-card";
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

// Mock data
const subscription = {
  plan: "Professional",
  status: "active",
  price: 29,
  billingCycle: "monthly",
  nextBillingDate: "2024-12-15",
  startDate: "2024-01-15",
  features: [
    "Unlimited projects",
    "10 team members",
    "Priority support",
    "Advanced analytics",
    "Custom integrations",
  ],
};

const usage = {
  users: { current: 7, limit: 10, percentage: 70 },
  projects: { current: 23, limit: -1, percentage: 0 },
  storage: { current: 45, limit: 100, percentage: 45, unit: "GB" },
  apiCalls: { current: 12500, limit: 50000, percentage: 25 },
};

const payments = [
  {
    id: "inv_001",
    date: "2024-11-01",
    amount: 2900,
    status: "succeeded",
    description: "Professional Plan - November 2024",
  },
  {
    id: "inv_002",
    date: "2024-10-01",
    amount: 2900,
    status: "succeeded",
    description: "Professional Plan - October 2024",
  },
  {
    id: "inv_003",
    date: "2024-09-01",
    amount: 2900,
    status: "succeeded",
    description: "Professional Plan - September 2024",
  },
  {
    id: "inv_004",
    date: "2024-08-01",
    amount: 2900,
    status: "failed",
    description: "Professional Plan - August 2024",
  },
  {
    id: "inv_005",
    date: "2024-07-01",
    amount: 2900,
    status: "succeeded",
    description: "Professional Plan - July 2024",
  },
];

const paymentMethods = [
  {
    id: "pm_001",
    brand: "VISA",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_002",
    brand: "MASTERCARD",
    last4: "5555",
    expMonth: 6,
    expYear: 2026,
    isDefault: false,
  },
];

const plans = [
  {
    name: "FREE",
    price: 0,
    features: ["1 project", "3 team members", "Basic support"],
    current: false,
  },
  {
    name: "PROFESSIONAL",
    price: 29,
    features: ["Unlimited projects", "10 team members", "Priority support", "Advanced analytics"],
    current: true,
  },
  {
    name: "ENTERPRISE",
    price: 99,
    features: [
      "Unlimited everything",
      "Unlimited team",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    current: false,
  },
];

const tabs = [
  { id: "overview", label: "OVERVIEW" },
  { id: "plans", label: "PLANS" },
  { id: "history", label: "HISTORY" },
];

export default function BillingDashboardTemplate() {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount / 100);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr));
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "succeeded":
        return { text: "PAID", color: "text-success" };
      case "failed":
        return { text: "FAILED", color: "text-destructive" };
      default:
        return { text: "PENDING", color: "text-warning" };
    }
  };

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <TemplatePageHeader
            badge="BILLING_DASHBOARD"
            title="Billing & Subscription"
            description="Manage your subscription, payments, and billing information"
          />
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <ArrowUpRight className="mr-2 h-4 w-4" />
            &gt; UPGRADE_PLAN
          </Button>
        </div>

        {/* Terminal Tab Navigation */}
        <StyledTabs
          code="0x00"
          title="BILLING_NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Overview Tab */}
          <StyledTabsContent value="overview">
            <CurrentPlanCard subscription={subscription} formatDate={formatDate} />

            {/* Usage Stats and Payment Methods Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <UsageMetricsCard usage={usage} />
              <PaymentMethodsCard paymentMethods={paymentMethods} />
            </div>

            <RecentInvoicesCard
              payments={payments}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              getStatusText={getStatusText}
              onViewAll={() => setActiveTab("history")}
            />
          </StyledTabsContent>

          {/* Plans Tab */}
          <StyledTabsContent value="plans">
            <PlanCards plans={plans} />
          </StyledTabsContent>

          {/* History Tab */}
          <StyledTabsContent value="history">
            <BillingHistoryTable
              payments={payments}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              getStatusText={getStatusText}
            />
          </StyledTabsContent>
        </StyledTabs>

        {/* Implementation Note */}
        <TemplateFeaturesCard />
      </div>
    </div>
  );
}
