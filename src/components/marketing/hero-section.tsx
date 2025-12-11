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
    <section className="relative overflow-hidden py-32 lg:py-40">
      <Container size="2xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Terminal Content */}
          <div className="flex flex-col justify-center">
            {/* System Init Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <CardBadge code="0x00" label="SYSTEM INIT" meta="SAAS BOILERPLATE v2.0" />
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1
                className={cn(
                  'mb-3 text-lg font-bold tracking-wider uppercase',
                  mode.color.text.accent
                )}
              >
                [FABRK INIT]
              </h1>
              <h2 className="text-foreground mb-6 text-7xl leading-none font-black tracking-tight lg:text-9xl">
                BUILDING YOUR SAAS
                <br />
                <span className={mode.color.text.accent}>JUST GOT UNFAIRLY EASY</span>
              </h2>
              <p className={cn('mb-8 text-xl leading-relaxed lg:text-2xl', mode.color.text.muted)}>
                60+ production components. 26 full-featured templates. Terminal-first design that
                stands out. Authentication, billing, dashboards — all done. Ship your SaaS this
                weekend, not next quarter.
              </p>
            </motion.div>

            {/* 3-Stat Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10"
            >
              <Card size="auto" className="border-accent/20 bg-accent/5 border-2">
                <CardHeader code="0x01" title="METRICS" />
                <CardContent className="py-6">
                  <StatGroup>
                    <Stat label="Components" value="60+" />
                    <Stat label="Setup Time" value="< 5 MIN" />
                    <Stat label="Time Saved" value="400+ HRS" />
                  </StatGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-10"
            >
              <p className={cn('text-body-s', mode.color.text.muted)}>
                <span className={mode.color.text.success}>[VERIFIED]</span> Used to build 50+
                production SaaS apps
              </p>
            </motion.div>

            {/* CTAs - Primary Dominant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-col gap-4 sm:flex-row"
            >
              <PolarCheckoutButton
                className={cn(
                  'bg-accent text-accent-foreground px-8 py-4 text-sm',
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
            </motion.div>
          </div>

          {/* Right Column - Visual Proof */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Urgency Card - Top */}
            <Card size="auto" className="border-accent border-2">
              <CardHeader code="0x03" title="LAUNCH PRICING" />
              <CardContent className="space-y-3 py-4">
                <div className="flex items-baseline gap-3">
                  <span className={cn('text-3xl font-bold', mode.font, mode.color.text.accent)}>
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
                  <br />
                  Price increases to $499 on Dec 31, 2025
                </div>
                <StatGroup className="mt-2">
                  <Stat label="Time Saved" value="400+ HRS" size="sm" />
                  <Stat label="Value" value="$36K+" size="sm" />
                </StatGroup>
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
