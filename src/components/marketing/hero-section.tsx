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
import { Card, CardHeader, CardContent, Badge as CardBadge } from '@/components/ui/card';
import { HeroDashboardPreview } from './hero-dashboard-preview';
import { PRICING } from '@/data/landing';
import { TypeWriter } from '@/components/ui/typewriter';
import { COMPONENT_COUNT_STRING, TEMPLATE_COUNT_STRING } from '@/data/landing/stats';

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
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-8 pb-16 lg:min-h-[90vh] lg:pt-12 lg:pb-20">
      <Container size="2xl">
        <div className="relative">
          {/* Main Hero Window - Wider, behind */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative isolate z-0 ml-12 max-w-2xl lg:ml-16"
          >
            <Card size="auto">
              <CardHeader code="0x00" title="SYSTEM INIT" meta="SAAS BOILERPLATE v2.0" />
              <CardContent className="space-y-4 p-8">
                {/* Headline */}
                <div className="max-w-2xl">
                  <h1 className={cn('mb-2 text-xs', mode.color.text.muted, mode.font)}>
                    [FABRK INIT]
                  </h1>
                  <pre
                    className={cn(
                      'mb-4 text-xs leading-none lg:text-xs',
                      mode.color.text.accent,
                      mode.font
                    )}
                  >
                    {` ███████████  █████  █████ █████ █████       ██████████      █████ ██████   █████
░░███░░░░░███░░███  ░░███ ░░███ ░░███       ░░███░░░░███    ░░███ ░░██████ ░░███
 ░███    ░███ ░███   ░███  ░███  ░███        ░███   ░░███    ░░███  ░███░███ ░███
 ░██████████  ░███   ░███  ░███  ░███        ░███    ░███    ░███  ░███░░███░███
 ░███░░░░░███ ░███   ░███  ░███  ░███        ░███    ░███    ░███  ░███ ░░██████
 ░███    ░███ ░███   ░███  ░███  ░███      █ ░███    ███     ░███  ░███  ░░█████
 ███████████  ░░████████   █████ ███████████ ██████████      █████ █████  ░░█████
░░░░░░░░░░░    ░░░░░░░░   ░░░░░ ░░░░░░░░░░░ ░░░░░░░░░░      ░░░░░ ░░░░░    ░░░░░



 ██████   ██████ █████ ██████   █████ █████  █████ ███████████ ██████████  █████████
░░██████ ██████ ░░███ ░░██████ ░░███ ░░███  ░░███ ░█░░░███░░░█░░███░░░░░█ ███░░░░░███
 ░███░█████░███  ░███  ░███░███ ░███  ░███   ░███ ░   ░███  ░  ░███  █ ░ ░███    ░░░
 ░███░░███ ░███  ░███  ░███░░███░███  ░███   ░███     ░███     ░██████   ░░█████████
 ░███ ░░░  ░███  ░███  ░███ ░░██████  ░███   ░███     ░███     ░███░░█    ░░░░░░░░███
 ░███      ░███  ░███  ░███  ░░█████  ░███   ░███     ░███     ░███ ░   █ ███    ░███
 █████     █████ █████ █████  ░░█████ ░░████████      █████    ██████████░░█████████
░░░░░     ░░░░░ ░░░░░ ░░░░░    ░░░░░   ░░░░░░░░      ░░░░░    ░░░░░░░░░░  ░░░░░░░░░`}
                  </pre>
                  <p className={cn('mb-0 text-sm leading-relaxed', mode.color.text.muted)}>
                    <TypeWriter
                      text="Ship your product this weekend not next quarter."
                      delay={0.5}
                      speed={40}
                      showCursor
                      cursorAtEnd
                    />
                  </p>
                </div>

                {/* Quick stats inline */}
                <div className="flex flex-wrap gap-4">
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    <span className={mode.color.text.accent}>{COMPONENT_COUNT_STRING}</span>{' '}
                    Components
                  </span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>•</span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    <span className={mode.color.text.accent}>{TEMPLATE_COUNT_STRING}</span>{' '}
                    Templates
                  </span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>•</span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    <span className={mode.color.text.accent}>{'< 5 MIN'}</span> Setup
                  </span>
                </div>

                {/* CTAs - Primary Dominant */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <PolarCheckoutButton
                    className={cn(
                      'bg-accent text-accent-foreground px-8 py-4 text-sm transition-all hover:scale-105',
                      mode.radius,
                      mode.font
                    )}
                  >
                    &gt; {PRICING.cta.label} — {PRICING.display.launch}
                  </PolarCheckoutButton>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className={cn('text-xs', mode.radius, mode.font)}
                  >
                    <Link href="/library">&gt; EXPLORE DEMOS</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Visual Proof (Overlays on top) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-8 -right-12 isolate z-10 flex w-full max-w-[280px] flex-col gap-8 lg:top-12 lg:-right-16"
          >
            {/* Urgency Card - Top */}
            <Card size="auto" className="border-accent border-2 lg:-mr-8">
              <CardHeader code="0x03" title="LAUNCH OFFER.SH" />
              <CardContent className="space-y-4 p-4">
                {/* Price - Big and Bold */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className={cn('text-4xl font-bold', mode.font, mode.color.text.accent)}>
                        $199
                      </span>
                      <span className={cn('text-2xl line-through', mode.color.text.muted)}>
                        $299
                      </span>
                    </div>
                    <div className={cn('mt-1 text-xs', mode.color.text.muted, mode.font)}>
                      ONE-TIME PAYMENT
                    </div>
                  </div>
                  <div
                    className={cn(
                      'bg-accent text-accent-foreground border-accent animate-pulse border-2 px-4 py-1.5 text-sm font-bold',
                      mode.font
                    )}
                  >
                    -$100
                  </div>
                </div>

                {/* Launch Pricing */}
                <div className="border-accent space-y-1 border-l-2 pl-3">
                  <div className={cn('text-xs font-bold', mode.color.text.accent, mode.font)}>
                    🎉 LAUNCH PRICE: $199
                  </div>
                  <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
                    $299 after first 100 buyers
                  </div>
                </div>

                {/* Speed Messaging */}
                <div className="border-accent flex items-center justify-center gap-4 border-t pt-3">
                  <div className={cn('text-sm font-bold', mode.font, mode.color.text.muted)}>
                    FROM IDEA
                  </div>
                  <div className={cn('text-sm font-bold', mode.font, mode.color.text.accent)}>
                    │
                  </div>
                  <div className={cn('text-sm font-bold', mode.font, mode.color.text.success)}>
                    TO LIVE
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Dashboard Preview - Show, don't tell */}
            <div className="mt-4 -ml-16 lg:mt-8 lg:-ml-24">
              <HeroDashboardPreview />
            </div>
          </motion.div>
        </div>

        {/* Tech Stack - Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-32 lg:mt-40"
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
