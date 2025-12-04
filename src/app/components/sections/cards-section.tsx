/**
 * ✅ FABRK COMPONENT
 * Cards Section - Card component examples
 * Production-ready ✓
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function CardsSection() {
  return (
    <section id="cards" className="space-y-6">
      <div>
        <span className="text-xs text-muted-foreground">[0x30]</span>
        <h2 className="text-2xl font-bold tracking-tight">CARDS</h2>
        <p className="text-xs text-muted-foreground">&gt; Content containers with subtle shadows</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Simple Card</CardTitle>
            <CardDescription>Basic card with title and description</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is a simple card component with header and content sections.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card with Actions</CardTitle>
            <CardDescription>Card with button actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Cards can contain any content including forms and buttons.
            </p>
            <div className="flex gap-2">
              <Button size="sm">&gt; ACTION</Button>
              <Button size="sm" variant="outline">&gt; CANCEL</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
