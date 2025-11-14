/**
 * ✅ FABRK ANIMATED COMPONENT
 * Animated Button - Framer Motion powered
 * Multiple animation variants for buttons
 */

"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export type AnimatedButtonVariant =
  | "scale"
  | "magnetic"
  | "shimmer"
  | "pulse"
  | "bounce"
  | "slide";

export interface AnimatedButtonProps extends Omit<HTMLMotionProps<"button">, "variants"> {
  variant?: AnimatedButtonVariant;
  children: React.ReactNode;
}

const buttonVariants = {
  scale: {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  },
  magnetic: {
    rest: { x: 0, y: 0 },
    hover: { x: 0, y: -2 }
  },
  shimmer: {
    rest: { backgroundPosition: "0% 50%" },
    hover: { backgroundPosition: "100% 50%" }
  },
  pulse: {
    rest: { scale: 1 },
    hover: {
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 0.8
      }
    }
  },
  bounce: {
    rest: { y: 0 },
    hover: {
      y: [0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 0.6
      }
    }
  },
  slide: {
    rest: { x: 0 },
    hover: { x: 5 }
  }
};

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ variant = "scale", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md px-6 py-3",
          "bg-primary text-primary-foreground font-medium",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variant === "shimmer" && "bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%]",
          className
        )}
        variants={buttonVariants[variant]}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
