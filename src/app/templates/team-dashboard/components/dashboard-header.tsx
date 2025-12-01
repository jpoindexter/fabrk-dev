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
        <div className="inline-block border border-border px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: TEAM_DASHBOARD</span>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">Team Dashboard</h1>
        <p className="font-mono text-sm text-muted-foreground">
          Manage team members, roles, and permissions
        </p>
      </div>
      <Button className="font-mono text-xs rounded-none">
        <Settings className="mr-2 h-4 w-4" />
        &gt; ORG_SETTINGS
      </Button>
    </div>
  );
}
