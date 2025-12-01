/**
 * ✅ FABRK COMPONENT
 * Features CTA - Final call-to-action section
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturesCTA() {
  return (
    <section className="border-t border-border bg-primary/5 py-20 lg:py-24">
      <div className="container mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs text-muted-foreground">[0x30]</span>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            READY_TO_SHIP?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm text-muted-foreground">
            Get Fabrk and launch your SaaS in days, not months. All features included,
            fully tested, and production-ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="rounded-none text-xs">
              <Link href="/#pricing">
                &gt; EXECUTE: GET_STARTED
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-none text-xs">
              <Link href="/templates">
                &gt; VIEW: TEMPLATES
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
