/**
 * Live Dashboard Demo - Production-quality analytics dashboard
 * Modeled after Vercel, Stripe, and Linear dashboards
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Activity,
  ChevronRight,
  CreditCard,
  Download,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { recentActivity, revenueData } from "./dashboard-live-data";

export function DashboardLiveDemo() {
  const [currentRevenue, setCurrentRevenue] = useState(67400);
  const [currentUsers, setCurrentUsers] = useState(3247);
  const [mrr, setMrr] = useState(124500);
  const [activeIndex, setActiveIndex] = useState(5);

  // Subtle animation for numbers
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRevenue((prev) => prev + Math.floor(Math.random() * 200 - 100));
      setCurrentUsers((prev) => prev + Math.floor(Math.random() * 5));
      setMrr((prev) => prev + Math.floor(Math.random() * 1000 - 500));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate chart hover effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % revenueData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back, here&apos;s what&apos;s happening
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <CreditCard className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tabular-nums">
                ${currentRevenue.toLocaleString()}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <TrendingUp className="size-3 text-primary" />
                <span className="font-medium text-primary">+14.8%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Active Users</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tabular-nums">{currentUsers.toLocaleString()}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <TrendingUp className="size-3 text-primary" />
                <span className="font-medium text-primary">+23.1%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-success/10 p-2">
                  <Activity className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">MRR</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tabular-nums">${mrr.toLocaleString()}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <TrendingUp className="size-3 text-primary" />
                <span className="font-medium text-primary">+18.2%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-destructive/10 p-2">
                  <TrendingDown className="size-4 text-destructive" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Churn Rate</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tabular-nums">2.4%</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <TrendingDown className="size-3 text-primary" />
                <span className="font-medium text-primary">-0.8%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Chart */}
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground">Last 6 months performance</p>
            </div>
            <Badge variant="secondary">Live</Badge>
          </div>

          <div className="space-y-8">
            <div className="flex h-64 items-end justify-between gap-4">
              {revenueData.map((data, i) => (
                <motion.div
                  key={data.month}
                  className="relative flex flex-1 flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex w-full flex-1 flex-col justify-end">
                    <div
                      className={`w-full rounded-t-md transition-all duration-500 ${
                        i === activeIndex
                          ? "bg-primary shadow-lg shadow-primary/20"
                          : "bg-primary/20"
                      }`}
                      // eslint-disable-next-line design-system/no-inline-styles
                      style={{
                        height: `${(data.value / 70000) * 100}%`,
                      }}
                    />
                  </div>
                  {i === activeIndex && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg"
                    >
                      ${(data.value / 1000).toFixed(1)}k
                      <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground" />
                    </motion.div>
                  )}
                  <span className="text-xs font-medium text-muted-foreground">{data.month}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-semibold">Recent Activity</h3>
            <Button variant="ghost" size="sm">
              View all
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent/50"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-medium text-white">
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{activity.amount}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
