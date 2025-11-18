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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DemoNav } from "@/components/demo/demo-nav";
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
      isDanger: false,
    },
    {
      id: "language",
      title: "Language & Region",
      description: "Set your preferred language and regional settings",
      icon: Globe,
      component: LanguageForm,
      isDanger: false,
    },
  ];

  const privacySections = [
    {
      id: "notifications",
      title: "Notifications",
      description: "Manage your notification preferences",
      icon: Bell,
      component: NotificationsForm,
      isDanger: false,
    },
    {
      id: "privacy",
      title: "Privacy",
      description: "Control your data sharing and privacy settings",
      icon: Lock,
      component: PrivacyForm,
      isDanger: false,
    },
    {
      id: "data-export",
      title: "Data Export",
      description: "Download a copy of your data",
      icon: Download,
      component: DataExportSection,
      isDanger: false,
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
          <Card className={section.isDanger ? "border border-destructive" : ""}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-lg border border-border p-3 ${
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
                  <CardTitle className="font-semibold">{section.title}</CardTitle>
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
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/demo" />

      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="general" className="font-semibold">
              <Settings className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="account" className="font-semibold">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="privacy" className="font-semibold">
              <Lock className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="font-semibold">
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
                  <div className="rounded-lg border border-border bg-primary/10 p-3">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold">Quick Actions</CardTitle>
                    <CardDescription>
                      Frequently used settings and shortcuts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" className="justify-start font-semibold">
                    <Shield className="mr-2 h-4 w-4" />
                    Security Settings
                  </Button>
                  <Button variant="outline" className="justify-start font-semibold">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing Settings
                  </Button>
                  <Button variant="outline" className="justify-start font-semibold">
                    <Bell className="mr-2 h-4 w-4" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="justify-start font-semibold">
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
                  <div className="rounded-lg border border-border bg-primary/10 p-3">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold">Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details and profile settings
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullname" className="font-semibold">
                      Full Name
                    </Label>
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-semibold">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-semibold">
                      Company
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Acme Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobtitle" className="font-semibold">
                      Job Title
                    </Label>
                    <Input
                      id="jobtitle"
                      type="text"
                      placeholder="Software Engineer"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-semibold">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="font-semibold">
                    Cancel
                  </Button>
                  <Button className="font-semibold">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border border-border bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold">Account Security</CardTitle>
                    <CardDescription>
                      Manage password and authentication methods
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-4">
                  <div>
                    <p className="font-semibold">Password</p>
                    <p className="text-sm text-muted-foreground">
                      Last changed 3 months ago
                    </p>
                  </div>
                  <Button variant="outline" className="font-semibold">
                    Change Password
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-4">
                  <div>
                    <p className="font-semibold">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <Button variant="outline" className="font-semibold">
                    Enable 2FA
                  </Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-4">
                  <div>
                    <p className="font-semibold">Active Sessions</p>
                    <p className="text-sm text-muted-foreground">
                      Manage devices and sessions
                    </p>
                  </div>
                  <Button variant="outline" className="font-semibold">
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
                  <div className="rounded-lg border border-border bg-primary/10 p-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-semibold">
                      Subscription & Billing
                    </CardTitle>
                    <CardDescription>
                      Manage your subscription plan and payment methods
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-border bg-primary/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">
                        Current Plan
                      </p>
                      <p className="text-3xl font-semibold">Pro</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-muted-foreground">
                        Billing Cycle
                      </p>
                      <p className="text-xl font-semibold">$29/month</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 font-semibold">
                      Change Plan
                    </Button>
                    <Button variant="outline" className="flex-1 font-semibold">
                      View Invoices
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-muted p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded border border-border bg-background font-semibold">
                          💳
                        </div>
                        <div>
                          <p className="font-semibold">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2025
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="font-semibold">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="font-semibold text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full font-semibold">
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
        <Card className="mt-8 border border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-semibold">⚙️ Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-semibold">✓ 4-tab navigation (General, Account, Privacy, Billing)</li>
              <li className="font-semibold">✓ Appearance settings (theme, font size, layout)</li>
              <li className="font-semibold">✓ Notification preferences (email, push, in-app)</li>
              <li className="font-semibold">✓ Privacy controls (data sharing, cookies, analytics)</li>
              <li className="font-semibold">✓ Language & region settings</li>
              <li className="font-semibold">✓ Data export functionality</li>
              <li className="font-semibold">✓ Account profile form (name, email, company, bio)</li>
              <li className="font-semibold">✓ Security settings (password, 2FA, sessions)</li>
              <li className="font-semibold">✓ Subscription management (plan, billing cycle)</li>
              <li className="font-semibold">✓ Payment methods management</li>
              <li className="font-semibold">✓ Danger zone (account deletion)</li>
              <li className="font-semibold">✓ Quick actions shortcuts</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">
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
