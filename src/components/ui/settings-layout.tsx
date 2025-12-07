"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";

export interface SettingsNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  description?: string;
  badge?: string | number;
}

export interface SettingsLayoutProps {
  /** Navigation items for the settings sidebar */
  navItems: SettingsNavItem[];
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Content to render */
  children: React.ReactNode;
  /** Active item ID (if not using href-based navigation) */
  activeItem?: string;
  /** Callback when nav item is clicked */
  onNavItemClick?: (item: SettingsNavItem) => void;
  /** Additional className */
  className?: string;
  /** Additional className for the content area */
  contentClassName?: string;
  /** Max width of the layout */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export function SettingsLayout({
  navItems,
  title,
  description,
  children,
  activeItem,
  onNavItemClick,
  className,
  contentClassName,
  maxWidth = "xl",
}: SettingsLayoutProps) {
  const pathname = usePathname();

  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  const isItemActive = (item: SettingsNavItem) => {
    if (activeItem) {
      return item.id === activeItem;
    }
    if (item.href) {
      return pathname === item.href;
    }
    return false;
  };

  return (
    <div
      className={cn(
        "container mx-auto px-4 py-6 sm:px-6 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {/* Header */}
      {(title || description) && (
        <div className="mb-8">
          {title && <h1 className={cn("text-2xl font-bold tracking-tight", mode.font)}>{title}</h1>}
          {description && (
            <p className={cn("text-muted-foreground mt-1 text-xs", mode.font)}>{description}</p>
          )}
        </div>
      )}

      {/* Layout Grid */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Navigation */}
        <nav className="w-full shrink-0 lg:w-48 xl:w-56">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = isItemActive(item);
              const NavItemContent = (
                <span className="flex items-center gap-3">
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-primary-foreground flex h-5 min-w-5 items-center justify-center px-1 text-xs font-semibold",
                        isActive ? "bg-primary-foreground/20" : "bg-primary",
                        mode.radius
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </span>
              );

              const itemClasses = cn(
                "flex w-full items-center px-3 py-2 text-xs transition-colors",
                mode.radius,
                mode.font,
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              );

              return (
                <li key={item.id}>
                  {item.href ? (
                    <Link href={item.href} className={itemClasses}>
                      {NavItemContent}
                    </Link>
                  ) : (
                    <button onClick={() => onNavItemClick?.(item)} className={itemClasses}>
                      {NavItemContent}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Content Area */}
        <main className={cn("min-w-0 flex-1", contentClassName)}>{children}</main>
      </div>
    </div>
  );
}

/* ----- Settings Section Component ----- */

export interface SettingsSectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Section content */
  children: React.ReactNode;
  /** Action buttons on the right side of header */
  actions?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function SettingsSection({
  title,
  description,
  children,
  actions,
  className,
}: SettingsSectionProps) {
  return (
    <div className={cn("border-border bg-card border", mode.radius, className)}>
      {/* Section Header */}
      <div className="border-border flex flex-col gap-4 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 className={cn("text-base font-semibold", mode.font)}>{title}</h2>
          {description && (
            <p className={cn("text-muted-foreground mt-1 text-xs", mode.font)}>{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Section Content */}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

/* ----- Settings Row Component ----- */

export interface SettingsRowProps {
  /** Row label */
  label: string;
  /** Row description */
  description?: string;
  /** Control element (switch, input, select, etc.) */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function SettingsRow({ label, description, children, className }: SettingsRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex-1">
        <label className={cn("text-sm font-medium", mode.font)}>{label}</label>
        {description && (
          <p className={cn("text-muted-foreground mt-0.5 text-xs", mode.font)}>{description}</p>
        )}
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}

/* ----- Settings Divider ----- */

export function SettingsDivider({ className }: { className?: string }) {
  return <div className={cn("border-border border-t", className)} />;
}

/* ----- Settings Footer ----- */

export interface SettingsFooterProps {
  /** Footer content/actions */
  children: React.ReactNode;
  /** Align to right */
  alignRight?: boolean;
  /** Additional className */
  className?: string;
}

export function SettingsFooter({ children, alignRight = true, className }: SettingsFooterProps) {
  return (
    <div
      className={cn(
        "border-border bg-muted/50 flex items-center gap-2 border-t px-4 py-3 sm:px-6",
        alignRight && "justify-end",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ----- Settings Card (alternative to Section) ----- */

export interface SettingsCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description?: string;
  /** Card content */
  children: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Danger zone styling */
  danger?: boolean;
  /** Additional className */
  className?: string;
}

export function SettingsCard({
  title,
  description,
  children,
  footer,
  danger = false,
  className,
}: SettingsCardProps) {
  return (
    <div
      className={cn(
        "bg-card border",
        danger ? "border-destructive" : "border-border",
        mode.radius,
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "border-b px-4 py-4 sm:px-6",
          danger ? "border-destructive" : "border-border"
        )}
      >
        <h3 className={cn("text-base font-semibold", danger && "text-destructive", mode.font)}>
          {title}
        </h3>
        {description && (
          <p className={cn("text-muted-foreground mt-1 text-xs", mode.font)}>{description}</p>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">{children}</div>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            "flex items-center justify-end gap-2 border-t px-4 py-3 sm:px-6",
            danger ? "border-destructive bg-destructive/5" : "border-border bg-muted/50"
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}
