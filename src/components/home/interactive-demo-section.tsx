/**
 * ✅ FABRK COMPONENT
 * Interactive Demo Section - Animated, interactive component previews
 * Production-ready ✓
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Code2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export function InteractiveDemoSection() {
  const [isDark, setIsDark] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [progress, setProgress] = useState(13);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  // Simulate progress animation
  const handleLoadingDemo = () => {
    setIsLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <section className="border-t border-border bg-muted py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div className="text-center" {...fadeInUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-sm font-medium text-foreground">
            <Sparkles className="size-4" />
            <span>Interactive</span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            See it in action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every component is interactive, accessible, and production-ready. Try them below.
          </p>
        </motion.div>

        {/* Interactive Demos Grid */}
        <motion.div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3" {...fadeInUp}>
          {/* Dark Mode Toggle */}
          <div
            className={`rounded-lg border transition-colors duration-500 ${isDark ? "border-border bg-background" : "border-border bg-white"} p-6`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-medium ${isDark ? "text-white" : "text-foreground"}`}>
                Dark Mode
              </h3>
              <Switch checked={isDark} onCheckedChange={setIsDark} />
            </div>
            <motion.div
              className="mt-4 space-y-2"
              animate={{ opacity: isDark ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className={`text-sm ${isDark ? "text-muted-foreground" : "text-muted-foreground"}`}
              >
                All components support dark mode out of the box.
              </p>
              <Button size="sm" className={isDark ? "bg-white text-foreground hover:bg-muted" : ""}>
                Button
              </Button>
            </motion.div>
          </div>

          {/* Interactive Slider */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Dynamic Value</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Volume</span>
                <motion.span
                  className="text-lg font-semibold text-foreground"
                  key={sliderValue[0]}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  role="status"
                  aria-live="polite"
                >
                  {sliderValue[0]}%
                </motion.span>
              </div>
              <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
            </div>
          </div>

          {/* Loading States */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Loading States</h3>
            <div className="mt-4 space-y-3">
              <Progress
                value={progress}
                className="h-2"
                aria-label={`Loading progress: ${progress}%`}
              />
              <Button size="sm" onClick={handleLoadingDemo} disabled={isLoading} className="w-full">
                {isLoading ? "Loading..." : "Start Demo"}
              </Button>
              <p
                className="text-xs text-muted-foreground"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {progress === 100 ? "✓ Complete!" : `${progress}% loaded`}
              </p>
            </div>
          </div>

          {/* Animated Notifications */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Notifications</h3>
            <div className="mt-4 space-y-3">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNotificationCount((prev) => prev + 1)}
                  className="relative w-full"
                >
                  Messages
                  <AnimatePresence>
                    {notificationCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-destructive/100 text-xs text-white"
                        role="status"
                        aria-live="polite"
                        aria-label={`${notificationCount} unread notifications`}
                      >
                        {notificationCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setNotificationCount(0)}
                className="w-full text-xs"
              >
                Clear all
              </Button>
            </div>
          </div>

          {/* Form Validation */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Validation</h3>
            <div className="mt-4 space-y-2">
              <Input
                placeholder="Email"
                type="email"
                defaultValue="valid@email.com"
                className="border-primary"
              />
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1 text-xs text-primary"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="size-3" aria-hidden="true" />
                <span>Valid email</span>
              </motion.div>
            </div>
          </div>

          {/* Animated Cards */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Hover Effects</h3>
            <motion.div
              className="mt-4"
              whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="cursor-pointer">
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="size-10 rounded-full bg-muted" />
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Designer</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Animated Badges */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Status Badges</h3>
            <div className="mt-4 space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Badge className="bg-primary/10 text-primary">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mr-1 inline-block size-2 rounded-full bg-primary/100"
                  />
                  Active
                </Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge variant="secondary">Pending</Badge>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge variant="outline">Inactive</Badge>
              </motion.div>
            </div>
          </div>

          {/* Button States */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Button States</h3>
            <div className="mt-4 space-y-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" className="w-full">
                  Primary
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" variant="outline" className="w-full">
                  Outline
                </Button>
              </motion.div>
              <Button size="sm" disabled className="w-full">
                Disabled
              </Button>
            </div>
          </div>

          {/* Alert States */}
          <div className="rounded-lg border border-border bg-white p-6">
            <h3 className="text-sm font-medium text-foreground">Alerts</h3>
            <div className="mt-4 space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 p-2 text-xs"
              >
                <CheckCircle2 className="size-4 text-primary" />
                <span className="text-primary">Success</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/10 p-2 text-xs"
              >
                <AlertCircle className="size-4 text-destructive" />
                <span className="text-destructive">Error</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Live Code Example */}
        <motion.div className="mx-auto mt-16 max-w-4xl" {...fadeInUp}>
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Code */}
            <div className="overflow-hidden rounded-lg border border-border bg-white">
              <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
                <div className="flex items-center gap-2">
                  <Code2 className="size-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">button.tsx</span>
                </div>
              </div>
              <div className="p-6 font-mono text-xs">
                <pre className="text-foreground">
                  <code>{`<Button
  variant="primary"
  size="md"
  onClick={handleClick}
>
  Click me
</Button>`}</code>
                </pre>
              </div>
            </div>

            {/* Preview */}
            <div className="overflow-hidden rounded-lg border border-border bg-white">
              <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
                <span className="text-xs font-medium text-muted-foreground">Preview</span>
              </div>
              <div className="flex min-h-[140px] items-center justify-center p-6">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="gap-2">
                    Click me
                    <ArrowRight className="size-4" />
                  </Button>
                </motion.div>
              </div>
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
