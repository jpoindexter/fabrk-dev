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
    <section className="border-border bg-background border-t py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center font-mono">
            <span className="text-muted-foreground text-xs">[0x00]</span>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">LIVE_DEMO_EXPLORE_TEMPLATES</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
              &gt; See production-ready dashboards, data tables, and settings pages. Click tabs to
              explore.
            </p>
          </div>

          {/* Tabbed Demo */}
          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 gap-2 rounded-none">
              {DEMO_ROUTES.map((route) => (
                <TabsTrigger
                  key={route.id}
                  value={route.id}
                  className="rounded-none text-sm sm:text-base"
                >
                  {route.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Demo Container */}
            <div className="border-border bg-card overflow-hidden border">
              {DEMO_ROUTES.map((route) => (
                <TabsContent key={route.id} value={route.id} className="m-0">
                  <iframe
                    src={route.path}
                    className="h-[700px] w-full border-0"
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
              className="border-border bg-card border p-6 font-mono"
            >
              <div className="text-muted-foreground mb-2 text-xs">[ INFO ]</div>
              <p className="text-foreground text-xs">
                <span className="text-primary font-semibold">[FULLY_INTERACTIVE]</span> All
                dashboards and tables are fully functional. Sort columns, filter data, toggle
                settings, and explore the full UX. These are the exact templates included in Fabrk.
              </p>
            </motion.div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
