"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

interface DiscountUsage {
  used: number;
  total: number | null;
  remaining: number | null;
}

export function DiscountCounter() {
  const [usage, setUsage] = useState<DiscountUsage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsage() {
      try {
        const response = await fetch("/api/polar/discount-usage");
        if (response.ok) {
          const data = await response.json();
          setUsage(data);
        }
      } catch (error) {
        console.error("Failed to fetch discount usage:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsage();
    // Refresh every 30 seconds
    const interval = setInterval(fetchUsage, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !usage || !usage.total) {
    return null;
  }

  const percentageUsed = (usage.used / usage.total) * 100;
  const isAlmostGone = percentageUsed >= 80;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("bg-muted/50 flex items-center justify-between gap-3 px-3 py-2", mode.radius)}
    >
      <span className={cn("text-muted-foreground text-xs", mode.font)}>
        {isAlmostGone ? "🔥" : "🎉"} {usage.remaining}/{usage.total} discounts left
      </span>

      {/* Progress bar */}
      <div className={cn("bg-muted h-1.5 w-16 overflow-hidden", mode.radius)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentageUsed}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${isAlmostGone ? "bg-destructive" : "bg-primary"}`}
        />
      </div>
    </motion.div>
  );
}
