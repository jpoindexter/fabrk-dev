'use client';

import { ComponentShowcaseTemplate } from '@/components/docs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatLabel } from '@/design-system';

export default function InputPage() {
  return (
    <ComponentShowcaseTemplate
      code="[UI.02]"
      category="Components"
      title="Input"
      description="A basic text input field for forms and data entry."
      importCode={`import { Input } from "@/components/ui/input"`}
      mainPreview={{
        preview: <Input placeholder="Enter your email..." />,
        code: `<Input placeholder="Enter your email..." />`,
      }}
      variants={[
        {
          title: 'Default',
          description: 'Standard text input.',
          preview: <Input placeholder="Type here..." />,
          code: `<Input placeholder="Type here..." />`,
        },
        {
          title: 'With Label',
          description: 'Input with an associated label.',
          preview: (
            <div className="grid gap-2">
              <Label htmlFor="email">{formatLabel('Email')}</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
          ),
          code: `<div className="grid gap-2">
  <Label htmlFor="email">[EMAIL]:</Label>
  <Input id="email" type="email" placeholder="m@example.com" />
</div>`,
        },
        {
          title: 'Disabled',
          description: 'Input in disabled state.',
          preview: <Input disabled placeholder="Disabled input" />,
          code: `<Input disabled placeholder="Disabled input" />`,
        },
        {
          title: 'Error State',
          description: 'Input showing an error.',
          preview: <Input error placeholder="Invalid input" />,
          code: `<Input error placeholder="Invalid input" />`,
        },
        {
          title: 'Success State',
          description: 'Input showing success.',
          preview: <Input success placeholder="Valid input" defaultValue="john@example.com" />,
          code: `<Input success placeholder="Valid input" defaultValue="john@example.com" />`,
        },
        {
          title: 'Loading',
          description: 'Input with loading spinner.',
          preview: <Input loading placeholder="Loading..." />,
          code: `<Input loading placeholder="Loading..." />`,
        },
        {
          title: 'File Input',
          description: 'Input for file selection.',
          preview: <Input type="file" />,
          code: `<Input type="file" />`,
        },
      ]}
      props={[
        {
          name: 'error',
          type: 'boolean',
          default: 'false',
          description: 'Show error styling with red border.',
        },
        {
          name: 'success',
          type: 'boolean',
          default: 'false',
          description: 'Show success styling with green ring on focus.',
        },
        {
          name: 'loading',
          type: 'boolean',
          default: 'false',
          description: 'Show loading spinner and disable input.',
        },
        {
          name: 'loadingText',
          type: 'string',
          description: 'Screen reader text for loading state.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Disable the input.',
        },
        {
          name: 'type',
          type: 'string',
          default: '"text"',
          description: 'HTML input type (text, email, password, etc.).',
        },
      ]}
      accessibility={[
        'Uses native <input> element for full keyboard support',
        'Supports aria-invalid for error states',
        'Loading state uses aria-busy for screen readers',
        'Screen reader text provided via aria-describedby when loading',
      ]}
      previous={{ title: 'Button', href: '/docs/components/button' }}
      next={{
        title: 'Input Password',
        href: '/docs/components/input-password',
      }}
    />
  );
}
