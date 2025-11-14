/**
 * ✅ FABRK ANIMATED COMPONENT
 * Animated Text - Framer Motion powered
 * Text reveal and animation effects
 */

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AnimatedTextVariant = "fade" | "slide-up" | "word-fade" | "char-fade" | "wave";

export interface AnimatedTextProps {
  text: string;
  variant?: AnimatedTextVariant;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const containerVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  },
  "slide-up": {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  },
  "word-fade": {
    hidden: {},
    visible: {}
  },
  "char-fade": {
    hidden: {},
    visible: {}
  },
  wave: {
    hidden: {},
    visible: {}
  }
};

const childVariants = {
  "word-fade": {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  },
  "char-fade": {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 }
    }
  },
  wave: {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: { duration: 0.5 }
    }
  }
};

export function AnimatedText({
  text,
  variant = "fade",
  className,
  delay = 0,
  as: Component = "p"
}: AnimatedTextProps) {

  // Simple variants (no splitting)
  if (variant === "fade" || variant === "slide-up") {
    return (
      <motion.div
        variants={containerVariants[variant]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <Component className={className}>{text}</Component>
      </motion.div>
    );
  }

  // Word splitting variants
  if (variant === "word-fade" || variant === "wave") {
    const words = text.split(" ");
    return (
      <Component className={cn("flex flex-wrap gap-x-2", className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={childVariants[variant]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.1 }}
          >
            {word}
          </motion.span>
        ))}
      </Component>
    );
  }

  // Character splitting variant
  if (variant === "char-fade") {
    const chars = text.split("");
    return (
      <Component className={className}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            variants={childVariants["char-fade"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.05 }}
          >
            {char}
          </motion.span>
        ))}
      </Component>
    );
  }

  return <Component className={className}>{text}</Component>;
}
