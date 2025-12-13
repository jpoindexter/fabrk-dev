import { Metadata } from 'next';
import Link from 'next/link';
import { DocsCard, DocsSection } from '@/components/docs';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customization Guide - Fabrk Docs',
  description:
    'Learn how to customize Fabrk colors, themes, typography, and design system tokens. OKLCH color format explained.',
};

export default function CustomizationGuidePage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <div className="space-y-4">
        <div className="inline-block border border-border bg-muted px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[0xC1] CUSTOMIZATION</span>
        </div>
        <h1 className="font-mono text-3xl font-bold">Customization Guide</h1>
        <p className="text-muted-foreground">
          Complete guide to customizing Fabrk&apos;s design system: brand colors, themes,
          typography, and more.
        </p>
      </div>

      <div className="rounded-none border border-warning/50 bg-warning/10 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold">COMPREHENSIVE DOCUMENTATION AVAILABLE</p>
            <p className="text-sm text-muted-foreground">
              The complete Customization Guide (600+ lines) is available in the repository at{' '}
              <code className="rounded-none bg-muted px-1 py-0.5">
                docs/08-design/CUSTOMIZATION-GUIDE.md
              </code>
            </p>
            <p className="text-sm text-muted-foreground">
              This page provides a quick reference. For detailed instructions, see the markdown
              documentation.
            </p>
          </div>
        </div>
      </div>

      <DocsSection title="⚡ QUICK START">
        <DocsCard title="CHANGE BRAND COLORS (5 MIN)">
          <ol className="space-y-2">
            <li>
              1. Convert your brand color to OKLCH →{' '}
              <a
                href="https://oklch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                oklch.com
              </a>
            </li>
            <li>2. Open src/app/globals.css</li>
            <li>3. Find the :root block (~line 15)</li>
            <li>
              4. Update <code>--primary</code> and <code>--primary-foreground</code> tokens
            </li>
            <li>5. Run npm run scan:hex to verify</li>
          </ol>
          <p className="mt-4">
            <strong>Example:</strong>
          </p>
          <pre className="mt-2 overflow-x-auto bg-muted p-3 font-mono text-xs">
            {`:root {
  --primary: oklch(57% 0.21 276);           /* Your brand color */
  --primary-foreground: oklch(100% 0 0);    /* Text on brand color */
}`}
          </pre>
        </DocsCard>

        <DocsCard title="SWITCH COLOR THEMES">
          <p>Fabrk includes 12 retro terminal-inspired color themes:</p>
          <ul className="mt-4 space-y-1">
            <li>
              <strong>CRT Phosphor:</strong> green, amber, blue, red, purple
            </li>
            <li>
              <strong>Retro Computer:</strong> gameboy, c64, gbpocket, vic20, atari, spectrum
            </li>
            <li>
              <strong>Light:</strong> bw
            </li>
          </ul>
          <p className="mt-4">
            <strong>Change default theme:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Edit src/design-system/providers/ThemeProvider.tsx:82</li>
            <li>
              2. Change <code>defaultColorTheme = &apos;green&apos;</code> to your choice
            </li>
            <li>3. Restart dev server</li>
          </ol>
        </DocsCard>
      </DocsSection>

      <DocsSection title="🎨 ADVANCED CUSTOMIZATION">
        <DocsCard title="WHAT IS OKLCH?">
          <p>
            OKLCH is a perceptually uniform color space that makes it easier to create consistent,
            accessible color palettes.
          </p>
          <p className="mt-4">
            <strong>Format:</strong> <code>oklch(L% C H)</code>
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>L</strong> = Lightness (0-100%)
            </li>
            <li>
              <strong>C</strong> = Chroma (0-0.4, intensity)
            </li>
            <li>
              <strong>H</strong> = Hue (0-360°, color angle)
            </li>
          </ul>
          <p className="mt-4">
            <strong>Why OKLCH?</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Better color mixing than HSL</li>
            <li>Perceptually uniform (50% looks halfway bright)</li>
            <li>Future-proof CSS color format</li>
            <li>Better dark mode support</li>
          </ul>
        </DocsCard>

        <DocsCard title="CREATE A CUSTOM THEME (30 MIN)">
          <p>
            <strong>Steps:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Duplicate an existing theme section in globals.css</li>
            <li>
              2. Rename <code>[data-theme=&quot;yourtheme&quot;]</code>
            </li>
            <li>3. Update all CSS variables with OKLCH values</li>
            <li>4. Test contrast ratios (4.5:1 for text)</li>
            <li>5. Add theme to ThemeProvider.tsx</li>
            <li>6. Restart dev server</li>
          </ol>
          <p className="mt-4">
            <strong>Required Variables:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>--background, --foreground</li>
            <li>--card, --card-foreground</li>
            <li>--primary, --primary-foreground</li>
            <li>--muted, --muted-foreground</li>
            <li>--border, --input, --ring</li>
          </ul>
        </DocsCard>

        <DocsCard title="TYPOGRAPHY CUSTOMIZATION">
          <p>
            <strong>Change Monospace Font:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Install font: npm install @next/font</li>
            <li>2. Edit src/app/layout.tsx</li>
            <li>
              3. Replace <code>JetBrains_Mono</code> import
            </li>
            <li>
              4. Update <code>className</code> on body tag
            </li>
          </ol>
          <p className="mt-4">
            <strong>Recommended Monospace Fonts:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Fira Code (with ligatures)</li>
            <li>IBM Plex Mono (retro IBM feel)</li>
            <li>Space Mono (geometric terminal)</li>
            <li>VT323 (authentic CRT look)</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="🛠️ DESIGN TOKENS">
        <DocsCard title="SEMANTIC COLOR TOKENS">
          <p>
            <strong>Never hardcode colors.</strong> Always use semantic tokens:
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="font-semibold">Backgrounds</p>
              <ul className="mt-2 space-y-1">
                <li>bg-background</li>
                <li>bg-card</li>
                <li>bg-muted</li>
                <li>bg-primary</li>
                <li>bg-destructive</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Text</p>
              <ul className="mt-2 space-y-1">
                <li>text-foreground</li>
                <li>text-muted-foreground</li>
                <li>text-primary</li>
                <li>text-destructive</li>
              </ul>
            </div>
          </div>
          <p className="mt-4">
            <strong>Banned patterns:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>background-white, background-black</li>
            <li>bg-gray-*, text-gray-*</li>
            <li>#hexvalues</li>
            <li>rgb(), hsl()</li>
          </ul>
        </DocsCard>

        <DocsCard title="TERMINAL MODE OBJECT">
          <p>
            Import <code>mode</code> from design-system for consistent styling:
          </p>
          <pre className="mt-4 overflow-x-auto bg-muted p-3 font-mono text-xs">
            {`import { mode } from "@/design-system";

<Button className={cn(mode.radius, mode.font, "w-full")}>
  > SUBMIT
</Button>`}
          </pre>
          <p className="mt-4">
            <strong>Available tokens:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              mode.radius - Border radius (<code>rounded-none</code>)
            </li>
            <li>
              mode.font - Font family (<code>font-mono</code>)
            </li>
            <li>mode.inputStyle - Input styling classes</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="✅ VERIFICATION">
        <DocsCard title="TESTING CHECKLIST">
          <ul className="space-y-2">
            <li>☐ Run npm run scan:hex (should find zero hardcoded colors)</li>
            <li>☐ Test all 12 color themes (switch in theme dropdown)</li>
            <li>☐ Check contrast ratios (4.5:1 for text)</li>
            <li>☐ Verify mobile responsiveness</li>
            <li>☐ Test dark mode toggle</li>
            <li>☐ Run Lighthouse accessibility audit (90+ score)</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <div className="mt-8 space-y-4">
        <h2 className="font-mono text-xl font-bold">Related Documentation</h2>
        <div className="grid gap-4 sm:grid-cols-2">
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
            href="/docs/design/component-authoring"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Component Authoring</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Build custom components safely
            </p>
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
          <Link
            href="/docs/extras/theming"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Theming System</h3>
            <p className="mt-1 text-xs text-muted-foreground">How theming works internally</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
