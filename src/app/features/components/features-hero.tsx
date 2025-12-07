/**
 * ✅ FABRK COMPONENT
 * Features Hero - Hero section for features page
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export function FeaturesHero() {
  return (
    <section className="border-border bg-background border-b py-20 lg:py-24">
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge code="0x00" label="FEATURES" meta="COMPLETE_SAAS_TOOLKIT" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className={cn("text-muted-foreground mb-2 text-sm", mode.font)}>FABRK_FEATURES:</h1>
            <h2 className={cn("mb-6 text-4xl font-semibold tracking-tight", mode.font)}>
              EVERY_FEATURE_YOU_NEED
              <br className="hidden sm:block" /> <span className="text-primary">ALREADY_BUILT</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-left"
          >
            <Card size="auto">
              <CardHeader code="0x01" title="STATUS" />
              <CardContent padding="md">
                <p className="text-muted-foreground mb-4 text-sm">
                  Stop rebuilding the same features for every project. Fabrk includes
                  authentication, payments, database, real-time, multi-tenancy, admin dashboard, and
                  more - all production-tested and ready to deploy.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span>
                    <span className="text-muted-foreground">Features:</span>{" "}
                    <span className="text-primary">8_CATEGORIES</span>
                  </span>
                  <span>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className="text-primary">PRODUCTION_READY</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button asChild size="lg" className="text-xs">
              <Link href="/#pricing">
                &gt; GET_FABRK
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-xs">
              <Link href="/docs">&gt; VIEW_DOCUMENTATION</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
