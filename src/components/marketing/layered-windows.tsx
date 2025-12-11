/**
 * ✅ FABRK COMPONENT
 * Layered Windows - Windows 95 style overlapping terminal windows
 * Production-ready ✓
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function LayeredWindows() {
  return (
    <div className="relative h-[500px] w-full">
      {/* Window 3 - Back */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 60 }}
        animate={{ opacity: 1, x: 40, y: 60 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute"
        style={{ zIndex: 1 }}
      >
        <Card className="w-64">
          <CardHeader code="0x03" title="METRICS" />
          <CardContent className="space-y-2 py-3">
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Revenue: <span className={mode.color.text.accent}>$12,450</span>
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Users: <span className={mode.color.text.accent}>2,847</span>
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Active: <span className={mode.color.text.success}>94.2%</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Window 2 - Middle */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 30 }}
        animate={{ opacity: 1, x: 20, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute"
        style={{ zIndex: 2 }}
      >
        <Card className="w-72">
          <CardHeader code="0x02" title="ACTIVITY_LOG" />
          <CardContent className="space-y-1 py-3">
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; New subscription • user_4321 • 2m ago
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Payment received • user_3792 • 5m ago
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Trial started • user_5634 • 12m ago
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Window 1 - Front (Pricing) */}
      <motion.div
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute"
        style={{ zIndex: 3 }}
      >
        <Card className="border-accent w-80 border-2">
          <CardHeader code="0x01" title="LAUNCH_PRICING" />
          <CardContent className="space-y-3 py-4">
            <div className="flex items-baseline gap-3">
              <span className={cn('text-4xl font-bold', mode.font, mode.color.text.accent)}>
                $399
              </span>
              <span className={cn('text-lg line-through', mode.color.text.muted)}>$499</span>
              <span
                className={cn(
                  'bg-accent text-accent-foreground ml-auto rounded-none px-2 py-1 text-xs font-bold',
                  mode.font
                )}
              >
                20% OFF
              </span>
            </div>
            <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
              <span className={mode.color.text.warning}>⚠ 50 LICENSES LEFT</span>
              <span className="mx-2">•</span>
              <span>Price increases Dec 31</span>
            </div>
            <div className="flex gap-3 text-xs">
              <div>
                <span className={cn(mode.color.text.muted, mode.font)}>Time: </span>
                <span className={cn(mode.color.text.accent, mode.font)}>400+ HRS</span>
              </div>
              <div>
                <span className={cn(mode.color.text.muted, mode.font)}>Value: </span>
                <span className={cn(mode.color.text.accent, mode.font)}>$36K+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
