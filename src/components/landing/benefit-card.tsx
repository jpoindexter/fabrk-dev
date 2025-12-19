/**
 * BenefitCard - Unified terminal HUD card using Card UI primitives
 *
 * Design System Compliance:
 * - Uses mode.typography.* tokens (no hardcoded text-[Xpx])
 * - Uses Card, CardHeader, CardContent, CardFooter primitives
 * - Uses Stat for key:value pairs
 * - Uses FeatureItem for feature lists
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  Stat,
  FeatureItem,
} from '@/components/ui/card';

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
  module,
  code,
  benefit,
  timeSaved,
  costSaved,
  features,
  index,
  ctaHref,
}: BenefitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full"
    >
      <Card size="full">
        {/* Header - minimal */}
        <div
          className={cn(
            'flex items-center justify-between border-b px-4 py-2',
            mode.color.border.default
          )}
        >
          <span className={cn(mode.typography.caption, mode.font, 'uppercase')}>
            {module.replace(/_/g, ' ')}
          </span>
        </div>

        {/* Title - uses mode.typography.body.sm */}
        <div className={cn('border-b px-4 py-3', mode.color.border.default)}>
          <span className={cn(mode.typography.body.sm, 'font-medium', mode.font, mode.color.text.primary)}>
            {benefit}
          </span>
        </div>

        {/* Stats Row - uses Stat component pattern */}
        <div className={cn('flex border-b', mode.color.border.default)}>
          <div className={cn('flex-1 border-r px-4 py-2', mode.color.border.default)}>
            <Stat label="TIME" value={timeSaved} size="sm" />
          </div>
          <div className="flex-1 px-4 py-2">
            <Stat label="COST" value={costSaved} size="sm" />
          </div>
        </div>

        {/* Features - uses FeatureItem with custom icon */}
        <CardContent padding="md" className="flex-grow">
          <div className="space-y-1">
            {features.slice(0, 5).map((feature, i) => (
              <FeatureItem key={i} icon="arrow" className={mode.color.text.muted}>
                {feature}
              </FeatureItem>
            ))}
          </div>
        </CardContent>

        {/* Footer CTA */}
        {ctaHref && (
          <CardFooter className="p-0">
            <Link
              href={ctaHref}
              className={cn(
                'flex w-full px-4 py-2 transition-colors',
                'hover:bg-muted/50',
                mode.typography.caption,
                mode.color.text.muted,
                mode.font
              )}
            >
              &gt; VIEW DOCS
            </Link>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
