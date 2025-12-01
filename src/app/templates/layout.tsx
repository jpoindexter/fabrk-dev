"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TerminalBackground } from "@/components/landing/terminal-background";
import { SiteNavigation } from "@/components/navigation";
import { Footer } from "@/components/landing/footer";
import { ChevronRight } from "lucide-react";
import {
  templatesNavigation,
  toTerminalCase,
} from "@/app/templates/templates-nav-data";

// Helper to find which section contains the current path
function findActiveSectionIndex(pathname: string): number {
  return templatesNavigation.findIndex((section) =>
    section.items.some((item) => pathname === item.href) || pathname === section.href
  );
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeSectionIndex = findActiveSectionIndex(pathname);

  // Initialize expanded sections - only the active section is expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (activeSectionIndex >= 0) {
      initial.add(activeSectionIndex);
    }
    return initial;
  });

  // Update expanded sections when pathname changes
  useEffect(() => {
    const newActiveIndex = findActiveSectionIndex(pathname);
    if (newActiveIndex >= 0 && !expandedSections.has(newActiveIndex)) {
      setTimeout(() => {
        setExpandedSections((prev) => new Set([...prev, newActiveIndex]));
      }, 0);
    }
  }, [pathname]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-mono relative">
      <TerminalBackground />
      <SiteNavigation />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-border md:block overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary/50">
          <nav className="space-y-1 p-4">
            {templatesNavigation.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(sectionIndex);
              const hasActiveItem = section.items.some((item) => pathname === item.href) || pathname === section.href;

              return (
                <div key={section.id}>
                  {/* Collapsible Section Header */}
                  <button
                    onClick={() => toggleSection(sectionIndex)}
                    className={cn(
                      "flex w-full items-center gap-2 px-2 py-1.5 text-xs font-semibold transition-colors",
                      hasActiveItem
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                    [{String(sectionIndex + 1).padStart(2, "0")}] {toTerminalCase(section.title)}
                  </button>

                  {/* Collapsible Items */}
                  {isExpanded && (
                    <div className="ml-3 border-l border-border pl-2 space-y-0.5">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-2 px-2 py-1 text-xs transition-colors",
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Icon className="h-3 w-3" />
                            {toTerminalCase(item.title)}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
