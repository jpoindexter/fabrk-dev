/**
 * Why Choose Section
 * Key reasons to choose Fabrk
 */

"use client";

import { motion } from "framer-motion";

interface Reason {
  id: string;
  title: string;
  description: string;
}

const reasons: Reason[] = [
  {
    id: "0x10",
    title: "SAVE_WEEKS_OF_DEVELOPMENT",
    description:
      "What normally takes 2-4 weeks to build from scratch is ready in minutes. Focus on your unique features, not boilerplate.",
  },
  {
    id: "0x11",
    title: "PRODUCTION_GRADE_SECURITY",
    description:
      "Security headers, rate limiting, token hashing, CSRF protection—all the security best practices implemented and tested.",
  },
  {
    id: "0x12",
    title: "MODERN_TECH_STACK",
    description:
      "Built on Next.js 15, TypeScript, Prisma, NextAuth v5, and Stripe. The tools you're already using or want to learn.",
  },
  {
    id: "0x13",
    title: "LIFETIME_UPDATES",
    description:
      "One-time payment, lifetime access to all updates. No subscriptions, no hidden fees.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
                [ [0x05] WHY_FABRK ]
              </span>
              <h2 className="text-2xl font-bold lg:text-3xl mb-4">WHY_CHOOSE_FABRK</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground">
                We're not just selling code, we're selling time
              </p>
            </motion.div>
          </div>

          <div className="space-y-3">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 4, backgroundColor: "hsl(var(--muted))" }}
                className="border border-border bg-card p-4 transition-all hover:border-primary/50"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">[{item.id}]</span>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground pl-12">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
