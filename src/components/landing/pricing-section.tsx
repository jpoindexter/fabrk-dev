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
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import {
  TerminalCard,
  TerminalCardHeader,
  TerminalCardContent,
  FeatureItem,
  FeatureList,
  InfoNote,
  TerminalBadge,
} from "@/components/ui/card";

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
    <section id="pricing" className="border-border scroll-mt-16 border-t px-6 py-20 lg:py-24">
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
            <TerminalBadge
              code="0x40"
              label="PRICING"
              meta="COMMERCIAL_TIER │ FIB[144]"
              className="mb-4 self-start"
            />

            <h2 className={cn("text-primary mb-2 text-sm", mode.font)}>FABRK_STARTER</h2>
            <h3 className={cn("mb-6 text-4xl font-semibold tracking-tight", mode.font)}>
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

            <TerminalCard size="auto">
              <TerminalCardContent padding="sm">
                <InfoNote label="NOTE" className="mt-0">
                  Fabrk is 40-70% more affordable than comparable Next.js starter kits. No hidden
                  charges.
                </InfoNote>
              </TerminalCardContent>
            </TerminalCard>
          </motion.div>

          {/* Right Column - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Terminal Card */}
            <TerminalCard size="auto">
              <TerminalCardHeader
                code="0x41"
                title="PRICING_CONFIG"
                meta="pricing_config.exe │ PID:3142"
              />
              <TerminalCardContent padding="lg">
                {/* Discount Badge */}
                <div className="mb-6">
                  <DiscountCounter />
                </div>

                {/* Price Display */}
                <TerminalCard size="auto" className="mb-6">
                  <TerminalCardContent padding="sm">
                    <div className={cn("text-muted-foreground mb-2 text-xs", mode.font)}>
                      PRICE:
                    </div>
                    <div className="flex items-baseline gap-4">
                      <span className={cn("text-muted-foreground text-lg line-through", mode.font)}>
                        {config.pricing.fabrk.display.original}
                      </span>
                      <span className={cn("text-muted-foreground text-xs", mode.font)}>→</span>
                      <span className={cn("text-foreground text-4xl font-semibold", mode.font)}>
                        {config.pricing.fabrk.display.current}
                      </span>
                    </div>
                    <div className={cn("text-muted-foreground mt-2 text-xs", mode.font)}>
                      TERMS: SINGLE_PAYMENT
                    </div>
                  </TerminalCardContent>
                </TerminalCard>

                {/* Features List */}
                <div className="mb-6">
                  <div className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
                    [ INCLUDES ]─────────────────────
                  </div>
                  <FeatureList>
                    {features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <FeatureItem>{feature}</FeatureItem>
                      </motion.div>
                    ))}
                  </FeatureList>
                </div>

                {/* CTA Button */}
                <PolarCheckoutButton className={cn("w-full text-xs", mode.radius, mode.font)}>
                  &gt; GET_LIFETIME_ACCESS
                </PolarCheckoutButton>
              </TerminalCardContent>
            </TerminalCard>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-4"
            >
              <TerminalBadge
                code="0x42"
                label="SECURE"
                meta="Checkout powered by Polar │ All sales final"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
