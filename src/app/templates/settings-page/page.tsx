/**
 * ✅ FABRK COMPONENT
 * Settings Page Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
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
        <StyledTabs
          code="0x00"
          title="SETTINGS_NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Tab Content */}
          <StyledTabsContent value="general">
            <GeneralTab />
          </StyledTabsContent>

          <StyledTabsContent value="account">
            <AccountTab />
          </StyledTabsContent>

          <StyledTabsContent value="privacy">
            <PrivacyTab />
          </StyledTabsContent>

          <StyledTabsContent value="billing">
            <BillingTab />
          </StyledTabsContent>
        </StyledTabs>

        {/* Implementation Note */}
        <ImplementationNote />
      </div>
    </div>
  );
}
