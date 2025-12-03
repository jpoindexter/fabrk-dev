"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Autocomplete, AutocompleteOption } from "@/components/ui/autocomplete";

export default function AutocompletePage() {
  const frameworks = [
    "Next.js",
    "React",
    "Vue",
    "Svelte",
    "Angular",
    "Remix",
    "Astro",
    "Nuxt",
  ];

  const countries: AutocompleteOption[] = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
    { value: "in", label: "India" },
  ];

  return (
    <ComponentShowcaseTemplate
      code="[UI.54]"
      category="Components"
      title="Autocomplete"
      description="A text input with a dropdown of suggestions that filters as you type."
      importCode={`import { Autocomplete, AutocompleteOption } from "@/components/ui/autocomplete"`}
      mainPreview={{
        preview: (
          <Autocomplete
            options={frameworks}
            placeholder="Search frameworks..."
            className="w-full max-w-sm"
          />
        ),
        code: `const frameworks = ["Next.js", "React", "Vue", "Svelte"];

<Autocomplete
  options={frameworks}
  placeholder="Search frameworks..."
  className="w-full max-w-sm"
/>`,
      }}
      variants={[
        {
          title: "String Options",
          description: "Simple autocomplete with string array options.",
          preview: (
            <Autocomplete
              options={frameworks}
              placeholder="Select a framework..."
              className="w-full max-w-sm"
            />
          ),
          code: `const frameworks = ["Next.js", "React", "Vue", "Svelte", "Angular"];

<Autocomplete
  options={frameworks}
  placeholder="Select a framework..."
/>`,
        },
        {
          title: "Object Options",
          description: "Autocomplete with value/label object options.",
          preview: (
            <Autocomplete
              options={countries}
              placeholder="Select a country..."
              className="w-full max-w-sm"
            />
          ),
          code: `const countries: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

<Autocomplete
  options={countries}
  placeholder="Select a country..."
/>`,
        },
        {
          title: "With Default Value",
          description: "Autocomplete with a pre-selected value.",
          preview: (
            <Autocomplete
              options={frameworks}
              value="Next.js"
              placeholder="Select a framework..."
              className="w-full max-w-sm"
            />
          ),
          code: `<Autocomplete
  options={frameworks}
  value="Next.js"
  placeholder="Select a framework..."
/>`,
        },
        {
          title: "Controlled",
          description: "Programmatically control the selected value.",
          preview: (
            <div className="space-y-4 w-full max-w-sm">
              <Autocomplete
                options={frameworks}
                placeholder="Select a framework..."
              />
              <div className="rounded-none border border-border bg-card p-4">
                <span className="font-mono text-xs text-muted-foreground">
                  [SELECTED]: Use onValueChange callback
                </span>
              </div>
            </div>
          ),
          code: `const [value, setValue] = useState("");

<Autocomplete
  options={frameworks}
  value={value}
  onValueChange={setValue}
  placeholder="Select a framework..."
/>

{value && <p>Selected: {value}</p>}`,
        },
        {
          title: "Custom Empty Message",
          description: "Customize the message when no results are found.",
          preview: (
            <Autocomplete
              options={frameworks}
              placeholder="Search frameworks..."
              emptyMessage="No frameworks found. Try a different search."
              className="w-full max-w-sm"
            />
          ),
          code: `<Autocomplete
  options={frameworks}
  placeholder="Search frameworks..."
  emptyMessage="No frameworks found. Try a different search."
/>`,
        },
        {
          title: "Large Dataset",
          description: "Autocomplete with many options and scrollable dropdown.",
          preview: (
            <Autocomplete
              options={[
                "JavaScript",
                "TypeScript",
                "Python",
                "Java",
                "C++",
                "C#",
                "Ruby",
                "Go",
                "Rust",
                "PHP",
                "Swift",
                "Kotlin",
                "Dart",
                "Scala",
                "Elixir",
                "Haskell",
                "Clojure",
                "F#",
                "R",
                "Perl",
              ]}
              placeholder="Search programming languages..."
              className="w-full max-w-sm"
            />
          ),
          code: `<Autocomplete
  options={[
    "JavaScript", "TypeScript", "Python", "Java", "C++",
    "C#", "Ruby", "Go", "Rust", "PHP", "Swift", "Kotlin",
    // ... more options
  ]}
  placeholder="Search programming languages..."
/>`,
        },
        {
          title: "Keyboard Navigation",
          description: "Full keyboard support with arrow keys and Enter.",
          preview: (
            <div className="space-y-4 w-full max-w-sm">
              <Autocomplete
                options={frameworks}
                placeholder="Try arrow keys..."
              />
              <div className="font-mono text-xs">
                <div className="border-b border-border px-4 py-2 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="size-2 rounded-none bg-destructive/50" />
                    <div className="size-2 rounded-none bg-warning/50" />
                    <div className="size-2 rounded-none bg-success/50" />
                  </div>
                  <span className="text-muted-foreground">keyboard.help</span>
                </div>
                <div className="p-4 space-y-1 text-muted-foreground">
                  <div>
                    <span className="text-success">&gt;</span> ↓/↑ Navigate
                    options
                  </div>
                  <div>
                    <span className="text-success">&gt;</span> Enter Select
                    highlighted
                  </div>
                  <div>
                    <span className="text-success">&gt;</span> Esc Close dropdown
                  </div>
                </div>
              </div>
            </div>
          ),
          code: `// Keyboard navigation is built-in:
// ↓/↑ - Navigate through options
// Enter - Select highlighted option
// Esc - Close dropdown

<Autocomplete
  options={frameworks}
  placeholder="Try arrow keys..."
/>`,
        },
      ]}
      props={[
        {
          name: "options",
          type: "string[] | AutocompleteOption[]",
          default: "[]",
          description:
            "Array of options (strings or {value, label} objects).",
        },
        {
          name: "value",
          type: "string",
          default: "undefined",
          description: "Controlled value of the input.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          default: "undefined",
          description: "Callback when selected value changes.",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          default: "undefined",
          description: "Alternative callback for value changes.",
        },
        {
          name: "placeholder",
          type: "string",
          default: "undefined",
          description: "Placeholder text for the input.",
        },
        {
          name: "emptyMessage",
          type: "string",
          default: '"No results found."',
          description: "Message shown when no options match the search.",
        },
        {
          name: "aria-label",
          type: "string",
          default: '"Autocomplete"',
          description: "Accessible label for screen readers.",
        },
        {
          name: "className",
          type: "string",
          default: "undefined",
          description: "Additional CSS classes for the container.",
        },
      ]}
      accessibility={[
        "Implements ARIA combobox pattern with role='combobox'",
        "Keyboard navigation with arrow keys (↓/↑)",
        "Enter key selects highlighted option",
        "Escape key closes dropdown",
        "aria-expanded announces dropdown state",
        "aria-activedescendant tracks highlighted option",
        "Proper focus management and tab order",
      ]}
      previous={{ title: "Alert Dialog", href: "/docs/components/alert-dialog" }}
      next={{ title: "Avatar", href: "/docs/components/avatar" }}
    />
  );
}
