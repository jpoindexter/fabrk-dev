/**
 * FABRK COMPONENT
 * Modal Patterns Template - Terminal console style
 * Production-ready
 */

"use client";

import { useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertTriangle,
  Trash2,
  Edit,
  Plus,
  Settings,
  Info,
  Menu,
  X,
} from "lucide-react";

export default function ModalsTemplate() {
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-6 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-block border border-border px-3 py-1">
            <span className="font-mono text-xs text-muted-foreground">
              [TEMPLATE]: MODAL_PATTERNS
            </span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight">Modal Patterns</h1>
          <p className="font-mono text-sm text-muted-foreground">
            Dialog, alert, sheet, and popover patterns for common interactions
          </p>
        </div>

        {/* Modal Types Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Confirmation Dialog */}
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
                      This action cannot be undone. This will permanently delete
                      the item and remove all associated data from our servers.
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

          {/* Form Dialog */}
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
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

              <Dialog open={formDialogOpen} onOpenChange={setFormDialogOpen}>
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
                      onClick={() => setFormDialogOpen(false)}
                      className="rounded-none font-mono text-xs"
                    >
                      &gt; CANCEL
                    </Button>
                    <Button
                      onClick={() => setFormDialogOpen(false)}
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

          {/* Side Sheet */}
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                side_sheet.tsx
              </span>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Side Sheet</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Slide-out panel for detailed content or navigation
                </p>
              </div>

              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-none font-mono text-xs"
                  >
                    <Menu className="mr-1 h-3 w-3" />
                    &gt; OPEN_DRAWER
                  </Button>
                </SheetTrigger>
                <SheetContent className="rounded-none border-border">
                  <SheetHeader>
                    <SheetTitle className="font-mono">[SETTINGS]</SheetTitle>
                    <SheetDescription className="font-mono text-sm">
                      Configure your application settings here.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-4">
                    <div className="border border-border p-4">
                      <div className="font-mono text-xs text-muted-foreground mb-2">
                        [GENERAL]:
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm">Dark Mode</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-none font-mono text-xs h-7"
                          >
                            TOGGLE
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm">Notifications</span>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-none font-mono text-xs h-7"
                          >
                            CONFIGURE
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="border border-border p-4">
                      <div className="font-mono text-xs text-muted-foreground mb-2">
                        [ACCOUNT]:
                      </div>
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-start rounded-none font-mono text-xs"
                        >
                          <Edit className="mr-2 h-3 w-3" />
                          Edit Profile
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start rounded-none font-mono text-xs"
                        >
                          <Settings className="mr-2 h-3 w-3" />
                          Preferences
                        </Button>
                      </div>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button
                      onClick={() => setSheetOpen(false)}
                      className="rounded-none font-mono text-xs"
                    >
                      &gt; SAVE_CHANGES
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <div className="mt-4 font-mono text-xs text-muted-foreground">
                [USE_CASE]: Settings, detail views, mobile navigation
              </div>
            </div>
          </div>

          {/* Popover */}
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2">
              <div className="flex gap-1.5">
                <div className="size-2 rounded-full bg-destructive/50" />
                <div className="size-2 rounded-full bg-warning/50" />
                <div className="size-2 rounded-full bg-success/50" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">
                popover.tsx
              </span>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-semibold mb-1">Popover</h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Contextual floating content triggered by click
                </p>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-none font-mono text-xs"
                  >
                    <Info className="mr-1 h-3 w-3" />
                    &gt; MORE_INFO
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 rounded-none border-border">
                  <div className="space-y-3">
                    <div className="font-mono text-xs text-muted-foreground">
                      [INFO]:
                    </div>
                    <div className="font-mono text-sm">
                      This popover displays contextual information without
                      blocking the page. Great for help text, quick actions, or
                      mini forms.
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        className="rounded-none font-mono text-xs h-7"
                      >
                        &gt; LEARN_MORE
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-none font-mono text-xs h-7"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <div className="mt-4 font-mono text-xs text-muted-foreground">
                [USE_CASE]: Tooltips, quick actions, filter dropdowns
              </div>
            </div>
          </div>
        </div>

        {/* Pattern Comparison */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              comparison.md
            </span>
          </div>
          <div className="p-4">
            <div className="font-mono text-xs text-muted-foreground mb-4">
              [WHEN_TO_USE]:
            </div>
            <div className="border border-border overflow-x-auto">
              <table className="w-full font-mono text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-2 text-muted-foreground">
                      [PATTERN]
                    </th>
                    <th className="text-left px-4 py-2 text-muted-foreground">
                      USE_CASE
                    </th>
                    <th className="text-left px-4 py-2 text-muted-foreground">
                      BLOCKING
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="px-4 py-2 font-medium">AlertDialog</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      Destructive/irreversible actions
                    </td>
                    <td className="px-4 py-2">Yes (modal)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Dialog</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      Forms, creation flows
                    </td>
                    <td className="px-4 py-2">Yes (modal)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Sheet</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      Settings, navigation, details
                    </td>
                    <td className="px-4 py-2">Yes (slide-over)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium">Popover</td>
                    <td className="px-4 py-2 text-muted-foreground">
                      Contextual info, quick actions
                    </td>
                    <td className="px-4 py-2">No (floating)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div className="border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2">
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-destructive/50" />
              <div className="size-2 rounded-full bg-warning/50" />
              <div className="size-2 rounded-full bg-success/50" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              features.md
            </span>
          </div>
          <div className="p-4">
            <div className="mb-3 font-mono text-xs text-muted-foreground">
              [TEMPLATE_FEATURES]:
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div>
                <span className="text-success">&gt;</span> Confirmation dialog for
                destructive actions
              </div>
              <div>
                <span className="text-success">&gt;</span> Form dialog with inputs
                and validation
              </div>
              <div>
                <span className="text-success">&gt;</span> Side sheet for
                settings/navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Popover for contextual
                content
              </div>
              <div>
                <span className="text-success">&gt;</span> Accessible with
                keyboard navigation
              </div>
              <div>
                <span className="text-success">&gt;</span> Terminal-styled
                headers and labels
              </div>
            </div>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              [NOTE]: All patterns use Radix UI primitives for accessibility.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
