/**
 * Settings Page Template - Terminal console style
 * Industry-standard Preview/Code tabbed interface
 */
'use client';

import { useState } from 'react';
import { Settings, User, Lock, CreditCard } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  TemplatePageHeader,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';
import { StyledTabs, StyledTabsContent } from '@/components/ui/styled-tabs';
import { SettingsHeader } from './components/settings-header';
import { GeneralTab } from './components/general-tab';
import { AccountTab } from './components/account-tab';
import { PrivacyTab } from './components/privacy-tab';
import { BillingTab } from './components/billing-tab';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';

const templateCode = `"use client";

import { useState } from "react";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { Settings, User, Lock, CreditCard } from "lucide-react";
import { SettingsHeader } from "./components/settings-header";
import { GeneralTab } from "./components/general-tab";
import { AccountTab } from "./components/account-tab";
import { PrivacyTab } from "./components/privacy-tab";
import { BillingTab } from "./components/billing-tab";

const tabs = [
  { id: "general", label: "GENERAL", icon: Settings },
  { id: "account", label: "ACCOUNT", icon: User },
  { id: "privacy", label: "PRIVACY", icon: Lock },
  { id: "billing", label: "BILLING", icon: CreditCard },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
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
    </div>
  );
}`;

const tabs = [
  { id: 'general', label: 'GENERAL', icon: Settings },
  { id: 'account', label: 'ACCOUNT', icon: User },
  { id: 'privacy', label: 'PRIVACY', icon: Lock },
  { id: 'billing', label: 'BILLING', icon: CreditCard },
];

function SettingsPreview() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="bg-background/50 min-h-[600px] p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl space-y-6">
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
      </div>
    </div>
  );
}

export default function SettingsPageTemplate() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="container mx-auto max-w-7xl space-y-6 overflow-hidden px-6 py-8">
        {/* Header */}
        <TemplatePageHeader
          badge="SETTINGS_PAGE"
          title="Settings Page"
          description="Multi-tab settings interface with general, account, privacy, and billing sections"
        />

        {/* Preview/Code Tabs */}
        <Tabs defaultValue="preview" className="w-full min-w-0 overflow-hidden">
          {/* Tab Navigation Card */}
          <Card>
            <CardHeader code="0x00" title="TEMPLATE_PREVIEW" />
            <div className="flex items-center justify-between">
              <TabsList
                className={cn(
                  'h-auto w-auto justify-start gap-0 border-0 bg-transparent p-0',
                  mode.radius
                )}
              >
                <TabsTrigger
                  value="preview"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [PREVIEW]
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className={cn(
                    'border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground flex items-center gap-2 border-r px-4 py-2 text-xs',
                    mode.radius,
                    mode.font
                  )}
                >
                  [CODE]
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>

          {/* Preview Tab Content */}
          <TabsContent value="preview" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="LIVE_PREVIEW" />
              <SettingsPreview />
            </Card>
          </TabsContent>

          {/* Code Tab Content */}
          <TabsContent value="code" className="mt-6 w-full max-w-full">
            <Card className="overflow-hidden">
              <CardHeader code="0x01" title="SOURCE_CODE" />
              <div className="w-full max-w-full overflow-x-auto p-4">
                <CodeBlock
                  code={templateCode}
                  language="tsx"
                  maxHeight="600px"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* File Structure */}
        <Card>
          <CardHeader code="0x02" title="FILE_STRUCTURE" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-1 text-xs')}>
              <div className="text-muted-foreground">[FILES]:</div>
              <div className="space-y-1 pl-4">
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">(dashboard)/</span>
                  <span className="text-foreground">settings/page.tsx</span>
                  <span className="text-muted-foreground ml-4">
                    ← Copy template here
                  </span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">
                    (dashboard)/settings/components/
                  </span>
                  <span className="text-foreground">settings-header.tsx</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">
                    (dashboard)/settings/components/
                  </span>
                  <span className="text-foreground">general-tab.tsx</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">
                    (dashboard)/settings/components/
                  </span>
                  <span className="text-foreground">account-tab.tsx</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">
                    (dashboard)/settings/components/
                  </span>
                  <span className="text-foreground">privacy-tab.tsx</span>
                </div>
                <div>
                  <span className="text-primary">app/</span>
                  <span className="text-muted-foreground">
                    (dashboard)/settings/components/
                  </span>
                  <span className="text-foreground">billing-tab.tsx</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader code="0x03" title="FEATURES" />
          <CardContent padding="md">
            <div className={cn(mode.font, 'space-y-2 text-xs')}>
              <div>
                <span className="text-success">&gt;</span> 4-tab navigation
                (General, Account, Privacy, Billing)
              </div>
              <div>
                <span className="text-success">&gt;</span> Appearance settings
                (theme, font size, layout)
              </div>
              <div>
                <span className="text-success">&gt;</span> Notification
                preferences (email, push, in-app)
              </div>
              <div>
                <span className="text-success">&gt;</span> Privacy controls
                (data sharing, cookies, analytics)
              </div>
              <div>
                <span className="text-success">&gt;</span> Language & region
                settings
              </div>
              <div>
                <span className="text-success">&gt;</span> Account security
                (password, 2FA, sessions)
              </div>
              <div>
                <span className="text-success">&gt;</span> Responsive
                mobile-first design
              </div>
              <div>
                <span className="text-success">&gt;</span> DS-compliant
                (mode.font, mode.radius)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
