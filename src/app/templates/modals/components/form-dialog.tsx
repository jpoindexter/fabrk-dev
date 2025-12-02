/**
 * FABRK COMPONENT
 * Form Dialog - Modal form for creating or editing items
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormDialog({ open, onOpenChange }: FormDialogProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          form_dialog.tsx
        </span>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Form Dialog</h3>
          <p className="font-mono text-xs text-muted-foreground">
            Modal form for creating or editing items
          </p>
        </div>

        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button className="rounded-none font-mono text-xs">
              <Plus className="mr-1 h-3 w-3" />
              &gt; CREATE_PROJECT
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-none border-border">
            <DialogHeader>
              <DialogTitle className="font-mono">[NEW_PROJECT]</DialogTitle>
              <DialogDescription className="font-mono text-sm">
                Create a new project to organize your work.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="font-mono text-xs">[PROJECT_NAME]:</Label>
                <Input
                  placeholder="my-awesome-project"
                  className="rounded-none font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-mono text-xs">[DESCRIPTION]:</Label>
                <Textarea
                  placeholder="Describe your project..."
                  className="rounded-none font-mono text-sm resize-none"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-none font-mono text-xs"
              >
                &gt; CANCEL
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                className="rounded-none font-mono text-xs"
              >
                &gt; CREATE
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-4 font-mono text-xs text-muted-foreground">
          [USE_CASE]: Create, edit, quick forms, settings
        </div>
      </div>
    </div>
  );
}
