/**
 * ✅ FABRK COMPONENT
 * Interactive Demo - Tabbed preview of dashboards, data tables, and settings
 * Production-ready ✓
 */

"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import templates to optimize bundle size
// Templates will load only when their tab is clicked
const TeamDashboardTemplate = dynamic(() => import("@/app/templates/team-dashboard/page"), {
  loading: () => <div className="p-12 text-center text-muted-foreground">Loading dashboard...</div>,
});

const AnalyticsDashboardTemplate = dynamic(() => import("@/app/templates/analytics-dashboard/page"), {
  loading: () => <div className="p-12 text-center text-muted-foreground">Loading analytics...</div>,
});

const UserManagementTemplate = dynamic(() => import("@/app/templates/user-management/page"), {
  loading: () => <div className="p-12 text-center text-muted-foreground">Loading data table...</div>,
});

const SettingsPageTemplate = dynamic(() => import("@/app/templates/settings-page/page"), {
  loading: () => <div className="p-12 text-center text-muted-foreground">Loading settings...</div>,
});

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
              Live Demo: Explore Templates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              See production-ready dashboards, data tables, and settings pages. Click tabs to explore.
            </p>
          </div>

          {/* Tabbed Demo */}
          <Tabs defaultValue="team" className="space-y-6" suppressHydrationWarning>
            <TabsList className="grid w-full grid-cols-4 gap-2">
              <TabsTrigger value="team" className="text-sm sm:text-base">
                Team Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm sm:text-base">
                Analytics
              </TabsTrigger>
              <TabsTrigger value="users" className="text-sm sm:text-base">
                Data Table
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-sm sm:text-base">
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Demo Container */}
            <div className="overflow-hidden rounded-lg border-2 border-border bg-card shadow-lg">
              {/* Team Dashboard Tab */}
              <TabsContent value="team" className="m-0">
                <div className="max-h-[700px] overflow-y-auto">
                  <TeamDashboardTemplate />
                </div>
              </TabsContent>

              {/* Analytics Dashboard Tab */}
              <TabsContent value="analytics" className="m-0">
                <div className="max-h-[700px] overflow-y-auto">
                  <AnalyticsDashboardTemplate />
                </div>
              </TabsContent>

              {/* User Management (Data Table) Tab */}
              <TabsContent value="users" className="m-0">
                <div className="max-h-[700px] overflow-y-auto">
                  <UserManagementTemplate />
                </div>
              </TabsContent>

              {/* Settings Page Tab */}
              <TabsContent value="settings" className="m-0">
                <div className="max-h-[700px] overflow-y-auto">
                  <SettingsPageTemplate />
                </div>
              </TabsContent>
            </div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-lg border border-primary/20 bg-primary/5 p-6"
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
