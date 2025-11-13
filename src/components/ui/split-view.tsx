"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SplitDirection = "horizontal" | "vertical";
export type SplitRatio = "1:1" | "1:2" | "2:1" | "1:3" | "3:1" | "2:3" | "3:2";

interface SplitViewProps {
  children: [React.ReactNode, React.ReactNode];
  direction?: SplitDirection;
  ratio?: SplitRatio;
  gap?: number;
  className?: string;
}

const ratioMap: Record<SplitRatio, [number, number]> = {
  "1:1": [50, 50],
  "1:2": [33.33, 66.67],
  "2:1": [66.67, 33.33],
  "1:3": [25, 75],
  "3:1": [75, 25],
  "2:3": [40, 60],
  "3:2": [60, 40],
};

export function SplitView({
  children,
  direction = "horizontal",
  ratio = "1:1",
  gap = 0,
  className,
}: SplitViewProps) {
  const [first, second] = ratioMap[ratio];
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
      style={{ width: "100%", height: "100%", gap: `${gap}px` }}
    >
      <div
        className="overflow-auto"
        style={{
          [isHorizontal ? "width" : "height"]: `${first}%`,
        }}
      >
        {children[0]}
      </div>
      <div
        className="overflow-auto"
        style={{
          [isHorizontal ? "width" : "height"]: `${second}%`,
        }}
      >
        {children[1]}
      </div>
    </div>
  );
}

interface SplitViewThreePanelProps {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
  direction?: SplitDirection;
  ratios?: [number, number, number];
  gap?: number;
  className?: string;
}

export function SplitViewThreePanel({
  children,
  direction = "horizontal",
  ratios = [33.33, 33.33, 33.34],
  gap = 0,
  className,
}: SplitViewThreePanelProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
      style={{ width: "100%", height: "100%", gap: `${gap}px` }}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="overflow-auto"
          style={{
            [isHorizontal ? "width" : "height"]: `${ratios[index]}%`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface SplitViewCustomProps {
  children: React.ReactNode[];
  direction?: SplitDirection;
  sizes: number[];
  gap?: number;
  className?: string;
}

export function SplitViewCustom({
  children,
  direction = "horizontal",
  sizes,
  gap = 0,
  className,
}: SplitViewCustomProps) {
  const isHorizontal = direction === "horizontal";

  const total = sizes.reduce((sum, size) => sum + size, 0);
  const percentages = sizes.map((size) => (size / total) * 100);

  return (
    <div
      className={cn(
        "flex",
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
      style={{ width: "100%", height: "100%", gap: `${gap}px` }}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="overflow-auto"
          style={{
            [isHorizontal ? "width" : "height"]: `${percentages[index]}%`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface MasterDetailProps {
  master: React.ReactNode;
  detail: React.ReactNode;
  masterWidth?: number;
  gap?: number;
  className?: string;
}

export function MasterDetail({
  master,
  detail,
  masterWidth = 300,
  gap = 0,
  className,
}: MasterDetailProps) {
  return (
    <div
      className={cn("flex flex-row", className)}
      style={{ width: "100%", height: "100%", gap: `${gap}px` }}
    >
      <div
        className="overflow-auto flex-shrink-0"
        style={{ width: `${masterWidth}px` }}
      >
        {master}
      </div>
      <div className="flex-1 overflow-auto">{detail}</div>
    </div>
  );
}

interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  sidebarWidth?: number;
  footerHeight?: number;
  gap?: number;
  className?: string;
}

export function SidebarLayout({
  sidebar,
  content,
  footer,
  sidebarWidth = 250,
  footerHeight = 60,
  gap = 0,
  className,
}: SidebarLayoutProps) {
  return (
    <div
      className={cn("flex flex-row", className)}
      style={{ width: "100%", height: "100%", gap: `${gap}px` }}
    >
      <div
        className="overflow-auto flex-shrink-0"
        style={{ width: `${sidebarWidth}px` }}
      >
        {sidebar}
      </div>
      <div className="flex-1 flex flex-col" style={{ gap: `${gap}px` }}>
        <div className="flex-1 overflow-auto">{content}</div>
        {footer && (
          <div
            className="flex-shrink-0 overflow-auto"
            style={{ height: `${footerHeight}px` }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
