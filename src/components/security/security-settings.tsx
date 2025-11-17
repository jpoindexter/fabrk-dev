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
import { useToast } from "@/hooks/use-toast";
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
  const { info, error } = useToast();
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [isDisabling2FA, setIsDisabling2FA] = useState(false);
  const [disconnectingProvider, setDisconnectingProvider] = useState<string | null>(null);
  const [isInvalidatingSessions, setIsInvalidatingSessions] = useState(false);

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);

    try {
      // Implementation: 2FA setup flow
      // 1. Generate TOTP secret: const secret = speakeasy.generateSecret()
      // 2. Display QR code: use qrcode library to generate QR from secret.otpauth_url
      // 3. User scans with authenticator app (Google Authenticator, Authy, etc.)
      // 4. User enters verification code to confirm
      // 5. Save to database: Update User with twoFactorSecret (encrypted) and twoFactorEnabled=true
      // 6. Generate backup codes and display once
      // Reference: https://github.com/speakeasyjs/speakeasy

      // TODO: Implement POST /api/user/2fa/enable
      // const response = await fetch("/api/user/2fa/enable", {
      //   method: "POST",
      // });
      // if (!response.ok) throw new Error("Failed to enable 2FA");

      info(
        "Feature requires setup",
        "2FA requires adding MFADevice and BackupCode models to your database schema. See implementation comments in the code."
      );
    } catch (err) {
      error(
        "Error enabling 2FA",
        err instanceof Error ? err.message : "Failed to enable two-factor authentication"
      );
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const handleDisable2FA = async () => {
    if (!confirm("Are you sure you want to disable two-factor authentication?")) {
      return;
    }

    setIsDisabling2FA(true);

    try {
      // Implementation: Disable 2FA
      // 1. Verify user password or current 2FA code for security
      // 2. POST /api/user/2fa/disable
      // 3. Server updates User: twoFactorEnabled = false, clear twoFactorSecret
      // 4. Delete MFADevice and BackupCode records

      // TODO: Implement POST /api/user/2fa/disable
      // const response = await fetch("/api/user/2fa/disable", {
      //   method: "POST",
      // });
      // if (!response.ok) throw new Error("Failed to disable 2FA");

      info(
        "Feature requires setup",
        "2FA disable requires API implementation at /api/user/2fa/disable. See implementation comments in the code."
      );
    } catch (err) {
      error(
        "Error disabling 2FA",
        err instanceof Error ? err.message : "Failed to disable two-factor authentication"
      );
    } finally {
      setIsDisabling2FA(false);
    }
  };

  const handleDisconnectAccount = async (provider: string) => {
    if (!confirm(`Disconnect your ${provider} account? You'll need another way to sign in.`)) {
      return;
    }

    setDisconnectingProvider(provider);

    try {
      // Implementation: Disconnect OAuth account
      // DELETE /api/user/accounts/:provider
      // Delete the Account record for this provider
      // Note: Ensure user has another login method (password or another OAuth)

      // TODO: Implement DELETE /api/user/accounts/[provider]
      // const response = await fetch(`/api/user/accounts/${provider}`, {
      //   method: "DELETE",
      // });
      // if (!response.ok) throw new Error("Failed to disconnect account");

      info(
        "Feature requires setup",
        `Account disconnect requires API implementation at /api/user/accounts/${provider}. See implementation comments in the code.`
      );
    } catch (err) {
      error(
        "Error disconnecting account",
        err instanceof Error ? err.message : `Failed to disconnect ${provider} account`
      );
    } finally {
      setDisconnectingProvider(null);
    }
  };

  const handleInvalidateAllSessions = async () => {
    if (!confirm("This will log you out of all devices except this one. Continue?")) {
      return;
    }

    setIsInvalidatingSessions(true);

    try {
      // Implementation: Invalidate all sessions by incrementing sessionVersion
      // POST /api/user/sessions/invalidate-all
      // Server: await prisma.user.update({
      //   where: { id: session.user.id },
      //   data: { sessionVersion: { increment: 1 } }
      // })
      // Client: Redirect to login after success

      // TODO: Implement POST /api/user/sessions/invalidate-all
      // const response = await fetch("/api/user/sessions/invalidate-all", {
      //   method: "POST",
      // });
      // if (!response.ok) throw new Error("Failed to invalidate sessions");
      // window.location.href = "/login";

      info(
        "Feature requires setup",
        "Session invalidation requires API implementation at /api/user/sessions/invalidate-all. See implementation comments in the code."
      );
    } catch (err) {
      error(
        "Error invalidating sessions",
        err instanceof Error ? err.message : "Failed to invalidate all sessions"
      );
    } finally {
      setIsInvalidatingSessions(false);
    }
  };

  const handleViewBackupCodes = () => {
    // Implementation: View backup codes
    // 1. Verify user identity (require password or 2FA code)
    // 2. GET /api/user/2fa/backup-codes
    // 3. Display codes in a modal with copy functionality
    // 4. Warn user to store codes securely
    // 5. Option to regenerate codes (invalidates old ones)

    // TODO: Implement backup codes modal
    info(
      "Feature requires setup",
      "Backup codes require implementing a modal to display MFADevice backup codes. See implementation comments in the code."
    );
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
                <Button variant="outline" onClick={handleViewBackupCodes}>
                  View Backup Codes
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDisable2FA}
                  disabled={isDisabling2FA}
                >
                  {isDisabling2FA ? "Disabling..." : "Disable 2FA"}
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
                    disabled={disconnectingProvider === account.provider}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {disconnectingProvider === account.provider ? "Disconnecting..." : "Disconnect"}
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
              disabled={isInvalidatingSessions}
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isInvalidatingSessions ? "Invalidating sessions..." : "Sign Out All Other Sessions"}
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
