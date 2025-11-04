"use client";

import { motion } from "framer-motion";
import { Code, Palette, Rocket, Shield, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Optimized",
    description:
      "llms.txt context files, MCP server integration, and Copy Prompt features. Works seamlessly with v0, Bolt, Cursor, and Lovable.",
  },
  {
    icon: Shield,
    title: "Quality Enforced",
    description:
      "11 automated standards enforced via pre-commit hooks. TypeScript strict mode, accessibility testing, and design token validation built-in.",
  },
  {
    icon: Rocket,
    title: "Complete System",
    description:
      "Components + Design tokens + Documentation all in one place. Industry-standard tokens following Carbon, Material, and Fluent.",
  },
  {
    icon: Palette,
    title: "Design System",
    description:
      "Comprehensive design token system with 60/30/10 color rule, 8px grid, and semantic naming. Built for scale.",
  },
  {
    icon: Code,
    title: "Accessible by Default",
    description:
      "WCAG 2.1 AA compliant components tested with axe-core. Keyboard navigation, screen reader support, and focus management included.",
  },
  {
    icon: Zap,
    title: "Modern Stack",
    description:
      "Next.js 15, React 19, TypeScript strict mode. Built with the latest and greatest tools for maximum developer experience.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-150px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const staggerContainer = {
  initial: "initial",
  whileInView: "whileInView",
  viewport: { once: true, margin: "-150px" },
  variants: {
    whileInView: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
};

const featureCard = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-background py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Everything you need to ship production apps
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            More than just components—a complete system with automated quality enforcement, AI workflows, and industry-standard design tokens.
          </p>
        </motion.div>

        {/* Clean grid without borders */}
        <motion.div
          className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          {...staggerContainer}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group"
                variants={featureCard}
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5 text-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
