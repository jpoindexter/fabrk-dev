/**
 * ✅ FABRK COMPONENT
 * Tags Stories
 */

import { Tags } from "@/components/ui/tags";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Tags> = {
  title: "UI/Data Display/Tags",
  component: Tags,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tags>;

export const Default: Story = {
  args: {
    tags: ["React", "TypeScript", "Next.js"],
  },
};

export const Removable: Story = {
  args: {
    tags: ["Tag 1", "Tag 2", "Tag 3"],
    onRemove: () => {},
  },
};

export const WithColors: Story = {
  render: () => (
    <div className="space-y-4">
      <Tags tags={["Bug", "Critical"]} variant="destructive" />
      <Tags tags={["Feature", "Enhancement"]} variant="primary" />
      <Tags tags={["Documentation"]} variant="secondary" />
    </div>
  ),
};

export const InContent: Story = {
  render: () => (
    <div className="max-w-md space-y-2">
      <h3 className="font-medium">Blog Post Title</h3>
      <p className="text-sm text-muted-foreground">Published on Jan 15, 2024</p>
      <Tags tags={["React", "TypeScript", "Tutorial"]} />
    </div>
  ),
};
