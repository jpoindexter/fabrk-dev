/**
 * ✅ FABRK COMPONENT
 * Examples Showcase - Full-width live component demos
 * Production-ready ✓
 * Auto-animating examples with Framer Motion
 */

"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BarChart3, Lock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { AuthLiveDemo } from "./example-demos/auth-live";
import { DashboardLiveDemo } from "./example-demos/dashboard-live";

export function ExamplesShowcase() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tabs = [
    {
      id: "dashboard",
      label: "Analytics Dashboard",
      icon: BarChart3,
      description: "Real-time data visualization with auto-updating charts and metrics",
      demo: <DashboardLiveDemo />,
    },
    {
      id: "auth",
      label: "Authentication",
      icon: Lock,
      description: "Live form validation with credential strength indicators and error states",
      demo: <AuthLiveDemo />,
    },
  ];

  return (
    <section
      ref={ref}
      id="examples"
      aria-label="Component examples"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-muted/30 via-white to-muted/30 py-32"
    >
      {/* Animated background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1), transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(120, 119, 198, 0.1), transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1), transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm shadow-sm">
              <Sparkles className="size-4 text-primary" />
              <span>Animated with Framer Motion & GSAP</span>
            </div>
            <h2 className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
              See Components in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Live, interactive demos that showcase real functionality. Watch them animate,
              interact, and respond.
            </p>
          </motion.div>
        </div>

        {/* Full-Width Demo Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Compact Tab Selector */}
            <div className="mb-8 flex justify-center">
              <TabsList className="inline-flex gap-2 bg-background/50 p-1 backdrop-blur">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center gap-2 rounded-lg px-6 py-3 data-[state=active]:bg-foreground data-[state=active]:text-background"
                    >
                      <Icon className="size-4" />
                      <span className="font-medium">{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Full-Width Demo Content */}
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Description */}
                  <div className="mx-auto max-w-3xl text-center">
                    <h3 className="mb-2 text-2xl font-semibold">{tab.label}</h3>
                    <p className="text-muted-foreground">{tab.description}</p>
                  </div>

                  {/* Full-Width Live Demo */}
                  <motion.div
                    className="rounded-2xl border-2 bg-gradient-to-br from-background to-muted/20 p-8 shadow-2xl backdrop-blur lg:p-12"
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {tab.demo}
                  </motion.div>

                  {/* CTA */}
                  <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <Button asChild size="lg" variant="outline">
                      <Link href="/demo" target="_blank" rel="noopener noreferrer">
                        View Full Demo
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" className="group">
                      <Link href="/components">
                        Browse All Components
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}

export default ExamplesShowcase;
