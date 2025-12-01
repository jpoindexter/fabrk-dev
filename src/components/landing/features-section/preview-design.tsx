/**
 * Design System Preview Component
 * Terminal-style design system showcase
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Moon, Layers, Palette } from "lucide-react";
import { TerminalHeader } from "./terminal-header";

export function DesignSystemPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [componentCount, setComponentCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let count = 0;
      const counter = setInterval(() => {
        count += 3;
        if (count >= 50) {
          setComponentCount(50);
          clearInterval(counter);
        } else {
          setComponentCount(count);
        }
      }, 40);
      return () => clearInterval(counter);
    }, 800);

    return () => clearTimeout(timer);
  }, [isInView]);

  const items = [
    { icon: Moon, label: "THEMES", value: "LIGHT + DARK" },
    { icon: Layers, label: "COMPONENTS", value: `${componentCount}+ SHADCN` },
    { icon: Palette, label: "STYLING", value: "TAILWIND CSS" },
  ];

  const colors = [
    { name: "PRIMARY", class: "bg-primary" },
    { name: "SECONDARY", class: "bg-secondary" },
    { name: "ACCENT", class: "bg-accent" },
    { name: "MUTED", class: "bg-muted" },
  ];

  return (
    <div ref={ref} className="w-full max-w-md border border-border bg-card">
      <TerminalHeader title="design_system.exe" animated />

      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="mb-4 font-mono text-xs text-muted-foreground"
        >
          [DESIGN_SYSTEM]:
        </motion.div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + idx * 0.15 }}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between border border-border bg-background p-3 cursor-pointer transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={isInView ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ delay: 0.5 + idx * 0.15, duration: 0.5 }}
                >
                  <item.icon className="size-4 text-primary" />
                </motion.div>
                <span className="font-mono text-xs">{item.label}</span>
              </div>
              <span className="font-mono text-xs text-success">{item.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {colors.map((color, idx) => (
            <motion.div
              key={color.name}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.8 + idx * 0.1, duration: 0.3, ease: "easeOut" }}
              style={{ originY: 1 }}
              className={`h-8 ${color.class}`}
            />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {colors.map((color, idx) => (
            <motion.span
              key={color.name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 + idx * 0.1 }}
              className="font-mono text-xs text-muted-foreground text-center"
            >
              {color.name}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
