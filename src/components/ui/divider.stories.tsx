/**
 * ✅ FABRK COMPONENT
 * Divider Stories - Visual separators with multiple variants
 *
 * @see Divider component documentation
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Divider> = {
  title: "UI/Layout/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    variant: {
      control: "select",
      options: ["solid", "dashed", "dotted", "gradient"],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    labelPosition: {
      control: "select",
      options: ["left", "center", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

/**
 * Default horizontal divider
 */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <div>Content above</div>
      <Divider />
      <div>Content below</div>
    </div>
  ),
};

/**
 * Variant styles
 */
export const Variants: Story = {
  render: () => (
    <div className="w-96 space-y-8">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Solid (default)</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Dotted</p>
        <Divider variant="dotted" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Gradient</p>
        <Divider variant="gradient" />
      </div>
    </div>
  ),
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>Section 1 content</div>
      <Divider label="Or" />
      <div>Section 2 content</div>
    </div>
  ),
};

/**
 * Label positions
 */
export const LabelPositions: Story = {
  render: () => (
    <div className="w-96 space-y-8">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Left</p>
        <Divider label="Section" labelPosition="left" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Center (default)</p>
        <Divider label="Section" labelPosition="center" />
      </div>
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Right</p>
        <Divider label="Section" labelPosition="right" />
      </div>
    </div>
  ),
};

/**
 * Spacing variants
 */
export const Spacing: Story = {
  render: () => (
    <div className="w-96">
      <div>Content</div>
      <Divider spacing="none" />
      <div>No spacing</div>
      <Divider spacing="sm" />
      <div>Small spacing</div>
      <Divider spacing="md" />
      <div>Medium spacing (default)</div>
      <Divider spacing="lg" />
      <div>Large spacing</div>
      <Divider spacing="xl" />
      <div>Extra large spacing</div>
    </div>
  ),
};

/**
 * Vertical divider
 */
export const Vertical: Story = {
  render: () => (
    <div className="flex h-24 items-center">
      <div className="px-4">Left content</div>
      <Divider orientation="vertical" />
      <div className="px-4">Middle content</div>
      <Divider orientation="vertical" />
      <div className="px-4">Right content</div>
    </div>
  ),
};

/**
 * In navigation
 */
export const InNavigation: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button variant="ghost">Home</Button>
      <Divider orientation="vertical" spacing="none" className="h-6" />
      <Button variant="ghost">About</Button>
      <Divider orientation="vertical" spacing="none" className="h-6" />
      <Button variant="ghost">Contact</Button>
    </div>
  ),
};

/**
 * In card
 */
export const InCard: Story = {
  render: () => (
    <Card className="w-96 p-6">
      <h3 className="text-lg font-semibold">Card Title</h3>
      <Divider />
      <p className="text-sm">Card content goes here with various information.</p>
      <Divider />
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Confirm</Button>
      </div>
    </Card>
  ),
};

/**
 * Between sections
 */
export const BetweenSections: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <section>
        <h2 className="mb-2 text-lg font-semibold">Section 1</h2>
        <p className="text-sm text-muted-foreground">
          This is the first section with some content.
        </p>
      </section>

      <Divider label="Features" />

      <section>
        <h2 className="mb-2 text-lg font-semibold">Section 2</h2>
        <p className="text-sm text-muted-foreground">
          This is the second section with different content.
        </p>
      </section>

      <Divider label="Benefits" />

      <section>
        <h2 className="mb-2 text-lg font-semibold">Section 3</h2>
        <p className="text-sm text-muted-foreground">
          This is the third section with more information.
        </p>
      </section>
    </div>
  ),
};

/**
 * Login form separator
 */
export const LoginForm: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Button className="w-full">Continue with Google</Button>
      <Button className="w-full" variant="outline">
        Continue with GitHub
      </Button>

      <Divider label="OR" variant="gradient" />

      <div className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md border px-3 py-2"
        />
        <Button className="w-full">Sign In</Button>
      </div>
    </div>
  ),
};

/**
 * With badges
 */
export const WithBadges: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <Divider
          label={
            <Badge variant="outline" className="px-3">
              New Features
            </Badge>
          }
        />
      </div>
      <div>
        <Divider
          label={
            <Badge variant="secondary" className="px-3">
              Upcoming
            </Badge>
          }
        />
      </div>
    </div>
  ),
};

/**
 * List separator
 */
export const ListSeparator: Story = {
  render: () => (
    <div className="w-96">
      <div className="space-y-3">
        <div className="p-2">Item 1</div>
        <Divider spacing="none" />
        <div className="p-2">Item 2</div>
        <Divider spacing="none" />
        <div className="p-2">Item 3</div>
        <Divider spacing="none" />
        <div className="p-2">Item 4</div>
      </div>
    </div>
  ),
};

/**
 * Timeline style
 */
export const Timeline: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <p className="font-medium">Step 1: Getting Started</p>
        <p className="text-sm text-muted-foreground">Complete the initial setup</p>
      </div>

      <Divider label="→" variant="gradient" />

      <div>
        <p className="font-medium">Step 2: Configuration</p>
        <p className="text-sm text-muted-foreground">Configure your preferences</p>
      </div>

      <Divider label="→" variant="gradient" />

      <div>
        <p className="font-medium">Step 3: Ready to Go</p>
        <p className="text-sm text-muted-foreground">Start using the application</p>
      </div>
    </div>
  ),
};

/**
 * Minimal divider
 */
export const Minimal: Story = {
  render: () => (
    <div className="w-96">
      <p>Content above divider</p>
      <Divider spacing="sm" />
      <p>Content below divider</p>
    </div>
  ),
};
