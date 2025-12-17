/**
 * ✅ FABRK COMPONENT
 * PricingCard - Reusable pricing display component
 * Removes 3× duplication (Hero, PricingSection, ExitIntentPopup)
 * Production-ready ✓
 */
'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, FeatureItem, FeatureList } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { DiscountCounter } from '@/components/polar/discount-counter';
import { PRICING } from '@/data/landing/pricing';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  variant?: 'full' | 'cta'; // full = section display, cta = hero/popup display
  showFeatures?: boolean;
  showDiscountCounter?: boolean;
  className?: string;
}

export function PricingCard({
  variant = 'full',
  showFeatures = true,
  showDiscountCounter = true,
  className,
}: PricingCardProps) {
  return (
    <Card size="auto" className={cn('w-full max-w-sm', className)}>
      <CardHeader code="0x41" title="PRICING CONFIG" />
      <CardContent padding="md">
        {/* Price Display */}
        <div className="mb-4">
          <div className="flex items-baseline gap-4">
            <span className={cn('text-sm line-through', mode.color.text.muted, mode.font)}>
              {PRICING.display.regular}
            </span>
            <span className={cn('text-sm', mode.color.text.muted, mode.font)}>→</span>
            <span
              className={cn(
                'text-6xl leading-none font-bold lg:text-8xl',
                mode.color.text.primary,
                mode.font
              )}
            >
              {PRICING.display.launch}
            </span>
          </div>
          <div className={cn('mt-4 text-sm', mode.color.text.muted, mode.font)}>
            ONE TIME PAYMENT
          </div>
        </div>

        {/* Discount Counter - disabled for testing */}
        {/* {variant === 'full' && showDiscountCounter && <DiscountCounter />} */}

        {/* Features List */}
        {showFeatures && (
          <div className="my-4">
            <div className={cn('mb-4 text-xs', mode.color.text.muted, mode.font)}>[INCLUDES]:</div>
            <FeatureList>
              {PRICING.features.map((feature, idx) => (
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
        )}

        {/* CTA Button */}
        <PolarCheckoutButton
          className={cn(
            'bg-accent text-accent-foreground w-full px-8 py-4 text-sm',
            mode.radius,
            mode.font
          )}
        >
          {PRICING.cta.label} — {PRICING.display.launch}
        </PolarCheckoutButton>

        {/* Trust line */}
        <div className={cn('mt-4 text-center text-xs', mode.color.text.muted, mode.font)}>
          {PRICING.trustLine}
        </div>
      </CardContent>
    </Card>
  );
}
