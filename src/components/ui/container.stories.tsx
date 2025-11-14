/**
 * ✅ FABRK COMPONENT
 * Container Stories - Comprehensive layout patterns
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Design tokens only ✓
 */

import { Container } from "@/components/ui/container";
import { tokens } from "@/lib/design-system/tokens";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Container> = {
  title: "UI/Layout/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Container>;

// Default container
export const Default: Story = {
  render: () => (
    <div className="bg-muted/20 p-8">
      <Container>
        <div className="rounded-lg border bg-background p-8">
          <h2 className="text-2xl font-bold">Default Container</h2>
          <p className="mt-2 text-muted-foreground">
            This content is contained within the default container max-width.
          </p>
        </div>
      </Container>
    </div>
  ),
};

// Centered content
export const CenteredContent: Story = {
  render: () => (
    <div className="flex min-h-screen items-center bg-muted/20">
      <Container>
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <p className="text-xl text-muted-foreground">
            Content is centered both horizontally and vertically
          </p>
        </div>
      </Container>
    </div>
  ),
};

// Multiple sections
export const MultipleSections: Story = {
  render: () => (
    <div className="space-y-12 bg-muted/20 py-12">
      <Container>
        <div className="rounded-lg border bg-background p-8">
          <h2 className="text-2xl font-bold">Section 1</h2>
          <p className="mt-2 text-muted-foreground">First contained section</p>
        </div>
      </Container>
      <Container>
        <div className="rounded-lg border bg-background p-8">
          <h2 className="text-2xl font-bold">Section 2</h2>
          <p className="mt-2 text-muted-foreground">Second contained section</p>
        </div>
      </Container>
      <Container>
        <div className="rounded-lg border bg-background p-8">
          <h2 className="text-2xl font-bold">Section 3</h2>
          <p className="mt-2 text-muted-foreground">Third contained section</p>
        </div>
      </Container>
    </div>
  ),
};
