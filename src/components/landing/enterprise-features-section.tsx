"use client";

import { Users, Lock, Shield, Webhook, Key, Radio, Server, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

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
    <section className={cn("border-border bg-background border-t px-6 py-24", mode.font)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 inline-block"
          >
            <span
              className={cn(
                "border-border bg-card text-muted-foreground border px-4 py-1 text-xs",
                mode.radius
              )}
            >
              [ ENTERPRISE_GRADE_FEATURES ]
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground text-xs">[0x00]</span>
            <h2 className="mb-4 text-2xl font-semibold tracking-tight">
              BUILT_FOR_SCALE_SECURITY_AND_TEAMS
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
              &gt; Production-ready enterprise features that would cost $10,000+ to build yourself.
              All included, fully tested, and ready to deploy.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {enterpriseFeatures.map((feature, index) => {
            const IconEl =
              feature.icon === "users"
                ? Users
                : feature.icon === "lock"
                  ? Lock
                  : feature.icon === "shield"
                    ? Shield
                    : feature.icon === "webhook"
                      ? Webhook
                      : feature.icon === "key"
                        ? Key
                        : feature.icon === "radio"
                          ? Radio
                          : feature.icon === "server"
                            ? Server
                            : feature.icon === "barchart"
                              ? BarChart
                              : null;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className={cn(
                  "group border-border bg-card hover:border-primary/50 flex h-full flex-col border transition-colors",
                  mode.radius
                )}
              >
                {/* Terminal Header */}
                <div className="border-border flex items-center justify-between border-b px-4 py-2">
                  <span className="text-muted-foreground text-xs">
                    [ [0x{(index + 40).toString(16).toUpperCase()}]{" "}
                    {feature.title
                      .toUpperCase()
                      .replace(/ /g, "_")
                      .replace(/\+/g, "_")
                      .replace(/\//g, "_")
                      .slice(0, 12)}{" "}
                    ]
                  </span>
                  {IconEl && (
                    <IconEl className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  <div className="text-foreground mb-3 text-xs font-semibold">
                    {feature.title.toUpperCase().replace(/ /g, "_").replace(/\+/g, "_AND_")}
                  </div>
                  <div className="text-xs">
                    <span className="text-muted-foreground">DESC: </span>
                    <span className="text-foreground">{feature.description}</span>
                  </div>
                </div>
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
          className={cn("border-border bg-card mt-12 border", mode.radius)}
        >
          <div className="border-border border-b px-4 py-2">
            <span className="text-muted-foreground text-xs">[ [0x48] VALUE ]</span>
          </div>
          <div className="p-4">
            <p className="text-foreground mb-2 text-sm font-semibold">
              <span className="text-primary">$200,000+</span> WORTH_OF_ENTERPRISE_FEATURES
            </p>
            <div className="text-xs">
              <span className="text-muted-foreground">DESC: </span>
              <span className="text-foreground">
                These features would take 6-12 months to build yourself. We've done the hard work so
                you can focus on your product.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
