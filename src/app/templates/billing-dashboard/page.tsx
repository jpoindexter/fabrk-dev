/**
 * ✅ FABRK COMPONENT
 * Billing Dashboard Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CreditCard,
  Download,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  ArrowUpRight,
  Star,
  HardDrive,
  Zap,
} from "lucide-react";

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
    features: [
      "Unlimited projects",
      "10 team members",
      "Priority support",
      "Advanced analytics",
    ],
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

export default function BillingDashboardTemplate() {
  const [activeTab, setActiveTab] = useState<"overview" | "plans" | "history">("overview");

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
 <div >
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: BILLING_DASHBOARD</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Billing & Subscription
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              Manage your subscription, payments, and billing information
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            &gt; UPGRADE_PLAN
          </Button>
        </div>

        {/* Terminal Tab Navigation */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">billing_nav.tsx</span>
          </div>
          <div className="flex border-b border-border font-mono text-xs">
            {(["overview", "plans", "history"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 border-r border-border transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Current Plan - Terminal Style */}
            <div className="border border-primary bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">subscription.config</span>
                <span className="ml-auto border border-success/50 px-2 py-0.5 font-mono text-xs text-success">
                  ACTIVE
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs text-muted-foreground mb-2">[CURRENT_PLAN]:</div>
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">{subscription.plan}</span>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground">
                      STARTED: {formatDate(subscription.startDate)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      ${subscription.price}
                      <span className="text-lg text-muted-foreground font-normal">/mo</span>
                    </div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      NEXT_BILLING: {formatDate(subscription.nextBillingDate)}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="font-mono text-xs text-muted-foreground mb-3">[FEATURES]:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {subscription.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-success">&gt;</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
                    &gt; MANAGE_SUBSCRIPTION
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
                    &gt; UPGRADE_TO_ENTERPRISE
                  </Button>
                </div>
              </div>
            </div>

            {/* Usage Stats - Terminal Style */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-destructive/50" />
                    <div className="size-2 rounded-full bg-warning/50" />
                    <div className="size-2 rounded-full bg-success/50" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">usage_metrics.log</span>
                </div>
                <div className="p-4">
                  <div className="font-mono text-xs text-muted-foreground mb-4">[USAGE_THIS_MONTH]:</div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="flex items-center gap-2">
                          <Users className="h-3 w-3" />
                          TEAM_MEMBERS
                        </span>
                        <span>{usage.users.current} / {usage.users.limit}</span>
                      </div>
                      <Progress value={usage.users.percentage} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="flex items-center gap-2">
                          <HardDrive className="h-3 w-3" />
                          STORAGE
                        </span>
                        <span>{usage.storage.current}{usage.storage.unit} / {usage.storage.limit}{usage.storage.unit}</span>
                      </div>
                      <Progress value={usage.storage.percentage} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="flex items-center gap-2">
                          <Zap className="h-3 w-3" />
                          API_CALLS
                        </span>
                        <span>{usage.apiCalls.current.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}</span>
                      </div>
                      <Progress value={usage.apiCalls.percentage} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="border border-border bg-card">
                <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-destructive/50" />
                    <div className="size-2 rounded-full bg-warning/50" />
                    <div className="size-2 rounded-full bg-success/50" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">payment_methods.json</span>
                </div>
                <div className="p-4">
                  <div className="font-mono text-xs text-muted-foreground mb-4">[PAYMENT_METHODS]:</div>

                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="flex items-center justify-between border border-border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center border border-border bg-muted">
                            <CreditCard className="h-4 w-4" />
                          </div>
                          <div className="rounded-none font-mono text-xs">
                            <div>{method.brand} **** {method.last4}</div>
                            <div className="text-muted-foreground">
                              EXP: {method.expMonth}/{method.expYear}
                            </div>
                          </div>
                        </div>
                        {method.isDefault && (
                          <span className="border border-primary/50 px-2 py-0.5 font-mono text-xs text-primary">
                            DEFAULT
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" size="sm" className="rounded-none w-full mt-4 font-mono text-xs">
                    <Plus className="mr-2 h-3 w-3" />
                    &gt; ADD_PAYMENT_METHOD
                  </Button>
                </div>
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">recent_invoices.log</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab("history")}
                  className="ml-auto font-mono text-xs h-6 rounded-none"
                >
                  &gt; VIEW_ALL
                </Button>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-4">[RECENT_INVOICES]: LIMIT=3</div>

                <div className="space-y-2">
                  {payments.slice(0, 3).map((payment) => {
                    const status = getStatusText(payment.status);
                    return (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between border border-border p-3 font-mono text-xs"
                      >
                        <div className="flex items-center gap-3">
                          {payment.status === "succeeded" ? (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          ) : payment.status === "failed" ? (
                            <XCircle className="h-4 w-4 text-destructive" />
                          ) : (
                            <Clock className="h-4 w-4 text-warning" />
                          )}
                          <div>
                            <div>{payment.description}</div>
                            <div className="text-muted-foreground">{formatDate(payment.date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>{formatCurrency(payment.amount)}</span>
                          <span className={`border px-2 py-0.5 ${status.color} ${
                            payment.status === "succeeded" ? "border-success/50" :
                            payment.status === "failed" ? "border-destructive/50" : "border-warning/50"
                          }`}>
                            {status.text}
                          </span>
                          <button className="hover:text-foreground text-muted-foreground">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === "plans" && (
          <div className="space-y-6">
            {/* Alert */}
            <div className="border border-warning bg-warning/10 p-4 font-mono text-xs">
              <span className="font-bold text-warning-foreground">[WARNING]:</span> <span className="text-foreground">Changing your plan will take effect at the next billing cycle</span>
            </div>

            {/* Plan Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border bg-card flex flex-col ${plan.current ? "border-primary" : "border-border"}`}
                >
                  <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                    <div className="flex gap-1.5">
                      <div className="size-2 rounded-full bg-destructive/50" />
                      <div className="size-2 rounded-full bg-warning/50" />
                      <div className="size-2 rounded-full bg-success/50" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{plan.name.toLowerCase()}_plan.json</span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-mono text-xs text-muted-foreground">[{plan.name}]:</div>
                      {plan.current && (
                        <span className="border border-primary/50 px-2 py-0.5 font-mono text-xs text-primary">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <div className="text-3xl font-bold mb-4">
                      ${plan.price}
                      <span className="text-lg text-muted-foreground font-normal">/mo</span>
                    </div>

                    <div className="border-t border-border pt-4 mb-4 flex-1">
                      <div className="font-mono text-xs text-muted-foreground mb-2">[FEATURES]:</div>
                      <div className="space-y-1">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 font-mono text-xs">
                            <span className="text-success">&gt;</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      className="w-full font-mono text-xs rounded-none"
                      variant={plan.current ? "outline" : "default"}
                      disabled={plan.current}
                    >
                      {plan.current ? "CURRENT_PLAN" : `> SELECT_${plan.name}`}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Plan */}
            <div className="border border-border bg-card p-4">
              <div className="font-mono text-xs text-muted-foreground mb-2">[CUSTOM_PLAN]:</div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-sm">Need a custom plan?</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    Contact our sales team for custom pricing and features
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-none font-mono text-xs">
                  &gt; CONTACT_SALES
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">billing_history.log</span>
                <Button variant="outline" size="sm" className="rounded-none ml-auto font-mono text-xs h-7">
                  <Download className="mr-2 h-3 w-3" />
                  &gt; EXPORT_ALL
                </Button>
              </div>

              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-4">
                  [BILLING_HISTORY]: COUNT={payments.length}
                </div>

                {/* Terminal Table */}
                <div className="border border-border">
                  <div className="grid grid-cols-5 border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs">
                    <span className="text-muted-foreground">[DATE]</span>
                    <span className="text-muted-foreground col-span-2">[DESCRIPTION]</span>
                    <span className="text-muted-foreground">[AMOUNT]</span>
                    <span className="text-muted-foreground">[STATUS]</span>
                  </div>
                  <div className="divide-y divide-border">
                    {payments.map((payment) => {
                      const status = getStatusText(payment.status);
                      return (
                        <div key={payment.id} className="grid grid-cols-5 px-4 py-3 font-mono text-xs hover:bg-muted/30 items-center">
                          <span>{formatDate(payment.date)}</span>
                          <span className="col-span-2 text-muted-foreground">{payment.description}</span>
                          <span>{formatCurrency(payment.amount)}</span>
                          <div className="flex items-center gap-2">
                            <span className={`border px-2 py-0.5 ${status.color} ${
                              payment.status === "succeeded" ? "border-success/50" :
                              payment.status === "failed" ? "border-destructive/50" : "border-warning/50"
                            }`}>
                              {status.text}
                            </span>
                            <button className="hover:text-foreground text-muted-foreground">
                              <Download className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="border border-border bg-card p-4 font-mono text-xs">
              <span className="text-muted-foreground">[INFO]:</span> All invoices are automatically emailed to your registered email address. Contact support if you need assistance.
            </div>
          </div>
        )}

        {/* Implementation Note */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">features.md</span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div><span className="text-success">&gt;</span> 3-tab navigation (Overview, Plans & Pricing, Billing History)</div>
              <div><span className="text-success">&gt;</span> Current subscription card with plan details and features</div>
              <div><span className="text-success">&gt;</span> Usage metrics with progress bars (team, storage, API calls)</div>
              <div><span className="text-success">&gt;</span> Payment methods management (add, remove, set default)</div>
              <div><span className="text-success">&gt;</span> Recent invoices preview with download buttons</div>
              <div><span className="text-success">&gt;</span> Plan comparison cards (Free, Pro, Enterprise)</div>
              <div><span className="text-success">&gt;</span> Complete billing history table with status badges</div>
              <div><span className="text-success">&gt;</span> Stripe integration ready</div>
              <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Connect to Stripe API for live data.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
