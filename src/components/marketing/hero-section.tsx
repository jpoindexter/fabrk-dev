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
                      'mb-4 text-[8px] leading-none lg:text-[10px]',
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
                  <p
                    className={cn(
                      'mb-0 text-sm leading-relaxed lg:text-base',
                      mode.color.text.muted
                    )}
                  >
                    Ship your product this weekend not next quarter.
                  </p>
                </div>

                {/* Quick stats inline */}
                <div className="flex flex-wrap gap-4">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Bottom Left - Key Selling Points (In front of hero) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute -bottom-28 -left-24 z-10 w-full max-w-md lg:-bottom-32 lg:-left-32"
          >
            <Card size="auto">
              <CardHeader code="0x01" title="KEY_SELLING_POINTS.TXT" />
              <CardContent className="space-y-2 py-3">
                <p
                  className={cn(
                    'border-accent border-l-2 pl-3 text-xs',
                    mode.font,
                    mode.color.text.accent
                  )}
                >
                  60+ Production components
                </p>
                <p
                  className={cn(
                    'border-accent border-l-2 pl-3 text-xs',
                    mode.font,
                    mode.color.text.accent
                  )}
                >
                  26 Full-featured templates
                </p>
                <p
                  className={cn(
                    'border-accent border-l-2 pl-3 text-xs',
                    mode.font,
                    mode.color.text.accent
                  )}
                >
                  Authentication, billing, dashboards — all done
                </p>
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
              <CardHeader code="0x03" title="LAUNCH_OFFER.SH" />
              <CardContent className="space-y-4 p-4">
                {/* Price - Big and Bold */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={cn('text-4xl font-black', mode.font, mode.color.text.accent)}
                      >
                        $399
                      </span>
                      <span className={cn('text-lg line-through', mode.color.text.muted)}>
                        $499
                      </span>
                    </div>
                    <div className={cn('mt-1 text-xs', mode.color.text.muted, mode.font)}>
                      ONE-TIME PAYMENT
                    </div>
                  </div>
                  <div
                    className={cn(
                      'bg-accent text-accent-foreground border-accent animate-pulse border-2 px-3 py-1.5 text-sm font-black',
                      mode.font
                    )}
                  >
                    -20%
                  </div>
                </div>

                {/* Urgency */}
                <div className="border-accent space-y-1 border-l-2 pl-3">
                  <div className={cn('text-xs font-bold', mode.color.text.warning, mode.font)}>
                    ⚠ ONLY 50 LICENSES LEFT
                  </div>
                  <div className={cn('text-xs', mode.color.text.muted, mode.font)}>
                    Price → $499 on Dec 31, 2025
                  </div>
                </div>

                {/* ROI Stats */}
                <div className="border-accent grid grid-cols-2 gap-2 border-t pt-3">
                  <div>
                    <div className={cn('text-xs', mode.color.text.muted, mode.font)}>SAVES</div>
                    <div className={cn('text-lg font-bold', mode.font, mode.color.text.success)}>
                      400+ HRS
                    </div>
                  </div>
                  <div>
                    <div className={cn('text-xs', mode.color.text.muted, mode.font)}>VALUE</div>
                    <div className={cn('text-lg font-bold', mode.font, mode.color.text.success)}>
                      $36K+
                    </div>
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
