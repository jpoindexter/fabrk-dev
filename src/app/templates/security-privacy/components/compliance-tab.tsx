/**
 * Compliance Tab Component - GDPR rights and danger zone
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Globe, Download, Eye, FileText, UserX, AlertTriangle, Trash2 } from "lucide-react";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

interface ComplianceTabProps {
  onExportData: () => void;
  onRequestAccess: () => void;
  onViewPolicy: (type: "privacy" | "terms") => void;
  onDeleteAccount: () => void;
}

export function ComplianceTab({
  onExportData,
  onRequestAccess,
  onViewPolicy,
  onDeleteAccount,
}: ComplianceTabProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteAccount = () => {
    onDeleteAccount();
    setDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* GDPR Rights */}
      <TerminalCard tone="neutral">
        <TerminalCardHeader code="0x04" title="GDPR_RIGHTS" icon={<Globe className="h-4 w-4" />} />
        <TerminalCardContent padding="md">
          <div className="mb-4 flex items-center gap-4">
            <div className="border-border bg-primary/10 flex h-10 w-10 items-center justify-center border">
              <Globe className="text-primary h-5 w-5" />
            </div>
            <div>
              <div className={cn(mode.font, "text-muted-foreground text-xs")}>[GDPR_RIGHTS]:</div>
              <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                Exercise your data protection rights
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, "w-full justify-start text-xs")}
              onClick={onExportData}
            >
              <Download className="mr-2 h-4 w-4" />
              &gt; DOWNLOAD_MY_DATA (GDPR Export)
            </Button>
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, "w-full justify-start text-xs")}
              onClick={onRequestAccess}
            >
              <Eye className="mr-2 h-4 w-4" />
              &gt; REQUEST_DATA_ACCESS_REPORT
            </Button>
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, "w-full justify-start text-xs")}
              onClick={() => onViewPolicy("privacy")}
            >
              <FileText className="mr-2 h-4 w-4" />
              &gt; VIEW_PRIVACY_POLICY
            </Button>
            <Button
              variant="outline"
              className={cn(mode.radius, mode.font, "w-full justify-start text-xs")}
              onClick={() => onViewPolicy("terms")}
            >
              <FileText className="mr-2 h-4 w-4" />
              &gt; VIEW_TERMS_OF_SERVICE
            </Button>
          </div>
        </TerminalCardContent>
      </TerminalCard>

      {/* Danger Zone */}
      <TerminalCard tone="danger">
        <TerminalCardHeader code="0x05" title="DANGER_ZONE" icon={<UserX className="h-4 w-4" />} />
        <TerminalCardContent padding="md">
          <div className="mb-4 flex items-center gap-4">
            <div className="border-border bg-destructive/10 flex h-10 w-10 items-center justify-center border">
              <UserX className="text-destructive h-5 w-5" />
            </div>
            <div>
              <div className={cn(mode.font, "text-muted-foreground text-xs")}>[DANGER_ZONE]:</div>
              <div className={cn(mode.font, "text-muted-foreground text-xs")}>
                Irreversible actions - proceed with caution
              </div>
            </div>
          </div>
          <Alert className={cn(mode.radius, "mb-4 flex items-center justify-center gap-2")}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className={cn(mode.font, "text-xs")}>
              [WARNING]: Deleting your account is permanent and cannot be undone. All your data will
              be permanently erased.
            </AlertDescription>
          </Alert>
          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <div className="flex justify-end">
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className={cn(mode.radius, mode.font, "text-xs")}
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  &gt; DELETE_MY_ACCOUNT
                </Button>
              </AlertDialogTrigger>
            </div>
            <AlertDialogContent className={cn(mode.radius, "border-destructive border")}>
              <AlertDialogTitle className={cn(mode.font, "text-destructive text-sm")}>
                [DELETE_ACCOUNT]:
              </AlertDialogTitle>
              <AlertDialogDescription className={cn(mode.font, "text-xs")}>
                Are you sure you want to delete your account? This action cannot be undone. All your
                data will be permanently erased.
              </AlertDialogDescription>
              <div className="flex justify-end gap-4">
                <AlertDialogCancel className={cn(mode.radius, mode.font, "text-xs")}>
                  &gt; CANCEL
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className={cn(
                    mode.radius,
                    mode.font,
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-xs"
                  )}
                >
                  &gt; DELETE_ACCOUNT
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </TerminalCardContent>
      </TerminalCard>
    </div>
  );
}
