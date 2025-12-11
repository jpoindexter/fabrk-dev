/**
 * ✅ FABRK COMPONENT
 * Layered Windows - MacOS-style overlapping terminal windows with depth
 * Production-ready ✓
 */
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge as CardBadge } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { PRICING } from '@/data/landing';

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
    <div className="relative min-h-[600px] w-full">
      {/* Background - Large Window with Hero Content (z-index: 1) - DRAGGABLE */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full cursor-move"
        style={{ zIndex: 1 }}
      >
        <div className={cn('border', mode.color.border.default, mode.color.bg.surface)}>
          <WindowChrome title="fabrk.sh — terminal-first saas boilerplate" />
          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              {/* System Init Label */}
              <div className="mb-6">
                <CardBadge code="0x00" label="SYSTEM INIT" meta="SAAS BOILERPLATE v2.0" />
              </div>

              {/* Headline */}
              <h1 className={cn('mb-3 text-xs', mode.color.text.muted, mode.font)}>
                [SYSTEM READY]
              </h1>
              <h2 className="mb-6 text-6xl leading-[0.9] font-black tracking-tight lg:text-7xl">
                <span className="text-foreground">BUILD IN</span>
                <br />
                <span className={mode.color.text.accent}>MINUTES</span>
              </h2>
              <p className={cn('mb-8 text-sm leading-relaxed', mode.color.text.muted)}>
                Ship your product this weekend not next quarter.
              </p>

              {/* Stats */}
              <div className={cn('border-accent mb-8 flex flex-wrap gap-3 border-l-2 pl-4')}>
                <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                  <span className={mode.color.text.accent}>60+</span> Components
                </span>
                <span className={cn('text-xs', mode.font, mode.color.text.muted)}>•</span>
                <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                  <span className={mode.color.text.accent}>{'< 5 MIN'}</span> Setup
                </span>
                <span className={cn('text-xs', mode.font, mode.color.text.muted)}>•</span>
                <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                  <span className={mode.color.text.accent}>400+ HRS</span> Saved
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <PolarCheckoutButton
                  className={cn(
                    'bg-accent text-accent-foreground w-full px-8 py-4 text-sm transition-all hover:scale-105',
                    mode.radius,
                    mode.font
                  )}
                >
                  &gt; {PRICING.cta.label} — {PRICING.display.current}
                </PolarCheckoutButton>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className={cn('w-full text-xs', mode.radius, mode.font)}
                >
                  <Link href="/library">Explore 31 Interactive Demos</Link>
                </Button>
              </div>
            </div>
            <div>{/* Right side spacer - windows will overlay here */}</div>
          </div>
        </div>
      </motion.div>

      {/* Draggable Small Windows - Overlay on right side (z-index: 2-4) */}
      {/* Small Window 1 - Value Metrics */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, x: 600, y: 50 }}
        animate={{ opacity: 1, x: 600, y: 50 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute cursor-move"
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

      {/* Small Window 2 - Progress Bars */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, x: 680, y: 150 }}
        animate={{ opacity: 1, x: 680, y: 150 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute cursor-move"
        style={{ zIndex: 3 }}
      >
        <Card className="w-72">
          <CardHeader code="0x02" title="SETUP_PROGRESS" />
          <CardContent className="space-y-3 py-4">
            <ProgressBar progress={100} label="Authentication" />
            <ProgressBar progress={85} label="Database Schema" />
            <ProgressBar progress={60} label="Email Templates" />
          </CardContent>
        </Card>
      </motion.div>

      {/* Small Window 3 - Main Pricing */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, x: 750, y: 300 }}
        animate={{ opacity: 1, x: 750, y: 300 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute cursor-move"
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
