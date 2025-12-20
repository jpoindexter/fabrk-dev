/**
 * ✅ FABRK COMPONENT
 * Hero Section - Framer/Radix style
 * Small headline left, live component preview right
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { COMPONENT_COUNT_STRING, TEMPLATE_COUNT_STRING } from '@/data/landing/stats';
import { getLatestVersion } from '@/data/changelog';
import { ArrowRight, Check } from 'lucide-react';
import { SimpleIcon } from '@/components/ui/simple-icon';
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siPrisma,
  siAuth0,
} from 'simple-icons';

const CURRENT_VERSION = getLatestVersion();

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-12 sm:px-0 lg:pt-12 lg:pb-16">
      <Container size="2xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* LEFT: Compact headline + CTAs */}
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Small badge */}
            <Link
              href="/changelog"
              className={cn(
                'inline-flex items-center gap-2 border px-2 py-1 text-xs transition-colors hover:border-primary',
                mode.font,
                mode.color.text.muted
              )}
            >
              <span className="h-1.5 w-1.5 animate-pulse bg-success" role="status" aria-label="Live" />
              FABRK V{CURRENT_VERSION} — SEE WHAT&apos;S NEW
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Headline */}
            <h1 className={cn(mode.typography.heading.h1, 'lg:text-5xl tracking-tight leading-[1.1]', mode.font)}>
              START BUILDING
              <br />
              <span className="text-primary">YOUR APP NOW</span>
            </h1>

            {/* Description - outcome focused */}
            <p className={cn('text-sm max-w-lg leading-relaxed', mode.font, mode.color.text.muted)}>
              Ship your SaaS in days, not months. Production-ready auth, payments, and multi-tenancy—just import and deploy.
            </p>

            {/* Code snippet - compressed */}
            <div className={cn('border bg-muted/50 p-3 text-xs', mode.font)}>
              <div className={mode.color.text.muted}>import {'{'} Auth, Billing {'}'} from &quot;@fabrk&quot;;</div>
              <div className="mt-1">
                <span className={mode.color.text.accent}>&lt;Auth&gt;</span>
                <span className={mode.color.text.success}>&lt;Billing /&gt;</span>
                <span className={mode.color.text.accent}>&lt;/Auth&gt;</span>
                <span className={cn('ml-2', mode.color.text.muted)}>// 2 lines. Done.</span>
              </div>
            </div>

            {/* CTAs - clear hierarchy */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET STARTED
                <span className="ml-2 opacity-70 text-xs">$199</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('px-4 py-2 text-xs', mode.radius, mode.font, mode.color.text.muted, 'hover:text-foreground')}
              >
                <Link href="/library">&gt; EXPLORE PLAYGROUND</Link>
              </Button>
            </div>

            {/* Stats - stronger visual weight */}
            <div className={cn('grid grid-cols-3 gap-4 text-sm py-3 border-y', mode.font)}>
              <span className="text-center"><span className="text-foreground font-bold">{COMPONENT_COUNT_STRING}</span> <span className={mode.color.text.muted}>COMPONENTS</span></span>
              <span className="text-center"><span className="text-foreground font-bold">{TEMPLATE_COUNT_STRING}</span> <span className={mode.color.text.muted}>TEMPLATES</span></span>
              <span className="text-center"><span className="text-foreground font-bold">12</span> <span className={mode.color.text.muted}>THEMES</span></span>
            </div>

            {/* Tech Stack */}
            <div className="pt-4 border-t">
              <div className={cn('text-xs mb-3', mode.font, mode.color.text.muted)}>BUILT WITH:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'NEXTJS', path: siNextdotjs.path, href: 'https://nextjs.org' },
                  { name: 'REACT', path: siReact.path, href: 'https://react.dev' },
                  { name: 'TS', path: siTypescript.path, href: 'https://www.typescriptlang.org' },
                  { name: 'TAILWIND', path: siTailwindcss.path, href: 'https://tailwindcss.com' },
                  { name: 'PRISMA', path: siPrisma.path, href: 'https://www.prisma.io' },
                  { name: 'AUTH', path: siAuth0.path, href: 'https://authjs.dev' },
                ].map((tech) => (
                  <a
                    key={tech.name}
                    href={tech.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-2 border px-2 py-1 text-xs transition-colors hover:border-primary hover:text-foreground',
                      mode.font,
                      mode.color.text.muted
                    )}
                  >
                    <SimpleIcon path={tech.path} className="size-3" />
                    <span>{tech.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Live component preview - aligned with headline */}
          <div className="space-y-4 lg:mt-[51px]">
            {/* Dashboard Preview */}
            <Card size="auto">
              <CardHeader code="0x01" title="DASHBOARD" />
              <CardContent padding="md">
                <div className={cn('space-y-2 text-xs', mode.font)}>
                  {[
                    { label: 'REVENUE', value: '$45,231', change: '+20.1%' },
                    { label: 'USERS', value: '2,350', change: '+15.3%' },
                    { label: 'GROWTH', value: '12.5%', change: '+4.2%' },
                    { label: 'ACTIVE', value: '1,234', change: '+8.7%' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between border-l-2 border-primary pl-3 py-1">
                      <span className={mode.color.text.muted}>{stat.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{stat.value}</span>
                        <span className={mode.color.text.success}>{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preview Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Terminal */}
              <Card size="auto">
                <CardHeader code="0x02" title="TERMINAL" />
                <CardContent padding="md">
                  <div className={cn('space-y-1 text-xs', mode.font)}>
                    <div className={mode.color.text.muted}>$ npm install @fabrk/ui</div>
                    <div className={mode.color.text.success}>+ @fabrk/ui@2.0.0</div>
                    <div className={mode.color.text.muted}>$ npm run dev</div>
                    <div className={mode.color.text.accent}>Ready on localhost:3000</div>
                  </div>
                </CardContent>
              </Card>

              {/* Status */}
              <Card size="auto">
                <CardHeader code="0x03" title="STATUS" />
                <CardContent padding="md">
                  <div className={cn('space-y-2 text-xs', mode.font)}>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-success animate-pulse" />
                      <span>ALL SYSTEMS ONLINE</span>
                    </div>
                    <div className={cn('text-xs', mode.color.text.muted)}>
                      API: 99.9% UPTIME
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Log */}
            <Card size="auto">
              <CardHeader code="0x04" title="ACTIVITY" />
              <CardContent padding="md">
                <div className="space-y-2">
                  {[
                    { text: 'Payment received from user_4821', time: '2m ago' },
                    { text: 'New subscription started', time: '5m ago' },
                    { text: 'Invoice #1234 paid', time: '12m ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 border-l-2 border-primary pl-3 py-1">
                      <Check className={cn('h-3 w-3', mode.color.text.success)} />
                      <span className={cn('text-xs flex-1', mode.font)}>{item.text}</span>
                      <span className={cn('text-xs', mode.font, mode.color.text.muted)}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
