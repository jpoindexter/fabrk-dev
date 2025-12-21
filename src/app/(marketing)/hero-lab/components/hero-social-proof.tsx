/**
 * Hero Variation 6: SOCIAL PROOF STACK
 * Hook: Trust through numbers and testimonials
 */
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PolarCheckoutButton } from '@/components/polar/checkout-button';
import { cn } from '@/lib/utils';
import { mode } from '@/design-system';
import { ArrowRight, Star, GitBranch, Users, Download } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'ALEX CHEN',
    role: 'Founder @ LaunchFast',
    text: 'Shipped my MVP in 3 days instead of 3 months. The terminal aesthetic is exactly what I wanted.',
    avatar: 'AC',
  },
  {
    name: 'SARAH MILLER',
    role: 'Solo Developer',
    text: 'The component library alone is worth 10x the price. Everything just works.',
    avatar: 'SM',
  },
  {
    name: 'JAMES WILSON',
    role: 'CTO @ StartupXYZ',
    text: 'We evaluated 5 boilerplates. Fabrk had the best code quality by far.',
    avatar: 'JW',
  },
];

function AnimatedStat({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroSocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container size="2xl">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* LEFT: Stats + Testimonials */}
        <div className="space-y-8">
          {/* Big Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card size="auto">
              <CardContent padding="md" className="text-center">
                <GitBranch className={cn('h-6 w-6 mx-auto mb-2', mode.color.text.primary)} />
                <div className={cn('text-3xl font-bold', mode.font)}>
                  <AnimatedStat target={1247} />
                </div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>GITHUB STARS</div>
              </CardContent>
            </Card>

            <Card size="auto">
              <CardContent padding="md" className="text-center">
                <Users className={cn('h-6 w-6 mx-auto mb-2', mode.color.text.primary)} />
                <div className={cn('text-3xl font-bold', mode.font)}>
                  <AnimatedStat target={500} suffix="+" />
                </div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>DEVELOPERS</div>
              </CardContent>
            </Card>

            <Card size="auto">
              <CardContent padding="md" className="text-center">
                <Download className={cn('h-6 w-6 mx-auto mb-2', mode.color.text.primary)} />
                <div className={cn('text-3xl font-bold', mode.font)}>
                  <AnimatedStat target={2834} />
                </div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>DOWNLOADS</div>
              </CardContent>
            </Card>

            <Card size="auto">
              <CardContent padding="md" className="text-center">
                <Star className={cn('h-6 w-6 mx-auto mb-2', mode.color.text.warning)} />
                <div className={cn('text-3xl font-bold', mode.font)}>4.9</div>
                <div className={cn('text-xs', mode.font, mode.color.text.muted)}>AVG RATING</div>
              </CardContent>
            </Card>
          </div>

          {/* Rotating Testimonials */}
          <Card size="auto">
            <CardHeader code="0x01" title="DEVELOPER FEEDBACK" />
            <CardContent padding="md">
              <div className="relative min-h-[120px]">
                {TESTIMONIALS.map((testimonial, i) => (
                  <div
                    key={i}
                    className={cn(
                      'absolute inset-0 transition-all duration-500',
                      i === activeTestimonial
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4'
                    )}
                  >
                    <div className="flex gap-4">
                      <Avatar className={cn('h-10 w-10 shrink-0', mode.radius)}>
                        <AvatarFallback className={cn(mode.font, 'text-xs')}>
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <p className={cn('text-sm', mode.font)}>
                          &quot;{testimonial.text}&quot;
                        </p>
                        <div className={cn('text-xs', mode.font)}>
                          <span className="font-bold">{testimonial.name}</span>
                          <span className={mode.color.text.muted}> — {testimonial.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4 pt-4 border-t">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={cn(
                      'h-2 w-2 transition-colors',
                      i === activeTestimonial ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Copy */}
        <div className="space-y-8">
          <div className={cn('flex items-center gap-2', mode.font)}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-warning text-warning" />
            ))}
            <span className={cn('text-sm ml-2', mode.color.text.muted)}>4.9/5 from 127 reviews</span>
          </div>

          <h1 className={cn('text-4xl sm:text-5xl font-bold tracking-tight leading-tight', mode.font)}>
            TRUSTED BY
            <br />
            <span className="text-primary">500+ DEVELOPERS</span>
          </h1>

          <p className={cn('text-sm max-w-md leading-relaxed', mode.font, mode.color.text.muted)}>
            Join hundreds of developers who&apos;ve shipped faster with Fabrk.
            From solo founders to funded startups, our boilerplate powers production SaaS apps worldwide.
          </p>

          {/* Trust Badges */}
          <div className={cn('flex flex-wrap gap-3', mode.font)}>
            {['PRODUCTION TESTED', 'ACTIVELY MAINTAINED', 'DISCORD SUPPORT', '14-DAY REFUND'].map(
              (badge) => (
                <span
                  key={badge}
                  className={cn('text-xs border px-2 py-1', mode.color.text.muted)}
                >
                  {badge}
                </span>
              )
            )}
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
              &gt; JOIN 500+ DEVELOPERS
              <span className={cn('ml-2 text-xs', mode.state.secondary.opacity)}>$299</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </PolarCheckoutButton>
            <Button
              variant="ghost"
              asChild
              className={cn('px-4 py-3 text-xs', mode.radius, mode.font)}
            >
              <Link href="https://github.com/fabrk/fabrk">&gt; VIEW ON GITHUB</Link>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
