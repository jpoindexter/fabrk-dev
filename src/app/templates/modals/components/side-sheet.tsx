/**
 * FABRK COMPONENT
 * Side Sheet - Slide-out panel for detailed content or navigation
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Edit, Settings } from "lucide-react";

interface SideSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SideSheet({ open, onOpenChange }: SideSheetProps) {
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-2">
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

        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="outline" className="rounded-none font-mono text-xs">
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
                onClick={() => onOpenChange(false)}
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
  );
}
