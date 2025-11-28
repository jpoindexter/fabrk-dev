/* 💡 COPY TIP: This is your main landing page hero section.
 * Update the headline and sub-headline to match your product's value proposition.
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1, Lead, Strong } from "@/components/ui/typography";
import { PolarCheckoutButton } from "@/components/polar/checkout-button";
import { DiscountCounter } from "@/components/polar/discount-counter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Hero Content */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <H1 className="mb-6">
              Building your SaaS just got unfairly easy
            </H1>
          </motion.div>

          {/* Sub-headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Lead className="mx-auto mb-10 max-w-2xl text-muted-foreground">
              Why spend valuable time tackling auth, billing, emails, organizations,
              invites and onboarding? Focus on your business and skip the noise.
            </Lead>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <PolarCheckoutButton className="text-base">
              Explore Starter Kits
            </PolarCheckoutButton>
            <Button variant="outline" asChild>
              <Link href="/docs" className="gap-2">
                See Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Discount Counter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <DiscountCounter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
