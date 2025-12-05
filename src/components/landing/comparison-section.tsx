/**
 * ✅ FABRK COMPONENT
 * Comparison Section - Terminal console table style
 * Production-ready ✓
 */
"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.5,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.floor(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function ComparisonSection() {
  const features = [
    {
      name: "Authentication (Email + OAuth)",
      hours: 20,
      fabrk: "Ready in minutes",
    },
    {
      name: "Stripe Payments Integration",
      hours: 15,
      fabrk: "Pre-configured",
    },
    {
      name: "Database Schema + ORM",
      hours: 10,
      fabrk: "Integrated",
    },
    {
      name: "Multi-Tenancy",
      hours: 25,
      fabrk: "Built-in",
    },
    {
      name: "Design System",
      hours: 30,
      fabrk: "Included",
    },
    {
      name: "Advanced Features",
      hours: 40,
      fabrk: "Ready components",
    },
  ];

  return (
    <section className="border-border border-t px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div
            className={cn(mode.radius, "border-border bg-card mb-4 inline-block border px-4 py-1")}
          >
            <span className={cn(mode.font, "text-muted-foreground text-xs")}>
              [ [0x50] BUILD_VS_FABRK ] TIME_TO_MARKET │ FIB[21,34,55,89]
            </span>
          </div>
          <h2 className={cn(mode.font, "mb-4 text-3xl font-bold tracking-tight lg:text-4xl")}>
            WHY_BUILD_FROM_SCRATCH?
          </h2>
          <p className={cn(mode.font, "text-muted-foreground max-w-2xl text-sm")}>
            See how much time and effort Fabrk saves you compared to manual setup.
          </p>
        </motion.div>

        {/* Terminal Table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={cn(mode.radius, "border-border bg-card border")}
        >
          {/* Table Header */}
          <div className="border-border flex items-center gap-2 border-b px-4 py-2">
            <span className={cn(mode.font, "text-muted-foreground text-xs")}>
              [ [0x51] comparison_table.exe │ PID:4096 ]
            </span>
          </div>

          {/* Table Content */}
          <div className="p-6">
            {/* Column Headers */}
            <div
              className={cn(
                mode.font,
                "border-border mb-4 grid grid-cols-3 gap-4 border-b pb-4 text-xs"
              )}
            >
              <div className="text-muted-foreground">FEATURE</div>
              <div className="text-destructive text-center">MANUAL_SETUP</div>
              <div className="text-success text-center">FABRK</div>
            </div>

            {/* Rows */}
            <div>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    x: 2,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  viewport={{ once: true }}
                  className={cn(
                    mode.font,
                    "border-border -mx-4 grid cursor-default grid-cols-3 gap-4 border-b px-4 py-4 text-xs"
                  )}
                >
                  <div className="text-foreground">{feature.name}</div>
                  <div className="text-center">
                    <span className="text-destructive">✗</span>
                    <span className="text-muted-foreground ml-2">
                      <AnimatedCounter
                        value={feature.hours}
                        suffix="+ hours"
                        duration={1 + index * 0.2}
                      />
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="text-success">✓</span>
                    <span className="text-foreground ml-2">{feature.fabrk}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total Row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              viewport={{ once: true }}
              className={cn(mode.font, "border-border mt-4 grid grid-cols-3 gap-4 border-t-2 pt-4")}
            >
              <div className="text-sm font-bold">TOTAL</div>
              <div className="text-destructive text-center text-sm font-bold">
                <AnimatedCounter value={140} suffix="+ hours" duration={2.5} />
              </div>
              <div className="text-success text-center text-sm font-bold">Ready to Ship</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <div className={cn(mode.radius, "border-border bg-card border p-4")}>
            <span className={cn(mode.font, "text-muted-foreground text-xs")}>
              [ [0x52] NOTE ]─────────────────────────────────────────────────────
            </span>
            <span className={cn(mode.font, "text-muted-foreground mt-1 block text-xs")}>
              │ Start building your unique features on day one. Skip boilerplate.
            </span>
            <span className={cn(mode.font, "text-muted-foreground mt-1 block text-xs")}>
              └───────────────────────────────────────────────────────────────────┘
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
