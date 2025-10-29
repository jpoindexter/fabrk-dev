/**
 * ✅ FABRK COMPONENT
 * Dashboard Demo Section - Showcases real dashboard UI in browser chrome
 * Inspired by shadcn/ui dashboard example
 * Production-ready ✓
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/design-system/utils";
import { motion } from "framer-motion";
import { ArrowUpRight, CreditCard, Download, Package, TrendingUp } from "lucide-react";
import Link from "next/link";

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
  },
];

const topProducts = [
  { name: "Premium Plan", sales: 45, revenue: "$13,455", trend: 12 },
  { name: "Pro Plan", sales: 32, revenue: "$9,568", trend: 8 },
  { name: "Starter Plan", sales: 28, revenue: "$2,492", trend: -3 },
  { name: "Enterprise", sales: 12, revenue: "$23,940", trend: 22 },
];

export function DashboardDemo() {
  return (
    <section aria-label="Dashboard demo" className="relative overflow-hidden bg-gradient-to-b from-white via-muted/30 to-white py-24 sm:py-32">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4">
              Live Demo
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A dashboard built with Fabrk
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A real, production-ready dashboard using Fabrk components. Responsive, accessible, and
              beautiful.
            </p>
          </motion.div>
        </div>

        {/* Browser Mockup with Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 max-w-7xl"
        >
          <BrowserMockup url="dashboard.fabrk.dev">
            <div className="min-h-[600px] bg-white p-8">
              {/* Dashboard Header */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">Dashboard</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Overview of your business metrics</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 size-4" />
                    Download
                  </Button>
                  <Button size="sm" className="bg-foreground hover:bg-card">
                    <CreditCard className="mr-2 size-4" />
                    Upgrade
                  </Button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-border bg-white">
                  <KpiCard
                    title="Total Revenue"
                    value="$45,231.89"
                    change={20.1}
                    trend="up"
                    description="+$4,231.89 from last month"
                  />
                </Card>
                <Card className="border-border bg-white">
                  <KpiCard
                    title="Subscriptions"
                    value="+2,350"
                    change={18.2}
                    trend="up"
                    description="+180 from last month"
                  />
                </Card>
                <Card className="border-border bg-white">
                  <KpiCard
                    title="Sales"
                    value="+12,234"
                    change={19.5}
                    trend="up"
                    description="+1,900 from last month"
                  />
                </Card>
                <Card className="border-border bg-white">
                  <KpiCard
                    title="Active Now"
                    value="+573"
                    change={4.2}
                    trend="up"
                    description="+201 since last hour"
                  />
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid gap-8 lg:grid-cols-7">
                {/* Chart Area - Overview */}
                <Card className="col-span-4 border-border bg-white p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Overview</h4>
                      <p className="mt-1 text-xs text-muted-foreground">Revenue over the last 12 months</p>
                    </div>
                    <TrendingUp className="size-4 text-muted-foreground" />
                  </div>

                  {/* Simple Bar Chart Visualization */}
                  <div className="flex h-[280px] items-end justify-between gap-2">
                    {[40, 65, 45, 80, 60, 95, 70, 85, 75, 100, 90, 85].map((height, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-2">
                        <div className="relative w-full">
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.05 }}
                            className="min-h-[8px] w-full rounded-t-sm bg-foreground"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {
                            [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ][i]
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Sales */}
                <Card className="col-span-3 border-border bg-white p-6">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground">Recent Sales</h4>
                    <p className="mt-1 text-xs text-muted-foreground">You made 265 sales this month</p>
                  </div>
                  <div className="space-y-4">
                    {recentSales.map((sale, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{
                          x: 4,
                          backgroundColor: "rgba(249, 250, 251, 1)",
                          transition: { duration: 0.2 },
                        }}
                        className="-mx-2 flex cursor-pointer items-center gap-4 rounded-lg p-2"
                      >
                        <div className="flex size-9 items-center justify-center rounded-full bg-muted">
                          <span className="text-sm font-medium text-foreground">
                            {sale.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none text-foreground">
                            {sale.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{sale.email}</p>
                        </div>
                        <div className="text-sm font-medium text-foreground">{sale.amount}</div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Products Table */}
              <Card className="mt-8 border-border bg-white">
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Top Products</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Your best-selling products this month
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      View All
                      <ArrowUpRight className="ml-2 size-4" />
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Sales</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Trend</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topProducts.map((product, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Package className="size-4 text-muted-foreground" />
                              {product.sales}
                            </div>
                          </TableCell>
                          <TableCell>{product.revenue}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={Math.abs(product.trend) * 4}
                                className="w-16"
                                aria-label={`${product.name} trend indicator: ${product.trend > 0 ? 'positive' : 'negative'} ${Math.abs(product.trend)}%`}
                              />
                              <span
                                className={cn(
                                  "text-sm font-medium",
                                  product.trend > 0 ? "text-primary" : "text-destructive"
                                )}
                              >
                                {product.trend > 0 ? "+" : ""}
                                {product.trend}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </BrowserMockup>

          {/* CTA Below Browser */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              This entire dashboard is built with{" "}
              <Link
                href="/components"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Fabrk components
              </Link>
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/components">
                <Button className="bg-foreground hover:bg-card" size="lg">
                  Browse All Components
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
