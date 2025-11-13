/**
 * Template Gallery
 * Copy-paste ready layouts for common SaaS pages
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  FileText,
  Mail,
  CreditCard,
  Shield,
  Home,
  Code,
  Copy,
  ExternalLink,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: "dashboard" | "admin" | "marketing" | "account";
  icon: React.ElementType;
  badge?: string;
  href: string;
  features: string[];
}

const templates: Template[] = [
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Complete dashboard with charts, metrics, and data visualization",
    category: "dashboard",
    icon: BarChart3,
    badge: "Popular",
    href: "/templates/analytics-dashboard",
    features: ["Charts & graphs", "Metric cards", "Data tables", "Filters"],
  },
  {
    id: "user-management",
    name: "User Management",
    description: "Admin panel for managing users, roles, and permissions",
    category: "admin",
    icon: Users,
    href: "/templates/user-management",
    features: ["User table", "Role management", "Search & filter", "Actions menu"],
  },
  {
    id: "settings-page",
    name: "Settings Page",
    description: "Comprehensive settings with tabs, forms, and toggles",
    category: "account",
    icon: Settings,
    badge: "Essential",
    href: "/templates/settings-page",
    features: ["Tab navigation", "Form sections", "Save states", "Validation"],
  },
  {
    id: "billing-dashboard",
    name: "Billing Dashboard",
    description: "Payment history, invoices, and subscription management",
    category: "account",
    icon: CreditCard,
    href: "/templates/billing-dashboard",
    features: ["Invoice list", "Payment methods", "Plans", "Usage tracking"],
  },
  {
    id: "email-templates",
    name: "Email Templates",
    description: "Transactional email layouts for notifications and updates",
    category: "marketing",
    icon: Mail,
    href: "/templates/email-templates",
    features: ["Welcome email", "Reset password", "Receipts", "Notifications"],
  },
  {
    id: "documentation",
    name: "Documentation Layout",
    description: "Docs page with sidebar navigation and content",
    category: "marketing",
    icon: FileText,
    href: "/templates/documentation",
    features: ["Sidebar nav", "Search", "Code blocks", "Mobile responsive"],
  },
  {
    id: "team-dashboard",
    name: "Team Dashboard",
    description: "Team overview with members, activity, and collaboration",
    category: "dashboard",
    icon: Users,
    href: "/templates/team-dashboard",
    features: ["Team roster", "Activity feed", "Invites", "Permissions"],
  },
  {
    id: "security-privacy",
    name: "Security & Privacy",
    description: "Security settings with 2FA, sessions, and audit logs",
    category: "account",
    icon: Shield,
    href: "/templates/security-privacy",
    features: ["2FA setup", "Active sessions", "Audit log", "GDPR controls"],
  },
  {
    id: "chart-library",
    name: "Chart Library",
    description: "Data visualization with Recharts (line, area, bar, pie charts)",
    category: "dashboard",
    icon: BarChart3,
    badge: "New",
    href: "/templates/chart-library",
    features: ["Line charts", "Area charts", "Bar charts", "Pie/Donut charts"],
  },
];

const categories = [
  { id: "dashboard", name: "Dashboards", icon: LayoutDashboard },
  { id: "admin", name: "Admin Panels", icon: Settings },
  { id: "account", name: "Account Pages", icon: Users },
  { id: "marketing", name: "Marketing", icon: FileText },
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-3 border-border bg-card">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Template Gallery</h1>
              <p className="text-muted-foreground text-lg">
                Copy-paste ready layouts for your SaaS application
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <Link href="/">
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
        {/* Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Ready-to-Use Templates</CardTitle>
                  <CardDescription>
                    All templates are fully responsive, accessible, and built with the same
                    components you'll find in your boilerplate. Simply copy the code and customize.
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary">8 Templates</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <Button key={cat.id} variant="outline" size="sm" asChild>
              <a href={`#${cat.id}`}>
                <cat.icon className="mr-2 h-4 w-4" />
                {cat.name}
              </a>
            </Button>
          ))}
        </div>

        {/* Templates by Category */}
        {categories.map((category) => {
          const categoryTemplates = templates.filter(
            (t) => t.category === category.id
          );

          if (categoryTemplates.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="space-y-6">
              <div className="flex items-center gap-3">
                <category.icon className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">{category.name}</h2>
                <Badge variant="secondary">{categoryTemplates.length}</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {categoryTemplates.map((template) => (
                  <Card key={template.id} className="group hover:border-primary/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                            <template.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{template.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {template.description}
                            </CardDescription>
                          </div>
                        </div>
                        {template.badge && <Badge>{template.badge}</Badge>}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature) => (
                          <Badge key={feature} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button asChild className="flex-1">
                          <Link href={template.href}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Template
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            // In a real implementation, this would copy the template code
                            alert("Template code copied to clipboard! (Demo)");
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}

        {/* Coming Soon Section */}
        <Card className="bg-accent/30">
          <CardHeader>
            <CardTitle>More Templates Coming Soon</CardTitle>
            <CardDescription>
              We're constantly adding new templates. Suggestions? Let us know what you'd like to see!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "Kanban Board",
                "Calendar View",
                "Chat Interface",
                "File Manager",
                "Pricing Calculator",
                "Onboarding Flow",
              ].map((upcoming) => (
                <div
                  key={upcoming}
                  className="flex items-center gap-2 p-3 rounded-lg border-2 border-dashed border-border"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {upcoming}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Links */}
        <Card>
          <CardHeader>
            <CardTitle>Explore More</CardTitle>
            <CardDescription>
              Check out our other showcases and documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/components">
                <Code className="mr-2 h-4 w-4" />
                UI Components
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/variations">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Landing Variations
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
