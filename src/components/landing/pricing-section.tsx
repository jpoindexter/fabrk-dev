/**
 * ✅ FABRK COMPONENT
 * Pricing Section - Terminal console style card
 * Production-ready ✓
 */
"use client";

import config from "@/config";
import { motion } from "framer-motion";
import { DiscountCounter } from "@/components/polar/discount-counter";
import { PolarCheckoutButton } from "@/components/polar/checkout-button";
import { WindowControls } from "@/components/ui/window-controls";
import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";

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
    <section id="pricing" className="border-border scroll-mt-16 border-t px-6 py-20 lg:py-28">
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
            <div
              className={cn(
                "border-border bg-card mb-4 inline-block self-start border px-4 py-1",
                mode.radius
              )}
            >
              <span className={cn("text-muted-foreground text-xs", mode.font)}>
                [ [0x40] PRICING ] COMMERCIAL_TIER │ FIB[144]
              </span>
            </div>

            <h2 className={cn("text-primary mb-2 text-sm", mode.font)}>FABRK_STARTER</h2>
            <h3 className={cn("mb-6 text-3xl font-bold tracking-tight lg:text-4xl", mode.font)}>
              ONE_TIME_PURCHASE.
              <br />
              <span className="text-muted-foreground">UNLIMITED_PROJECTS.</span>
            </h3>

            <div className="border-border mb-6 border-l-2 pl-4">
              <p className={cn("text-muted-foreground text-sm", mode.font)}>
                Upon purchase, you can use the starter kits for personal and commercial projects
                with no restrictions on the number of developers or projects.
              </p>
            </div>

            <div className={cn("border-border bg-card border p-4", mode.radius)}>
              <span className={cn("text-muted-foreground text-xs", mode.font)}>
                [ NOTE ]─────────────────────────────────────
              </span>
              <span className={cn("text-foreground mt-2 block text-xs", mode.font)}>
                │ Fabrk is 40-70% more affordable than comparable
              </span>
              <span className={cn("text-foreground block text-xs", mode.font)}>
                │ Next.js starter kits. No hidden charges.
              </span>
              <span className={cn("text-muted-foreground mt-2 block text-xs", mode.font)}>
                └─────────────────────────────────────────────┘
              </span>
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
            <div className={cn("border-border bg-card border", mode.radius)}>
              {/* Window Header */}
              <div className="border-border flex items-center gap-2 border-b px-4 py-2">
                <WindowControls size="sm" animated />
                <span className={cn("text-muted-foreground text-xs", mode.font)}>
                  [0x41] pricing_config.exe │ PID:3142
                </span>
              </div>

              <div className="p-6">
                {/* Discount Badge */}
                <div className="mb-6">
                  <DiscountCounter />
                </div>

                {/* Price Display */}
                <div className={cn("border-border mb-6 border p-4", mode.radius)}>
                  <div className={cn("text-muted-foreground mb-2 text-xs", mode.font)}>PRICE:</div>
                  <div className="flex items-baseline gap-4">
                    <span className={cn("text-muted-foreground text-lg line-through", mode.font)}>
                      {config.pricing.fabrk.display.original}
                    </span>
                    <span className={cn("text-muted-foreground text-xs", mode.font)}>→</span>
                    <span className={cn("text-foreground text-4xl font-bold", mode.font)}>
                      {config.pricing.fabrk.display.current}
                    </span>
                  </div>
                  <div className={cn("text-muted-foreground mt-2 text-xs", mode.font)}>
                    TERMS: SINGLE_PAYMENT
                  </div>
                </div>

                {/* Features List */}
                <div className="mb-6">
                  <div className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
                    [ INCLUDES ]─────────────────────
                  </div>
                  <div className="space-y-2">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                        viewport={{ once: true }}
                        className={cn("text-xs", mode.font)}
                      >
                        <span className="text-success">&gt;</span>
                        <span className="text-foreground ml-2">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <PolarCheckoutButton className={cn("w-full text-xs", mode.radius, mode.font)}>
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
              <div className={cn("border-border bg-card border p-4 text-center", mode.radius)}>
                <span className={cn("text-muted-foreground text-xs", mode.font)}>
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
