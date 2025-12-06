/**
 * Quick Actions Component
 * Displays common tasks and shortcuts
 */

"use client";

import Link from "next/link";
import { TerminalCard, TerminalCardHeader, TerminalCardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield, CreditCard, FileText, Users } from "lucide-react";

interface QuickActionsProps {
  isAdmin?: boolean;
}

export function QuickActions({ isAdmin }: QuickActionsProps) {
  return (
    <TerminalCard className="col-span-3">
      <TerminalCardHeader code="0x00" title="QUICK_ACTIONS" meta="Common tasks and shortcuts" />
      <TerminalCardContent className="space-y-2">
        <Link href="/profile">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
        <Link href="/settings/security">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="mr-2 h-4 w-4" />
            Security Settings
          </Button>
        </Link>
        <Link href="/billing">
          <Button variant="outline" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing & Plans
          </Button>
        </Link>
        <Link href="/account">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Account Settings
          </Button>
        </Link>

        {isAdmin && (
          <Link href="/admin">
            <Button variant="outline" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Button>
          </Link>
        )}
      </TerminalCardContent>
    </TerminalCard>
  );
}
