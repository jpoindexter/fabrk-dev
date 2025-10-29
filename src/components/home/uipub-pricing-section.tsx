/**
 * ✅ FABRK COMPONENT
 * Pricing Section - UI Pub Style
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "one-time",
    description: "Perfect for individual developers",
    features: [
      "169+ production components",
      "Design token system",
      "TypeScript support",
      "Community support",
      "Lifetime updates",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$199",
    period: "one-time",
    description: "For professional developers",
    features: [
      "All production components",
      "Complete design system",
      "AI-optimized architecture",
      "Priority support",
      "Private Discord",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$499",
    period: "one-time",
    description: "For teams building products",
    features: [
      "Everything in Professional",
      "Unlimited team members",
      "Custom components",
      "Priority support (24h)",
      "Dedicated channel",
    ],
    cta: "Get Started",
    popular: false,
  },
];

export function UIPubPricingSection() {
  return (
    <section className="border-t border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="mx-auto max-w-2xl text-center" {...fadeInUp}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            One-time payment. Lifetime updates. Early supporter pricing.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-3"
          {...fadeInUp}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-lg border bg-white p-8 ${
                plan.popular ? "border-foreground shadow-lg" : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-foreground px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-semibold text-foreground">
                      {plan.price}
                    </span>
                  </div>
                  <span className="mt-1 text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="size-5 shrink-0 text-foreground" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  plan.popular
                    ? "bg-foreground text-white hover:bg-card"
                    : plan.price === "Free"
                      ? "border border-border bg-white text-foreground hover:bg-muted"
                      : "bg-foreground text-white hover:bg-card"
                }`}
                disabled={plan.price === "Free"}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
