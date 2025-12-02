"use client";

import * as React from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  defaultCollapsed?: boolean;
  className?: string;
  onItemClick?: (item: SidebarItem) => void;
}

export function Sidebar({
  items,
  defaultCollapsed = false,
  className,
  onItemClick,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleItemClick = (item: SidebarItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else {
      item.onClick?.();
      onItemClick?.(item);
    }
  };

  const renderItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 text-left font-mono text-xs transition-all rounded-none",
            "hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            depth > 0 && "ml-4"
          )}
          style={{ paddingLeft: `${(depth + 1) * 12}px` }}
        >
          {item.icon && (
            <span className="flex-shrink-0">{item.icon}</span>
          )}
          {!isCollapsed && (
            <>
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-none bg-primary text-xs font-semibold text-primary-foreground">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              )}
            </>
          )}
        </button>
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between border-b p-4">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold">Navigation</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto"
        >
          {isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </Button>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {items.map((item) => renderItem(item))}
      </nav>
    </aside>
  );
}
