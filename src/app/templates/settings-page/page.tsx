/**
 * ✅ FABRK COMPONENT
 * Settings Page Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { AppearanceForm } from "@/components/settings/appearance-form";
import { DangerZone } from "@/components/settings/danger-zone";
import { DataExportSection } from "@/components/settings/data-export";
import { NotificationsForm } from "@/components/settings/notifications-form";
import { PrivacyForm } from "@/components/settings/privacy-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DemoNav } from "@/components/demo/demo-nav";
import { Footer } from "@/components/landing/footer";
import {
  AlertTriangle,
  Bell,
  Download,
  Lock,
  Palette,
  User,
  CreditCard,
  Shield,
  Settings,
} from "lucide-react";

export default function SettingsPageTemplate() {
  const [activeTab, setActiveTab] = useState<"general" | "account" | "privacy" | "billing">("general");

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Navigation */}
      <DemoNav backButtonText="Back" backButtonHref="/templates" />

      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: SETTINGS_PAGE</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
            <p className="font-mono text-sm text-muted-foreground">
              Manage your account settings, preferences, and billing
            </p>
          </div>
        </div>

        {/* Tab Navigation - Terminal Style */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">settings_nav.tsx</span>
          </div>
          <div className="flex border-b border-border font-mono text-xs">
            {([
              { id: "general" as const, label: "GENERAL", icon: Settings },
              { id: "account" as const, label: "ACCOUNT", icon: User },
              { id: "privacy" as const, label: "PRIVACY", icon: Lock },
              { id: "billing" as const, label: "BILLING", icon: CreditCard },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-r border-border transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <tab.icon className="h-3 w-3" />
                [{tab.label}]
              </button>
            ))}
          </div>
        </div>

        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-6">
            {/* Appearance Section */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">appearance.config</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[APPEARANCE]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Customize the look and feel of the application</div>
                  </div>
                </div>
                <AppearanceForm />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">quick_actions.tsx</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[QUICK_ACTIONS]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Frequently used settings and shortcuts</div>
                  </div>
                </div>
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
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">profile.json</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[PROFILE_INFORMATION]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Update your personal details and profile settings</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="rounded-none font-mono text-xs">[FULL_NAME]:</Label>
                      <Input id="fullname" type="text" placeholder="Enter your full name" className="rounded-none font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="rounded-none font-mono text-xs">[EMAIL]:</Label>
                      <Input id="email" type="email" placeholder="you@example.com" className="rounded-none font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="rounded-none font-mono text-xs">[COMPANY]:</Label>
                      <Input id="company" type="text" placeholder="Your company name" className="rounded-none font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobtitle" className="rounded-none font-mono text-xs">[JOB_TITLE]:</Label>
                      <Input id="jobtitle" type="text" placeholder="Software Engineer" className="rounded-none font-mono text-xs" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="rounded-none font-mono text-xs">[BIO]:</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} className="rounded-none font-mono text-xs" />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" className="rounded-none font-mono text-xs">&gt; CANCEL</Button>
                    <Button className="rounded-none font-mono text-xs">&gt; SAVE_CHANGES</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">security.config</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[ACCOUNT_SECURITY]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Manage password and authentication methods</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border border-border p-4 font-mono text-xs">
                    <div>
                      <div>[PASSWORD]:</div>
                      <div className="text-muted-foreground">Last changed 3 months ago</div>
                    </div>
                    <Button variant="outline" className="rounded-none font-mono text-xs">&gt; CHANGE</Button>
                  </div>
                  <div className="flex items-center justify-between border border-border p-4 font-mono text-xs">
                    <div>
                      <div>[TWO_FACTOR_AUTH]:</div>
                      <div className="text-muted-foreground">Add an extra layer of security</div>
                    </div>
                    <Button variant="outline" className="rounded-none font-mono text-xs">&gt; ENABLE</Button>
                  </div>
                  <div className="flex items-center justify-between border border-border p-4 font-mono text-xs">
                    <div>
                      <div>[ACTIVE_SESSIONS]:</div>
                      <div className="text-muted-foreground">Manage devices and sessions</div>
                    </div>
                    <Button variant="outline" className="rounded-none font-mono text-xs">&gt; VIEW</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            {/* Notifications */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">notifications.config</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[NOTIFICATIONS]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Manage your notification preferences</div>
                  </div>
                </div>
                <NotificationsForm />
              </div>
            </div>

            {/* Privacy */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">privacy.config</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[PRIVACY]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Control your data sharing and privacy settings</div>
                  </div>
                </div>
                <PrivacyForm />
              </div>
            </div>

            {/* Data Export */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">data_export.tsx</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[DATA_EXPORT]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Download a copy of your data</div>
                  </div>
                </div>
                <DataExportSection />
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === "billing" && (
          <div className="space-y-6">
            {/* Subscription */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">subscription.json</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[SUBSCRIPTION_BILLING]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Manage your subscription plan and payment methods</div>
                  </div>
                </div>
                <div className="border border-border p-4 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">[CURRENT_PLAN]:</div>
                      <div className="text-2xl font-bold">Pro</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-muted-foreground">[BILLING_CYCLE]:</div>
                      <div className="text-xl font-bold">$29/month</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-none flex-1 font-mono text-xs">&gt; CHANGE_PLAN</Button>
                    <Button variant="outline" className="rounded-none flex-1 font-mono text-xs">&gt; VIEW_INVOICES</Button>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-3">[PAYMENT_METHODS]:</div>
                  <div className="text-center py-4 font-mono text-xs text-muted-foreground border border-border">
                    No payment methods added yet. Use Stripe Customer Portal to manage payment methods.
                  </div>
                  <Button variant="outline" className="rounded-none w-full mt-3 font-mono text-xs">
                    &gt; ADD_PAYMENT_METHOD
                  </Button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-destructive bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">danger_zone.tsx</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-destructive/10">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[DANGER_ZONE]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Irreversible and destructive actions</div>
                  </div>
                </div>
                <DangerZone />
              </div>
            </div>
          </div>
        )}

        {/* Implementation Note */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">features.md</span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">[TEMPLATE_FEATURES]:</div>
            <div className="space-y-1.5 font-mono text-xs">
              <div><span className="text-success">&gt;</span> 4-tab navigation (General, Account, Privacy, Billing)</div>
              <div><span className="text-success">&gt;</span> Appearance settings (theme, font size, layout)</div>
              <div><span className="text-success">&gt;</span> Notification preferences (email, push, in-app)</div>
              <div><span className="text-success">&gt;</span> Privacy controls (data sharing, cookies, analytics)</div>
              <div><span className="text-success">&gt;</span> Data export functionality</div>
              <div><span className="text-success">&gt;</span> Account profile form (name, email, company, bio)</div>
              <div><span className="text-success">&gt;</span> Security settings (password, 2FA, sessions)</div>
              <div><span className="text-success">&gt;</span> Subscription management (plan, billing cycle)</div>
              <div><span className="text-success">&gt;</span> Payment methods management</div>
              <div><span className="text-success">&gt;</span> Danger zone (account deletion)</div>
              <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Form components in src/components/settings/. Connect to your API for save functionality.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
