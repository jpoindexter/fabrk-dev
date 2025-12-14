/**
 * Billing Dashboard Template - Terminal console style
 */
'use client';

import { useState } from 'react';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { TemplateShowcasePage, TemplatePreviewWrapper } from '@/components/library';
import { CurrentPlanCard } from './components/current-plan-card';
import { UsageMetricsCard } from './components/usage-metrics-card';
import { PaymentMethodsCard } from './components/payment-methods-card';
import { RecentInvoicesCard } from './components/recent-invoices-card';
import { PlanCards } from './components/plan-cards';
import { BillingHistoryTable } from './components/billing-history-table';

const templateCode = `"use client";

import { useState } from "react";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { TemplatePageHeader } from "@/components/ui/card";
import { CurrentPlanCard } from "./components/current-plan-card";
import { UsageMetricsCard } from "./components/usage-metrics-card";
import { PaymentMethodsCard } from "./components/payment-methods-card";
import { RecentInvoicesCard } from "./components/recent-invoices-card";
import { PlanCards } from "./components/plan-cards";
import { BillingHistoryTable } from "./components/billing-history-table";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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

const tabs = [
  { id: "overview", label: "OVERVIEW" },
  { id: "plans", label: "PLANS" },
  { id: "history", label: "HISTORY" },
];

export default function BillingDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <TemplatePageHeader
          badge="BILLING DASHBOARD"
          title="Billing & Subscription"
          description="Manage your subscription, payments, and billing information"
        />
        <Button className={cn(mode.radius, mode.font, "text-xs")}>
          <ArrowUpRight className="mr-2 size-4" />
          &gt; UPGRADE PLAN
        </Button>
      </div>

      {/* Terminal Tab Navigation */}
      <StyledTabs
        code="0x00"
        title="BILLING NAVIGATION"
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        {/* Overview Tab */}
        <StyledTabsContent value="overview">
          <div className="space-y-6">
            {/* Two Column Layout */}
            <div className="grid gap-6 md:grid-cols-2">
              <UsageMetricsCard usage={usage} />
              <div className="space-y-6">
                <CurrentPlanCard subscription={subscription} />
                <PaymentMethodsCard />
              </div>
            </div>
            <RecentInvoicesCard />
          </div>
        </StyledTabsContent>

        {/* Plans Tab */}
        <StyledTabsContent value="plans">
          <PlanCards />
        </StyledTabsContent>

        {/* History Tab */}
        <StyledTabsContent value="history">
          <BillingHistoryTable />
        </StyledTabsContent>
      </StyledTabs>
    </div>
  );
}`;

// Mock data
const subscription = {
  plan: 'Professional',
  status: 'active',
  price: 29,
  billingCycle: 'monthly',
  nextBillingDate: '2024-12-15',
  startDate: '2024-01-15',
  features: [
    'Unlimited projects',
    '10 team members',
    'Priority support',
    'Advanced analytics',
    'Custom integrations',
  ],
};

const usage = {
  users: { current: 7, limit: 10, percentage: 70 },
  projects: { current: 23, limit: -1, percentage: 0 },
  storage: { current: 45, limit: 100, percentage: 45, unit: 'GB' },
  apiCalls: { current: 12500, limit: 50000, percentage: 25 },
};

const payments = [
  {
    id: 'inv_001',
    date: '2024-11-01',
    amount: 2900,
    status: 'succeeded',
    description: 'Professional Plan - November 2024',
  },
  {
    id: 'inv_002',
    date: '2024-10-01',
    amount: 2900,
    status: 'succeeded',
    description: 'Professional Plan - October 2024',
  },
  {
    id: 'inv_003',
    date: '2024-09-01',
    amount: 2900,
    status: 'succeeded',
    description: 'Professional Plan - September 2024',
  },
  {
    id: 'inv_004',
    date: '2024-08-01',
    amount: 2900,
    status: 'failed',
    description: 'Professional Plan - August 2024',
  },
  {
    id: 'inv_005',
    date: '2024-07-01',
    amount: 2900,
    status: 'succeeded',
    description: 'Professional Plan - July 2024',
  },
];

const paymentMethods = [
  {
    id: 'pm_001',
    brand: 'VISA',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: 'pm_002',
    brand: 'MASTERCARD',
    last4: '5555',
    expMonth: 6,
    expYear: 2026,
    isDefault: false,
  },
];

const plans = [
  {
    name: 'FREE',
    price: 0,
    features: ['1 project', '3 team members', 'Basic support'],
    current: false,
  },
  {
    name: 'PROFESSIONAL',
    price: 29,
    features: ['Unlimited projects', '10 team members', 'Priority support', 'Advanced analytics'],
    current: true,
  },
  {
    name: 'ENTERPRISE',
    price: 99,
    features: [
      'Unlimited everything',
      'Unlimited team',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    current: false,
  },
];

const tabs = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'plans', label: 'PLANS' },
  { id: 'history', label: 'HISTORY' },
];

function BillingPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateStr));
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'succeeded':
        return { text: 'PAID', color: 'text-success' };
      case 'failed':
        return { text: 'FAILED', color: 'text-destructive' };
      default:
        return { text: 'PENDING', color: 'text-warning' };
    }
  };

  return (
    <TemplatePreviewWrapper minHeight="600px">
      {/* Terminal Tab Navigation */}
      <StyledTabs
        code="0x00"
        title="BILLING NAVIGATION"
        tabs={tabs}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        {/* Overview Tab */}
        <StyledTabsContent value="overview">
          <div className="space-y-6">
            {/* Two Column Layout */}
            <div className="grid gap-6 md:grid-cols-2">
              <UsageMetricsCard usage={usage} />
              <div className="space-y-6">
                <CurrentPlanCard subscription={subscription} formatDate={formatDate} />
                <PaymentMethodsCard paymentMethods={paymentMethods} />
              </div>
            </div>

            <RecentInvoicesCard
              payments={payments}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              getStatusText={getStatusText}
              onViewAll={() => setActiveTab('history')}
            />
          </div>
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
    </TemplatePreviewWrapper>
  );
}

export default function BillingDashboardTemplate() {
  return (
    <TemplateShowcasePage
      badge="BILLING DASHBOARD"
      title="Billing & Subscription"
      description="Manage your subscription, payments, and billing information"
      templateId="billing-dashboard"
      preview={<BillingPreview />}
      code={templateCode}
      fileStructure={[
        { path: ['app/', '(dashboard)/', 'billing/page.tsx'], label: '← Copy template here' },
        { path: ['app/', '(dashboard)/billing/components/', 'current-plan-card.tsx'] },
        { path: ['app/', '(dashboard)/billing/components/', 'usage-metrics-card.tsx'] },
        { path: ['app/', '(dashboard)/billing/components/', 'payment-methods-card.tsx'] },
      ]}
      features={[
        'Current plan overview with next billing date',
        'Usage metrics (users, projects, storage, API calls)',
        'Payment methods management',
        'Recent invoices with status',
        'Plan comparison cards',
        'Full billing history table',
        'Responsive mobile-first design',
      ]}
    />
  );
}
