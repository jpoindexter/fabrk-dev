/**
 * ✅ FABRK ANIMATED COMPONENT
 * Animated Card - Framer Motion powered
 * Smooth entrance and hover animations
 */

"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export type AnimatedCardVariant = "fade-up" | "scale" | "flip" | "lift" | "glow";

export interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  variant?: AnimatedCardVariant;
  delay?: number;
  children: React.ReactNode;
}

const cardVariants = {
  "fade-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.02 }
  },
  flip: {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0 },
    hover: { scale: 1.05 }
  },
  lift: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: {
      y: -8,
      boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      transition: { type: "spring" as const, stiffness: 300 }
    }
  },
  glow: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    hover: {
      boxShadow: "0 0 20px 5px hsl(var(--primary) / 0.3)",
      borderColor: "hsl(var(--primary) / 0.5)"
    }
  }
};

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ variant = "fade-up", delay = 0, className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
          "transition-shadow",
          className
        )}
        variants={cardVariants[variant]}
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.5,
          delay,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";
