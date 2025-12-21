/**
 * Hero Variation 9: THEME SHOWCASE
 * Hook: Visual variety with live theme switching
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Palette, Check } from 'lucide-react';

const THEMES = [
  { name: 'GREEN', class: 'theme-green', primary: '#4ade80', desc: 'Classic CRT phosphor' },
  { name: 'AMBER', class: 'theme-amber', primary: '#fbbf24', desc: 'Warm terminal glow' },
  { name: 'RED', class: 'theme-red', primary: '#f87171', desc: 'Alert & urgent' },
  { name: 'BLUE', class: 'theme-blue', primary: '#60a5fa', desc: 'Cool & professional' },
  { name: 'PURPLE', class: 'theme-purple', primary: '#a78bfa', desc: 'Modern cyberpunk' },
  { name: 'GAMEBOY', class: 'theme-gameboy', primary: '#9bbc0f', desc: 'Retro nostalgia' },
  { name: 'C64', class: 'theme-c64', primary: '#7869c4', desc: 'Commodore vibes' },
  { name: 'SPECTRUM', class: 'theme-spectrum', primary: '#00d4aa', desc: 'ZX inspired' },
  { name: 'ATARI', class: 'theme-atari', primary: '#ff6b35', desc: '80s arcade' },
  { name: 'VIC20', class: 'theme-vic20', primary: '#00a0c0', desc: 'Cyan dreams' },
  { name: 'B&W', class: 'theme-bw', primary: '#ffffff', desc: 'Minimal monochrome' },
  { name: 'GB POCKET', class: 'theme-gbpocket', primary: '#c4cfa1', desc: 'Subtle & clean' },
];

function ThemeCard({ theme, isActive, onClick }: { theme: typeof THEMES[0]; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'border p-3 text-left transition-all',
        mode.font,
        isActive ? 'border-primary ring-1 ring-primary' : mode.state.hover.card
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <div
          className="h-3 w-3"
          style={{ backgroundColor: theme.primary }}
        />
        <span className="text-xs font-bold">{theme.name}</span>
        {isActive && <Check className="h-3 w-3 text-primary ml-auto" />}
      </div>
      <div className={cn('text-xs', mode.color.text.muted)}>{theme.desc}</div>
    </button>
  );
}

function DashboardPreview({ theme }: { theme: typeof THEMES[0] }) {
  return (
    <Card size="auto" className="overflow-hidden">
      <CardHeader code="0x01" title="DASHBOARD PREVIEW" />
      <CardContent padding="md">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { label: 'REVENUE', value: '$12,847' },
            { label: 'USERS', value: '1,234' },
            { label: 'GROWTH', value: '+23%' },
          ].map((stat) => (
            <div key={stat.label} className={cn('text-center text-xs', mode.font)}>
              <div className={mode.color.text.muted}>{stat.label}</div>
              <div className="font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className={cn('flex justify-between text-xs', mode.font)}>
            <span className={mode.color.text.muted}>MONTHLY GOAL</span>
            <span>75%</span>
          </div>
          <Progress value={75} />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge>ACTIVE</Badge>
          <Badge variant="secondary">PREMIUM</Badge>
          <Badge variant="outline">v1.0.0</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export function HeroThemeShowcase() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setActiveTheme((prev) => (prev + 1) % THEMES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleThemeClick = (index: number) => {
    setActiveTheme(index);
    setAutoRotate(false);
  };

  return (
    <Container size="2xl">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* LEFT: Preview */}
        <div className="space-y-6 order-2 lg:order-1">
          {/* Active Theme Badge */}
          <div className={cn('flex items-center gap-4', mode.font)}>
            <div
              className="h-4 w-4 animate-pulse"
              style={{ backgroundColor: THEMES[activeTheme].primary }}
            />
            <span className="text-xs">
              ACTIVE: <span className="font-bold">{THEMES[activeTheme].name}</span>
            </span>
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={cn(
                'ml-auto text-xs border px-2 py-1',
                autoRotate ? 'text-success' : mode.color.text.muted
              )}
            >
              {autoRotate ? 'AUTO: ON' : 'AUTO: OFF'}
            </button>
          </div>

          {/* Dashboard Preview */}
          <div
            className={cn('transition-colors duration-500', THEMES[activeTheme].class)}
            style={{
              // Apply theme color as CSS custom property
              '--primary': THEMES[activeTheme].primary,
            } as React.CSSProperties}
          >
            <DashboardPreview theme={THEMES[activeTheme]} />
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {THEMES.map((theme, i) => (
              <ThemeCard
                key={theme.name}
                theme={theme}
                isActive={i === activeTheme}
                onClick={() => handleThemeClick(i)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Copy */}
        <div className="space-y-8 order-1 lg:order-2">
          <div className={cn('flex items-center gap-2', mode.font)}>
            <Palette className={cn('h-4 w-4', mode.color.text.primary)} />
            <span className={cn('text-xs', mode.color.text.muted)}>DESIGN SYSTEM</span>
          </div>

          <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight leading-tight', mode.font)}>
            12 THEMES
            <br />
            <span className="text-primary">ZERO DESIGN</span>
            <br />
            <span className="text-primary">DECISIONS</span>
          </h1>

          <p className={cn('text-sm max-w-md leading-relaxed', mode.font, mode.color.text.muted)}>
            Every theme is built on OKLCH color science for perfect contrast ratios
            and accessibility compliance. Switch themes with one click—your entire
            app transforms instantly.
          </p>

          {/* Theme Features */}
          <div className={cn('space-y-3 text-xs', mode.font)}>
            {[
              'OKLCH color system for perceptual uniformity',
              'WCAG 2.1 AA contrast compliance',
              'Dark mode support out of the box',
              'CSS custom properties for easy customization',
              'Consistent across all 78 components',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check className="h-3 w-3 text-success" />
                <span>{feature}</span>
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
              &gt; GET ALL 12 THEMES
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/docs/themes">&gt; EXPLORE THEMES</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
