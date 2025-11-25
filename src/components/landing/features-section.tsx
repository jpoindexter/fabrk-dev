"use client";

import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siAuth0,
  siStripe,
  siPrisma,
  siResend,
  siTailwindcss,
  siTypescript,
  siOpenai,
} from "simple-icons";
import { Upload, Brain, Flag as FlagIcon, Lock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { H2, H3, Body, Small, Strong } from "@/components/ui/typography";

export function FeaturesSection() {
  const features = [
    {
      icon: siAuth0.path,
      title: "Complete Authentication System",
      description:
        "NextAuth v5 with credentials, Google OAuth, and magic link passwordless login. Email verification and password reset flows included.",
    },
    {
      icon: siStripe.path,
      title: "Stripe Payments & Webhooks",
      description:
        "Accept one-time payments and subscriptions. Production-ready webhook processing with signature verification and idempotency protection.",
    },
    {
      icon: siPrisma.path,
      title: "Prisma + PostgreSQL Database",
      description:
        "Production-ready database schema with type-safe queries. Clean structure that's easy to extend and manage.",
    },
    {
      icon: siResend.path,
      title: "Email Infrastructure",
      description:
        "Transactional emails via Resend. Includes welcome emails, verification flows, password resets, and purchase confirmations.",
    },
    {
      icon: siTailwindcss.path,
      title: "Modern UI Stack",
      description:
        "Tailwind CSS + shadcn/ui components with built-in dark mode support. Minimal, customizable, and free of complex abstractions.",
    },
    {
      icon: siTypescript.path,
      title: "100 Production-Ready Components",
      description:
        "Complete component library with 64% test coverage and 95% Storybook coverage. Built for production, ready to customize.",
    },
    {
      iconComponent: "upload",
      title: "File Upload System",
      description:
        "S3-compatible file uploads with automatic image optimization using Sharp. Secure presigned URLs, size validation, and type checking included.",
    },
    {
      icon: siOpenai.path,
      title: "AI Integration Toolkit",
      description:
        "Pre-configured OpenAI and Anthropic clients with streaming support. Type-safe SDK wrappers and error handling built-in.",
    },
    {
      iconComponent: "flag",
      title: "Feature Flags",
      description:
        "Database-backed feature flags with percentage-based rollout (0-100%). Enable/disable features instantly without deploying code.",
    },
    {
      iconComponent: "lock",
      title: "Session Versioning",
      description:
        "Instant security invalidation across all devices. Increment user session version to force re-authentication for password changes or security events.",
    },
    {
      iconComponent: "invoice",
      title: "Invoice Generation",
      description:
        "Automatic Stripe invoice creation for subscriptions and one-time purchases. PDF generation and email delivery handled automatically.",
    },
    {
      iconComponent: "filetext",
      title: "Rich Documentation",
      description:
        "Comprehensive docs with code examples, architecture diagrams, and deployment guides. Storybook for component exploration and testing.",
    },
  ];

  return (
    <section id="features" className="scroll-mt-16 border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <H2 className="mb-2 text-left">
            Everything You Need, Nothing You Don't.
          </H2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Body className="mb-16 text-left text-muted-foreground">
            Production-ready features that save you weeks of development time.
          </Body>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent =
              feature.iconComponent === "flag" ? FlagIcon :
              feature.iconComponent === "lock" ? Lock :
              feature.iconComponent === "invoice" ? FileText :
              feature.iconComponent === "filetext" ? FileText :
              feature.iconComponent === "upload" ? Upload :
              null;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                viewport={{ once: true }}
                className="group rounded-lg border border-border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-md bg-primary/10 p-3">
                  {feature.icon ? (
                    <SimpleIcon path={feature.icon} className="h-6 w-6 text-primary" />
                  ) : IconComponent ? (
                    <IconComponent className="h-6 w-6 text-primary" />
                  ) : null}
                </div>
                <H3 className="mb-3">
                  {feature.title}
                </H3>
                <Body className="text-muted-foreground">
                  {feature.description}
                </Body>
              </motion.div>
            );
          })}
        </div>

        {/* Bonus Features */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 rounded-lg border border-border bg-card shadow-sm p-8"
        >
          <Small className="block text-center">
            <Strong>Also Included: </Strong>
            <span className="text-muted-foreground">
              User dashboard • Account settings • Rate limiting • Admin capabilities • TypeScript strict mode • Production-ready logging
            </span>
          </Small>
        </motion.div>
      </div>
    </section>
  );
}
