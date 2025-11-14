/**
 * ✅ FABRK COMPONENT
 * Autocomplete Stories - Searchable input with keyboard navigation
 *
 * @see Autocomplete component documentation
 */

import { Autocomplete } from "@/components/ui/autocomplete";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";

const meta: Meta<typeof Autocomplete> = {
  title: "UI/Forms/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const frameworks = [
  "Next.js",
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Solid",
  "Remix",
  "Nuxt",
  "Astro",
  "Qwik",
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "China",
  "India",
  "Brazil",
];

const languages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "PHP",
];

/**
 * Default autocomplete
 */
export const Default: Story = {
  args: {
    options: frameworks,
    placeholder: "Search frameworks...",
  },
};

/**
 * Controlled autocomplete with state
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="w-80 space-y-2">
        <Autocomplete
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select a framework..."
        />
        {value && (
          <p className="text-sm text-muted-foreground">Selected: {value}</p>
        )}
      </div>
    );
  },
};

/**
 * With label
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="framework">Framework</Label>
      <Autocomplete
        options={frameworks}
        placeholder="Select framework..."
        aria-label="Select framework"
      />
    </div>
  ),
};

/**
 * Country selector
 */
export const CountrySelector: Story = {
  render: () => {
    const [country, setCountry] = useState("");

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="country">Country</Label>
        <Autocomplete
          options={countries}
          value={country}
          onValueChange={setCountry}
          placeholder="Search countries..."
          aria-label="Select country"
        />
      </div>
    );
  },
};

/**
 * Programming language selector
 */
export const LanguageSelector: Story = {
  render: () => {
    const [language, setLanguage] = useState("");

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="language">Programming Language</Label>
        <Autocomplete
          options={languages}
          value={language}
          onValueChange={setLanguage}
          placeholder="Search languages..."
          aria-label="Select programming language"
        />
        {language && (
          <Badge variant="secondary">{language}</Badge>
        )}
      </div>
    );
  },
};

/**
 * With object options
 */
export const WithObjectOptions: Story = {
  render: () => {
    const [value, setValue] = useState("");

    const options = [
      { value: "nextjs", label: "Next.js" },
      { value: "react", label: "React" },
      { value: "vue", label: "Vue.js" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ];

    return (
      <div className="w-80 space-y-2">
        <Label>Framework</Label>
        <Autocomplete
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Select framework..."
        />
        {value && (
          <p className="text-sm text-muted-foreground">Value: {value}</p>
        )}
      </div>
    );
  },
};

/**
 * Custom empty message
 */
export const CustomEmptyMessage: Story = {
  render: () => (
    <div className="w-80">
      <Autocomplete
        options={frameworks}
        placeholder="Search frameworks..."
        emptyMessage="No frameworks match your search."
      />
    </div>
  ),
};

/**
 * Email autocomplete
 */
export const EmailAutocomplete: Story = {
  render: () => {
    const [email, setEmail] = useState("");

    const emailDomains = [
      "@gmail.com",
      "@yahoo.com",
      "@outlook.com",
      "@hotmail.com",
      "@icloud.com",
      "@proton.me",
    ];

    const suggestions = email.includes("@")
      ? []
      : emailDomains.map((domain) => email + domain);

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Autocomplete
          options={suggestions}
          value={email}
          onChange={setEmail}
          placeholder="Enter email address..."
          emptyMessage="Start typing to see suggestions"
          aria-label="Email address"
        />
      </div>
    );
  },
};

/**
 * User search
 */
export const UserSearch: Story = {
  render: () => {
    const [user, setUser] = useState("");

    const users = [
      { value: "john", label: "John Doe" },
      { value: "jane", label: "Jane Smith" },
      { value: "bob", label: "Bob Johnson" },
      { value: "alice", label: "Alice Williams" },
      { value: "charlie", label: "Charlie Brown" },
    ];

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="user">Assign to User</Label>
        <Autocomplete
          options={users}
          value={user}
          onValueChange={setUser}
          placeholder="Search users..."
          aria-label="Select user"
        />
      </div>
    );
  },
};

/**
 * Tag selector
 */
export const TagSelector: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const availableTags = [
      "bug",
      "feature",
      "enhancement",
      "documentation",
      "design",
      "backend",
      "frontend",
      "urgent",
      "low-priority",
    ];

    const handleSelect = (tag: string) => {
      if (!tags.includes(tag)) {
        setTags([...tags, tag]);
      }
      setInput("");
    };

    return (
      <div className="w-96 space-y-3">
        <Label>Tags</Label>
        <Autocomplete
          options={availableTags.filter((t) => !tags.includes(t))}
          value={input}
          onChange={setInput}
          onValueChange={handleSelect}
          placeholder="Add tags..."
          emptyMessage="No more tags available"
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * City search
 */
export const CitySearch: Story = {
  render: () => {
    const [city, setCity] = useState("");

    const cities = [
      "New York, NY",
      "Los Angeles, CA",
      "Chicago, IL",
      "Houston, TX",
      "Phoenix, AZ",
      "Philadelphia, PA",
      "San Antonio, TX",
      "San Diego, CA",
      "Dallas, TX",
      "San Jose, CA",
    ];

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="city">City</Label>
        <Autocomplete
          options={cities}
          value={city}
          onValueChange={setCity}
          placeholder="Search cities..."
          aria-label="Select city"
        />
      </div>
    );
  },
};

/**
 * Compact size
 */
export const Compact: Story = {
  render: () => (
    <div className="w-64">
      <Autocomplete
        options={frameworks}
        placeholder="Quick search..."
        className="text-sm"
      />
    </div>
  ),
};

/**
 * Full width
 */
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Autocomplete
        options={frameworks}
        placeholder="Search across all frameworks..."
      />
    </div>
  ),
};

/**
 * Large dataset
 */
export const LargeDataset: Story = {
  render: () => {
    const [value, setValue] = useState("");

    // Generate a large list of options
    const largeDataset = Array.from({ length: 100 }, (_, i) => `Option ${i + 1}`);

    return (
      <div className="w-80 space-y-2">
        <Label>Select from 100 options</Label>
        <Autocomplete
          options={largeDataset}
          value={value}
          onValueChange={setValue}
          placeholder="Search options..."
        />
      </div>
    );
  },
};
