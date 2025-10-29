/**
 * ✅ FABRK COMPONENT
 * Streamline Section - Design process optimization
 * Production-ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function StreamlineSection() {
  return (
    <section aria-label="Streamline development" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Streamline and optimize your
              <br />
              design process.
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Save hundreds of hours with pre-built, production-ready components.
            </p>
            <Link href="/components">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline">
                  Explore Components
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* 3 Screenshots Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-3">
          {/* Color System */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="border-b border-border bg-muted p-4">
              <div className="mb-2 text-sm font-medium text-foreground">Color System</div>
              <div className="text-xs text-muted-foreground">Design tokens for consistent theming</div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Primary</div>
                    <div className="text-xs text-muted-foreground">#0A0A0A</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-muted" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Muted</div>
                    <div className="text-xs text-muted-foreground">#F5F5F5</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-accent" />
                  <div>
                    <div className="text-sm font-medium text-foreground">Accent</div>
                    <div className="text-xs text-muted-foreground">#9333EA</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="border-b border-border bg-muted p-4">
              <div className="mb-2 text-sm font-medium text-foreground">Typography</div>
              <div className="text-xs text-muted-foreground">Type scale and font system</div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-semibold text-foreground">Heading 1</div>
                  <div className="text-xs text-muted-foreground">text-2xl / font-semibold</div>
                </div>
                <div>
                  <div className="text-xl font-semibold text-foreground">Heading 2</div>
                  <div className="text-xs text-muted-foreground">text-xl / font-semibold</div>
                </div>
                <div>
                  <div className="text-base text-foreground">Body Text</div>
                  <div className="text-xs text-muted-foreground">text-base / font-normal</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spacing */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="overflow-hidden rounded-lg border border-border bg-white shadow-sm transition-shadow hover:shadow-xl"
          >
            <div className="border-b border-border bg-muted p-4">
              <div className="mb-2 text-sm font-medium text-foreground">Spacing</div>
              <div className="text-xs text-muted-foreground">8px grid system</div>
            </div>
            <div className="p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-8 rounded bg-foreground" />
                  <div className="text-xs text-muted-foreground">2 (8px)</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-16 rounded bg-foreground" />
                  <div className="text-xs text-muted-foreground">4 (16px)</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-24 rounded bg-foreground" />
                  <div className="text-xs text-muted-foreground">6 (24px)</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-32 rounded bg-foreground" />
                  <div className="text-xs text-muted-foreground">8 (32px)</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
