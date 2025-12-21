/**
 * Hero Variation 4: COMPONENT GALLERY
 * Hook: Visual overwhelm of what's included
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
import { ArrowRight, Check, X, Bell, User, CreditCard, BarChart3, Table2, Calendar, Settings, Mail, Lock, Gauge, PieChart } from 'lucide-react';

const COMPONENTS = [
  { name: 'Button', icon: Check, category: 'UI' },
  { name: 'Card', icon: CreditCard, category: 'UI' },
  { name: 'Table', icon: Table2, category: 'Data' },
  { name: 'Chart', icon: BarChart3, category: 'Data' },
  { name: 'Calendar', icon: Calendar, category: 'UI' },
  { name: 'Dialog', icon: Settings, category: 'UI' },
  { name: 'Toast', icon: Bell, category: 'Feedback' },
  { name: 'Avatar', icon: User, category: 'UI' },
  { name: 'Badge', icon: Check, category: 'UI' },
  { name: 'Progress', icon: Gauge, category: 'Feedback' },
  { name: 'Form', icon: Mail, category: 'Input' },
  { name: 'Auth', icon: Lock, category: 'Feature' },
  { name: 'Billing', icon: CreditCard, category: 'Feature' },
  { name: 'Analytics', icon: PieChart, category: 'Data' },
  { name: 'Sidebar', icon: Settings, category: 'Layout' },
  { name: 'Tabs', icon: Table2, category: 'UI' },
];

function MiniComponent({ name, icon: Icon, index }: { name: string; icon: React.ComponentType<{ className?: string }>; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={cn(
        'group border p-3 transition-all duration-300 hover:border-primary',
        mode.state.hover.card,
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn('h-4 w-4', mode.color.text.muted, 'group-hover:text-primary')} />
        <span className={cn('text-xs', mode.font)}>{name}</span>
      </div>
    </div>
  );
}

export function HeroComponentGallery() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => (c < 78 ? c + 1 : c));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container size="2xl">
      <div className="grid gap-12 lg:grid-cols-5">
        {/* LEFT: Component Grid (3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Component Count */}
          <div className="flex items-center justify-between">
            <div className={cn('text-xs', mode.font, mode.color.text.muted)}>
              [COMPONENT LIBRARY]
            </div>
            <div className={cn('text-xs', mode.font)}>
              <span className="text-primary font-bold">{count}</span>
              <span className={mode.color.text.muted}>/78 LOADED</span>
            </div>
          </div>

          {/* Component Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COMPONENTS.map((comp, i) => (
              <MiniComponent key={comp.name} {...comp} index={i} />
            ))}
            {/* Placeholder for "more" */}
            <div className={cn('border border-dashed p-3 flex items-center justify-center', mode.color.text.muted)}>
              <span className={cn('text-xs', mode.font)}>+62 MORE</span>
            </div>
          </div>

          {/* Live Previews */}
          <div className="grid grid-cols-2 gap-4">
            <Card size="auto">
              <CardHeader code="0x01" title="BUTTONS" />
              <CardContent padding="md">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className={cn(mode.radius, mode.font, 'text-xs')}>PRIMARY</Button>
                  <Button size="sm" variant="outline" className={cn(mode.radius, mode.font, 'text-xs')}>OUTLINE</Button>
                  <Button size="sm" variant="ghost" className={cn(mode.radius, mode.font, 'text-xs')}>GHOST</Button>
                </div>
              </CardContent>
            </Card>

            <Card size="auto">
              <CardHeader code="0x02" title="BADGES" />
              <CardContent padding="md">
                <div className="flex flex-wrap gap-2">
                  <Badge>DEFAULT</Badge>
                  <Badge variant="secondary">SECONDARY</Badge>
                  <Badge variant="destructive">ALERT</Badge>
                </div>
              </CardContent>
            </Card>

            <Card size="auto">
              <CardHeader code="0x03" title="PROGRESS" />
              <CardContent padding="md">
                <div className="space-y-2">
                  <Progress value={75} />
                  <div className={cn('text-xs', mode.font, mode.color.text.muted)}>75% COMPLETE</div>
                </div>
              </CardContent>
            </Card>

            <Card size="auto">
              <CardHeader code="0x04" title="STATS" />
              <CardContent padding="md">
                <div className={cn('text-2xl font-bold', mode.font)}>$12,847</div>
                <div className={cn('text-xs', mode.font, mode.color.text.success)}>+23.5%</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT: Copy (2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          <h1 className={cn('text-4xl font-bold tracking-tight leading-tight', mode.font)}>
            78 COMPONENTS
            <br />
            <span className="text-primary">$299</span>
            <br />
            <span className={cn('text-xl', mode.color.text.muted)}>DO THE MATH.</span>
          </h1>

          <p className={cn('text-sm leading-relaxed', mode.font, mode.color.text.muted)}>
            Every component you&apos;ll ever need, designed with terminal aesthetics
            and built for production. Stop building buttons. Start building products.
          </p>

          {/* Category Breakdown */}
          <Card size="auto">
            <CardHeader code="0x05" title="BY CATEGORY" />
            <CardContent padding="md">
              <div className={cn('space-y-2 text-xs', mode.font)}>
                {[
                  { name: 'UI PRIMITIVES', count: 32 },
                  { name: 'DATA DISPLAY', count: 18 },
                  { name: 'FORMS & INPUT', count: 12 },
                  { name: 'FEEDBACK', count: 8 },
                  { name: 'CHARTS', count: 8 },
                ].map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <span className={mode.color.text.muted}>{cat.name}</span>
                    <span className="font-bold">{cat.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Comparison */}
          <div className={cn('border p-4 space-y-3', mode.font)}>
            <div className="flex items-center justify-between text-xs">
              <span className={mode.color.text.muted}>78 COMPONENTS @ $50/EA</span>
              <span className="line-through opacity-50">$3,900</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={mode.color.text.muted}>AUTH + PAYMENTS</span>
              <span className="line-through opacity-50">$2,000</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className={mode.color.text.muted}>DESIGN SYSTEM</span>
              <span className="line-through opacity-50">$1,500</span>
            </div>
            <div className="border-t pt-3 flex items-center justify-between">
              <span className="font-bold">FABRK TOTAL</span>
              <span className={cn('text-xl font-bold', mode.color.text.success)}>$299</span>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <PolarCheckoutButton
              className={cn(
                'w-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium',
                mode.radius,
                mode.font
              )}
            >
              &gt; GET ALL 78 COMPONENTS
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('w-full px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="/docs/components">&gt; BROWSE COMPONENT DOCS</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
