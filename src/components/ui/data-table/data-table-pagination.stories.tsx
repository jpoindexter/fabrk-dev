/**
 * ✅ FABRK COMPONENT
 * DataTablePagination Stories
 */

import { DataTablePagination } from "@/components/ui/data-table-pagination";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof DataTablePagination> = {
  title: "UI/Data Display/DataTablePagination",
  component: DataTablePagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTablePagination>;

export const Default: Story = {
  render: () => <div>DataTable Pagination Component</div>,
};
