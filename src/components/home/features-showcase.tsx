/**
 * ✅ FABRK COMPONENT
 * Stack Config - Terminal console [MODULE] cards grid
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import {
  Lock,
  CreditCard,
  Database,
  Users,
  FileText,
  Smartphone,
  BarChart3,
  Activity,
  CheckCircle,
  Palette,
  Mail,
} from "lucide-react";

const FEATURES = [
  {
    id: "auth",
    icon: Lock,
    module: "AUTH",
    status: "SECURE",
    title: "Authentication",
    description: "Offer a wide range of built-in authentication options.",
  },
  {
    id: "billing",
    icon: CreditCard,
    module: "BILLING",
    status: "ACTIVE",
    title: "Billing & Payments",
    description: "Let users manage their billing and subscription plan.",
  },
  {
    id: "database",
    icon: Database,
    module: "DATABASE",
    status: "READY",
    title: "Database",
    description: "Use either the Prisma or Drizzle ORM starter kit.",
  },
  {
    id: "multitenancy",
    icon: Users,
    module: "MULTI_TENANT",
    status: "ENABLED",
    title: "Multi-Tenancy",
    description: "Invite, join and switch between multiple organizations.",
  },
  {
    id: "marketing",
    icon: FileText,
    module: "PAGES",
    status: "LIVE",
    title: "Marketing Pages",
    description: "Show your product and convert users with a landing page.",
  },
  {
    id: "email",
    icon: Mail,
    module: "EMAIL",
    status: "SENDING",
    title: "Mailer & Templates",
    description: "Send good looking emails to your customers.",
  },
  {
    id: "docs",
    icon: FileText,
    module: "DOCS",
    status: "COMPLETE",
    title: "Documentation",
    description: "Help your users get started with your product docs.",
  },
  {
    id: "mobile",
    icon: Smartphone,
    module: "MOBILE",
    status: "RESPONSIVE",
    title: "Mobile Friendly",
    description: "Support mobile devices with minimum coding effort.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    module: "STATS",
    status: "TRACKING",
    title: "Analytics",
    description: "Tag events and track your users and their behavior.",
  },
  {
    id: "monitoring",
    icon: Activity,
    module: "MONITOR",
    status: "WATCHING",
    title: "Monitoring",
    description: "Track application errors and events of your SaaS app.",
  },
  {
    id: "quality",
    icon: CheckCircle,
    module: "QUALITY",
    status: "STRICT",
    title: "High code quality",
    description: "Fully-typed with strict TypeScript and ESLint rules.",
  },
  {
    id: "design",
    icon: Palette,
    module: "DESIGN",
    status: "SCALABLE",
    title: "Shadcn UI",
    description: "Build faster with Shadcn UI, Tailwind CSS and Lucide icons.",
  },
];

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  module: string;
  status: string;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon: Icon, module, status, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 }
      }}
      className="group border border-border bg-card transition-colors hover:border-primary/50 hover:shadow-sm"
    >
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">[ [0x{(index + 17).toString(16).toUpperCase().padStart(2, '0')}] {module} ]</span>
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Status */}
        <div className="mb-4 font-mono text-xs">
          <span className="text-muted-foreground">STATUS: </span>
          <motion.span
            className="text-success"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.3 }}
          >
            {status}
          </motion.span>
        </div>

        {/* Description */}
        <div className="font-mono text-xs">
          <span className="text-muted-foreground">DESC: </span>
          <span className="text-foreground">{description}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturesShowcase() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 inline-block border border-border bg-card px-4 py-1">
            <span className="font-mono text-xs text-muted-foreground">[ [0x10] STACK_CONFIG ] FIB[89,144,233] MODULES</span>
          </div>
          <h2 className="mb-4 font-mono text-2xl font-bold tracking-tight">
            SOLID_FOUNDATION
          </h2>
          <p className="max-w-2xl font-mono text-sm text-muted-foreground">
            Everything you need to build a production-ready SaaS. Authentication, payments,
            multi-tenancy, and more—all pre-configured and ready to customize.
          </p>
        </motion.div>

        {/* 4x3 Features Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              module={feature.module}
              status={feature.status}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
