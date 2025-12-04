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
    <div className="border-border bg-card border">
      <div className="border-border flex items-center gap-2 border-b px-4 py-2">
        <div className="flex gap-2">
          <div className="bg-destructive/50 size-2 rounded-none" />
          <div className="bg-warning/50 size-2 rounded-none" />
          <div className="bg-success/50 size-2 rounded-none" />
        </div>
        <span className="text-muted-foreground font-mono text-xs">side_sheet.tsx</span>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-1 font-mono font-semibold">Side Sheet</h3>
          <p className="text-muted-foreground font-mono text-xs">
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
          <SheetContent className="border-border rounded-none">
            <SheetHeader>
              <SheetTitle className="font-mono">[SETTINGS]</SheetTitle>
              <SheetDescription className="font-mono text-sm">
                Configure your application settings here.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-6">
              <div className="border-border border p-4">
                <div className="text-muted-foreground mb-2 font-mono text-xs">[GENERAL]:</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">Dark Mode</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-none font-mono text-xs"
                    >
                      TOGGLE
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">Notifications</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-none font-mono text-xs"
                    >
                      CONFIGURE
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-border border p-4">
                <div className="text-muted-foreground mb-2 font-mono text-xs">[ACCOUNT]:</div>
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

        <div className="text-muted-foreground mt-4 font-mono text-xs">
          [USE_CASE]: Settings, detail views, mobile navigation
        </div>
      </div>
    </div>
  );
}
