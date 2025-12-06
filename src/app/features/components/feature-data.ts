/**
 * ✅ FABRK COMPONENT
 * Feature Data - All feature categories and stats
 * Production-ready ✓
 */

import {
  Lock,
  CreditCard,
  Database,
  Zap,
  Users,
  Settings,
  Code,
  Mail,
  Layers,
  Palette,
  FileCode,
  TestTube,
  BookOpen,
  Globe,
} from "lucide-react";

// Core feature categories with detailed information
export const FEATURE_CATEGORIES = [
  {
    id: "authentication",
    icon: Lock,
    title: "Authentication & Security",
    tagline: "Enterprise-grade auth out of the box",
    description:
      "Complete authentication system with NextAuth v5. Email/password, OAuth providers, magic links, 2FA, session management, and password reset - all production-ready.",
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
    description:
      "Full Stripe integration for one-time payments and subscriptions. Customer portal, invoicing, webhook handling, and idempotency built-in.",
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
    description:
      "PostgreSQL with Prisma ORM. 13+ pre-built models for users, organizations, payments, webhooks, and more. Type-safe queries with full migration support.",
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
    description:
      "Complete organization/workspace system with role-based access control. Owner, Admin, Member, Guest roles with granular permissions and data isolation.",
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
    description:
      "Pusher integration for real-time notifications, activity feeds, and presence tracking. WebSocket connections managed automatically.",
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
    description:
      "Secure API key system with permission levels. Production-grade webhooks with 22+ event types, HMAC signing, automatic retries, and delivery tracking.",
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
    description:
      "Full admin interface with user management, analytics, system health, and debugging tools. User impersonation, audit logs, and feature flags included.",
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
    description:
      "Resend integration with React Email templates. Email queue with automatic retries, status tracking, and batch sending for marketing.",
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
export const COMPONENT_STATS = [
  {
    icon: Layers,
    label: "UI Components",
    value: "100+",
    description: "Production-ready components",
  },
  { icon: Palette, label: "Color Themes", value: "20", description: "DaisyUI themes included" },
  { icon: FileCode, label: "Page Templates", value: "8", description: "Copy-paste ready pages" },
  { icon: TestTube, label: "Tests", value: "130+", description: "Vitest & Playwright" },
  { icon: BookOpen, label: "Documentation", value: "400KB", description: "Comprehensive guides" },
  { icon: Globe, label: "Languages", value: "6", description: "i18n ready" },
];

// Tech stack
export const TECH_STACK = [
  { name: "Next.js 15", description: "App Router, React 19", icon: Globe },
  { name: "TypeScript", description: "Strict mode, 100% typed", icon: Code },
  { name: "Tailwind CSS 4", description: "Latest with OKLCH", icon: Palette },
  { name: "Prisma", description: "Type-safe ORM", icon: Database },
  { name: "NextAuth v5", description: "Modern auth", icon: Lock },
  { name: "Stripe", description: "Payments & billing", icon: CreditCard },
  { name: "Resend", description: "Email delivery", icon: Mail },
  { name: "Pusher", description: "Real-time WebSockets", icon: Zap },
];
