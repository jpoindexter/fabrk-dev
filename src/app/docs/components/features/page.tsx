"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Shield, Zap, Lock, Database, Mail, CreditCard } from "lucide-react";

// Simplified Features Demo
function FeaturesDemo() {
  const features = [
    { icon: Shield, title: "AUTHENTICATION", desc: "NextAuth v5 with multiple providers" },
    { icon: CreditCard, title: "PAYMENTS", desc: "Stripe integration ready" },
    { icon: Mail, title: "EMAIL", desc: "Resend for transactional emails" },
    { icon: Database, title: "DATABASE", desc: "Prisma ORM with PostgreSQL" },
    { icon: Lock, title: "SECURITY", desc: "CSRF, rate limiting, validation" },
    { icon: Zap, title: "PERFORMANCE", desc: "Optimized for Core Web Vitals" },
  ];

  return (
    <section className="w-full border border-border bg-background p-6">
      <div className="mb-6">
        <span className="inline-block border border-border bg-card px-4 py-1 font-mono text-xs text-muted-foreground">
          [ [0x20] FEATURES ] CORE_MODULES
        </span>
        <h2 className="mt-4 font-mono text-xl font-bold">WHAT&apos;S_INCLUDED</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="border border-border bg-card p-4 transition-colors hover:border-primary/50">
            <div className="mb-4 flex items-center gap-2">
              <feature.icon className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs font-bold">{feature.title}</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Tech Stack variant
function TechStackDemo() {
  const tech = [
    { name: "NEXT.JS", status: "OK" },
    { name: "REACT", status: "OK" },
    { name: "TYPESCRIPT", status: "OK" },
    { name: "TAILWIND", status: "OK" },
    { name: "PRISMA", status: "OK" },
  ];

  return (
    <div className="w-full border border-border bg-background p-6">
      <div className="mb-4 font-mono text-xs text-muted-foreground">[ TECH_STACK ] DEPENDENCIES</div>
      <div className="flex flex-wrap gap-4">
        {tech.map((t) => (
          <div key={t.name} className="flex items-center gap-2 border border-border bg-card px-4 py-1.5">
            <span className="font-mono text-xs">{t.name}</span>
            <span className="font-mono text-xs text-success">[{t.status}]</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <ComponentShowcaseTemplate
      code="[LC.03]"
      title="Features Section"
      description="Grid-based feature showcases with icons, descriptions, and terminal-style headers."
      mainPreview={{
        preview: <FeaturesDemo />,
        code: `import { FeaturesSection } from "@/components/landing/features-section";

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      {/* Other sections */}
    </main>
  );
}`,
      }}
      variants={[
        {
          title: "Tech Stack Display",
          description: "Technology badges with status indicators",
          preview: <TechStackDemo />,
          code: `import { TechStack } from "@/components/landing/tech-stack";

<TechStack />

// Displays technology logos with [OK] status badges`,
        },
        {
          title: "Feature Card",
          description: "Individual feature card component",
          preview: (
            <div className="max-w-sm border border-border bg-card p-4 transition-colors hover:border-primary/50">
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs font-bold">AUTHENTICATION</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                NextAuth v5 with Google OAuth, credentials, and magic link support.
              </p>
            </div>
          ),
          code: `<div className="border border-border bg-card p-4 hover:border-primary/50">
  <div className="flex items-center gap-2 mb-4">
    <Shield className="h-4 w-4 text-primary" />
    <span className="font-mono text-xs font-bold">AUTHENTICATION</span>
  </div>
  <p className="font-mono text-xs text-muted-foreground">
    NextAuth v5 with multiple providers
  </p>
</div>`,
        },
      ]}
      props={[
        {
          name: "features",
          type: "{ icon: LucideIcon; title: string; description: string }[]",
          description: "Array of features to display",
        },
        {
          name: "columns",
          type: "2 | 3 | 4",
          description: "Number of columns in the grid",
          default: "3",
        },
      ]}
      accessibility={[
        "Icons are decorative and hidden from screen readers",
        "Each feature has semantic heading structure",
        "Keyboard navigation through focusable cards",
        "High contrast text for readability",
      ]}
      previous={{ title: "Hero", href: "/docs/components/hero" }}
      next={{ title: "Pricing", href: "/docs/components/pricing" }}
    />
  );
}
