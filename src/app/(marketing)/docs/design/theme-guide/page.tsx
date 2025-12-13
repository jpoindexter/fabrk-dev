import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Theme Guide - Fabrk Docs',
  description:
    'Explore all 12 retro terminal-inspired color themes with use cases, historical context, and pairing recommendations.',
};

export default function ThemeGuidePage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <div className="space-y-4">
        <div className="inline-block border border-border bg-muted px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[0xD1] THEMES</span>
        </div>
        <h1 className="font-mono text-3xl font-bold">Theme Guide</h1>
        <p className="text-muted-foreground">
          Complete documentation for all 12 retro terminal-inspired color themes.
        </p>
      </div>

      <div className="rounded-none border border-warning/50 bg-warning/10 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold">COMPREHENSIVE DOCUMENTATION AVAILABLE</p>
            <p className="text-sm text-muted-foreground">
              The complete Theme Guide (400+ lines) is available in the repository at{' '}
              <code className="rounded-none bg-muted px-1 py-0.5">
                docs/08-design/THEME-GUIDE.md
              </code>
            </p>
            <p className="text-sm text-muted-foreground">
              Interactive page version coming soon. For now, please refer to the markdown
              documentation.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-mono text-xl font-bold">Quick Reference</h2>
        <p>Fabrk includes 12 retro-inspired color themes:</p>

        <div className="space-y-4">
          <div>
            <h3 className="font-mono text-sm font-semibold">CRT Phosphor Themes (5)</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><code>green</code> - Classic terminal green phosphor</li>
              <li><code>amber</code> - Warm amber monochrome</li>
              <li><code>blue</code> - Cool phosphor blue</li>
              <li><code>red</code> - Alert red CRT</li>
              <li><code>purple</code> - Creative purple/magenta</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold">Retro Computer Themes (6)</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><code>gameboy</code> - Game Boy pea soup green LCD</li>
              <li><code>c64</code> - Commodore 64 blue</li>
              <li><code>gbpocket</code> - Game Boy Pocket grayscale</li>
              <li><code>vic20</code> - VIC-20 cyan terminal</li>
              <li><code>atari</code> - Atari 800 blue</li>
              <li><code>spectrum</code> - ZX Spectrum black/white</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm font-semibold">Light Theme (1)</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><code>bw</code> - Black & White paper-like</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="font-mono text-xl font-bold">Related Documentation</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/docs/design/customization-guide"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Customization Guide</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Change brand colors and create custom themes
            </p>
          </Link>
          <Link
            href="/docs/extras/theming"
            className="block rounded-none border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-mono text-sm font-semibold">Theming System</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              How the theming system works
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
