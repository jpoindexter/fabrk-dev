/**
 * ✅ FABRK COMPONENT
 * Template Gallery Hub - Terminal console style
 * Production-ready ✓
 */

import Link from "next/link";
import { LayoutDashboard, Settings, Users, FileText, Palette, Lock } from "lucide-react";

const categories = [
  {
    id: "dashboard",
    module: "DASHBOARDS",
    name: "Dashboards",
    description: "Analytics, metrics, and data visualization templates",
    icon: LayoutDashboard,
    href: "/templates/dashboards",
    count: 3,
    status: "READY",
  },
  {
    id: "auth",
    module: "AUTHENTICATION",
    name: "Authentication",
    description: "Sign in, sign up, and password recovery flows",
    icon: Lock,
    href: "/templates/authentication",
    count: 4,
    status: "READY",
  },
  {
    id: "admin",
    module: "ADMIN_PANELS",
    name: "Admin Panels",
    description: "User management and administrative interfaces",
    icon: Settings,
    href: "/templates/admin-panels",
    count: 1,
    status: "READY",
  },
  {
    id: "account",
    module: "ACCOUNT_PAGES",
    name: "Account Pages",
    description: "Settings, billing, security, and user profile pages",
    icon: Users,
    href: "/templates/account-pages",
    count: 3,
    status: "READY",
  },
  {
    id: "marketing",
    module: "MARKETING",
    name: "Marketing",
    description: "Email templates and documentation layouts",
    icon: FileText,
    href: "/templates/marketing",
    count: 2,
    status: "READY",
  },
  {
    id: "components",
    module: "COMPONENTS",
    name: "Components",
    description: "100+ UI components with variants",
    icon: Palette,
    href: "/components",
    count: null,
    status: "LOADED",
  },
];

export default function TemplatesPage() {
  return (
    <div className="container mx-auto max-w-7xl space-y-12 px-6 py-12">
      {/* Header */}
      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className="text-muted-foreground font-mono text-xs">
            [TEMPLATE_GALLERY]: BROWSE_TEMPLATES
          </span>
        </div>
        <h1 className="text-4xl font-bold">Template Gallery</h1>
        <p className="text-muted-foreground max-w-2xl font-mono text-sm">
          Choose a category to explore ready-to-use templates included with Fabrk.
        </p>
      </section>

      {/* Category Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <div className="group border-border bg-card hover:border-primary/50 border transition-colors">
              {/* Card Header */}
              <div className="border-border flex items-center justify-between border-b px-4 py-2">
                <span className="text-muted-foreground font-mono text-xs">
                  [MODULE]: {category.module}
                </span>
                <category.icon className="text-muted-foreground size-4" />
              </div>

              {/* Card Content */}
              <div className="p-4">
                {/* Status & Count */}
                <div className="mb-4 flex items-center justify-between font-mono text-xs">
                  <div>
                    <span className="text-muted-foreground">STATUS: </span>
                    <span className="text-success">{category.status}</span>
                  </div>
                  {category.count && (
                    <div className="border-border border px-2 py-0.5">
                      <span className="text-muted-foreground">COUNT: </span>
                      <span className="text-foreground">{category.count}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="mb-2 text-lg font-semibold">{category.name}</h2>

                {/* Description */}
                <div className="mb-4 font-mono text-xs">
                  <span className="text-muted-foreground">DESC: </span>
                  <span className="text-foreground">{category.description}</span>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between">
                  <span className="text-primary group-hover:text-primary/80 font-mono text-xs transition-colors">
                    &gt; BROWSE_TEMPLATES
                  </span>
                  <span className="text-muted-foreground font-mono text-xs transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
