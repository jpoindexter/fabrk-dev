/**
 * ✅ FABRK COMPONENT
 * Dropdown Section - Dropdown menu examples
 * Production-ready ✓
 */

import { Button } from "@/components/ui/button";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, UserCog, Settings, Trash2, User } from "lucide-react";

export function DropdownSection() {
  return (
    <section id="dropdown-menus" className="space-y-6">
      <div>
        <span className="text-muted-foreground text-xs">[0x70]</span>
        <h2 className="text-2xl font-semibold tracking-tight">DROPDOWN_MENUS</h2>
        <p className="text-muted-foreground text-xs">&gt; Action menus with proper alignment</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TerminalCard>
          <TerminalCardHeader
            code="0x70"
            title="Right_Aligned_Menu"
            meta="For actions in table rows or right-side triggers"
          />
          <TerminalCardContent padding="md" className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-semibold">
                  <UserCog className="mr-2 h-4 w-4" />
                  Edit User
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive font-semibold">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TerminalCardContent>
        </TerminalCard>

        <TerminalCard>
          <TerminalCardHeader
            code="0x71"
            title="Left_Aligned_Menu"
            meta="For sidebar menus or left-positioned actions"
          />
          <TerminalCardContent padding="md" className="flex justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-semibold">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="font-semibold">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TerminalCardContent>
        </TerminalCard>
      </div>
    </section>
  );
}
