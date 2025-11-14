/**
 * ✅ FABRK COMPONENT
 * DataTableHeader Stories
 */

import { DataTableHeader } from "@/components/ui/data-table-header";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof DataTableHeader> = {
  title: "UI/Data Display/DataTableHeader",
  component: DataTableHeader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTableHeader>;

export const Default: Story = {
  render: () => <div>DataTable Header Component</div>,
};
