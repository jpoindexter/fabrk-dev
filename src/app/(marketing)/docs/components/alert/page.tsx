'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export default function AlertPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.15]"
      category="Components"
      title="Alert"
      description="Displays a callout for user attention with title and description."
      importCode={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`}
      mainPreview={{
        preview: (
          <Alert>
            <Info className="h-5 w-5" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        ),
        code: `<Alert>
  <Info className="h-5 w-5" />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'The default alert variant with primary colors.',
          preview: (
            <Alert>
              <Info className="h-5 w-5" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is a default alert message with important information.
              </AlertDescription>
            </Alert>
          ),
          code: `<Alert>
  <Info className="h-5 w-5" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This is a default alert message with important information.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Destructive',
          description: 'A destructive alert for errors and warnings.',
          preview: (
            <Alert variant="destructive">
              <XCircle className="h-5 w-5" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          ),
          code: `<Alert variant="destructive">
  <XCircle className="h-5 w-5" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Success',
          description: 'A success alert for positive feedback.',
          preview: (
            <Alert variant="success">
              <CheckCircle2 className="h-5 w-5" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>
          ),
          code: `<Alert variant="success">
  <CheckCircle2 className="h-5 w-5" />
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>
    Your changes have been saved successfully.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Without Icon',
          description: 'Alert without an icon for simpler messaging.',
          preview: (
            <Alert>
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                This alert does not include an icon.
              </AlertDescription>
            </Alert>
          ),
          code: `<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>
    This alert does not include an icon.
  </AlertDescription>
</Alert>`,
        },
        {
          title: 'Title Only',
          description: 'Alert with only a title, no description.',
          preview: (
            <Alert>
              <AlertCircle className="h-5 w-5" />
              <AlertTitle>
                Important: Maintenance scheduled for tonight
              </AlertTitle>
            </Alert>
          ),
          code: `<Alert>
  <AlertCircle className="h-5 w-5" />
  <AlertTitle>Important: Maintenance scheduled for tonight</AlertTitle>
</Alert>`,
        },
      ]}
      props={[
        {
          name: 'variant',
          type: '"default" | "destructive" | "success"',
          default: '"default"',
          description: 'The visual style of the alert.',
        },
        {
          name: 'className',
          type: 'string',
          description: 'Additional CSS classes to apply to the alert.',
        },
      ]}
      accessibility={[
        "Uses role='alert' for screen reader announcements",
        "Icons have aria-hidden='true' to avoid redundant announcements",
        'Grid layout ensures proper reading order',
        'Title uses font-semibold for visual hierarchy',
        'Color is not the only means of conveying information',
      ]}
      previous={{ title: 'Avatar', href: '/docs/components/avatar' }}
      next={{ title: 'Progress', href: '/docs/components/progress' }}
    />
  );
}
