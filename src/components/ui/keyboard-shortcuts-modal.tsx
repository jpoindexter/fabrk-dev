/**
 * ✅ FABRK COMPONENT
 * Keyboard Shortcuts Modal
 * Accessibility enhancement - shows available shortcuts
 */

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Shortcut {
  key: string;
  description: string;
  modifier?: string;
}

const shortcuts: Shortcut[] = [
  { key: "C", description: "Browse Components" },
  { key: "E", description: "View Examples" },
  { key: "D", description: "Documentation" },
  { key: "P", description: "Pricing" },
  { key: "/", description: "Search" },
  { key: "?", modifier: "Shift", description: "Show this help" },
];

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("toggle-shortcuts-modal", handleToggle);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("toggle-shortcuts-modal", handleToggle);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-6"
            role="dialog"
            aria-labelledby="shortcuts-title"
            aria-describedby="shortcuts-description"
          >
            <Card className="border-border bg-card p-6 shadow-2xl">
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Keyboard className="size-6 text-primary" aria-hidden="true" />
                  <h2 id="shortcuts-title" className="text-2xl font-semibold text-foreground">
                    Keyboard Shortcuts
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close keyboard shortcuts dialog"
                  className="size-8 rounded-full p-0"
                >
                  <X className="size-4" aria-hidden="true" />
                </Button>
              </div>

              <p id="shortcuts-description" className="mb-6 text-sm text-muted-foreground">
                Use these keyboard shortcuts to navigate quickly around the site.
              </p>

              {/* Shortcuts List */}
              <div className="space-y-3" role="list">
                {shortcuts.map((shortcut, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50"
                    role="listitem"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-2">
                      {shortcut.modifier && (
                        <kbd className="inline-flex items-center justify-center rounded border border-border bg-background px-2 py-1 font-mono text-xs font-medium text-foreground shadow-sm">
                          {shortcut.modifier}
                        </kbd>
                      )}
                      <kbd className="inline-flex items-center justify-center rounded border border-border bg-background px-2 py-1 font-mono text-xs font-medium text-foreground shadow-sm">
                        {shortcut.key}
                      </kbd>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 text-center text-xs text-muted-foreground">
                Press{" "}
                <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono">
                  Esc
                </kbd>{" "}
                to close
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
