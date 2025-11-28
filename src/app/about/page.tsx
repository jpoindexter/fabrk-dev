/**
 * About Us Page
 * Company story, mission, and values
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  H1,
  H2,
  H3,
  Body,
  BodyMuted,
  Lead,
  Small,
  Strong,
} from "@/components/ui/typography";
import config from "@/config";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";
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
      icon: Rocket,
      title: "Ship Fast",
      description:
        "Time is your most valuable resource. Our boilerplate is designed to get you from idea to launch in record time, without compromising quality.",
    },
    {
      icon: Code,
      title: "Clean Code",
      description:
        "We write code the way you would write it yourself. No over-engineering, no unnecessary abstractions. Just clean, maintainable TypeScript.",
    },
    {
      icon: Zap,
      title: "Performance First",
      description:
        "Every line of code is optimized for speed. We use the latest Next.js features, server components, and best practices to ensure your app is lightning fast.",
    },
    {
      icon: Users,
      title: "Developer Experience",
      description:
        "We're developers too. We know what frustrates you, and we've built Fabrk to eliminate those pain points with great docs and thoughtful defaults.",
    },
    {
      icon: Heart,
      title: "No Lock-In",
      description:
        "You own the code. No proprietary frameworks, no vendor lock-in. Build on top of industry-standard tools and deploy anywhere.",
    },
    {
      icon: CheckCircle2,
      title: "Production Ready",
      description:
        "From security to error handling to performance optimization, every aspect is built with production deployments in mind.",
    },
  ];

  const reasons = [
    {
      title: "Save Weeks of Development",
      description:
        "What normally takes 2-4 weeks to build from scratch is ready in minutes. Focus on your unique features, not boilerplate.",
    },
    {
      title: "Production-Grade Security",
      description:
        "Security headers, rate limiting, token hashing, CSRF protection—all the security best practices implemented and tested.",
    },
    {
      title: "Modern Tech Stack",
      description:
        "Built on Next.js 15, TypeScript, Prisma, NextAuth v5, and Stripe. The tools you're already using or want to learn.",
    },
    {
      title: "Lifetime Updates",
      description:
        "One-time payment, lifetime access to all updates. No subscriptions, no hidden fees.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="default" size="lg" className="rounded-none mb-6 uppercase tracking-wide">
              Our Story
            </Badge>
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <H1 className="mb-6">
              Built by Developers,
              <br />
              <span className="text-primary">For Developers</span>
            </H1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Lead className="mx-auto mb-12 max-w-2xl">
              We're on a mission to eliminate the repetitive work that slows down every
              SaaS project, so you can focus on building features that matter.
            </Lead>
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
              className="inline-flex items-center justify-center bg-primary/10 border-2 border-border p-4 mb-6"
            >
              <Target className="h-12 w-12 text-primary" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <H2>Our Mission</H2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Body>
                Every developer has experienced the frustration of rebuilding the same
                authentication system, payment integration, and UI components for the
                hundredth time. We created Fabrk to solve this problem once and for all.
              </Body>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Body>
                Our mission is simple: <Strong>help you ship your SaaS product in days, not
                months</Strong>. We handle the boring infrastructure so you can focus on the
                innovation that makes your product unique.
              </Body>
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
              <H2 className="mb-4">Our Values</H2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Lead>The principles that guide everything we build</Lead>
            </motion.div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
              >
                <div className="mb-4 inline-flex items-center justify-center bg-primary/10 border-2 border-border p-3">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <H3 className="mb-2">{value.title}</H3>
                <Body>{value.description}</Body>
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
                <H2 className="mb-4">The Story Behind Fabrk</H2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Lead>From frustration to solution</Lead>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Body>
                Like many developers, we were tired of rebuilding the same infrastructure for
                every new SaaS project. Authentication, payments, database setup, email
                integration—it's the same story every time.
              </Body>

              <Body>
                We looked at existing solutions, but they all had the same problems:
              </Body>

              <ul className="space-y-3">
                {[
                  "Over-engineered with 1000+ files you'll never use",
                  "Proprietary frameworks that lock you in",
                  "Poor documentation and unclear architecture",
                  "Bloated with features you don't need",
                ].map((problem, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-destructive font-bold">✗</span>
                    <Body>{problem}</Body>
                  </motion.li>
                ))}
              </ul>

              <Body>
                So we built Fabrk differently. We started with a 1000+ file codebase, then
                ruthlessly cut it down to just the essentials. We removed every line of code
                that didn't serve a clear purpose. We focused on clarity over cleverness.
              </Body>

              <Body>
                The result? A boilerplate with ~160 files that includes everything you need
                and nothing you don't. Clean TypeScript, modern Next.js, industry-standard
                tools, and comprehensive documentation.
              </Body>
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
                <H2 className="mb-4">Why Choose Fabrk?</H2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Lead>We're not just selling code, we're selling time</Lead>
              </motion.div>
            </div>

            <div className="space-y-4">
              {reasons.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                >
                  <H3 className="mb-2">{item.title}</H3>
                  <Body>{item.description}</Body>
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
            <H2>Ready to Build Your SaaS?</H2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Lead className="mx-auto max-w-2xl">
              Join 500+ developers who are shipping faster with Fabrk.
            </Lead>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button size="xl" className="rounded-none text-lg" asChild>
              <Link href="/#pricing">
                Get Fabrk Now - {config.pricing.fabrk.display.current}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="rounded-none text-lg" asChild>
              <Link href="/features">View All Features</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Small className="block font-medium text-muted-foreground">
              ✓ Instant access ✓ Lifetime updates ✓ 30-day money-back guarantee
            </Small>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
