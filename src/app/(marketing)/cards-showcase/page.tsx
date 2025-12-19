/**
 * Cards Showcase - Visual comparison of all card types
 * For design system validation
 */

'use client';

import { Container } from '@/components/ui/container';
import { BenefitCard } from '@/components/landing/benefit-card';
import { UseCaseCard } from '@/components/landing/use-case-card';
import { StatCard } from '@/components/landing/stat-card';
import { PricingCard } from '@/components/landing/pricing-card';
import { TestimonialsWall } from '@/components/marketing/testimonials-wall';
import { IntegrationsGrid } from '@/components/marketing/integrations-grid';
import { TechStackSection } from '@/components/marketing/tech-stack-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FounderSection } from '@/components/marketing/founder-section';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Code, Rocket, Shield, Users, Zap, Star } from 'lucide-react';

// Sample data for cards
const SAMPLE_BENEFIT = {
  icon: Code,
  module: 'AUTH_MODULE',
  code: '0x10',
  benefit: 'Production-Ready Authentication',
  description: 'Complete auth system',
  timeSaved: '40+ HRS',
  costSaved: '$4,000+',
  features: [
    'OAuth providers (Google, GitHub, etc.)',
    'Magic link authentication',
    'JWT session management',
    'Rate limiting built-in',
    'RBAC permissions',
  ] as const,
  ctaHref: '/docs/features/authentication',
};

const SAMPLE_USE_CASE = {
  icon: Rocket,
  persona: 'Solo Founders',
  painPoint: 'Spending months building infrastructure instead of your actual product',
  solution: 'Skip the boilerplate and ship your MVP in days',
  features: [
    'Pre-built auth and billing',
    'Multi-tenancy ready',
    'Production-grade security',
    'Scale when you need to',
    '77+ UI components',
  ] as const,
};

const SAMPLE_STATS = [
  { icon: Zap, value: '77+', label: 'UI COMPONENTS' },
  { icon: Shield, value: '12', label: 'THEMES' },
  { icon: Users, value: '100+', label: 'HOURS SAVED' },
  { icon: Star, value: '5.0', label: 'RATING' },
];

export default function CardsShowcasePage() {
  return (
    <div className="min-h-screen py-12">
      <Container>
        {/* Page Header */}
        <div className="mb-12 border-b border-border pb-8">
          <h1 className={cn('text-3xl font-bold uppercase', mode.font)}>CARDS SHOWCASE</h1>
          <p className={cn('mt-2', mode.typography.caption)}>
            Visual comparison of all card types for design system validation
          </p>
        </div>

        {/* BenefitCard */}
        <section className="mb-16">
          <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>BENEFIT CARD</h2>
          <div className="grid max-w-md gap-4">
            <BenefitCard {...SAMPLE_BENEFIT} index={0} />
          </div>
        </section>

        {/* UseCaseCard */}
        <section className="mb-16">
          <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>USE CASE CARD</h2>
          <div className="grid max-w-md gap-4">
            <UseCaseCard {...SAMPLE_USE_CASE} index={0} />
          </div>
        </section>

        {/* StatCard */}
        <section className="mb-16">
          <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>STAT CARDS</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {SAMPLE_STATS.map((stat, index) => (
              <StatCard key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </section>

        {/* PricingCard */}
        <section className="mb-16">
          <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>PRICING CARD</h2>
          <div className="grid max-w-md gap-4">
            <PricingCard />
          </div>
        </section>
      </Container>

      {/* Full-width sections */}
      <div className="space-y-0">
        {/* TestimonialsWall */}
        <section>
          <Container>
            <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>
              TESTIMONIALS WALL
            </h2>
          </Container>
          <TestimonialsWall />
        </section>

        {/* IntegrationsGrid */}
        <section>
          <Container>
            <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>
              INTEGRATIONS GRID
            </h2>
          </Container>
          <IntegrationsGrid />
        </section>

        {/* TechStackSection */}
        <section>
          <Container>
            <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>
              TECH STACK SECTION
            </h2>
          </Container>
          <TechStackSection />
        </section>

        {/* WhatsIncludedSection */}
        <section>
          <Container>
            <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>
              WHATS INCLUDED SECTION
            </h2>
          </Container>
          <WhatsIncludedSection />
        </section>

        {/* FounderSection */}
        <section>
          <Container>
            <h2 className={cn('mb-6 text-xl font-semibold uppercase', mode.font)}>
              FOUNDER SECTION
            </h2>
          </Container>
          <FounderSection />
        </section>
      </div>
    </div>
  );
}
