/**
 * TerminalTabs - Standardized terminal-style tabs component
 *
 * This component enforces consistent tab styling across all templates.
 * Use this instead of manually styling Tabs/TabsList/TabsTrigger.
 *
 * @example
 * ```tsx
 * <TerminalTabs
 *   code="0x00"
 *   title="NAVIGATION"
 *   tabs={[
 *     { id: "tab1", label: "FIRST_TAB" },
 *     { id: "tab2", label: "SECOND_TAB", icon: Settings },
 *   ]}
 *   value={activeTab}
 *   onValueChange={setActiveTab}
 * >
 *   <TerminalTabsContent value="tab1">Content 1</TerminalTabsContent>
 *   <TerminalTabsContent value="tab2">Content 2</TerminalTabsContent>
 * </TerminalTabs>
 * ```
 */

"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TerminalCard, TerminalCardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mode } from "@/lib/design-system";
import { LucideIcon } from "lucide-react";

export interface TerminalTab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

export interface TerminalTabsProps {
  /** Terminal header code (e.g., "0x00") */
  code: string;
  /** Terminal header title (e.g., "NAVIGATION") */
  title: string;
  /** Array of tab definitions */
  tabs: TerminalTab[];
  /** Currently active tab id */
  value: string;
  /** Callback when tab changes */
  onValueChange: (value: string) => void;
  /** Tab content as children */
  children: React.ReactNode;
  /** Optional className for the outer container */
  className?: string;
  /** Optional description shown below tabs */
  description?: string | ((activeTab: string) => string);
}

export function TerminalTabs({
  code,
  title,
  tabs,
  value,
  onValueChange,
  children,
  className,
  description,
}: TerminalTabsProps) {
  const descriptionText = typeof description === "function" ? description(value) : description;

  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TerminalCard>
        <TerminalCardHeader code={code} title={title} />
        <TabsList
          className={cn("h-auto w-full justify-start border-0 bg-transparent p-0", mode.radius)}
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={cn(
                  "border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs",
                  index === tabs.length - 1 && "border-r-0",
                  mode.radius,
                  mode.font
                )}
              >
                {Icon && <Icon className="h-3 w-3" />}[{tab.label}]
              </TabsTrigger>
            );
          })}
        </TabsList>
        {descriptionText && (
          <div
            className={cn("text-muted-foreground border-border border-t p-4 text-xs", mode.font)}
          >
            [SELECTED]: {descriptionText}
          </div>
        )}
      </TerminalCard>
      {children}
    </Tabs>
  );
}

export interface TerminalTabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Content panel for TerminalTabs
 * Automatically applies floating spacing (mt-6)
 */
export function TerminalTabsContent({ value, children, className }: TerminalTabsContentProps) {
  return (
    <TabsContent value={value} className={cn("mt-6", className)}>
      {children}
    </TabsContent>
  );
}

export { TerminalTabs as default };
