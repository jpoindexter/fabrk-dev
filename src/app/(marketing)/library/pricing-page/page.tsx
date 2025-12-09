/**
 * FABRK COMPONENT
 * Pricing Page Template - Terminal console style
 * Production-ready
 */

'use client';

import { useState } from 'react';
import { PricingHeader } from './components/pricing-header';
import { PricingCards } from './components/pricing-cards';
import { ComparisonTable } from './components/comparison-table';
import { FAQSection } from './components/faq-section';
import { FeaturesCard } from './components/features-card';
import { plans, faqs, comparisonFeatures } from './components/pricing-data';
import { Card, CardHeader, TemplatePageHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "STARTER",
    description: "For individuals and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    badge: null,
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "48-hour support response",
      "1GB storage",
      "Community access",
    ],
    cta: "GET_STARTED",
    ctaVariant: "outline",
  },
  {
    id: "pro",
    name: "PRO",
    description: "For growing teams and businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    badge: "POPULAR",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response",
      "10GB storage",
      "API access",
      "Custom domains",
      "Up to 5 team members",
    ],
    cta: "START_PRO_TRIAL",
    ctaVariant: "default",
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    description: "For large organizations with custom needs",
    monthlyPrice: 99,
    yearlyPrice: 990,
    badge: null,
    features: [
      "Unlimited everything",
      "Enterprise analytics",
      "1-hour support response",
      "Unlimited storage",
      "Full API access",
      "Custom domains",
      "Unlimited team members",
      "SSO/SAML",
    ],
    cta: "CONTACT_SALES",
    ctaVariant: "outline",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8 space-y-12">
      {/* Header with billing toggle */}
      <div className="border border-border">
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            [ [0x00] PRICING_HEADER ]
          </span>
        </div>
        <div className="p-6 text-center space-y-4">
          <h1 className={cn(mode.font, "text-4xl font-semibold")}>Simple, Transparent Pricing</h1>
          <p className={cn(mode.font, "text-sm text-muted-foreground")}>
            Choose the plan that fits your needs
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn(mode.font, "text-xs", !isYearly && "text-foreground", isYearly && "text-muted-foreground")}>
              MONTHLY
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={\`relative h-6 w-11 border border-border \${isYearly ? "bg-primary" : "bg-muted"}\`}
            >
              <span className={\`absolute top-0.5 h-5 w-5 bg-background border border-border transition-transform \${isYearly ? "translate-x-5" : "translate-x-0.5"}\`} />
            </button>
            <span className={cn(mode.font, "text-xs", isYearly && "text-foreground", !isYearly && "text-muted-foreground")}>
              YEARLY
            </span>
            <Badge className={cn(mode.radius, mode.font, "text-xs")}>SAVE 17%</Badge>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="border border-border">
            <div className="border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">
                [ [0x01] {plan.name} ]
              </span>
            </div>
            <div className="p-6 space-y-6">
              {plan.badge && (
                <Badge className={cn(mode.radius, mode.font, "text-xs")}>{plan.badge}</Badge>
              )}
              <h3 className={cn(mode.font, "text-xl font-semibold")}>{plan.name}</h3>
              <p className={cn(mode.font, "text-xs text-muted-foreground")}>{plan.description}</p>

              <div className={cn(mode.font, "text-4xl font-semibold")}>
                \${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                <span className="text-sm text-muted-foreground">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <Button
                variant={plan.ctaVariant}
                className={cn(mode.radius, mode.font, "w-full text-xs")}
              >
                &gt; {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="text-success h-4 w-4 mt-0.5" />
                    <span className={cn(mode.font, "text-xs")}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="border border-border">
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            [ [0x02] FEATURE_COMPARISON ]
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className={cn(mode.font, "p-4 text-left text-xs font-semibold")}>Feature</th>
                <th className={cn(mode.font, "p-4 text-center text-xs font-semibold")}>STARTER</th>
                <th className={cn(mode.font, "p-4 text-center text-xs font-semibold")}>PRO</th>
                <th className={cn(mode.font, "p-4 text-center text-xs font-semibold")}>ENTERPRISE</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className={cn(mode.font, "p-4 text-xs")}>API Access</td>
                <td className="p-4 text-center"><X className="text-destructive h-4 w-4 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="text-success h-4 w-4 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="text-success h-4 w-4 mx-auto" /></td>
              </tr>
              {/* More rows... */}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border border-border">
        <div className="border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            [ [0x03] FREQUENTLY_ASKED_QUESTIONS ]
          </span>
        </div>
        <div className="p-6 space-y-4">
          <details className="border border-border">
            <summary className="cursor-pointer p-4 font-mono text-sm font-medium">
              Can I change plans later?
            </summary>
            <div className="border-t border-border p-4 font-mono text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time.
            </div>
          </details>
          {/* More FAQs... */}
        </div>
      </div>
    </div>
  );
}`;

function PricingPagePreview() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-background/50 min-h-[800px] p-4 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <PricingHeader isYearly={isYearly} onToggleBilling={setIsYearly} />
        <PricingCards plans={plans} isYearly={isYearly} />
        <ComparisonTable features={comparisonFeatures} />
        <FAQSection faqs={faqs} />
      </div>
    </div>
  );
}

export default function PricingPageTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="PRICING_PAGE"
          title="Pricing Page"
          description="Complete pricing page with plans, comparison table, and FAQs"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <PricingPagePreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock
                  code={templateCode}
                  language="tsx"
                  maxHeight="600px"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure & Features */}
        <FeaturesCard />
      </div>
    </div>
  );
}
