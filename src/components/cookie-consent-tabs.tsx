"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Shield } from "lucide-react";
import type {
  AboutTabContentProps,
  ConsentTabContentProps,
  CookieCategory,
  DetailsTabContentProps,
} from "./cookie-consent-types";

export function ConsentTabContent({
  preferences,
  setPreferences,
  acceptAll,
  acceptSelected,
  rejectAll,
}: ConsentTabContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border bg-muted p-4">
          <div className="flex-1">
            <h4 className="font-medium">Necessary Cookies</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Essential for website functionality. Cannot be disabled.
            </p>
          </div>
          <Switch checked={true} disabled />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex-1">
            <h4 className="font-medium">Preference Cookies</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Remember your settings and preferences.
            </p>
          </div>
          <Switch
            checked={preferences.preferences}
            onCheckedChange={(checked) => setPreferences({ ...preferences, preferences: checked })}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex-1">
            <h4 className="font-medium">Statistics Cookies</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Help us understand how visitors interact with our website.
            </p>
          </div>
          <Switch
            checked={preferences.statistics}
            onCheckedChange={(checked) => setPreferences({ ...preferences, statistics: checked })}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex-1">
            <h4 className="font-medium">Marketing Cookies</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              Used to track visitors across websites for relevant advertising.
            </p>
          </div>
          <Switch
            checked={preferences.marketing}
            onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={acceptAll} className="flex-1">
          Accept All
        </Button>
        <Button onClick={acceptSelected} variant="outline" className="flex-1">
          Accept Selected
        </Button>
        <Button onClick={rejectAll} variant="outline" className="flex-1">
          Reject All
        </Button>
      </div>
    </div>
  );
}

export function DetailsTabContent({ preferences, setPreferences }: DetailsTabContentProps) {
  const categories: CookieCategory[] = [
    {
      id: "necessary",
      name: "Necessary",
      description: "These cookies are essential for the website to function properly.",
      required: true,
      cookies: [
        {
          name: "cookie-consent",
          description: "Stores your cookie consent preferences",
          duration: "1 year",
        },
        {
          name: "session-id",
          description: "Maintains your session state",
          duration: "Session",
        },
      ],
    },
    {
      id: "preferences",
      name: "Preferences",
      description: "These cookies allow the website to remember your choices.",
      cookies: [
        {
          name: "theme-preference",
          description: "Remembers your theme choice (light/dark)",
          duration: "1 year",
        },
        {
          name: "language",
          description: "Stores your language preference",
          duration: "1 year",
        },
      ],
    },
    {
      id: "statistics",
      name: "Statistics",
      description: "These cookies help us understand how visitors use our website.",
      cookies: [
        {
          name: "_ga",
          description: "Google Analytics tracking cookie",
          duration: "2 years",
        },
        {
          name: "_gid",
          description: "Google Analytics session cookie",
          duration: "24 hours",
        },
      ],
    },
    {
      id: "marketing",
      name: "Marketing",
      description: "These cookies are used to deliver relevant advertisements.",
      cookies: [
        {
          name: "fbp",
          description: "Facebook pixel tracking",
          duration: "3 months",
        },
        {
          name: "_gcl_au",
          description: "Google Ads conversion tracking",
          duration: "3 months",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
            <Switch
              checked={preferences[category.id]}
              disabled={category.required}
              onCheckedChange={(checked) =>
                setPreferences({ ...preferences, [category.id]: checked })
              }
            />
          </div>
          <div className="ml-6 space-y-2">
            {category.cookies.map((cookie) => (
              <div key={cookie.name} className="rounded-lg border bg-muted p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium">{cookie.name}</span>
                  <span className="text-xs text-muted-foreground">{cookie.duration}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {cookie.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AboutTabContent({}: AboutTabContentProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 font-medium">What are cookies?</h4>
          <p className="text-sm text-muted-foreground">
            Cookies are small text files that are placed on your device when you visit a website.
            They help the website remember information about your visit, which can make your next
            visit easier and the site more useful to you.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-medium">How we use cookies</h4>
          <p className="text-sm text-muted-foreground">
            We use different types of cookies for various purposes, including improving your
            browsing experience, analyzing site traffic, and serving personalized content or ads.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-medium">Your rights</h4>
          <p className="text-sm text-muted-foreground">
            Under GDPR and other privacy regulations, you have the right to:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Access the personal data we hold about you</li>
            <li>Correct any inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>

        <div className="rounded-lg border bg-primary/10 p-4">
          <div className="flex items-start space-x-3">
            <Shield className="mt-0.5 size-5 text-primary" />
            <div>
              <h4 className="font-medium text-primary">GDPR Compliant</h4>
              <p className="mt-1 text-sm text-primary/80">
                Our cookie policy and consent management comply with GDPR requirements.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-medium">Contact us</h4>
          <p className="text-sm text-muted-foreground">
            If you have questions about our use of cookies or your privacy rights, please contact
            our Data Protection Officer at privacy@fabrk.dev
          </p>
        </div>
      </div>
    </div>
  );
}
