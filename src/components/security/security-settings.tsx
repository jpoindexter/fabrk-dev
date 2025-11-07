"use client";

/**
 * Security Settings Client Component
 * Manage 2FA, sessions, connected accounts, and security preferences
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

interface SecuritySettingsProps {
  user: {
    email: string;
    emailVerified: boolean;
    sessionVersion: number;
    twoFactorEnabled: boolean;
  };
  connectedAccounts: Array<{
    provider: string;
    accountId: string;
  }>;
}

export function SecuritySettings({ user, connectedAccounts }: SecuritySettingsProps) {
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    // TODO: Implement 2FA setup flow
    alert("2FA setup will be implemented. This requires adding 2FA fields to User model.");
    setIsEnabling2FA(false);
  };

  const handleDisable2FA = async () => {
    if (confirm("Are you sure you want to disable two-factor authentication?")) {
      // TODO: Implement 2FA disable
      alert("2FA disable functionality to be implemented");
    }
  };

  const handleDisconnectAccount = async (provider: string) => {
    if (confirm(`Disconnect your ${provider} account?`)) {
      // TODO: Implement account disconnection
      alert(`Disconnect ${provider} functionality to be implemented`);
    }
  };

  const handleInvalidateAllSessions = async () => {
    if (confirm("This will log you out of all devices. Continue?")) {
      // TODO: Implement session invalidation by incrementing sessionVersion
      alert("Session invalidation to be implemented");
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Verification Status */}
      {!user.emailVerified && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your email is not verified. Please check your inbox for the verification link.
            <Button variant="link" className="ml-2 h-auto p-0">
              Resend verification email
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </div>
            </div>
            {user.twoFactorEnabled ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <XCircle className="h-3 w-3" />
                Disabled
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Two-factor authentication (2FA) adds an additional layer of security by requiring
            a second form of verification when you sign in.
          </p>

          {user.twoFactorEnabled ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>2FA is currently protecting your account</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => alert("View backup codes")}>
                  View Backup Codes
                </Button>
                <Button variant="destructive" onClick={handleDisable2FA}>
                  Disable 2FA
                </Button>
              </div>
            </div>
          ) : (
            <Button onClick={handleEnable2FA} disabled={isEnabling2FA}>
              <Shield className="mr-2 h-4 w-4" />
              {isEnabling2FA ? "Setting up..." : "Enable Two-Factor Authentication"}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Connected Accounts (OAuth) */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>
                Manage third-party accounts linked to your Fabrk account
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedAccounts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No connected accounts. You can link Google or GitHub for faster sign-in.
            </p>
          ) : (
            <div className="space-y-3">
              {connectedAccounts.map((account, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border-2 border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {account.provider}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Connected
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDisconnectAccount(account.provider)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Separator />

          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Connect Google
            </Button>
            <Button variant="outline" size="sm">
              Connect GitHub
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>
                Manage devices and locations where you're signed in
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Session version: {user.sessionVersion}
          </p>

          {/* Placeholder for active sessions - would require Session model */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border-2 border-border rounded-lg">
              <div>
                <p className="font-medium text-sm">Current Session</p>
                <p className="text-xs text-muted-foreground">
                  Your current browser session
                </p>
              </div>
              <Badge>Active</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Button
              variant="destructive"
              onClick={handleInvalidateAllSessions}
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out All Other Sessions
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              This will log you out from all devices except this one. You'll need to sign in
              again on those devices.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10 border-2 border-border">
              <Key className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password regularly to keep your account secure
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Change Password</Button>
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card className="bg-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {!user.emailVerified && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                <span>Verify your email address</span>
              </li>
            )}
            {!user.twoFactorEnabled && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 shrink-0 mt-0.5" />
                <span>Enable two-factor authentication</span>
              </li>
            )}
            {connectedAccounts.length === 0 && (
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>Connect a backup sign-in method (Google or GitHub)</span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <span>Use a strong, unique password</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
              <span>Review your active sessions regularly</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
