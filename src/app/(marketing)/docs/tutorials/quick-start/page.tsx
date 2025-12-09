import { FeatureGuideTemplate } from '@/components/docs';
import { DocsSection, DocsLinkCard } from '@/components/docs';
import { Rocket, Layout, Settings, Upload } from 'lucide-react';

export const metadata = {
  title: 'Quick Start Guide - Fabrk Docs',
  description:
    'Launch your MVP in minutes. Assemble a production-ready landing page with authentication, payments, and core SaaS features.',
};

export default function QuickStartPage() {
  return (
    <FeatureGuideTemplate
      code="[0x00]"
      category="Tutorials"
      title="Quick_Start"
      description="Assemble a production-ready landing page and core features in minutes."
      overview="This guide assumes you have completed the Getting Started setup and have your local development server running."
      features={[
        {
          icon: Rocket,
          title: 'Fast Setup',
          description: 'Launch in minutes with pre-built components.',
        },
        {
          icon: Layout,
          title: 'Landing Page',
          description: 'Responsive, accessible landing sections.',
        },
        {
          icon: Settings,
          title: 'Config',
          description: 'Centralized app configuration.',
        },
        {
          icon: Upload,
          title: 'Deploy',
          description: 'Push to Vercel for production.',
        },
      ]}
      usage={[
        {
          title: 'Assemble Landing Page',
          description: 'Update src/app/page.tsx with pre-built components',
          code: `import { Navigation } from "@/components/marketing/navigation";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { Footer } from "@/components/shared/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </div>
  );
}`,
          language: 'typescript',
        },
        {
          title: 'Configure App Metadata',
          description: 'Open src/config.js to customize your app',
          code: `const config = {
  app: {
    name: "Acme Corp",
    description: "The enterprise solution for...",
    url: process.env.NEXT_PUBLIC_APP_URL,
    author: "Acme Team",
    supportEmail: "support@acme.com",
  },
  // ...
};`,
          language: 'javascript',
        },
        {
          title: 'Enable Lead Capture (Optional)',
          description: 'Swap the CTA for a waitlist form for Coming Soon pages',
          code: `// In hero-section.tsx
import { WaitlistForm } from "@/components/waitlist-form";

// Replace Button with:
<WaitlistForm />`,
          language: 'typescript',
        },
        {
          title: 'Production Deployment',
          description:
            'Push to Vercel for automatic SSL, edge caching, and CI/CD',
          code: `git add .
git commit -m "Initial MVP release"
git push origin main`,
          language: 'bash',
        },
      ]}
      previous={{ title: 'Getting Started', href: '/docs/getting-started' }}
      next={{ title: 'Authentication', href: '/docs/tutorials/authentication' }}
    >
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/tutorials/authentication"
            title="Setup Authentication"
            description="Configure Google OAuth and secure sessions"
          />
          <DocsLinkCard
            href="/docs/features/payments"
            title="Configure Payments"
            description="Connect Stripe for subscriptions"
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
