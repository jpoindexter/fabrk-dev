"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { H2, H3, Body, Small } from "@/components/ui/typography";

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
            <H2 className="mb-4 font-mono">
              Trusted by Developers Worldwide
            </H2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Body className="font-mono text-muted-foreground">
              Join hundreds of developers shipping production-ready SaaS apps
            </Body>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Small className="block mt-2 text-muted-foreground">
              *Projected estimates based on early access users
            </Small>
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
              <H3 className="mb-2">{stat.label}</H3>
              <Small className="block text-muted-foreground">
                {stat.description}
              </Small>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
