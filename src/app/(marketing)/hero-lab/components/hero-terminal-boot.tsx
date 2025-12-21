/**
 * Hero Variation 5: TERMINAL BOOT SEQUENCE
 * Hook: Developer-focused, immersive terminal experience
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight } from 'lucide-react';

const BOOT_SEQUENCE = [
  { text: '> INITIALIZING FABRK v1.0.0...', delay: 0, type: 'command' },
  { text: '', delay: 300, type: 'blank' },
  { text: '[BOOT] Loading configuration...', delay: 500, type: 'info' },
  { text: '[OK] Environment validated', delay: 800, type: 'success' },
  { text: '', delay: 900, type: 'blank' },
  { text: '[CORE] Mounting modules:', delay: 1100, type: 'info' },
  { text: '  ✓ AUTH          NextAuth v5 + 5 OAuth providers', delay: 1400, type: 'success' },
  { text: '  ✓ PAYMENTS      Stripe + Polar + Lemonsqueezy', delay: 1700, type: 'success' },
  { text: '  ✓ DATABASE      Prisma + PostgreSQL', delay: 2000, type: 'success' },
  { text: '  ✓ EMAIL         Resend + React Email', delay: 2300, type: 'success' },
  { text: '  ✓ UI            78 terminal-styled components', delay: 2600, type: 'success' },
  { text: '  ✓ THEMES        12 OKLCH color schemes', delay: 2900, type: 'success' },
  { text: '', delay: 3100, type: 'blank' },
  { text: '[TEST] Running validation suite...', delay: 3300, type: 'info' },
  { text: '  → 17,822 test lines executed', delay: 3600, type: 'info' },
  { text: '  → 100% coverage achieved', delay: 3900, type: 'success' },
  { text: '', delay: 4100, type: 'blank' },
  { text: '[READY] All systems operational', delay: 4300, type: 'success' },
  { text: '', delay: 4500, type: 'blank' },
  { text: '════════════════════════════════════════', delay: 4700, type: 'divider' },
  { text: '', delay: 4800, type: 'blank' },
  { text: '  FABRK PREMIUM - $299 ONE-TIME', delay: 5000, type: 'highlight' },
  { text: '  Ship your SaaS in days, not months.', delay: 5200, type: 'info' },
  { text: '', delay: 5400, type: 'blank' },
  { text: '════════════════════════════════════════', delay: 5600, type: 'divider' },
  { text: '', delay: 5700, type: 'blank' },
  { text: '> npm run dev', delay: 5900, type: 'command' },
  { text: '> Ready on http://localhost:3000', delay: 6200, type: 'success' },
  { text: '', delay: 6400, type: 'blank' },
  { text: '> _', delay: 6600, type: 'cursor' },
];

export function HeroTerminalBoot() {
  const [lines, setLines] = useState<typeof BOOT_SEQUENCE>([]);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    BOOT_SEQUENCE.forEach((line, index) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === BOOT_SEQUENCE.length - 1) {
          setTimeout(() => setShowCTA(true), 500);
        }
      }, line.delay);
    });
  }, []);

  return (
    <Container size="2xl">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Terminal Window */}
        <Card size="auto" className="overflow-hidden">
          {/* Terminal Header */}
          <div className={cn('flex items-center gap-2 px-4 py-2 border-b bg-muted/50', mode.font)}>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive/50" />
              <div className="h-3 w-3 rounded-full bg-warning/50" />
              <div className="h-3 w-3 rounded-full bg-success/50" />
            </div>
            <span className={cn('text-xs flex-1 text-center', mode.color.text.muted)}>
              fabrk — zsh — 80×24
            </span>
          </div>

          {/* Terminal Content */}
          <CardContent padding="sm" className="!p-0">
            <div className={cn('p-4 min-h-[400px] font-mono text-sm bg-background', mode.font)}>
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={cn(
                    'leading-relaxed',
                    line.type === 'command' && 'text-primary',
                    line.type === 'success' && 'text-success',
                    line.type === 'info' && mode.color.text.muted,
                    line.type === 'highlight' && 'text-primary font-bold text-lg',
                    line.type === 'divider' && mode.color.text.muted,
                    line.type === 'cursor' && 'text-primary animate-pulse'
                  )}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA - appears after boot */}
        <div
          className={cn(
            'flex flex-col sm:flex-row gap-4 justify-center transition-all duration-500',
            showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <PolarCheckoutButton
            className={cn(
              'bg-primary text-primary-foreground px-8 py-4 text-sm font-medium',
              mode.radius,
              mode.font
            )}
          >
            &gt; INITIALIZE YOUR PROJECT
            <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </PolarCheckoutButton>
          <Button
            variant="outline"
            asChild
            className={cn('px-6 py-4 text-xs', mode.radius, mode.font)}
          >
            <Link href="/library">&gt; VIEW LIVE DEMO</Link>
          </Button>
        </div>

        {/* Stats below */}
        <div
          className={cn(
            'grid grid-cols-4 gap-4 text-center transition-all duration-500',
            showCTA ? 'opacity-100' : 'opacity-0',
            mode.font
          )}
        >
          {[
            { value: '78', label: 'COMPONENTS' },
            { value: '48+', label: 'TEMPLATES' },
            { value: '12', label: 'THEMES' },
            { value: '72+', label: 'API ROUTES' },
          ].map((stat) => (
            <div key={stat.label} className="border p-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={cn('text-xs', mode.color.text.muted)}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
