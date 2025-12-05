"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Download, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type {
  AboutTabContentProps,
  ConsentTabContentProps,
  CookieCategory,
  DetailsTabContentProps,
} from "./cookie-consent-types";
import { mode } from "@/design-system";
import { cn } from "@/lib/utils";

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
        <div className={cn("bg-muted flex items-center justify-between border p-4", mode.radius)}>
          <div className="flex-1">
            <h4 className="text-foreground text-base leading-tight font-semibold">
              Necessary Cookies
            </h4>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed font-normal">
              Essential for website functionality. Cannot be disabled.
            </p>
          </div>
          <Switch checked={true} disabled />
        </div>

        <div className={cn("flex items-center justify-between border p-4", mode.radius)}>
          <div className="flex-1">
            <h4 className="text-foreground text-base leading-tight font-semibold">
              Preference Cookies
            </h4>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed font-normal">
              Remember your settings and preferences.
            </p>
          </div>
          <Switch
            checked={preferences.preferences}
            onCheckedChange={(checked) => setPreferences({ ...preferences, preferences: checked })}
          />
        </div>

        <div className={cn("flex items-center justify-between border p-4", mode.radius)}>
          <div className="flex-1">
            <h4 className="text-foreground text-base leading-tight font-semibold">
              Statistics Cookies
            </h4>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed font-normal">
              Help us understand how visitors interact with our website.
            </p>
          </div>
          <Switch
            checked={preferences.statistics}
            onCheckedChange={(checked) => setPreferences({ ...preferences, statistics: checked })}
          />
        </div>

        <div className={cn("flex items-center justify-between border p-4", mode.radius)}>
          <div className="flex-1">
            <h4 className="text-foreground text-base leading-tight font-semibold">
              Marketing Cookies
            </h4>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed font-normal">
              Used to track visitors across websites for relevant advertising.
            </p>
          </div>
          <Switch
            checked={preferences.marketing}
            onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
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
        <div key={category.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-foreground text-base leading-tight font-semibold">
                {category.name}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed font-normal">
                {category.description}
              </p>
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
              <div key={cookie.name} className={cn("bg-muted border p-4", mode.radius)}>
                <div className="flex items-center justify-between">
                  <span className={cn("text-xs font-semibold", mode.font)}>{cookie.name}</span>
                  <span className="text-muted-foreground text-xs font-normal">
                    {cookie.duration}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed font-normal">
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
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleDataExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch("/api/user/export");

      // Check content type - if HTML, user is not logged in
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        toast({
          title: "Login required",
          description: "Please log in to download your data.",
        });
        return;
      }

      if (response.status === 401) {
        toast({
          title: "Login required",
          description: "Please log in to download your data.",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to export data");
      }

      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `my-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Data exported",
        description: "Your data has been downloaded.",
      });
    } catch {
      toast({
        title: "Export failed",
        description: "Unable to export your data. Please try again.",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">What are cookies?</h4>
          <p className="text-muted-foreground text-sm">
            Cookies are small text files that are placed on your device when you visit a website.
            They help the website remember information about your visit, which can make your next
            visit easier and the site more useful to you.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">How we use cookies</h4>
          <p className="text-muted-foreground text-sm">
            We use different types of cookies for various purposes, including improving your
            browsing experience, analyzing site traffic, and serving personalized content or ads.
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Your rights</h4>
          <p className="text-muted-foreground text-sm">
            Under GDPR and other privacy regulations, you have the right to:
          </p>
          <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1 text-sm">
            <li>Access the personal data we hold about you</li>
            <li>Correct any inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDataExport}
            disabled={isExporting}
            className="mt-4"
          >
            <Download className="mr-2 size-4" />
            {isExporting ? "Exporting..." : "Download My Data"}
          </Button>
        </div>

        <div className={cn("bg-primary/10 border p-4", mode.radius)}>
          <div className="flex items-start space-x-4">
            <Shield className="text-primary mt-0.5 size-5" />
            <div>
              <h4 className="text-primary font-semibold">GDPR Compliant</h4>
              <p className="text-primary/80 mt-1 text-sm">
                Our cookie policy and consent management comply with GDPR requirements.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Contact us</h4>
          <p className="text-muted-foreground text-sm">
            If you have questions about our use of cookies or your privacy rights, please contact us
            at support@fabrk.dev
          </p>
        </div>
      </div>
    </div>
  );
}
