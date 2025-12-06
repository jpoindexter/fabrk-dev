/**
 * ✅ FABRK COMPONENT
 * Feature Category Card - Individual feature category display
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { FEATURE_CATEGORIES } from "./feature-data";

interface FeatureCategoryCardProps {
  category: (typeof FEATURE_CATEGORIES)[0];
  index: number;
}

export function FeatureCategoryCard({ category, index }: FeatureCategoryCardProps) {
  const Icon = category.icon;
  const isEven = index % 2 === 0;
  const hexIndex = (index + 1).toString(16).toUpperCase().padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      id={category.id}
      className="scroll-mt-24"
    >
      <div
        className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-12`}
      >
        {/* Content Side */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-4">
            <span className="border-border bg-card text-muted-foreground border px-4 py-1 text-xs">
              [ [0x{hexIndex}] {category.stats.label.toUpperCase().replace(/ /g, "_")} ]{" "}
              {category.stats.value}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground text-xs">[0x{hexIndex}]</span>
            <h2 className="text-2xl font-semibold tracking-tight">
              {category.title.toUpperCase().replace(/ /g, "_").replace(/&/g, "AND")}
            </h2>
            <span className="text-primary text-sm font-medium">&gt; {category.tagline}</span>
          </div>

          <p className="text-muted-foreground text-sm">{category.description}</p>
        </div>

        {/* Features List Side */}
        <div className="w-full flex-1">
          <div className="border-border bg-card border">
            {/* Terminal Header */}
            <div className="border-border flex items-center justify-between border-b px-4 py-2">
              <span className="text-muted-foreground text-xs">
                [ [0x{hexIndex}] INCLUDED_FEATURES ]
              </span>
              <span className="text-muted-foreground text-xs">
                {category.features.length} items
              </span>
            </div>
            {/* Content */}
            <div className="p-4 lg:p-6">
              <ul className="space-y-2">
                {category.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs">
                    <span className="text-primary flex-shrink-0">
                      {i === category.features.length - 1 ? "└─" : "├─"}
                    </span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
