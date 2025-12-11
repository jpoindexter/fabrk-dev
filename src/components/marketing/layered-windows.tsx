/**
 * ✅ FABRK COMPONENT
 * Layered Windows - MacOS-style overlapping terminal windows with depth
 * Production-ready ✓
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

// MacOS-style window traffic lights
function WindowChrome({ title }: { title: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b px-3 py-2',
        mode.color.border.default
      )}
    >
      <div className="flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
      </div>
      <span className={cn('text-xs', mode.font, mode.color.text.muted)}>{title}</span>
      <div className="w-8" /> {/* Spacer for balance */}
    </div>
  );
}

// Loading progress bar component
function ProgressBar({ progress, label }: { progress: number; label: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className={cn(mode.font, mode.color.text.muted)}>{label}</span>
        <span className={cn(mode.font, mode.color.text.accent)}>{progress}%</span>
      </div>
      <div className={cn('h-1.5 w-full border', mode.color.border.default, mode.color.bg.surface)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className={cn('h-full', 'bg-accent')}
        />
      </div>
    </div>
  );
}

export function LayeredWindows() {
  return (
    <div className="relative h-[550px] w-full">
      {/* Window 4 - Far Back (Terminal Code) */}
      <motion.div
        initial={{ opacity: 0, x: 60, y: 100 }}
        animate={{ opacity: 0.7, x: 60, y: 100 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute"
        style={{ zIndex: 1 }}
      >
        <div className={cn('w-72 border', mode.color.border.default, mode.color.bg.surface)}>
          <WindowChrome title="terminal" />
          <div className="space-y-1 p-3">
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              $ npm create fabrk@latest
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.success)}>
              ✓ Installing dependencies...
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.success)}>
              ✓ Configuring database...
            </div>
          </div>
        </div>
      </motion.div>

      {/* Window 3 - Back (Pricing Data) */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 60 }}
        animate={{ opacity: 1, x: 40, y: 60 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute"
        style={{ zIndex: 2 }}
      >
        <Card className="w-64">
          <CardHeader code="0x03" title="VALUE_METRICS" />
          <CardContent className="space-y-2 py-3">
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Components: <span className={mode.color.text.accent}>60+</span>
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Time Saved: <span className={mode.color.text.accent}>400+ HRS</span>
            </div>
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              &gt; Value: <span className={mode.color.text.success}>$36,000</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Window 2 - Middle (Progress Bars) */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 30 }}
        animate={{ opacity: 1, x: 20, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute"
        style={{ zIndex: 3 }}
      >
        <Card className="w-80">
          <CardHeader code="0x02" title="SETUP_PROGRESS" />
          <CardContent className="space-y-3 py-4">
            <ProgressBar progress={100} label="Authentication" />
            <ProgressBar progress={85} label="Database Schema" />
            <ProgressBar progress={60} label="Email Templates" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Window 1 - Front (Main Pricing) */}
      <motion.div
        initial={{ opacity: 0, x: 0, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute"
        style={{ zIndex: 4 }}
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
                  'bg-accent text-accent-foreground ml-auto px-2 py-1 text-xs font-bold',
                  mode.radius,
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
            <ProgressBar progress={75} label="Launch Discount Remaining" />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
