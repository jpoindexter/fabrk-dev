/**
 * ✅ FABRK COMPONENT
 * Pricing Section - Terminal console style card
 * Production-ready ✓
 */
"use client";

import { ArrowRight } from "lucide-react";
import config from "@/config";
import { motion } from "framer-motion";
import { DiscountCounter } from "@/components/polar/discount-counter";
import { PolarCheckoutButton } from "@/components/polar/checkout-button";

export function PricingSection() {
  const features = [
    "ALL_STARTER_KITS",
    "ALL_FEATURES",
    "LIFETIME_ACCESS_UPDATES",
    "UNLIMITED_PROJECTS",
    "PERSONAL_COMMERCIAL_USAGE",
    "SAVES_200_HOURS",
  ];

  return (
    <section
      id="pricing"
      className="scroll-mt-16 border-t border-border px-6 py-20 lg:py-28"
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
            <div className="mb-4 inline-block self-start border border-border bg-card px-4 py-1">
              <span className="font-mono text-xs text-muted-foreground">[ [0x40] PRICING ] COMMERCIAL_TIER │ FIB[144]</span>
            </div>

            <h2 className="mb-2 font-mono text-sm text-primary">FABRK_STARTER</h2>
            <h3 className="mb-6 font-mono text-3xl font-bold tracking-tight lg:text-4xl">
              ONE_TIME_PURCHASE.
              <br />
              <span className="text-muted-foreground">UNLIMITED_PROJECTS.</span>
            </h3>

            <div className="mb-6 border-l-2 border-border pl-4">
              <p className="font-mono text-sm text-muted-foreground">
                Upon purchase, you can use the starter kits for personal and
                commercial projects with no restrictions on the number of
                developers or projects.
              </p>
            </div>

            <div className="border border-border bg-card p-4">
              <span className="font-mono text-xs text-muted-foreground">[ NOTE ]─────────────────────────────────────</span>
              <span className="block mt-2 font-mono text-xs text-foreground">
                │ Fabrk is 40-70% more affordable than comparable
              </span>
              <span className="block font-mono text-xs text-foreground">
                │ Next.js starter kits. No hidden charges.
              </span>
              <span className="block mt-2 font-mono text-xs text-muted-foreground">└─────────────────────────────────────────────┘</span>
            </div>
          </motion.div>

          {/* Right Column - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Terminal Card */}
            <div className="border border-border bg-card">
              {/* Window Header */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-2">
                  <motion.div
                    className="size-2.5 rounded-full bg-destructive/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="size-2.5 rounded-full bg-warning/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="size-2.5 rounded-full bg-success/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
                <span className="font-mono text-xs text-muted-foreground">[0x41] pricing_config.exe │ PID:3142</span>
              </div>

              <div className="p-6">
                {/* Discount Badge */}
                <div className="mb-6">
                  <DiscountCounter />
                </div>

                {/* Price Display */}
                <div className="mb-6 border border-border p-4">
                  <div className="mb-2 font-mono text-xs text-muted-foreground">PRICE:</div>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-lg text-muted-foreground line-through">
                      {config.pricing.fabrk.display.original}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">→</span>
                    <span className="font-mono text-4xl font-bold text-foreground">
                      {config.pricing.fabrk.display.current}
                    </span>
                  </div>
                  <div className="mt-2 font-mono text-xs text-muted-foreground">
                    TERMS: SINGLE_PAYMENT
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6">
                  <div className="mb-4 font-mono text-xs text-muted-foreground">[ INCLUDES ]─────────────────────</div>
                  <div className="space-y-2">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                        viewport={{ once: true }}
                        className="font-mono text-xs"
                      >
                        <span className="text-success">&gt;</span>
                        <span className="ml-2 text-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <PolarCheckoutButton className="rounded-none w-full font-mono text-xs">
                  &gt; EXECUTE: GET_LIFETIME_ACCESS
                </PolarCheckoutButton>
              </div>
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-4"
            >
              <div className="border border-border bg-card p-4 text-center">
                <span className="font-mono text-xs text-muted-foreground">
                  [ [0x42] SECURE ] Checkout powered by Polar │ All sales final
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
