/**
 * ✅ COMPONENT
 * - File Size: ✓ (< 250 lines)
 * - Type Safety: ✓
 * - Alias Imports: ✓
 */

"use client";

import { ApiKeysSection } from "@/components/account/api-keys-section";
import { BillingSection } from "@/components/account/billing-section";
import { LicenseSection } from "@/components/account/license-section";
import { ProfileForm } from "@/components/account/profile-form";
import { SecurityForm } from "@/components/account/security-form";
import { SessionsSection } from "@/components/account/sessions-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Award, CreditCard, Key, Monitor, Shield, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      value: "profile",
      label: "Profile",
      icon: User,
      description: "Manage your personal information",
    },
    {
      value: "security",
      label: "Security",
      icon: Shield,
      description: "Password and two-factor authentication",
    },
    {
      value: "license",
      label: "License",
      icon: Award,
      description: "License key and download access",
    },
    {
      value: "billing",
      label: "Billing",
      icon: CreditCard,
      description: "Subscription and payment methods",
    },
    {
      value: "api-keys",
      label: "API Keys",
      icon: Key,
      description: "Manage your API access",
    },
    {
      value: "sessions",
      label: "Sessions",
      icon: Monitor,
      description: "Active sessions and devices",
    },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Account Settings</h1>
        <p className="mt-2 text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid h-auto w-full max-w-4xl grid-cols-6 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex flex-col items-center gap-2 px-3 py-3 data-[state=active]:bg-background",
                  "transition-colors hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TabsContent value="profile" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details and profile picture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <SecurityForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="license" className="mt-0 space-y-4">
              <LicenseSection />
            </TabsContent>

            <TabsContent value="billing" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>
                    Manage your subscription plan and payment methods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BillingSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api-keys" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Create and manage API keys for programmatic access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ApiKeysSection />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="mt-0 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    View and manage your active sessions across devices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SessionsSection />
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={cn(
                        "flex w-full items-start gap-4 rounded-lg p-6 text-left transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        activeTab === tab.value && "bg-accent"
                      )}
                    >
                      <Icon className="mt-0.5 size-5" />
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">{tab.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {tab.description}
                        </p>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <span className="text-sm font-medium">Pro</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-primary text-sm font-medium">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Member Since
                  </span>
                  <span className="text-sm font-medium">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Storage Used
                  </span>
                  <span className="text-sm font-medium">2.4 GB / 10 GB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Visit our{" "}
                  <Link href="/docs" className="text-primary hover:underline">
                    documentation
                  </Link>{" "}
                  for detailed guides.
                </p>
                <p>
                  Contact{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    support
                  </a>{" "}
                  for assistance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
