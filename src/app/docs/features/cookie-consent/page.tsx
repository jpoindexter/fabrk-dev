"use client";

import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard, DocsLinkCard, DocsPreview } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Cookie, Shield, Settings, Download } from "lucide-react";
import { useState } from "react";

// Terminal-styled cookie consent preview
function CookieConsentDemo() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    preferences: false,
    statistics: false,
    marketing: false,
  });

  return (
    <div className="w-full max-w-md border border-border bg-card">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="size-2 rounded-none bg-destructive/50" />
          <div className="size-2 rounded-none bg-warning/50" />
          <div className="size-2 rounded-none bg-success/50" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">cookie_consent.exe</span>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Cookie className="h-4 w-4 text-primary" />
          <span className="font-mono text-xs font-semibold">[COOKIE_PREFERENCES]</span>
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          &gt; We use cookies to enhance your experience. Select your preferences:
        </p>

        <div className="space-y-2">
          {[
            { key: "necessary", label: "NECESSARY", locked: true },
            { key: "preferences", label: "PREFERENCES", locked: false },
            { key: "statistics", label: "STATISTICS", locked: false },
            { key: "marketing", label: "MARKETING", locked: false },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between border border-border bg-background p-2">
              <span className="font-mono text-xs">{item.label}</span>
              <button
                onClick={() => !item.locked && setPreferences(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))}
                className={`font-mono text-xs px-2 py-0.5 border ${
                  preferences[item.key as keyof typeof preferences]
                    ? "border-success text-success"
                    : "border-border text-muted-foreground"
                } ${item.locked ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-primary"}`}
                disabled={item.locked}
              >
                {preferences[item.key as keyof typeof preferences] ? "[ON]" : "[OFF]"}
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 border border-border bg-background px-3 py-1.5 font-mono text-xs hover:border-primary">
            &gt; REJECT_ALL
          </button>
          <button className="flex-1 border border-primary bg-primary px-3 py-1.5 font-mono text-xs text-primary-foreground">
            &gt; ACCEPT_ALL
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CookieConsentPage() {
  return (
    <FeatureGuideTemplate
      code="[0x80]"
      category="Features"
      title="Cookie_Consent_GDPR"
      description="GDPR-compliant cookie banner with Google Consent Mode v2 integration."
      overview="If your app has users in Europe, you're legally required to ask permission before tracking them with cookies. This component handles that for you. Think of it like asking guests if they want coffee before pouring - some want it (marketing cookies), some don't (privacy-focused users). This lets them choose."
      features={[
        { icon: Shield, title: "Legal Compliance", description: "GDPR (Europe), CCPA (California), and other privacy regulations. Fines up to 4% of annual revenue for violations." },
        { icon: Cookie, title: "Google Consent Mode v2", description: "Required since March 2024 for Google Ads remarketing and Analytics features." },
        { icon: Settings, title: "Granular Control", description: "Four cookie categories: Necessary (always on), Preferences, Statistics, and Marketing." },
        { icon: Download, title: "Data Export", description: "Built-in 'Download My Data' button for GDPR right to access compliance." },
      ]}
      setup={[
        {
          title: "Already Included",
          description: "The cookie consent component is already in your layout. No setup required!",
          code: `// Already in src/app/layout.tsx
import { CookieConsent } from "@/components/cookie-consent";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieConsent />  {/* Automatically shows for new visitors */}
      </body>
    </html>
  );
}`,
          language: "tsx",
        },
      ]}
      usage={[
        {
          title: "Google Tag Manager Integration",
          description: "The component automatically integrates with Google Consent Mode v2",
          code: `// Automatically called when user saves preferences
gtag("consent", "update", {
  ad_storage: marketing ? "granted" : "denied",
  ad_user_data: marketing ? "granted" : "denied",
  ad_personalization: marketing ? "granted" : "denied",
  analytics_storage: statistics ? "granted" : "denied",
  functionality_storage: preferences ? "granted" : "denied",
  personalization_storage: marketing ? "granted" : "denied",
});

// Event also pushed for GTM triggers
dataLayer.push({
  event: "cookie_consent_update",
  cookie_consent: { necessary, preferences, statistics, marketing }
});`,
          language: "typescript",
        },
        {
          title: "Add/Remove Cookie Categories",
          description: "Edit the categories in src/components/cookie-consent-tabs.tsx",
          code: `// In DetailsTabContent function
const categories: CookieCategory[] = [
  {
    id: "necessary",
    name: "Necessary",
    description: "Essential for website functionality.",
    required: true,  // Cannot be disabled
    cookies: [
      {
        name: "cookie-consent",
        description: "Stores your cookie preferences",
        duration: "1 year",
      },
      // Add your cookies here
    ],
  },
  // Add more categories...
];`,
          language: "typescript",
        },
        {
          title: "Change Consent Duration",
          description: "By default, consent is valid for 1 year. Edit in src/components/cookie-consent.tsx",
          code: `// In getInitialPreferences function
const daysSinceConsent = Math.floor(
  (Date.now() - new Date(consentDate).getTime()) / (1000 * 60 * 60 * 24)
);
if (daysSinceConsent < 365) {  // Change 365 to your desired days
  return { preferences: JSON.parse(consent), showButton: false };
}`,
          language: "typescript",
        },
      ]}
      previous={{ title: "SEO", href: "/docs/features/seo" }}
      next={{ title: "Trial", href: "/docs/features/trial" }}
    >
      {/* Component Preview */}
      <DocsSection title="Preview">
        <DocsPreview
          title="Cookie Consent"
          description="Interactive cookie preference modal"
          preview={<CookieConsentDemo />}
          code={`import { CookieConsent } from "@/components/cookie-consent";

// Already included in layout.tsx
<CookieConsent />`}
        />
      </DocsSection>

      {/* How It Works Section */}
      <DocsSection title="How It Works">
        <div className="space-y-4">
          <DocsCard title="STEP_01">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">1</span>
              <h3 className={`uppercase ${docsTypography.h4}`}>First Visit</h3>
            </div>
            <p className={docsTypography.body}>
              New visitors see a &quot;Cookie Settings&quot; button in the bottom-right corner.
              All non-essential cookies are blocked until they make a choice.
            </p>
          </DocsCard>
          <DocsCard title="STEP_02">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">2</span>
              <h3 className={`uppercase ${docsTypography.h4}`}>User Makes Choice</h3>
            </div>
            <p className={docsTypography.body}>
              Clicking the button opens a modal with three tabs: Consent (quick toggles),
              Details (see exactly which cookies), and About (their privacy rights).
            </p>
          </DocsCard>
          <DocsCard title="STEP_03">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">3</span>
              <h3 className={`uppercase ${docsTypography.h4}`}>Choice Saved</h3>
            </div>
            <p className={docsTypography.body}>
              Their preference is stored in localStorage for 1 year. Google Consent Mode
              is updated automatically, enabling/disabling analytics and ads accordingly.
            </p>
          </DocsCard>
          <DocsCard title="STEP_04">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">4</span>
              <h3 className={`uppercase ${docsTypography.h4}`}>Return Visits</h3>
            </div>
            <p className={docsTypography.body}>
              The banner doesn&apos;t show again (unless they clear storage). Their saved
              preferences are applied immediately on page load.
            </p>
          </DocsCard>
        </div>
      </DocsSection>

      {/* Cookie Categories Section */}
      <DocsSection title="Cookie Categories">
        <DocsCard title="COOKIE_CATEGORIES">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-none bg-success mt-1"></div>
              <div>
                <p className="font-medium">Necessary (Always On)</p>
                <p className={docsTypography.body}>
                  Essential for the site to work. Includes session cookies and consent storage. Cannot be disabled.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-none bg-info mt-1"></div>
              <div>
                <p className="font-medium">Preferences</p>
                <p className={docsTypography.body}>
                  Remember settings like theme (dark/light) and language. Off by default.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-none bg-warning mt-1"></div>
              <div>
                <p className="font-medium">Statistics</p>
                <p className={docsTypography.body}>
                  Google Analytics and similar tools. Helps you understand how people use your app. Off by default.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-none bg-destructive mt-1"></div>
              <div>
                <p className="font-medium">Marketing</p>
                <p className={docsTypography.body}>
                  Facebook Pixel, Google Ads conversion tracking. Used for targeted advertising. Off by default.
                </p>
              </div>
            </div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Common Questions Section */}
      <DocsSection title="Common Questions">
        <div className="space-y-4">
          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Do I need this if I don&apos;t have EU users?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              <p>
                Technically no, but it&apos;s good practice. California (CCPA), Brazil (LGPD), and
                other regions have similar requirements. Plus, Google requires Consent Mode v2
                for personalized ads even in the US.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Why do I need Consent Mode v2 for Google?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              <p>
                As of March 2024, Google requires Consent Mode v2 for any site that uses Google
                Ads remarketing or audience features. Without it, your ads may not work properly
                and you could lose audience data.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              Can I change the button position?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              <p>
                Yes! In <code className="bg-muted px-1 font-mono">cookie-consent.tsx</code>, find the button element and change the
                Tailwind classes. It&apos;s currently <code className="bg-muted px-1 font-mono">bottom-6 right-6</code>. Change to{" "}
                <code className="bg-muted px-1 font-mono">bottom-6 left-6</code> for bottom-left, etc.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              What if the user never makes a choice?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              <p>
                All non-essential cookies remain blocked. The button stays visible on every page
                until they interact with it. This is the GDPR-compliant default.
              </p>
            </div>
          </details>
        </div>
      </DocsSection>

      {/* Testing Section */}
      <DocsSection title="Testing">
        <DocsCard title="TESTING_GUIDE">
          <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Manual Testing</h3>
          <ol className={`list-inside list-decimal ${docsTypography.body} space-y-2`}>
            <li>Open your app in a private/incognito window</li>
            <li>You should see the &quot;Cookie Settings&quot; button (bottom-right)</li>
            <li>Click it and test each action: Accept All, Reject All, Accept Selected</li>
            <li>Refresh the page - banner should not reappear</li>
            <li>Open DevTools → Application → Local Storage → look for <code className="bg-muted px-1 font-mono">cookie-consent</code></li>
          </ol>

          <h3 className={`uppercase ${docsTypography.h4} mt-6 mb-2`}>Verify GTM Integration</h3>
          <ol className={`list-inside list-decimal ${docsTypography.body} space-y-2`}>
            <li>Open DevTools → Console</li>
            <li>Type <code className="bg-muted px-1 font-mono">dataLayer</code> and press Enter</li>
            <li>Look for <code className="bg-muted px-1 font-mono">cookie_consent_update</code> events</li>
            <li>Check that consent states match your selections</li>
          </ol>
        </DocsCard>
      </DocsSection>

      {/* Next Steps Section */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <DocsLinkCard
            href="/docs/features/analytics"
            title="Analytics"
            description="Set up PostHog analytics that respects consent."
          />
          <DocsLinkCard
            href="/docs/security/headers"
            title="Security Headers"
            description="Configure CSP and other security headers."
          />
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
