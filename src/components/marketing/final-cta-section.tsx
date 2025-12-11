'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PricingCard } from '@/components/landing/pricing-card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

/**
 * Final CTA Section
 * Last push to convert visitors into customers
 * Features pricing card, urgency messaging, and primary CTA
 */
export function FinalCTASection() {
  return (
    <section className="border-border border-t py-20 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Messaging */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span
                className={cn(
                  'border-border bg-card inline-flex items-center gap-2 border px-3 py-1.5',
                  mode.radius,
                  mode.font
                )}
              >
                <Zap className={cn('size-3', mode.color.text.accent)} />
                <span className={cn('text-xs', mode.color.text.muted)}>[0x70] FINAL_CALL</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={cn('mb-6 text-4xl font-bold tracking-tight lg:text-5xl', mode.font)}
            >
              STOP WASTING TIME.
              <br />
              <span className={mode.color.text.accent}>START SHIPPING.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn('mb-8 text-base', mode.font, mode.color.text.muted)}
            >
              Every day you spend building auth, billing, and UI from scratch is another day your
              competitors get ahead. Fabrk gives you everything you need to launch fast and iterate
              faster.
            </motion.p>

            {/* Benefits List */}
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 space-y-3"
            >
              {[
                'Ship your MVP in days, not months',
                '60+ production-ready components',
                'Save 100+ hours of development time',
                'Lifetime updates, no subscription',
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className={cn('mt-0.5 size-4 shrink-0', mode.color.text.accent)} />
                  <span className={cn('text-sm', mode.font, mode.color.text.primary)}>
                    {benefit}
                  </span>
                </li>
              ))}
            </motion.ul>

            {/* Secondary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/docs/getting-started/installation">
                <Button variant="outline" size="sm" className={cn(mode.radius, mode.font)}>
                  &gt; VIEW_DOCS
                </Button>
              </Link>
              <Link href="/library">
                <Button variant="outline" size="sm" className={cn(mode.radius, mode.font)}>
                  &gt; EXPLORE_COMPONENTS
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Pricing Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <PricingCard variant="full" showFeatures={true} showDiscountCounter={true} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
