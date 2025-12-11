'use client';

import { motion } from 'framer-motion';
import { LucideIcon, Check } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface UseCaseCardProps {
  icon: LucideIcon;
  persona: string;
  painPoint: string;
  solution: string;
  features: readonly string[];
  index: number;
}

/**
 * UseCaseCard Component
 * Displays a target persona with their pain point, solution, and key features
 * Used in Use Cases section to show who benefits from Fabrk
 */
export function UseCaseCard({
  icon: Icon,
  persona,
  painPoint,
  solution,
  features,
  index,
}: UseCaseCardProps) {
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
          code={`0x${(40 + index).toString(16).toUpperCase()}`}
          title={persona}
          icon={
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
              <Icon className={cn('size-5', mode.color.text.accent)} />
            </motion.div>
          }
        />
        <CardContent>
          {/* Pain Point */}
          <div className="mb-4">
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>[PROBLEM]:</span>
            <p className={cn('mt-1 text-sm', mode.font, mode.color.text.primary)}>{painPoint}</p>
          </div>

          {/* Solution */}
          <div className="mb-4">
            <span className={cn('text-xs', mode.font, mode.color.text.accent)}>[SOLUTION]:</span>
            <p className={cn('mt-1 text-sm font-medium', mode.font, mode.color.text.primary)}>
              {solution}
            </p>
          </div>

          {/* Features */}
          <div>
            <span className={cn('text-xs', mode.font, mode.color.text.muted)}>[KEY_FEATURES]:</span>
            <ul className="mt-2 space-y-2">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className={cn('mt-0.5 size-3 shrink-0', mode.color.text.success)} />
                  <span className={cn('text-xs', mode.font, mode.color.text.primary)}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
