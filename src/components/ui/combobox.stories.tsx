import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./combobox";
import { useState } from "react";

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "gatsby", label: "Gatsby" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        className="w-[200px]"
      />
    );
  },
};

export const WithCustomText: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Choose a framework..."
        emptyText="No framework found."
        searchPlaceholder="Search frameworks..."
        className="w-[250px]"
      />
    );
  },
};

const countries = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "jp", label: "Japan" },
  { value: "cn", label: "China" },
];

export const Countries: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <Combobox
        options={countries}
        value={value}
        onValueChange={setValue}
        placeholder="Select country..."
        searchPlaceholder="Search country..."
        className="w-[250px]"
      />
    );
  },
};
