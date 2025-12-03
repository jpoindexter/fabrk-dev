/**
 * DocsSidebar - Shared collapsible sidebar for docs and templates
 * Terminal console style navigation
 */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, PanelLeftClose, PanelLeft, ExternalLink, LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
}

export interface NavSubSection {
  title: string;
  items: NavItem[];
}

export interface NavSection {
  title: string;
  id?: string;
  href?: string;
  icon?: LucideIcon;
  items: NavItem[];
  subSections?: NavSubSection[];
}

interface DocsSidebarProps {
  navigation: NavSection[];
  className?: string;
  /** Optional function to format section titles. If not provided, uses title as-is */
  formatSectionTitle?: (title: string, index: number) => string;
  /** Optional function to format item titles. If not provided, uses title as-is */
  formatItemTitle?: (title: string) => string;
}

// Helper to find which section contains the current path
function findActiveSectionIndex(pathname: string, navigation: NavSection[]): number {
  return navigation.findIndex((section) =>
    section.items.some((item) => pathname === item.href) ||
    pathname === section.href ||
    section.subSections?.some((sub) => sub.items.some((item) => pathname === item.href))
  );
}

// Helper to find which sub-section contains the current path
function findActiveSubSectionIndex(pathname: string, subSections: NavSubSection[]): number {
  return subSections.findIndex((sub) =>
    sub.items.some((item) => pathname === item.href)
  );
}

export function DocsSidebar({ navigation, className, formatSectionTitle, formatItemTitle }: DocsSidebarProps) {
  const pathname = usePathname();
  const activeSectionIndex = findActiveSectionIndex(pathname, navigation);

  // Initialize expanded sections - only the active section is expanded by default
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (activeSectionIndex >= 0) {
      initial.add(activeSectionIndex);
    }
    return initial;
  });

  // Track expanded sub-sections: key = "sectionIndex-subSectionIndex"
  const [expandedSubSections, setExpandedSubSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    // Auto-expand sub-section containing active item
    if (activeSectionIndex >= 0) {
      const section = navigation[activeSectionIndex];
      if (section.subSections) {
        const activeSubIndex = findActiveSubSectionIndex(pathname, section.subSections);
        if (activeSubIndex >= 0) {
          initial.add(`${activeSectionIndex}-${activeSubIndex}`);
        }
      }
    }
    return initial;
  });

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Update expanded sections when pathname changes
  // Note: We intentionally read expandedSections/expandedSubSections to check if already expanded
  // but don't want to re-run when they change (would cause infinite loop)
  useEffect(() => {
    const newActiveIndex = findActiveSectionIndex(pathname, navigation);
    if (newActiveIndex >= 0) {
      // Expand parent section (use functional update to avoid dependency)
      setExpandedSections((prev) => {
        if (prev.has(newActiveIndex)) return prev;
        return new Set([...prev, newActiveIndex]);
      });
      // Expand sub-section containing active item
      const section = navigation[newActiveIndex];
      if (section.subSections) {
        const activeSubIndex = findActiveSubSectionIndex(pathname, section.subSections);
        if (activeSubIndex >= 0) {
          const subKey = `${newActiveIndex}-${activeSubIndex}`;
          setExpandedSubSections((prev) => {
            if (prev.has(subKey)) return prev;
            return new Set([...prev, subKey]);
          });
        }
      }
    }
  }, [pathname, navigation]);

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

  const toggleSubSection = (sectionIndex: number, subSectionIndex: number) => {
    const key = `${sectionIndex}-${subSectionIndex}`;
    setExpandedSubSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <aside
      className={cn(
        "sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 border-r border-border md:block overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border hover:scrollbar-thumb-primary/50 transition-all duration-300 bg-background isolate",
        sidebarCollapsed ? "w-12" : "w-72",
        className
      )}
    >
      {/* Collapsed state - just show expand button */}
      {sidebarCollapsed && (
        <div className="p-2">
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="flex items-center justify-center p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Expand sidebar"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation - hidden when collapsed */}
      {!sidebarCollapsed && (
        <nav className="space-y-1 p-4">
          {/* Collapse button on first row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">[NAV]</span>
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="flex items-center justify-center p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="h-3.5 w-3.5" />
            </button>
          </div>

          {navigation.map((section, sectionIndex) => {
            const isExpanded = expandedSections.has(sectionIndex);
            const hasActiveItem =
              section.items.some((item) => pathname === item.href) ||
              pathname === section.href ||
              section.subSections?.some((sub) => sub.items.some((item) => pathname === item.href));
            const sectionKey = section.id || section.title;
            const displayTitle = formatSectionTitle ? formatSectionTitle(section.title, sectionIndex) : section.title;

            return (
              <div key={sectionKey} className={cn(sectionIndex > 0 && "mt-2")}>
                {/* Collapsible Section Header */}
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className={cn(
                    "flex w-full items-center gap-2 py-1.5 text-xs font-semibold transition-colors",
                    hasActiveItem
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 shrink-0 transition-transform",
                      isExpanded && "rotate-90"
                    )}
                  />
                  {displayTitle}
                </button>

                {/* Collapsible Items with connector line */}
                {isExpanded && (
                  <div className="relative ml-[7px] pl-4 space-y-0.5 before:absolute before:left-0 before:top-0 before:bottom-1 before:w-px before:bg-border">
                    {/* Direct items */}
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      const itemDisplayTitle = formatItemTitle ? formatItemTitle(item.title) : item.title;

                      if (item.external) {
                        return (
                          <a
                            key={item.href}
                            href={item.href}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            <Icon className="h-3 w-3" />
                            {itemDisplayTitle}
                            <ExternalLink className="ml-auto h-2.5 w-2.5" />
                          </a>
                        );
                      }

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
                          {itemDisplayTitle}
                        </Link>
                      );
                    })}

                    {/* Sub-sections (nested collapsible groups) */}
                    {section.subSections?.map((subSection, subIndex) => {
                      const subKey = `${sectionIndex}-${subIndex}`;
                      const isSubExpanded = expandedSubSections.has(subKey);
                      const hasActiveSubItem = subSection.items.some((item) => pathname === item.href);

                      return (
                        <div key={subSection.title} className="mt-1">
                          {/* Sub-section header */}
                          <button
                            onClick={() => toggleSubSection(sectionIndex, subIndex)}
                            className={cn(
                              "flex w-full items-center gap-2 py-1 text-xs font-medium transition-colors",
                              hasActiveSubItem
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <ChevronRight
                              className={cn(
                                "h-2.5 w-2.5 shrink-0 transition-transform",
                                isSubExpanded && "rotate-90"
                              )}
                            />
                            {subSection.title}
                          </button>

                          {/* Sub-section items */}
                          {isSubExpanded && (
                            <div className="relative ml-[5px] pl-4 space-y-0.5 before:absolute before:left-0 before:top-0 before:bottom-1 before:w-px before:bg-border/50">
                              {subSection.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href;
                                const itemDisplayTitle = formatItemTitle ? formatItemTitle(item.title) : item.title;

                                return (
                                  <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                      "flex items-center gap-2 px-2 py-0.5 text-xs transition-colors",
                                      isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    )}
                                  >
                                    <Icon className="h-3 w-3 shrink-0" />
                                    {itemDisplayTitle}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>
            );
          })}
        </nav>
      )}
    </aside>
  );
}
