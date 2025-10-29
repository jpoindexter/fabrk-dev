/**
 * ✅ FABRK COMPONENT
 * CTA Section - Shadcn/ui style final call-to-action
 * Production-ready ✓
 */

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaShadcn() {
  return (
    <section aria-label="Call to action" className="relative overflow-hidden bg-gradient-to-b from-white to-muted/30 py-24 sm:py-32">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Ready to build faster?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of developers building better products with Fabrk. Start shipping today.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pricing">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-foreground px-8 transition-colors hover:bg-card">
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/components">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="px-8">
                  Browse Components
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
