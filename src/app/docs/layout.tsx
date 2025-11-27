"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
  ExternalLink,
  Bot,
  ScrollText,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const navigation = [
  {
    title: "Start Here",
    items: [
      { title: "Getting Started", href: "/docs/getting-started", icon: BookOpen },
      { title: "Architecture", href: "/docs/architecture", icon: Blocks },
      { title: "Quick Start", href: "/docs/tutorials/quick-start", icon: Rocket },
    ],
  },
  {
    title: "Foundation Setup",
    items: [
      { title: "Environment Variables", href: "/docs/deployment/environment", icon: Settings },
      { title: "Database Setup", href: "/docs/deployment/database", icon: Database },
      { title: "Database (Prisma)", href: "/docs/features/database", icon: Database },
      { title: "Theming", href: "/docs/extras/theming", icon: Palette },
    ],
  },
  {
    title: "Authentication",
    items: [
      { title: "Auth Overview", href: "/docs/tutorials/authentication", icon: Lock },
      { title: "Google OAuth", href: "/docs/features/google-oauth", icon: Key },
      { title: "Magic Links", href: "/docs/features/magic-links", icon: Zap },
      { title: "Multi-Factor Auth", href: "/docs/features/mfa", icon: ShieldCheck },
    ],
  },
  {
    title: "Payments",
    items: [
      { title: "Stripe Setup", href: "/docs/features/payments", icon: CreditCard },
      { title: "Free Trials", href: "/docs/features/trial", icon: Clock },
      { title: "Subscription Guide", href: "/docs/tutorials/stripe-payments", icon: CreditCard },
    ],
  },
  {
    title: "Emails & Notifications",
    items: [
      { title: "Resend Setup", href: "/docs/features/emails", icon: Mail },
      { title: "Email Templates", href: "/docs/tutorials/email-templates", icon: Mail },
      { title: "Notifications", href: "/docs/features/notifications", icon: Bell },
    ],
  },
  {
    title: "Core Building Blocks",
    items: [
      { title: "API Routes", href: "/docs/tutorials/api-routes", icon: FileCode },
      { title: "Protected Pages", href: "/docs/tutorials/protected-pages", icon: Shield },
      { title: "Cloud Storage", href: "/docs/features/cloud-storage", icon: Cloud },
      { title: "File Uploads", href: "/docs/tutorials/file-uploads", icon: Upload },
      { title: "Webhooks Setup", href: "/docs/tutorials/webhooks", icon: Webhook },
    ],
  },
  {
    title: "Components Library",
    items: [
      { title: "Navigation & Header", href: "/docs/components/navigation", icon: Layout },
      { title: "Hero Sections", href: "/docs/components/hero", icon: Blocks },
      { title: "Features Sections", href: "/docs/components/features", icon: Blocks },
      { title: "Pricing Tables", href: "/docs/components/pricing", icon: CreditCard },
      { title: "Testimonials", href: "/docs/components/testimonials", icon: MessageSquare },
      { title: "FAQ", href: "/docs/components/faq", icon: MessageSquare },
      { title: "Footer", href: "/docs/components/footer", icon: Layout },
      { title: "Buttons", href: "/docs/components/buttons", icon: MousePointer },
      { title: "Forms & Inputs", href: "/docs/components/forms", icon: FormInput },
      { title: "Data Display", href: "/docs/components/data-display", icon: Table },
      { title: "Charts & Analytics", href: "/docs/components/charts", icon: LineChart },
      { title: "Modals & Dialogs", href: "/docs/components/modals", icon: MessageSquare },
      { title: "Upload Components", href: "/docs/components/uploads", icon: Image },
    ],
  },
  {
    title: "Advanced Features",
    items: [
      { title: "Organizations & Teams", href: "/docs/features/organizations", icon: Users },
      { title: "Real-Time (Pusher)", href: "/docs/features/realtime", icon: Bell },
      { title: "Background Jobs", href: "/docs/features/background-jobs", icon: Clock },
      { title: "Analytics", href: "/docs/features/analytics", icon: BarChart3 },
      { title: "SEO & Metadata", href: "/docs/features/seo", icon: Globe },
      { title: "API Keys", href: "/docs/features/api-keys", icon: Key },
      { title: "Feature Flags", href: "/docs/features/feature-flags", icon: Flag },
      { title: "Webhooks (Outgoing)", href: "/docs/features/webhooks", icon: Webhook },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Rate Limiting", href: "/docs/security/rate-limiting", icon: AlertTriangle },
      { title: "CSRF Protection", href: "/docs/security/csrf", icon: Shield },
      { title: "Security Headers", href: "/docs/security/headers", icon: ShieldCheck },
      { title: "Schema Validation", href: "/docs/security/validation", icon: ScrollText },
      { title: "Bot Protection", href: "/docs/security/bot-protection", icon: Bot },
      { title: "Audit Logging", href: "/docs/security/audit-logging", icon: ScrollText },
    ],
  },
  {
    title: "Deployment",
    items: [
      { title: "Deploy to Vercel", href: "/docs/deployment/vercel", icon: Cloud },
      { title: "Testing Guide", href: "/docs/extras/testing", icon: TestTube },
    ],
  },
  {
    title: "Launch",
    items: [
      { title: "Launch Checklist", href: "/docs/launch/checklist", icon: Rocket },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "GitHub Repository", href: "https://github.com/jpoindexter/fabrk-boilerplate", icon: ExternalLink, external: true },
      { title: "Support", href: "mailto:support@fabrk.dev", icon: Mail, external: true },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="text-xl">Fabrk</span>
          </Link>
          <nav className="ml-6 flex items-center gap-4 text-sm">
            <Link
              href="/docs/getting-started"
              className="text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border md:block overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary/50">
          <nav className="space-y-6 p-4">
            {navigation.map((section) => (
              <div key={section.title}>
                <h4 className="mb-2 px-2 text-sm font-semibold text-foreground">
                  {section.title}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const isExternal = 'external' in item && item.external;

                    if (isExternal) {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Icon className="h-4 w-4" />
                          {item.title}
                          <ExternalLink className="ml-auto h-3 w-3" />
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 rounded-md px-2 py-1.5 text-base transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
