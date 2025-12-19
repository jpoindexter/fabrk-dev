'use client';

/**
 * UseCaseCard - Unified terminal HUD card using Card UI primitives
 *
 * Design System Compliance:
 * - Uses mode.typography.* tokens (no hardcoded text-[Xpx])
 * - Uses Card, CardContent primitives
 * - Uses FeatureItem for feature lists
 */

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardContent, FeatureItem } from '@/components/ui/card';

interface UseCaseCardProps {
  icon: LucideIcon;
  persona: string;
  painPoint: string;
  solution: string;
  features: readonly string[];
  index: number;
}

/**
 * UseCaseCard - Minimal terminal HUD style
 */
export function UseCaseCard({
  persona,
  painPoint,
  solution,
  features,
  index,
}: UseCaseCardProps) {

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
            {persona.toUpperCase()}
          </span>
        </div>

        {/* Problem/Solution - uses mode.typography.caption */}
        <div className={cn('border-b px-4 py-3', mode.color.border.default)}>
          <div className={cn(mode.typography.caption, mode.font)}>
            <span className="opacity-60">PROBLEM:</span> {painPoint}
          </div>
          <div className={cn('mt-2', mode.typography.caption, mode.font)}>
            <span className={mode.color.text.muted}>SOLUTION:</span>{' '}
            <span className={mode.color.text.accent}>{solution}</span>
          </div>
        </div>

        {/* Features - uses FeatureItem */}
        <CardContent padding="md" className="flex-grow">
          <div className="space-y-1">
            {features.slice(0, 5).map((feature, i) => (
              <FeatureItem key={i} icon="arrow" className={mode.color.text.muted}>
                {feature}
              </FeatureItem>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
