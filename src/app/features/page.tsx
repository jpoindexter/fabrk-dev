/**
 * Features Page
 * Comprehensive showcase of all Fabrk capabilities
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import config from "@/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield, Zap, Database, Mail, CreditCard, Lock,
  Palette, Code, Rocket, Users, BarChart3, Globe,
  CheckCircle2, ArrowRight, Layers, Settings, FileText
} from "lucide-react";

export const metadata = {
  title: "Features | Fabrk - Complete Next.js SaaS Boilerplate",
  description: "Explore all features: authentication, payments, database, email, UI components, and more. Everything you need to launch your SaaS.",
};

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  badge?: string;
}

const coreFeatures: Feature[] = [
  {
    icon: Shield,
    title: "Authentication System",
    description: "Production-ready auth with NextAuth v5",
    badge: "Essential",
    details: [
      "Email/password with bcrypt (12 rounds)",
      "OAuth providers (Google, GitHub)",
      "Email verification with tokens",
      "Password reset flow",
      "Session management (JWT, 30-day expiry)",
      "Role-based access control (USER, ADMIN)",
      "Session versioning for instant invalidation",
    ],
  },
  {
    icon: CreditCard,
    title: "Stripe Integration",
    description: "Complete payment infrastructure",
    badge: "Essential",
    details: [
      "One-time payments & subscriptions",
      "Stripe Checkout with idempotency",
      "Webhook handling (verified signatures)",
      "Payment history tracking",
      "Customer portal integration",
      "Invoice generation",
      "Subscription tier management",
    ],
  },
  {
    icon: Database,
    title: "Database & ORM",
    description: "PostgreSQL with Prisma",
    details: [
      "Prisma ORM with type safety",
      "7 essential models (User, Payment, etc.)",
      "Optimized queries and indexes",
      "Migration-free development (db:push)",
      "Prisma Studio for data management",
      "Connection pooling",
      "Automatic type generation",
    ],
  },
  {
    icon: Mail,
    title: "Email System",
    description: "Transactional emails with Resend",
    details: [
      "Welcome emails after purchase",
      "Email verification",
      "Password reset emails",
      "HTML email templates",
      "Development mode (console logging)",
      "Resend integration",
      "Customizable templates",
    ],
  },
];

const uiFeatures: Feature[] = [
  {
    icon: Palette,
    title: "UI Component Library",
    description: "25+ production-ready components",
    badge: "Complete",
    details: [
      "Built on Radix UI primitives",
      "Fully accessible (WCAG AA)",
      "Dark mode support",
      "Customizable with Tailwind",
      "Form components with validation",
      "Data display components",
      "Feedback & overlay components",
    ],
  },
  {
    icon: Layers,
    title: "Neo-Brutalism Design",
    description: "Bold, modern aesthetic",
    details: [
      "3px borders & hard shadows",
      "Press animations",
      "Semantic color tokens",
      "4 landing page variations",
      "6 color scheme options",
      "Responsive across all devices",
      "Theme switcher component",
    ],
  },
  {
    icon: FileText,
    title: "Template Gallery",
    description: "8 ready-to-use page templates",
    details: [
      "Analytics dashboard",
      "User management",
      "Settings pages",
      "Billing dashboard",
      "Email templates",
      "Documentation layout",
      "Team management",
      "Security settings",
    ],
  },
];

const developerFeatures: Feature[] = [
  {
    icon: Code,
    title: "Developer Experience",
    description: "Built for productivity",
    badge: "Premium",
    details: [
      "TypeScript strict mode",
      "ESLint configuration",
      "Vitest for testing",
      "Hot reload with Turbopack",
      "Path aliases (@/components, @/lib)",
      "Git hooks (optional)",
      "VS Code config included",
    ],
  },
  {
    icon: Lock,
    title: "Security Best Practices",
    description: "Production-grade security",
    badge: "Essential",
    details: [
      "Content Security Policy headers",
      "CSRF protection",
      "Rate limiting (auth endpoints)",
      "Token hashing (SHA-256)",
      "Secure session management",
      "Input validation",
      "SQL injection prevention",
    ],
  },
  {
    icon: Rocket,
    title: "Deployment Ready",
    description: "Deploy anywhere, instantly",
    details: [
      "Vercel-optimized",
      "Docker support (standalone output)",
      "Environment variable management",
      "Build optimizations",
      "Error tracking ready (Sentry)",
      "Analytics ready",
      "CDN-friendly",
    ],
  },
  {
    icon: BarChart3,
    title: "API Infrastructure",
    description: "Well-structured backend",
    details: [
      "RESTful API routes",
      "Error handling middleware",
      "Structured logging",
      "Response standardization",
      "Rate limiting middleware",
      "CORS configuration",
      "API versioning ready",
    ],
  },
];

const bonusFeatures: Feature[] = [
  {
    icon: Users,
    title: "Multi-Tenant Ready",
    description: "Team features foundation",
    details: [
      "User roles (USER, ADMIN)",
      "Team data structure",
      "Invitation system ready",
      "Subscription tiers",
      "Trial period support",
      "License key management",
    ],
  },
  {
    icon: Globe,
    title: "SEO Optimized",
    description: "Built for discovery",
    details: [
      "Metadata API (Next.js 15)",
      "Sitemap generation",
      "Open Graph tags",
      "Schema.org markup ready",
      "Semantic HTML",
      "Performance optimized",
    ],
  },
  {
    icon: Settings,
    title: "Configuration System",
    description: "Centralized settings",
    details: [
      "Single config file (src/config.js)",
      "App metadata",
      "Feature flags",
      "Stripe configuration",
      "Email settings",
      "API rate limits",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b-3 border-border bg-gradient-to-b from-accent/30 to-background py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">Everything You Need</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Complete SaaS Infrastructure
            </h1>
            <p className="text-xl text-muted-foreground">
              Authentication, payments, database, email, UI components, and more.
              Stop wasting time on boilerplate code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/#pricing">
                  Get Started - {config.pricing.product.display.current}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/components">
                  View Components
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-7xl px-6 py-16 space-y-20">
        {/* Core Features */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-muted-foreground">
              The essential building blocks for any SaaS application
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {coreFeatures.map((feature, i) => (
              <Card key={i} className="hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    {feature.badge && <Badge>{feature.badge}</Badge>}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* UI Features */}
        <section className="bg-accent/20 -mx-6 px-6 py-16 md:-mx-16 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Beautiful UI Out of the Box</h2>
              <p className="text-xl text-muted-foreground">
                Pre-built components and templates to ship faster
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {uiFeatures.map((feature, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 border-2 border-border mb-4 w-fit">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    {feature.badge && <Badge className="mb-2 w-fit">{feature.badge}</Badge>}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Features */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built for Developers</h2>
            <p className="text-xl text-muted-foreground">
              Modern tooling and best practices included
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {developerFeatures.map((feature, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    {feature.badge && <Badge>{feature.badge}</Badge>}
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Bonus Features */}
        <section className="bg-accent/20 -mx-6 px-6 py-16 md:-mx-16 md:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Bonus Features</h2>
              <p className="text-xl text-muted-foreground">
                Additional capabilities to extend your SaaS
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {bonusFeatures.map((feature, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="p-3 rounded-lg bg-primary/10 border-2 border-border mb-4 w-fit">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-8 py-12">
          <h2 className="text-4xl font-bold">Ready to Build Your SaaS?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant access to all features, components, and templates.
            One-time payment, lifetime access, and all future updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/#pricing">
                Get Fabrk - {config.pricing.product.display.current}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/templates">
                View Templates
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            ✓ Instant access ✓ Lifetime updates ✓ 30-day money back guarantee
          </p>
        </section>
      </main>
    </div>
  );
}
