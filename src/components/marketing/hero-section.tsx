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
import { HeroCodeDemo } from './hero-code-demo';
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
    <section className="relative overflow-hidden py-20 lg:py-24">
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
              <h1 className={cn('text-body-m mb-2', mode.color.text.muted)}>[FABRK INIT]</h1>
              <h2 className="text-display mb-4">
                SHIP YOUR SAAS IN
                <br />
                <span className={mode.color.text.accent}>48 HOURS, NOT 6 MONTHS</span>
              </h2>
              <p className={cn('text-body-m mb-6', mode.color.text.muted)}>
                Production-ready Next.js boilerplate with auth, billing, multi-tenancy, and 60+
                components. Stop rebuilding the same infrastructure. Start with Fabrk.
              </p>
            </motion.div>

            {/* 3-Stat Strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <Card size="auto">
                <CardHeader code="0x01" title="METRICS" />
                <CardContent>
                  <StatGroup>
                    <Stat label="Components" value="60+" />
                    <Stat label="Setup Time" value="< 5 MIN" />
                    <Stat label="Time Saved" value="100+ HRS" />
                  </StatGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-8"
            >
              <p className={cn('text-body-s', mode.color.text.muted)}>
                <span className={mode.color.text.success}>[ACTIVE]</span> Join hundreds of
                developers shipping faster
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
                className={cn('text-xs sm:text-sm', mode.radius, mode.font, 'px-6 py-3')}
              >
                &gt; {PRICING.cta.label} — {PRICING.display.current}
              </PolarCheckoutButton>
              <Button
                variant="outline"
                size="sm"
                asChild
                className={cn('text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/components/overview">View Live Demo</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Dashboard Preview / Discount */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Terminal Window Frame */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card size="auto">
                <CardHeader code="0x03" title="terminal — ~/projects" />
                {/* Terminal Content */}
                <HeroCodeDemo />
              </Card>
            </motion.div>
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
