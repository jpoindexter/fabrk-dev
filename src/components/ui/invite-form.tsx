/**
 * ✅ FABRK COMPONENT
 * Invite Form - Team member invitation with email validation
 * - Multiple email support with chips
 * - Role selection and permissions
 * - Optional message and expiration
 * - Theme-responsive design tokens
 * - Loading and validation states
 *
 * @example
 * ```tsx
 * <InviteForm
 *   allowMultiple
 *   onSubmit={async (data) => {
 *     await sendInvites(data);
 *   }}
 * />
 * ```
 */

"use client";

import * as React from "react";
import { X, Send, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode, formatLabel } from "@/design-system";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface InviteFormProps {
  roles?: Array<{ value: string; label: string }>;
  defaultRole?: string;
  allowMultiple?: boolean;
  showMessage?: boolean;
  showPermissions?: boolean;
  showExpiration?: boolean;
  onSubmit?: (data: {
    emails: string[];
    role: string;
    message?: string;
    permissions?: string[];
    expiresAt?: Date;
  }) => Promise<void>;
  className?: string;
}

const defaultRoles = [
  { value: "viewer", label: "Viewer" },
  { value: "member", label: "Member" },
  { value: "admin", label: "Admin" },
];

const defaultPermissions = [
  { id: "read", label: "Read access" },
  { id: "write", label: "Write access" },
  { id: "delete", label: "Delete access" },
  { id: "invite", label: "Invite others" },
];

const InviteForm = React.forwardRef<HTMLFormElement, InviteFormProps>(
  (
    {
      roles = defaultRoles,
      defaultRole = "viewer",
      allowMultiple = false,
      showMessage = false,
      showPermissions = false,
      showExpiration = false,
      onSubmit,
      className,
    },
    ref
  ) => {
    const [emailInput, setEmailInput] = React.useState("");
    const [emails, setEmails] = React.useState<string[]>([]);
    const [role, setRole] = React.useState(defaultRole);
    const [message, setMessage] = React.useState("");
    const [selectedPermissions, setSelectedPermissions] = React.useState<string[]>([]);
    const [expiresAt, setExpiresAt] = React.useState("");
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    const validateEmail = (email: string): boolean => {
      return EMAIL_REGEX.test(email.trim());
    };

    const handleAddEmail = (email: string) => {
      const trimmedEmail = email.trim();
      if (!trimmedEmail) return;

      if (!validateEmail(trimmedEmail)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
        return;
      }

      if (emails.includes(trimmedEmail)) {
        setErrors((prev) => ({ ...prev, email: "Email already added" }));
        return;
      }

      setEmails((prev) => [...prev, trimmedEmail]);
      setEmailInput("");
      setErrors((prev) => ({ ...prev, email: "" }));
    };

    const handleEmailInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        if (allowMultiple) {
          handleAddEmail(emailInput);
        }
      }
    };

    const handleRemoveEmail = (emailToRemove: string) => {
      setEmails((prev) => prev.filter((email) => email !== emailToRemove));
    };

    const handlePermissionToggle = (permissionId: string) => {
      setSelectedPermissions((prev) =>
        prev.includes(permissionId)
          ? prev.filter((id) => id !== permissionId)
          : [...prev, permissionId]
      );
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});
      setShowSuccess(false);

      const finalEmails = allowMultiple ? emails : [emailInput];

      if (finalEmails.length === 0) {
        setErrors({ email: "At least one email is required" });
        return;
      }

      for (const email of finalEmails) {
        if (!validateEmail(email)) {
          setErrors({ email: `Invalid email: ${email}` });
          return;
        }
      }

      setIsSubmitting(true);

      try {
        await onSubmit?.({
          emails: finalEmails,
          role,
          message: showMessage ? message : undefined,
          permissions: showPermissions ? selectedPermissions : undefined,
          expiresAt: showExpiration && expiresAt ? new Date(expiresAt) : undefined,
        });

        setEmailInput("");
        setEmails([]);
        setMessage("");
        setSelectedPermissions([]);
        setExpiresAt("");
        setRole(defaultRole);
        setShowSuccess(true);

        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error: unknown) {
        setErrors({
          submit: error instanceof Error ? error.message : "Failed to send invites",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={cn("bg-card border p-6", mode.radius, className)}
      >
        <div className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email" required>
              {formatLabel(`Email Address${allowMultiple ? "es" : ""}`)}
            </Label>
            <Input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={handleEmailInputKeyDown}
              onBlur={() => {
                if (!allowMultiple && emailInput) {
                  if (!validateEmail(emailInput)) {
                    setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
                  } else {
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }
                }
              }}
              placeholder={
                allowMultiple ? "Enter email and press Enter or comma" : "email@example.com"
              }
              error={!!errors.email}
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-destructive text-sm font-normal">{errors.email}</p>}
            {allowMultiple && emails.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {emails.map((email) => (
                  <Badge key={email} variant="secondary" className="gap-1">
                    {email}
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="hover:text-destructive ml-1"
                      aria-label={`Remove ${email}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="role" required>
              {formatLabel("Role")}
            </Label>
            <Select value={role} onValueChange={setRole} disabled={isSubmitting}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Optional Message */}
          {showMessage && (
            <div className="space-y-2">
              <Label htmlFor="message">{formatLabel("Custom Message (Optional)")}</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal message to the invitation..."
                rows={3}
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Optional Permissions */}
          {showPermissions && (
            <div className="space-y-2">
              <Label>{formatLabel("Permissions (Optional)")}</Label>
              <div className="space-y-2">
                {defaultPermissions.map((perm) => (
                  <div key={perm.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={perm.id}
                      checked={selectedPermissions.includes(perm.id)}
                      onCheckedChange={() => handlePermissionToggle(perm.id)}
                      disabled={isSubmitting}
                    />
                    <Label htmlFor={perm.id} className="cursor-pointer font-normal">
                      {perm.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Expiration */}
          {showExpiration && (
            <div className="space-y-2">
              <Label htmlFor="expires">{formatLabel("Expiration Date (Optional)")}</Label>
              <Input
                id="expires"
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className={cn("border-destructive bg-destructive/10 border p-4", mode.radius)}>
              <p className="text-destructive text-sm font-normal">{errors.submit}</p>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div
              className={cn(
                "border-primary bg-primary/10 flex items-center gap-2 border p-4",
                mode.radius
              )}
            >
              <Check className="text-primary h-4 w-4" />
              <p className="text-primary text-sm font-normal">
                Invitation{allowMultiple && "s"} sent successfully!
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
            loadingText="Sending invites..."
            disabled={isSubmitting}
          >
            <Send className="h-4 w-4" />
            Send Invitation{allowMultiple && emails.length > 1 ? "s" : ""}
          </Button>
        </div>
      </form>
    );
  }
);

InviteForm.displayName = "InviteForm";

export { InviteForm };
