"use client";

import { Users, Lock, Shield, Webhook, Key, Radio, Server, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { H2, H3, Body, Small, Strong } from "@/components/ui/typography";

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
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 inline-block"
          >
            <Badge variant="default" size="lg" className="rounded-none uppercase tracking-wide">
              Enterprise-Grade Features
            </Badge>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <H2 className="mb-4">
              Built for Scale, Security, and Teams
            </H2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Body className="mx-auto max-w-2xl text-muted-foreground">
              Production-ready enterprise features that would cost $10,000+ to build yourself.
              All included, fully tested, and ready to deploy.
            </Body>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {enterpriseFeatures.map((feature, index) => {
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
                className="group border border-border bg-card p-6 transition-all hover:border-primary/50"
              >
                <div className="mb-4 inline-flex items-center justify-center bg-primary/10 p-3">
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
                <H3 className="mb-3">
                  {feature.title}
                </H3>
                <Small className="block text-muted-foreground">
                  {feature.description}
                </Small>
              </motion.div>
            );
          })}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 border border-border bg-card p-8 text-center"
        >
          <Body className="font-semibold">
            <Strong className="text-primary">$200,000+</Strong> worth of enterprise features, included out-of-the-box
          </Body>
          <Small className="block mt-2 text-muted-foreground">
            These features would take 6-12 months to build yourself. We've done the hard work so you can focus on your product.
          </Small>
        </motion.div>
      </div>
    </section>
  );
}
