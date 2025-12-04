/**
 * Compliance Tab Component - GDPR rights and danger zone
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StyledCardHeader } from "@/components/ui/card";
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
      <div className="border-border bg-card border">
        <StyledCardHeader code="0x00" title="GDPR_RIGHTS" />
        <div className="p-4">
          <div className="mb-4 flex items-center gap-4">
            <div className="border-border bg-primary/10 flex h-10 w-10 items-center justify-center border">
              <Globe className="text-primary h-5 w-5" />
            </div>
            <div>
              <div className="text-muted-foreground font-mono text-xs">[GDPR_RIGHTS]:</div>
              <div className="text-muted-foreground font-mono text-xs">
                Exercise your data protection rights
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start rounded-none font-mono text-xs"
              onClick={onExportData}
            >
              <Download className="mr-2 h-4 w-4" />
              &gt; DOWNLOAD_MY_DATA (GDPR Export)
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-none font-mono text-xs"
              onClick={onRequestAccess}
            >
              <Eye className="mr-2 h-4 w-4" />
              &gt; REQUEST_DATA_ACCESS_REPORT
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-none font-mono text-xs"
              onClick={() => onViewPolicy("privacy")}
            >
              <FileText className="mr-2 h-4 w-4" />
              &gt; VIEW_PRIVACY_POLICY
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-none font-mono text-xs"
              onClick={() => onViewPolicy("terms")}
            >
              <FileText className="mr-2 h-4 w-4" />
              &gt; VIEW_TERMS_OF_SERVICE
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="border-destructive bg-card border">
        <StyledCardHeader code="0x00" title="DANGER_ZONE" />
        <div className="p-4">
          <div className="mb-4 flex items-center gap-4">
            <div className="border-border bg-destructive/10 flex h-10 w-10 items-center justify-center border">
              <UserX className="text-destructive h-5 w-5" />
            </div>
            <div>
              <div className="text-muted-foreground font-mono text-xs">[DANGER_ZONE]:</div>
              <div className="text-muted-foreground font-mono text-xs">
                Irreversible actions - proceed with caution
              </div>
            </div>
          </div>
          <Alert className="mb-4 flex items-center justify-center gap-2 rounded-none">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-mono text-xs">
              [WARNING]: Deleting your account is permanent and cannot be undone. All your data will
              be permanently erased.
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
            <AlertDialogContent className="border-destructive rounded-none border">
              <AlertDialogTitle className="text-destructive font-mono text-sm">
                [DELETE_ACCOUNT]:
              </AlertDialogTitle>
              <AlertDialogDescription className="font-mono text-xs">
                Are you sure you want to delete your account? This action cannot be undone. All your
                data will be permanently erased.
              </AlertDialogDescription>
              <div className="flex justify-end gap-4">
                <AlertDialogCancel className="rounded-none font-mono text-xs">
                  &gt; CANCEL
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none font-mono text-xs"
                >
                  &gt; DELETE_ACCOUNT
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
