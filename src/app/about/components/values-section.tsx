/**
 * Values Section
 * Core company values with icon cards
 */

"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Code,
  Zap,
  Users,
  Heart,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

interface Value {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    id: "0x01",
    icon: Rocket,
    title: "SHIP_FAST",
    description:
      "Time is your most valuable resource. Our boilerplate is designed to get you from idea to launch in record time, without compromising quality.",
  },
  {
    id: "0x02",
    icon: Code,
    title: "CLEAN_CODE",
    description:
      "We write code the way you would write it yourself. No over-engineering, no unnecessary abstractions. Just clean, maintainable TypeScript.",
  },
  {
    id: "0x03",
    icon: Zap,
    title: "PERFORMANCE_FIRST",
    description:
      "Every line of code is optimized for speed. We use the latest Next.js features, server components, and best practices to ensure your app is lightning fast.",
  },
  {
    id: "0x04",
    icon: Users,
    title: "DEVELOPER_EXPERIENCE",
    description:
      "We're developers too. We know what frustrates you, and we've built Fabrk to eliminate those pain points with great docs and thoughtful defaults.",
  },
  {
    id: "0x05",
    icon: Heart,
    title: "NO_LOCK_IN",
    description:
      "You own the code. No proprietary frameworks, no vendor lock-in. Build on top of industry-standard tools and deploy anywhere.",
  },
  {
    id: "0x06",
    icon: CheckCircle2,
    title: "PRODUCTION_READY",
    description:
      "From security to error handling to performance optimization, every aspect is built with production deployments in mind.",
  },
];

export function ValuesSection() {
  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block border border-border bg-card px-4 py-1 text-xs text-muted-foreground mb-4">
              [ [0x03] CORE_VALUES ]
            </span>
            <h2 className="text-2xl font-semibold lg:text-4xl mb-4">CORE_VALUES</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-muted-foreground">
              The principles that guide everything we build
            </p>
          </motion.div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}
              className="group border border-border bg-card p-6 transition-all hover:border-primary/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="inline-flex items-center justify-center bg-primary/10 border border-border p-2">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">[{value.id}]</span>
              </div>
              <h3 className="text-sm font-semibold mb-2">{value.title}</h3>
              <p className="text-xs text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
