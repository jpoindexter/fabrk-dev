/**
 * FABRK COMPONENT
 * Pricing Page Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, X, HelpCircle } from "lucide-react";

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
    ctaVariant: "outline" as const,
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
    ctaVariant: "default" as const,
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
    ctaVariant: "outline" as const,
  },
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal and bank transfers for Enterprise plans.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Pro plan comes with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What happens when I exceed my limits?",
    answer:
      "We'll notify you when you're approaching limits. You can upgrade your plan or we'll work with you on a custom solution.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact support for a full refund.",
  },
];

const comparisonFeatures = [
  { name: "Projects", starter: "3", pro: "Unlimited", enterprise: "Unlimited" },
  { name: "Storage", starter: "1GB", pro: "10GB", enterprise: "Unlimited" },
  { name: "Team Members", starter: "1", pro: "5", enterprise: "Unlimited" },
  { name: "API Access", starter: false, pro: true, enterprise: true },
  { name: "Custom Domains", starter: false, pro: true, enterprise: true },
  { name: "Analytics", starter: "Basic", pro: "Advanced", enterprise: "Enterprise" },
  { name: "Support SLA", starter: "48h", pro: "24h", enterprise: "1h" },
  { name: "SSO/SAML", starter: false, pro: false, enterprise: true },
  { name: "Audit Logs", starter: false, pro: false, enterprise: true },
  { name: "Dedicated Account Manager", starter: false, pro: false, enterprise: true },
];

export default function PricingPageTemplate() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block border border-border px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: PRICING_PAGE
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="font-mono text-sm text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle - Terminal Style */}
          <div className="flex items-center justify-center gap-2 pt-4">
            <div className="inline-flex border border-border font-mono text-xs">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-4 py-2 transition-colors ${
                  !isYearly
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                [MONTHLY]
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-4 py-2 border-l border-border transition-colors ${
                  isYearly
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                [YEARLY]
              </button>
            </div>
            {isYearly && (
              <Badge className="rounded-none font-mono text-xs bg-success/20 text-success border-success/50">
                SAVE 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? "/year" : "/month";

            return (
              <div
                key={plan.id}
                className={`border bg-card flex flex-col ${
                  plan.badge ? "border-primary" : "border-border"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                  <div className="flex gap-1.5">
                    <div className="size-2 rounded-full bg-destructive/50" />
                    <div className="size-2 rounded-full bg-warning/50" />
                    <div className="size-2 rounded-full bg-success/50" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {plan.id}_plan.json
                  </span>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  {/* Plan Label */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-mono text-xs text-muted-foreground">
                      [{plan.name}]:
                    </div>
                    {plan.badge && (
                      <Badge className="rounded-none font-mono text-xs bg-primary text-primary-foreground">
                        {plan.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-3xl font-bold mb-4">
                    ${price}
                    <span className="text-lg text-muted-foreground font-normal">
                      {period}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="border-t border-border pt-4 mb-4 flex-1">
                    <div className="font-mono text-xs text-muted-foreground mb-2">
                      [FEATURES]:
                    </div>
                    <div className="space-y-1">
                      {plan.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 font-mono text-xs"
                        >
                          <span className="text-success">&gt;</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA - At bottom */}
                  <Button
                    variant={plan.ctaVariant}
                    className="w-full rounded-none font-mono text-xs"
                  >
                    &gt; {plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              comparison.csv
            </span>
          </div>

          <div className="p-4">
            <div className="font-mono text-xs text-muted-foreground mb-4">
              [FEATURE_COMPARISON]:
            </div>

            <div className="border border-border overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 text-muted-foreground">
                      [FEATURE]
                    </th>
                    <th className="text-center px-4 py-3 text-muted-foreground">
                      STARTER
                    </th>
                    <th className="text-center px-4 py-3 text-primary">PRO</th>
                    <th className="text-center px-4 py-3 text-muted-foreground">
                      ENTERPRISE
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisonFeatures.map((feature, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="px-4 py-3">{feature.name}</td>
                      <td className="text-center px-4 py-3">
                        {typeof feature.starter === "boolean" ? (
                          feature.starter ? (
                            <Check className="h-4 w-4 text-success mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          feature.starter
                        )}
                      </td>
                      <td className="text-center px-4 py-3">
                        {typeof feature.pro === "boolean" ? (
                          feature.pro ? (
                            <Check className="h-4 w-4 text-success mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          feature.pro
                        )}
                      </td>
                      <td className="text-center px-4 py-3">
                        {typeof feature.enterprise === "boolean" ? (
                          feature.enterprise ? (
                            <Check className="h-4 w-4 text-success mx-auto" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground mx-auto" />
                          )
                        ) : (
                          feature.enterprise
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">faq.md</span>
          </div>

          <div className="p-4">
            <div className="font-mono text-xs text-muted-foreground mb-4">
              [FREQUENTLY_ASKED_QUESTIONS]:
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border border-border"
                >
                  <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 hover:no-underline font-normal [&>svg]:text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      <span className="font-mono text-xs">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <p className="font-mono text-xs text-muted-foreground pl-6">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> 3-tier pricing cards with
                terminal styling
              </div>
              <div>
                <span className="text-success">&gt;</span> Monthly/yearly toggle with
                savings badge
              </div>
              <div>
                <span className="text-success">&gt;</span> Feature comparison table
              </div>
              <div>
                <span className="text-success">&gt;</span> Expandable FAQ accordion
              </div>
              <div>
                <span className="text-success">&gt;</span> Popular plan highlight
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive grid layout
              </div>
              <div>
                <span className="text-success">&gt;</span> Design token colors (no
                hardcoded values)
              </div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Connect to your payment provider (Stripe/Polar.sh) for live
              checkout.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
