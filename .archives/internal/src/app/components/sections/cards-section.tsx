/**
 * ✅ FABRK COMPONENT
 * Cards Section - Card component examples
 * Production-ready ✓
 */

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function CardsSection() {
  return (
    <section id="cards" className="space-y-6">
      <div>
        <span className="text-muted-foreground text-xs">[0x30]</span>
        <h2 className="text-2xl font-semibold tracking-tight">CARDS</h2>
        <p className="text-muted-foreground text-xs">&gt; Content containers with subtle shadows</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader
            code="0x30"
            title="Simple_Card"
            meta="Basic card with title and description"
          />
          <CardContent padding="md">
            <p className="text-muted-foreground text-sm">
              This is a simple card component with header and content sections.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            code="0x31"
            title="Card_With_Actions"
            meta="Card with button actions"
          />
          <CardContent padding="md" className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Cards can contain any content including forms and buttons.
            </p>
            <div className="flex gap-2">
              <Button size="sm">&gt; ACTION</Button>
              <Button size="sm" variant="outline">
                &gt; CANCEL
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
