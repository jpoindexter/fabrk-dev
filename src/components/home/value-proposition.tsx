/**
 * ✅ FABRK COMPONENT
 * Value Proposition - DIY vs Fabrk comparison with ROI calculation
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { H2, H3, H4, Body, Small, Strong } from "@/components/ui/typography";
import Link from "next/link";

const COMPARISON_ITEMS = [
  {
    feature: "Authentication System",
    description: "Email/password, OAuth, 2FA, sessions",
    diy: { time: "5-7 days", cost: "$2,500-$3,500" },
    fabrk: "Included",
  },
  {
    feature: "Stripe Payments",
    description: "One-time payments, subscriptions, webhooks",
    diy: { time: "3-5 days", cost: "$1,500-$2,500" },
    fabrk: "Included",
  },
  {
    feature: "Database & ORM",
    description: "PostgreSQL, Prisma, migrations",
    diy: { time: "2-3 days", cost: "$1,000-$1,500" },
    fabrk: "Included",
  },
  {
    feature: "Real-Time Features",
    description: "Notifications, activity feeds, presence",
    diy: { time: "4-6 days", cost: "$2,000-$3,000" },
    fabrk: "Included",
  },
  {
    feature: "Multi-Tenancy",
    description: "Organizations, RBAC, data isolation",
    diy: { time: "6-8 days", cost: "$3,000-$4,000" },
    fabrk: "Included",
  },
  {
    feature: "Admin Dashboard",
    description: "User management, analytics, monitoring",
    diy: { time: "4-5 days", cost: "$2,000-$2,500" },
    fabrk: "Included",
  },
  {
    feature: "API System",
    description: "API keys, permissions, webhooks",
    diy: { time: "5-7 days", cost: "$2,500-$3,500" },
    fabrk: "Included",
  },
  {
    feature: "Email System",
    description: "Transactional emails, queues, templates",
    diy: { time: "2-3 days", cost: "$1,000-$1,500" },
    fabrk: "Included",
  },
  {
    feature: "UI Component Library",
    description: "87 production components with variants",
    diy: { time: "10-15 days", cost: "$5,000-$7,500" },
    fabrk: "Included",
  },
  {
    feature: "Testing Suite",
    description: "130+ tests, Type Safe",
    diy: { time: "5-7 days", cost: "$2,500-$3,500" },
    fabrk: "Included",
  },
  {
    feature: "Documentation",
    description: "400KB guides, API docs, examples",
    diy: { time: "3-5 days", cost: "$1,500-$2,500" },
    fabrk: "Included",
  },
  {
    feature: "Deployment Setup",
    description: "CI/CD, Docker, Vercel setup",
    diy: { time: "2-3 days", cost: "$1,000-$1,500" },
    fabrk: "Included",
  },
];

const TIMELINE_COMPARISON = [
  {
    label: "DIY Approach",
    weeks: 8,
    breakdown: [
      "Week 1-2: Setup & auth",
      "Week 2-3: Payments",
      "Week 3-4: Database & multi-tenancy",
      "Week 4-5: Real-time features",
      "Week 5-6: Admin dashboard",
      "Week 6-7: Testing & debugging",
      "Week 7-8: Deployment & docs",
    ],
  },
  {
    label: "Fabrk Approach",
    weeks: 2,
    breakdown: [
      "Day 1-2: Setup & customization",
      "Day 3-4: Brand & features",
      "Day 5-7: Testing & refinement",
      "Week 2+: Focus on differentiation",
    ],
  },
];

export function ValueProposition() {
  const totalDIYTime = COMPARISON_ITEMS.reduce((sum, item) => {
    const daysMatch = item.diy.time.match(/(\d+)/);
    const days = daysMatch ? parseInt(daysMatch[0]) : 0;
    return sum + days;
  }, 0);

  const totalDIYCost = COMPARISON_ITEMS.reduce((sum, item) => {
    const costMatch = item.diy.cost.match(/\$([0-9,]+)-\$([0-9,]+)/);
    if (costMatch) {
      const min = parseInt(costMatch[1].replace(",", ""));
      const max = parseInt(costMatch[2].replace(",", ""));
      return sum + (min + max) / 2;
    }
    return sum;
  }, 0);

  const roi = totalDIYCost / 199;

  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <H2 className="mb-4">The Real Cost of DIY</H2>
            <Body className="mx-auto max-w-2xl">
              Build it yourself or use Fabrk? Here's the financial breakdown.
            </Body>
          </div>

          {/* Feature Comparison Table */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">DIY Time</th>
                  <th className="px-6 py-4 text-center font-semibold">DIY Cost</th>
                  <th className="px-6 py-4 text-center font-semibold">Fabrk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMPARISON_ITEMS.map((item, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.02 }}
                    className="hover:bg-muted/30"
                  >
                    <td className="px-6 py-4">
                      <Strong className="block">{item.feature}</Strong>
                      <Small className="text-muted-foreground">{item.description}</Small>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Small className="text-foreground">{item.diy.time}</Small>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Small className="text-foreground">{item.diy.cost}</Small>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto size-5 text-success" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ROI Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg border border-border bg-card p-8"
          >
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="text-4xl font-bold text-primary">{Math.round(totalDIYTime)} days</div>
                <Small className="block mt-2 text-muted-foreground">Total dev time for DIY</Small>
                <Small className="block mt-1 text-muted-foreground">That's 2 months of development</Small>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">
                  ${Math.round(totalDIYCost / 1000)}K
                </div>
                <Small className="block mt-2 text-muted-foreground">Total cost for DIY</Small>
                <Small className="block mt-1 text-muted-foreground">At $50-75/hr developer salary</Small>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">{Math.round(roi)}x ROI</div>
                <Small className="block mt-2 text-muted-foreground">Return on $199 investment</Small>
                <Small className="block mt-1 text-muted-foreground">Pays for itself in first week</Small>
              </div>
            </div>
          </motion.div>

          {/* Timeline Comparison */}
          <div>
            <H3 className="mb-6">Timeline Comparison</H3>
            <div className="grid gap-6 md:grid-cols-2">
              {TIMELINE_COMPARISON.map((approach, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-lg border border-border bg-card p-6"
                >
                  <div className="mb-4 flex items-baseline justify-between">
                    <H4>{approach.label}</H4>
                    <span className="text-3xl font-bold text-primary">
                      {approach.weeks} {approach.weeks === 1 ? "week" : "weeks"}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(approach.weeks / 8) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="h-full bg-primary"
                    />
                  </div>

                  <ul className="space-y-2">
                    {approach.breakdown.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        <Small className="text-muted-foreground">{item}</Small>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg border border-border bg-card p-8"
          >
            <H3 className="mb-4">Key Takeaways</H3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-success" />
                <div>
                  <Strong className="block">Ship 6 weeks faster</Strong>
                  <Small className="block text-muted-foreground">
                    Get to market faster, validate product-market fit sooner
                  </Small>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-success" />
                <div>
                  <Strong className="block">Save $30K+ in dev costs</Strong>
                  <Small className="block text-muted-foreground">
                    $300 investment replaces months of expensive engineering
                  </Small>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-success" />
                <div>
                  <Strong className="block">Production-ready from day 1</Strong>
                  <Small className="block text-muted-foreground">
                    931+ tests, documentation, and security best practices included
                  </Small>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-1 size-5 shrink-0 text-success" />
                <div>
                  <Strong className="block">Focus on your differentiation</Strong>
                  <Small className="block text-muted-foreground">
                    Use your dev time to build unique features, not boilerplate
                  </Small>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card p-8 text-center sm:flex-row"
          >
            <div>
              <Body className="font-semibold">Ready to ship faster?</Body>
              <Small className="block text-muted-foreground">
                Get Fabrk and save 6 weeks + $30K in dev costs
              </Small>
            </div>
            <Button asChild size="lg">
              <Link href="/pricing">Get Started - $199</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
