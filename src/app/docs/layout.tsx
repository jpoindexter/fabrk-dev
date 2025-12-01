"use client";

import { DocsLayout } from "@/components/docs/docs-layout";
import { NavSection } from "@/components/docs/docs-sidebar";
import {
  BookOpen,
  Rocket,
  Shield,
  CreditCard,
  Database,
  Mail,
  Users,
  Blocks,
  Cloud,
  Settings,
  Lock,
  Key,
  Bell,
  Webhook,
  BarChart3,
  Globe,
  Palette,
  TestTube,
  FileCode,
  Layout,
  MousePointer,
  FormInput,
  Table,
  LineChart,
  MessageSquare,
  Image,
  Upload,
  Zap,
  Flag,
  Clock,
  Bot,
  ScrollText,
  ShieldCheck,
  AlertTriangle,
  Cookie,
} from "lucide-react";

const navigation: NavSection[] = [
  {
    title: "[01] START",
    items: [
      { title: "QUICK_START", href: "/docs/tutorials/quick-start", icon: Rocket },
      { title: "GETTING_STARTED", href: "/docs/getting-started", icon: BookOpen },
      { title: "ARCHITECTURE", href: "/docs/architecture", icon: Blocks },
    ],
  },
  {
    title: "[02] SETUP",
    items: [
      { title: "ENV_VARIABLES", href: "/docs/deployment/environment", icon: Settings },
      { title: "DATABASE_SETUP", href: "/docs/deployment/database", icon: Database },
      { title: "DATABASE_PRISMA", href: "/docs/features/database", icon: Database },
    ],
  },
  {
    title: "[03] AUTHENTICATION",
    items: [
      { title: "AUTH_OVERVIEW", href: "/docs/tutorials/authentication", icon: Lock },
      { title: "GOOGLE_OAUTH", href: "/docs/features/google-oauth", icon: Key },
      { title: "MAGIC_LINKS", href: "/docs/features/magic-links", icon: Zap },
      { title: "MULTI_FACTOR_AUTH", href: "/docs/features/mfa", icon: ShieldCheck },
    ],
  },
  {
    title: "[04] PAYMENTS",
    items: [
      { title: "STRIPE_SETUP", href: "/docs/features/payments", icon: CreditCard },
      { title: "FREE_TRIALS", href: "/docs/features/trial", icon: Clock },
      { title: "SUBSCRIPTION_GUIDE", href: "/docs/tutorials/stripe-payments", icon: CreditCard },
    ],
  },
  {
    title: "[05] EMAILS",
    items: [
      { title: "RESEND_SETUP", href: "/docs/features/emails", icon: Mail },
      { title: "EMAIL_TEMPLATES", href: "/docs/tutorials/email-templates", icon: Mail },
      { title: "NOTIFICATIONS", href: "/docs/features/notifications", icon: Bell },
    ],
  },
  {
    title: "[06] CORE_FEATURES",
    items: [
      { title: "API_ROUTES", href: "/docs/tutorials/api-routes", icon: FileCode },
      { title: "PROTECTED_PAGES", href: "/docs/tutorials/protected-pages", icon: Shield },
      { title: "CLOUD_STORAGE", href: "/docs/features/cloud-storage", icon: Cloud },
      { title: "FILE_UPLOADS", href: "/docs/tutorials/file-uploads", icon: Upload },
      { title: "WEBHOOKS_SETUP", href: "/docs/tutorials/webhooks", icon: Webhook },
    ],
  },
  {
    title: "[07] COMPONENTS",
    items: [
      { title: "UI_LIBRARY_100+", href: "/docs/components/overview", icon: Blocks },
      { title: "NAVIGATION", href: "/docs/components/navigation", icon: Layout },
      { title: "HERO_SECTIONS", href: "/docs/components/hero", icon: Blocks },
      { title: "FEATURES", href: "/docs/components/features", icon: Blocks },
      { title: "PRICING", href: "/docs/components/pricing", icon: CreditCard },
      { title: "TESTIMONIALS", href: "/docs/components/testimonials", icon: MessageSquare },
      { title: "FAQ", href: "/docs/components/faq", icon: MessageSquare },
      { title: "FOOTER", href: "/docs/components/footer", icon: Layout },
      { title: "BUTTON", href: "/docs/components/button", icon: MousePointer },
      { title: "INPUT", href: "/docs/components/input", icon: FormInput },
      { title: "TABLE", href: "/docs/components/table", icon: Table },
      { title: "DONUT_CHART", href: "/docs/components/donut-chart", icon: LineChart },
      { title: "DIALOG", href: "/docs/components/dialog", icon: MessageSquare },
      { title: "FILE_UPLOAD", href: "/docs/components/file-upload", icon: Image },
    ],
  },
  {
    title: "[08] SECURITY",
    items: [
      { title: "COOKIE_CONSENT", href: "/docs/features/cookie-consent", icon: Cookie },
      { title: "RATE_LIMITING", href: "/docs/security/rate-limiting", icon: AlertTriangle },
      { title: "CSRF_PROTECTION", href: "/docs/security/csrf", icon: Shield },
      { title: "SECURITY_HEADERS", href: "/docs/security/headers", icon: ShieldCheck },
      { title: "VALIDATION", href: "/docs/security/validation", icon: ScrollText },
      { title: "BOT_PROTECTION", href: "/docs/security/bot-protection", icon: Bot },
      { title: "AUDIT_LOGGING", href: "/docs/security/audit-logging", icon: ScrollText },
    ],
  },
  {
    title: "[09] ADVANCED",
    items: [
      { title: "ORGANIZATIONS", href: "/docs/features/organizations", icon: Users },
      { title: "REALTIME", href: "/docs/features/realtime", icon: Bell },
      { title: "BACKGROUND_JOBS", href: "/docs/features/background-jobs", icon: Clock },
      { title: "ANALYTICS", href: "/docs/features/analytics", icon: BarChart3 },
      { title: "SEO", href: "/docs/features/seo", icon: Globe },
      { title: "API_KEYS", href: "/docs/features/api-keys", icon: Key },
      { title: "FEATURE_FLAGS", href: "/docs/features/feature-flags", icon: Flag },
      { title: "WEBHOOKS", href: "/docs/features/webhooks", icon: Webhook },
      { title: "THEMING", href: "/docs/extras/theming", icon: Palette },
    ],
  },
  {
    title: "[10] DEPLOY",
    items: [
      { title: "TESTING", href: "/docs/extras/testing", icon: TestTube },
      { title: "VERCEL", href: "/docs/deployment/vercel", icon: Cloud },
      { title: "LAUNCH_CHECKLIST", href: "/docs/launch/checklist", icon: Rocket },
    ],
  },
];

export default function DocsLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout navigation={navigation} showToc={true}>
      {children}
    </DocsLayout>
  );
}
