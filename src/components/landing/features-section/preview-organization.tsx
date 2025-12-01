/**
 * Organization Preview Component
 * Terminal-style organization manager with add animation
 */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2 } from "lucide-react";
import { TerminalHeader } from "./terminal-header";

export function OrganizationPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showStartup, setShowStartup] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    // After 2 seconds, animate the button click
    const clickTimer = setTimeout(() => {
      // After button animation, show startup
      setTimeout(() => {
        setShowStartup(true);
      }, 300);
    }, 2000);

    return () => clearTimeout(clickTimer);
  }, [isInView]);

  return (
    <div ref={ref} className="w-full max-w-md border border-border bg-card">
      <TerminalHeader title="org_manager.exe" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">
            [ORGANIZATIONS]:
          </span>
          <button className="border border-primary px-2 py-1 font-mono text-xs text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            + ADD_ORG
          </button>
        </div>

        {/* Fixed height container to prevent layout shift */}
        <div className="space-y-2 min-h-[116px]">
          {/* ACME_INC - always visible */}
          <div className="flex items-center justify-between border border-border bg-background p-3">
            <div className="flex items-center gap-3">
              <Building2 className="size-4 text-muted-foreground" />
              <div>
                <span className="block font-mono text-xs">ACME_INC</span>
                <span className="font-mono text-xs text-muted-foreground">12 members</span>
              </div>
            </div>
            <span className="font-mono text-xs text-success">OWNER</span>
          </div>

          {/* STARTUP_CO - appears after button click */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={showStartup ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between border border-border bg-background p-3"
          >
            <div className="flex items-center gap-3">
              <Building2 className="size-4 text-muted-foreground" />
              <div>
                <span className="block font-mono text-xs">STARTUP_CO</span>
                <span className="font-mono text-xs text-muted-foreground">5 members</span>
              </div>
            </div>
            <span className="font-mono text-xs text-success">ADMIN</span>
          </motion.div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <span className="mb-2 block font-mono text-xs text-muted-foreground">[ROLES]:</span>
          <div className="flex flex-wrap gap-2">
            {["OWNER", "ADMIN", "MEMBER", "GUEST"].map((role) => (
              <span
                key={role}
                className="border border-border bg-card px-2 py-1 font-mono text-xs"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
