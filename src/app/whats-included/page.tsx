/**
 * What's Included Page
 * Comprehensive overview of all features, components, and pages for buyers
 */

import Link from "next/link";
import { ShowcaseNav } from "@/components/showcase/showcase-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Layout,
  Palette,
  Shield,
  Zap,
  Code2,
  FileText,
  Users,
  BarChart3,
  Lock,
  Upload,
  Cpu,
  Mail,
  CreditCard,
  Database,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Layout,
    title: "87+ UI Components",
    description: "Production-ready components with neo-brutalism styling",
    items: [
      "25 Radix UI base components",
      "62 custom components",
      "All variants included",
      "Fully accessible (WCAG AA)",
      "Dark mode support",
    ],
    link: "/components",
    badge: "Interactive Preview",
  },
  {
    icon: Palette,
    title: "Neo-Brutalism Design System",
    description: "Bold, unique aesthetic that stands out",
    items: [
      "3px solid borders",
      "Hard-edge brutal shadows",
      "Purple & yellow color scheme",
      "Press animation effects",
      "Consistent spacing system",
    ],
    link: "/components",
    badge: "Unique Design",
  },
  {
    icon: Shield,
    title: "Complete Authentication",
    description: "NextAuth v5 with multiple providers",
    items: [
      "Email/password with bcrypt",
      "Google OAuth integration",
      "Email verification (24hr)",
      "Password reset flow",
      "Protected routes middleware",
    ],
    link: "/login",
    badge: "Production Ready",
  },
  {
    icon: Lock,
    title: "Multi-Factor Authentication (2FA)",
    description: "TOTP-based MFA that NO competitor has",
    items: [
      "Authenticator app support",
      "QR code generation",
      "10 backup codes",
      "Complete UI at /settings/security",
      "RFC 6238 compliant",
    ],
    link: "/settings/security",
    badge: "Exclusive Feature",
  },
  {
    icon: Users,
    title: "Team/Organization Management",
    description: "Complete multi-tenancy system",
    items: [
      "RBAC (Owner, Admin, Member, Guest)",
      "Email invitations",
      "Transfer ownership",
      "Member management",
      "Organization settings",
    ],
    link: "/admin/users",
    badge: "Enterprise Ready",
  },
  {
    icon: Cpu,
    title: "Background Job Queue",
    description: "Database-backed queue (no Redis needed)",
    items: [
      "Priority-based processing",
      "Exponential backoff retry",
      "Scheduled/delayed jobs",
      "Job status tracking",
      "Standalone worker script",
    ],
    link: "/admin/monitoring",
    badge: "No Redis Required",
  },
  {
    icon: Upload,
    title: "File Upload System",
    description: "S3-compatible storage with optimization",
    items: [
      "Works with S3, R2, MinIO, Spaces",
      "Signed URLs for private files",
      "Image optimization (Sharp)",
      "Storage quota tracking",
      "Per-user and per-org limits",
    ],
    link: "/examples/user-profile",
    badge: "Production Ready",
  },
  {
    icon: Zap,
    title: "AI Integration Toolkit",
    description: "OpenAI + Anthropic with streaming",
    items: [
      "GPT-4, Claude 3 support",
      "DALL-E image generation",
      "Whisper (speech-to-text)",
      "Text-to-speech (TTS)",
      "Streaming responses",
    ],
    link: "/admin/analytics",
    badge: "AI-Powered",
  },
  {
    icon: CreditCard,
    title: "Stripe Integration",
    description: "Complete payment system",
    items: [
      "Checkout session creation",
      "Webhook event handling",
      "Customer portal",
      "Idempotency protection",
      "One-time & subscriptions",
    ],
    link: "/pricing",
    badge: "Payment Ready",
  },
  {
    icon: Mail,
    title: "Email System (Resend)",
    description: "Transactional emails with templates",
    items: [
      "Welcome email",
      "Email verification",
      "Password reset",
      "Purchase confirmation",
      "Subscription updates",
    ],
    link: "/register",
    badge: "5 Templates",
  },
  {
    icon: Database,
    title: "Database & ORM",
    description: "Prisma with PostgreSQL",
    items: [
      "Type-safe queries",
      "8 production models",
      "Migrations ready",
      "Prisma Studio GUI",
      "Connection pooling",
    ],
    link: "/admin/users",
    badge: "Type-Safe",
  },
  {
    icon: BarChart3,
    title: "Admin Dashboard",
    description: "Complete admin control panel",
    items: [
      "User management",
      "Analytics dashboard",
      "Feature flags",
      "Security audit logs",
      "System monitoring",
    ],
    link: "/admin",
    badge: "Full Admin Panel",
  },
];

const showcasePages = [
  {
    title: "Landing Page Variations",
    description: "3 hero styles + 2 pricing layouts",
    url: "/variations",
    icon: Layout,
    count: "5 variations",
  },
  {
    title: "UI Components Showcase",
    description: "All 87+ components with variants",
    url: "/components",
    icon: Palette,
    count: "87+ components",
  },
  {
    title: "Admin Dashboard Example",
    description: "Sortable data table with 12 users",
    url: "/examples/admin",
    icon: Users,
    count: "Real data",
  },
  {
    title: "Analytics Dashboard",
    description: "Metrics, activity feed, charts",
    url: "/examples/analytics",
    icon: BarChart3,
    count: "4 stat cards",
  },
];

const documentation = [
  { title: "Quick Start Guide", page: "QUICK-REFERENCE.md", size: "5 min read" },
  { title: "Architecture Reference", page: "CLAUDE.md", size: "5,000+ words" },
  { title: "Component Inventory", page: "docs/COMPONENTS-INVENTORY.md", size: "900+ lines" },
  { title: "Enterprise Features Setup", page: "docs/ENTERPRISE-FEATURES-SETUP.md", size: "2,000+ lines" },
  { title: "Security Implementation", page: "docs/SECURITY-IMPLEMENTATION.md", size: "Complete guide" },
  { title: "Deployment Guide", page: "docs/DEPLOYMENT.md", size: "Production ready" },
];

export default function WhatsIncludedPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-3 border-black dark:border-white bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <Badge className="mb-2">Complete Boilerplate</Badge>
              <h1 className="text-5xl font-bold mb-4">What's Included</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Everything you need to launch your SaaS in hours, not weeks. 87+ components, 5 unique features, complete authentication, and more.
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-12">
        {/* Showcase Navigation */}
        <div className="mb-12">
          <ShowcaseNav />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">87+</div>
              <p className="text-sm text-muted-foreground">UI Components</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">28</div>
              <p className="text-sm text-muted-foreground">Page Templates</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <p className="text-sm text-muted-foreground">API Routes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-muted-foreground">Documentation Files</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Core Features</h2>
            <p className="text-lg text-muted-foreground">
              Production-ready features that would take weeks to build from scratch
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="relative group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={feature.link}>
                      <Button variant="outline" size="sm" className="w-full">
                        View Example
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Showcase Pages */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Interactive Showcases</h2>
            <p className="text-lg text-muted-foreground">
              Preview everything before you build
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {showcasePages.map((page) => {
              const Icon = page.icon;
              return (
                <Card key={page.title} className="group hover:shadow-brutal-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-8 w-8 text-primary" />
                      <Badge>{page.count}</Badge>
                    </div>
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription>{page.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={page.url}>
                      <Button className="w-full">
                        Open Preview
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Documentation */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Comprehensive Documentation</h2>
            <p className="text-lg text-muted-foreground">
              50+ markdown files covering every aspect of the boilerplate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentation.map((doc) => (
              <Card key={doc.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {doc.size}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-1">{doc.title}</h4>
                  <p className="text-xs text-muted-foreground">{doc.page}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Competitive Advantages */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Unique Features</h2>
            <p className="text-lg text-muted-foreground">
              5 features that NO competitor offers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Multi-Factor Authentication",
                description: "Complete 2FA with TOTP, QR codes, and backup codes",
                competitors: "ShipFast: ❌ | Shipixen: ❌ | SaaS UI: ❌",
              },
              {
                title: "Background Job Queue",
                description: "Database-backed queue with no Redis required",
                competitors: "ShipFast: ❌ | Shipixen: ❌ | SaaS UI: ❌",
              },
              {
                title: "Team Management",
                description: "Complete multi-tenancy with RBAC",
                competitors: "ShipFast: ❌ | Shipixen: Basic | SaaS UI: Basic",
              },
              {
                title: "File Upload System",
                description: "S3-compatible with image optimization",
                competitors: "ShipFast: ❌ | Shipixen: ❌ | SaaS UI: Basic",
              },
              {
                title: "AI Integration Kit",
                description: "OpenAI + Anthropic with streaming support",
                competitors: "ShipFast: ❌ | Shipixen: ❌ | SaaS UI: ❌",
              },
              {
                title: "Neo-Brutalism Design",
                description: "Unique, bold aesthetic that stands out",
                competitors: "ShipFast: Generic | Shipixen: Generic | SaaS UI: Generic",
              },
            ].map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <Badge>Exclusive</Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-muted">
                    <p className="text-xs text-muted-foreground font-mono">
                      {feature.competitors}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-16" />

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-3">
            <CardContent className="pt-12 pb-12">
              <h2 className="text-4xl font-bold mb-4">Ready to Build?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Everything you see here is included. No hidden features, no upsells. Just ship your SaaS faster.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/components">
                  <Button size="lg">
                    Browse Components
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/variations">
                  <Button size="lg" variant="outline">
                    View Landing Variations
                  </Button>
                </Link>
                <Link href="/examples/admin">
                  <Button size="lg" variant="outline">
                    See Dashboard Examples
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
