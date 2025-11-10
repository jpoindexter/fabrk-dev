import * as React from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function PageWrapper({ className, children, ...props }: PageWrapperProps) {
  return (
    <div
      className={cn(
        "container mx-auto px-6 py-12 max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
