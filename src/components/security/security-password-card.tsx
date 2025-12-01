"use client";

/**
 * Password Card
 * Part of SecuritySettings split
 */

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Key } from "lucide-react";

export function SecurityPasswordCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-none bg-primary/10 border border-border">
            <Key className="h-6 w-6 text-primary" />
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
