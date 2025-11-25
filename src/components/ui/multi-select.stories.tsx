import type { Meta, StoryObj } from "@storybook/nextjs";
import { MultiSelect, MultiSelectOption } from "./multi-select";
import { useState } from "react";

const meta: Meta<typeof MultiSelect> = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

const frameworks: MultiSelectOption[] = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
  { label: "Solid", value: "solid" },
  { label: "Qwik", value: "qwik" },
  { label: "Preact", value: "preact" },
  { label: "Lit", value: "lit" },
];

const fruits: MultiSelectOption[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
  { label: "Strawberry", value: "strawberry" },
  { label: "Mango", value: "mango" },
  { label: "Pineapple", value: "pineapple" },
  { label: "Watermelon", value: "watermelon" },
  { label: "Grape", value: "grape" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Peach", value: "peach" },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[400px]">
        <MultiSelect
          options={frameworks}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const WithPreselectedItems: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["react", "vue"]);
    return (
      <div className="w-[400px]">
        <MultiSelect
          options={frameworks}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[400px]">
        <MultiSelect
          options={frameworks}
          selected={selected}
          onChange={setSelected}
          placeholder="Choose your frameworks..."
        />
      </div>
    );
  },
};

export const WithMaxLimit: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[400px] space-y-2">
        <MultiSelect
          options={frameworks}
          selected={selected}
          onChange={setSelected}
          maxSelected={3}
          placeholder="Select up to 3 frameworks..."
        />
        <p className="text-sm text-muted-foreground">
          {selected.length} / 3 selected
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["react"]);
    return (
      <div className="w-[400px]">
        <MultiSelect
          options={frameworks}
          selected={selected}
          onChange={setSelected}
          disabled
        />
      </div>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[400px]">
        <MultiSelect
          options={fruits}
          selected={selected}
          onChange={setSelected}
          placeholder="Select fruits..."
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[500px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">
            Tech Stack
          </label>
          <MultiSelect
            options={frameworks}
            selected={selected}
            onChange={setSelected}
            placeholder="Select frameworks for your project..."
          />
        </div>
        {selected.length > 0 && (
          <div className="rounded-brutal border-brutal bg-card p-4">
            <p className="text-sm font-bold">Selected Frameworks:</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {selected.map((value) => {
                const option = frameworks.find((f) => f.value === value);
                return <li key={value}>{option?.label}</li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const MultipleSelectors: Story = {
  render: () => {
    const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
    const [selectedFruits, setSelectedFruits] = useState<string[]>([]);
    return (
      <div className="w-[600px] space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">
            Frontend Frameworks
          </label>
          <MultiSelect
            options={frameworks}
            selected={selectedFrameworks}
            onChange={setSelectedFrameworks}
            placeholder="Choose frameworks..."
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground">
            Favorite Fruits
          </label>
          <MultiSelect
            options={fruits}
            selected={selectedFruits}
            onChange={setSelectedFruits}
            placeholder="Choose fruits..."
          />
        </div>
        {(selectedFrameworks.length > 0 || selectedFruits.length > 0) && (
          <div className="rounded-brutal border-brutal bg-card shadow-sm p-4">
            <p className="text-sm font-bold">Your Selections:</p>
            <p className="text-sm text-muted-foreground">
              Frameworks: {selectedFrameworks.length > 0 ? selectedFrameworks.join(", ") : "None"}
            </p>
            <p className="text-sm text-muted-foreground">
              Fruits: {selectedFruits.length > 0 ? selectedFruits.join(", ") : "None"}
            </p>
          </div>
        )}
      </div>
    );
  },
};
