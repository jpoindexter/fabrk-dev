/**
 * ✅ FABRK COMPONENT
 * Customization Guide
 * Complete guide for customizing templates and design system
 *
 * NOTE: This file intentionally contains non-terminal design patterns (rounded corners, etc.)
 * as teaching examples. These are pedagogical - showing users how to customize.
 * Design system audit should skip this file.
 */
'use client';

import Link from 'next/link';
import { Palette, CheckCircle } from 'lucide-react';
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { LibraryBreadcrumb } from '@/components/library';

export default function CustomizationPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      {/* Breadcrumb Navigation */}
      <LibraryBreadcrumb
        items={[
          { label: 'Library', href: '/library' },
          { label: 'Docs', href: '/library/docs' },
          { label: 'Customization' },
        ]}
      />

      <section className="space-y-4">
        <div className="border-border inline-block border px-4 py-1">
          <span className={cn(mode.font, 'text-muted-foreground text-xs')}>
            [GUIDE]: CUSTOMIZATION
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className={cn('bg-primary/10 p-4', mode.radius)}>
            <Palette className="text-primary h-6 w-6" />
          </div>
          <div className="space-y-2">
            <h1 className={cn(mode.font, 'text-3xl font-semibold tracking-tight')}>
              Customization Guide
            </h1>
            <p className={cn(mode.font, 'text-muted-foreground text-base')}>
              Modify design system, change colors, update components, and add features to match your
              brand.
            </p>
          </div>
        </div>

        <div className="border-border border-l-primary flex items-center gap-6 border-l-2 pl-4">
          <div>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Time: </span>
            <span className={cn(mode.font, 'text-primary text-xs font-medium')}>~20 minutes</span>
          </div>
          <div>
            <span className={cn(mode.font, 'text-muted-foreground text-xs')}>Level: </span>
            <span className={cn(mode.font, 'text-primary text-xs font-medium')}>Intermediate</span>
          </div>
        </div>
      </section>

      {/* Design System Overview */}
      <Card>
        <CardHeader code="0x00" title="DESIGN SYSTEM OVERVIEW" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>
              Fabrk uses a centralized design system in{' '}
              <code className="bg-muted px-1">src/design-system.ts</code> and CSS variables in{' '}
              <code className="bg-muted px-1">globals.css</code>. All templates use these tokens for
              consistency.
            </p>

            <div className="bg-muted/30 border-border border p-4">
              <p className="text-primary mb-2 font-medium">[DESIGN SYSTEM FILES]:</p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                <li>
                  <code className="bg-muted px-1">src/design-system.ts</code> - TypeScript design
                  tokens
                </li>
                <li>
                  <code className="bg-muted px-1">src/app/globals.css</code> - CSS variables for
                  colors
                </li>
                <li>
                  <code className="bg-muted px-1">tailwind.config.ts</code> - Tailwind configuration
                </li>
                <li>
                  <code className="bg-muted px-1">DESIGN_SYSTEM.md</code> - Complete specification
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Colors */}
      <Card>
        <CardHeader code="0x01" title="CHANGE COLORS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Update color scheme by modifying CSS variables:</p>

            <CodeBlock
              code={`/* src/app/globals.css */
@layer base {
  :root {
    --background: 0 0% 100%;     /* White background */
    --foreground: 240 10% 3.9%;  /* Nearly black text */
    --primary: 271 91% 65%;      /* Purple accent */
    --secondary: 240 5.9% 10%;   /* Dark gray */
    --muted: 240 4.8% 95.9%;     /* Light gray */
    --border: 240 5.9% 90%;      /* Border color */

    /* Add custom colors */
    --brand: 200 95% 50%;        /* Your brand color */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --primary: 271 91% 65%;
    /* ... dark mode colors */
  }
}`}
              language="css"
              maxHeight="350px"
            />

            <div className="border-border border p-4">
              <p className="text-primary mb-2 font-medium">[COLOR TOOL]:</p>
              <p className="text-muted-foreground">
                Use{' '}
                <a
                  href="https://uicolors.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  uicolors.app
                </a>{' '}
                to generate HSL color scales, then copy values to globals.css.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Change Typography */}
      <Card>
        <CardHeader code="0x02" title="CHANGE TYPOGRAPHY" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Replace terminal font with your brand font:</p>

            <CodeBlock
              code={`// src/app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>  {/* Remove font-mono */}
        {children}
      </body>
    </html>
  );
}`}
              language="tsx"
              maxHeight="250px"
            />

            <p>Update design system tokens:</p>

            <CodeBlock
              code={`// src/design-system.ts
export const mode = {
  font: "", // Remove font-mono
  radius: "rounded" + "-lg", // Example: Change from rounded-none to rounded corners
  // ... rest of design system
};`}
              language="typescript"
              maxHeight="150px"
            />
          </div>
        </CardContent>
      </Card>

      {/* Change Border Radius */}
      <Card>
        <CardHeader code="0x03" title="CHANGE BORDER RADIUS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Switch from sharp terminal aesthetic to rounded design:</p>

            <CodeBlock
              code={`// src/design-system.ts
export const mode = {
  font: "font-sans",
  radius: "rounded" + "-lg",  // Example: rounded corners (change from rounded-none)
  // Components automatically inherit this
};

/* src/app/globals.css */
@layer base {
  :root {
    --radius: 0.5rem;  /* 8px = rounded corners */
  }
}`}
              language="typescript"
              maxHeight="200px"
            />

            <div className="bg-muted/30 border-border border p-4">
              <p className="text-primary mb-2 font-medium">[RADIUS VALUES]:</p>
              <ul className="text-muted-foreground list-inside list-disc space-y-1 pl-2">
                <li>
                  <code className="bg-muted px-1">rounded-none</code> → 0px (terminal default)
                </li>
                <li>
                  <code className="bg-muted px-1">rounded{'‑'}sm</code> → 2px (subtle)
                </li>
                <li>
                  <code className="bg-muted px-1">rounded{'‑'}md</code> → 6px (moderate)
                </li>
                <li>
                  <code className="bg-muted px-1">rounded{'‑'}lg</code> → 8px (soft)
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modify Components */}
      <Card>
        <CardHeader code="0x04" title="MODIFY COMPONENTS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Customize individual template components:</p>

            <div className="space-y-4">
              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Change button style:</p>
                <CodeBlock
                  code={`// Before: Terminal style
<Button className={cn(mode.radius, mode.font, "text-xs")}>
  > SUBMIT
</Button>

// After: Modern style (example with custom radius)
<Button className={"rounded" + "-lg font-sans text-sm"}>
  Submit
</Button>`}
                  language="tsx"
                  maxHeight="180px"
                />
              </div>

              <div className="border-border border-l-primary border-l-2 pl-4">
                <p className="font-medium">Update card headers:</p>
                <CodeBlock
                  code={`// Replace terminal headers
- <CardHeader code="0x00" title="SECTION_NAME" />

// With standard headers
+ <CardHeader>
+   <h2>Section Name</h2>
+ </CardHeader>`}
                  language="tsx"
                  maxHeight="150px"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Custom Features */}
      <Card>
        <CardHeader code="0x05" title="ADD CUSTOM FEATURES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>Extend templates with new functionality:</p>

            <div className="space-y-4">
              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">1. Add Search to Tables:</p>
                <CodeBlock
                  code={`const [searchQuery, setSearchQuery] = useState("");

const filteredData = data.filter(item =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase())
);

<Input
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>`}
                  language="tsx"
                  maxHeight="200px"
                />
              </div>

              <div className="border-border border p-4">
                <p className="text-primary mb-2 font-medium">2. Add Export Functionality:</p>
                <CodeBlock
                  code={`function exportToCSV(data) {
  const csv = data.map(row => Object.values(row).join(",")).join("\\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "export.csv";
  a.click();
}`}
                  language="typescript"
                  maxHeight="220px"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Changes */}
      <Card>
        <CardHeader code="0x06" title="TESTING CHANGES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>After making customizations, verify everything works:</p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Run type check:</p>
                  <CodeBlock code="npm run type-check" language="bash" maxHeight="60px" />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Test in multiple themes:</p>
                  <p className="text-muted-foreground">
                    Toggle light/dark mode to verify colors work
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Check responsive design:</p>
                  <p className="text-muted-foreground">Test on mobile, tablet, and desktop sizes</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                <div>
                  <p className="font-medium">Verify accessibility:</p>
                  <p className="text-muted-foreground">
                    Use Lighthouse audit to check color contrast and keyboard navigation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader code="0x07" title="BEST PRACTICES" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
              <li>
                <span className="font-medium">Use design tokens:</span> Always use CSS variables
                instead of hardcoded colors
              </li>
              <li>
                <span className="font-medium">Maintain consistency:</span> Update design-system.ts
                so all templates inherit changes
              </li>
              <li>
                <span className="font-medium">Test thoroughly:</span> Verify changes work across all
                templates you're using
              </li>
              <li>
                <span className="font-medium">Document changes:</span> Keep notes on customizations
                for future updates
              </li>
              <li>
                <span className="font-medium">Version control:</span> Commit design system changes
                separately from feature work
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader code="0x08" title="NEXT STEPS" />
        <CardContent padding="md">
          <div className={cn(mode.font, 'space-y-4 text-xs')}>
            <p>After customizing your templates:</p>

            <ul className="text-muted-foreground list-inside list-disc space-y-2 pl-2">
              <li>
                <Link href="/library/docs/troubleshooting" className="text-primary hover:underline">
                  Check troubleshooting
                </Link>{' '}
                if you encounter issues
              </li>
              <li>
                <Link href="/library" className="text-primary hover:underline">
                  Browse more templates
                </Link>{' '}
                to add to your project
              </li>
              <li>
                <Link href="/docs" className="text-primary hover:underline">
                  Read component docs
                </Link>{' '}
                for advanced customization
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
