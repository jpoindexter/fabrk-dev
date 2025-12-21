/**
 * Hero Variation 1: TIME SAVED
 * Hook: Show literal time comparison with animated counter
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
import { ArrowRight, Clock, Check, Calendar } from 'lucide-react';

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export function HeroTimeSaved() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container size="2xl">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* LEFT: Time Saved Counter */}
        <div className="space-y-8">
          {/* Big Counter */}
          <div className="space-y-2">
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              [DEVELOPER HOURS SAVED]
            </div>
            <div className={cn('text-7xl sm:text-8xl font-bold tracking-tight', mode.font)}>
              {mounted ? <AnimatedCounter target={232} /> : '0'}
              <span className={cn('text-2xl ml-2', mode.color.text.muted)}>HRS</span>
            </div>
          </div>

          {/* Comparison */}
          <div className={cn('grid grid-cols-2 gap-4 p-4 border', mode.font)}>
            <div className="space-y-1">
              <div className={cn('text-xs', mode.color.text.muted)}>[FROM SCRATCH]</div>
              <div className="text-2xl font-bold line-through opacity-50">6 WEEKS</div>
              <div className={cn('text-xs', mode.color.text.danger)}>+ MAINTENANCE HELL</div>
            </div>
            <div className="space-y-1 border-l pl-4">
              <div className={cn('text-xs', mode.color.text.muted)}>[WITH FABRK]</div>
              <div className={cn('text-2xl font-bold', mode.color.text.success)}>2 DAYS</div>
              <div className={cn('text-xs', mode.color.text.success)}>+ PRODUCTION READY</div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className={cn('text-3xl sm:text-4xl font-bold tracking-tight', mode.font)}>
              STOP REBUILDING
              <br />
              <span className="text-primary">START SHIPPING</span>
            </h1>
            <p className={cn('text-sm max-w-md', mode.font, mode.color.text.muted)}>
              Every SaaS needs auth, payments, and dashboards. We built it once, perfectly.
              You focus on what makes your product unique.
            </p>
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
              &gt; SAVE 232 HOURS NOW
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/docs">&gt; SEE WHAT&apos;S INCLUDED</Link>
            </Button>
          </div>
        </div>

        {/* RIGHT: Visual Calendar */}
        <div className="space-y-4">
          <Card size="auto">
            <CardHeader code="0x01" title="YOUR NEXT 6 WEEKS" />
            <CardContent padding="md">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 42 }).map((_, i) => {
                  const isShipped = i < 2;
                  const isBuildingWithoutFabrk = i >= 2 && i < 42;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'aspect-square border flex items-center justify-center text-xs',
                        mode.font,
                        isShipped && 'bg-success/20 border-success',
                        !isShipped && isBuildingWithoutFabrk && 'bg-muted/20 border-muted',
                        mounted && isShipped && 'animate-pulse'
                      )}
                    >
                      {isShipped && <Check className="h-3 w-3 text-success" />}
                    </div>
                  );
                })}
              </div>
              <div className={cn('flex items-center gap-4 mt-4 pt-4 border-t text-xs', mode.font)}>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-success/20 border border-success" />
                  <span className={mode.color.text.muted}>WITH FABRK (2 DAYS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-muted/20 border border-muted" />
                  <span className={mode.color.text.muted}>WITHOUT (6 WEEKS)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What You Skip */}
          <Card size="auto">
            <CardHeader code="0x02" title="SKIP THE BORING STUFF" />
            <CardContent padding="md">
              <div className={cn('space-y-2 text-xs', mode.font)}>
                {[
                  { task: 'Setting up NextAuth with 5 providers', hours: '16h' },
                  { task: 'Building Stripe subscription flow', hours: '24h' },
                  { task: 'Creating 78 UI components', hours: '120h' },
                  { task: 'Writing 17,822 lines of tests', hours: '40h' },
                  { task: 'Designing responsive layouts', hours: '32h' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-l-2 border-primary pl-3 py-1"
                  >
                    <span className="line-through opacity-50">{item.task}</span>
                    <span className={cn('text-success')}>-{item.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
