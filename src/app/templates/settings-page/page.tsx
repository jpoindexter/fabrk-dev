/**
 * ✅ FABRK COMPONENT
 * Settings Page Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings, User, Lock, CreditCard } from "lucide-react";
import { SettingsHeader } from "./components/settings-header";
import { GeneralTab } from "./components/general-tab";
import { AccountTab } from "./components/account-tab";
import { PrivacyTab } from "./components/privacy-tab";
import { BillingTab } from "./components/billing-tab";
import { ImplementationNote } from "./components/implementation-note";

const TAB_ITEMS = [
  { id: "general", label: "GENERAL", icon: Settings },
  { id: "account", label: "ACCOUNT", icon: User },
  { id: "privacy", label: "PRIVACY", icon: Lock },
  { id: "billing", label: "BILLING", icon: CreditCard },
] as const;

export default function SettingsPageTemplate() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <SettingsHeader />

        {/* Tabs Container */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab Navigation - Terminal Style */}
          <div className="border-border bg-card border">
            <div className="border-border border-b px-4 py-2">
              <span className="text-muted-foreground font-mono text-xs">
                [ [0x00] SETTINGS_NAVIGATION ]
              </span>
            </div>
            <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
              {TAB_ITEMS.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 rounded-none border-r px-4 py-2 font-mono text-xs"
                >
                  <tab.icon className="h-3 w-3" />[{tab.label}]
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>

          <TabsContent value="account">
            <AccountTab />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacyTab />
          </TabsContent>

          <TabsContent value="billing">
            <BillingTab />
          </TabsContent>
        </Tabs>

        {/* Implementation Note */}
        <ImplementationNote />
      </div>
    </div>
  );
}
