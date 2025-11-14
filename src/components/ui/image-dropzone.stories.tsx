/**
 * ✅ FABRK COMPONENT
 * ImageDropzone Stories
 */

import { ImageDropzone } from "@/components/ui/image-dropzone";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof ImageDropzone> = {
  title: "UI/Forms/ImageDropzone",
  component: ImageDropzone,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ImageDropzone>;

export const Default: Story = {
  args: {
    onDrop: () => {},
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <label className="text-sm font-medium">Profile Picture</label>
      <ImageDropzone onDrop={() => {}} />
    </div>
  ),
};

export const Multiple: Story = {
  args: {
    multiple: true,
    onDrop: () => {},
  },
};
