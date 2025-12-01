/**
 * ✅ FABRK COMPONENT
 * Typography Section - Text styles and headings
 * Production-ready ✓
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TypographySection() {
  return (
    <section id="typography" className="space-y-6">
      <div>
        <span className="text-xs text-muted-foreground">[0x40]</span>
        <h2 className="text-2xl font-bold tracking-tight">TYPOGRAPHY</h2>
        <p className="text-xs text-muted-foreground">&gt; Text styles and formatting</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Headings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h1 className="text-4xl font-bold">Heading 1</h1>
          <h2 className="text-3xl font-bold">Heading 2</h2>
          <h3 className="text-2xl font-bold">Heading 3</h3>
          <h4 className="text-xl font-bold">Heading 4</h4>
          <h5 className="text-lg font-bold">Heading 5</h5>
          <h6 className="text-base font-bold">Heading 6</h6>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Text Styles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">Large text for important content.</p>
          <p className="text-base">Base text for body content.</p>
          <p className="text-sm text-muted-foreground">Small muted text for secondary information.</p>
          <p className="text-xs text-muted-foreground">Extra small text for captions.</p>
        </CardContent>
      </Card>
    </section>
  );
}
