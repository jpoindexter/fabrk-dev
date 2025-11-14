/**
 * ✅ FABRK COMPONENT
 * Browser Mockup - Chrome-style window frame for showcasing apps
 * Production-ready ✓
 */

"use client";

import { cn } from "@/lib/design-system/utils";
import * as React from "react";

export interface BrowserMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  showUrl?: boolean;
  children: React.ReactNode;
}

export const BrowserMockup = React.forwardRef<HTMLDivElement, BrowserMockupProps>(
  ({ className, url = "dashboard.fabrk.dev", showUrl = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="browser-mockup"
        className={cn(
          "relative overflow-hidden rounded-lg border border-border bg-white shadow-2xl",
          className
        )}
        {...props}
      >
        {/* Browser Chrome */}
        <div className="border-b border-border bg-muted px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-destructive/100" />
              <div className="size-3 rounded-full bg-accent/100" />
              <div className="size-3 rounded-full bg-primary/100" />
            </div>

            {/* URL Bar */}
            {showUrl && (
              <div className="flex flex-1 items-center gap-2 rounded-md bg-white px-3 py-1.5 text-sm text-muted-foreground shadow-sm">
                <svg
                  className="size-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="truncate">{url}</span>
              </div>
            )}

            {/* Menu Dots */}
            <div className="flex items-center gap-1">
              <div className="size-1 rounded-full bg-muted" /> {/* design-system-ignore: browser chrome */}
              <div className="size-1 rounded-full bg-muted" /> {/* design-system-ignore: browser chrome */}
              <div className="size-1 rounded-full bg-muted" /> {/* design-system-ignore: browser chrome */}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-auto bg-white">{children}</div>
      </div>
    );
  }
);

BrowserMockup.displayName = "BrowserMockup";
