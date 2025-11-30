"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { useState } from "react";

const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

const countries: ComboboxOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

const colors: ComboboxOption[] = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
];

export default function ComboboxPage() {
  const [framework, setFramework] = useState("");
  const [country, setCountry] = useState("");
  const [color, setColor] = useState("");

  return (
    <ComponentShowcaseTemplate
      title="Combobox"
      description="A searchable dropdown component that combines an input field with a list of options, providing autocomplete functionality."
      component="combobox"
      mainPreview={{
        code: `const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

<Combobox
  options={frameworks}
  value={framework}
  onValueChange={setFramework}
  placeholder="Select framework..."
/>`,
        preview: (
          <Combobox
            options={frameworks}
            value={framework}
            onValueChange={setFramework}
            placeholder="Select framework..."
          />
        ),
      }}
      variants={[
        {
          title: "With Custom Text",
          description: "Customize placeholder, search, and empty state text",
          code: `<Combobox
  options={countries}
  value={country}
  onValueChange={setCountry}
  placeholder="Choose a country..."
  searchPlaceholder="Search countries..."
  emptyText="No country found."
/>`,
          preview: (
            <Combobox
              options={countries}
              value={country}
              onValueChange={setCountry}
              placeholder="Choose a country..."
              searchPlaceholder="Search countries..."
              emptyText="No country found."
            />
          ),
        },
        {
          title: "Pre-selected Value",
          description: "Combobox with initial value",
          code: `const [color, setColor] = useState("blue");

<Combobox
  options={colors}
  value={color}
  onValueChange={setColor}
  placeholder="Select color..."
/>`,
          preview: (
            <Combobox
              options={colors}
              value={color || "blue"}
              onValueChange={setColor}
              placeholder="Select color..."
            />
          ),
        },
        {
          title: "Custom Width",
          description: "Control the width with className",
          code: `<Combobox
  options={frameworks}
  value={framework}
  onValueChange={setFramework}
  placeholder="Select framework..."
  className="w-[300px]"
/>`,
          preview: (
            <Combobox
              options={frameworks}
              value={framework}
              onValueChange={setFramework}
              placeholder="Select framework..."
              className="w-[300px]"
            />
          ),
        },
        {
          title: "Large List",
          description: "Works well with many options (searchable)",
          code: `<Combobox
  options={countries}
  value={country}
  onValueChange={setCountry}
  placeholder="Select country..."
  searchPlaceholder="Search..."
/>`,
          preview: (
            <Combobox
              options={countries}
              value={country}
              onValueChange={setCountry}
              placeholder="Select country..."
              searchPlaceholder="Search..."
            />
          ),
        },
      ]}
      props={[
        {
          name: "options",
          type: "ComboboxOption[]",
          description: "Array of options with value and label",
        },
        {
          name: "value",
          type: "string",
          description: "The controlled selected value",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Callback when selection changes",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Select option..."',
          description: "Placeholder text for the trigger button",
        },
        {
          name: "emptyText",
          type: "string",
          default: '"No option found."',
          description: "Text shown when no options match search",
        },
        {
          name: "searchPlaceholder",
          type: "string",
          default: '"Search..."',
          description: "Placeholder text for the search input",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the trigger button",
        },
      ]}
      accessibility={[
        "Uses role='combobox' for proper ARIA semantics",
        "aria-expanded indicates popover open/closed state",
        "Keyboard navigation with Arrow Up/Down to navigate options",
        "Enter key selects highlighted option",
        "Escape key closes the popover",
        "Search input is automatically focused when popover opens",
        "Selected option is visually indicated with checkmark icon",
      ]}
      previousComponent={{
        name: "Input OTP",
        href: "/docs/components/input-otp",
      }}
      nextComponent={{
        name: "Multi Select",
        href: "/docs/components/multi-select",
      }}
    />
  );
}
