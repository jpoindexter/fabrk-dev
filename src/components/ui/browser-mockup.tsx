import * as React from "react";
import { cn } from "@/lib/utils";

interface BrowserMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
}

export function BrowserMockup({
  children,
  className,
  url = "https://yoursaas.com/dashboard",
  ...props
}: BrowserMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-background shadow-2xl",
        className
      )}
      {...props}
    >
      {/* Browser Chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
        {/* Traffic Lights */}
        <div className="flex gap-2">
          <div className="size-3 rounded-full bg-red-500" />
          <div className="size-3 rounded-full bg-yellow-500" />
          <div className="size-3 rounded-full bg-green-500" />
        </div>

        {/* URL Bar */}
        <div className="ml-4 flex-1 rounded bg-background px-3 py-1.5 text-xs text-muted-foreground">
          {url}
        </div>
      </div>

      {/* Browser Content */}
      <div className="bg-background">{children}</div>
    </div>
  );
}
