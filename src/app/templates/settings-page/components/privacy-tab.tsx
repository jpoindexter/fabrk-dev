/**
 * ✅ FABRK COMPONENT
 * Privacy Tab Content
 * Production-ready ✓
 */

import { DataExportSection } from "@/components/settings/data-export";
import { NotificationsForm } from "@/components/settings/notifications-form";
import { PrivacyForm } from "@/components/settings/privacy-form";
import { Bell, Lock, Download } from "lucide-react";
import { TerminalWindow } from "./terminal-window";
import { SectionHeader } from "./section-header";

export function PrivacyTab() {
  return (
    <div className="mt-6 space-y-6">
      {/* Notifications */}
      <TerminalWindow filename="notifications.config">
        <div className="p-4">
          <SectionHeader
            icon={Bell}
            title="NOTIFICATIONS"
            description="Manage your notification preferences"
          />
          <NotificationsForm />
        </div>
      </TerminalWindow>

      {/* Privacy */}
      <TerminalWindow filename="privacy.config">
        <div className="p-4">
          <SectionHeader
            icon={Lock}
            title="PRIVACY"
            description="Control your data sharing and privacy settings"
          />
          <PrivacyForm />
        </div>
      </TerminalWindow>

      {/* Data Export */}
      <TerminalWindow filename="data_export.tsx">
        <div className="p-4">
          <SectionHeader
            icon={Download}
            title="DATA_EXPORT"
            description="Download a copy of your data"
          />
          <DataExportSection />
        </div>
      </TerminalWindow>
    </div>
  );
}
