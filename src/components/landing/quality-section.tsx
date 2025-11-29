"use client";

import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siTypescript,
  siStorybook,
  siVitest,
  siGithubactions,
} from "simple-icons";
import { CheckCircle2, TestTube2 } from "lucide-react";
import { motion } from "framer-motion";

export function QualitySection() {
  const qualityMetrics = [
    {
      metric: "85%",
      label: "Test Coverage",
      description: "Core components and flows are covered by Vitest and integration tests",
      icon: siVitest.path,
    },
    {
      metric: "95%",
      label: "Storybook Coverage",
      description: "Most components are documented in interactive Storybook",
      icon: siStorybook.path,
    },
    {
      metric: "100%",
      label: "TypeScript Strict",
      description: "Full TypeScript strict mode enforcement across the codebase",
      icon: siTypescript.path,
    },
    {
      metric: "6",
      label: "CI/CD Pipelines",
      description: "Automated lint, test, build, E2E, performance, and PR checks",
      icon: siGithubactions.path,
    },
    {
      metric: "114+",
      label: "Comprehensive Tests",
      description: "Unit tests + E2E Playwright tests for critical user flows",
      iconComponent: "testTube",
    },
  ];

  return (
    <section className="border-t border-border bg-background px-6 py-24 font-mono">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4"
          >
            [ QUALITY_ASSURANCE ]
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <span className="text-xs text-muted-foreground">[0x00]</span>
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              BUILT_TO_LAST_TESTED_TO_SHIP
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
              &gt; Every component is battle-tested with comprehensive coverage. No cutting corners,
              no technical debt. Production-ready from day one.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {qualityMetrics.map((item, index) => {
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                viewport={{ once: true }}
                className="group border border-border bg-card p-8 transition-all hover:border-primary/50"
              >
                <div className="mb-4 inline-flex items-center justify-center bg-primary/10 p-3">
                  {item.iconComponent === "testTube" ? (
                    <TestTube2 className="h-6 w-6 text-primary" />
                  ) : (
                    <SimpleIcon path={item.icon!} className="h-6 w-6 text-primary" />
                  )}
                </div>
                <div className="mb-3">
                  <div className="text-3xl font-bold text-foreground">
                    {item.metric}
                  </div>
                  <h3 className="text-lg font-bold mt-1">
                    {item.label.toUpperCase().replace(/ /g, '_')}
                  </h3>
                </div>
                <span className="block text-xs text-muted-foreground">
                  {item.description}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 border border-border bg-card p-8"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                QUALITY_GUARANTEE
              </h3>
              <p className="text-sm text-muted-foreground">
                Unlike other boilerplates that ship untested code, every Fabrk component is
                rigorously tested, documented in Storybook, and validated by CI/CD pipelines.
                You're not inheriting technical debt—you're getting production-grade infrastructure.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
