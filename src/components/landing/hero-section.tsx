/**
 * ✅ FABRK COMPONENT
 * Hero Section - Terminal console [SYSTEM_INIT] style
 * Production-ready ✓
 */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PolarCheckoutButton } from "@/components/polar/checkout-button";
import { DiscountCounter } from "@/components/polar/discount-counter";
import { motion } from "framer-motion";
import { SimpleIcon } from "@/components/ui/simple-icon";
import {
  siNextdotjs,
  siReact,
  siTailwindcss,
  siPrisma,
  siTypescript,
  siStripe,
  siResend,
} from "simple-icons";

const techStack = [
  { name: "NEXT.JS", path: siNextdotjs.path },
  { name: "REACT", path: siReact.path },
  { name: "TYPESCRIPT", path: siTypescript.path },
  { name: "TAILWIND", path: siTailwindcss.path },
  { name: "PRISMA", path: siPrisma.path },
  { name: "STRIPE", path: siStripe.path },
  { name: "RESEND", path: siResend.path },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Terminal Content */}
          <div className="flex flex-col justify-center">
            {/* System Init Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block border border-border bg-card px-3 py-1 font-mono text-xs text-muted-foreground">
                ┌─ [0x00] SYSTEM_INIT SAAS_BOILERPLATE_v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="mb-2 font-mono text-sm text-muted-foreground">
                FABRK_INIT:
              </h1>
              <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
                Building your SaaS
                <br />
                <span className="text-primary">just got unfairly easy.</span>
              </h2>
            </motion.div>

            {/* Status Block */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 border border-border bg-card p-4"
            >
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                ┌─ [0x01] STATUS ────────────────────────┐
              </div>
              <p className="mb-4 text-muted-foreground">
                Why spend valuable time tackling auth, billing, emails, organizations,
                invites and onboarding? Focus on your business and skip the noise.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-sm">
                <span>
                  <span className="text-muted-foreground">Speed:</span>{" "}
                  <span className="text-primary">OPTIMIZED</span>
                </span>
                <span>
                  <span className="text-muted-foreground">Integration:</span>{" "}
                  <span className="text-primary">SEAMLESS</span>
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 flex flex-col gap-3 sm:flex-row"
            >
              <PolarCheckoutButton className="rounded-none font-mono text-sm">
                &gt; EXECUTE: GET_FABRK
              </PolarCheckoutButton>
              <Button variant="outline" asChild className="rounded-none font-mono text-sm">
                <Link href="/demo">
                  &gt; VIEW: LIVE_DEMO
                </Link>
              </Button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-3 font-mono text-xs text-muted-foreground">
                ┌─ [0x02] POWERED_BY ─ FIB[1,1,2,3,5,8,13]
              </div>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-1.5 border border-border bg-card px-2 py-1"
                  >
                    <SimpleIcon path={tech.path} className="size-3.5" />
                    <span className="font-mono text-xs">{tech.name}</span>
                    <span className="font-mono text-xs text-success">[OK]</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Dashboard Preview / Discount */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            {/* Terminal Window Frame */}
            <div className="border border-border bg-card">
              {/* Window Title Bar */}
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-destructive/50" />
                  <div className="size-3 rounded-full bg-warning/50" />
                  <div className="size-3 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  [0x03] fabrk_dashboard.exe │ PID:2584
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-6">
                <div className="mb-6 font-mono text-xs text-muted-foreground">
                  <div>│ &gt; Initializing Fabrk dashboard...</div>
                  <div className="mt-1">│ &gt; Loading components... <span className="text-success">[OK]</span> FIB[21]ms</div>
                  <div className="mt-1">│ &gt; Connecting services... <span className="text-success">[OK]</span> FIB[34]ms</div>
                  <div className="mt-1">└─ System ready. Total: FIB[55]ms</div>
                </div>

                {/* Dashboard Mock */}
                <div className="grid gap-3">
                  <div className="flex items-center justify-between border border-border bg-background p-3">
                    <span className="font-mono text-xs">│ [0x04] AUTH_MODULE</span>
                    <span className="font-mono text-xs text-success">■ ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between border border-border bg-background p-3">
                    <span className="font-mono text-xs">│ [0x05] BILLING_MODULE</span>
                    <span className="font-mono text-xs text-success">■ ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between border border-border bg-background p-3">
                    <span className="font-mono text-xs">│ [0x06] ORG_MODULE</span>
                    <span className="font-mono text-xs text-success">■ ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between border border-border bg-background p-3">
                    <span className="font-mono text-xs">└ [0x07] EMAIL_MODULE</span>
                    <span className="font-mono text-xs text-success">■ ACTIVE</span>
                  </div>
                </div>

                {/* Blinking Cursor */}
                <div className="mt-4 font-mono text-xs">
                  <span className="text-muted-foreground">&gt; Ready for deployment</span>
                  <span className="ml-1 inline-block animate-pulse text-primary">█</span>
                </div>
              </div>
            </div>

            {/* Discount Counter Below */}
            <div className="mt-6 flex justify-center">
              <DiscountCounter />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
