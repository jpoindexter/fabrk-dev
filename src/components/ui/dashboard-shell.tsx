"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { Sidebar, SidebarItem } from "@/components/ui/sidebar";
import { TopBar, TopBarProps } from "@/components/ui/top-bar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export interface DashboardShellProps {
  /** Sidebar navigation items */
  sidebarItems: SidebarItem[];
  /** Whether sidebar is collapsed by default */
  sidebarCollapsed?: boolean;
  /** TopBar configuration */
  topBar?: Omit<TopBarProps, "onMobileMenuClick" | "showMobileMenu">;
  /** Main content */
  children: React.ReactNode;
  /** Additional className for the shell */
  className?: string;
  /** Additional className for the main content area */
  contentClassName?: string;
  /** Callback when sidebar item is clicked */
  onSidebarItemClick?: (item: SidebarItem) => void;
  /** Footer content (optional) */
  footer?: React.ReactNode;
}

export function DashboardShell({
  sidebarItems,
  sidebarCollapsed = false,
  topBar,
  children,
  className,
  contentClassName,
  onSidebarItemClick,
  footer,
}: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMobileMenuClick = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleSidebarItemClick = (item: SidebarItem) => {
    // Close mobile menu when item is clicked
    setMobileMenuOpen(false);
    onSidebarItemClick?.(item);
  };

  return (
    <div className={cn("bg-background min-h-screen", className)}>
      {/* TopBar - Always visible */}
      <TopBar {...topBar} showMobileMenu={true} onMobileMenuClick={handleMobileMenuClick} />

      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar
            items={sidebarItems}
            defaultCollapsed={sidebarCollapsed}
            onItemClick={handleSidebarItemClick}
            className="sticky top-14 h-[calc(100vh-3.5rem)]"
          />
        </div>

        {/* Mobile Sidebar - Sheet overlay */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className={cn("w-64 p-0", mode.radius)}>
            <Sidebar
              items={sidebarItems}
              defaultCollapsed={false}
              onItemClick={handleSidebarItemClick}
              className="h-full border-r-0"
            />
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <main
          className={cn("flex-1 overflow-auto", "min-h-[calc(100vh-3.5rem)]", contentClassName)}
        >
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>

          {/* Optional Footer */}
          {footer && (
            <footer className="border-border bg-card mt-auto border-t px-4 py-4 sm:px-6 lg:px-8">
              {footer}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}

/* ----- Compound Components ----- */

export interface DashboardShellHeaderProps {
  /** Page title */
  title: string;
  /** Optional description */
  description?: string;
  /** Action buttons/content on the right */
  actions?: React.ReactNode;
  /** Breadcrumbs above the title */
  breadcrumbs?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function DashboardShellHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
}: DashboardShellHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumbs && <div className="text-muted-foreground mb-2 text-xs">{breadcrumbs}</div>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={cn("text-2xl font-bold tracking-tight", mode.font)}>{title}</h1>
          {description && (
            <p className={cn("text-muted-foreground mt-1 text-xs", mode.font)}>{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export interface DashboardShellSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Section content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function DashboardShellSection({
  title,
  description,
  children,
  className,
}: DashboardShellSectionProps) {
  return (
    <section className={cn("mb-8", className)}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className={cn("text-lg font-semibold", mode.font)}>{title}</h2>}
          {description && (
            <p className={cn("text-muted-foreground mt-1 text-xs", mode.font)}>{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}

export interface DashboardShellGridProps {
  /** Grid columns (responsive) */
  columns?: 1 | 2 | 3 | 4;
  /** Grid gap */
  gap?: "sm" | "md" | "lg";
  /** Grid content */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function DashboardShellGrid({
  columns = 3,
  gap = "md",
  children,
  className,
}: DashboardShellGridProps) {
  const columnClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div className={cn("grid", columnClasses[columns], gapClasses[gap], className)}>{children}</div>
  );
}
