/**
 * ✅ FABRK COMPONENT
 * Security & Privacy Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StyledTabs, StyledTabsContent } from "@/components/ui/styled-tabs";
import { Shield, Lock, Activity, FileText, Settings } from "lucide-react";
import { TemplatePageHeader } from "@/components/ui/card";
import { SecurityScore } from "./components/security-score";
import { SecurityTab } from "./components/security-tab";
import { PrivacyTab } from "./components/privacy-tab";
import { AuditTab } from "./components/audit-tab";
import { ComplianceTab } from "./components/compliance-tab";
import { ImplementationNote } from "./components/implementation-note";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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
    {
      id: "log_001",
      action: "Password changed",
      timestamp: "2024-11-10 14:23",
      ip: "192.168.1.1",
      status: "success" as const,
    },
    {
      id: "log_002",
      action: "Login",
      timestamp: "2024-11-09 09:15",
      ip: "192.168.1.1",
      status: "success" as const,
    },
    {
      id: "log_003",
      action: "Failed login attempt",
      timestamp: "2024-11-08 22:45",
      ip: "203.0.113.0",
      status: "failed" as const,
    },
    {
      id: "log_004",
      action: "OAuth connected (Google)",
      timestamp: "2024-11-05 16:30",
      ip: "192.168.1.1",
      status: "success" as const,
    },
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

  const tabs = [
    { id: "security", label: "SECURITY", icon: Shield },
    { id: "privacy", label: "PRIVACY", icon: Lock },
    { id: "audit", label: "AUDIT_LOG", icon: Activity },
    { id: "compliance", label: "COMPLIANCE", icon: FileText },
  ];

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEnable2FA = () => {
    toast.info("[2FA]: Setup modal would open here with QR code");
  };

  const handleRevokeSession = (_sessionId: string) => {
    toast.success("[SESSION]: Revoked successfully");
  };

  const handleExportData = () => {
    toast.success("[EXPORT]: Data export started. Check email when ready.");
  };

  const handleRequestAccess = () => {
    toast.success("[ACCESS_REPORT]: Request submitted. You will receive a report within 30 days.");
  };

  const handleViewPolicy = (type: "privacy" | "terms") => {
    toast.info(
      `[${type.toUpperCase()}]: Opening ${type === "privacy" ? "Privacy Policy" : "Terms of Service"}...`
    );
  };

  const handleDeleteAccount = () => {
    toast.success("[DELETE]: Account deletion initiated. Check email for confirmation.");
  };

  return (
    <div>
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl space-y-6 px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <TemplatePageHeader
            badge="SECURITY_PRIVACY"
            title="Security & Privacy"
            description="Manage your account security, privacy settings, and data controls"
          />
          <Button className={cn(mode.radius, mode.font, "text-xs")}>
            <Settings className="mr-2 h-4 w-4" />
            &gt; VIEW_AUDIT_LOG
          </Button>
        </div>

        {/* Security Score */}
        <SecurityScore user={securityData.user} />

        {/* Tab Navigation */}
        <StyledTabs
          code="0x00"
          title="SECURITY_NAVIGATION"
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        >
          {/* Tab Contents */}
          <StyledTabsContent value="security">
            <SecurityTab
              twoFactorEnabled={securityData.user.twoFactorEnabled}
              lastPasswordChange={securityData.user.lastPasswordChange}
              activeSessions={securityData.activeSessions}
              onEnable2FA={handleEnable2FA}
              onRevokeSession={handleRevokeSession}
            />
          </StyledTabsContent>

          <StyledTabsContent value="privacy">
            <PrivacyTab privacy={privacy} onToggle={handlePrivacyToggle} />
          </StyledTabsContent>

          <StyledTabsContent value="audit">
            <AuditTab auditLog={securityData.auditLog} />
          </StyledTabsContent>

          <StyledTabsContent value="compliance">
            <ComplianceTab
              onExportData={handleExportData}
              onRequestAccess={handleRequestAccess}
              onViewPolicy={handleViewPolicy}
              onDeleteAccount={handleDeleteAccount}
            />
          </StyledTabsContent>
        </StyledTabs>

        {/* Implementation Note */}
        <ImplementationNote />
      </div>
    </div>
  );
}
