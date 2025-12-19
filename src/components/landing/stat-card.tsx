'use client';

/**
 * StatCard - Unified terminal HUD card using Card UI primitives
 *
 * Design System Compliance:
 * - Uses mode.typography.* tokens
 * - Uses Card primitive with consistent header pattern
 */

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  index: number;
}

/**
 * StatCard Component
 * Displays a single metric with icon, value, and label
 * Used in Stats section to show trust indicators
 */
export function StatCard({ icon: Icon, value, label, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="h-full"
    >
      <Card size="full" interactive>
        {/* Header - minimal */}
        <div
          className={cn(
            'flex items-center justify-between border-b px-4 py-2',
            mode.color.border.default
          )}
        >
          <span className={cn(mode.typography.caption, mode.font, 'uppercase')}>
            {label}
          </span>
          <Icon className={cn('size-4', mode.color.text.accent)} />
        </div>

        <CardContent padding="md" className="flex flex-col items-center justify-center">
          <div className={cn('text-3xl font-bold', mode.font, mode.color.text.primary)}>
            {value}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
