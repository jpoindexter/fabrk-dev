import type { Meta, StoryObj } from "@storybook/react";
import { ApiKeyGenerator } from "./api-key-generator";

const meta: Meta<typeof ApiKeyGenerator> = {
  title: "Developer/ApiKeyGenerator",
  component: ApiKeyGenerator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ApiKeyGenerator>;

export const WithKey: Story = {
  args: {
    apiKey: "sk_live_1234567890abcdefghijklmnopqrstuvwxyz",
    createdAt: new Date("2024-01-15"),
    lastUsed: new Date("2024-11-14"),
  },
};

export const WithActions: Story = {
  args: {
    apiKey: "sk_live_1234567890abcdefghijklmnopqrstuvwxyz",
    createdAt: new Date("2024-01-15"),
    lastUsed: new Date("2024-11-14"),
    onGenerate: () => alert("Generating new API key..."),
    onRevoke: () => alert("Revoking API key..."),
  },
};

export const NoKey: Story = {
  args: {
    onGenerate: () => alert("Generating API key..."),
  },
};

export const Generating: Story = {
  args: {
    isGenerating: true,
    onGenerate: () => {},
  },
};

export const TestKey: Story = {
  args: {
    apiKey: "sk_test_1234567890abcdefghijklmnopqrstuvwxyz",
    prefix: "sk_test_",
    createdAt: new Date("2024-11-14"),
    onGenerate: () => console.log("Generate"),
    onRevoke: () => console.log("Revoke"),
  },
};

export const RecentlyCreated: Story = {
  args: {
    apiKey: "sk_live_9876543210zyxwvutsrqponmlkjihgfedcba",
    createdAt: new Date(),
    onGenerate: () => console.log("Generate"),
    onRevoke: () => console.log("Revoke"),
  },
};

export const NeverUsed: Story = {
  args: {
    apiKey: "sk_live_abcdef1234567890",
    createdAt: new Date("2024-11-01"),
    onGenerate: () => console.log("Generate"),
    onRevoke: () => console.log("Revoke"),
  },
};
