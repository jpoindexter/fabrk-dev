"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CookieConsentPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <ComponentShowcaseTemplate
      code="[PRO.03]"
      category="Pro Pack"
      title="Cookie Consent"
      description="GDPR-compliant cookie consent banner with granular control, DNT support, and persistent storage."
      importCode={`import { CookieConsent } from "@/components/ui/cookie-consent"`}
      mainPreview={{
        preview: (
          <div className="w-full max-w-4xl space-y-4">
            <Button onClick={() => setShowDemo(!showDemo)}>
              &gt; {showDemo ? "HIDE" : "SHOW"}_DEMO
            </Button>
            {showDemo && (
              <CookieConsent
                onAccept={(_preferences) => {
                  // Handle acceptance
                  setShowDemo(false);
                }}
                onReject={() => {
                  // Handle rejection
                  setShowDemo(false);
                }}
                privacyPolicyUrl="/privacy"
                cookiePolicyUrl="/cookies"
              />
            )}
          </div>
        ),
        code: `<CookieConsent
  onAccept={(preferences) => {
    // Save preferences
  }}
  onReject={() => {
    // Reject non-essential
  }}
  privacyPolicyUrl="/privacy"
  cookiePolicyUrl="/cookies"
/>`,
      }}
      props={[
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the banner.",
        },
        {
          name: "onAccept",
          type: "(preferences: CookiePreferences) => void",
          default: "undefined",
          description: "Callback when user accepts cookies.",
        },
        {
          name: "onReject",
          type: "() => void",
          default: "undefined",
          description: "Callback when user rejects all non-essential cookies.",
        },
        {
          name: "privacyPolicyUrl",
          type: "string",
          default: '"/privacy"',
          description: "URL to privacy policy page.",
        },
        {
          name: "cookiePolicyUrl",
          type: "string",
          default: '"/cookies"',
          description: "URL to cookie policy page.",
        },
      ]}
      accessibility={[
        "Bottom banner uses role=dialog for screen readers",
        "All buttons clearly labeled with action",
        "Switches in customization dialog properly labeled",
        "Respects Do Not Track browser setting",
        "Keyboard navigation fully supported",
        "Focus visible styles on all interactive elements",
      ]}
      previous={{ title: "Audit Log", href: "/docs/components/audit-log" }}
      next={{ title: "Onboarding Checklist", href: "/docs/components/onboarding-checklist" }}
    />
  );
}
