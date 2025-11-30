"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { MultiSelect, MultiSelectOption } from "@/components/ui/multi-select";
import { useState } from "react";

const frameworks: MultiSelectOption[] = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
  { value: "solid", label: "Solid" },
];

const skills: MultiSelectOption[] = [
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
];

const tags: MultiSelectOption[] = [
  { value: "feature", label: "Feature" },
  { value: "bug", label: "Bug" },
  { value: "enhancement", label: "Enhancement" },
];

export default function MultiSelectPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [preSelected, setPreSelected] = useState<string[]>(["next", "react"]);
  const [limitedSelected, setLimitedSelected] = useState<string[]>([]);
  const [skillsSelected, setSkillsSelected] = useState<string[]>([]);

  return (
    <ComponentShowcaseTemplate
      title="Multi Select"
      description="A multi-select dropdown component that allows users to select multiple options with badge display and search functionality."
      component="multi-select"
      mainPreview={{
        code: `const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

<MultiSelect
  options={frameworks}
  selected={selected}
  onChange={setSelected}
  placeholder="Select frameworks..."
/>`,
        preview: (
          <MultiSelect
            options={frameworks}
            selected={selected}
            onChange={setSelected}
            placeholder="Select frameworks..."
          />
        ),
      }}
      variants={[
        {
          title: "With Pre-selected Values",
          description: "Initialize with selected options",
          code: `const [selected, setSelected] = useState(["next", "react"]);

<MultiSelect
  options={frameworks}
  selected={selected}
  onChange={setSelected}
  placeholder="Select frameworks..."
/>`,
          preview: (
            <MultiSelect
              options={frameworks}
              selected={preSelected}
              onChange={setPreSelected}
              placeholder="Select frameworks..."
            />
          ),
        },
        {
          title: "With Max Selection Limit",
          description: "Limit number of selections (max 3)",
          code: `<MultiSelect
  options={frameworks}
  selected={limitedSelected}
  onChange={setLimitedSelected}
  maxSelected={3}
  placeholder="Select up to 3..."
/>`,
          preview: (
            <MultiSelect
              options={frameworks}
              selected={limitedSelected}
              onChange={setLimitedSelected}
              maxSelected={3}
              placeholder="Select up to 3..."
            />
          ),
        },
        {
          title: "Large List with Search",
          description: "Searchable list with many options",
          code: `<MultiSelect
  options={skills}
  selected={skillsSelected}
  onChange={setSkillsSelected}
  placeholder="Select skills..."
  emptyText="No skills found."
/>`,
          preview: (
            <MultiSelect
              options={skills}
              selected={skillsSelected}
              onChange={setSkillsSelected}
              placeholder="Select skills..."
              emptyText="No skills found."
            />
          ),
        },
        {
          title: "Disabled State",
          description: "Disabled multi-select",
          code: `<MultiSelect
  options={tags}
  selected={["feature", "bug"]}
  onChange={() => {}}
  disabled
  placeholder="Disabled..."
/>`,
          preview: (
            <MultiSelect
              options={tags}
              selected={["feature", "bug"]}
              onChange={() => {}}
              disabled
              placeholder="Disabled..."
            />
          ),
        },
        {
          title: "Custom Empty Text",
          description: "Customize the empty state message",
          code: `<MultiSelect
  options={frameworks}
  selected={selected}
  onChange={setSelected}
  placeholder="Choose frameworks..."
  emptyText="No frameworks match your search."
/>`,
          preview: (
            <MultiSelect
              options={frameworks}
              selected={selected}
              onChange={setSelected}
              placeholder="Choose frameworks..."
              emptyText="No frameworks match your search."
            />
          ),
        },
      ]}
      props={[
        {
          name: "options",
          type: "MultiSelectOption[]",
          description: "Array of options with value and label",
        },
        {
          name: "selected",
          type: "string[]",
          description: "Array of selected values (controlled)",
        },
        {
          name: "onChange",
          type: "(selected: string[]) => void",
          description: "Callback when selection changes",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Select items..."',
          description: "Placeholder text when no items selected",
        },
        {
          name: "emptyText",
          type: "string",
          default: '"No items found."',
          description: "Text shown when search returns no results",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable the component",
        },
        {
          name: "maxSelected",
          type: "number",
          description: "Maximum number of items that can be selected",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes for the trigger button",
        },
      ]}
      accessibility={[
        "Uses role='combobox' for proper ARIA semantics",
        "aria-expanded indicates popover state",
        "Selected items displayed as badges with remove buttons",
        "Remove buttons have proper keyboard support (Enter key)",
        "Search input auto-focuses when dropdown opens",
        "Checkbox indicators show selected state visually",
        "Keyboard navigation with Arrow Up/Down through options",
        "Enter key toggles selection of highlighted option",
      ]}
      previousComponent={{
        name: "Combobox",
        href: "/docs/components/combobox",
      }}
      nextComponent={{
        name: "Date Picker",
        href: "/docs/components/date-picker",
      }}
    />
  );
}
