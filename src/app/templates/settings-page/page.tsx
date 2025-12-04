/**
 * ✅ FABRK COMPONENT
 * Settings Page Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { TerminalTabs, TerminalTabsContent } from "@/components/ui/terminal-tabs";
import { Settings, User, Lock, CreditCard } from "lucide-react";
import { SettingsHeader } from "./components/settings-header";
import { GeneralTab } from "./components/general-tab";
import { AccountTab } from "./components/account-tab";
import { PrivacyTab } from "./components/privacy-tab";
import { BillingTab } from "./components/billing-tab";
import { ImplementationNote } from "./components/implementation-note";

const tabs = [
  { id: "general", label: "GENERAL", icon: Settings },
  { id: "account", label: "ACCOUNT", icon: User },
  { id: "privacy", label: "PRIVACY", icon: Lock },
  { id: "billing", label: "BILLING", icon: CreditCard },
];

export default function SettingsPageTemplate() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <SettingsHeader />

        {/* Tabs Container */}
        <TerminalTabs
          code="0x00"
          title="SETTINGS_NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Tab Content */}
          <TerminalTabsContent value="general">
            <GeneralTab />
          </TerminalTabsContent>

          <TerminalTabsContent value="account">
            <AccountTab />
          </TerminalTabsContent>

          <TerminalTabsContent value="privacy">
            <PrivacyTab />
          </TerminalTabsContent>

          <TerminalTabsContent value="billing">
            <BillingTab />
          </TerminalTabsContent>
        </TerminalTabs>

        {/* Implementation Note */}
        <ImplementationNote />
      </div>
    </div>
  );
}
