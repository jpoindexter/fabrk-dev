import { Metadata } from 'next';
import Link from 'next/link';
import { DocsCard, DocsSection } from '@/components/docs';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Component Authoring Guide - Fabrk Docs',
  description:
    'Learn how to extend Fabrk design system safely. Component patterns, accessibility rules, and terminal aesthetic guidelines.',
};

export default function ComponentAuthoringPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <div className="space-y-4">
        <div className="inline-block border border-border bg-muted px-4 py-1">
          <span className="font-mono text-xs text-muted-foreground">[0xC2] AUTHORING</span>
        </div>
        <h1 className="font-mono text-3xl font-bold">Component Authoring Guide</h1>
        <p className="text-muted-foreground">
          Extend Fabrk&apos;s design system safely. Build custom components that maintain the
          terminal aesthetic and design consistency.
        </p>
      </div>

      <div className="rounded-none border border-warning/50 bg-warning/10 p-6">
        <div className="flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold">COMPREHENSIVE DOCUMENTATION AVAILABLE</p>
            <p className="text-sm text-muted-foreground">
              The complete Component Authoring Guide (600+ lines) is available in the repository at{' '}
              <code className="rounded-none bg-muted px-1 py-0.5">
                docs/08-design/COMPONENT-AUTHORING.md
              </code>
            </p>
            <p className="text-sm text-muted-foreground">
              This page provides quick reference and examples. For detailed patterns, see the
              markdown documentation.
            </p>
          </div>
        </div>
      </div>

      <DocsSection title="📋 CORE PRINCIPLES">
        <DocsCard title="THE THREE RULES">
          <ol className="space-y-2">
            <li>
              <strong>1. No hardcoded colors</strong> - Always use CSS variables from design tokens
            </li>
            <li>
              <strong>2. Terminal aesthetic</strong> - Monospace fonts, sharp corners, structured
              layout
            </li>
            <li>
              <strong>3. Accessibility first</strong> - WCAG 2.1 AA minimum (4.5:1 contrast)
            </li>
          </ol>
        </DocsCard>

        <DocsCard title="QUICK REFERENCE PATTERN">
          <pre className="overflow-x-auto bg-muted p-4 font-mono text-xs">
            {`import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export function MyComponent({ className, ...props }) {
  return (
    <div
      className={cn(
        // Layout
        "flex items-center gap-2",
        // Terminal aesthetics
        mode.radius,  // rounded-none
        mode.font,    // font-mono
        // Design tokens (NO hardcoded colors!)
        "bg-card text-card-foreground",
        "border border-border",
        // States
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring",
        // Custom overrides
        className
      )}
      {...props}
    />
  );
}`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="✅ DO / ❌ DON&apos;T">
        <DocsCard title="DESIGN TOKENS">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-success">✅ DO: Use Semantic Tokens</p>
              <pre className="mt-2 overflow-x-auto bg-muted p-2 font-mono text-xs">
                {`className="bg-background text-foreground"
className="bg-card border-border"
className="text-primary hover:bg-accent"`}
              </pre>
            </div>
            <div>
              <p className="font-semibold text-destructive">❌ DON&apos;T: Hardcode Colors</p>
              {/* eslint-disable design-system/no-hardcoded-colors -- Documentation example showing incorrect patterns */}
              <pre className="mt-2 overflow-x-auto bg-muted p-2 font-mono text-xs">
                {`className="bg-white text-black"
className="bg-gray-100 border-gray-300"
style={{ backgroundColor: "#ffffff" }}`}
              </pre>
              {/* eslint-enable design-system/no-hardcoded-colors */}
            </div>
          </div>
        </DocsCard>

        <DocsCard title="TERMINAL AESTHETIC">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-success">✅ CORRECT: Sharp Corners</p>
              <pre className="mt-2 overflow-x-auto bg-muted p-2 font-mono text-xs">
                {`import { mode } from "@/design-system";

<Button className={mode.radius}>Click Me</Button>
// Renders: rounded-none`}
              </pre>
            </div>
            <div>
              <p className="font-semibold text-destructive">❌ WRONG: Rounded Corners</p>
              <pre className="mt-2 overflow-x-auto bg-muted p-2 font-mono text-xs">
                {`<Button className="rounded-md">Click Me</Button>
<Button className="rounded-lg">Click Me</Button>`}
              </pre>
            </div>
          </div>
        </DocsCard>

        <DocsCard title="ACCESSIBILITY">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-success">✅ CORRECT: Focus States</p>
              <pre className="mt-2 overflow-x-auto bg-muted p-2 font-mono text-xs">
                {`<button
  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  Click Me
</button>`}
              </pre>
            </div>
            <div>
              <p className="font-semibold text-destructive">❌ WRONG: No Focus</p>
              <pre className="mt-2 overflow-x-auto bg-muted p-2 font-mono text-xs">
                {`<button className="focus:outline-none">
  Click Me
</button>`}
              </pre>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      <DocsSection title="🔨 COMPONENT PATTERNS">
        <DocsCard title="BUTTON PATTERN">
          <pre className="overflow-x-auto bg-muted p-4 font-mono text-xs">
            {`import { mode } from "@/design-system";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 text-xs",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:opacity-50 disabled:pointer-events-none",
    mode.radius,
    mode.font
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1",
      },
    },
  }
);`}
          </pre>
        </DocsCard>

        <DocsCard title="CARD PATTERN">
          <pre className="overflow-x-auto bg-muted p-4 font-mono text-xs">
            {`import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

export function MyCard({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground",
        "border border-border",
        "shadow-sm",
        mode.radius,
        className
      )}
      {...props}
    />
  );
}`}
          </pre>
        </DocsCard>

        <DocsCard title="FORM INPUT PATTERN">
          <pre className="overflow-x-auto bg-muted p-4 font-mono text-xs">
            {`export const MyInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full px-3 py-2 text-xs",
          "bg-background text-foreground",
          "border border-input",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          mode.radius,
          mode.font,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);`}
          </pre>
        </DocsCard>
      </DocsSection>

      <DocsSection title="♿ ACCESSIBILITY REQUIREMENTS">
        <DocsCard title="1. FOCUS VISIBLE STATES">
          <p>All interactive elements must have visible focus indicators:</p>
          <pre className="mt-4 overflow-x-auto bg-muted p-4 font-mono text-xs">
            {`// ✅ CORRECT
<button
  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
  Click Me
</button>

// ❌ WRONG - No visible focus!
<button className="focus:outline-none">Click Me</button>`}
          </pre>
        </DocsCard>

        <DocsCard title="2. ARIA LABELS FOR ICON BUTTONS">
          <p>Icon-only buttons must have aria-label:</p>
          <pre className="mt-4 overflow-x-auto bg-muted p-4 font-mono text-xs">
            {`// ✅ CORRECT
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// ❌ WRONG - Screen reader can't announce purpose
<Button size="icon">
  <X className="h-4 w-4" />
</Button>`}
          </pre>
        </DocsCard>

        <DocsCard title="3. COLOR CONTRAST">
          <p>Required: 4.5:1 for normal text, 3:1 for large text and UI components.</p>
          <p className="mt-2">
            <strong>Verify:</strong> Run <code>npm run scan:hex</code> to catch hardcoded colors.
          </p>
        </DocsCard>

        <DocsCard title="4. KEYBOARD NAVIGATION">
          <p>All interactive elements must be keyboard accessible.</p>
          <p className="mt-2">
            <strong>Best Practice:</strong> Use semantic HTML ({`<button>`}, {`<a>`},{' '}
            {`<input>`}) instead of divs with click handlers.
          </p>
        </DocsCard>
      </DocsSection>

      <DocsSection title="✅ VERIFICATION CHECKLIST">
        <DocsCard title="BEFORE COMMITTING">
          <ul className="space-y-2">
            <li>☐ No Hardcoded Colors - Run npm run scan:hex</li>
            <li>
              ☐ Terminal Aesthetic - Uses mode.radius (sharp corners), mode.font (monospace)
            </li>
            <li>☐ Accessibility - Focus states visible, icon buttons have aria-label</li>
            <li>☐ Design Tokens Only - All colors use semantic tokens</li>
            <li>☐ TypeScript Typed - Proper interfaces and prop types</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="🧪 TESTING YOUR COMPONENT">
        <DocsCard title="1. VISUAL TESTING">
          <pre className="overflow-x-auto bg-muted p-4 font-mono text-xs">npm run dev</pre>
          <p className="mt-2">
            <strong>Check:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Component renders correctly</li>
            <li>Hover states work</li>
            <li>Focus states visible</li>
            <li>Disabled states styled</li>
            <li>Mobile responsive</li>
          </ul>
        </DocsCard>

        <DocsCard title="2. THEME SWITCHING">
          <p>
            <strong>Test all 12 themes:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Open theme dropdown</li>
            <li>2. Switch between green, amber, blue, red, purple</li>
            <li>3. Try retro themes: gameboy, c64, vic20</li>
            <li>4. Verify component looks good in all themes</li>
          </ol>
          <p className="mt-4">
            <strong>Common issues:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Hardcoded colors don&apos;t switch</li>
            <li>Contrast too low in some themes</li>
            <li>Borders invisible in certain themes</li>
          </ul>
        </DocsCard>

        <DocsCard title="3. ACCESSIBILITY AUDIT">
          <pre className="overflow-x-auto bg-muted p-4 font-mono text-xs">
            {`# 1. Start dev server
npm run dev

# 2. Open Chrome DevTools → Lighthouse
# 3. Run accessibility audit
# 4. Target score: 90+`}
          </pre>
          <p className="mt-4">
            <strong>Common failures:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Missing aria-label on icon buttons</li>
            <li>Insufficient contrast</li>
            <li>Non-semantic HTML (divs as buttons)</li>
            <li>Missing focus indicators</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <div className="mt-8 space-y-4">
        <h2 className="font-mono text-xl font-bold">Related Documentation</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/docs/design/customization-guide"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Customization Guide</h3>
            <p className="mt-1 text-xs text-muted-foreground">Change brand colors and themes</p>
          </Link>
          <Link
            href="/docs/design/theme-guide"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Theme Guide</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Explore all 12 terminal-inspired themes
            </p>
          </Link>
          <Link
            href="/docs/components/overview"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Components Overview</h3>
            <p className="mt-1 text-xs text-muted-foreground">Browse all 77 UI components</p>
          </Link>
          <Link
            href="/docs/customization-checklist"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Customization Checklist</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              30-45 min pre-launch checklist
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
