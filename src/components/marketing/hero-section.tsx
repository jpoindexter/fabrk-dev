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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { COMPONENT_COUNT_STRING, TEMPLATE_COUNT_STRING } from '@/data/landing/stats';
import { ArrowRight, DollarSign, Users, TrendingUp, Activity, Check } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-8 pb-12 sm:px-0 lg:pt-12 lg:pb-16">
      <Container size="2xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* LEFT: Compact headline + CTAs */}
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Small badge */}
            <Link
              href="/docs/changelog"
              className={cn(
                'inline-flex items-center gap-2 border px-3 py-1.5 text-xs transition-colors hover:border-primary',
                mode.font,
                mode.color.text.muted
              )}
            >
              <span className="h-1.5 w-1.5 animate-pulse bg-green-500" />
              Fabrk v2.0 — See what&apos;s new
              <ArrowRight className="h-3 w-3" />
            </Link>

            {/* Headline */}
            <h1 className={cn('text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]', mode.font)}>
              Start building
              <br />
              <span className="text-primary">your app now</span>
            </h1>

            {/* Description */}
            <p className={cn('text-base lg:text-lg max-w-md leading-relaxed', mode.font, mode.color.text.muted)}>
              A production-ready SaaS boilerplate with auth, payments, and multi-tenancy.
              Just import and go—no configuration required.
            </p>

            {/* Code snippet */}
            <div className={cn('border bg-muted/50 p-4 text-xs', mode.font)}>
              <div className={mode.color.text.muted}>import &quot;@fabrk/styles.css&quot;;</div>
              <div className={mode.color.text.muted}>import {'{'} Auth, Billing {'}'} from &quot;@fabrk&quot;;</div>
              <div className="mt-2">
                <span className={mode.color.text.muted}>export default</span> () =&gt; {'{'}
              </div>
              <div className="pl-4">
                <span className="text-primary">&lt;Auth&gt;</span>
                <span className="text-green-500">&lt;Billing /&gt;</span>
                <span className="text-primary">&lt;/Auth&gt;</span>
              </div>
              <div>{'}'}</div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                Get started — $199
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="outline"
                asChild
                className={cn('px-5 py-2.5 text-sm', mode.radius, mode.font)}
              >
                <Link href="/library">Playground</Link>
              </Button>
            </div>

            {/* Stats inline */}
            <div className={cn('flex items-center gap-6 text-sm pt-2', mode.font, mode.color.text.muted)}>
              <span><span className="text-foreground font-medium">{COMPONENT_COUNT_STRING}</span> components</span>
              <span><span className="text-foreground font-medium">{TEMPLATE_COUNT_STRING}</span> templates</span>
              <span><span className="text-foreground font-medium">12</span> themes</span>
            </div>
          </div>

          {/* RIGHT: Live component preview */}
          <div className="space-y-4">
            {/* Dashboard Preview */}
            <Card size="auto">
              <CardHeader code="0x01" title="DASHBOARD" />
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'REVENUE', value: '$45,231', change: '+20.1%', icon: DollarSign },
                    { label: 'USERS', value: '2,350', change: '+15.3%', icon: Users },
                    { label: 'GROWTH', value: '12.5%', change: '+4.2%', icon: TrendingUp },
                    { label: 'ACTIVE', value: '1,234', change: '+8.7%', icon: Activity },
                  ].map((stat) => (
                    <div key={stat.label} className="border p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className={cn('text-[10px]', mode.font, mode.color.text.muted)}>{stat.label}</span>
                        <stat.icon className={cn('h-3 w-3', mode.color.text.muted)} />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className={cn('text-lg font-bold', mode.font)}>{stat.value}</span>
                        <span className={cn('text-[10px]', mode.font, mode.color.text.success)}>{stat.change}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Auth Preview */}
            <div className="grid grid-cols-2 gap-4">
              <Card size="auto">
                <CardHeader code="0x02" title="AUTH" />
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-1">
                    <Label className={cn('text-[10px]', mode.font)}>EMAIL</Label>
                    <Input placeholder="user@example.com" className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className={cn('text-[10px]', mode.font)}>PASSWORD</Label>
                    <Input type="password" placeholder="••••••••" className="h-8 text-xs" />
                  </div>
                  <Button size="sm" className={cn('w-full text-xs', mode.font)}>&gt; SIGN IN</Button>
                </CardContent>
              </Card>

              <Card size="auto">
                <CardHeader code="0x03" title="BILLING" />
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className={cn('text-2xl font-bold text-primary', mode.font)}>$199</span>
                    <span className={cn('text-xs line-through', mode.color.text.muted)}>$299</span>
                  </div>
                  <div className="space-y-1.5 text-[10px]">
                    {['Full source code', '77+ components', 'Lifetime updates'].map((f) => (
                      <div key={f} className={cn('flex items-center gap-1.5', mode.font, mode.color.text.muted)}>
                        <Check className="h-2.5 w-2.5 text-green-500" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Button size="sm" className={cn('w-full text-xs mt-2', mode.font)}>&gt; BUY NOW</Button>
                </CardContent>
              </Card>
            </div>

            {/* Activity Log */}
            <Card size="auto">
              <CardHeader code="0x04" title="ACTIVITY" />
              <CardContent className="p-4">
                <div className="space-y-2">
                  {[
                    { text: 'Payment received from user_4821', time: '2m ago' },
                    { text: 'New subscription started', time: '5m ago' },
                    { text: 'Invoice #1234 paid', time: '12m ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 border-l-2 border-primary pl-3 py-1">
                      <Check className={cn('h-3 w-3', mode.color.text.success)} />
                      <span className={cn('text-xs flex-1', mode.font)}>{item.text}</span>
                      <span className={cn('text-[10px]', mode.font, mode.color.text.muted)}>{item.time}</span>
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
