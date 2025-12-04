"use client";

/**
 * Password Card
 * Part of SecuritySettings split
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";

import { mode } from "@/lib/design-system/visual-mode";
import { cn } from "@/lib/utils";
export function SecurityPasswordCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className={cn("bg-primary/10 border-border border p-4", mode.radius)}>
            <Key className="text-primary h-6 w-6" />
          </div>
          <div>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password regularly to keep your account secure
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="outline">Change Password</Button>
      </CardContent>
    </Card>
  );
}
