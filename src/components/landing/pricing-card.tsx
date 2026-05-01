/**
 * ✅ FABRK COMPONENT
 * PricingCard - Reusable pricing display component
 * Removes 3× duplication (Hero, PricingSection, ExitIntentPopup)
 * Production-ready ✓
 */
'use client';

import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { PRICING } from '@/data/landing/pricing';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  className?: string;
}

export function PricingCard({ className }: PricingCardProps) {
  const highlights = ['NO SUBSCRIPTION', 'UNLIMITED PROJECTS', 'PRODUCTION-READY'];

  return (
    <Card size="auto" className={cn('w-full max-w-sm', className)}>
      {/* Custom Header with Terminal Icon */}
      <div className="border-border bg-card flex h-11 items-center justify-between border-b px-4">
        <span className={cn('text-muted-foreground text-xs tracking-wide', mode.font)}>
          [0x41] PRICING_CONFIG
        </span>
        <Terminal className="text-primary h-5 w-5 animate-pulse" />
      </div>

      <CardContent padding="md" className="flex flex-col items-center text-center">
        <h3 className={cn('text-foreground text-sm font-bold tracking-wide uppercase', mode.font)}>
          OPEN SOURCE
        </h3>

        <div className="mt-6 flex w-full flex-col items-center py-4">
          <p className={cn('text-primary text-7xl leading-none font-bold lg:text-8xl', mode.font)}>
            {PRICING.display.current}
          </p>
          <p
            className={cn('text-muted-foreground mt-3 text-xs tracking-wider uppercase', mode.font)}
          >
            MIT LICENSED
          </p>
        </div>

        <PolarCheckoutButton
          className={cn(
            'bg-primary text-primary-foreground hover:bg-primary/90 group mt-6 flex h-14 w-full items-center justify-center gap-2 border text-base font-bold tracking-wider uppercase transition-all',
            mode.radius,
            mode.font
          )}
        >
          <span>{PRICING.cta.label}</span>
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </PolarCheckoutButton>

        <div className="mt-6 flex w-full flex-wrap justify-center gap-x-4 gap-y-2">
          {highlights.map((item) => (
            <p
              key={item}
              className={cn('text-primary text-xs font-bold tracking-wider uppercase', mode.font)}
            >
              ✓ {item}
            </p>
          ))}
        </div>

        <p className={cn('text-muted-foreground mt-4 text-center text-xs', mode.font)}>
          {PRICING.trustLine}
        </p>

        <Link
          href="https://github.com/THEFT-DEV/fabrk"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'group mt-4 flex items-center gap-1.5 text-xs transition-colors',
            'text-muted-foreground hover:text-primary',
            mode.font
          )}
        >
          <span>View on GitHub</span>
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
