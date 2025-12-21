/**
 * Hero Variation 7: FEATURE CHECKLIST
 * Hook: Completeness flex with animated checkmarks
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
import { ArrowRight, Check, Square } from 'lucide-react';

const FEATURE_GROUPS = [
  {
    name: 'AUTHENTICATION',
    code: '0x01',
    features: [
      'NextAuth v5 integration',
      'Google OAuth provider',
      'GitHub OAuth provider',
      'Magic link email auth',
      'Session management',
      'Protected routes',
    ],
  },
  {
    name: 'PAYMENTS',
    code: '0x02',
    features: [
      'Stripe subscriptions',
      'Polar.sh integration',
      'Lemonsqueezy support',
      'Webhook handlers',
      'Customer portal',
      'Usage-based billing',
    ],
  },
  {
    name: 'UI COMPONENTS',
    code: '0x03',
    features: [
      '78 production components',
      '7 chart types',
      'Form components',
      'Data tables',
      'Navigation',
      'Feedback components',
    ],
  },
  {
    name: 'DESIGN SYSTEM',
    code: '0x04',
    features: [
      '12 terminal themes',
      'OKLCH color system',
      'Dark mode support',
      'Responsive layouts',
      'Typography scale',
      'Animation tokens',
    ],
  },
];

function FeatureItem({ text, delay }: { text: string; delay: number }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChecked(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs transition-all duration-300',
        mode.font,
        checked ? 'opacity-100' : 'opacity-40'
      )}
    >
      <div
        className={cn(
          'h-4 w-4 border flex items-center justify-center transition-colors',
          checked ? 'border-success bg-success/20' : 'border-muted'
        )}
      >
        {checked ? (
          <Check className="h-3 w-3 text-success" />
        ) : (
          <Square className="h-3 w-3 text-muted" />
        )}
      </div>
      <span className={checked ? '' : 'line-through'}>{text}</span>
    </div>
  );
}

export function HeroFeatureChecklist() {
  const [totalChecked, setTotalChecked] = useState(0);
  const totalFeatures = FEATURE_GROUPS.reduce((acc, g) => acc + g.features.length, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalChecked((prev) => (prev < totalFeatures ? prev + 1 : prev));
    }, 100);
    return () => clearInterval(interval);
  }, [totalFeatures]);

  return (
    <Container size="2xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight', mode.font)}>
            EVERYTHING YOU NEED
            <br />
            <span className="text-primary">NOTHING YOU DON&apos;T</span>
          </h1>
          <p className={cn('text-sm', mode.font, mode.color.text.muted)}>
            Every feature has been battle-tested in production.
            No bloat, no unused code, no guesswork.
          </p>

          {/* Progress */}
          <div className={cn('flex items-center justify-center gap-4', mode.font)}>
            <span className={cn('text-2xl font-bold', mode.color.text.success)}>
              {totalChecked}/{totalFeatures}
            </span>
            <span className={cn('text-xs', mode.color.text.muted)}>FEATURES INCLUDED</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_GROUPS.map((group, groupIndex) => (
            <Card key={group.name} size="auto">
              <CardHeader code={group.code} title={group.name} />
              <CardContent padding="md">
                <div className="space-y-2">
                  {group.features.map((feature, featureIndex) => (
                    <FeatureItem
                      key={feature}
                      text={feature}
                      delay={(groupIndex * group.features.length + featureIndex) * 100}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid gap-8 lg:grid-cols-2 items-center pt-8 border-t">
          {/* What You Skip */}
          <Card size="auto">
            <CardHeader code="0x05" title="WHAT YOU DON'T HAVE TO BUILD" />
            <CardContent padding="md">
              <div className={cn('space-y-2 text-xs', mode.font)}>
                {[
                  { item: 'Auth system from scratch', time: '40 hours' },
                  { item: 'Stripe integration', time: '24 hours' },
                  { item: 'Component library', time: '120 hours' },
                  { item: 'Design system', time: '32 hours' },
                  { item: 'Testing infrastructure', time: '16 hours' },
                ].map((row) => (
                  <div key={row.item} className="flex items-center justify-between">
                    <span className={cn('line-through', mode.color.text.muted)}>{row.item}</span>
                    <span className="text-success">-{row.time}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex items-center justify-between font-bold">
                  <span>TOTAL SAVED</span>
                  <span className="text-success">232 HOURS</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="space-y-6">
            <div className={cn('text-sm', mode.font, mode.color.text.muted)}>
              Stop reinventing the wheel. Get everything you need to ship your SaaS,
              with code you can actually understand and modify.
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <PolarCheckoutButton
                className={cn(
                  'bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                  mode.radius,
                  mode.font
                )}
              >
                &gt; GET THE FULL STACK
                <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </PolarCheckoutButton>
              <Button
                variant="ghost"
                asChild
                className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
              >
                <Link href="/docs/features">&gt; VIEW ALL FEATURES</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
