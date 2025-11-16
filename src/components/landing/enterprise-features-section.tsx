import { Users, Lock, Shield, Webhook, Key, Radio, Server, BarChart } from "lucide-react";

export function EnterpriseFeaturesSection() {
  const enterpriseFeatures = [
    {
      icon: "users",
      title: "Multi-Tenancy + RBAC",
      description:
        "Full organization support with role-based access control. Owner, Admin, Member, and Guest roles with granular permissions. Built-in invitation system.",
    },
    {
      icon: "webhook",
      title: "Webhooks System",
      description:
        "Production-grade webhooks with 22 event types, HMAC-SHA256 signatures, automatic retry with exponential backoff, and delivery tracking.",
    },
    {
      icon: "key",
      title: "Secure API Keys",
      description:
        "256-bit cryptographically secure API keys with SHA-256 hashing, permission levels (read/write/admin), and timing-safe comparison.",
    },
    {
      icon: "radio",
      title: "Real-Time Features",
      description:
        "Pusher integration for live notifications, activity feeds, and presence tracking. WebSocket connections managed automatically.",
    },
    {
      icon: "shield",
      title: "2FA/MFA Security",
      description:
        "TOTP-based two-factor authentication with QR code generation, backup codes, and session versioning for instant security invalidation.",
    },
    {
      icon: "server",
      title: "Background Job Queue",
      description:
        "Database-backed job queue (no Redis needed) with automatic retry logic, cron job support, and email queue worker for bulk sending.",
    },
    {
      icon: "barchart",
      title: "Analytics & Audit Logs",
      description:
        "PostHog integration for analytics, feature flags, and session replay. Immutable audit logs for compliance with 18+ action types.",
    },
    {
      icon: "lock",
      title: "Admin Dashboard",
      description:
        "Complete admin interface with user impersonation, revenue stats, activity charts, feature flag management, and webhook monitoring.",
    },
  ];

  return (
    <section className="bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-md border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium uppercase tracking-wide text-primary">
            Enterprise-Grade Features
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Built for Scale, Security, and Teams
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Production-ready enterprise features that would cost $10,000+ to build yourself.
            All included, fully tested, and ready to deploy.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {enterpriseFeatures.map((feature) => {
            return (
              <div
                key={feature.title}
                className="group rounded-lg border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 p-3">
                  {feature.icon === "users" ? (
                    <Users className="h-6 w-6 text-primary" />
                  ) : feature.icon === "lock" ? (
                    <Lock className="h-6 w-6 text-primary" />
                  ) : feature.icon === "shield" ? (
                    <Shield className="h-6 w-6 text-primary" />
                  ) : feature.icon === "webhook" ? (
                    <Webhook className="h-6 w-6 text-primary" />
                  ) : feature.icon === "key" ? (
                    <Key className="h-6 w-6 text-primary" />
                  ) : feature.icon === "radio" ? (
                    <Radio className="h-6 w-6 text-primary" />
                  ) : feature.icon === "server" ? (
                    <Server className="h-6 w-6 text-primary" />
                  ) : feature.icon === "barchart" ? (
                    <BarChart className="h-6 w-6 text-primary" />
                  ) : null}
                </div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <div className="mt-12 rounded-lg border border-border bg-background p-8 text-center">
          <p className="text-lg font-semibold text-foreground">
            <span className="text-primary">$200,000+</span> worth of enterprise features, included out-of-the-box
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            These features would take 6-12 months to build yourself. We've done the hard work so you can focus on your product.
          </p>
        </div>
      </div>
    </section>
  );
}
