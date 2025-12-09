'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function CheckboxPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.06]"
      category="Components"
      title="Checkbox"
      description="A checkbox component for toggling boolean values."
      importCode={`import { Checkbox } from "@/components/ui/checkbox"`}
      mainPreview={{
        preview: (
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">
              {formatLabel('Accept terms and conditions')}
            </Label>
          </div>
        ),
        code: `<div className="flex items-center gap-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">[ACCEPT_TERMS_AND_CONDITIONS]:</Label>
</div>`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'Standard checkbox.',
          preview: <Checkbox />,
          code: `<Checkbox />`,
        },
        {
          title: 'Checked',
          description: 'Checkbox in checked state.',
          preview: <Checkbox defaultChecked />,
          code: `<Checkbox defaultChecked />`,
        },
        {
          title: 'With Label',
          description: 'Checkbox with an associated label.',
          preview: (
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">
                {formatLabel('Subscribe to newsletter')}
              </Label>
            </div>
          ),
          code: `<div className="flex items-center gap-2">
  <Checkbox id="newsletter" />
  <Label htmlFor="newsletter">[SUBSCRIBE_TO_NEWSLETTER]:</Label>
</div>`,
        },
        {
          title: 'Disabled',
          description: 'Disabled checkbox.',
          preview: <Checkbox disabled />,
          code: `<Checkbox disabled />`,
        },
        {
          title: 'Disabled Checked',
          description: 'Disabled checkbox in checked state.',
          preview: <Checkbox disabled defaultChecked />,
          code: `<Checkbox disabled defaultChecked />`,
        },
        {
          title: 'Checkbox Group',
          description: 'Multiple checkboxes as a group.',
          preview: (
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Checkbox id="option1" defaultChecked />
                <Label htmlFor="option1">{formatLabel('Option 1')}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option2" />
                <Label htmlFor="option2">{formatLabel('Option 2')}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="option3" />
                <Label htmlFor="option3">{formatLabel('Option 3')}</Label>
              </div>
            </div>
          ),
          code: `<div className="grid gap-2">
  <div className="flex items-center gap-2">
    <Checkbox id="option1" defaultChecked />
    <Label htmlFor="option1">[OPTION_1]:</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="option2" />
    <Label htmlFor="option2">[OPTION_2]:</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="option3" />
    <Label htmlFor="option3">[OPTION_3]:</Label>
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: 'checked',
          type: 'boolean',
          description: 'Controlled checked state.',
        },
        {
          name: 'defaultChecked',
          type: 'boolean',
          description: 'The default checked state for uncontrolled usage.',
        },
        {
          name: 'onCheckedChange',
          type: '(checked: boolean) => void',
          description: 'Event handler called when the checked state changes.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the checkbox.',
        },
        {
          name: 'required',
          type: 'boolean',
          default: 'false',
          description: 'Mark the checkbox as required.',
        },
      ]}
      accessibility={[
        'Built on Radix UI Checkbox primitive for full accessibility',
        'Supports keyboard navigation with Space to toggle',
        'Uses aria-checked for screen readers',
        'Focus visible ring for keyboard navigation',
      ]}
      previous={{ title: 'Select', href: '/docs/components/select' }}
      next={{ title: 'Switch', href: '/docs/components/switch' }}
    />
  );
}
