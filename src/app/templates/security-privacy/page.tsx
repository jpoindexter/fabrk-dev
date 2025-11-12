/**
 * Security & Privacy Template
 * Comprehensive security settings, privacy controls, and compliance features
 */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  EyeOff,
  Lock,
  Globe,
  FileText,
  UserX,
  Activity,
} from "lucide-react";

// Mock data
const securityData = {
  user: {
    email: "john@example.com",
    emailVerified: true,
    twoFactorEnabled: false,
    sessionVersion: 1,
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
      status: "success",
    },
    {
      id: "log_002",
      action: "Login",
      timestamp: "2024-11-09 09:15",
      ip: "192.168.1.1",
      status: "success",
    },
    {
      id: "log_003",
      action: "Failed login attempt",
      timestamp: "2024-11-08 22:45",
      ip: "203.0.113.0",
      status: "failed",
    },
    {
      id: "log_004",
      action: "OAuth connected (Google)",
      timestamp: "2024-11-05 16:30",
      ip: "192.168.1.1",
      status: "success",
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
  const [activeTab, setActiveTab] = useState<
    "security" | "privacy" | "audit" | "compliance"
  >("security");
  const [privacy, setPrivacy] = useState(privacySettings);

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEnable2FA = () => {
    alert("2FA setup modal would open here with QR code");
  };

  const handleRevokeSession = (sessionId: string) => {
    alert(`Revoke session ${sessionId}`);
  };

  const handleExportData = () => {
    alert("Export all user data as JSON");
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deletion flow would start here");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Security & Privacy
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account security, privacy settings, and data controls
          </p>
        </div>

        {/* Security Score Card */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-brutal bg-primary/10">
                  <span className="text-2xl font-bold text-primary">75%</span>
                </div>
                <div>
                  <CardTitle className="font-bold">Security Score</CardTitle>
                  <CardDescription>
                    Good security posture, but improvements recommended
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="font-bold">
                Medium Risk
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="font-bold">Email verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="font-bold">Two-factor authentication disabled</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className="font-bold">
                  Password changed 60 days ago (recommended: every 90 days)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="security" className="font-bold">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="privacy" className="font-bold">
              <Lock className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="audit" className="font-bold">
              <Activity className="mr-2 h-4 w-4" />
              Audit Log
            </TabsTrigger>
            <TabsTrigger value="compliance" className="font-bold">
              <FileText className="mr-2 h-4 w-4" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-6 space-y-6">
            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                      <Smartphone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-bold">
                        Two-Factor Authentication
                      </CardTitle>
                      <CardDescription>
                        Add an extra layer of security with TOTP
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1 font-bold">
                    <XCircle className="h-3 w-3" />
                    Disabled
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Use an authenticator app like Google Authenticator or Authy to
                  generate time-based codes.
                </p>
                <Button onClick={handleEnable2FA} className="font-bold">
                  <Shield className="mr-2 h-4 w-4" />
                  Enable 2FA
                </Button>
              </CardContent>
            </Card>

            {/* Connected Accounts */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <Key className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">Connected Accounts</CardTitle>
                    <CardDescription>
                      OAuth providers linked to your account
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {securityData.connectedAccounts.map((account, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border-2 border-brutal bg-muted p-4"
                  >
                    <div>
                      <p className="font-bold capitalize">{account.provider}</p>
                      <p className="text-sm text-muted-foreground">
                        Connected on{" "}
                        {new Date(account.connectedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="font-bold">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Disconnect
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="font-bold">
                    Connect Google
                  </Button>
                  <Button variant="outline" size="sm" className="font-bold">
                    Connect GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">Active Sessions</CardTitle>
                    <CardDescription>
                      {securityData.activeSessions.length} active devices
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {securityData.activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-lg border-2 border-brutal bg-muted p-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold">{session.device}</p>
                        {session.isCurrent && (
                          <Badge className="font-bold">Current</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {session.location} • {session.ip}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last active: {session.lastActive}
                      </p>
                    </div>
                    {!session.isCurrent && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRevokeSession(session.id)}
                        className="font-bold"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
                <Separator />
                <Button variant="destructive" className="w-full font-bold">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out All Other Devices
                </Button>
              </CardContent>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <Key className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">Password</CardTitle>
                    <CardDescription>
                      Last changed on{" "}
                      {new Date(
                        securityData.user.lastPasswordChange
                      ).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="font-bold">
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="mt-6 space-y-6">
            {/* Profile Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">Profile & Activity</CardTitle>
                <CardDescription>
                  Control who can see your profile and activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "profileVisibility" as const,
                    label: "Profile Visibility",
                    description: "Allow your profile to be visible to other users",
                  },
                  {
                    key: "activityTracking" as const,
                    label: "Activity Tracking",
                    description: "Track my activity to improve experience",
                  },
                  {
                    key: "searchIndexing" as const,
                    label: "Search Engine Indexing",
                    description: "Allow search engines to index your profile",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between rounded-lg border-2 border-brutal p-4"
                  >
                    <div>
                      <p className="font-bold">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={privacy[setting.key]}
                      onCheckedChange={() => handlePrivacyToggle(setting.key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">Data Sharing</CardTitle>
                <CardDescription>
                  Manage how your data is used and shared
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "analyticsSharing" as const,
                    label: "Analytics Sharing",
                    description: "Share anonymous usage data to improve the product",
                  },
                  {
                    key: "dataRetention" as const,
                    label: "Data Retention",
                    description: "Keep my data if I delete my account",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between rounded-lg border-2 border-brutal p-4"
                  >
                    <div>
                      <p className="font-bold">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={privacy[setting.key]}
                      onCheckedChange={() => handlePrivacyToggle(setting.key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cookie Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">Cookie Preferences</CardTitle>
                <CardDescription>
                  Manage which cookies you allow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "cookiesEssential" as const,
                    label: "Essential Cookies",
                    description: "Required for the site to function (cannot be disabled)",
                    disabled: true,
                  },
                  {
                    key: "cookiesAnalytics" as const,
                    label: "Analytics Cookies",
                    description: "Help us understand how you use the site",
                    disabled: false,
                  },
                  {
                    key: "cookiesMarketing" as const,
                    label: "Marketing Cookies",
                    description: "Used to show relevant ads",
                    disabled: false,
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between rounded-lg border-2 border-brutal p-4"
                  >
                    <div>
                      <p className="font-bold">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={privacy[setting.key]}
                      onCheckedChange={() => handlePrivacyToggle(setting.key)}
                      disabled={setting.disabled}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="font-bold">Email Preferences</CardTitle>
                <CardDescription>
                  Choose which emails you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "marketingEmails" as const,
                    label: "Marketing Emails",
                    description: "Promotions, tips, and offers",
                  },
                  {
                    key: "productUpdates" as const,
                    label: "Product Updates",
                    description: "New features and improvements",
                  },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between rounded-lg border-2 border-brutal p-4"
                  >
                    <div>
                      <p className="font-bold">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <Switch
                      checked={privacy[setting.key]}
                      onCheckedChange={() => handlePrivacyToggle(setting.key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Log Tab */}
          <TabsContent value="audit" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-bold">Security Audit Log</CardTitle>
                    <CardDescription>
                      Track all security-related events on your account
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="font-bold">
                    <Download className="mr-2 h-4 w-4" />
                    Export Log
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border-2 border-brutal">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold">Action</TableHead>
                        <TableHead className="font-bold">Timestamp</TableHead>
                        <TableHead className="font-bold">IP Address</TableHead>
                        <TableHead className="font-bold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityData.auditLog.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-bold">{log.action}</TableCell>
                          <TableCell>{log.timestamp}</TableCell>
                          <TableCell className="font-mono text-sm">
                            {log.ip}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                log.status === "success" ? "default" : "destructive"
                              }
                              className="font-bold capitalize"
                            >
                              {log.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="mt-6 space-y-6">
            {/* GDPR Controls */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border-2 border-brutal bg-primary/10 p-3">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">GDPR Rights</CardTitle>
                    <CardDescription>
                      Exercise your data protection rights
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start font-bold"
                  onClick={handleExportData}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download My Data (GDPR Export)
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start font-bold"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Request Data Access Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start font-bold"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Privacy Policy
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start font-bold"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Terms of Service
                </Button>
              </CardContent>
            </Card>

            {/* Data Deletion */}
            <Card className="border-2 border-destructive">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg border-2 border-brutal bg-destructive/10 p-3">
                    <UserX className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <CardTitle className="font-bold">Danger Zone</CardTitle>
                    <CardDescription>
                      Irreversible actions - proceed with caution
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="font-bold">
                    Deleting your account is permanent and cannot be undone. All your
                    data will be permanently erased.
                  </AlertDescription>
                </Alert>
                <Button
                  variant="destructive"
                  className="w-full font-bold"
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete My Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Implementation Note */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <h4 className="mb-2 font-bold">🔒 Template Features</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="font-bold">
                ✓ Security score dashboard with recommendations
              </li>
              <li className="font-bold">
                ✓ Two-factor authentication setup (TOTP placeholder)
              </li>
              <li className="font-bold">
                ✓ OAuth account management (Google, GitHub)
              </li>
              <li className="font-bold">
                ✓ Active sessions viewer with device details and IP addresses
              </li>
              <li className="font-bold">
                ✓ Session revocation and bulk sign-out
              </li>
              <li className="font-bold">
                ✓ Privacy controls (11 toggles for profile, cookies, emails)
              </li>
              <li className="font-bold">
                ✓ Security audit log with timestamps and status badges
              </li>
              <li className="font-bold">
                ✓ GDPR compliance (data export, access request, policies)
              </li>
              <li className="font-bold">
                ✓ Account deletion with confirmation modal
              </li>
              <li className="font-bold">
                ✓ 4-tab navigation (Security, Privacy, Audit Log, Compliance)
              </li>
            </ul>
            <p className="mt-4 text-sm font-bold text-muted-foreground">
              Integrate with existing security components in{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                src/components/security/
              </code>
              . Add API routes for session management and 2FA.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
