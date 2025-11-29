import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Cookie, Shield, Settings, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Cookie Consent (GDPR) - Fabrk Docs",
  description: "GDPR-compliant cookie banner with Google Consent Mode v2. Let users control tracking preferences.",
};

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
      {/* How It Works Section */}
      <DocsSection title="How It Works">
        <div className="space-y-4">
          <DocsCard>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">1</span>
              <h3 className={`uppercase ${docsTypography.h4}`}>First Visit</h3>
            </div>
            <p className={docsTypography.body}>
              New visitors see a &quot;Cookie Settings&quot; button in the bottom-right corner.
              All non-essential cookies are blocked until they make a choice.
            </p>
          </DocsCard>
          <DocsCard>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">2</span>
              <h3 className={`uppercase ${docsTypography.h4}`}>User Makes Choice</h3>
            </div>
            <p className={docsTypography.body}>
              Clicking the button opens a modal with three tabs: Consent (quick toggles),
              Details (see exactly which cookies), and About (their privacy rights).
            </p>
          </DocsCard>
          <DocsCard>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">3</span>
              <h3 className={`uppercase ${docsTypography.h4}`}>Choice Saved</h3>
            </div>
            <p className={docsTypography.body}>
              Their preference is stored in localStorage for 1 year. Google Consent Mode
              is updated automatically, enabling/disabling analytics and ads accordingly.
            </p>
          </DocsCard>
          <DocsCard>
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
        <DocsCard>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-full bg-green-500 mt-1"></div>
              <div>
                <p className="font-medium">Necessary (Always On)</p>
                <p className={docsTypography.body}>
                  Essential for the site to work. Includes session cookies and consent storage. Cannot be disabled.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-full bg-blue-500 mt-1"></div>
              <div>
                <p className="font-medium">Preferences</p>
                <p className={docsTypography.body}>
                  Remember settings like theme (dark/light) and language. Off by default.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-full bg-yellow-500 mt-1"></div>
              <div>
                <p className="font-medium">Statistics</p>
                <p className={docsTypography.body}>
                  Google Analytics and similar tools. Helps you understand how people use your app. Off by default.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/50">
              <div className="h-3 w-3 rounded-full bg-red-500 mt-1"></div>
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
        <DocsCard>
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
          <Link href="/docs/features/analytics">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Analytics</h3>
                <p className={docsTypography.body}>
                  Set up PostHog analytics that respects consent.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/headers">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Security Headers</h3>
                <p className={docsTypography.body}>
                  Configure CSP and other security headers.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
