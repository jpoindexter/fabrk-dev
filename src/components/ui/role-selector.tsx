"use client";

import * as React from "react";
import { Crown, Shield, User, Eye, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { mode } from "@/design-system";
import { Badge } from "@/components/ui/badge";
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

export interface Role {
  id: string;
  name: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  permissions: string[];
  disabled?: boolean;
}

export interface RoleSelectorProps {
  roles: Role[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiSelect?: boolean;
  showPermissions?: boolean;
  showConfirmation?: boolean;
  currentRole?: string;
  variant?: "cards" | "list";
  className?: string;
}

const DEFAULT_ROLES: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full system access with billing and deletion rights",
    icon: Crown,
    permissions: ["All permissions", "Delete workspace", "Manage billing", "Transfer ownership"],
  },
  {
    id: "admin",
    name: "Admin",
    description: "Manage team members and workspace settings",
    icon: Shield,
    permissions: ["Manage members", "Edit settings", "Create projects", "View analytics"],
  },
  {
    id: "member",
    name: "Member",
    description: "Create and edit content with standard access",
    icon: User,
    permissions: ["Create content", "Edit own content", "Comment", "View projects"],
  },
  {
    id: "guest",
    name: "Guest",
    description: "View-only access to shared content",
    icon: Eye,
    permissions: ["View content", "Export data", "Leave comments"],
  },
];

export function RoleSelector({
  roles = DEFAULT_ROLES,
  value,
  onChange,
  multiSelect = false,
  showPermissions = true,
  showConfirmation = false,
  currentRole,
  variant = "cards",
  className,
}: RoleSelectorProps) {
  const [selectedValue, setSelectedValue] = React.useState<string | string[] | undefined>(value);
  const [pendingValue, setPendingValue] = React.useState<string | string[] | undefined>(undefined);
  const [showDialog, setShowDialog] = React.useState(false);

  const isSelected = (roleId: string): boolean => {
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(roleId);
    }
    return selectedValue === roleId;
  };

  const handleRoleClick = (roleId: string, disabled?: boolean) => {
    if (disabled) return;

    let newValue: string | string[];

    if (multiSelect) {
      const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
      if (currentArray.includes(roleId)) {
        newValue = currentArray.filter((id) => id !== roleId);
      } else {
        newValue = [...currentArray, roleId];
      }
    } else {
      newValue = roleId;
    }

    if (showConfirmation) {
      setPendingValue(newValue);
      setShowDialog(true);
    } else {
      setSelectedValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleConfirm = () => {
    if (pendingValue !== undefined) {
      setSelectedValue(pendingValue);
      onChange?.(pendingValue);
      setPendingValue(undefined);
    }
    setShowDialog(false);
  };

  const handleCancel = () => {
    setPendingValue(undefined);
    setShowDialog(false);
  };

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  if (variant === "list") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {roles.map((role) => {
          const Icon = role.icon;
          const selected = isSelected(role.id);
          const isCurrent = currentRole === role.id;

          return (
            <button
              key={role.id}
              onClick={() => handleRoleClick(role.id, role.disabled)}
              disabled={role.disabled}
              className={cn(
                "group bg-card relative flex items-start gap-4 border p-4 text-left transition-all",
                mode.radius,
                selected && "border-primary bg-primary/5",
                !selected && !role.disabled && "hover:opacity-90",
                role.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {selected && (
                <div
                  className={cn(
                    "bg-primary absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center border",
                    mode.radius
                  )}
                >
                  <Check className="text-primary-foreground h-3 w-3" />
                </div>
              )}

              {Icon && (
                <div
                  className={cn(
                    "bg-background flex h-10 w-10 shrink-0 items-center justify-center border",
                    mode.radius,
                    selected && "bg-primary text-primary-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              )}

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-foreground font-semibold">{role.name}</h4>
                  {isCurrent && <Badge variant="secondary">Current</Badge>}
                </div>
                <p className="text-muted-foreground text-sm">{role.description}</p>

                {showPermissions && role.permissions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {role.permissions.map((permission, idx) => (
                      <Badge key={idx} variant="neutral" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </button>
          );
        })}

        {showConfirmation && (
          <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to change the role? This will update access permissions
                  immediately.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={handleCancel}>&gt; CANCEL</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {roles.map((role) => {
        const Icon = role.icon;
        const selected = isSelected(role.id);
        const isCurrent = currentRole === role.id;

        return (
          <button
            key={role.id}
            onClick={() => handleRoleClick(role.id, role.disabled)}
            disabled={role.disabled}
            className={cn(
              "group bg-card relative flex flex-col items-center border p-6 text-center transition-all",
              mode.radius,
              selected && "border-primary bg-primary/5",
              !selected && !role.disabled && "hover:opacity-90",
              role.disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {selected && (
              <div
                className={cn(
                  "bg-primary absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center border",
                  mode.radius
                )}
              >
                <Check className="text-primary-foreground h-4 w-4" />
              </div>
            )}

            {Icon && (
              <div
                className={cn(
                  "bg-background mb-4 flex h-16 w-16 items-center justify-center border transition-all",
                  mode.radius,
                  selected && "bg-primary text-primary-foreground"
                )}
              >
                <Icon className="h-8 w-8" />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex flex-col items-center gap-2">
                <h4 className="text-foreground font-semibold">{role.name}</h4>
                {isCurrent && <Badge variant="secondary">Current</Badge>}
              </div>
              <p className="text-muted-foreground text-sm">{role.description}</p>

              {showPermissions && role.permissions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {role.permissions.map((permission, idx) => (
                    <Badge key={idx} variant="neutral" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </button>
        );
      })}

      {showConfirmation && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to change the role? This will update access permissions
                immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>&gt; CANCEL</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

RoleSelector.displayName = "RoleSelector";

export { DEFAULT_ROLES };
