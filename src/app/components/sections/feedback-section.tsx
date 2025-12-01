/**
 * ✅ FABRK COMPONENT
 * Feedback Section - Alerts and badges
 * Production-ready ✓
 */

import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, X } from "lucide-react";

export function FeedbackSection() {
  return (
    <section id="feedback" className="space-y-6">
      <div>
        <span className="text-xs text-muted-foreground">[0x50]</span>
        <h2 className="text-2xl font-bold tracking-tight">FEEDBACK</h2>
        <p className="text-xs text-muted-foreground">&gt; Alerts, badges, and status indicators</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status and category indicators</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Information and warning messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This is an informational alert with an icon.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </section>
  );
}
