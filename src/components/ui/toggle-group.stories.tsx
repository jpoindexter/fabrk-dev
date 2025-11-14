/**
 * ✅ FABRK COMPONENT
 * ToggleGroup Stories - Grouped toggle controls for related options
 *
 * @see https://www.radix-ui.com/docs/primitives/components/toggle-group
 * @see https://ui.shadcn.com/docs/components/toggle-group
 */

import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Grid3x3,
  Italic,
  List,
  Moon,
  Star,
  Sun,
  Underline,
} from "lucide-react";

const meta: Meta<typeof ToggleGroup> = {
  title: "UI/Forms/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Selection mode - single allows one selection, multiple allows many",
    },
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

/**
 * Default single selection toggle group
 */
export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Multiple selection mode - allows selecting multiple items
 */
export const MultipleSelection: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Text formatting toolbar
 */
export const TextFormatting: Story = {
  render: () => (
    <div className="inline-flex gap-1 rounded-lg border p-2">
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

/**
 * Text alignment options
 */
export const TextAlignment: Story = {
  render: () => (
    <div className="inline-flex gap-1 rounded-lg border p-2">
      <ToggleGroup type="single" defaultValue="left">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align justify">
          <AlignJustify className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

/**
 * View mode selection
 */
export const ViewModes: Story = {
  render: () => (
    <div className="inline-flex gap-1 rounded-lg border p-2">
      <ToggleGroup type="single" defaultValue="grid">
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <Grid3x3 className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view">
          <List className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Small</p>
        <ToggleGroup type="single" size="sm" defaultValue="center">
          <ToggleGroupItem value="left">
            <AlignLeft className="size-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="size-3" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="size-3" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <p className="mb-2 text-sm text-muted-foreground">Default</p>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left">
            <AlignLeft className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <p className="mb-2 text-sm text-muted-foreground">Large</p>
        <ToggleGroup type="single" size="lg" defaultValue="center">
          <ToggleGroupItem value="left">
            <AlignLeft className="size-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="size-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="size-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Outline variant
 */
export const OutlineVariant: Story = {
  render: () => (
    <div className="flex gap-4">
      <div>
        <p className="mb-2 text-sm text-muted-foreground">Default</p>
        <ToggleGroup type="single" variant="default" defaultValue="center">
          <ToggleGroupItem value="left">
            <AlignLeft className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div>
        <p className="mb-2 text-sm text-muted-foreground">Outline</p>
        <ToggleGroup type="single" variant="outline" defaultValue="center">
          <ToggleGroupItem value="left">
            <AlignLeft className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <AlignCenter className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            <AlignRight className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * With text labels
 */
export const WithText: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="grid">
      <ToggleGroupItem value="grid">
        <Grid3x3 className="mr-2 size-4" />
        Grid
      </ToggleGroupItem>
      <ToggleGroupItem value="list">
        <List className="mr-2 size-4" />
        List
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Theme selection
 */
export const ThemeSelection: Story = {
  render: () => (
    <div className="inline-flex gap-1 rounded-lg border p-2">
      <ToggleGroup type="single" defaultValue="light">
        <ToggleGroupItem value="light" aria-label="Light mode">
          <Sun className="mr-2 size-4" />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark mode">
          <Moon className="mr-2 size-4" />
          Dark
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

/**
 * Filter options with multiple selection
 */
export const FilterOptions: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-sm font-medium">Select tags</p>
        <ToggleGroup type="multiple" defaultValue={["react", "typescript"]}>
          <ToggleGroupItem value="react">React</ToggleGroupItem>
          <ToggleGroupItem value="typescript">TypeScript</ToggleGroupItem>
          <ToggleGroupItem value="nextjs">Next.js</ToggleGroupItem>
          <ToggleGroupItem value="tailwind">Tailwind</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Priority levels
 */
export const PriorityLevels: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-sm font-medium">Select priority</p>
        <ToggleGroup type="single" defaultValue="medium">
          <ToggleGroupItem value="low">Low</ToggleGroupItem>
          <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
          <ToggleGroupItem value="high">High</ToggleGroupItem>
          <ToggleGroupItem value="urgent">Urgent</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Rating stars with single selection
 */
export const RatingStars: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-sm font-medium">Rate this item</p>
        <ToggleGroup type="single" defaultValue="4">
          <ToggleGroupItem value="1" aria-label="1 star">
            <Star className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="2" aria-label="2 stars">
            <Star className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="3" aria-label="3 stars">
            <Star className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="4" aria-label="4 stars">
            <Star className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="5" aria-label="5 stars">
            <Star className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

/**
 * Complete rich text editor toolbar
 */
export const CompleteToolbar: Story = {
  render: () => (
    <div className="inline-flex items-center gap-1 rounded-lg border p-2">
      <ToggleGroup type="multiple">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ToggleGroup type="single" defaultValue="left">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Align justify">
          <AlignJustify className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ToggleGroup type="single" defaultValue="grid">
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <Grid3x3 className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list" aria-label="List view">
          <List className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center" disabled>
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/**
 * Partially disabled items
 */
export const PartiallyDisabled: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center" disabled>
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify" disabled>
        <AlignJustify className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
