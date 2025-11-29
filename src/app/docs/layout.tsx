"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { DemoNav } from "@/components/demo/demo-nav";
import { Footer } from "@/components/landing/footer";
import { TerminalBackground } from "@/components/landing/terminal-background";
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
  Cookie,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    title: "[0x00] START_HERE",
    items: [
      { title: "GETTING_STARTED", href: "/docs/getting-started", icon: BookOpen },
      { title: "ARCHITECTURE", href: "/docs/architecture", icon: Blocks },
      { title: "QUICK_START", href: "/docs/tutorials/quick-start", icon: Rocket },
    ],
  },
  {
    title: "[0x10] FOUNDATION",
    items: [
      { title: "ENV_VARIABLES", href: "/docs/deployment/environment", icon: Settings },
      { title: "DATABASE_SETUP", href: "/docs/deployment/database", icon: Database },
      { title: "DATABASE_PRISMA", href: "/docs/features/database", icon: Database },
      { title: "THEMING", href: "/docs/extras/theming", icon: Palette },
    ],
  },
  {
    title: "[0x20] AUTHENTICATION",
    items: [
      { title: "AUTH_OVERVIEW", href: "/docs/tutorials/authentication", icon: Lock },
      { title: "GOOGLE_OAUTH", href: "/docs/features/google-oauth", icon: Key },
      { title: "MAGIC_LINKS", href: "/docs/features/magic-links", icon: Zap },
      { title: "MULTI_FACTOR_AUTH", href: "/docs/features/mfa", icon: ShieldCheck },
    ],
  },
  {
    title: "[0x30] PAYMENTS",
    items: [
      { title: "STRIPE_SETUP", href: "/docs/features/payments", icon: CreditCard },
      { title: "FREE_TRIALS", href: "/docs/features/trial", icon: Clock },
      { title: "SUBSCRIPTION_GUIDE", href: "/docs/tutorials/stripe-payments", icon: CreditCard },
    ],
  },
  {
    title: "[0x40] EMAILS",
    items: [
      { title: "RESEND_SETUP", href: "/docs/features/emails", icon: Mail },
      { title: "EMAIL_TEMPLATES", href: "/docs/tutorials/email-templates", icon: Mail },
      { title: "NOTIFICATIONS", href: "/docs/features/notifications", icon: Bell },
    ],
  },
  {
    title: "[0x50] CORE_BLOCKS",
    items: [
      { title: "API_ROUTES", href: "/docs/tutorials/api-routes", icon: FileCode },
      { title: "PROTECTED_PAGES", href: "/docs/tutorials/protected-pages", icon: Shield },
      { title: "CLOUD_STORAGE", href: "/docs/features/cloud-storage", icon: Cloud },
      { title: "FILE_UPLOADS", href: "/docs/tutorials/file-uploads", icon: Upload },
      { title: "WEBHOOKS_SETUP", href: "/docs/tutorials/webhooks", icon: Webhook },
    ],
  },
  {
    title: "[0x60] COMPONENTS",
    items: [
      { title: "UI_LIBRARY_100+", href: "/docs/components/overview", icon: Blocks },
      { title: "NAVIGATION_HEADER", href: "/docs/components/navigation", icon: Layout },
      { title: "HERO_SECTIONS", href: "/docs/components/hero", icon: Blocks },
      { title: "FEATURES_SECTIONS", href: "/docs/components/features", icon: Blocks },
      { title: "PRICING_TABLES", href: "/docs/components/pricing", icon: CreditCard },
      { title: "TESTIMONIALS", href: "/docs/components/testimonials", icon: MessageSquare },
      { title: "FAQ", href: "/docs/components/faq", icon: MessageSquare },
      { title: "FOOTER", href: "/docs/components/footer", icon: Layout },
      { title: "BUTTONS", href: "/docs/components/buttons", icon: MousePointer },
      { title: "FORMS_INPUTS", href: "/docs/components/forms", icon: FormInput },
      { title: "DATA_DISPLAY", href: "/docs/components/data-display", icon: Table },
      { title: "CHARTS_ANALYTICS", href: "/docs/components/charts", icon: LineChart },
      { title: "MODALS_DIALOGS", href: "/docs/components/modals", icon: MessageSquare },
      { title: "UPLOAD_COMPONENTS", href: "/docs/components/uploads", icon: Image },
    ],
  },
  {
    title: "[0x70] ADVANCED",
    items: [
      { title: "ORGANIZATIONS_TEAMS", href: "/docs/features/organizations", icon: Users },
      { title: "REALTIME_PUSHER", href: "/docs/features/realtime", icon: Bell },
      { title: "BACKGROUND_JOBS", href: "/docs/features/background-jobs", icon: Clock },
      { title: "ANALYTICS", href: "/docs/features/analytics", icon: BarChart3 },
      { title: "SEO_METADATA", href: "/docs/features/seo", icon: Globe },
      { title: "API_KEYS", href: "/docs/features/api-keys", icon: Key },
      { title: "FEATURE_FLAGS", href: "/docs/features/feature-flags", icon: Flag },
      { title: "WEBHOOKS_OUTGOING", href: "/docs/features/webhooks", icon: Webhook },
    ],
  },
  {
    title: "[0x80] SECURITY",
    items: [
      { title: "COOKIE_CONSENT", href: "/docs/features/cookie-consent", icon: Cookie },
      { title: "RATE_LIMITING", href: "/docs/security/rate-limiting", icon: AlertTriangle },
      { title: "CSRF_PROTECTION", href: "/docs/security/csrf", icon: Shield },
      { title: "SECURITY_HEADERS", href: "/docs/security/headers", icon: ShieldCheck },
      { title: "SCHEMA_VALIDATION", href: "/docs/security/validation", icon: ScrollText },
      { title: "BOT_PROTECTION", href: "/docs/security/bot-protection", icon: Bot },
      { title: "AUDIT_LOGGING", href: "/docs/security/audit-logging", icon: ScrollText },
    ],
  },
  {
    title: "[0x90] DEPLOYMENT",
    items: [
      { title: "DEPLOY_VERCEL", href: "/docs/deployment/vercel", icon: Cloud },
      { title: "TESTING_GUIDE", href: "/docs/extras/testing", icon: TestTube },
    ],
  },
  {
    title: "[0xA0] LAUNCH",
    items: [
      { title: "LAUNCH_CHECKLIST", href: "/docs/launch/checklist", icon: Rocket },
    ],
  },
  {
    title: "[0xB0] RESOURCES",
    items: [
      { title: "GITHUB_REPO", href: "https://github.com/jpoindexter/fabrk-boilerplate", icon: ExternalLink, external: true },
      { title: "SUPPORT", href: "/contact", icon: Mail },
    ],
  },
];

// Helper to find which section contains the current path
function findActiveSectionIndex(pathname: string): number {
  return navigation.findIndex((section) =>
    section.items.some((item) => pathname === item.href)
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeSectionIndex = findActiveSectionIndex(pathname);

  // Initialize expanded sections - only the active section is expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (activeSectionIndex >= 0) {
      initial.add(activeSectionIndex);
    }
    return initial;
  });

  // Update expanded sections when pathname changes
  useEffect(() => {
    const newActiveIndex = findActiveSectionIndex(pathname);
    if (newActiveIndex >= 0 && !expandedSections.has(newActiveIndex)) {
      setExpandedSections((prev) => new Set([...prev, newActiveIndex]));
    }
  }, [pathname]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  // Table of Contents - extract headings from the page
  const [tocHeadings, setTocHeadings] = useState<Array<{ id: string; text: string }>>([]);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      if (mainRef.current) {
        const headings = mainRef.current.querySelectorAll("h2");
        const items = Array.from(headings).map((heading) => {
          // Create ID from heading text if not present
          const text = heading.textContent || "";
          const id = heading.id || text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          if (!heading.id) {
            heading.id = id;
          }
          return { id, text };
        });
        setTocHeadings(items);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background font-mono flex flex-col relative">
      <TerminalBackground />
      <DemoNav backButtonText="HOME" backButtonHref="/" suffix="DOCS" />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-border md:block overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary/50">
          <nav className="space-y-1 p-4">
            {navigation.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(sectionIndex);
              const hasActiveItem = section.items.some((item) => pathname === item.href);

              return (
                <div key={section.title}>
                  {/* Collapsible Section Header */}
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className={cn(
                      "flex w-full items-center gap-2 px-2 py-1.5 text-xs font-semibold transition-colors",
                      hasActiveItem
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                    {section.title}
                  </button>

                  {/* Collapsible Items */}
                  {isExpanded && (
                    <div className="ml-3 border-l border-border pl-2 space-y-0.5">
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
                              className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              <Icon className="h-3 w-3" />
                              {item.title}
                              <ExternalLink className="ml-auto h-2.5 w-2.5" />
                            </a>
                          );
                        }

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 px-2 py-1 text-xs transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            {item.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main ref={mainRef} className="flex-1 px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {children}
          </div>
        </main>

        {/* Table of Contents (Right Sidebar) */}
        <aside
          className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-l border-border xl:block overflow-y-auto bg-card"
          aria-label="Table of contents"
        >
          <div className="p-4">
            <div className="mb-4 font-mono text-xs text-muted-foreground">[ON_THIS_PAGE]:</div>
            {tocHeadings.length > 0 ? (
              <nav>
                <ul className="space-y-2 font-mono text-xs">
                  {tocHeadings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="flex items-start gap-1 text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-1 transition-colors"
                      >
                        <span className="shrink-0">&gt;</span>
                        <span className="break-words">{heading.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : (
              <p className="font-mono text-xs text-muted-foreground/50 px-2">No sections found</p>
            )}
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}
