/**
 * ✅ FABRK COMPONENT
 * Pricing Section - Achromatic-style two-column layout
 * Production-ready ✓
 */
"use client";

import { Check, ArrowRight } from "lucide-react";
import config from "@/config";
import { motion } from "framer-motion";
import { H2, H3, Body, Small } from "@/components/ui/typography";
import { DiscountCounter } from "@/components/polar/discount-counter";
import { PolarCheckoutButton } from "@/components/polar/checkout-button";

export function PricingSection() {
  const features = [
    "All starter kits included",
    "All features included",
    "Lifetime access & updates",
    "Unlimited projects and developers",
    "Personal and commercial usage",
    "Saves you 200+ hours",
  ];

  return (
    <section
      id="pricing"
      className="scroll-mt-16 border-t border-border bg-background px-6 py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <Small className="mb-2 font-semibold uppercase tracking-wide text-primary">
              Starter
            </Small>
            <H2 className="mb-4">
              One-time purchase
              <br />
              <span className="text-muted-foreground">Unlimited projects</span>
            </H2>
            <Body className="mb-6 text-muted-foreground">
              Upon purchase, you can use the starter kits for personal and
              commercial projects with no restrictions on the number of
              developers or projects.{" "}
              <a href="/docs" className="text-primary underline underline-offset-4">
                Click here to download the boilerplate
              </a>
              .
            </Body>
            <Body className="text-muted-foreground">
              Fabrk is <strong>40-70% more affordable</strong> than comparable Next.js
              starter kits. There's no catch, we believe the lower price is fair and
              many shouldn't be hidden charges for basics.
            </Body>
          </motion.div>

          {/* Right Column - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="rounded-xl border border-border bg-card p-8">
              {/* Discount Badge */}
              <div className="mb-6">
                <DiscountCounter />
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-medium text-muted-foreground line-through">
                    {config.pricing.fabrk.display.original}
                  </span>
                  <span className="text-sm text-muted-foreground">→</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">
                    {config.pricing.fabrk.display.current}
                  </span>
                  <span className="text-muted-foreground">one-time payment</span>
                </div>
              </div>

              {/* CTA Button */}
              <PolarCheckoutButton className="mb-8 w-full gap-2">
                Get Lifetime Access <ArrowRight className="size-4" />
              </PolarCheckoutButton>

              {/* Features List */}
              <ul className="space-y-3">
                {features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={2} />
                    <Small className="text-foreground">{feature}</Small>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-4 text-center"
            >
              <Small className="text-muted-foreground">
                Secure checkout powered by Polar. All sales are final.
              </Small>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
