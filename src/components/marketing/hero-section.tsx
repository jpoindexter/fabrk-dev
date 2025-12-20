/**
 * ✅ FABRK COMPONENT
 * Hero Section - Clean, bold, terminal-first
 * Single panel design with integrated pricing
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
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
import { Badge as CardBadge } from '@/components/ui/card';
import { COMPONENT_COUNT_STRING, TEMPLATE_COUNT_STRING } from '@/data/landing/stats';
import { Check } from 'lucide-react';

const techStack = [
  { name: 'NEXT.JS', path: siNextdotjs.path },
  { name: 'REACT', path: siReact.path },
  { name: 'TYPESCRIPT', path: siTypescript.path },
  { name: 'TAILWIND', path: siTailwindcss.path },
  { name: 'PRISMA', path: siPrisma.path },
  { name: 'STRIPE', path: siStripe.path },
  { name: 'RESEND', path: siResend.path },
];

const features = [
  'Auth + Payments + Teams',
  '77+ Components',
  '12 Terminal Themes',
  'Lifetime Updates',
];

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden px-4 pt-12 pb-16 sm:px-0 lg:pt-20 lg:pb-24">
      <Container size="2xl">
        {/* Centered Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <div className="mb-8 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-2">
            <span className="h-2 w-2 animate-pulse bg-green-500" />
            <span className={cn('text-xs uppercase tracking-wider', mode.font, mode.color.text.muted)}>
              SYSTEM ONLINE // SAAS BOILERPLATE v2.0
            </span>
          </div>

          {/* Main Headline */}
          <h1 className={cn('text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-primary mb-6', mode.font)}>
            SHIP YOUR SAAS
            <br />
            <span className="text-foreground">THIS WEEKEND</span>
          </h1>

          {/* Subheadline */}
          <p className={cn('text-lg md:text-xl max-w-2xl mx-auto mb-8', mode.font, mode.color.text.muted)}>
            Terminal-first boilerplate with auth, payments, and multi-tenancy.
            <br className="hidden md:block" />
            <span className="text-primary">875+ hours</span> of work, ready to deploy.
          </p>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            <div className="text-center">
              <div className={cn('text-2xl md:text-3xl font-bold text-primary', mode.font)}>{COMPONENT_COUNT_STRING}</div>
              <div className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>Components</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className={cn('text-2xl md:text-3xl font-bold text-primary', mode.font)}>{TEMPLATE_COUNT_STRING}</div>
              <div className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>Templates</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className={cn('text-2xl md:text-3xl font-bold text-primary', mode.font)}>12</div>
              <div className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>Themes</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <div className={cn('text-2xl md:text-3xl font-bold text-primary', mode.font)}>&lt;5</div>
              <div className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>Min Setup</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-8 py-4 text-base font-bold transition-all hover:scale-105',
                mode.radius,
                mode.font
              )}
            >
              &gt; GET FABRK — $199
              <span className="ml-2 text-sm line-through opacity-60">$299</span>
            </PolarCheckoutButton>
            <Button
              variant="outline"
              size="lg"
              asChild
              className={cn('px-8 py-4 text-sm', mode.radius, mode.font)}
            >
              <Link href="/library">&gt; EXPLORE DEMOS</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {features.map((feature) => (
              <div
                key={feature}
                className={cn('flex items-center gap-2 border px-3 py-1.5 text-xs', mode.font, mode.color.text.muted)}
              >
                <Check className="h-3 w-3 text-green-500" />
                {feature}
              </div>
            ))}
          </div>

          {/* Launch Offer Badge */}
          <div className="inline-flex items-center gap-4 border-2 border-primary bg-primary/5 px-6 py-3">
            <div className="text-left">
              <div className={cn('text-xs uppercase', mode.font, mode.color.text.muted)}>[LAUNCH OFFER]</div>
              <div className={cn('text-sm', mode.font)}>
                <span className="text-primary font-bold">$199</span>
                <span className={cn('ml-2 line-through', mode.color.text.muted)}>$299</span>
                <span className={cn('ml-2', mode.color.text.muted)}>• First 100 buyers</span>
              </div>
            </div>
            <div className="bg-primary text-primary-foreground px-3 py-1 text-sm font-bold animate-pulse">
              -$100
            </div>
          </div>
        </div>

        {/* Tech Stack - Below Hero */}
        <div className="mt-16 lg:mt-20">
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
        </div>
      </Container>
    </section>
  );
}
