/**
 * ✅ FABRK COMPONENT
 * Hero Section - Terminal console [SYSTEM INIT] style
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { motion } from 'framer-motion';
import { SimpleIcon } from '@/components/ui/simple-icon';
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
} from 'simple-icons';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import {
  Card,
  CardHeader,
  CardContent,
  Stat,
  StatGroup,
  Badge as CardBadge,
} from '@/components/ui/card';
import { HeroDashboardPreview } from './hero-dashboard-preview';
import { LayeredWindows } from './layered-windows';
import { PRICING } from '@/data/landing';

const techStack = [
  { name: 'NEXT.JS', path: siNextdotjs.path },
  { name: 'REACT', path: siReact.path },
  { name: 'TYPESCRIPT', path: siTypescript.path },
  { name: 'TAILWIND', path: siTailwindcss.path },
  { name: 'PRISMA', path: siPrisma.path },
  { name: 'STRIPE', path: siStripe.path },
  { name: 'RESEND', path: siResend.path },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden py-16 lg:min-h-[90vh] lg:py-20">
      <Container size="2xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Terminal Content */}
          <div className="flex flex-col justify-center">
            {/* System Init Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <CardBadge code="0x00" label="SYSTEM INIT" meta="SAAS BOILERPLATE v2.0" />
            </motion.div>

            {/* Headline Block - Tighter grouping */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <h1 className={cn('mb-3 text-xs', mode.color.text.muted, mode.font)}>
                [SYSTEM READY]
              </h1>
              <h2 className="mb-4 text-7xl leading-[0.9] font-black tracking-tight lg:text-8xl">
                <span className="text-foreground">BUILD IN</span>
                <br />
                <span className={mode.color.text.accent}>MINUTES</span>
              </h2>
              <p className={cn('text-base leading-relaxed', mode.color.text.muted)}>
                Ship your product this weekend not next quarter.
              </p>
            </motion.div>

            {/* Stats + CTAs Block - Combined visual group */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Quick stats with accent border */}
              <div className={cn('border-accent flex flex-wrap gap-4 border-l-2 pl-4')}>
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

              {/* CTAs - Primary Dominant */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <PolarCheckoutButton
                  className={cn(
                    'bg-accent text-accent-foreground px-8 py-4 text-sm transition-all hover:scale-105',
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
                  className={cn('text-xs', mode.radius, mode.font)}
                >
                  <Link href="/library">Explore 31 Interactive Demos</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual Proof */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Urgency Card - Top */}
            <Card size="auto" className="border-accent border-2">
              <CardHeader code="0x03" title="LAUNCH_PRICING" />
              <CardContent className="space-y-2 py-3">
                <div className="flex items-baseline gap-3">
                  <span className={cn('text-3xl font-bold', mode.font, mode.color.text.accent)}>
                    $399
                  </span>
                  <span className={cn('text-base line-through', mode.color.text.muted)}>$499</span>
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
                  Price increases to $499 on Dec 31, 2025
                </div>
                <div className="mt-2 flex gap-4 text-xs">
                  <div>
                    <span className={cn(mode.color.text.muted, mode.font)}>Time Saved: </span>
                    <span className={cn(mode.color.text.accent, mode.font)}>400+ HRS</span>
                  </div>
                  <div>
                    <span className={cn(mode.color.text.muted, mode.font)}>Value: </span>
                    <span className={cn(mode.color.text.accent, mode.font)}>$36K+</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Dashboard Preview - Show, don't tell */}
            <HeroDashboardPreview />
          </motion.div>
        </div>

        {/* Tech Stack - Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <CardBadge code="0x02" label="POWERED BY" meta="FIB[1,1,2,3,5,8,13]" className="mb-6" />
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className={cn(
                  'flex items-center gap-2 border px-2 py-1',
                  mode.color.border.default,
                  mode.color.bg.surface
                )}
              >
                <SimpleIcon path={tech.path} className="size-3.5" />
                <span className={cn('text-xs', mode.font)}>{tech.name}</span>
                <span className={cn('text-xs', mode.color.text.success, mode.font)}>[OK]</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
