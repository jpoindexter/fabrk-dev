/**
 * ✅ FABRK COMPONENT
 * Section Stories
 */

import { Section } from "@/components/ui/section";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Section> = {
  title: "UI/Layout/Section",
  component: Section,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => (
    <Section>
      <h2 className="text-2xl font-bold">Section Title</h2>
      <p className="mt-2 text-muted-foreground">Section content</p>
    </Section>
  ),
};

export const WithBackground: Story = {
  render: () => (
    <Section className="bg-muted/20">
      <h2 className="text-2xl font-bold">Featured Section</h2>
      <p className="mt-2 text-muted-foreground">This section has a background</p>
    </Section>
  ),
};

export const MultipleSections: Story = {
  render: () => (
    <div>
      <Section>
        <h2 className="text-2xl font-bold">Section 1</h2>
        <p className="mt-2 text-muted-foreground">First section</p>
      </Section>
      <Section className="bg-muted/20">
        <h2 className="text-2xl font-bold">Section 2</h2>
        <p className="mt-2 text-muted-foreground">Second section</p>
      </Section>
      <Section>
        <h2 className="text-2xl font-bold">Section 3</h2>
        <p className="mt-2 text-muted-foreground">Third section</p>
      </Section>
    </div>
  ),
};
