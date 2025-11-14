/**
 * ✅ FABRK COMPONENT
 * Text Stories - Comprehensive typography variants
 * - Under 150 lines ✓
 * - No hardcoded colors ✓
 * - Design tokens only ✓
 */

import { Text } from "@/components/ui/text";
import { tokens } from "@/lib/design-system/tokens";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Text> = {
  title: "UI/Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

// Default text
export const Default: Story = {
  args: {
    children: "This is the default text component.",
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-2">
      <Text size="xs">Extra small text (12px)</Text>
      <Text size="sm">Small text (14px)</Text>
      <Text size="base">Base text (16px)</Text>
      <Text size="lg">Large text (18px)</Text>
      <Text size="xl">Extra large text (20px)</Text>
    </div>
  ),
};

// Weights
export const Weights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text>Default color</Text>
      <Text className="text-muted-foreground">Muted text</Text>
      <Text className="text-primary">Primary text</Text>
      <Text className="text-destructive">Destructive text</Text>
    </div>
  ),
};

// As different elements
export const AsElements: Story = {
  render: () => (
    <div className="space-y-2">
      <Text as="p">Paragraph text</Text>
      <Text as="span">Span text</Text>
      <Text as="div">Div text</Text>
      <Text as="label">Label text</Text>
    </div>
  ),
};

// Article content
export const ArticleContent: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text size="xl" weight="bold" as="h2">
        Article Heading
      </Text>
      <Text className="text-muted-foreground">
        This is the introduction paragraph with muted text to indicate secondary importance.
      </Text>
      <Text>
        This is the main body text. It uses the default styling and is easy to read at the base
        size. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Text>
      <Text>
        Another paragraph of body text continuing the content. The spacing between paragraphs helps
        with readability and content organization.
      </Text>
      <Text size="sm" className="text-muted-foreground">
        * This is a footnote or disclaimer in smaller, muted text.
      </Text>
    </div>
  ),
};
