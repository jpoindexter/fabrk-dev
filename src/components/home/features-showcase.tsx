/**
 * ✅ FABRK COMPONENT
 * Solid Foundation Grid - Achromatic-style 4x3 feature grid
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { H2, H3, Body, Small } from "@/components/ui/typography";
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
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    id: "auth",
    icon: Lock,
    title: "Authentication",
    description: "Offer a wide range of built-in authentication options.",
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Billing & Payments",
    description: "Let users manage their billing and subscription plan.",
  },
  {
    id: "database",
    icon: Database,
    title: "Database",
    description: "Use either the Prisma or Drizzle ORM starter kit.",
  },
  {
    id: "multitenancy",
    icon: Users,
    title: "Multi-Tenancy",
    description: "Invite, join and switch between multiple organizations.",
  },
  {
    id: "marketing",
    icon: FileText,
    title: "Marketing Pages",
    description: "Show your product and convert users with a landing page.",
  },
  {
    id: "email",
    icon: Mail,
    title: "Mailer & Templates",
    description: "Send good looking emails to your customers.",
  },
  {
    id: "docs",
    icon: FileText,
    title: "Documentation",
    description: "Help your users get started with your product docs.",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "Support mobile devices with minimum coding effort.",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics",
    description: "Tag events and track your users and their behavior.",
  },
  {
    id: "monitoring",
    icon: Activity,
    title: "Monitoring",
    description: "Track application errors and events of your SaaS app.",
  },
  {
    id: "quality",
    icon: CheckCircle,
    title: "High code quality",
    description: "Fully-typed with strict TypeScript and ESLint rules.",
  },
  {
    id: "design",
    icon: Palette,
    title: "Shadcn UI",
    description: "Build faster with Shadcn UI, Tailwind CSS and Lucide icons.",
  },
];

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
    >
      {/* Icon */}
      <div className="mb-3 inline-flex rounded-md bg-primary/10 p-2">
        <Icon className="size-5 text-primary" />
      </div>

      {/* Title */}
      <H3 className="mb-1 text-base font-semibold">{title}</H3>

      {/* Description */}
      <Small className="text-muted-foreground">{description}</Small>
    </motion.div>
  );
}

export function FeaturesShowcase() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <H2 className="mb-4">Solid foundation</H2>
          <Body className="mx-auto max-w-2xl text-muted-foreground">
            Everything you need to build a production-ready SaaS. Authentication, payments,
            multi-tenancy, and more—all pre-configured and ready to customize.
          </Body>
        </motion.div>

        {/* 4x3 Features Grid */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
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
