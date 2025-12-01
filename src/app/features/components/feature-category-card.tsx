/**
 * ✅ FABRK COMPONENT
 * Feature Category Card - Individual feature category display
 * Production-ready ✓
 */

"use client";

import { motion } from "framer-motion";
import { FEATURE_CATEGORIES } from "./feature-data";

interface FeatureCategoryCardProps {
  category: typeof FEATURE_CATEGORIES[0];
  index: number;
}

export function FeatureCategoryCard({ category, index }: FeatureCategoryCardProps) {
  const Icon = category.icon;
  const isEven = index % 2 === 0;
  const hexIndex = (index + 1).toString(16).toUpperCase().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      id={category.id}
      className="scroll-mt-24"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
        {/* Content Side */}
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-3">
            <div className="bg-primary/10 p-3">
              <Icon className="size-6 text-primary" />
            </div>
            <span className="border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              [{category.stats.value}] {category.stats.label.toUpperCase().replace(/ /g, '_')}
            </span>
          </div>

          <div>
            <span className="text-xs text-muted-foreground">[0x{hexIndex}]</span>
            <h2 className="text-2xl font-bold tracking-tight">{category.title.toUpperCase().replace(/ /g, '_').replace(/&/g, 'AND')}</h2>
            <span className="text-sm text-primary font-medium">&gt; {category.tagline}</span>
          </div>

          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>

        {/* Features List Side */}
        <div className="flex-1 w-full">
          <div className="border border-border bg-card p-6 lg:p-8">
            <div className="mb-4 text-xs text-muted-foreground">
              [ INCLUDED ]────────────────────────
            </div>
            <ul className="space-y-2">
              {category.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-xs text-muted-foreground">
                  <span className="text-primary flex-shrink-0">{i === category.features.length - 1 ? '└─' : '├─'}</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
