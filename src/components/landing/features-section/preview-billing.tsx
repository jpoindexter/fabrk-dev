/**
 * Billing Preview Component
 * Terminal-style billing portal with animated counter
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PreviewHeader } from "./preview-header";

// Animated counter for billing
function BillingCounter({
  value,
  prefix = "",
  suffix = "",
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let current = 0;
      const increment = value / 20;
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 50);
      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function BillingPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="border-border bg-card w-full max-w-md border">
      <PreviewHeader title="billing_portal.exe" animated />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-muted-foreground mb-4 font-mono text-xs"
        >
          [BILLING]:
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="border-border bg-background mb-4 flex items-center justify-between border p-4"
        >
          <div>
            <span className="block font-mono text-xs">PLAN: PRO</span>
            <motion.span
              className="text-muted-foreground font-mono text-xs"
              whileHover={{ color: "hsl(var(--primary))", x: 2 }}
            >
              &gt; change_plan
            </motion.span>
          </div>
          <div className="text-right">
            <span className="block font-mono text-lg font-bold">
              <BillingCounter value={29} prefix="$" delay={0.5} />
            </span>
            <span className="text-muted-foreground font-mono text-xs">/month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="border-border bg-background border p-4"
        >
          <div className="mb-2 flex justify-between font-mono text-xs">
            <span className="text-muted-foreground">CYCLE: Nov 1 - Nov 30</span>
            <span>
              <BillingCounter value={15} delay={0.8} /> days remaining
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="border-border border-t pt-2"
          >
            <div className="flex justify-between font-mono text-xs">
              <span className="text-muted-foreground">Pro Plan</span>
              <span>
                $<BillingCounter value={29} suffix=".00" delay={1} />
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="border-border mt-2 flex justify-between border-t pt-2 font-mono text-xs font-bold"
            >
              <span>TOTAL</span>
              <motion.span
                initial={{ scale: 1 }}
                animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ delay: 1.5, duration: 0.3 }}
              >
                $<BillingCounter value={29} suffix=".00" delay={1.2} />
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
