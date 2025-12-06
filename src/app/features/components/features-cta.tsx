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
    <section className="border-border bg-background border-t py-20 lg:py-24">
      <div className="container mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4">
            <span className="border-border bg-card text-muted-foreground inline-block border px-4 py-1 text-xs">
              [ [0x30] READY_TO_SHIP ]
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight">READY_TO_SHIP?</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-sm">
            Get Fabrk and launch your SaaS in days, not months. All features included, fully tested,
            and production-ready.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-xs">
              <Link href="/#pricing">
                &gt; GET_STARTED
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-xs">
              <Link href="/templates">&gt; VIEW_TEMPLATES</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
