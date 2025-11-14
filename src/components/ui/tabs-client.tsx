/**
 * ✅ FABRK COMPONENT
 * Client-only Tabs wrapper to prevent hydration mismatches
 *
 * @example
 * ```tsx
 * <TabsClient>Content</TabsClient>
 * ```
 */

"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export type TabsClientProps = React.ComponentProps<typeof Tabs>;

// Client-only wrapper to prevent SSR hydration mismatches with Fabrk IDs
const ClientOnlyTabs = React.forwardRef<React.ElementRef<typeof Tabs>, TabsClientProps>(
  ({ children, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      // Return a placeholder with the same structure to prevent layout shift
      return <div className="w-full" />;
    }

    return (
      <Tabs data-slot="tabs-client" ref={ref} {...props}>
        {children}
      </Tabs>
    );
  }
);
ClientOnlyTabs.displayName = "ClientOnlyTabs";

// Export client-only versions
export const TabsClient = ClientOnlyTabs;
TabsClient.displayName = "TabsClient";
export { TabsContent, TabsList, TabsTrigger };
