/**
 * ✅ FABRK COMPONENT
 * ButtonGroup Stories
 */

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/Actions/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Left</Button>
      <Button>Center</Button>
      <Button>Right</Button>
    </ButtonGroup>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <ButtonGroup>
        <Button variant="outline">Day</Button>
        <Button variant="outline">Week</Button>
        <Button variant="outline">Month</Button>
        <Button variant="outline">Year</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary">Bold</Button>
        <Button variant="secondary">Italic</Button>
        <Button variant="secondary">Underline</Button>
      </ButtonGroup>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        ←
      </Button>
      <Button variant="outline" size="icon">
        ↑
      </Button>
      <Button variant="outline" size="icon">
        ↓
      </Button>
      <Button variant="outline" size="icon">
        →
      </Button>
    </ButtonGroup>
  ),
};
