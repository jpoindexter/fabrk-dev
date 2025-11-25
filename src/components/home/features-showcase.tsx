/**
 * ✅ FABRK COMPONENT
 * Features Showcase - Highlight all major built-in features
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { H2, H3, Body, BodyMuted, Small } from "@/components/ui/typography";
import {
  Lock,
  CreditCard,
  Database,
  Zap,
  Users,
  Settings,
  Code,
  Mail,
  TestTube,
  BookOpen,
  BarChart3,
  Shield,
} from "lucide-react";

const FEATURES = [
  {
    id: "auth",
    icon: Lock,
    title: "Complete Authentication",
    description: "NextAuth v5 with email/password, Google OAuth, and magic links. Sessions, 2FA, password reset, all built-in and production-ready.",
    highlights: [
      "Email/password authentication",
      "Google OAuth integration",
      "Magic link passwordless auth",
      "2FA and MFA support",
      "Session management",
      "Password reset flow",
    ],
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "Stripe Payments Built-In",
    description: "One-time payments, subscriptions, customer portal, invoicing. Stripe webhooks, idempotency handling, and full billing dashboard included.",
    highlights: [
      "One-time purchases",
      "Recurring subscriptions",
      "Customer portal",
      "Invoice generation",
      "Webhook handling",
      "Payment history",
    ],
  },
  {
    id: "database",
    icon: Database,
    title: "PostgreSQL + Prisma ORM",
    description: "Production-grade database with Prisma ORM. 13+ pre-defined models for users, organizations, payments, webhooks, and more.",
    highlights: [
      "PostgreSQL database",
      "Prisma ORM with migrations",
      "13+ data models",
      "Type-safe queries",
      "Relationship management",
      "Database seeding",
    ],
  },
  {
    id: "realtime",
    icon: Zap,
    title: "Real-Time Features",
    description: "Pusher integration for real-time notifications, activity feeds, and presence tracking. Live collaboration ready.",
    highlights: [
      "Real-time notifications",
      "Activity feed",
      "Presence tracking",
      "Channel authorization",
      "Live updates",
      "User online status",
    ],
  },
  {
    id: "multitenancy",
    icon: Users,
    title: "Multi-Tenancy & RBAC",
    description: "Complete organization support with role-based access control. Owner, Admin, Member, Guest roles with per-org data isolation.",
    highlights: [
      "Organizations/workspaces",
      "Role-based access (RBAC)",
      "Member management",
      "Invitations system",
      "Data isolation",
      "Permission checking",
    ],
  },
  {
    id: "admin",
    icon: Settings,
    title: "Admin Dashboard",
    description: "Complete admin interface for user management, analytics, system health monitoring, and user impersonation for debugging.",
    highlights: [
      "User management table",
      "Organization overview",
      "Revenue analytics",
      "System health metrics",
      "User impersonation",
      "Audit logs",
    ],
  },
  {
    id: "api",
    icon: Code,
    title: "API Keys & Webhooks",
    description: "Secure API key system with permission levels. Production-grade webhook infrastructure with retry logic and delivery tracking.",
    highlights: [
      "Secure API keys",
      "Permission levels (read/write/admin)",
      "Webhook subscriptions",
      "22+ webhook events",
      "Automatic retries",
      "Delivery history",
    ],
  },
  {
    id: "email",
    icon: Mail,
    title: "Email System",
    description: "Resend integration with React Email templates. Transactional emails for auth, notifications, and marketing.",
    highlights: [
      "Email queue system",
      "React Email templates",
      "Automatic retries",
      "Email tracking",
      "Template variables",
      "Batch sending",
    ],
  },
  {
    id: "testing",
    icon: TestTube,
    title: "Complete Test Suite",
    description: "130+ tests. Vitest for unit tests, Playwright for E2E. Production-quality code guarantee.",
    highlights: [
      "130+ comprehensive tests",
      "Vitest unit tests",
      "Playwright E2E tests",
      "CI/CD pipelines",
      "Automated testing",
    ],
  },
  {
    id: "storybook",
    icon: BookOpen,
    title: "95% Storybook Coverage",
    description: "Interactive component documentation with 95% coverage. See every component variant, state, and accessibility feature.",
    highlights: [
      "95% component coverage",
      "Interactive stories",
      "Accessibility audits",
      "Code examples",
      "Design tokens",
      "Component variants",
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics Ready",
    description: "PostHog integration for user analytics, feature flags, and usage tracking. Understand your users and iterate faster.",
    highlights: [
      "Event tracking",
      "User analytics",
      "Feature flags",
      "A/B testing ready",
      "User funnels",
      "Conversion tracking",
    ],
  },
  {
    id: "security",
    icon: Shield,
    title: "Enterprise Security",
    description: "TypeScript strict mode, HTTPS, security headers, rate limiting, CSRF protection, and audit logging built-in.",
    highlights: [
      "TypeScript strict",
      "HTTPS enforced",
      "CSRF protection",
      "Rate limiting",
      "Security headers",
      "Audit logging",
    ],
  },
];

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlights: string[];
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  highlights,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="rounded-lg border border-border bg-card p-6"
    >
      {/* Icon */}
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
        <Icon className="size-6 text-primary" />
      </div>

      {/* Title */}
      <H3 className="mb-2">{title}</H3>

      {/* Description */}
      <Small className="block mb-4 text-muted-foreground">{description}</Small>

      {/* Highlights */}
      <div className="space-y-2">
        <Small className="block font-semibold text-foreground">Includes:</Small>
        <ul className="space-y-1">
          {highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-primary" />
              <Small className="text-muted-foreground">{highlight}</Small>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function FeaturesShowcase() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <H2 className="mb-4">Complete Feature Set</H2>
            <Body className="mx-auto max-w-2xl">
              Not just components. Complete SaaS boilerplate with authentication, payments,
              database, real-time, multi-tenancy, admin dashboard, API keys, webhooks, and more.
            </Body>
          </div>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                highlights={feature.highlights}
              />
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg border border-border bg-muted/50 p-8"
          >
            <div className="grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12+</div>
                <Small className="block mt-2 text-muted-foreground">Major Features</Small>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">130+</div>
                <Small className="block mt-2 text-muted-foreground">Tests</Small>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <Small className="block mt-2 text-muted-foreground">Type Safe</Small>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">400KB</div>
                <Small className="block mt-2 text-muted-foreground">Documentation</Small>
              </div>
            </div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg border border-border bg-card shadow-sm p-8"
          >
            <H3 className="mb-2">Why This Saves You 4-6 Weeks</H3>
            <Body>
              Building authentication, payments, real-time features, multi-tenancy, admin dashboard, API
              system, and webhooks from scratch typically takes 4-6 weeks of development. Fabrk includes
              all of this production-ready, tested, and documented. Focus on your unique features while we
              handle the boilerplate.
            </Body>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <Small className="block font-semibold text-foreground">Without Fabrk</Small>
                <Small className="block text-muted-foreground">
                  6-8 weeks building features + 2-4 weeks debugging = 8-12 weeks
                </Small>
              </div>
              <div>
                <Small className="block font-semibold text-foreground">With Fabrk</Small>
                <Small className="block text-muted-foreground">
                  2 weeks customization + focus on unique features = 2-4 weeks
                </Small>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
