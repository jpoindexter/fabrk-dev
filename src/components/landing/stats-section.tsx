"use client";

import { motion } from "framer-motion";
import { H2, H3, Body, Small, Strong } from "@/components/ui/typography";

export function StatsSection() {
  const stats = [
    {
      value: "500+",
      label: "Developers",
      description: "Using Fabrk to ship faster",
      color: "bg-primary text-primary-foreground",
    },
    {
      value: "1,000+",
      label: "Projects Shipped",
      description: "Built with Fabrk boilerplate",
      color: "bg-accent text-accent-foreground",
    },
    {
      value: "4.9/5",
      label: "Average Rating",
      description: "From satisfied customers",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      value: "40hrs",
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
            <H2 className="mb-4">
              Trusted by Developers Worldwide
            </H2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Body className="text-muted-foreground">
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
              <div className="mb-2 text-4xl font-semibold text-foreground">{stat.value}</div>
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
