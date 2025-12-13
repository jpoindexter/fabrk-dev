'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { PlanSelector } from '@/components/ui/billing-summary-card';
import { AlertTriangle } from 'lucide-react';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    interval: 'month' as const,
    description: 'For individuals and small projects',
    features: ['5 projects', '1GB storage', 'Email support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month' as const,
    description: 'For growing teams',
    features: ['Unlimited projects', '10GB storage', 'Priority support', 'API access'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month' as const,
    description: 'For large organizations',
    features: [
      'Unlimited everything',
      '100GB storage',
      '24/7 support',
      'Custom integrations',
      'SLA',
    ],
  },
];

export default function PlanSelectorPage() {
  return (
    <>
      <div className="border-warning/50 bg-warning/10 mb-6 rounded-none border p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-warning h-5 w-5" />
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold">COMPONENT COMING SOON</p>
            <p className="text-muted-foreground text-sm">
              This component is planned for a future release. Documentation is provided as a
              preview. The implementation shown below demonstrates the intended functionality.
            </p>
          </div>
        </div>
      </div>
      <ComponentShowcaseTemplate
        code="[UI.109]"
        category="Specialized"
        title="Plan Selector"
        description="A pricing plan selection component for upgrade flows. Shows plan cards with features, popular badge, and selection state."
        importCode={`import { PlanSelector } from "@/components/ui/billing-summary-card"`}
        mainPreview={{
          preview: (
            <div className="p-4">
              <PlanSelector plans={plans} selectedPlanId="pro" onSelectPlan={() => {}} />
            </div>
          ),
          code: `const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    interval: "month",
    description: "For individuals",
    features: ["5 projects", "1GB storage", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    interval: "month",
    description: "For growing teams",
    features: ["Unlimited projects", "10GB storage", "Priority support"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "month",
    description: "For large organizations",
    features: ["Unlimited everything", "100GB storage", "24/7 support"],
  },
];

<PlanSelector
  plans={plans}
  selectedPlanId="pro"
  onSelectPlan={(id) => handleSelectPlan(id)}
/>`,
        }}
        variants={[
          {
            title: 'With Current Plan',
            description: 'Showing which plan is currently active.',
            preview: (
              <div className="p-4">
                <PlanSelector
                  plans={[{ ...plans[0], current: true }, plans[1], plans[2]]}
                  onSelectPlan={() => {}}
                />
              </div>
            ),
            code: `<PlanSelector
  plans={[
    { ...starterPlan, current: true },
    proPlan,
    enterprisePlan,
  ]}
  onSelectPlan={handleSelectPlan}
/>`,
          },
        ]}
        props={[
          {
            name: 'plans',
            type: 'PlanOption[]',
            required: true,
            description: 'Array of available plans.',
          },
          {
            name: 'selectedPlanId',
            type: 'string',
            description: 'Currently selected plan ID.',
          },
          {
            name: 'onSelectPlan',
            type: '(planId: string) => void',
            description: 'Plan selection handler.',
          },
        ]}
        usageExamples={[
          {
            title: 'PlanOption Interface',
            description: 'Structure of a plan option.',
            code: `interface PlanOption {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  description?: string;
  features: string[];
  popular?: boolean;   // Shows "POPULAR" badge
  current?: boolean;   // Shows "CURRENT" badge, disables button
}`,
            language: 'typescript',
          },
        ]}
        accessibility={[
          'Keyboard navigable plan cards',
          'Selected state indicated visually and with ARIA',
          'Popular badge readable by screen readers',
          'Focus visible states on all interactive elements',
        ]}
        previous={{
          title: 'Markdown Viewer',
          href: '/docs/components/markdown-viewer',
        }}
        next={{
          title: 'Prompt Builder',
          href: '/docs/components/prompt-builder',
        }}
      />
    </>
  );
}
