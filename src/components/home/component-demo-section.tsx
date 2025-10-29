/**
 * ✅ FABRK COMPONENT
 * Component Demo Section - Show real components in action
 * Production-ready ✓
 */

"use client";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export function ComponentDemoSection() {
  return (
    <section className="border-t border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center" {...fadeInUp}>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            169 production-ready components
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every component is tested, accessible, and ready to use. Here&apos;s a quick preview.
          </p>
        </motion.div>

        {/* Live Component Demos */}
        <motion.div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" {...fadeInUp}>
          {/* Buttons */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Buttons</h3>
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

          {/* Inputs */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Input</h3>
            <div className="mt-4">
              <Input placeholder="Email address" type="email" />
            </div>
          </div>

          {/* Badges */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Badges</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Card</h3>
            <Card className="mt-4">
              <div className="p-4">
                <h4 className="font-medium">Card Title</h4>
                <p className="mt-1 text-sm text-muted-foreground">Card description goes here.</p>
              </div>
            </Card>
          </div>

          {/* Avatars */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Avatar</h3>
            <div className="mt-4 flex gap-2">
              <Avatar className="size-8">
                <div className="flex size-full items-center justify-center bg-muted text-xs">
                  JP
                </div>
              </Avatar>
              <Avatar className="size-8">
                <div className="flex size-full items-center justify-center bg-secondary text-xs">
                  AB
                </div>
              </Avatar>
              <Avatar className="size-8">
                <div className="flex size-full items-center justify-center bg-card text-xs text-card-foreground">
                  CD
                </div>
              </Avatar>
            </div>
          </div>

          {/* Switch & Slider */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Controls</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2">
                <Switch id="demo" />
                <label htmlFor="demo" className="text-sm text-muted-foreground">
                  Toggle
                </label>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Alerts</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/10 p-2 text-xs">
                <CheckCircle2 className="size-4 text-primary" />
                <span className="text-primary">Success</span>
              </div>
              <div className="flex items-start gap-2 rounded-md border border-destructive/20 bg-destructive/10 p-2 text-xs">
                <AlertCircle className="size-4 text-destructive" />
                <span className="text-destructive">Error</span>
              </div>
              <div className="flex items-start gap-2 rounded-md border border-primary/20 bg-primary/10 p-2 text-xs">
                <Info className="size-4 text-primary" />
                <span className="text-primary">Info</span>
              </div>
            </div>
          </div>

          {/* Forms Preview */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Forms</h3>
            <div className="mt-4 space-y-3">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Button size="sm" className="w-full">
                Submit
              </Button>
            </div>
          </div>

          {/* Data Display */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Data Display</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Revenue</span>
                <span className="font-medium">$45,231</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Growth</span>
                <span className="font-medium text-primary">+12.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Users</span>
                <span className="font-medium">1,234</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div className="mx-auto mt-16 max-w-3xl" {...fadeInUp}>
          <div className="overflow-hidden rounded-lg border border-border bg-white">
            <div className="border-b border-border bg-muted px-4 py-2">
              <span className="text-xs font-medium text-muted-foreground">button.tsx</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <pre className="text-foreground">
                <code>{`import { Button } from "@/components/ui/button"

export default function MyApp() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-16 text-center" {...fadeInUp}>
          <Button size="lg" asChild>
            <Link href="/components">Browse All 169 Components</Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Forms, tables, charts, navigation, layouts, and more.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
