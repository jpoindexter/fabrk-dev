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
import { Card, CardHeader, CardContent, Badge } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

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
    <section className="border-border border-t px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Badge
            code="0x50"
            label="BUILD_VS_FABRK"
            meta="TIME_TO_MARKET │ FIB[21,34,55,89]"
            className="mb-4"
          />
          <h2 className={cn(mode.font, "mb-4 text-4xl font-semibold tracking-tight")}>
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
        >
          <Card size="auto">
            <CardHeader code="0x51" title="COMPARISON_TABLE" />
            <CardContent padding="sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>FEATURE</TableHead>
                    <TableHead className="text-destructive text-center">MANUAL_SETUP</TableHead>
                    <TableHead className="text-success text-center">FABRK</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((feature, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-foreground">{feature.name}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-destructive">✗</span>
                        <span className="text-muted-foreground ml-2">
                          <AnimatedCounter
                            value={feature.hours}
                            suffix="+ hours"
                            duration={1 + index * 0.2}
                          />
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-success">✓</span>
                        <span className="text-foreground ml-2">{feature.fabrk}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-semibold">TOTAL</TableCell>
                    <TableCell className="text-destructive text-center font-semibold">
                      <AnimatedCounter value={140} suffix="+ hours" duration={2.5} />
                    </TableCell>
                    <TableCell className="text-success text-center font-semibold">
                      Ready to Ship
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <Card size="auto">
            <CardContent padding="sm">
              <span className={cn(mode.font, "text-muted-foreground text-xs")}>
                [NOTE]: Start building your unique features on day one. Skip boilerplate.
              </span>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
