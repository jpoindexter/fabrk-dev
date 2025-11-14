/**
 * ✅ FABRK COMPONENT
 * ErrorBoundary Stories
 */

import { Button } from "@/components/ui/button";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import type { Meta, StoryObj } from "@storybook/nextjs";

const ThrowError = () => {
  throw new Error("Test error");
};

const meta: Meta<typeof ErrorBoundary> = {
  title: "UI/Feedback/ErrorBoundary",
  component: ErrorBoundary,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  ),
};

export const WithFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<div className="p-6 text-center">Custom error message</div>}>
      <ThrowError />
    </ErrorBoundary>
  ),
};
