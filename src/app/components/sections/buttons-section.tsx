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
        <span className="text-muted-foreground text-xs">[0x10]</span>
        <h2 className="text-2xl font-semibold tracking-tight">BUTTONS</h2>
        <p className="text-muted-foreground text-xs">
          &gt; Interactive elements with smooth press effects
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>All available button styles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>&gt; DEFAULT</Button>
            <Button variant="destructive">&gt; DESTRUCTIVE</Button>
            <Button variant="outline">&gt; OUTLINE</Button>
            <Button variant="secondary">&gt; SECONDARY</Button>
            <Button variant="ghost">&gt; GHOST</Button>
            <Button variant="link">&gt; LINK</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button Sizes</CardTitle>
          <CardDescription>Different size options</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-4">
          <Button size="sm">&gt; SMALL</Button>
          <Button size="default">&gt; DEFAULT</Button>
          <Button size="lg">&gt; LARGE</Button>
          <Button size="xl">&gt; EXTRA_LARGE</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button with Icons</CardTitle>
          <CardDescription>Buttons with leading and trailing icons</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            &gt; EMAIL
          </Button>
          <Button>
            &gt; DOWNLOAD
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
        <CardContent className="flex flex-wrap gap-4">
          <Button loading loadingText="> SAVING...">
            &gt; LOADING
          </Button>
          <Button disabled>&gt; DISABLED</Button>
          <Button variant="outline" disabled>
            &gt; DISABLED_OUTLINE
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
