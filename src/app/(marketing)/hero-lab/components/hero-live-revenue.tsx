/**
 * Hero Variation 2: LIVE REVENUE
 * Hook: Real SaaS metrics in action with animated events
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, DollarSign, Users, Zap, TrendingUp } from 'lucide-react';

const EVENTS = [
  { type: 'payment', message: 'Payment received: $49.00', user: 'user_8291' },
  { type: 'signup', message: 'New user signed up', user: 'alex@startup.io' },
  { type: 'upgrade', message: 'Plan upgraded to Pro', user: 'user_4821' },
  { type: 'payment', message: 'Payment received: $99.00', user: 'user_1234' },
  { type: 'signup', message: 'New user signed up', user: 'dev@agency.com' },
  { type: 'webhook', message: 'Stripe webhook: invoice.paid', user: 'stripe' },
  { type: 'payment', message: 'Payment received: $199.00', user: 'user_9182' },
  { type: 'signup', message: 'New user signed up', user: 'founder@mvp.co' },
];

function AnimatedRevenue({ target }: { target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        const increment = Math.random() * 50 + 10;
        return v + increment > target ? target : v + increment;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [target]);

  return <span>${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>;
}

export function HeroLiveRevenue() {
  const [events, setEvents] = useState<typeof EVENTS>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let index = 0;
    const interval = setInterval(() => {
      setEvents((prev) => {
        const newEvents = [EVENTS[index % EVENTS.length], ...prev].slice(0, 5);
        return newEvents;
      });
      index++;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container size="2xl">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* LEFT: Revenue Dashboard */}
        <div className="space-y-6 order-2 lg:order-1">
          {/* Main Revenue Card */}
          <Card size="auto">
            <CardHeader code="0x01" title="LIVE DASHBOARD" />
            <CardContent padding="md">
              <div className="space-y-6">
                {/* Big Revenue Number */}
                <div className="text-center py-6 border-b">
                  <div className={cn('text-xs mb-2', mode.font, mode.color.text.muted)}>
                    MONTHLY RECURRING REVENUE
                  </div>
                  <div className={cn('text-5xl font-bold', mode.font)}>
                    {mounted ? <AnimatedRevenue target={12847} /> : '$0'}
                  </div>
                  <div className={cn('text-sm mt-2', mode.font, mode.color.text.success)}>
                    +23.5% from last month
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: Users, label: 'USERS', value: '847', change: '+12%' },
                    { icon: DollarSign, label: 'ARPU', value: '$15.17', change: '+8%' },
                    { icon: TrendingUp, label: 'GROWTH', value: '23.5%', change: '+5%' },
                  ].map((stat) => (
                    <div key={stat.label} className={cn('text-center text-xs', mode.font)}>
                      <stat.icon className={cn('h-4 w-4 mx-auto mb-1', mode.color.text.muted)} />
                      <div className={mode.color.text.muted}>{stat.label}</div>
                      <div className="font-bold">{stat.value}</div>
                      <div className={mode.color.text.success}>{stat.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Events */}
          <Card size="auto">
            <CardHeader code="0x02" title="LIVE EVENTS" />
            <CardContent padding="md">
              <div className={cn('space-y-2 text-xs', mode.font)}>
                {events.length === 0 ? (
                  <div className={cn('text-center py-4', mode.color.text.muted)}>
                    Waiting for events...
                  </div>
                ) : (
                  events.map((event, i) => (
                    <div
                      key={`${event.user}-${i}`}
                      className={cn(
                        'flex items-center gap-3 border-l-2 pl-3 py-1 transition-all',
                        i === 0 && 'border-success animate-pulse',
                        i !== 0 && 'border-muted opacity-60'
                      )}
                    >
                      <Zap
                        className={cn(
                          'h-3 w-3 shrink-0',
                          event.type === 'payment' && 'text-success',
                          event.type === 'signup' && 'text-primary',
                          event.type === 'upgrade' && 'text-warning',
                          event.type === 'webhook' && mode.color.text.muted
                        )}
                      />
                      <span className="flex-1">{event.message}</span>
                      <span className={mode.color.text.muted}>{event.user}</span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Copy */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className={cn('text-xs px-2 py-1 border w-fit', mode.font, mode.color.text.success)}>
            <span className="h-1.5 w-1.5 inline-block bg-success animate-pulse mr-2" />
            LIVE DEMO DATA
          </div>

          <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight leading-tight', mode.font)}>
            YOUR SAAS
            <br />
            <span className="text-primary">IN 48 HOURS</span>
          </h1>

          <p className={cn('text-sm max-w-md leading-relaxed', mode.font, mode.color.text.muted)}>
            This is what your dashboard could look like by Wednesday.
            Real-time analytics, Stripe webhooks, user management—all wired up and ready to ship.
          </p>

          {/* Value Props */}
          <div className={cn('space-y-3 text-xs', mode.font)}>
            {[
              'Stripe subscriptions + webhooks pre-configured',
              'Real-time dashboard with live data',
              'User authentication with 5 OAuth providers',
              'Production-ready from day one',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={cn('h-1.5 w-1.5 bg-success')} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <PolarCheckoutButton
              className={cn(
                'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; START BUILDING
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/library">&gt; VIEW LIVE DEMOS</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
