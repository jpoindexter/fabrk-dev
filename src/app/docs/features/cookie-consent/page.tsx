import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export const metadata = {
  title: "Cookie Consent (GDPR) - Fabrk Docs",
  description: "GDPR-compliant cookie banner with Google Consent Mode v2. Let users control tracking preferences.",
};

export default function CookieConsentPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x80] FEATURES ] COOKIE_CONSENT</span>
        </div>
        <h1 className="font-mono text-3xl font-bold tracking-tight">COOKIE_CONSENT_GDPR</h1>
        <p className="font-mono text-base text-muted-foreground">
          &gt; GDPR-compliant cookie banner with Google Consent Mode v2 integration.
        </p>
      </div>

      {/* What is Cookie Consent - Plain English */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-xl font-semibold text-foreground">WHAT_IS_THIS</h2>
          <p className="text-muted-foreground">
            If your app has users in Europe, you&apos;re legally required to ask permission before
            tracking them with cookies. This component handles that for you.
          </p>
          <p className="text-muted-foreground">
            Think of it like asking guests if they want coffee before pouring. Some want it
            (marketing cookies), some don&apos;t (privacy-focused users). This lets them choose.
          </p>
        </CardContent>
      </Card>

      {/* Why You Need This */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="font-mono text-xl font-semibold text-foreground">WHY_YOU_NEED_THIS</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-mono font-medium">LEGAL_COMPLIANCE</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>GDPR (Europe) requires explicit consent</li>
                <li>CCPA (California) requires disclosure</li>
                <li>Fines up to 4% of annual revenue for violations</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-mono font-medium">GOOGLE_REQUIREMENTS</h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                <li>Consent Mode v2 required since March 2024</li>
                <li>Needed for Google Ads remarketing</li>
                <li>Analytics data may be limited without it</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">HOW_IT_WORKS</h2>
        <div className="space-y-3">
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">1</span>
              <h3 className="font-mono font-semibold">FIRST_VISIT</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              New visitors see a &quot;Cookie Settings&quot; button in the bottom-right corner.
              All non-essential cookies are blocked until they make a choice.
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">2</span>
              <h3 className="font-mono font-semibold">USER_MAKES_CHOICE</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Clicking the button opens a modal with three tabs: Consent (quick toggles),
              Details (see exactly which cookies), and About (their privacy rights).
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">3</span>
              <h3 className="font-mono font-semibold">CHOICE_SAVED</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Their preference is stored in localStorage for 1 year. Google Consent Mode
              is updated automatically, enabling/disabling analytics and ads accordingly.
            </p>
          </div>
          <div className="border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-8 w-8 items-center justify-center bg-primary font-mono text-sm font-bold text-primary-foreground">4</span>
              <h3 className="font-mono font-semibold">RETURN_VISITS</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              The banner doesn&apos;t show again (unless they clear storage). Their saved
              preferences are applied immediately on page load.
            </p>
          </div>
        </div>
      </div>

      {/* Cookie Categories */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">COOKIE_CATEGORIES</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-3 w-3 rounded-full bg-green-600 mt-1"></div>
                <div>
                  <p className="font-medium">Necessary (Always On)</p>
                  <p className="text-sm text-muted-foreground">
                    Essential for the site to work. Includes session cookies and consent storage.
                    Cannot be disabled.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-3 w-3 rounded-full bg-blue-600 mt-1"></div>
                <div>
                  <p className="font-medium">Preferences</p>
                  <p className="text-sm text-muted-foreground">
                    Remember settings like theme (dark/light) and language. Off by default.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-3 w-3 rounded-full bg-yellow-600 mt-1"></div>
                <div>
                  <p className="font-medium">Statistics</p>
                  <p className="text-sm text-muted-foreground">
                    Google Analytics and similar tools. Helps you understand how people use your app.
                    Off by default.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="h-3 w-3 rounded-full bg-red-600 mt-1"></div>
                <div>
                  <p className="font-medium">Marketing</p>
                  <p className="text-sm text-muted-foreground">
                    Facebook Pixel, Google Ads conversion tracking. Used for targeted advertising.
                    Off by default.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Setup */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">SETUP</h2>
        <p className="text-muted-foreground">
          The cookie consent component is already included in your layout. No setup required!
        </p>
        <CodeBlock language="tsx" code={`// Already in src/app/layout.tsx
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
}`} />
      </div>

      {/* Google Tag Manager Integration */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">GOOGLE_TAG_MANAGER_INTEGRATION</h2>
        <p className="text-muted-foreground">
          The component automatically integrates with Google Consent Mode v2. Here&apos;s what happens
          when a user makes their choice:
        </p>
        <CodeBlock language="typescript" code={`// Automatically called when user saves preferences
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
});`} />
        <p className="text-sm text-muted-foreground mt-2">
          <strong>Note:</strong> Make sure your GTM container is configured to respect Consent Mode.
          Tags should be set to fire only when the appropriate consent is granted.
        </p>
      </div>

      {/* Customization */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">CUSTOMIZATION</h2>

        <h3 className="font-mono font-semibold">ADD_REMOVE_COOKIE_CATEGORIES</h3>
        <p className="text-muted-foreground">
          Edit the categories in <code className="bg-muted px-1 font-mono">src/components/cookie-consent-tabs.tsx</code>:
        </p>
        <CodeBlock language="typescript" code={`// In DetailsTabContent function
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
];`} />

        <h3 className="font-mono font-semibold mt-6">CHANGE_CONSENT_DURATION</h3>
        <p className="text-muted-foreground">
          By default, consent is valid for 1 year. Edit in <code className="bg-muted px-1 font-mono">src/components/cookie-consent.tsx</code>:
        </p>
        <CodeBlock language="typescript" code={`// In getInitialPreferences function
const daysSinceConsent = Math.floor(
  (Date.now() - new Date(consentDate).getTime()) / (1000 * 60 * 60 * 24)
);
if (daysSinceConsent < 365) {  // Change 365 to your desired days
  return { preferences: JSON.parse(consent), showButton: false };
}`} />

        <h3 className="font-mono font-semibold mt-6">UPDATE_CONTACT_EMAIL</h3>
        <p className="text-muted-foreground">
          The &quot;About&quot; tab shows your privacy contact email. Update it in the AboutTabContent component.
        </p>
      </div>

      {/* Data Export Feature */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">DATA_EXPORT_GDPR_RIGHT_TO_ACCESS</h2>
        <p className="text-muted-foreground">
          The &quot;About&quot; tab includes a &quot;Download My Data&quot; button that lets logged-in users
          export their personal data. This helps with GDPR&apos;s &quot;right to access&quot; requirement.
        </p>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-mono font-semibold mb-2">HOW_IT_WORKS</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>User clicks &quot;Download My Data&quot; button</li>
              <li>Request goes to <code className="bg-muted px-1 font-mono">/api/user/export</code></li>
              <li>If logged in, returns JSON file with their data</li>
              <li>If not logged in, shows &quot;Please log in&quot; message</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Testing */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">TESTING</h2>
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-mono font-semibold">MANUAL_TESTING</h3>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Open your app in a private/incognito window</li>
              <li>You should see the &quot;Cookie Settings&quot; button (bottom-right)</li>
              <li>Click it and test each action: Accept All, Reject All, Accept Selected</li>
              <li>Refresh the page - banner should not reappear</li>
              <li>Open DevTools → Application → Local Storage → look for <code className="bg-muted px-1 font-mono">cookie-consent</code></li>
            </ol>

            <h3 className="font-mono font-semibold mt-4">VERIFY_GTM_INTEGRATION</h3>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              <li>Open DevTools → Console</li>
              <li>Type <code className="bg-muted px-1 font-mono">dataLayer</code> and press Enter</li>
              <li>Look for <code className="bg-muted px-1 font-mono">cookie_consent_update</code> events</li>
              <li>Check that consent states match your selections</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Common Questions */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">COMMON_QUESTIONS</h2>
        <div className="space-y-3">
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
                Tailwind classes. It&apos;s currently <code className="bg-muted px-1 font-mono">bottom-6 right-6</code>. Change to
                <code className="bg-muted px-1 font-mono">bottom-6 left-6</code> for bottom-left, etc.
              </p>
            </div>
          </details>

          <details className="border border-border bg-card">
            <summary className="cursor-pointer p-4 font-mono font-medium">
              How do I re-show the consent banner?
            </summary>
            <div className="border-t border-border p-4 text-sm text-muted-foreground">
              <p>
                Users can clear their browser&apos;s localStorage, or you can add a &quot;Cookie Settings&quot;
                link in your footer that opens the modal programmatically. The component exports
                the necessary functions.
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
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-xl font-semibold">NEXT_STEPS</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/features/analytics">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono font-semibold">ANALYTICS</h3>
                <p className="text-sm text-muted-foreground">
                  Set up PostHog analytics that respects consent.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/security/headers">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-4">
                <h3 className="font-mono font-semibold">SECURITY_HEADERS</h3>
                <p className="text-sm text-muted-foreground">
                  Configure CSP and other security headers.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Back to docs link */}
      <div className="pt-4">
        <Link href="/docs" className="text-primary hover:underline">
          &larr; Back to Documentation
        </Link>
      </div>
    </div>
  );
}
