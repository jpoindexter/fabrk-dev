/**
 * ✅ FABRK COMPONENT
 * Hero Section - Terminal console [SYSTEM INIT] style
 * Production-ready ✓
 */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleIcon } from '@/components/ui/simple-icon';
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
  siOpenai,
  siCloudflare,
  siAlgolia,
  siGoogle,
} from 'simple-icons';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent, Badge as CardBadge } from '@/components/ui/card';
import { HeroDashboardPreview } from './hero-dashboard-preview';
import { PRICING } from '@/data/landing';
import { TypeWriter } from '@/components/ui/typewriter';

// Core tech stack (always shown)
const coreStack = [
  { name: 'NEXT.JS', path: siNextdotjs.path },
  { name: 'REACT', path: siReact.path },
  { name: 'TYPESCRIPT', path: siTypescript.path },
  { name: 'TAILWIND', path: siTailwindcss.path },
  { name: 'PRISMA', path: siPrisma.path },
];

// Rotating provider stacks
const providerStacks = [
  {
    label: 'PAYMENT',
    providers: [
      { name: 'STRIPE', path: siStripe.path },
      { name: 'POLAR', path: null },
      { name: 'LEMONSQUEEZY', path: null },
      { name: 'PADDLE', path: null },
      { name: 'PAYPAL', path: null },
    ],
  },
  {
    label: 'EMAIL',
    providers: [
      { name: 'RESEND', path: siResend.path },
      { name: 'SENDGRID', path: null },
      { name: 'SES', path: null },
      { name: 'POSTMARK', path: null },
      { name: 'MAILGUN', path: null },
    ],
  },
  {
    label: 'AI',
    providers: [
      { name: 'OPENAI', path: siOpenai.path },
      { name: 'ANTHROPIC', path: null },
      { name: 'GOOGLE', path: siGoogle.path },
      { name: 'GROQ', path: null },
      { name: 'OLLAMA', path: null },
    ],
  },
  {
    label: 'STORAGE',
    providers: [
      { name: 'S3', path: null },
      { name: 'R2', path: siCloudflare.path },
      { name: 'SUPABASE', path: null },
      { name: 'UPLOADTHING', path: null },
      { name: 'VERCEL BLOB', path: null },
    ],
  },
  {
    label: 'SEARCH',
    providers: [
      { name: 'ALGOLIA', path: siAlgolia.path },
      { name: 'MEILISEARCH', path: null },
      { name: 'TYPESENSE', path: null },
      { name: 'ELASTICSEARCH', path: null },
      { name: 'FUSE.JS', path: null },
    ],
  },
];

export function HeroSection() {
  const [currentStackIndex, setCurrentStackIndex] = useState(0);

  // Rotate through provider stacks every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStackIndex((prev) => (prev + 1) % providerStacks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentStack = providerStacks[currentStackIndex];

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden px-4 pt-8 pb-16 sm:px-0 lg:min-h-screen lg:pt-12 lg:pb-20">
      <Container size="2xl">
        <div className="relative">
          {/* Main Hero Window - Wider, behind */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative isolate z-0 max-w-2xl lg:ml-16"
          >
            <Card size="auto">
              <CardHeader code="0x00" title="SYSTEM INIT" meta="SAAS BOILERPLATE v2.0" />
              <CardContent className="space-y-4 p-8">
                {/* Headline */}
                <div className="max-w-2xl">
                  <h1 className={cn('mb-2 text-xs', mode.color.text.muted, mode.font)}>
                    [FABRK INIT]
                  </h1>
                  {/* Mobile: Simple text headline */}
                  <h2
                    className={cn(
                      'mb-4 text-2xl leading-tight font-bold md:hidden',
                      mode.color.text.accent,
                      mode.font
                    )}
                  >
                    ZERO
                    <br />
                    LOCK-IN
                  </h2>
                  {/* Desktop: ASCII art */}
                  <pre
                    className={cn(
                      'mb-4 hidden text-xs leading-none md:block lg:text-xs',
                      mode.color.text.accent,
                      mode.font
                    )}
                  >
                    {` ███████████ ██████████ ███████████    ███████
░░███░░░░░░█░░███░░░░░█░░███░░░░░███  ███░░░░░███
 ░░░    ███  ░███   █ ░  ░███    ░███░███    ░███
    ███░     ░███████    ░██████████ ░███    ░███
   ███       ░███░░░█    ░███░░░░░███░███    ░███
 ████     █  ░███  ░     ░███    ░███░░███   ███
███████████  ██████████  █████   █████░░░███████░
░░░░░░░░░░░ ░░░░░░░░░░  ░░░░░   ░░░░░  ░░░░░░░



 █████        ███████      █████████  █████   ████       █████ ██████   █████
░░███       ███░░░░░███   ███░░░░░███░░███   ███░       ░░███ ░░██████ ░░███
 ░███      ███     ░░███ ███     ░░░  ░███  ███          ░███  ░███░███ ░███
 ░███     ░███      ░███░███          ░███████           ░███  ░███░░███░███
 ░███     ░███      ░███░███          ░███░░███          ░███  ░███ ░░██████
 ░███      ░░███    ███ ░░███     ███ ░███ ░░███         ░███  ░███  ░░█████
 ███████████░░░███████░   ░░█████████ █████ ░░████       █████ █████  ░░█████
░░░░░░░░░░░   ░░░░░░░      ░░░░░░░░░ ░░░░░   ░░░░       ░░░░░ ░░░░░    ░░░░░`}
                  </pre>
                  <p className={cn('mb-0 text-sm leading-relaxed', mode.color.text.muted)}>
                    <TypeWriter
                      text="29 providers. Switch Stripe to Polar in one line."
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
                    <span className={mode.color.text.accent}>5</span>{' '}
                    Payment
                  </span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>•</span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    <span className={mode.color.text.accent}>9</span>{' '}
                    AI
                  </span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>•</span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    <span className={mode.color.text.accent}>5</span>{' '}
                    Email
                  </span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>•</span>
                  <span className={cn('text-xs', mode.font, mode.color.text.muted)}>
                    <span className={mode.color.text.accent}>10</span>{' '}
                    Storage + Search
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

          {/* Right Column - Visual Proof (Hidden on mobile, overlays on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 lg:absolute lg:top-12 lg:-right-16 lg:mt-0 lg:w-full lg:max-w-[280px]"
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
                    LAUNCH PRICE: $199
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

            {/* Live Dashboard Preview - Show, don't tell (hidden on mobile) */}
            <div className="mt-8 hidden lg:-ml-24 lg:block">
              <HeroDashboardPreview />
            </div>
          </motion.div>
        </div>

        {/* Tech Stack - Below Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 lg:mt-20"
        >
          {/* Core Stack - Always visible */}
          <CardBadge code="0x02" label="CORE STACK" meta="STABLE" className="mb-4" />
          <div className="flex flex-wrap gap-2 mb-6">
            {coreStack.map((tech) => (
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

          {/* Rotating Provider Stack */}
          <div className="flex items-center gap-3 mb-4">
            <CardBadge
              code="0x03"
              label={`${currentStack.label} PROVIDERS`}
              meta="SWAPPABLE"
            />
            <div className="flex gap-1">
              {providerStacks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStackIndex(index)}
                  className={cn(
                    'size-2 border transition-colors',
                    mode.color.border.default,
                    index === currentStackIndex
                      ? mode.color.bg.accent
                      : mode.color.bg.surface
                  )}
                  aria-label={`Show ${providerStacks[index].label} providers`}
                />
              ))}
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStack.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {currentStack.providers.map((provider) => (
                <div
                  key={provider.name}
                  className={cn(
                    'flex items-center gap-2 border px-2 py-1',
                    mode.color.border.default,
                    mode.color.bg.surface
                  )}
                >
                  {provider.path ? (
                    <SimpleIcon path={provider.path} className="size-3.5" />
                  ) : (
                    <span className={cn('size-3.5 flex items-center justify-center text-[8px]', mode.color.text.muted)}>●</span>
                  )}
                  <span className={cn('text-xs', mode.font)}>{provider.name}</span>
                  <span className={cn('text-xs', mode.color.text.success, mode.font)}>[OK]</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
