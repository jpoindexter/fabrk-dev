/**
 * ✅ FABRK COMPONENT
 * Buttons Section - All button variants and states
 * Production-ready ✓
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Download, Heart, Settings } from "lucide-react";

export function ButtonsSection() {
  return (
    <section id="buttons" className="space-y-6">
      <div>
        <span className="text-xs text-muted-foreground">[0x10]</span>
        <h2 className="text-2xl font-bold tracking-tight">BUTTONS</h2>
        <p className="text-xs text-muted-foreground">&gt; Interactive elements with smooth press effects</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>All available button styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button Sizes</CardTitle>
          <CardDescription>Different size options</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button with Icons</CardTitle>
          <CardDescription>Buttons with leading and trailing icons</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Button>
          <Button>
            Download
            <Download className="ml-2 h-4 w-4" />
          </Button>
          <Button size="icon" aria-label="Like">
            <Heart className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button size="icon" variant="outline" aria-label="Settings">
            <Settings className="h-4 w-4" aria-hidden="true" />
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button States</CardTitle>
          <CardDescription>Loading and disabled states</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button loading loadingText="Saving...">Loading</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </CardContent>
      </Card>
    </section>
  );
}
