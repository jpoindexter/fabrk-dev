'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

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
      className={cn(
        'group border-border bg-card hover:bg-muted/50 relative flex flex-col items-center gap-3 border p-6 text-center transition-colors',
        mode.radius
      )}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <Icon className={cn('size-8', mode.color.text.accent)} />
      </motion.div>

      {/* Value */}
      <div className={cn('text-4xl font-bold tracking-tight', mode.font, mode.color.text.primary)}>
        {value}
      </div>

      {/* Label */}
      <div className={cn('text-xs tracking-wider', mode.font, mode.color.text.muted)}>{label}</div>
    </motion.div>
  );
}
