/**
 * ✅ FABRK COMPONENT
 * Typography Section - Text styles and headings
 * Production-ready ✓
 */

import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function TypographySection() {
  return (
    <section id="typography" className="space-y-6">
      <div>
        <span className="text-muted-foreground text-xs">[0x40]</span>
        <h2 className="text-2xl font-semibold tracking-tight">TYPOGRAPHY</h2>
        <p className="text-muted-foreground text-xs">&gt; Text styles and formatting</p>
      </div>

      <Card>
        <CardHeader code="0x40" title="Headings" />
        <CardContent padding="md" className="space-y-4">
          <h1 className="text-4xl font-semibold">Heading 1</h1>
          <h2 className="text-3xl font-semibold">Heading 2</h2>
          <h3 className="text-2xl font-semibold">Heading 3</h3>
          <h4 className="text-xl font-semibold">Heading 4</h4>
          <h5 className="text-lg font-semibold">Heading 5</h5>
          <h6 className="text-base font-semibold">Heading 6</h6>
        </CardContent>
      </Card>

      <Card>
        <CardHeader code="0x41" title="Text_Styles" />
        <CardContent padding="md" className="space-y-4">
          <p className="text-lg">Large text for important content.</p>
          <p className="text-base">Base text for body content.</p>
          <p className="text-muted-foreground text-sm">
            Small muted text for secondary information.
          </p>
          <p className="text-muted-foreground text-xs">Extra small text for captions.</p>
        </CardContent>
      </Card>
    </section>
  );
}
