/**
 * ✅ FABRK ANIMATED COMPONENT
 * Animated List - Framer Motion powered
 * Staggered list animations
 */

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedListProps {
  children: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

export function AnimatedList({
  children,
  className,
  delay = 0,
  stagger = 0.1
}: AnimatedListProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.ul
      className={cn("space-y-4", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children.map((child, i) => (
        <motion.li key={i} variants={item}>
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}
