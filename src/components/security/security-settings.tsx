"use client";

/**
 * Security Settings Client Component
 * Manage 2FA, sessions, connected accounts, and security preferences
 */

import { useState } from "react";
import { BackupCodesModal } from "@/components/security/backup-codes-modal";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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

  // Dialog states
  const [disable2FADialogOpen, setDisable2FADialogOpen] = useState(false);
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false);
  const [providerToDisconnect, setProviderToDisconnect] = useState<string | null>(null);
  const [invalidateSessionsDialogOpen, setInvalidateSessionsDialogOpen] = useState(false);
  const [backupCodesModalOpen, setBackupCodesModalOpen] = useState(false);

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

      // Call the MFA enable API
      const response = await fetch("/api/auth/mfa/enable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to enable 2FA");
      }

      const data = await response.json();

      info(
        "2FA Setup Required",
        "Scan the QR code with your authenticator app and enter the verification code."
      );

      // QR Code Modal - Planned for v1.1
      // TODO v1.1: Show QR code modal with data.qrCode and verify code
      // For v1.0: Redirect to dedicated 2FA setup page (same UX, different implementation)
      window.location.href = "/settings/security/2fa/setup";
    } catch (err: unknown) {
      error(
        "Error enabling 2FA",
        err instanceof Error ? err.message : "Failed to enable two-factor authentication"
      );
    } finally {
      setIsEnabling2FA(false);
    }
  };

  const confirmDisable2FA = async () => {
    setIsDisabling2FA(true);
    setDisable2FADialogOpen(false);

    try {
      // Implementation: Disable 2FA
      // 1. Verify user password or current 2FA code for security
      // 2. POST /api/user/2fa/disable
      // 3. Server updates User: twoFactorEnabled = false, clear twoFactorSecret
      // 4. Delete MFADevice and BackupCode records

      // Call the MFA disable API
      const response = await fetch("/api/auth/mfa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to disable 2FA");
      }

      info(
        "2FA Disabled",
        "Two-factor authentication has been disabled. Consider re-enabling it for better security."
      );

      // Reload to update UI
      window.location.reload();
    } catch (err: unknown) {
      error(
        "Error disabling 2FA",
        err instanceof Error ? err.message : "Failed to disable two-factor authentication"
      );
    } finally {
      setIsDisabling2FA(false);
    }
  };

  const confirmDisconnectAccount = async () => {
    if (!providerToDisconnect) return;

    setDisconnectingProvider(providerToDisconnect);
    setDisconnectDialogOpen(false);

    try {
      // Implementation: Disconnect OAuth account
      // DELETE /api/user/accounts/:provider
      // Delete the Account record for this provider
      // Note: Ensure user has another login method (password or another OAuth)

      // Call the account disconnect API
      const response = await fetch(`/api/user/accounts/${providerToDisconnect}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to disconnect account");
      }

      info(
        "Account Disconnected",
        `Your ${providerToDisconnect} account has been disconnected successfully.`
      );

      // Reload to update UI
      window.location.reload();
    } catch (err: unknown) {
      error(
        "Error disconnecting account",
        err instanceof Error ? err.message : `Failed to disconnect ${providerToDisconnect} account`
      );
    } finally {
      setDisconnectingProvider(null);
      setProviderToDisconnect(null);
    }
  };

  const confirmInvalidateAllSessions = async () => {
    setIsInvalidatingSessions(true);
    setInvalidateSessionsDialogOpen(false);

    try {
      // Implementation: Invalidate all sessions by incrementing sessionVersion
      // POST /api/user/sessions/invalidate-all
      // Server: await prisma.user.update({
      //   where: { id: session.user.id },
      //   data: { sessionVersion: { increment: 1 } }
      // })
      // Client: Redirect to login after success

      // Call the session invalidation API
      const response = await fetch("/api/user/sessions/invalidate-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to invalidate sessions");
      }

      info(
        "Sessions Invalidated",
        "All other sessions have been logged out. Redirecting..."
      );

      // Redirect to dashboard after brief delay
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (err: unknown) {
      error(
        "Error invalidating sessions",
        err instanceof Error ? err.message : "Failed to invalidate all sessions"
      );
    } finally {
      setIsInvalidatingSessions(false);
    }
  };

  const handleViewBackupCodes = () => {
    // Open the backup codes modal
    setBackupCodesModalOpen(true);
  };

  const handleRegenerateBackupCodes = async (): Promise<string[]> => {
    const response = await fetch("/api/auth/mfa/regenerate-codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Failed to regenerate backup codes");
    }

    const data = await response.json();
    return data.backupCodes;
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
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>2FA is currently protecting your account</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleViewBackupCodes}>
                  View Backup Codes
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setDisable2FADialogOpen(true)}
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
                    onClick={() => {
                      setProviderToDisconnect(account.provider);
                      setDisconnectDialogOpen(true);
                    }}
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
              onClick={() => setInvalidateSessionsDialogOpen(true)}
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
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <span>Verify your email address</span>
              </li>
            )}
            {!user.twoFactorEnabled && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                <span>Enable two-factor authentication</span>
              </li>
            )}
            {connectedAccounts.length === 0 && (
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                <span>Connect a backup sign-in method (Google or GitHub)</span>
              </li>
            )}
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>Use a strong, unique password</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>Review your active sessions regularly</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Disable 2FA Dialog */}
      <AlertDialog open={disable2FADialogOpen} onOpenChange={setDisable2FADialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable Two-Factor Authentication?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove an important security layer from your account. You will only need your password to sign in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDisable2FA}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Disable 2FA
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Disconnect Account Dialog */}
      <AlertDialog open={disconnectDialogOpen} onOpenChange={setDisconnectDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disconnect {providerToDisconnect} Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will disconnect your {providerToDisconnect} account. You&apos;ll need another way to sign in (password or another OAuth provider).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDisconnectAccount}>
              Disconnect
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Invalidate Sessions Dialog */}
      <AlertDialog open={invalidateSessionsDialogOpen} onOpenChange={setInvalidateSessionsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign Out All Other Sessions?</AlertDialogTitle>
            <AlertDialogDescription>
              This will log you out of all devices except this one. You&apos;ll need to sign in again on those devices.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmInvalidateAllSessions}>
              Sign Out All Other Sessions
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Backup Codes Modal */}
      <BackupCodesModal
        open={backupCodesModalOpen}
        onOpenChange={setBackupCodesModalOpen}
        onRegenerate={handleRegenerateBackupCodes}
      />
    </div>
  );
}
