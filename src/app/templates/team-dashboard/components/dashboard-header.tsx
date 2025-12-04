/**
 * ✅ FABRK COMPONENT
 * Dashboard Header - Title and settings button
 */

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="border-border inline-block border px-4 py-1">
          <span className="text-muted-foreground font-mono text-xs">
            [TEMPLATE]: TEAM_DASHBOARD
          </span>
        </div>
        <h1 className="font-mono text-4xl font-semibold tracking-tight">Team Dashboard</h1>
        <p className="text-muted-foreground font-mono text-sm">
          Manage team members, roles, and permissions
        </p>
      </div>
      <Button className="rounded-none font-mono text-xs">
        <Settings className="mr-2 h-4 w-4" />
        &gt; ORG_SETTINGS
      </Button>
    </div>
  );
}
