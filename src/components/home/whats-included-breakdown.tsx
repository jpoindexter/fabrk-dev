/**
 * ✅ FABRK COMPONENT
 * What's Included Breakdown - Show every component, template, and feature
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  {
    id: "components",
    title: "87 Production-Ready Components",
    description: "Complete UI library with variants, themes, and accessibility",
    items: [
      {
        category: "Landing Page (9)",
        items: [
          "3 Hero variations (Centered, Split, Video)",
          "Features section",
          "2 Pricing layouts (Cards, Comparison)",
          "FAQ accordion",
          "Tech stack showcase",
          "Comparison table",
          "Navigation & Footer",
        ],
      },
      {
        category: "Dashboard (8)",
        items: [
          "Account settings",
          "Billing management",
          "Profile editing",
          "Usage tracker",
          "Stats cards",
          "License card",
          "Admin panel",
          "Data tables (TanStack Table)",
        ],
      },
      {
        category: "UI Primitives (25)",
        items: [
          "Button, Card, Input, Dialog",
          "Dropdown, Select, Tabs, Accordion",
          "Toast, Label, Textarea, Badge",
          "Alert, Avatar, Checkbox, Radio",
          "Switch, Slider, Progress, Separator",
          "Sheet, Skeleton, Table, Tooltip",
          "Command palette",
        ],
      },
      {
        category: "AI & Code Tools (7)",
        items: [
          "Code block (syntax highlighting)",
          "Code generator",
          "Prompt builder",
          "Markdown editor",
          "Markdown viewer",
          "Rich text editor",
          "Copy button",
        ],
      },
      {
        category: "Image Tools (6)",
        items: [
          "Image cropper",
          "Image dropzone",
          "Image uploader",
          "Lightbox",
          "Color picker",
          "Input color",
        ],
      },
      {
        category: "Auth Components (9)",
        items: [
          "Login/register forms",
          "Email verification",
          "Password reset",
          "2FA setup",
          "Profile settings",
          "Security settings",
          "Session management",
          "API keys management",
          "OAuth integration",
        ],
      },
      {
        category: "Settings (6)",
        items: [
          "Theme toggle",
          "Notifications",
          "Privacy controls",
          "Data export",
          "Danger zone",
          "Language selector",
        ],
      },
      {
        category: "Charts (3)",
        items: [
          "Area chart",
          "Bar chart",
          "Line chart",
        ],
      },
      {
        category: "Unique Tools (8)",
        items: [
          "Breadcrumbs",
          "Sidebar navigation",
          "Data table with sorting/filtering",
          "Pagination",
          "Search dialog",
          "Status indicator",
          "Empty states",
          "Loading skeletons",
        ],
      },
    ],
  },
  {
    id: "templates",
    title: "8 Copy-Paste Page Templates",
    description: "Ready-to-use full pages for common SaaS features",
    items: [
      {
        category: "Complete Templates",
        items: [
          "Team Dashboard - Multi-tenant workspace overview",
          "Analytics Dashboard - Charts, metrics, KPIs",
          "Billing Dashboard - Subscriptions, invoices, payment methods",
          "Settings Page - Profile, notifications, privacy, team",
          "User Management - Admin data table with actions",
          "Admin Panel - System health, user stats, monitoring",
          "Documentation Layout - Docs site with search",
          "Email Templates - 5+ React Email templates",
        ],
      },
    ],
  },
  {
    id: "features",
    title: "Built-In SaaS Features",
    description: "Production-ready features that typically take weeks to build",
    items: [
      {
        category: "Authentication",
        items: [
          "NextAuth v5 setup",
          "Email/password auth",
          "Google OAuth integration",
          "Magic link passwordless",
          "2FA/MFA support",
          "Session management",
          "Password reset flow",
          "Email verification",
        ],
      },
      {
        category: "Payments & Billing",
        items: [
          "Stripe integration",
          "One-time payments",
          "Recurring subscriptions",
          "Customer portal",
          "Invoice generation",
          "Webhook handling",
          "Idempotency system",
          "Payment history",
        ],
      },
      {
        category: "Database & ORM",
        items: [
          "PostgreSQL setup",
          "Prisma ORM with types",
          "13+ data models",
          "User management",
          "Organization/multi-tenancy",
          "Migrations",
          "Database seeding",
          "Type-safe queries",
        ],
      },
      {
        category: "Real-Time Features",
        items: [
          "Pusher integration",
          "Real-time notifications",
          "Activity feeds",
          "Presence tracking",
          "Channel auth",
          "Live updates",
          "User online status",
          "Notification center UI",
        ],
      },
      {
        category: "Multi-Tenancy & RBAC",
        items: [
          "Organization workspace system",
          "4 role levels (Owner, Admin, Member, Guest)",
          "Role-based permissions",
          "Member management UI",
          "Invitation system",
          "Data isolation",
          "Permission checking middleware",
          "org-scoped database queries",
        ],
      },
      {
        category: "Admin Dashboard",
        items: [
          "User management table",
          "Organization overview",
          "Revenue analytics",
          "System health monitoring",
          "User impersonation",
          "Audit logs viewer",
          "Feature flags admin",
          "System alerts",
        ],
      },
      {
        category: "API & Webhooks",
        items: [
          "Secure API key system",
          "3 permission levels (read/write/admin)",
          "22+ webhook events",
          "Webhook subscriptions UI",
          "Event delivery tracking",
          "Automatic retry logic (5x with backoff)",
          "HMAC-SHA256 signing",
          "Delivery history",
        ],
      },
      {
        category: "Email System",
        items: [
          "Resend integration",
          "React Email templates",
          "Email queue system",
          "Automatic retries",
          "Status tracking",
          "Transactional emails",
          "Welcome sequences",
          "Batch sending",
        ],
      },
      {
        category: "Developer Experience",
        items: [
          "TypeScript strict mode",
          "ESLint configuration",
          "Prettier formatting",
          "Git hooks (Husky)",
          "Environment validation",
          "Error handling patterns",
          "Logging system",
          "Development utilities",
        ],
      },
    ],
  },
  {
    id: "quality",
    title: "Quality & Documentation",
    description: "Production-grade code with comprehensive documentation",
    items: [
      {
        category: "Testing & Quality",
        items: [
          "931+ comprehensive tests",
          "64% code coverage",
          "Vitest unit tests",
          "Playwright E2E tests",
          "CI/CD workflows",
          "Pre-commit hooks",
          "Automated linting",
          "Type checking in CI",
        ],
      },
      {
        category: "Documentation",
        items: [
          "400KB documentation",
          "24 comprehensive guides",
          "Getting started tutorial",
          "Feature documentation",
          "API reference",
          "Deployment guides",
          "Troubleshooting section",
          "Code examples",
        ],
      },
      {
        category: "Storybook & Components",
        items: [
          "95% Storybook coverage",
          "87 interactive stories",
          "Component variants",
          "Accessibility audits",
          "Design tokens",
          "Live code examples",
          "Usage documentation",
          "Responsive testing",
        ],
      },
      {
        category: "Styling & Themes",
        items: [
          "Tailwind CSS v4",
          "6 color themes",
          "Dark mode ready",
          "Design tokens system",
          "CSS variables",
          "Responsive design",
          "Accessibility (WCAG 2.1 AA)",
          "Print-friendly styles",
        ],
      },
    ],
  },
];

interface CategoryItemProps {
  category: {
    id: string;
    title: string;
    description: string;
    items: Array<{
      category: string;
      items: string[];
    }>;
  };
}

function CategoryItem({ category }: CategoryItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="rounded-lg border border-border bg-card"
    >
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left hover:bg-muted/50"
      >
        <div>
          <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
        </div>
        <ChevronDown
          className={`size-5 flex-shrink-0 text-muted-foreground transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="border-t border-border px-6 py-4"
        >
          <div className="space-y-6">
            {category.items.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-foreground">{section.category}</h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export function WhatsIncludedBreakdown() {
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
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Everything You Get
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              87 components, 8 templates, 12+ features, 931+ tests, 400KB docs. Click to expand each category.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {CATEGORIES.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-lg border border-primary/20 bg-primary/5 p-8"
          >
            <h3 className="text-xl font-semibold text-foreground">What This Means</h3>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              <div>
                <p className="font-semibold text-primary">3-4 Weeks Saved</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Building auth, payments, and features from scratch
                </p>
              </div>
              <div>
                <p className="font-semibold text-primary">$10,000+ Value</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  3-4 weeks × $50-75/hr developer salary
                </p>
              </div>
              <div>
                <p className="font-semibold text-primary">Production Quality</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  931+ tests, 64% coverage, TypeScript strict mode
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
