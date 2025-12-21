/**
 * Hero Variation 8: PRICING BREAKDOWN
 * Hook: Value calculator showing ROI
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
import { ArrowRight, Calculator, Clock, DollarSign } from 'lucide-react';

const COST_ITEMS = [
  { name: 'Authentication System', diyHours: 40, diyRate: 150, included: true },
  { name: 'Payment Integration', diyHours: 24, diyRate: 150, included: true },
  { name: 'UI Component Library', diyHours: 120, diyRate: 150, included: true },
  { name: 'Design System', diyHours: 32, diyRate: 150, included: true },
  { name: 'Testing Setup', diyHours: 16, diyRate: 150, included: true },
  { name: 'Email Templates', diyHours: 8, diyRate: 150, included: true },
  { name: 'Dashboard Templates', diyHours: 24, diyRate: 150, included: true },
  { name: 'Documentation', diyHours: 16, diyRate: 150, included: true },
];

function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = value / steps;
    let count = 0;

    const timer = setInterval(() => {
      count += increment;
      if (count >= value) {
        setCurrent(value);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(count));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroPricingBreakdown() {
  const totalHours = COST_ITEMS.reduce((acc, item) => acc + item.diyHours, 0);
  const totalDIYCost = COST_ITEMS.reduce((acc, item) => acc + item.diyHours * item.diyRate, 0);
  const fabrkPrice = 299;
  const savings = totalDIYCost - fabrkPrice;

  return (
    <Container size="2xl">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* LEFT: Calculator */}
        <div className="space-y-6">
          <div className={cn('flex items-center gap-2', mode.font)}>
            <Calculator className={cn('h-4 w-4', mode.color.text.primary)} />
            <span className={cn('text-xs', mode.color.text.muted)}>VALUE CALCULATOR</span>
          </div>

          <Card size="auto">
            <CardHeader code="0x01" title="BUILD VS BUY ANALYSIS" />
            <CardContent padding="md">
              <div className="space-y-3">
                {/* Header */}
                <div className={cn('grid grid-cols-3 gap-4 text-xs pb-2 border-b', mode.font, mode.color.text.muted)}>
                  <span>FEATURE</span>
                  <span className="text-right">DIY HOURS</span>
                  <span className="text-right">DIY COST</span>
                </div>

                {/* Items */}
                {COST_ITEMS.map((item) => (
                  <div
                    key={item.name}
                    className={cn('grid grid-cols-3 gap-4 text-xs', mode.font)}
                  >
                    <span>{item.name}</span>
                    <span className={cn('text-right', mode.color.text.muted)}>
                      {item.diyHours}h
                    </span>
                    <span className="text-right">
                      ${(item.diyHours * item.diyRate).toLocaleString()}
                    </span>
                  </div>
                ))}

                {/* Total DIY */}
                <div className={cn('grid grid-cols-3 gap-4 text-xs pt-3 border-t font-bold', mode.font)}>
                  <span>DIY TOTAL</span>
                  <span className="text-right">{totalHours}h</span>
                  <span className="text-right">${totalDIYCost.toLocaleString()}</span>
                </div>

                {/* Fabrk Price */}
                <div className={cn('grid grid-cols-3 gap-4 text-xs font-bold', mode.font, mode.color.text.success)}>
                  <span>FABRK</span>
                  <span className="text-right">2h</span>
                  <span className="text-right">$299</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hourly Rate Assumption */}
          <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
            * Calculations based on $150/hour developer rate (US average for senior devs)
          </div>
        </div>

        {/* RIGHT: Savings + CTA */}
        <div className="space-y-8">
          <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight', mode.font)}>
            BUILD IT YOURSELF?
            <br />
            <span className={cn('text-2xl', mode.color.text.muted)}>THAT&apos;LL BE</span>
            <br />
            <span className="text-destructive line-through">
              <AnimatedNumber value={totalDIYCost} prefix="$" />
            </span>
          </h1>

          {/* Savings Card */}
          <Card size="auto" className="border-success">
            <CardContent padding="lg">
              <div className="text-center space-y-4">
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
                  YOUR SAVINGS WITH FABRK
                </div>
                <div className={cn('text-6xl font-bold', mode.font, mode.color.text.success)}>
                  <AnimatedNumber value={savings} prefix="$" />
                </div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
                  THAT&apos;S <span className="text-success font-bold">{Math.round((savings / totalDIYCost) * 100)}%</span> SAVINGS
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time vs Money */}
          <div className="grid grid-cols-2 gap-4">
            <Card size="auto">
              <CardContent padding="md" className="text-center">
                <Clock className={cn('h-6 w-6 mx-auto mb-2', mode.color.text.primary)} />
                <div className={cn('text-2xl font-bold', mode.font)}>
                  <AnimatedNumber value={totalHours - 2} />h
                </div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>TIME SAVED</div>
              </CardContent>
            </Card>

            <Card size="auto">
              <CardContent padding="md" className="text-center">
                <DollarSign className={cn('h-6 w-6 mx-auto mb-2', mode.color.text.success)} />
                <div className={cn('text-2xl font-bold', mode.font)}>
                  <AnimatedNumber value={Math.round(savings / fabrkPrice)} />x
                </div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>ROI</div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <PolarCheckoutButton
              className={cn(
                'w-full bg-primary text-primary-foreground px-6 py-4 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; SAVE ${savings.toLocaleString()} NOW
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('w-full px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/docs/pricing">&gt; SEE WHAT&apos;S INCLUDED</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
