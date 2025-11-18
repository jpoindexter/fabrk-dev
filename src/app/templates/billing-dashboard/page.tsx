/**
 * Billing Dashboard Template
 * Complete billing interface with subscription, usage, payments, and invoices
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DemoNav } from "@/components/demo/demo-nav";
import {
  CreditCard,
  Download,
  TrendingUp,
  Users,
  Zap,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  ArrowUpRight,
  Calendar,
  DollarSign,
  FileText,
  Shield,
  Star,
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
  projects: { current: 23, limit: -1, percentage: 0 }, // -1 = unlimited
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
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_002",
    brand: "mastercard",
    last4: "5555",
    expMonth: 6,
    expYear: 2026,
    isDefault: false,
  },
];

const plans = [
  {
    name: "Free",
    price: 0,
    features: ["1 project", "3 team members", "Basic support"],
    current: false,
  },
  {
    name: "Professional",
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
    name: "Enterprise",
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
  const [activeTab, setActiveTab] = useState<"overview" | "plans" | "history">(
    "overview"
  );

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "succeeded":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "succeeded":
        return <Badge variant="default">Paid</Badge>;
      case "failed":
        return <Badge variant="accent">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Billing & Subscription
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your subscription, payments, and billing information
            </p>
          </div>
          <Button className="font-semibold">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Upgrade Plan
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b-2 border-border pb-2">
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            onClick={() => setActiveTab("overview")}
            className="font-semibold"
          >
            Overview
          </Button>
          <Button
            variant={activeTab === "plans" ? "default" : "ghost"}
            onClick={() => setActiveTab("plans")}
            className="font-semibold"
          >
            Plans & Pricing
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "ghost"}
            onClick={() => setActiveTab("history")}
            className="font-semibold"
          >
            Billing History
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Current Plan */}
            <Card className="border border-primary">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg border border-border bg-primary/10 p-3">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-semibold">
                        {subscription.plan} Plan
                      </CardTitle>
                      <CardDescription>
                        Active since {formatDate(subscription.startDate)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-semibold">
                      ${subscription.price}
                      <span className="text-lg text-muted-foreground">
                        /month
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Next billing: {formatDate(subscription.nextBillingDate)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subscription.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1 font-semibold">
                    <Calendar className="mr-2 h-4 w-4" />
                    Manage Subscription
                  </Button>
                  <Button variant="outline" className="flex-1 font-semibold">
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Upgrade to Enterprise
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Stats */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-semibold">Usage This Month</CardTitle>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Team Members</span>
                      <span>
                        {usage.users.current} / {usage.users.limit}
                      </span>
                    </div>
                    <Progress value={usage.users.percentage} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>Storage</span>
                      <span>
                        {usage.storage.current}
                        {usage.storage.unit} / {usage.storage.limit}
                        {usage.storage.unit}
                      </span>
                    </div>
                    <Progress value={usage.storage.percentage} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span>API Calls</span>
                      <span>
                        {usage.apiCalls.current.toLocaleString()} /{" "}
                        {usage.apiCalls.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={usage.apiCalls.percentage} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-semibold">Payment Methods</CardTitle>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-background font-semibold">
                          {method.brand === "visa" ? "💳" : "💵"}
                        </div>
                        <div>
                          <p className="font-semibold capitalize">
                            {method.brand} •••• {method.last4}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expMonth}/{method.expYear}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <Badge className="font-semibold">Default</Badge>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" className="w-full font-semibold">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Invoices Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-semibold">Recent Invoices</CardTitle>
                    <CardDescription>Last 3 billing transactions</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("history")}
                    className="font-semibold"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {payments.slice(0, 3).map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted p-4"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(payment.status)}
                        <div>
                          <p className="font-semibold">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(payment.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                        {getStatusBadge(payment.status)}
                        <Button variant="ghost" size="sm" className="font-semibold">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === "plans" && (
          <div className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="font-semibold">
                Changing your plan will take effect at the next billing cycle
              </AlertDescription>
            </Alert>

            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={
                    plan.current
                      ? "border border-primary"
                      : "border border-border"
                  }
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-semibold">{plan.name}</CardTitle>
                      {plan.current && (
                        <Badge className="font-semibold">Current Plan</Badge>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-4xl font-semibold">
                        ${plan.price}
                        <span className="text-lg text-muted-foreground">/mo</span>
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Separator />
                    <div className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm font-semibold">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="w-full font-semibold"
                      variant={plan.current ? "secondary" : "default"}
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="font-semibold">Need a Custom Plan?</CardTitle>
                <CardDescription>
                  Contact our sales team for custom pricing and features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="font-semibold">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-semibold">Billing History</CardTitle>
                    <CardDescription>
                      Complete payment and invoice history
                    </CardDescription>
                  </div>
                  <Button variant="outline" className="font-semibold">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Description</TableHead>
                        <TableHead className="font-semibold">Amount</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Invoice</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-semibold">
                            {formatDate(payment.date)}
                          </TableCell>
                          <TableCell>{payment.description}</TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(payment.amount)}
                          </TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="font-semibold">
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="font-semibold">
                All invoices are automatically emailed to your registered email
                address. Contact support if you need assistance.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Implementation Note */}
        <Card className="border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">💳 Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">
                ✓ 3-tab navigation (Overview, Plans & Pricing, Billing History)
              </li>
              <li className="font-semibold">
                ✓ Current subscription card with plan details and features
              </li>
              <li className="font-semibold">
                ✓ Usage metrics with progress bars (team, storage, API calls)
              </li>
              <li className="font-semibold">
                ✓ Payment methods management (add, remove, set default)
              </li>
              <li className="font-semibold">
                ✓ Recent invoices preview with download buttons
              </li>
              <li className="font-semibold">
                ✓ Plan comparison cards (Free, Pro, Enterprise)
              </li>
              <li className="font-semibold">
                ✓ Complete billing history table with status badges
              </li>
              <li className="font-semibold">
                ✓ Upgrade prompts and CTAs throughout
              </li>
              <li className="font-semibold">
                ✓ Stripe integration ready (add Stripe Customer Portal)
              </li>
              <li className="font-semibold">
                ✓ Invoice PDF download functionality (placeholder)
              </li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
              Connect to Stripe API for live data. See{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                src/app/(dashboard)/billing/
              </code>{" "}
              for integration examples.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
