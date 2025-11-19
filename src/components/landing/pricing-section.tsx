"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import { useCheckout } from "@/hooks/use-checkout";
import config from "@/config";
import { motion } from "framer-motion";
import { logger } from "@/lib/logger";

export function PricingSection() {
  const { createCheckoutSession, isLoading, error } = useCheckout();

  // Use the Starter tier price from environment
  const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || "";

  const features = [
    "Next.js 15 Boilerplate",
    "Lifetime Updates",
    "Unlimited Projects",
    "Access to Private Discord",
    "Full Source Code",
  ];

  const handleCheckout = () => {
    if (priceId) {
      createCheckoutSession(priceId);
    } else {
      logger.error("No price ID configured");
    }
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-16 bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-2 text-center text-3xl font-semibold text-foreground"
        >
          One Price. Unlimited Projects. Launch Now.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-lg text-muted-foreground"
        >
          No subscriptions, no recurring fees. Pay once, use forever.
        </motion.p>

        {/* Pricing Card */}
        <div className="mx-auto mt-16 max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-lg border border-border bg-card p-10 shadow-md"
          >
            {/* Plan Name */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-6 text-center"
            >
              <Badge variant="default" size="lg" className="uppercase">
                Lifetime Deal
              </Badge>
            </motion.div>

            {/* Scarcity Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-4 text-center"
            >
              <Badge variant="destructive" size="lg">
                🔥 $100 OFF - First 500 Customers Only
              </Badge>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 text-center"
            >
              <div className="mb-2 flex items-center justify-center gap-3">
                <span className="text-5xl font-semibold text-foreground">{config.pricing.product.display.current}</span>
                <span className="text-xl font-medium text-muted-foreground line-through">
                  {config.pricing.product.display.original}
                </span>
              </div>
              <p className="text-base font-normal text-muted-foreground">
                Pay once, use forever. <span className="font-medium text-foreground">$0 recurring fees.</span>
              </p>
            </motion.div>

            {/* Features List */}
            <ul className="mb-8 space-y-3">
              {features.map((feature, idx) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <Check className="h-5 w-5 shrink-0 text-primary" strokeWidth={2} />
                  <span className="font-normal text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm font-medium text-destructive">
                {error}
              </div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={isLoading || !priceId}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Buy Now & Ship Faster"
                )}
              </Button>
            </motion.div>

            {/* Final Sale Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
              className="mt-6 text-center text-sm font-normal text-muted-foreground"
            >
              All sales are final. Digital product - no refunds after download.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
