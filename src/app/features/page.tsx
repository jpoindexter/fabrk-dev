/**
 * ✅ FABRK COMPONENT
 * Features Page - Dedicated feature deep-dive
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
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
  Palette,
  Globe,
  FileCode,
  Layers,
  Terminal,
  Webhook,
  Key,
  Bell,
  Clock,
  Server,
} from "lucide-react";

// Core feature categories with detailed information
const FEATURE_CATEGORIES = [
  {
    id: "authentication",
    icon: Lock,
    title: "Authentication & Security",
    tagline: "Enterprise-grade auth out of the box",
    description: "Complete authentication system with NextAuth v5. Email/password, OAuth providers, magic links, 2FA, session management, and password reset - all production-ready.",
    features: [
      "Email/password with bcrypt hashing",
      "Google OAuth integration",
      "Magic link passwordless auth",
      "Two-factor authentication (TOTP)",
      "Session management & versioning",
      "Password reset with email",
      "Email verification flow",
      "Remember me functionality",
    ],
    stats: { label: "Auth flows", value: "8+" },
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "Stripe Payments",
    tagline: "Monetize from day one",
    description: "Full Stripe integration for one-time payments and subscriptions. Customer portal, invoicing, webhook handling, and idempotency built-in.",
    features: [
      "One-time purchases",
      "Recurring subscriptions",
      "Customer billing portal",
      "Invoice generation",
      "Webhook event handling",
      "Idempotent checkout sessions",
      "Payment history tracking",
      "Refund management",
    ],
    stats: { label: "Payment types", value: "2" },
  },
  {
    id: "database",
    icon: Database,
    title: "Database & ORM",
    tagline: "Type-safe data layer",
    description: "PostgreSQL with Prisma ORM. 13+ pre-built models for users, organizations, payments, webhooks, and more. Type-safe queries with full migration support.",
    features: [
      "PostgreSQL database",
      "Prisma ORM with migrations",
      "13+ data models included",
      "Type-safe queries",
      "Relationship management",
      "Database seeding scripts",
      "Prisma Studio GUI",
      "Connection pooling ready",
    ],
    stats: { label: "Data models", value: "13+" },
  },
  {
    id: "multitenancy",
    icon: Users,
    title: "Multi-Tenancy & RBAC",
    tagline: "Built for teams",
    description: "Complete organization/workspace system with role-based access control. Owner, Admin, Member, Guest roles with granular permissions and data isolation.",
    features: [
      "Organization workspaces",
      "4 role levels (Owner/Admin/Member/Guest)",
      "Role-based permissions",
      "Member invitation system",
      "Per-organization data isolation",
      "Permission checking middleware",
      "Team member management UI",
      "Organization settings",
    ],
    stats: { label: "Role levels", value: "4" },
  },
  {
    id: "realtime",
    icon: Zap,
    title: "Real-Time Features",
    tagline: "Live updates everywhere",
    description: "Pusher integration for real-time notifications, activity feeds, and presence tracking. WebSocket connections managed automatically.",
    features: [
      "Real-time notifications",
      "Live activity feeds",
      "User presence tracking",
      "Channel authorization",
      "Online status indicators",
      "Notification center UI",
      "Event broadcasting",
      "Private channels",
    ],
    stats: { label: "Real-time events", value: "10+" },
  },
  {
    id: "api",
    icon: Code,
    title: "API Keys & Webhooks",
    tagline: "Developer-friendly integrations",
    description: "Secure API key system with permission levels. Production-grade webhooks with 22+ event types, HMAC signing, automatic retries, and delivery tracking.",
    features: [
      "Cryptographic API keys",
      "3 permission levels (read/write/admin)",
      "22+ webhook event types",
      "HMAC-SHA256 signatures",
      "Automatic retry with backoff",
      "Delivery history tracking",
      "Webhook subscription UI",
      "Event filtering",
    ],
    stats: { label: "Webhook events", value: "22+" },
  },
  {
    id: "admin",
    icon: Settings,
    title: "Admin Dashboard",
    tagline: "Complete back-office",
    description: "Full admin interface with user management, analytics, system health, and debugging tools. User impersonation, audit logs, and feature flags included.",
    features: [
      "User management table",
      "Organization overview",
      "Revenue analytics charts",
      "System health monitoring",
      "User impersonation",
      "Audit log viewer",
      "Feature flag management",
      "Activity dashboard",
    ],
    stats: { label: "Admin tools", value: "8+" },
  },
  {
    id: "email",
    icon: Mail,
    title: "Email System",
    tagline: "Transactional emails that work",
    description: "Resend integration with React Email templates. Email queue with automatic retries, status tracking, and batch sending for marketing.",
    features: [
      "Resend API integration",
      "React Email templates",
      "Email queue system",
      "Automatic retry logic",
      "Delivery status tracking",
      "Welcome email sequences",
      "Template variables",
      "Batch sending support",
    ],
    stats: { label: "Email templates", value: "5+" },
  },
];

// Component library stats
const COMPONENT_STATS = [
  { icon: Layers, label: "UI Components", value: "100+", description: "Production-ready components" },
  { icon: Palette, label: "Color Themes", value: "20", description: "DaisyUI themes included" },
  { icon: FileCode, label: "Page Templates", value: "8", description: "Copy-paste ready pages" },
  { icon: TestTube, label: "Tests", value: "130+", description: "Vitest & Playwright" },
  { icon: BookOpen, label: "Documentation", value: "400KB", description: "Comprehensive guides" },
  { icon: Globe, label: "Languages", value: "6", description: "i18n ready" },
];

// Tech stack
const TECH_STACK = [
  { name: "Next.js 15", description: "App Router, React 19" },
  { name: "TypeScript", description: "Strict mode, 100% typed" },
  { name: "Tailwind CSS 4", description: "Latest with OKLCH" },
  { name: "Prisma", description: "Type-safe ORM" },
  { name: "NextAuth v5", description: "Modern auth" },
  { name: "Stripe", description: "Payments & billing" },
  { name: "Resend", description: "Email delivery" },
  { name: "Pusher", description: "Real-time WebSockets" },
];

function FeatureCategoryCard({ category, index }: { category: typeof FEATURE_CATEGORIES[0]; index: number }) {
  const Icon = category.icon;
  const isEven = index % 2 === 0;
  const hexIndex = (index + 1).toString(16).toUpperCase().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      id={category.id}
      className="scroll-mt-24"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
        {/* Content Side */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="bg-primary/10 p-3">
              <Icon className="size-6 text-primary" />
            </div>
            <span className="border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              [{category.stats.value}] {category.stats.label.toUpperCase().replace(/ /g, '_')}
            </span>
          </div>

          <div>
            <span className="text-xs text-muted-foreground">[0x{hexIndex}]</span>
            <h2 className="text-2xl font-bold tracking-tight">{category.title.toUpperCase().replace(/ /g, '_').replace(/&/g, 'AND')}</h2>
            <span className="text-sm text-primary font-medium">&gt; {category.tagline}</span>
          </div>

          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>

        {/* Features List Side */}
        <div className="flex-1 w-full">
          <div className="border border-border bg-card p-6 lg:p-8">
            <div className="mb-4 text-xs text-muted-foreground">
              [ INCLUDED ]────────────────────────
            </div>
            <ul className="space-y-2">
              {category.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground">
                  <span className="text-primary flex-shrink-0">{i === category.features.length - 1 ? '└─' : '├─'}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesPage() {
  return (
 <div className=" font-mono ">
      <SiteNavigation />

      {/* Hero Section */}
      <section className="border-b border-border bg-background py-20 lg:py-28">
        <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                [ [0x00] FEATURES ] COMPLETE_SAAS_TOOLKIT
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="mb-2 text-sm text-muted-foreground">
                FABRK_FEATURES:
              </h1>
              <h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
                EVERY_FEATURE_YOU_NEED<br className="hidden sm:block" /> <span className="text-primary">ALREADY_BUILT</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-border bg-card p-4 mx-auto max-w-2xl"
            >
              <div className="mb-2 text-xs text-muted-foreground">
                [ [0x01] STATUS ]────────────────────────
              </div>
              <p className="text-sm text-muted-foreground">
                Stop rebuilding the same features for every project. Fabrk includes authentication,
                payments, database, real-time, multi-tenancy, admin dashboard, and more - all
                production-tested and ready to deploy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild size="lg" className="rounded-none text-xs">
                <Link href="/#pricing">
                  &gt; EXECUTE: GET_FABRK
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none text-xs">
                <Link href="/docs">
                  &gt; VIEW: DOCUMENTATION
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-6 text-xs text-muted-foreground">
            [ [0x02] STATS ]────────────────────────
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {COMPONENT_STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="text-center border border-border bg-card p-4"
                >
                  <div className="inline-flex items-center justify-center bg-primary/10 p-2 mb-3">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <span className="text-xs text-muted-foreground">{stat.label.toUpperCase().replace(/ /g, '_')}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Categories Navigation */}
      <section className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 py-4">
        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FEATURE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`#${category.id}`}
                  className="flex items-center gap-2 whitespace-nowrap border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {category.title.split(' ')[0]}
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      {/* Feature Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="space-y-24 lg:space-y-32">
            {FEATURE_CATEGORIES.map((category, index) => (
              <FeatureCategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-t border-border bg-muted/30 py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs text-muted-foreground">[0x10]</span>
            <h2 className="text-2xl font-bold tracking-tight mb-4">TECH_STACK</h2>
            <p className="text-sm text-muted-foreground">
              Built with the latest technologies. No legacy code, no outdated dependencies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {TECH_STACK.map((tech, index) => (
              <div
                key={tech.name}
                className="border border-border bg-card p-4 text-center"
              >
                <span className="block text-sm font-bold">{tech.name}</span>
                <span className="text-xs text-muted-foreground">{tech.description}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="border-t border-border bg-background py-16 lg:py-20">
        <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-xs text-muted-foreground">[0x20]</span>
            <h2 className="text-2xl font-bold tracking-tight mb-4">PRODUCTION_QUALITY</h2>
            <p className="text-sm text-muted-foreground">
              Not just boilerplate. Enterprise-grade code with comprehensive testing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-border bg-card p-6"
            >
              <TestTube className="size-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">130+_TESTS</h3>
              <span className="block text-xs text-muted-foreground">
                Vitest unit tests and Playwright E2E tests. Every critical flow tested.
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-border bg-card p-6"
            >
              <Terminal className="size-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">TYPESCRIPT_STRICT</h3>
              <span className="block text-xs text-muted-foreground">
                100% TypeScript with strict mode. No any types. Full type safety.
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border border-border bg-card p-6"
            >
              <BookOpen className="size-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">400KB_DOCS</h3>
              <span className="block text-xs text-muted-foreground">
                24 comprehensive guides covering every feature. No guesswork.
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-primary/5 py-20 lg:py-24">
        <div className="container mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-xs text-muted-foreground">[0x30]</span>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              READY_TO_SHIP?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-sm text-muted-foreground">
              Get Fabrk and launch your SaaS in days, not months. All features included,
              fully tested, and production-ready.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-none text-xs">
                <Link href="/#pricing">
                  &gt; EXECUTE: GET_STARTED
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none text-xs">
                <Link href="/templates">
                  &gt; VIEW: TEMPLATES
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
