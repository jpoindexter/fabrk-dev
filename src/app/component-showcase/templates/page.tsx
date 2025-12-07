/**
 * Template Snippets Showcase
 * Visual inspection of key template building blocks: Hero, Feature Grid, Dashboard Stats, etc.
 */

"use client";

import * as React from "react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronLeft, Zap, Shield, Globe, Database, BarChart3, Users, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Stat,
  StatGroup,
} from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";

// Section Header Component
function SectionHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="border-border bg-card border-b px-4 py-2">
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        [ [{code}] {title} ]
      </span>
    </div>
  );
}

export default function TemplateSnippetsPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <span className={cn("text-muted-foreground text-xs", mode.font)}>
            [ [0x00] TEMPLATE_SNIPPETS ] templates.tsx
          </span>
          <Link href="/component-showcase">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-1 size-4" />
              &gt; BACK_TO_SHOWCASE
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl space-y-8 px-6 py-12">
        {/* ============================================ */}
        {/* SECTION 1: HERO SNIPPETS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x01" title="HERO_SECTIONS" />
          <div className="space-y-6 p-6">
            {/* Hero Variant 1: Centered */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [HERO_CENTERED]:
              </p>
              <div className={cn("border-border bg-card border p-8 text-center", mode.radius)}>
                <Badge className="mb-4">&gt; NEW_RELEASE</Badge>
                <h1 className={cn("text-foreground mb-4 text-4xl font-bold", mode.font)}>
                  SHIP_FAST._LOOK_SHARP.
                </h1>
                <p className={cn("text-muted-foreground mx-auto mb-6 max-w-xl text-sm", mode.font)}>
                  Terminal-first SaaS boilerplate with 234 production-ready components. Authentication,
                  billing, and organizations built-in.
                </p>
                <div className="flex justify-center gap-4">
                  <Button>&gt; GET_STARTED</Button>
                  <Button variant="outline">&gt; VIEW_DEMO</Button>
                </div>
              </div>
            </div>

            {/* Hero Variant 2: Split */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [HERO_SPLIT]:
              </p>
              <div
                className={cn(
                  "border-border bg-card grid items-center gap-8 border p-8 md:grid-cols-2",
                  mode.radius
                )}
              >
                <div>
                  <Badge className="mb-4" variant="outline">
                    FABRK_BOILERPLATE
                  </Badge>
                  <h1 className={cn("text-foreground mb-4 text-3xl font-bold", mode.font)}>
                    BUILD_YOUR_SAAS_IN_DAYS,_NOT_MONTHS
                  </h1>
                  <p className={cn("text-muted-foreground mb-6 text-sm", mode.font)}>
                    Everything you need to launch your next SaaS product. Pre-configured authentication,
                    subscription billing, and team management.
                  </p>
                  <div className="flex gap-4">
                    <Button>&gt; START_BUILDING</Button>
                    <Button variant="ghost">&gt; LEARN_MORE</Button>
                  </div>
                </div>
                <div className={cn("bg-muted flex h-64 items-center justify-center border border-border", mode.radius)}>
                  <span className={cn("text-muted-foreground text-sm", mode.font)}>
                    [HERO_IMAGE_PLACEHOLDER]
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Variant 3: With Email Capture */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [HERO_EMAIL_CAPTURE]:
              </p>
              <div className={cn("border-border bg-card border p-8 text-center", mode.radius)}>
                <h1 className={cn("text-foreground mb-4 text-3xl font-bold", mode.font)}>
                  JOIN_THE_WAITLIST
                </h1>
                <p className={cn("text-muted-foreground mx-auto mb-6 max-w-md text-sm", mode.font)}>
                  Be the first to know when we launch. Get early access and exclusive updates.
                </p>
                <div className="mx-auto flex max-w-md gap-2">
                  <Input placeholder="email@example.com" className="flex-1" />
                  <Button>&gt; SUBSCRIBE</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: FEATURE GRID */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x02" title="FEATURE_GRIDS" />
          <div className="space-y-6 p-6">
            {/* Feature Grid 3-col */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [FEATURE_GRID_3COL]:
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  { icon: Zap, title: "FAST_SETUP", desc: "Get started in minutes with our CLI" },
                  { icon: Shield, title: "SECURE", desc: "Built-in auth and security best practices" },
                  { icon: Globe, title: "SCALABLE", desc: "Ready for production from day one" },
                ].map((feature, i) => (
                  <Card key={i} interactive>
                    <CardHeader
                      code={`0${i + 1}`}
                      title={feature.title}
                      icon={<feature.icon className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />}
                    />
                    <CardContent>
                      <p className={cn("text-muted-foreground text-xs", mode.font)}>{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Feature Grid 4-col */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [FEATURE_GRID_4COL]:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                {[
                  { icon: Database, title: "DATABASE" },
                  { icon: Mail, title: "EMAILS" },
                  { icon: Users, title: "TEAMS" },
                  { icon: BarChart3, title: "ANALYTICS" },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className={cn(
                      "border-border bg-card hover:border-primary/50 border p-4 text-center transition-colors",
                      mode.radius
                    )}
                  >
                    <feature.icon className="text-muted-foreground mx-auto mb-2 size-6" />
                    <p className={cn("text-foreground text-xs font-semibold", mode.font)}>
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature List */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [FEATURE_LIST]:
              </p>
              <div className={cn("border-border bg-card border p-6", mode.radius)}>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    "Authentication with NextAuth v5",
                    "Subscription billing via Polar.sh",
                    "Team/Organization management",
                    "Email templates with Resend",
                    "Admin dashboard with role-based access",
                    "API key management",
                    "Webhook handling",
                    "Rate limiting",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={cn("text-primary text-xs", mode.font)}>├─</span>
                      <span className={cn("text-foreground text-xs", mode.font)}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: DASHBOARD STATS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x03" title="DASHBOARD_STATS" />
          <div className="space-y-6 p-6">
            {/* Stats Row */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [STATS_ROW]:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                <StatCard title="Total Users" value="12,345" change={12} trend="up" />
                <StatCard title="Revenue" value="$45,231" change={-3} trend="down" />
                <StatCard title="Active Sessions" value="1,234" change={5} trend="up" />
                <StatCard title="Conversion" value="3.24%" change={0.5} trend="up" />
              </div>
            </div>

            {/* Terminal Stats */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [TERMINAL_STATS]:
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader code="0x10" title="USERS" />
                  <CardContent>
                    <div className={cn("text-foreground mb-2 text-3xl font-bold", mode.font)}>
                      2,847
                    </div>
                    <StatGroup>
                      <Stat label="Active" value="2,341" size="sm" />
                      <Stat label="New" value="+127" size="sm" />
                    </StatGroup>
                  </CardContent>
                </Card>
                <Card tone="success">
                  <CardHeader code="0x11" title="MRR" />
                  <CardContent>
                    <div className={cn("text-foreground mb-2 text-3xl font-bold", mode.font)}>
                      $24,500
                    </div>
                    <StatGroup>
                      <Stat label="Growth" value="+15%" size="sm" />
                      <Stat label="Churn" value="2.1%" size="sm" />
                    </StatGroup>
                  </CardContent>
                </Card>
                <Card tone="warning">
                  <CardHeader code="0x12" title="SYSTEM" />
                  <CardContent>
                    <div className={cn("text-foreground mb-2 text-3xl font-bold", mode.font)}>
                      99.9%
                    </div>
                    <StatGroup>
                      <Stat label="Uptime" value="30d" size="sm" />
                      <Stat label="Latency" value="45ms" size="sm" />
                    </StatGroup>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: PRICING CARDS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x04" title="PRICING_CARDS" />
          <div className="space-y-6 p-6">
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [PRICING_GRID]:
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    name: "STARTER",
                    price: "$0",
                    desc: "For hobby projects",
                    features: ["5 projects", "Basic analytics", "Community support"],
                    cta: "GET_STARTED",
                    tone: "neutral" as const,
                  },
                  {
                    name: "PRO",
                    price: "$29",
                    desc: "For growing teams",
                    features: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"],
                    cta: "START_TRIAL",
                    tone: "primary" as const,
                    popular: true,
                  },
                  {
                    name: "ENTERPRISE",
                    price: "$99",
                    desc: "For large organizations",
                    features: ["Everything in Pro", "SSO/SAML", "Dedicated support", "SLA guarantee"],
                    cta: "CONTACT_SALES",
                    tone: "neutral" as const,
                  },
                ].map((plan, i) => (
                  <Card key={i} tone={plan.tone}>
                    <CardHeader
                      code={`0${i + 4}`}
                      title={plan.name}
                      meta={plan.popular ? <Badge>POPULAR</Badge> : undefined}
                    />
                    <CardContent>
                      <div className={cn("text-foreground mb-1 text-3xl font-bold", mode.font)}>
                        {plan.price}
                        <span className={cn("text-muted-foreground text-sm font-normal", mode.font)}>
                          /month
                        </span>
                      </div>
                      <p className={cn("text-muted-foreground mb-4 text-xs", mode.font)}>
                        {plan.desc}
                      </p>
                      <ul className="mb-4 space-y-2">
                        {plan.features.map((feature, j) => (
                          <li key={j} className="flex items-center gap-2">
                            <span className={cn("text-primary text-xs", mode.font)}>├─</span>
                            <span className={cn("text-foreground text-xs", mode.font)}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        className="w-full"
                      >
                        &gt; {plan.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: TESTIMONIALS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x05" title="TESTIMONIALS" />
          <div className="space-y-6 p-6">
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [TESTIMONIAL_GRID]:
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    quote: "This boilerplate saved us weeks of development time. The terminal aesthetic is unique and our users love it.",
                    author: "Sarah Chen",
                    role: "CTO at TechStartup",
                    rating: 5,
                  },
                  {
                    quote: "Best investment for our SaaS. The authentication and billing were production-ready out of the box.",
                    author: "Mike Johnson",
                    role: "Founder at SaaS Co",
                    rating: 5,
                  },
                ].map((testimonial, i) => (
                  <Card key={i}>
                    <CardContent>
                      <div className="mb-3 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, j) => (
                          <Star key={j} className="text-warning size-4 fill-current" />
                        ))}
                      </div>
                      <p className={cn("text-foreground mb-4 text-sm italic", mode.font)}>
                        &quot;{testimonial.quote}&quot;
                      </p>
                      <div>
                        <p className={cn("text-foreground text-xs font-semibold", mode.font)}>
                          {testimonial.author}
                        </p>
                        <p className={cn("text-muted-foreground text-xs", mode.font)}>
                          {testimonial.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 6: CTA SECTIONS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x06" title="CTA_SECTIONS" />
          <div className="space-y-6 p-6">
            {/* Simple CTA */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [CTA_SIMPLE]:
              </p>
              <div
                className={cn(
                  "border-border bg-card border p-8 text-center",
                  mode.radius
                )}
              >
                <h2 className={cn("text-foreground mb-2 text-2xl font-bold", mode.font)}>
                  READY_TO_START?
                </h2>
                <p className={cn("text-muted-foreground mb-6 text-sm", mode.font)}>
                  Join thousands of developers shipping faster with Fabrk.
                </p>
                <Button size="lg">&gt; GET_STARTED_FREE</Button>
              </div>
            </div>

            {/* Banner CTA */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [CTA_BANNER]:
              </p>
              <div
                className={cn(
                  "border-primary bg-primary/10 flex items-center justify-between border-2 p-6",
                  mode.radius
                )}
              >
                <div>
                  <h3 className={cn("text-foreground text-lg font-bold", mode.font)}>
                    LIMITED_TIME_OFFER
                  </h3>
                  <p className={cn("text-muted-foreground text-sm", mode.font)}>
                    Get 50% off your first year with code LAUNCH50
                  </p>
                </div>
                <Button>&gt; CLAIM_OFFER</Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 7: LIST PATTERNS */}
        {/* ============================================ */}
        <section className={cn("border-border border", mode.radius)}>
          <SectionHeader code="0x07" title="LIST_PATTERNS" />
          <div className="space-y-6 p-6">
            {/* Docs List */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [DOCS_LIST]:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: "Getting Started", desc: "Installation and setup guide", href: "#" },
                  { title: "Authentication", desc: "Configure NextAuth providers", href: "#" },
                  { title: "Billing", desc: "Integrate Polar.sh subscriptions", href: "#" },
                  { title: "Database", desc: "Prisma setup and migrations", href: "#" },
                ].map((doc, i) => (
                  <Card key={i} interactive>
                    <CardHeader code={`D${i + 1}`} title={doc.title} />
                    <CardContent>
                      <p className={cn("text-muted-foreground text-xs", mode.font)}>{doc.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Activity List */}
            <div>
              <p className={cn("text-foreground mb-2 text-xs font-semibold", mode.font)}>
                [ACTIVITY_LIST]:
              </p>
              <Card>
                <CardHeader code="0x20" title="RECENT_ACTIVITY" meta="5 items" />
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: "User signed up", time: "2 minutes ago", type: "success" },
                      { action: "Payment received", time: "15 minutes ago", type: "success" },
                      { action: "API key created", time: "1 hour ago", type: "neutral" },
                      { action: "Team invite sent", time: "2 hours ago", type: "neutral" },
                      { action: "Password reset", time: "1 day ago", type: "warning" },
                    ].map((item, i, arr) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={cn("text-primary text-xs", mode.font)}>
                            {i === arr.length - 1 ? "└─" : "├─"}
                          </span>
                          <span className={cn("text-foreground text-xs", mode.font)}>
                            {item.action}
                          </span>
                        </div>
                        <span className={cn("text-muted-foreground text-xs", mode.font)}>
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
