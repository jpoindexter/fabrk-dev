/**
 * ✅ FABRK COMPONENT
 * Security & Privacy Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Shield, Lock, Activity, FileText, Settings } from "lucide-react";
import { SecurityScore } from "./components/security-score";
import { SecurityTab } from "./components/security-tab";
import { PrivacyTab } from "./components/privacy-tab";
import { AuditTab } from "./components/audit-tab";
import { ComplianceTab } from "./components/compliance-tab";
import { ImplementationNote } from "./components/implementation-note";

// Mock data
const securityData = {
  user: {
    email: "john@example.com",
    emailVerified: true,
    twoFactorEnabled: false,
    lastPasswordChange: "2024-09-15",
  },
  connectedAccounts: [
    { provider: "google", accountId: "john@gmail.com", connectedAt: "2024-01-15" },
  ],
  activeSessions: [
    {
      id: "sess_001",
      device: "Chrome on macOS",
      location: "San Francisco, CA",
      ip: "192.168.1.1",
      lastActive: "Just now",
      isCurrent: true,
    },
    {
      id: "sess_002",
      device: "Safari on iPhone",
      location: "San Francisco, CA",
      ip: "192.168.1.100",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
  ],
  auditLog: [
    { id: "log_001", action: "Password changed", timestamp: "2024-11-10 14:23", ip: "192.168.1.1", status: "success" as const },
    { id: "log_002", action: "Login", timestamp: "2024-11-09 09:15", ip: "192.168.1.1", status: "success" as const },
    { id: "log_003", action: "Failed login attempt", timestamp: "2024-11-08 22:45", ip: "203.0.113.0", status: "failed" as const },
    { id: "log_004", action: "OAuth connected (Google)", timestamp: "2024-11-05 16:30", ip: "192.168.1.1", status: "success" as const },
  ],
};

const privacySettings = {
  profileVisibility: true,
  activityTracking: false,
  analyticsSharing: false,
  searchIndexing: true,
  dataRetention: true,
  marketingEmails: false,
  productUpdates: true,
  cookiesEssential: true,
  cookiesAnalytics: false,
  cookiesMarketing: false,
};

export default function SecurityPrivacyTemplate() {
  const [activeTab, setActiveTab] = useState("security");
  const [privacy, setPrivacy] = useState(privacySettings);

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEnable2FA = () => {
    toast.info("[2FA]: Setup modal would open here with QR code");
  };

  const handleRevokeSession = (sessionId: string) => {
    toast.success("[SESSION]: Revoked successfully");
  };

  const handleExportData = () => {
    toast.success("[EXPORT]: Data export started. Check email when ready.");
  };

  const handleRequestAccess = () => {
    toast.success("[ACCESS_REPORT]: Request submitted. You will receive a report within 30 days.");
  };

  const handleViewPolicy = (type: "privacy" | "terms") => {
    toast.info(`[${type.toUpperCase()}]: Opening ${type === "privacy" ? "Privacy Policy" : "Terms of Service"}...`);
  };

  const handleDeleteAccount = () => {
    toast.success("[DELETE]: Account deletion initiated. Check email for confirmation.");
  };

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-4 py-1">
              <span className="font-mono text-xs text-muted-foreground">[TEMPLATE]: SECURITY_PRIVACY</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Security & Privacy
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              Manage your account security, privacy settings, and data controls
            </p>
          </div>
          <Button className="rounded-none font-mono text-xs">
            <Settings className="mr-2 h-4 w-4" />
            &gt; VIEW_AUDIT_LOG
          </Button>
        </div>

        {/* Security Score */}
        <SecurityScore user={securityData.user} />

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-2">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">security_nav.tsx</span>
            </div>
            <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto">
              {([
                { id: "security", label: "SECURITY", icon: Shield },
                { id: "privacy", label: "PRIVACY", icon: Lock },
                { id: "audit", label: "AUDIT_LOG", icon: Activity },
                { id: "compliance", label: "COMPLIANCE", icon: FileText },
              ]).map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-2 border-r border-border rounded-none font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-muted data-[state=inactive]:hover:text-foreground"
                >
                  <tab.icon className="h-3 w-3" />
                  [{tab.label}]
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Contents */}
          <TabsContent value="security" className="mt-6">
            <SecurityTab
              twoFactorEnabled={securityData.user.twoFactorEnabled}
              lastPasswordChange={securityData.user.lastPasswordChange}
              activeSessions={securityData.activeSessions}
              onEnable2FA={handleEnable2FA}
              onRevokeSession={handleRevokeSession}
            />
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <PrivacyTab privacy={privacy} onToggle={handlePrivacyToggle} />
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AuditTab auditLog={securityData.auditLog} />
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <ComplianceTab
              onExportData={handleExportData}
              onRequestAccess={handleRequestAccess}
              onViewPolicy={handleViewPolicy}
              onDeleteAccount={handleDeleteAccount}
            />
          </TabsContent>
        </Tabs>

        {/* Implementation Note */}
        <ImplementationNote />
      </div>
    </div>
  );
}
