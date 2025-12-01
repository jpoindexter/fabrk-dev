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
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-full bg-destructive/50" />
          <div className="size-2 rounded-full bg-warning/50" />
          <div className="size-2 rounded-full bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          confirmation_dialog.tsx
        </span>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Confirmation Dialog</h3>
          <p className="font-mono text-xs text-muted-foreground">
            Destructive action confirmation with cancel option
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="rounded-none font-mono text-xs"
            >
              <Trash2 className="mr-1 h-3 w-3" />
              &gt; DELETE_ITEM
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-none border-border">
            <AlertDialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 border border-destructive bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
              </div>
              <AlertDialogTitle className="font-mono">
                [CONFIRM_DELETE]
              </AlertDialogTitle>
              <AlertDialogDescription className="font-mono text-sm">
                This action cannot be undone. This will permanently delete the
                item and remove all associated data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-none font-mono text-xs">
                &gt; CANCEL
              </AlertDialogCancel>
              <AlertDialogAction className="rounded-none font-mono text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90">
                &gt; DELETE
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [USE_CASE]: Delete, logout, reset, irreversible actions
        </div>
      </div>
    </div>
  );
}
