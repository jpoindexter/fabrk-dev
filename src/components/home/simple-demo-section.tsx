/**
 * ✅ FABRK COMPONENT
 * Simple Demo Section - Visual proof with live components
 * Production-ready ✓
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function SimpleDemoSection() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <section className="border-t border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center" {...fadeInUp}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            See what you&apos;re getting
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every component is interactive, accessible, and production-ready.
          </p>
        </motion.div>

        {/* Live Component Grid */}
        <motion.div
          className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
          {...fadeInUp}
        >
          {/* Buttons */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Buttons</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
            </div>
          </div>

          {/* Forms */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Forms</h3>
            <div className="mt-4 space-y-2">
              <Input placeholder="Email" type="email" className="h-9" />
              <Button size="sm" className="w-full">
                Submit
              </Button>
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Badges</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>New</Badge>
              <Badge variant="secondary">Beta</Badge>
              <Badge variant="outline">Pro</Badge>
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Alerts</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 rounded border border-primary/20 bg-primary/10 p-2 text-xs">
                <CheckCircle2 className="size-4 text-primary" />
                <span className="text-primary">Success</span>
              </div>
              <div className="flex items-center gap-2 rounded border border-destructive/20 bg-destructive/10 p-2 text-xs">
                <AlertCircle className="size-4 text-destructive" />
                <span className="text-destructive">Error</span>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Slider</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium text-foreground">{sliderValue[0]}%</span>
              </div>
              <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
            </div>
          </div>

          {/* Toggle */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Toggle</h3>
            <div className="mt-4 flex items-center gap-2">
              <Switch id="demo-switch" />
              <label htmlFor="demo-switch" className="text-sm text-muted-foreground">
                Enable notifications
              </label>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-12 text-center" {...fadeInUp}>
          <Button size="lg" asChild>
            <Link href="/components">Browse All 169 Components</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
