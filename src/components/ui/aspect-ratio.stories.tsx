import type { Meta, StoryObj } from "@storybook/nextjs";
import { AspectRatio } from "./aspect-ratio";

const meta = {
  title: "UI/Aspect Ratio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={1 / 1}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full border border-border shadow-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const Video: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&dpr=2&q=80"
          alt="Photo by Alvaro Pinot"
          className="rounded-md object-cover w-full h-full border border-border shadow-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={3 / 4}>
        <img
          src="https://images.unsplash.com/photo-1706885093476-b1e54f26d6b6?w=800&dpr=2&q=80"
          alt="Portrait photo"
          className="rounded-md object-cover w-full h-full border border-border shadow-md"
        />
      </AspectRatio>
    </div>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full items-center justify-center rounded-md border border-border bg-muted shadow-md">
          <p className="text-muted-foreground">16:9 Aspect Ratio</p>
        </div>
      </AspectRatio>
    </div>
  ),
};
