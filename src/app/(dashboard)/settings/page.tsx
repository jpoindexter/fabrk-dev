/**
 * ✅ COMPONENT
 * - File Size: ✓ (< 250 lines)
 * - Type Safety: ✓
 * - Alias Imports: ✓
 */

"use client";

import { AppearanceForm } from "@/components/settings/appearance-form";
import { DangerZone } from "@/components/settings/danger-zone";
import { DataExportSection } from "@/components/settings/data-export";
import { LanguageForm } from "@/components/settings/language-form";
import { NotificationsForm } from "@/components/settings/notifications-form";
import { PrivacyForm } from "@/components/settings/privacy-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Bell, Download, Globe, Lock, Palette } from "lucide-react";

export default function SettingsPage() {
  const sections = [
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize the look and feel of the application",
      icon: Palette,
      component: AppearanceForm,
    },
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
      id: "language",
      title: "Language & Region",
      description: "Set your preferred language and regional settings",
      icon: Globe,
      component: LanguageForm,
    },
    {
      id: "data-export",
      title: "Data Export",
      description: "Download a copy of your data",
      icon: Download,
      component: DataExportSection,
    },
    {
      id: "danger-zone",
      title: "Danger Zone",
      description: "Irreversible and destructive actions",
      icon: AlertTriangle,
      component: DangerZone,
      isDanger: true,
    },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your application preferences and settings
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const Component = section.component;

          return (
            <div key={section.id}>
              {index > 0 && <Separator className="mb-8" />}
              <Card className={section.isDanger ? "border-destructive/50" : ""}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg p-2 ${
                        section.isDanger ? "bg-destructive/10" : "bg-primary/10"
                      }`}
                    >
                      <Icon
                        className={`size-5 ${
                          section.isDanger ? "text-destructive" : "text-primary"
                        }`}
                      />
                    </div>
                    <div>
                      <CardTitle>{section.title}</CardTitle>
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
        })}
      </div>
    </div>
  );
}
