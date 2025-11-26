"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { H2, Body, Small, Strong } from "@/components/ui/typography";

export function ComparisonSection() {
  const features = [
    {
      name: "Authentication (Email + OAuth)",
      manual: false,
      fabrk: true,
      time: "8 hours",
    },
    {
      name: "Stripe Payments Integration",
      manual: false,
      fabrk: true,
      time: "12 hours",
    },
    {
      name: "Database Schema + ORM",
      manual: false,
      fabrk: true,
      time: "6 hours",
    },
    {
      name: "Email System (Templates + Sending)",
      manual: false,
      fabrk: true,
      time: "4 hours",
    },
    {
      name: "25+ UI Components",
      manual: false,
      fabrk: true,
      time: "20 hours",
    },
    {
      name: "TypeScript Configuration",
      manual: false,
      fabrk: true,
      time: "3 hours",
    },
    {
      name: "Dashboard Templates",
      manual: false,
      fabrk: true,
      time: "8 hours",
    },
    {
      name: "Dark Mode + Theme System",
      manual: false,
      fabrk: true,
      time: "5 hours",
    },
    {
      name: "Security Best Practices",
      manual: false,
      fabrk: true,
      time: "4 hours",
    },
    {
      name: "Production Deployment Config",
      manual: false,
      fabrk: true,
      time: "3 hours",
    },
  ];

  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <H2 className="mb-4">
              Why Build From Scratch?
            </H2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Body className="text-muted-foreground">
              See how much time and effort Fabrk saves you
            </Body>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-lg border border-border bg-card"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Feature
                </th>
                <th className="border-l border-border px-6 py-4 text-center text-sm font-semibold text-foreground">
                  Manual Setup
                </th>
                <th className="border-l border-border px-6 py-4 text-center text-sm font-semibold text-primary">
                  Fabrk
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.03 }}
                  viewport={{ once: true }}
                  className="border-b border-border transition-colors hover:bg-muted/50"
                >
                  <td className="px-6 py-4">
                    <Small className="block font-semibold">{feature.name}</Small>
                    <Small className="block mt-1 text-muted-foreground">
                      Time: {feature.time}
                    </Small>
                  </td>
                  <td className="border-l border-border px-6 py-4 text-center">
                    {feature.manual ? (
                      <Check className="inline-block h-5 w-5 text-success" />
                    ) : (
                      <X className="inline-block h-5 w-5 text-destructive" />
                    )}
                  </td>
                  <td className="border-l border-border px-6 py-4 text-center">
                    {feature.fabrk ? (
                      <Check className="inline-block h-5 w-5 text-primary" />
                    ) : (
                      <X className="inline-block h-5 w-5 text-destructive" />
                    )}
                  </td>
                </motion.tr>
              ))}
              <motion.tr
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                viewport={{ once: true }}
                className="border-t border-border"
              >
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  Total Time Investment
                </td>
                <td className="border-l border-border px-6 py-4 text-center text-base font-semibold text-destructive">
                  73+ hours
                </td>
                <td className="border-l border-border px-6 py-4 text-center text-base font-semibold text-primary">
                  0 hours
                </td>
              </motion.tr>
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <Small className="block text-muted-foreground">
            Start building your unique features on day one. Skip the boring
            boilerplate.
          </Small>
        </motion.div>
      </div>
    </section>
  );
}
