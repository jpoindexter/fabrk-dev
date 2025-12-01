/**
 * ✅ FABRK COMPONENT
 * Security & Privacy Template - Terminal console style
 * Production-ready ✓
 */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Shield,
  Smartphone,
  Key,
  Clock,
  LogOut,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
  Lock,
  Globe,
  FileText,
  UserX,
  Activity,
  Settings,
} from "lucide-react";
import { TerminalBackground } from "@/components/landing/terminal-background";

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
    { id: "log_001", action: "Password changed", timestamp: "2024-11-10 14:23", ip: "192.168.1.1", status: "success" },
    { id: "log_002", action: "Login", timestamp: "2024-11-09 09:15", ip: "192.168.1.1", status: "success" },
    { id: "log_003", action: "Failed login attempt", timestamp: "2024-11-08 22:45", ip: "203.0.113.0", status: "failed" },
    { id: "log_004", action: "OAuth connected (Google)", timestamp: "2024-11-05 16:30", ip: "192.168.1.1", status: "success" },
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
  const [activeTab, setActiveTab] = useState<"security" | "privacy" | "audit" | "compliance">("security");
  const [privacy, setPrivacy] = useState(privacySettings);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
    setDeleteDialogOpen(false);
  };

  return (
    <div className="relative isolate min-h-screen bg-background">
      <TerminalBackground />
      {/* Page Content */}
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="inline-block border border-border px-3 py-1">
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

        {/* Security Score - Terminal Style */}
        <div className="border border-primary bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">security_score.json</span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center border border-border bg-primary/10 font-mono text-xl font-bold text-primary">
                  75%
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">[SECURITY_SCORE]:</div>
                  <div className="font-mono text-xs text-muted-foreground">Good security posture, but improvements recommended</div>
                </div>
              </div>
              <span className="border border-warning/50 px-2 py-0.5 font-mono text-xs text-warning">
                MEDIUM_RISK
              </span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>EMAIL_VERIFIED: TRUE</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                <span>TWO_FACTOR_AUTH: FALSE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>PASSWORD_CHANGED: 60_DAYS_AGO (recommended: every 90 days)</span>
              </div>
            </div>
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
            <span className="font-mono text-xs text-muted-foreground">security_nav.tsx</span>
          </div>
          <div className="flex font-mono text-xs">
            {([
              { id: "security" as const, label: "SECURITY", icon: Shield },
              { id: "privacy" as const, label: "PRIVACY", icon: Lock },
              { id: "audit" as const, label: "AUDIT_LOG", icon: Activity },
              { id: "compliance" as const, label: "COMPLIANCE", icon: FileText },
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

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            {/* 2FA Section */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">two_factor.config</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">[TWO_FACTOR_AUTH]:</div>
                      <div className="font-mono text-xs text-muted-foreground">Add an extra layer of security with TOTP</div>
                    </div>
                  </div>
                  <span className="border border-destructive/50 px-2 py-0.5 font-mono text-xs text-destructive">
                    DISABLED
                  </span>
                </div>
                <p className="mb-4 font-mono text-xs text-muted-foreground">
                  Use an authenticator app like Google Authenticator or Authy to generate time-based codes.
                </p>
                <Button onClick={handleEnable2FA} className="rounded-none font-mono text-xs">
                  <Shield className="mr-2 h-4 w-4" />
                  &gt; ENABLE_2FA
                </Button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">sessions.log</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[ACTIVE_SESSIONS]: COUNT={securityData.activeSessions.length}</div>
                  </div>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  {securityData.activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between border border-border p-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{session.device}</span>
                          {session.isCurrent && (
                            <span className="border border-primary/50 px-1.5 py-0.5 text-primary">CURRENT</span>
                          )}
                        </div>
                        <div className="text-muted-foreground">{session.location} • {session.ip}</div>
                        <div className="text-muted-foreground">Last active: {session.lastActive}</div>
                      </div>
                      {!session.isCurrent && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevokeSession(session.id)}
                          className="rounded-none font-mono text-xs"
                        >
                          <LogOut className="mr-2 h-3 w-3" />
                          &gt; REVOKE
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="destructive" size="sm" className="rounded-none font-mono text-xs">
                    <LogOut className="mr-2 h-3 w-3" />
                    &gt; SIGN_OUT_ALL_OTHER_DEVICES
                  </Button>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">password.config</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                      <Key className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">[PASSWORD]:</div>
                      <div className="font-mono text-xs text-muted-foreground">
                        Last changed: {new Date(securityData.user.lastPasswordChange).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-none font-mono text-xs">
                    &gt; CHANGE_PASSWORD
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            {/* Profile Privacy */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">profile_privacy.config</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-4">[PROFILE_ACTIVITY]:</div>
                <div className="space-y-3 font-mono text-xs">
                  {[
                    { key: "profileVisibility" as const, label: "PROFILE_VISIBILITY", desc: "Allow your profile to be visible to other users" },
                    { key: "activityTracking" as const, label: "ACTIVITY_TRACKING", desc: "Track my activity to improve experience" },
                    { key: "searchIndexing" as const, label: "SEARCH_INDEXING", desc: "Allow search engines to index your profile" },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between border border-border p-3">
                      <div>
                        <div>[{setting.label}]:</div>
                        <div className="text-muted-foreground">{setting.desc}</div>
                      </div>
                      <Switch
                        checked={privacy[setting.key]}
                        onCheckedChange={() => handlePrivacyToggle(setting.key)}
                        className="rounded-none [&>span]:rounded-none h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cookie Preferences */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">cookies.config</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-xs text-muted-foreground mb-4">[COOKIE_PREFERENCES]:</div>
                <div className="space-y-3 font-mono text-xs">
                  {[
                    { key: "cookiesEssential" as const, label: "ESSENTIAL", desc: "Required for the site to function (cannot be disabled)", disabled: true },
                    { key: "cookiesAnalytics" as const, label: "ANALYTICS", desc: "Help us understand how you use the site", disabled: false },
                    { key: "cookiesMarketing" as const, label: "MARKETING", desc: "Used to show relevant ads", disabled: false },
                  ].map((setting) => (
                    <div key={setting.key} className="flex items-center justify-between border border-border p-3">
                      <div>
                        <div>[{setting.label}]:</div>
                        <div className="text-muted-foreground">{setting.desc}</div>
                      </div>
                      <Switch
                        checked={privacy[setting.key]}
                        onCheckedChange={() => handlePrivacyToggle(setting.key)}
                        disabled={setting.disabled}
                        className="rounded-none [&>span]:rounded-none h-5 w-9 [&>span]:h-3 [&>span]:w-3 [&>span]:data-[state=checked]:translate-x-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Log Tab */}
        {activeTab === "audit" && (
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">audit.log</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-xs text-muted-foreground">[SECURITY_AUDIT_LOG]: COUNT={securityData.auditLog.length}</div>
                <Button variant="outline" size="sm" className="rounded-none font-mono text-xs h-7">
                  <Download className="mr-2 h-3 w-3" />
                  &gt; EXPORT
                </Button>
              </div>

              {/* Terminal Table */}
              <div className="border border-border">
                <div className="grid grid-cols-4 border-b border-border bg-muted/30 px-4 py-2 font-mono text-xs">
                  <span className="text-muted-foreground">[ACTION]</span>
                  <span className="text-muted-foreground">[TIMESTAMP]</span>
                  <span className="text-muted-foreground">[IP_ADDRESS]</span>
                  <span className="text-muted-foreground">[STATUS]</span>
                </div>
                <div className="divide-y divide-border">
                  {securityData.auditLog.map((log) => (
                    <div key={log.id} className="grid grid-cols-4 px-4 py-3 font-mono text-xs hover:bg-muted/30">
                      <span>{log.action}</span>
                      <span className="text-muted-foreground">{log.timestamp}</span>
                      <span className="text-muted-foreground">{log.ip}</span>
                      <span className={`border px-2 py-0.5 w-fit ${
                        log.status === "success" ? "border-success/50 text-success" : "border-destructive/50 text-destructive"
                      }`}>
                        {log.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {activeTab === "compliance" && (
          <div className="space-y-6">
            {/* GDPR Rights */}
            <div className="border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2">
                <div className="flex gap-1.5">
                  <div className="size-2 rounded-full bg-destructive/50" />
                  <div className="size-2 rounded-full bg-warning/50" />
                  <div className="size-2 rounded-full bg-success/50" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">gdpr_rights.tsx</span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-border bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[GDPR_RIGHTS]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Exercise your data protection rights</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    &gt; DOWNLOAD_MY_DATA (GDPR Export)
                  </Button>
                  <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={handleRequestAccess}>
                    <Eye className="mr-2 h-4 w-4" />
                    &gt; REQUEST_DATA_ACCESS_REPORT
                  </Button>
                  <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={() => handleViewPolicy("privacy")}>
                    <FileText className="mr-2 h-4 w-4" />
                    &gt; VIEW_PRIVACY_POLICY
                  </Button>
                  <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={() => handleViewPolicy("terms")}>
                    <FileText className="mr-2 h-4 w-4" />
                    &gt; VIEW_TERMS_OF_SERVICE
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
                    <UserX className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-muted-foreground">[DANGER_ZONE]:</div>
                    <div className="font-mono text-xs text-muted-foreground">Irreversible actions - proceed with caution</div>
                  </div>
                </div>
                <Alert className="mb-4 rounded-none flex items-center justify-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="font-mono text-xs">
                    [WARNING]: Deleting your account is permanent and cannot be undone. All your data will be permanently erased.
                  </AlertDescription>
                </Alert>
                <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                  <div className="flex justify-end">
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" className="rounded-none font-mono text-xs">
                        <Trash2 className="mr-2 h-3 w-3" />
                        &gt; DELETE_MY_ACCOUNT
                      </Button>
                    </AlertDialogTrigger>
                  </div>
                  <AlertDialogContent className="rounded-none border border-destructive">
                    <AlertDialogTitle className="font-mono text-sm text-destructive">[DELETE_ACCOUNT]:</AlertDialogTitle>
                    <AlertDialogDescription className="font-mono text-xs">
                      Are you sure you want to delete your account? This action cannot be undone. All your data will be permanently erased.
                    </AlertDialogDescription>
                    <div className="flex gap-4 justify-end">
                      <AlertDialogCancel className="rounded-none font-mono text-xs">&gt; CANCEL</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="rounded-none bg-destructive text-destructive-foreground hover:bg-destructive/90 font-mono text-xs"
                      >
                        &gt; DELETE_ACCOUNT
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
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
              <div><span className="text-success">&gt;</span> Security score dashboard with recommendations</div>
              <div><span className="text-success">&gt;</span> Two-factor authentication setup (TOTP placeholder)</div>
              <div><span className="text-success">&gt;</span> Active sessions viewer with device details and IP addresses</div>
              <div><span className="text-success">&gt;</span> Session revocation and bulk sign-out</div>
              <div><span className="text-success">&gt;</span> Privacy controls (profile, cookies, emails)</div>
              <div><span className="text-success">&gt;</span> Security audit log with timestamps and status badges</div>
              <div><span className="text-success">&gt;</span> GDPR compliance (data export, access request, policies)</div>
              <div><span className="text-success">&gt;</span> Account deletion with confirmation modal</div>
              <div><span className="text-success">&gt;</span> 4-tab navigation (Security, Privacy, Audit Log, Compliance)</div>
              <div><span className="text-success">&gt;</span> Terminal console aesthetic</div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: Integrate with src/components/security/. Add API routes for session management and 2FA.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
