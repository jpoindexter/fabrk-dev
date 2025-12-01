/**
 * Compliance Tab Component - GDPR rights and danger zone
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Globe,
  Download,
  Eye,
  FileText,
  UserX,
  AlertTriangle,
  Trash2,
} from "lucide-react";

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
            <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={onExportData}>
              <Download className="mr-2 h-4 w-4" />
              &gt; DOWNLOAD_MY_DATA (GDPR Export)
            </Button>
            <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={onRequestAccess}>
              <Eye className="mr-2 h-4 w-4" />
              &gt; REQUEST_DATA_ACCESS_REPORT
            </Button>
            <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={() => onViewPolicy("privacy")}>
              <FileText className="mr-2 h-4 w-4" />
              &gt; VIEW_PRIVACY_POLICY
            </Button>
            <Button variant="outline" className="rounded-none w-full justify-start font-mono text-xs" onClick={() => onViewPolicy("terms")}>
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
  );
}
