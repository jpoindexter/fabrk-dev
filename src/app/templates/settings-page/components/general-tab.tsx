/**
 * ✅ FABRK COMPONENT
 * General Tab Content
 * Production-ready ✓
 */

import { AppearanceForm } from "@/components/settings/appearance-form";
import { Button } from "@/components/ui/button";
import { Shield, CreditCard, Bell, Download, Palette, Settings } from "lucide-react";
import { TerminalWindow } from "./terminal-window";
import { SectionHeader } from "./section-header";

export function GeneralTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Appearance Section */}
      <TerminalWindow filename="appearance.config">
        <div className="p-4">
          <SectionHeader
            icon={Palette}
            title="APPEARANCE"
            description="Customize the look and feel of the application"
          />
          <AppearanceForm />
        </div>
      </TerminalWindow>

      {/* Quick Actions */}
      <TerminalWindow filename="quick_actions.tsx">
        <div className="p-4">
          <SectionHeader
            icon={Settings}
            title="QUICK_ACTIONS"
            description="Frequently used settings and shortcuts"
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Button variant="outline" className="rounded-none justify-start font-mono text-xs">
              <Shield className="mr-2 h-4 w-4" />
              &gt; SECURITY_SETTINGS
            </Button>
            <Button variant="outline" className="rounded-none justify-start font-mono text-xs">
              <CreditCard className="mr-2 h-4 w-4" />
              &gt; BILLING_SETTINGS
            </Button>
            <Button variant="outline" className="rounded-none justify-start font-mono text-xs">
              <Bell className="mr-2 h-4 w-4" />
              &gt; NOTIFICATION_PREFS
            </Button>
            <Button variant="outline" className="rounded-none justify-start font-mono text-xs">
              <Download className="mr-2 h-4 w-4" />
              &gt; EXPORT_MY_DATA
            </Button>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
