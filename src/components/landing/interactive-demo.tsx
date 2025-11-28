/**
 * ✅ FABRK COMPONENT
 * Interactive Demo - Tabbed preview of dashboards, data tables, and settings
 * Production-ready ✓
 */

"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const DEMO_ROUTES = [
  { id: "team", label: "Team Dashboard", path: "/templates/team-dashboard" },
  { id: "analytics", label: "Analytics", path: "/templates/analytics-dashboard" },
  { id: "users", label: "Data Table", path: "/templates/user-management" },
  { id: "settings", label: "Settings", path: "/templates/settings-page" },
];

export function InteractiveDemo() {
  return (
    <section className="border-t border-border bg-background py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              🎬 Live Demo: Explore Templates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              See production-ready dashboards, data tables, and settings pages. Click tabs to explore.
            </p>
          </div>

          {/* Tabbed Demo */}
          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="rounded-none grid w-full grid-cols-4 gap-2">
              {DEMO_ROUTES.map((route) => (
                <TabsTrigger key={route.id} value={route.id} className="rounded-none text-sm sm:text-base">
                  {route.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Demo Container */}
            <div className="overflow-hidden border-2 border-border bg-card shadow-lg">
              {DEMO_ROUTES.map((route) => (
                <TabsContent key={route.id} value={route.id} className="m-0">
                  <iframe
                    src={route.path}
                    className="w-full border-0"
                    style={{ height: "700px" }}
                    title={route.label}
                  />
                </TabsContent>
              ))}
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-border bg-card p-6"
            >
              <p className="text-sm text-foreground">
                <span className="font-semibold">💡 Fully Interactive:</span> All dashboards and tables are fully functional.
                Sort columns, filter data, toggle settings, and explore the full UX. These are the exact templates
                included in Fabrk.
              </p>
            </motion.div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
