/**
 * ✅ FABRK COMPONENT
 * Dashboard Header - Title and settings button
 */

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { TemplatePageHeader } from "@/components/ui/card";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <TemplatePageHeader
        badge="TEAM_DASHBOARD"
        title="Team Dashboard"
        description="Manage team members, roles, and permissions"
      />
      <Button className="rounded-none font-mono text-xs">
        <Settings className="mr-2 h-4 w-4" />
        &gt; ORG_SETTINGS
      </Button>
    </div>
  );
}
