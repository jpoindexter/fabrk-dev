"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const formatted = decimals > 0
          ? latest.toFixed(decimals)
          : Math.floor(latest).toLocaleString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, suffix, prefix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function StatsSection() {
  const stats = [
    {
      value: 500,
      suffix: "+",
      label: "Developers",
      description: "Using Fabrk to ship faster",
      color: "bg-primary text-primary-foreground",
    },
    {
      value: 1000,
      suffix: "+",
      label: "Projects Shipped",
      description: "Built with Fabrk boilerplate",
      color: "bg-accent text-accent-foreground",
    },
    {
      value: 4.9,
      suffix: "/5",
      decimals: 1,
      label: "Average Rating",
      description: "From satisfied customers",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      value: 40,
      suffix: "hrs",
      label: "Time Saved",
      description: "Per project on average",
      color: "bg-primary text-primary-foreground",
    },
  ];

  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[ [0x30] METRICS ]</span>
            </div>
            <h2 className="mb-4 font-mono text-2xl font-bold">
              TRUSTED_BY_DEVELOPERS_WORLDWIDE
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-sm text-muted-foreground">
              &gt; Join hundreds of developers shipping production-ready SaaS apps
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="block mt-2 font-mono text-xs text-muted-foreground">
              *Projected estimates based on early access users
            </span>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="group border border-border bg-card p-8 transition-all hover:border-primary/50"
            >
              <div className="mb-2 text-4xl font-semibold text-foreground font-mono">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <h3 className="mb-2 font-mono text-sm font-semibold">
                {stat.label.toUpperCase().replace(/ /g, '_')}
              </h3>
              <span className="block font-mono text-xs text-muted-foreground">
                {stat.description}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
