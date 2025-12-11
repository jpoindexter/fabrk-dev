/**
 * ✅ FABRK COMPONENT
 * Layered Windows - Recreating reference design
 * Production-ready ✓
 */
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge as CardBadge } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';

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

// Animated installation progress bar
function InstallProgressBar() {
  return (
    <div className="w-full">
      <div className={cn('relative h-8 w-full border', mode.color.border.default)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '52.3%' }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="bg-accent h-full"
        />
        <span
          className={cn(
            'absolute inset-0 flex items-center justify-center text-sm font-bold',
            mode.font
          )}
        >
          INSTALL 52.3%
        </span>
      </div>
    </div>
  );
}

export function LayeredWindows() {
  return (
    <div className="relative min-h-[700px] w-full">
      {/* Main Browser Window */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative cursor-move"
        style={{ zIndex: 1 }}
      >
        <div className={cn('relative min-h-[700px] border bg-black/95', mode.color.border.default)}>
          <WindowChrome title="localhost:3000 — FABRK Terminal Boilerplate" />

          {/* Main Content Area */}
          <div className="relative p-8 lg:p-12">
            {/* Left Side - Large Headline */}
            <div className="relative z-10 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className={cn('mb-4 text-xs', mode.font, mode.color.text.muted)}>[SAAS BUILD]</p>
                {/* eslint-disable design-system/no-inline-styles, design-system/no-hardcoded-colors -- Gradient text effect matches reference design */}
                <h1
                  className="mb-6 text-[80px] leading-[0.85] font-black tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  BUILDIN
                  <br />
                  YOUR
                </h1>
                {/* eslint-enable design-system/no-inline-styles, design-system/no-hardcoded-colors */}
                <p className={cn('mb-6 text-sm', mode.color.text.muted)}>
                  60+ production components. Authentication,
                  <br />
                  billing, dashboards — all done. Ship your
                  <br />
                  SaaS this weekend, not next quarter.
                </p>
              </motion.div>
            </div>

            {/* Background Code Snippets */}
            <div className="absolute top-32 left-8 opacity-30">
              <pre className={cn('text-xs', mode.font, mode.color.text.muted)}>
                {`import { auth } from '@/lib/auth'
export default function Page() {
  return <Dashboard />
}`}
              </pre>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute right-0 bottom-0 left-0 p-4">
            <InstallProgressBar />
          </div>

          {/* Bottom Right CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute right-6 bottom-6"
          >
            <PolarCheckoutButton
              className={cn(
                'bg-accent text-accent-foreground px-6 py-3 text-xs font-bold',
                mode.radius,
                mode.font
              )}
            >
              &lt; WRITE A TWEET
            </PolarCheckoutButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Small Draggable Window 1 - Pricing Breakdown */}
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
        <Card className="w-72">
          <CardHeader code="0x01" title="PRICING_BREAKDOWN" />
          <CardContent className="space-y-3 py-4">
            <div className="flex items-baseline justify-between gap-3">
              <span className={cn('text-4xl font-bold', mode.font, mode.color.text.accent)}>
                $399
              </span>
              <span className={cn('text-xs', mode.color.text.muted)}>YOUR_PRICE</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>60+ HRS • Components</span>
                <span className={mode.color.text.muted}>$15K</span>
              </div>
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>Auth (NextAuth v5)</span>
                <span className={mode.color.text.muted}>$6K</span>
              </div>
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>Payment (3 providers)</span>
                <span className={mode.color.text.muted}>$8K</span>
              </div>
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>Multi-Tenancy</span>
                <span className={mode.color.text.muted}>$10K</span>
              </div>
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>AI Credits System</span>
                <span className={mode.color.text.muted}>$4K</span>
              </div>
              <div className={cn('border-t pt-2', mode.color.border.default)}>
                <div className="flex justify-between font-bold">
                  <span>TOTAL_VALUE</span>
                  <span className={mode.color.text.accent}>$51K</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Small Draggable Window 2 - Code Snippet */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, x: 500, y: 300 }}
        animate={{ opacity: 1, x: 500, y: 300 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute cursor-move"
        style={{ zIndex: 3 }}
      >
        <div className={cn('w-80 border', mode.color.border.default, mode.color.bg.surface)}>
          <WindowChrome title="terminal" />
          <div className="p-4">
            <pre className={cn('text-xs', mode.font, mode.color.text.muted)}>
              {`$ npm create fabrk@latest
✓ Installing dependencies...
✓ Setting up database...
✓ Configuring auth...
> Ready in 4.2s`}
            </pre>
          </div>
        </div>
      </motion.div>

      {/* Small Draggable Window 3 - Stats */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, x: 700, y: 200 }}
        animate={{ opacity: 1, x: 700, y: 200 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="absolute cursor-move"
        style={{ zIndex: 4 }}
      >
        <Card className="w-64">
          <CardHeader code="0x03" title="LAUNCH_METRICS" />
          <CardContent className="space-y-2 py-3">
            <div className={cn('text-xs', mode.font)}>
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>Setup Time:</span>
                <span className={mode.color.text.accent}>&lt; 5 MIN</span>
              </div>
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>Components:</span>
                <span className={mode.color.text.accent}>60+</span>
              </div>
              <div className="flex justify-between">
                <span className={mode.color.text.muted}>Time Saved:</span>
                <span className={mode.color.text.success}>400+ HRS</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
