"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import config from "@/config";

const plans = [
  {
    name: "Starter",
    price: config.pricing.exampleTiers.starter.display,
    period: "one-time",
    description: "Perfect for individual developers",
    features: [
      "169+ production components",
      "Design token system",
      "TypeScript support",
      "Dark mode included",
      "Community support",
      "Lifetime updates",
    ],
  },
  {
    name: "Professional",
    price: config.pricing.exampleTiers.professional.display,
    period: "one-time",
    description: "Everything you need to build production apps",
    features: [
      "All production components",
      "Complete design system",
      "AI-optimized architecture",
      "Priority email support",
      "Discord community access",
      "Source code included",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: config.pricing.exampleTiers.enterprise.display,
    period: "one-time",
    description: "Advanced features for team collaboration",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Custom component requests",
      "Priority support (24h)",
      "Private Discord channel",
      "Commercial license",
    ],
  },
];

const staggerContainer = {
  initial: "initial",
  whileInView: "whileInView",
  viewport: { once: true, margin: "-150px" },
  variants: {
    whileInView: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
};

const pricingCard = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export function PricingSection() {
  return (
    <section className="border-t border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Choose your plan
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One-time payment. Lifetime updates. No subscriptions.
          </p>
        </motion.div>

        <motion.div className="mt-16 grid gap-8 lg:grid-cols-3" {...staggerContainer}>
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-lg border bg-background p-8 ${
                plan.popular ? "border-foreground" : "border-border"
              }`}
              variants={pricingCard}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                    Most Popular
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                  <span className="ml-2 text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center">
                      <Check className="size-4 text-foreground" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8 w-full"
                variant={plan.popular ? "primaryCta" : "secondaryCta"}
                disabled={plan.price === "$0"}
              >
                {plan.price === "$0" ? "Coming Soon" : "Get Fabrk Now"}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
