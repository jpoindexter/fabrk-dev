/**
 * FABRK COMPONENT
 * Confirmation Dialog - AlertDialog for destructive actions
 */

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";

export function ConfirmationDialog() {
  return (
    <div className="border-border bg-card border">
      <div className="border-border flex items-center gap-2 border-b px-4 py-2">
        <div className="flex gap-2">
          <div className="bg-destructive/50 size-2 rounded-none" />
          <div className="bg-warning/50 size-2 rounded-none" />
          <div className="bg-success/50 size-2 rounded-none" />
        </div>
        <span className="text-muted-foreground font-mono text-xs">confirmation_dialog.tsx</span>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-1 font-mono font-semibold">Confirmation Dialog</h3>
          <p className="text-muted-foreground font-mono text-xs">
            Destructive action confirmation with cancel option
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="rounded-none font-mono text-xs">
              <Trash2 className="mr-1 h-3 w-3" />
              &gt; DELETE_ITEM
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="border-border rounded-none">
            <AlertDialogHeader>
              <div className="mb-2 flex items-center gap-2">
                <div className="border-destructive bg-destructive/10 border p-2">
                  <AlertTriangle className="text-destructive h-5 w-5" />
                </div>
              </div>
              <AlertDialogTitle className="font-mono">[CONFIRM_DELETE]</AlertDialogTitle>
              <AlertDialogDescription className="font-mono text-sm">
                This action cannot be undone. This will permanently delete the item and remove all
                associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-none font-mono text-xs">
                &gt; CANCEL
              </AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none font-mono text-xs">
                &gt; DELETE
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="text-muted-foreground mt-4 font-mono text-xs">
          [USE_CASE]: Delete, logout, reset, irreversible actions
        </div>
      </div>
    </div>
  );
}
