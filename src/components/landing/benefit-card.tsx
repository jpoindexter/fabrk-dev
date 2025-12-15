/**
 * ✅ FABRK COMPONENT
 * BenefitCard - Extracted from FeaturesShowcase
 * Displays auth/billing/multi-tenancy benefits with stats
 * Production-ready ✓
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardHeader, CardContent, Stat, StatGroup } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ComponentType<{ className?: string }>;
  module: string;
  code: string;
  benefit: string;
  description: string;
  timeSaved: string;
  costSaved: string;
  features: readonly string[];
  index: number;
  ctaLabel?: string;
  ctaHref?: string;
}

export function BenefitCard({
  icon: Icon,
  module,
  code,
  benefit,
  description,
  timeSaved,
  costSaved,
  features,
  index,
  ctaLabel,
  ctaHref,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <Card className="h-full">
        <CardHeader
          code={code}
          title={module}
          icon={
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Icon className={cn('size-5', mode.color.text.accent)} />
            </motion.div>
          }
        />
        <CardContent className="flex h-full flex-col">
          {/* Benefit Statement */}
          <h3 className={cn('mb-4 text-xs font-semibold', mode.font, mode.color.text.primary)}>
            {benefit}
          </h3>

          {/* Description */}
          <p className={cn('mb-4 text-xs leading-relaxed', mode.font, mode.color.text.muted)}>
            {description}
          </p>

          {/* Time/Cost Savings */}
          <div className="mb-4">
            <StatGroup>
              <Stat label="Time Saved" value={timeSaved} size="sm" />
              <Stat label="Cost Saved" value={costSaved} size="sm" />
            </StatGroup>
          </div>

          {/* Features List */}
          <div className={cn('mb-4 flex-grow text-xs', mode.font, mode.color.text.muted)}>
            <span className="mb-2 block font-semibold">[INCLUDES]:</span>
            <ul className="space-y-1">
              {features.map((feature) => (
                <li key={feature}>
                  <span className={mode.color.text.success}>✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button - Pushed to bottom */}
          {ctaLabel && ctaHref && (
            <div className="mt-auto">
              <Button
                variant="outline"
                size="sm"
                asChild
                className={cn('w-full text-xs', mode.radius, mode.font)}
              >
                <Link href={ctaHref} className="flex items-center justify-center gap-2">
                  {ctaLabel}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
