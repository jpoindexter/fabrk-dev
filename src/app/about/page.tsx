/**
 * About Us Page
 * Company story, mission, and values - Terminal Console Style
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import config from "@/config";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";
import { TerminalBackground } from "@/components/landing/terminal-background";
import { motion } from "framer-motion";
import {
  Rocket,
  Target,
  Users,
  Zap,
  Heart,
  Code,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const values = [
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

  const reasons = [
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

  return (
    <div className="min-h-screen bg-background font-mono relative">
      <TerminalBackground />
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              [ [0x00] ABOUT ] FABRK_ORIGIN_STORY
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="mb-2 text-sm text-muted-foreground">
              FABRK_ABOUT:
            </h1>
            <h2 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">
              BUILT_BY_DEVELOPERS
              <br />
              <span className="text-primary">FOR_DEVELOPERS</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-border bg-card p-4 mx-auto max-w-2xl"
          >
            <div className="mb-2 text-xs text-muted-foreground">
              [ [0x01] MISSION_STATEMENT ]────────────────────
            </div>
            <p className="text-sm text-muted-foreground">
              We're on a mission to eliminate the repetitive work that slows down every
              SaaS project, so you can focus on building features that matter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-t border-border bg-background px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center bg-primary/10 border border-border p-4 mb-6"
            >
              <Target className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
                [ [0x02] OUR_MISSION ]
              </span>
              <h2 className="text-2xl font-bold lg:text-3xl">OUR_MISSION</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-border bg-card p-6 text-left"
            >
              <div className="text-xs text-muted-foreground mb-3">
                │ &gt; Loading mission parameters...
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Every developer has experienced the frustration of rebuilding the same
                authentication system, payment integration, and UI components for the
                hundredth time. We created Fabrk to solve this problem once and for all.
              </p>
              <p className="text-sm text-muted-foreground">
                Our mission is simple: <span className="text-primary font-semibold">help you ship your SaaS product in days, not
                months</span>. We handle the boring infrastructure so you can focus on the
                innovation that makes your product unique.
              </p>
              <div className="mt-3 text-xs text-success">
                └─ Mission parameters loaded [OK]
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-t border-border bg-background px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
                [ [0x03] CORE_VALUES ]
              </span>
              <h2 className="text-2xl font-bold lg:text-3xl mb-4">CORE_VALUES</h2>
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
                <div className="flex items-center gap-3 mb-4">
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

      {/* Story Section */}
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
                  [ [0x04] ORIGIN_STORY ]
                </span>
                <h2 className="text-2xl font-bold lg:text-3xl mb-4">THE_STORY_BEHIND_FABRK</h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-muted-foreground">
                  From frustration to solution
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="border border-border bg-card p-6"
            >
              <div className="text-xs text-muted-foreground mb-4">
                │ &gt; Initializing story sequence...
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Like many developers, we were tired of rebuilding the same infrastructure for
                  every new SaaS project. Authentication, payments, database setup, email
                  integration—it's the same story every time.
                </p>

                <p className="text-sm text-muted-foreground">
                  We looked at existing solutions, but they all had the same problems:
                </p>

                <div className="space-y-2 pl-4 border-l border-border">
                  {[
                    "Over-engineered with 1000+ files you'll never use",
                    "Proprietary frameworks that lock you in",
                    "Poor documentation and unclear architecture",
                    "Bloated with features you don't need",
                  ].map((problem, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="text-destructive font-bold">✗</span>
                      <span className="text-muted-foreground">{problem}</span>
                    </motion.div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  So we built Fabrk differently. We started with a 1000+ file codebase, then
                  ruthlessly cut it down to just the essentials. We removed every line of code
                  that didn't serve a clear purpose. We focused on clarity over cleverness.
                </p>

                <p className="text-sm text-muted-foreground">
                  The result? A boilerplate with ~160 files that includes everything you need
                  and nothing you don't. Clean TypeScript, modern Next.js, industry-standard
                  tools, and comprehensive documentation.
                </p>
              </div>
              <div className="mt-4 text-xs text-success">
                └─ Story sequence complete [OK]
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Fabrk */}
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

      {/* CTA Section */}
      <section className="border-t border-border bg-background px-6 py-24">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block border border-border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
              [ [0xFF] EXECUTE ]
            </span>
            <h2 className="text-2xl font-bold lg:text-3xl">READY_TO_BUILD_YOUR_SAAS</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="border border-border bg-card p-4 mx-auto max-w-2xl"
          >
            <p className="text-sm text-muted-foreground">
              Join 500+ developers who are shipping faster with Fabrk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Button size="lg" className="rounded-none text-xs" asChild>
              <Link href="/#pricing">
                &gt; EXECUTE: GET_FABRK - {config.pricing.fabrk.display.current}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-none text-xs" asChild>
              <Link href="/features">&gt; VIEW: ALL_FEATURES</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 text-xs text-muted-foreground"
          >
            <span className="text-success">■ INSTANT_ACCESS</span>
            <span className="text-success">■ LIFETIME_UPDATES</span>
            <span className="text-success">■ 30_DAY_GUARANTEE</span>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
