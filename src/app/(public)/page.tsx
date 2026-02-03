/**
 * Home Page - Clean, Achromatic-inspired landing page
 * Production-ready
 */

import type { Metadata } from 'next';
import { HeroSection } from '@/components/marketing/hero-section';
import { LazyPlayground } from '@/components/marketing/lazy-playground';
import { FeaturesShowcase } from '@/components/marketing/features-showcase';
import { StatsSection } from '@/components/marketing/stats-section';
import { UseCasesSection } from '@/components/marketing/use-cases-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { WhatsIncludedSection } from '@/components/marketing/whats-included-section';
import { FAQSection } from '@/components/marketing/faq-section';
import { FinalCTASection } from '@/components/marketing/final-cta-section';
import { Reveal } from '@/components/motion';
import { generateFAQSchema, generateWebSiteSchema } from '@/lib/metadata';
import { FAQ_QUESTIONS } from '@/data/landing';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fabrk.dev';

export const metadata: Metadata = {
  title: 'Fabrk - Next.js SaaS Boilerplate | Ship Production Apps Fast',
  description:
    'The complete Next.js SaaS starter kit with authentication, payments, multi-tenancy, and 62+ terminal-styled UI components. Build and launch your SaaS in days, not months.',
  keywords: [
    'Next.js boilerplate',
    'SaaS starter kit',
    'React boilerplate',
    'NextAuth template',
    'Stripe integration',
    'TypeScript boilerplate',
    'Tailwind CSS template',
    'multi-tenant SaaS',
  ],
  openGraph: {
    title: 'Fabrk - Next.js SaaS Boilerplate | Ship Production Apps Fast',
    description:
      'Complete Next.js SaaS starter kit with auth, payments, and 62+ UI components. Launch your SaaS in days.',
    type: 'website',
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fabrk - Next.js SaaS Boilerplate',
    description: 'Ship production SaaS apps fast with 62+ terminal-styled components.',
  },
  alternates: {
    canonical: baseUrl,
  },
};

// Generate FAQ schema for SEO
const faqSchema = generateFAQSchema(
  FAQ_QUESTIONS.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
  }))
);

// Generate WebSite schema for sitelinks search
const webSiteSchema = generateWebSiteSchema();

export default function HomePage() {
  return (
    <>
      {/* SEO: Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      {/* Hero - Sticky card effect */}
      <HeroSection />

      {/* Content slides up over the hero */}
      <div className="relative z-20 bg-background">
        {/* Interactive Playground - Lazy loaded for better LCP */}
        <Reveal>
          <LazyPlayground />
        </Reveal>

        {/* What Makes Fabrk Different - Unique features (Terminal UI, 31 Demos, AI Credits, 3 Providers) */}
        <Reveal>
          <FeaturesShowcase />
        </Reveal>

        {/* Trust Indicators - Updated with verifiable stats */}
        <Reveal>
          <StatsSection />
        </Reveal>

        {/* Target Personas - Who Fabrk is for */}
        <Reveal>
          <UseCasesSection />
        </Reveal>

        {/* Pricing - Launch price ($199) for first 100 buyers */}
        <Reveal>
          <PricingSection />
        </Reveal>

        {/* What's Included - NEW: Auth/Billing/Multi-tenancy checklist */}
        <Reveal>
          <WhatsIncludedSection />
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <FAQSection />
        </Reveal>

        {/* Final Conversion Push */}
        <Reveal>
          <FinalCTASection />
        </Reveal>
      </div>

    </>
  );
}
