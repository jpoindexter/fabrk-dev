import { Metadata } from 'next';
import Link from 'next/link';
import { DocsCard, DocsSection } from '@/components/docs';

export const metadata: Metadata = {
  title: 'Customization Checklist - Fabrk Docs',
  description:
    'Complete 30-45 minute checklist to customize Fabrk before launch. Brand colors, logo, content, and configuration.',
};

export default function CustomizationChecklistPage() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-6 py-8">
      <div className="space-y-4">
        <div className="inline-block border border-border bg-muted px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[0xC0] CUSTOMIZATION</span>
        </div>
        <h1 className="font-mono text-3xl font-bold">Customization Checklist</h1>
        <p className="text-muted-foreground">
          <strong>Before you ship, make Fabrk yours.</strong> This checklist ensures your product
          looks professional and on-brand.
        </p>
        <p className="text-muted-foreground">
          ⏱️ <strong>Time required:</strong> 30-45 minutes for basic customization
        </p>
      </div>

      <DocsSection title="🎨 VISUAL IDENTITY (REQUIRED)">
        <DocsCard title="1. CHOOSE YOUR COLOR THEME (5 MIN)">
          <p>
            <strong>Default:</strong> Green CRT terminal
          </p>
          <p className="mt-2">
            <strong>Action:</strong> Pick a theme that matches your brand aesthetic.
          </p>
          <p className="mt-4">
            <strong>Options:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>Professional SaaS</strong> → blue (cool, trustworthy)
            </li>
            <li>
              <strong>Developer tools</strong> → green (classic terminal)
            </li>
            <li>
              <strong>Creative apps</strong> → purple or gameboy (playful)
            </li>
            <li>
              <strong>Warm/nostalgic</strong> → amber (cozy, vintage)
            </li>
            <li>
              <strong>Minimalist</strong> → bw or gbpocket (clean, focused)
            </li>
          </ul>
          <p className="mt-4">
            <strong>How to change:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Edit src/design-system/providers/ThemeProvider.tsx:82</li>
            <li>2. Change defaultColorTheme = 'green' to your choice</li>
            <li>3. Restart dev server</li>
          </ol>
          <p className="mt-4">
            <strong>Documentation:</strong>{' '}
            <Link href="/docs/design/theme-guide" className="text-primary hover:underline">
              Theme Guide
            </Link>
          </p>
        </DocsCard>

        <DocsCard title="2. SET YOUR BRAND COLORS (15 MIN)">
          <p>
            <strong>Default:</strong> Green primary color
          </p>
          <p className="mt-2">
            <strong>Action:</strong> Replace with your company's brand colors.
          </p>
          <p className="mt-4">
            <strong>Steps:</strong>
          </p>
          <ol className="mt-2 space-y-1">
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
            <li>2. Edit src/app/globals.css:root block (~line 15)</li>
            <li>3. Update --primary and --primary-foreground tokens</li>
            <li>4. Run npm run scan:hex to verify</li>
          </ol>
          <p className="mt-4">
            <strong>Documentation:</strong>{' '}
            <Link href="/docs/design/customization-guide" className="text-primary hover:underline">
              Customization Guide
            </Link>
          </p>
        </DocsCard>

        <DocsCard title="3. UPDATE LOGO & FAVICON (10 MIN)">
          <p>
            <strong>Default:</strong> Fabrk logo and branding
          </p>
          <p className="mt-2">
            <strong>Action:</strong> Replace with your company logo and favicon.
          </p>
          <p className="mt-4">
            <strong>Logo locations:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>/public/logo.svg - Main logo</li>
            <li>/public/logo-light.svg - Light theme variant</li>
            <li>/public/og-image.png - Social media preview (1200x630px)</li>
          </ul>
          <p className="mt-4">
            <strong>Favicon locations:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>/public/favicon.ico - Browser tab icon</li>
            <li>/public/icon.svg - Modern SVG icon</li>
            <li>/public/apple-touch-icon.png - iOS home screen (180x180px)</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="📝 CONTENT & COPY (REQUIRED)">
        <DocsCard title="4. UPDATE SITE METADATA (5 MIN)">
          <p>
            <strong>Location:</strong> src/app/layout.tsx
          </p>
          <p className="mt-2">
            <strong>Action:</strong> Set your product name, description, and SEO metadata.
          </p>
          <p className="mt-4">
            <strong>SEO best practices:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Title: 50-60 characters</li>
            <li>Description: 150-160 characters</li>
            <li>Include primary keywords naturally</li>
            <li>Match OpenGraph and Twitter metadata</li>
          </ul>
        </DocsCard>

        <DocsCard title="5. CUSTOMIZE LANDING PAGE COPY (10 MIN)">
          <p>
            <strong>Location:</strong> src/app/(marketing)/page.tsx
          </p>
          <p className="mt-2">
            <strong>Action:</strong> Replace with your product's value proposition.
          </p>
          <p className="mt-4">
            <strong>Writing tips:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Focus on benefits, not features</li>
            <li>Use active voice ("Ship faster" not "Faster shipping is enabled")</li>
            <li>Keep hero headline under 10 words</li>
            <li>Include clear call-to-action</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="⚙️ CONFIGURATION (REQUIRED)">
        <DocsCard title="6. SET ENVIRONMENT VARIABLES (10 MIN)">
          <p>
            <strong>Location:</strong> Vercel Dashboard → Settings → Environment Variables
          </p>
          <p className="mt-4">
            <strong>Required variables:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>DATABASE_URL - Database connection</li>
            <li>NEXTAUTH_SECRET - Auth secret (generate with: openssl rand -base64 32)</li>
            <li>NEXTAUTH_URL - Your production domain</li>
            <li>RESEND_API_KEY - Email API key</li>
            <li>STRIPE_SECRET_KEY or POLAR_ACCESS_TOKEN - Payment provider</li>
          </ul>
        </DocsCard>

        <DocsCard title="7. CONFIGURE DOMAIN (5 MIN)">
          <p>
            <strong>Steps:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Go to Vercel Dashboard → Project → Settings → Domains</li>
            <li>2. Add your domain: yourproduct.com</li>
            <li>3. Update DNS records at your registrar</li>
            <li>4. Wait for DNS propagation (5-60 min)</li>
          </ol>
        </DocsCard>

        <DocsCard title="8. SET UP PAYMENT PROVIDER (15-30 MIN)">
          <p>
            <strong>Choose one:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>
              <strong>Option A:</strong> Stripe - See{' '}
              <Link href="/docs/features/payments" className="text-primary hover:underline">
                Stripe Integration
              </Link>
            </li>
            <li>
              <strong>Option B:</strong> Polar - See{' '}
              <Link href="/docs/features/polar" className="text-primary hover:underline">
                Polar Integration
              </Link>
            </li>
            <li>
              <strong>Option C:</strong> Lemonsqueezy - See{' '}
              <Link href="/docs/features/lemonsqueezy" className="text-primary hover:underline">
                Lemonsqueezy Integration
              </Link>
            </li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="✅ QUALITY ASSURANCE (RECOMMENDED)">
        <DocsCard title="9. RUN ACCESSIBILITY AUDIT (5 MIN)">
          <p>
            <strong>Steps:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Open site in Chrome</li>
            <li>2. Open DevTools (F12) → Lighthouse tab</li>
            <li>3. Run "Accessibility" audit</li>
            <li>4. Target score: 90+</li>
          </ol>
          <p className="mt-4">
            <strong>Common issues:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Missing aria-label on icon-only buttons</li>
            <li>Insufficient color contrast (4.5:1 for text)</li>
            <li>Missing form labels</li>
          </ul>
        </DocsCard>

        <DocsCard title="10. TEST MOBILE RESPONSIVENESS (5 MIN)">
          <p>
            <strong>Test checklist:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>☐ Navigation menu opens/closes correctly</li>
            <li>☐ Forms are usable (inputs large enough to tap)</li>
            <li>☐ Text is readable (minimum 14px font size)</li>
            <li>☐ Buttons are tappable (minimum 44px touch targets)</li>
            <li>☐ No horizontal scrolling</li>
          </ul>
        </DocsCard>

        <DocsCard title="11. VERIFY DESIGN SYSTEM COMPLIANCE (2 MIN)">
          <p>
            <strong>Command:</strong>
          </p>
          <pre className="mt-2 bg-muted p-2 font-mono text-xs">npm run scan:hex</pre>
          <p className="mt-4">
            <strong>Expected output:</strong>
          </p>
          <pre className="mt-2 bg-muted p-2 font-mono text-xs">
            ✓ No hardcoded colors found{'\n'}✓ Design system compliance verified
          </pre>
        </DocsCard>

        <DocsCard title="12. PERFORMANCE CHECK (5 MIN)">
          <p>
            <strong>Steps:</strong>
          </p>
          <ol className="mt-2 space-y-1">
            <li>1. Build production version: npm run build</li>
            <li>2. Start production server: npm start</li>
            <li>3. Run Lighthouse performance audit</li>
          </ol>
          <p className="mt-4">
            <strong>Target scores:</strong>
          </p>
          <ul className="mt-2 space-y-1">
            <li>Performance: 90+</li>
            <li>Accessibility: 90+</li>
            <li>Best Practices: 95+</li>
            <li>SEO: 90+</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <DocsSection title="📋 FINAL CHECKLIST">
        <DocsCard title="BEFORE YOU SHIP">
          <ul className="space-y-1">
            <li>☐ ✅ Color theme selected and brand colors updated</li>
            <li>☐ ✅ Logo and favicon replaced</li>
            <li>☐ ✅ Site metadata (title, description, OG image) updated</li>
            <li>☐ ✅ Landing page copy reflects your product</li>
            <li>☐ ✅ Environment variables configured in Vercel</li>
            <li>☐ ✅ Custom domain connected and DNS configured</li>
            <li>☐ ✅ Payment provider configured and tested</li>
            <li>☐ ✅ Accessibility audit passed (90+ score)</li>
            <li>☐ ✅ Mobile responsiveness tested</li>
            <li>☐ ✅ Design system compliance verified</li>
            <li>☐ ✅ Performance audit passed (90+ score)</li>
          </ul>
        </DocsCard>
      </DocsSection>

      <div className="mt-12 flex gap-4 border-t border-border pt-8">
        <div className="flex-1">
          <Link
            href="/docs/getting-started"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Getting Started
          </Link>
        </div>
        <div className="flex-1 text-right">
          <Link
            href="/docs/design/customization-guide"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Customization Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
