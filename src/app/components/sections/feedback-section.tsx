/**
 * ✅ FABRK COMPONENT
 * Feedback Section - Alerts and badges
 * Production-ready ✓
 */

import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Bell, X } from "lucide-react";

export function FeedbackSection() {
  return (
    <section id="feedback" className="space-y-6">
      <div>
        <span className="text-muted-foreground text-xs">[0x50]</span>
        <h2 className="text-2xl font-semibold tracking-tight">FEEDBACK</h2>
        <p className="text-muted-foreground text-xs">&gt; Alerts, badges, and status indicators</p>
      </div>

      <Card>
        <CardHeader code="0x50" title="Badges" meta="Status and category indicators" />
        <CardContent padding="md" className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="outline">Outline</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x51" title="Alerts" meta="Information and warning messages" />
        <CardContent padding="md" className="space-y-4">
          <Alert>
            <Bell className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>This is an informational alert with an icon.</AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </section>
  );
}
