/**
 * FABRK COMPONENT
 * Side Sheet - Slide-out panel for detailed content or navigation
 */

"use client";

import { Button } from "@/components/ui/button";
import { StyledCard, StyledCardHeader } from "@/components/ui/card";
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
import { mode } from "@/lib/design-system";
import { cn } from "@/lib/utils";

interface SideSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SideSheet({ open, onOpenChange }: SideSheetProps) {
  return (
    <StyledCard>
      <StyledCardHeader code="0x00" title="SIDE_SHEET" />
      <div className="p-6">
        <div className="mb-4">
          <h3 className={cn(mode.font, "mb-1 font-semibold")}>Side Sheet</h3>
          <p className={cn(mode.font, "text-muted-foreground text-xs")}>
            Slide-out panel for detailed content or navigation
          </p>
        </div>

        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="outline" className={cn(mode.radius, mode.font, "text-xs")}>
              <Menu className="mr-1 h-3 w-3" />
              &gt; OPEN_DRAWER
            </Button>
          </SheetTrigger>
          <SheetContent className={cn(mode.radius, "border-border")}>
            <SheetHeader>
              <SheetTitle className={cn(mode.font)}>[SETTINGS]</SheetTitle>
              <SheetDescription className={cn(mode.font, "text-sm")}>
                Configure your application settings here.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-6">
              <div className="border-border border p-4">
                <div className={cn(mode.font, "text-muted-foreground mb-2 text-xs")}>
                  [GENERAL]:
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={cn(mode.font, "text-sm")}>Dark Mode</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(mode.radius, mode.font, "h-7 text-xs")}
                    >
                      TOGGLE
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={cn(mode.font, "text-sm")}>Notifications</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(mode.radius, mode.font, "h-7 text-xs")}
                    >
                      CONFIGURE
                    </Button>
                  </div>
                </div>
              </div>
              <div className="border-border border p-4">
                <div className={cn(mode.font, "text-muted-foreground mb-2 text-xs")}>
                  [ACCOUNT]:
                </div>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className={cn(mode.radius, mode.font, "w-full justify-start text-xs")}
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn(mode.radius, mode.font, "w-full justify-start text-xs")}
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
                className={cn(mode.radius, mode.font, "text-xs")}
              >
                &gt; SAVE_CHANGES
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <div className={cn(mode.font, "text-muted-foreground mt-4 text-xs")}>
          [USE_CASE]: Settings, detail views, mobile navigation
        </div>
      </div>
    </StyledCard>
  );
}
