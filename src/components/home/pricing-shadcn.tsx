/**
 * ✅ FABRK COMPONENT
 * Pricing Section - Shadcn/ui style pricing cards
 * Production-ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for individual developers",
    features: [
      "169+ production-ready components",
      "Design token system",
      "TypeScript support",
      "Dark mode included",
      "Basic documentation",
      "Community support",
      "Lifetime updates",
    ],
    cta: "Get Starter",
    href: "/pricing",
    variant: "outline" as const,
  },
  {
    name: "Professional",
    price: "$199",
    description: "For professional developers",
    features: [
      "All production-ready components",
      "Complete design system",
      "AI-optimized architecture",
      "Full TypeScript support",
      "Comprehensive docs",
      "Priority email support",
      "Discord community access",
      "Lifetime updates",
      "Source code included",
    ],
    cta: "Get Professional",
    href: "/pricing",
    variant: "default" as const,
    popular: true,
    badge: "MOST POPULAR",
  },
  {
    name: "Enterprise",
    price: "$499",
    description: "For growing teams",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Custom component requests",
      "Priority support (24h response)",
      "Private Discord channel",
      "Video onboarding call",
      "Custom integration support",
      "Early access to new features",
      "Commercial license",
    ],
    cta: "Get Enterprise",
    href: "/pricing",
    variant: "outline" as const,
    badge: "BEST VALUE",
  },
];

export function PricingShadcn() {
  return (
    <section
      aria-label="Pricing plans"
      className="relative overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that&apos;s right for you. Always know what you&apos;ll pay.
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <Card
                className={`relative flex h-full flex-col border-border bg-white p-8 transition-shadow ${
                  plan.popular
                    ? "border-2 border-foreground shadow-xl hover:shadow-2xl"
                    : "border shadow-sm hover:shadow-xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{plan.name}</h3>
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    One-time payment • Lifetime access
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className="size-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.href} className="w-full">
                  <Button
                    variant={plan.variant}
                    size="lg"
                    className={`w-full ${
                      plan.variant === "default" ? "bg-foreground hover:bg-card" : ""
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            All plans include access to our{" "}
            <Link
              href="/components"
              className="font-medium text-foreground underline underline-offset-4"
            >
              component library
            </Link>{" "}
            and documentation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
