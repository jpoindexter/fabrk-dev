/**
 * ✅ FABRK COMPONENT
 * Hero Section - Shadcn/ui style
 * Production-ready ✓
 */

"use client";

import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Check, Package, Star, Users } from "lucide-react";
import Link from "next/link";

export function HeroShadcn() {
  return (
    <section
      aria-label="Hero introduction"
      className="relative overflow-hidden bg-white pb-16 pt-20 sm:pb-24 sm:pt-32"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header Content */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm shadow-sm"
          >
            <span className="flex size-2 rounded-full bg-success" />
            <span className="text-foreground">New components added every week</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Build Production-Ready SaaS
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              in Hours, Not Months
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mb-6 max-w-2xl text-balance text-lg text-foreground sm:text-xl"
          >
            280+ Premium React Components. Complete Design System. TypeScript. Tests. You Own
            Everything.
          </motion.p>

          {/* Social Proof Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground"
          >
            <div className="flex items-center gap-2">
              <Star className="size-4 fill-warning text-accent-foreground" />
              <span className="font-medium">2.5k+ GitHub Stars</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <span className="font-medium">1,000+ Developers</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Package className="size-4" />
              <span className="font-medium">280 Components</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mb-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/components"
              aria-label="Browse all 280 components in the component library"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-primary px-8 transition-colors hover:bg-primary/90"
                  aria-label="Browse 280 components - keyboard shortcut: C"
                >
                  Browse 280 Components
                  <ArrowRight className="ml-2 size-4" aria-hidden="true" />
                </Button>
              </motion.div>
            </Link>
            <Link href="#examples" aria-label="Jump to live interactive examples section below">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8"
                  aria-label="View live examples - keyboard shortcut: E"
                >
                  View Live Examples
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground"
          >
            <div className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              <span>AI-Optimized</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              <span>TypeScript Strict</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              <span>WCAG AA</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <Check className="size-4 text-primary" />
              <span>Lifetime License</span>
            </div>
          </motion.div>
        </div>

        {/* Browser Mockup with Design System */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-16 max-w-6xl"
        >
          <BrowserMockup url="components.fabrk.dev">
            <div className="bg-gradient-to-b from-muted/30 to-white p-8">
              <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                {/* Sidebar */}
                <div className="space-y-1">
                  <div className="mb-4">
                    <div className="mb-2 px-3 text-xs font-medium text-foreground/70">
                      Getting Started
                    </div>
                    <div className="space-y-1">
                      <div className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                        Introduction
                      </div>
                      <div className="px-3 py-2 text-sm text-foreground/80">Installation</div>
                      <div className="px-3 py-2 text-sm text-foreground/80">Theming</div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 px-3 text-xs font-medium text-foreground/70">
                      Components
                    </div>
                    <div className="space-y-1">
                      <div className="px-3 py-2 text-sm text-foreground/80">Accordion</div>
                      <div className="px-3 py-2 text-sm text-foreground/80">Alert</div>
                      <div className="px-3 py-2 text-sm text-foreground/80">Avatar</div>
                      <div className="px-3 py-2 text-sm text-foreground/80">Badge</div>
                      <div className="px-3 py-2 text-sm text-foreground/80">Button</div>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="min-h-[500px] rounded-lg border border-border bg-card p-8 shadow-sm">
                  <div className="mb-8">
                    <h2 className="mb-2 text-3xl font-semibold text-foreground">Introduction</h2>
                    <p className="text-muted-foreground">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-3 text-lg font-medium text-foreground">About</h3>
                      <p className="text-muted-foreground">
                        This is NOT a component library. It&apos;s a collection of re-usable
                        components that you can copy and paste into your apps.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-lg font-medium text-foreground">
                        What do you mean?
                      </h3>
                      <p className="text-muted-foreground">
                        Pick the components you need. Copy the code. Paste into your project.
                        Customize to your needs.
                      </p>
                    </div>

                    <div className="rounded-lg border border-border bg-muted p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                        <span className="flex size-5 items-center justify-center rounded bg-primary text-xs text-primary-foreground">
                          !
                        </span>
                        Note
                      </div>
                      <p className="text-sm text-foreground">
                        This is not a traditional component library. You are responsible for
                        maintaining the code.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </motion.div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
          {[
            { value: "280+", label: "Production Components" },
            { value: "102", label: "Storybook Stories" },
            { value: "100", label: "Lighthouse Score" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="border-border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-lg">
                <div className="mb-2 text-3xl font-semibold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
