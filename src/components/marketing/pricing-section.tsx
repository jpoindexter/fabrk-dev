/**
 * ✅ FABRK COMPONENT
 * Pricing Section - Terminal console style card
 * Production-ready ✓
 */
'use client';

import config from '@/config/app';
import { motion } from 'framer-motion';
import { DiscountCounter } from '@/components/polar/discount-counter';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  Card,
  CardHeader,
  CardContent,
  FeatureItem,
  FeatureList,
  InfoNote,
  Badge,
} from '@/components/ui/card';

export function PricingSection() {
  const features = [
    '60+ PRODUCTION-READY COMPONENTS',
    'AUTH, BILLING & MULTI-TENANCY',
    'LIFETIME UPDATES (NO SUBSCRIPTION)',
    'UNLIMITED PROJECTS & CLIENTS',
    'COMMERCIAL LICENSE INCLUDED',
    'SAVE 100+ HOURS OF DEVELOPMENT',
    'PREMIUM SUPPORT & DOCUMENTATION',
    'WCAG 2.1 AA ACCESSIBLE',
  ];

  return (
    <section
      id="pricing"
      className={cn('scroll-mt-16 border-t px-6 py-20 lg:py-24', mode.color.border.default)}
    >
      <div className="mx-auto max-w-7xl">
        {/* Two Column Layout */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            {/* Terminal Card */}
            <Card size="auto" className="w-full max-w-sm">
              <CardHeader code="0x41" title="PRICING CONFIG" />
              <CardContent padding="md">
                {/* Price Display - Clean inline layout */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className={cn('text-sm line-through', mode.color.text.muted, mode.font)}>
                      {config.pricing.fabrk.display.original}
                    </span>
                    <span className={cn('text-xs', mode.color.text.muted, mode.font)}>→</span>
                    <span
                      className={cn('text-2xl font-semibold', mode.color.text.primary, mode.font)}
                    >
                      {config.pricing.fabrk.display.current}
                    </span>
                  </div>
                  <div className={cn('mt-1 text-xs', mode.color.text.muted, mode.font)}>
                    ONE TIME PAYMENT
                  </div>
                </div>

                {/* Discount Counter */}
                <DiscountCounter />

                {/* Features List */}
                <div className="mt-4 mb-4">
                  <div className={cn('mb-3 text-xs', mode.color.text.muted, mode.font)}>
                    [INCLUDES]:
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
                <PolarCheckoutButton
                  className={cn('w-full text-xs sm:text-sm', mode.radius, mode.font)}
                >
                  &gt; BUY NOW — {config.pricing.fabrk.display.current}
                </PolarCheckoutButton>

                {/* Trust line */}
                <div className={cn('mt-3 text-center text-xs', mode.color.text.muted, mode.font)}>
                  Secure checkout via Polar │ All sales final
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <Badge
              code="0x40"
              label="PRICING"
              meta="COMMERCIAL TIER │ FIB[144]"
              className="mb-4 self-start"
            />

            <h2 className={cn('mb-2 text-sm', mode.color.text.accent, mode.font)}>
              [FABRK STARTER]
            </h2>
            <h3 className={cn('mb-6 text-4xl font-semibold tracking-tight', mode.font)}>
              ONE-TIME PURCHASE.
              <br />
              <span className={mode.color.text.muted}>UNLIMITED PROJECTS.</span>
            </h3>

            <div className={cn('mb-6 border-l-2 pl-4', mode.color.border.default)}>
              <p className={cn('text-sm', mode.color.text.muted, mode.font)}>
                Upon purchase, you can use the starter kits for personal and commercial projects
                with no restrictions on the number of developers or projects.
              </p>
            </div>

            <Card size="auto">
              <CardContent padding="sm">
                <InfoNote label="NOTE" className="mt-0">
                  Fabrk is 40-70% more affordable than comparable Next.js starter kits. No hidden
                  charges.
                </InfoNote>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
