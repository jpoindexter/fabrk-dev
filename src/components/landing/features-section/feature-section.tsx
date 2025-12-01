/**
 * Feature Section Layout Component
 * Two-column layout with text content and visual preview
 */
"use client";

import { motion } from "framer-motion";
import { FeatureItem, type FeatureItemProps } from "./feature-item";

interface FeatureSectionLayoutProps {
  spec: string;
  title: string;
  description: string;
  features: Array<Omit<FeatureItemProps, never>>;
  reversed?: boolean;
  children?: React.ReactNode;
}

export function FeatureSectionLayout({
  spec,
  title,
  description,
  features,
  reversed,
  children
}: FeatureSectionLayoutProps) {
  return (
    <div className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: reversed ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-center"
      >
        {/* Spec Label */}
        <div className="mb-4 inline-block self-start border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ SPEC ] {spec}</span>
        </div>

        {/* Title */}
        <h3 className="mb-4 font-mono text-2xl font-bold">{title}</h3>

        {/* Description */}
        <div className="mb-6 border-l-2 border-border pl-4">
          <span className="font-mono text-xs text-muted-foreground">│ [DESC]: </span>
          <span className="font-mono text-xs text-muted-foreground">{description}</span>
        </div>

        {/* Feature List */}
        <div className="space-y-3">
          {features.map((feature, i) => (
            <FeatureItem key={i} {...feature} />
          ))}
        </div>
      </motion.div>

      {/* Visual Content */}
      <motion.div
        initial={{ opacity: 0, x: reversed ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
