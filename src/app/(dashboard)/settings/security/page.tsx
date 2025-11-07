/**
 * Security Settings Page
 * MFA setup and management
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, Key, AlertTriangle } from "lucide-react";
import { useToast } from "@/lib/notifications/hooks";
import { QRCodeSVG } from "qrcode.react";

export default function SecuritySettingsPage() {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showEnableDialog, setShowEnableDialog] = useState(false);
  const [showDisableDialog, setShowDisableDialog] = useState(false);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const [qrCodeUri, setQrCodeUri] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();

  // Enable MFA
  const handleEnableMFA = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/mfa/enable", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setQrCodeUri(data.qrCodeUri);
        setBackupCodes(data.backupCodes);
        setShowEnableDialog(true);
      } else {
        showToast.error("Error", data.error || "Failed to enable MFA");
      }
    } catch (error) {
      showToast.error("Error", "Failed to enable MFA");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify and activate MFA
  const handleVerifyMFA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      showToast.error("Invalid Code", "Please enter a 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: verificationCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setMfaEnabled(true);
        setShowEnableDialog(false);
        setShowBackupCodes(true);
        showToast.success("Success", "Two-factor authentication enabled");
      } else {
        showToast.error("Error", data.error || "Invalid verification code");
      }
    } catch (error) {
      showToast.error("Error", "Failed to verify code");
    } finally {
      setIsLoading(false);
      setVerificationCode("");
    }
  };

  // Disable MFA
  const handleDisableMFA = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/mfa/disable", {
        method: "POST",
      });

      if (response.ok) {
        setMfaEnabled(false);
        setShowDisableDialog(false);
        showToast.success("Success", "Two-factor authentication disabled");
      } else {
        const data = await response.json();
        showToast.error("Error", data.error || "Failed to disable MFA");
      }
    } catch (error) {
      showToast.error("Error", "Failed to disable MFA");
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate backup codes
  const handleRegenerateBackupCodes = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/mfa/regenerate-codes", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        setBackupCodes(data.backupCodes);
        setShowBackupCodes(true);
        showToast.success("Success", "Backup codes regenerated");
      } else {
        showToast.error("Error", data.error || "Failed to regenerate codes");
      }
    } catch (error) {
      showToast.error("Error", "Failed to regenerate backup codes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground">
          Manage your account security settings
        </p>
      </div>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </div>
            </div>
            {mfaEnabled && (
              <Badge variant="default" className="bg-green-500">
                Enabled
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Two-factor authentication adds an additional layer of security to
            your account by requiring more than just a password to sign in.
          </p>

          <div className="flex gap-3">
            {!mfaEnabled ? (
              <Button onClick={handleEnableMFA} disabled={isLoading}>
                <Smartphone className="mr-2 h-4 w-4" />
                Enable Two-Factor Auth
              </Button>
            ) : (
              <>
                <Button
                  variant="destructive"
                  onClick={() => setShowDisableDialog(true)}
                  disabled={isLoading}
                >
                  Disable 2FA
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRegenerateBackupCodes}
                  disabled={isLoading}
                >
                  <Key className="mr-2 h-4 w-4" />
                  Regenerate Backup Codes
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Enable MFA Dialog */}
      <Dialog open={showEnableDialog} onOpenChange={setShowEnableDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* QR Code */}
            {qrCodeUri && (
              <div className="flex justify-center rounded-lg border p-6">
                <QRCodeSVG value={qrCodeUri} size={200} />
              </div>
            )}

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium">Supported Apps:</p>
              <ul className="mt-2 text-sm text-muted-foreground">
                <li>• Google Authenticator</li>
                <li>• Authy</li>
                <li>• 1Password</li>
                <li>• Microsoft Authenticator</li>
              </ul>
            </div>

            {/* Verification */}
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <Input
                id="verificationCode"
                placeholder="000000"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>

            <Button
              onClick={handleVerifyMFA}
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full"
            >
              Verify and Enable
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Disable MFA Dialog */}
      <Dialog open={showDisableDialog} onOpenChange={setShowDisableDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Disable Two-Factor Authentication?</DialogTitle>
            <DialogDescription>
              This will make your account less secure
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg bg-destructive/10 p-4">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium">Security Warning</p>
                <p className="text-sm text-muted-foreground">
                  Disabling two-factor authentication will make your account more
                  vulnerable to unauthorized access.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowDisableDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDisableMFA}
                disabled={isLoading}
              >
                Disable 2FA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Backup Codes Dialog */}
      <Dialog open={showBackupCodes} onOpenChange={setShowBackupCodes}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup Codes</DialogTitle>
            <DialogDescription>
              Save these codes in a safe place. Each code can only be used once.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2 rounded-lg border p-4 font-mono text-sm">
              {backupCodes.map((code, index) => (
                <div key={index} className="text-center">
                  {code}
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-muted p-4">
              <Key className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Important</p>
                <p className="text-muted-foreground">
                  Store these codes securely. You can use them to access your
                  account if you lose your authenticator device.
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                // Copy to clipboard
                navigator.clipboard.writeText(backupCodes.join("\n"));
                showToast.success("Copied", "Backup codes copied to clipboard");
              }}
              className="w-full"
            >
              Copy All Codes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
