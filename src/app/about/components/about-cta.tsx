/**
 * About CTA Section
 * Final call-to-action with pricing and features links
 */

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import config from "@/config";

export function AboutCTA() {
  return (
    <section className="border-border bg-background border-t px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="border-border bg-card text-muted-foreground mb-4 inline-block border px-4 py-1 text-xs">
            [ [0xFF] EXECUTE ]
          </span>
          <h2 className="text-2xl font-semibold lg:text-4xl">READY_TO_BUILD_YOUR_SAAS</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="border-border bg-card mx-auto max-w-2xl border p-4"
        >
          <p className="text-muted-foreground text-sm">
            Join 500+ developers who are shipping faster with Fabrk.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          <Button size="lg" className="text-xs" asChild>
            <Link href="/#pricing">
              &gt; EXECUTE: GET_FABRK - {config.pricing.fabrk.display.current}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="text-xs" asChild>
            <Link href="/features">&gt; VIEW: ALL_FEATURES</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-muted-foreground flex justify-center gap-4 text-xs"
        >
          <span className="text-success">■ INSTANT_ACCESS</span>
          <span className="text-success">■ LIFETIME_UPDATES</span>
          <span className="text-success">■ 30_DAY_GUARANTEE</span>
        </motion.div>
      </div>
    </section>
  );
}
