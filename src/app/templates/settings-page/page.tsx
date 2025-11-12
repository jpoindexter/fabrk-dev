/**
 * Settings Page Template
 * Complete settings interface with all preference forms
 */

"use client";

import { useState } from "react";
import { AppearanceForm } from "@/components/settings/appearance-form";
import { DangerZone } from "@/components/settings/danger-zone";
import { DataExportSection } from "@/components/settings/data-export";
import { LanguageForm } from "@/components/settings/language-form";
import { NotificationsForm } from "@/components/settings/notifications-form";
import { PrivacyForm } from "@/components/settings/privacy-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Bell,
  Download,
  Globe,
  Lock,
  Palette,
  User,
  CreditCard,
  Shield,
  Settings,
} from "lucide-react";

export default function SettingsPageTemplate() {
  const [activeTab, setActiveTab] = useState("general");

  // Settings sections organized by category
  const generalSections = [
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize the look and feel of the application",
      icon: Palette,
      component: AppearanceForm,
    },
    {
      id: "language",
      title: "Language & Region",
      description: "Set your preferred language and regional settings",
      icon: Globe,
      component: LanguageForm,
    },
  ];

  const privacySections = [
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
      component: NotificationsForm,
    },
    {
      id: "privacy",
      title: "Privacy",
      description: "Control your data sharing and privacy settings",
      icon: Lock,
      component: PrivacyForm,
    },
    {
      id: "data-export",
      title: "Data Export",
      description: "Download a copy of your data",
      icon: Download,
      component: DataExportSection,
    },
  ];

  const dangerSections = [
    {
      id: "danger-zone",
      title: "Danger Zone",
      description: "Irreversible and destructive actions",
      icon: AlertTriangle,
      component: DangerZone,
      isDanger: true,
    },
  ];

  const renderSections = (sections: typeof generalSections) => {
    return sections.map((section, index) => {
      const Icon = section.icon;
      const Component = section.component;

      return (
        <div key={section.id}>
          {index > 0 && <Separator className="mb-8" />}
          <Card className={section.isDanger ? "border-2 border-destructive" : ""}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-lg border-2 border-brutal p-3 ${
                    section.isDanger ? "bg-destructive/10" : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      section.isDanger ? "text-destructive" : "text-primary"
                    }`}
                  />
                </div>
                <div>
                  <CardTitle className="font-bold">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Component />
            </CardContent>
          </Card>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b-2 border-brutal bg-card">
        <div className="container mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground text-lg">
            Manage your application preferences and account settings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="general" className="font-bold">
              <Settings className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="account" className="font-bold">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="privacy" className="font-bold">
              <Lock className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="font-bold">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-8">
            {renderSections(generalSections)}

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">Quick Actions</CardTitle>
                    <CardDescription>
                      Frequently used settings and shortcuts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="justify-start font-bold">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </Button>
                  <Button variant="outline" className="justify-start font-bold">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing Settings
                  </Button>
                  <Button variant="outline" className="justify-start font-bold">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="justify-start font-bold">
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and profile settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full rounded-md border-2 border-brutal bg-background px-4 py-2 font-bold shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full rounded-md border-2 border-brutal bg-background px-4 py-2 font-bold shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Inc."
                      className="w-full rounded-md border-2 border-brutal bg-background px-4 py-2 font-bold shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">
                      Job Title
                    </label>
                    <input
                      type="text"
                      placeholder="Software Engineer"
                      className="w-full rounded-md border-2 border-brutal bg-background px-4 py-2 font-bold shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    rows={4}
                    className="w-full rounded-md border-2 border-brutal bg-background px-4 py-2 font-bold shadow-brutal focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="font-bold">
                    Cancel
                  </Button>
                  <Button className="font-bold">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">Account Security</CardTitle>
                    <CardDescription>
                      Manage password and authentication methods
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border-2 border-brutal bg-muted p-4">
                  <div>
                    <p className="font-bold">Password</p>
                    <p className="text-sm text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button variant="outline" className="font-bold">
                    Change Password
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border-2 border-brutal bg-muted p-4">
                  <div>
                    <p className="font-bold">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" className="font-bold">
                    Enable 2FA
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border-2 border-brutal bg-muted p-4">
                  <div>
                    <p className="font-bold">Active Sessions</p>
                    <p className="text-sm text-muted-foreground">
                      Manage devices and sessions
                    </p>
                  </div>
                  <Button variant="outline" className="font-bold">
                    View Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-8">
            {renderSections(privacySections)}
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">
                      Subscription & Billing
                    </CardTitle>
                    <CardDescription>
                      Manage your subscription plan and payment methods
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border-2 border-brutal bg-primary/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-muted-foreground">
                        Current Plan
                      </p>
                      <p className="text-3xl font-bold">Pro</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-muted-foreground">
                        Billing Cycle
                      </p>
                      <p className="text-xl font-bold">$29/month</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 font-bold">
                      Change Plan
                    </Button>
                    <Button variant="outline" className="flex-1 font-bold">
                      View Invoices
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-bold">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border-2 border-brutal bg-muted p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded border-2 border-brutal bg-background font-bold">
                          💳
                        </div>
                        <div>
                          <p className="font-bold">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2025
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="font-bold">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-bold text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full font-bold">
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {renderSections(dangerSections)}
          </TabsContent>
        </Tabs>

        {/* Implementation Note */}
        <Card className="mt-8 border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-bold">⚙️ Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-bold">✓ 4-tab navigation (General, Account, Privacy, Billing)</li>
              <li className="font-bold">✓ Appearance settings (theme, font size, layout)</li>
              <li className="font-bold">✓ Notification preferences (email, push, in-app)</li>
              <li className="font-bold">✓ Privacy controls (data sharing, cookies, analytics)</li>
              <li className="font-bold">✓ Language & region settings</li>
              <li className="font-bold">✓ Data export functionality</li>
              <li className="font-bold">✓ Account profile form (name, email, company, bio)</li>
              <li className="font-bold">✓ Security settings (password, 2FA, sessions)</li>
              <li className="font-bold">✓ Subscription management (plan, billing cycle)</li>
              <li className="font-bold">✓ Payment methods management</li>
              <li className="font-bold">✓ Danger zone (account deletion)</li>
              <li className="font-bold">✓ Quick actions shortcuts</li>
            </ul>
            <p className="mt-4 text-sm font-bold text-muted-foreground">
              All form components are located in{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                src/components/settings/
              </code>
              . Connect to your API for save functionality.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
