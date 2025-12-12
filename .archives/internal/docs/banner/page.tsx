"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Banner } from "@/components/ui/banner";
import { useState } from "react";

export default function BannerPage() {
  const [showDismissable, setShowDismissable] = useState(true);

  return (
    <ComponentShowcaseTemplate
      code="[UI.82]"
      category="Components"
      title="Banner"
      description="Display important announcements or notifications with optional actions and dismiss functionality."
      importCode={`import { Banner } from "@/components/ui/banner"`}
      mainPreview={{
        preview: (
          <Banner variant="info">
            This is an informational message for your users.
          </Banner>
        ),
        code: `<Banner variant="info">
  This is an informational message for your users.
</Banner>`,
      }}
      variants={[
        {
          title: "Info Variant",
          description: "Informational message with info icon",
          preview: (
            <Banner variant="info" title="New Feature Available">
              We've released a new dashboard with improved analytics.
            </Banner>
          ),
          code: `<Banner variant="info" title="New Feature Available">
  We've released a new dashboard with improved analytics.
</Banner>`,
        },
        {
          title: "Success Variant",
          description: "Success message with checkmark icon",
          preview: (
            <Banner variant="success" title="Changes Saved">
              Your settings have been successfully updated.
            </Banner>
          ),
          code: `<Banner variant="success" title="Changes Saved">
  Your settings have been successfully updated.
</Banner>`,
        },
        {
          title: "Warning Variant",
          description: "Warning message with alert triangle icon",
          preview: (
            <Banner variant="warning" title="Action Required">
              Your subscription will expire in 3 days. Please renew to avoid interruption.
            </Banner>
          ),
          code: `<Banner variant="warning" title="Action Required">
  Your subscription will expire in 3 days. Please renew to avoid interruption.
</Banner>`,
        },
        {
          title: "Error Variant",
          description: "Error message with alert circle icon",
          preview: (
            <Banner variant="error" title="Connection Failed">
              Unable to connect to the server. Please check your network connection.
            </Banner>
          ),
          code: `<Banner variant="error" title="Connection Failed">
  Unable to connect to the server. Please check your network connection.
</Banner>`,
        },
        {
          title: "With Action Button",
          description: "Banner with a call-to-action button",
          preview: (
            <Banner
              variant="info"
              title="Update Available"
              action={{
                label: "Update Now",
                onClick: () => alert("Update clicked!"),
              }}
            >
              A new version is available with bug fixes and improvements.
            </Banner>
          ),
          code: `<Banner
  variant="info"
  title="Update Available"
  action={{
    label: "Update Now",
    onClick: () => handleUpdate(),
  }}
>
  A new version is available with bug fixes and improvements.
</Banner>`,
        },
        {
          title: "Dismissable",
          description: "Banner with dismiss button",
          preview: showDismissable ? (
            <Banner
              variant="warning"
              title="Maintenance Scheduled"
              onDismiss={() => setShowDismissable(false)}
            >
              System maintenance will occur on Sunday at 2:00 AM EST.
            </Banner>
          ) : (
            <div className="p-6 text-center">
              <span className="font-mono text-xs text-muted-foreground">
                [DISMISSED]: Click "Dismissable" variant again to see
              </span>
            </div>
          ),
          code: `const [show, setShow] = useState(true);

{show && (
  <Banner
    variant="warning"
    title="Maintenance Scheduled"
    onDismiss={() => setShow(false)}
  >
    System maintenance will occur on Sunday at 2:00 AM EST.
  </Banner>
)}`,
        },
        {
          title: "Without Title",
          description: "Simple banner with just message text",
          preview: (
            <Banner variant="success">
              You've successfully completed the onboarding process!
            </Banner>
          ),
          code: `<Banner variant="success">
  You've successfully completed the onboarding process!
</Banner>`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"info" | "success" | "warning" | "error"',
          default: '"info"',
          description: "Visual style and icon of the banner",
        },
        {
          name: "title",
          type: "string",
          default: "-",
          description: "Optional bold title text for the banner",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "-",
          description: "Banner message content",
        },
        {
          name: "onDismiss",
          type: "() => void",
          default: "-",
          description: "Callback when dismiss button is clicked (shows X button)",
        },
        {
          name: "action",
          type: "{ label: string; onClick: () => void }",
          default: "-",
          description: "Optional action button configuration",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Additional CSS classes for the banner container",
        },
      ]}
      accessibility={[
        "Uses role='alert' for screen reader announcements",
        "Icons are decorative with proper ARIA hiding when needed",
        "Dismiss button has aria-label for screen readers",
        "Action button uses proper Button component with focus styles",
        "Color is not the only indicator (icons + text provide context)",
        "Keyboard accessible dismiss and action buttons",
      ]}
      previous={{ title: "Badge", href: "/docs/components/badge" }}
      next={{ title: "Breadcrumb", href: "/docs/components/breadcrumb" }}
    />
  );
}
