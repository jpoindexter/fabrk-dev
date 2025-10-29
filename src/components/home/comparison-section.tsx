/**
 * ✅ FABRK COMPONENT
 * Comparison Table Section - Shows Fabrk vs competitors
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Components",
    fabrk: "169",
    shadcn: "50+",
    uipub: "~100",
  },
  {
    feature: "Quality Checks",
    fabrk: true,
    shadcn: false,
    uipub: false,
  },
  {
    feature: "Test Coverage",
    fabrk: "85%",
    shadcn: "-",
    uipub: "-",
  },
  {
    feature: "AI-Optimized",
    fabrk: true,
    shadcn: false,
    uipub: true,
  },
  {
    feature: "Accessibility",
    fabrk: true,
    shadcn: "Partial",
    uipub: true,
  },
  {
    feature: "Design System",
    fabrk: true,
    shadcn: "Basic",
    uipub: true,
  },
  {
    feature: "Price",
    fabrk: "$299",
    shadcn: "Free",
    uipub: "$349",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-150px" },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

function renderCell(value: string | boolean) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-5 text-primary" />
    ) : (
      <X className="mx-auto size-5 text-muted-foreground" />
    );
  }
  return <span className="text-foreground">{value}</span>;
}

export function ComparisonSection() {
  return (
    <section className="border-t border-border bg-white py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            How Fabrk compares
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            More components, better quality, AI-native.
          </p>
        </motion.div>

        <motion.div className="mx-auto mt-16 max-w-4xl overflow-x-auto" {...fadeInUp}>
          <div className="inline-block min-w-full align-middle">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-4 pr-8 text-left text-sm font-medium text-muted-foreground">Feature</th>
                  <th className="px-4 pb-4 text-center text-sm font-semibold text-foreground">
                    Fabrk
                  </th>
                  <th className="px-4 pb-4 text-center text-sm font-medium text-muted-foreground">
                    shadcn/ui
                  </th>
                  <th className="px-4 pb-4 text-center text-sm font-medium text-muted-foreground">
                    UI Pub
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={index !== comparisons.length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="py-4 pr-8 text-sm font-medium text-foreground">{row.feature}</td>
                    <td className="p-4 text-center text-sm font-medium">
                      <div className="flex items-center justify-center">
                        {renderCell(row.fabrk)}
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center">
                        {renderCell(row.shadcn)}
                      </div>
                    </td>
                    <td className="p-4 text-center text-sm text-muted-foreground">
                      <div className="flex items-center justify-center">
                        {renderCell(row.uipub)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              All data verified as of January 2025. Pricing shown is for solo/individual licenses.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
