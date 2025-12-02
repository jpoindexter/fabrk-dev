import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button } from "./button";
import { Mail, ArrowRight, Download, Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
        "primaryCta",
        "secondaryCta",
        "ghostOnDark",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xl", "icon"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "> CLICK_ME",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Button variant="default">{"> DEFAULT"}</Button>
        <Button variant="secondary">{"> SECONDARY"}</Button>
        <Button variant="destructive">{"> DESTRUCTIVE"}</Button>
        <Button variant="outline">{"> OUTLINE"}</Button>
        <Button variant="ghost">{"> GHOST"}</Button>
        <Button variant="link">{"> LINK"}</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button variant="primaryCta">{"> PRIMARY_CTA"}</Button>
        <Button variant="secondaryCta">{"> SECONDARY_CTA"}</Button>
        <Button variant="ghostOnDark">{"> GHOST_ON_DARK"}</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">{"> SM"}</Button>
      <Button size="default">{"> DEFAULT"}</Button>
      <Button size="lg">{"> LG"}</Button>
      <Button size="xl">{"> XL"}</Button>
      <Button size="icon">
        <Plus />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button>
        <Mail className="mr-2" /> SEND_EMAIL
      </Button>
      <Button variant="outline">
        DOWNLOAD <Download className="ml-2" />
      </Button>
      <Button variant="secondary">
        CONTINUE <ArrowRight className="ml-2" />
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    loadingText: "PROCESSING...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "> DISABLED",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "> DELETE_ITEM",
  },
};
