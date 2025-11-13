/**
 * ✅ FABRK STORYBOOK
 * Markdown Editor component stories
 * Demonstrates all use cases and variations
 */

"use client";

import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MarkdownEditor } from "./markdown-editor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./card";
import { Button } from "./button";

const meta: Meta<typeof MarkdownEditor> = {
  title: "Components/MarkdownEditor",
  component: MarkdownEditor,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MarkdownEditor>;

// Wrapper component to manage state
const MarkdownEditorWrapper = ({
  initialValue = "",
  ...props
}: Partial<React.ComponentProps<typeof MarkdownEditor>> & { initialValue?: string }) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <MarkdownEditor
      value={value}
      onChange={setValue}
      {...props}
    />
  );
};

export const Default: Story = {
  render: () => <MarkdownEditorWrapper />,
};

export const WithInitialContent: Story = {
  render: () => (
    <MarkdownEditorWrapper
      initialValue={`# Welcome to Markdown Editor

This is a **powerful** and *lightweight* markdown editor built for the Fabrk boilerplate.

## Features

- Live preview
- Formatting toolbar
- Clean neobrutalism design
- No heavy dependencies

### Code Example

\`\`\`typescript
const hello = "world";
console.log(hello);
\`\`\`

Check out the [documentation](https://example.com) for more details.

#### Lists

Unordered list:
- First item
- Second item
- Third item

Ordered list:
1. First step
2. Second step
3. Third step

You can use \`inline code\` like this.
`}
    />
  ),
};

export const EditorOnly: Story = {
  render: () => (
    <MarkdownEditorWrapper
      editorOnly
      initialValue="# Editor Only Mode\n\nThe preview is hidden. Perfect for focused writing."
      placeholder="Write your markdown here..."
    />
  ),
};

export const PreviewOnly: Story = {
  render: () => (
    <MarkdownEditorWrapper
      previewOnly
      initialValue={`# Preview Only Mode

This mode is **read-only**. Great for displaying markdown content without editing capabilities.

## Key Features

- No toolbar
- Clean preview display
- Perfect for documentation viewers

### Example List

- Item one
- Item two
- Item three

Check the [source code](https://github.com) for implementation details.
`}
    />
  ),
};

export const DocumentationEditor: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>API Documentation Editor</CardTitle>
          <CardDescription>
            Create and edit documentation with live preview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownEditorWrapper
            initialValue={`# Authentication API

## Overview

The Authentication API provides secure access to user management features.

### Base URL

\`\`\`
https://api.example.com/v1
\`\`\`

## Endpoints

### POST /auth/login

Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "user@example.com"
  }
}
\`\`\`

### Error Codes

- **400** - Invalid request
- **401** - Unauthorized
- **500** - Server error
`}
            minHeight={500}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

export const BlogPostEditor: Story = {
  render: () => (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">New Blog Post</h2>
          <p className="text-sm text-muted-foreground">Draft your post using markdown</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Publish</Button>
        </div>
      </div>

      <MarkdownEditorWrapper
        initialValue={`# Building a Modern SaaS Boilerplate

*Published on January 15, 2025*

Starting a new SaaS project can be overwhelming. There are so many decisions to make: authentication, payments, database, UI components, and more.

## The Problem

Most developers either:

1. **Start from scratch** - Waste weeks on boilerplate
2. **Use outdated templates** - Fight legacy code
3. **Over-engineer** - Build features they don't need

## Our Solution: Fabrk

Fabrk is a production-ready Next.js 15 boilerplate that gives you:

- **NextAuth v5** for authentication
- **Stripe** for payments
- **Prisma** with PostgreSQL
- **25+ UI components** with neobrutalism design
- **Email system** with React Email

### Why Choose Fabrk?

**Clean codebase**: Only 161 essential files (vs 1000+ in bloated templates)

**Production ready**: Not a toy project - built for real SaaS apps

**Modern stack**: Next.js 15, TypeScript, Tailwind CSS v4

## Getting Started

\`\`\`bash
npm install
npm run db:push
npm run dev
\`\`\`

Check out the [documentation](https://fabrk.dev) to learn more.

## Conclusion

Stop reinventing the wheel. Start shipping features that matter.

**Ready to build your SaaS?** [Get Fabrk today](https://fabrk.dev)
`}
        minHeight={600}
      />
    </div>
  ),
};

export const ReadmeEditor: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>README.md</CardTitle>
          <CardDescription>
            Edit your project README with live preview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownEditorWrapper
            initialValue={`# Project Name

A brief description of what this project does and who it's for.

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`javascript
import { Component } from 'package-name';

const app = new Component();
app.init();
\`\`\`

## API Reference

### \`init()\`

Initializes the component.

**Returns:** \`void\`

### \`destroy()\`

Cleans up resources.

**Returns:** \`void\`

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## License

MIT License - see LICENSE file for details.

## Contact

- Email: hello@example.com
- GitHub: [@username](https://github.com/username)
- Website: [example.com](https://example.com)
`}
            minHeight={500}
          />
        </CardContent>
      </Card>
    </div>
  ),
};

export const CodeDocumentation: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Component Documentation</h2>
          <p className="text-sm text-muted-foreground">
            Document your React components with examples
          </p>
        </div>
      </div>

      <MarkdownEditorWrapper
        initialValue={`# Button Component

A versatile button component with multiple variants and states.

## Import

\`\`\`tsx
import { Button } from "@/components/ui/button";
\`\`\`

## Usage

### Basic Example

\`\`\`tsx
<Button>Click me</Button>
\`\`\`

### Variants

\`\`\`tsx
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link Button</Button>
\`\`\`

### Sizes

\`\`\`tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🎨</Button>
\`\`\`

### Loading State

\`\`\`tsx
<Button loading loadingText="Saving...">
  Save Changes
</Button>
\`\`\`

### Disabled State

\`\`\`tsx
<Button disabled>
  Disabled Button
</Button>
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`variant\` | \`string\` | \`"default"\` | Visual style variant |
| \`size\` | \`string\` | \`"default"\` | Button size |
| \`loading\` | \`boolean\` | \`false\` | Show loading state |
| \`disabled\` | \`boolean\` | \`false\` | Disable the button |
| \`asChild\` | \`boolean\` | \`false\` | Render as child component |

## Accessibility

- Uses semantic \`<button>\` element
- Includes \`aria-busy\` when loading
- Supports keyboard navigation
- Focus visible states

## Design Tokens

The button uses the following design tokens:

- \`--primary\` - Primary color
- \`--border-brutal\` - Border color
- \`--shadow-brutal\` - Shadow effect
- \`--radius-brutal\` - Border radius

## Examples

### Icon Button

\`\`\`tsx
import { Trash2 } from "lucide-react";

<Button size="icon" variant="destructive">
  <Trash2 className="h-4 w-4" />
</Button>
\`\`\`

### Button with Icon

\`\`\`tsx
import { Save } from "lucide-react";

<Button>
  <Save className="h-4 w-4 mr-2" />
  Save Changes
</Button>
\`\`\`

### As Link

\`\`\`tsx
import Link from "next/link";

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
\`\`\`
`}
        minHeight={600}
      />
    </div>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <MarkdownEditorWrapper
      initialValue="# Custom Height\n\nThis editor has a minimum height of 300px."
      minHeight={300}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <MarkdownEditorWrapper
      disabled
      initialValue="# Read-Only Content\n\nThis editor is disabled and cannot be edited."
    />
  ),
};

export const EmptyState: Story = {
  render: () => (
    <MarkdownEditorWrapper
      placeholder="Start writing your epic story..."
    />
  ),
};

export const AllMarkdownFeatures: Story = {
  render: () => (
    <MarkdownEditorWrapper
      initialValue={`# Markdown Features Showcase

## Headers

# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header

## Emphasis

**Bold text** using double asterisks
__Bold text__ using double underscores
*Italic text* using single asterisks
_Italic text_ using single underscores

## Links

[Visit GitHub](https://github.com)
[Documentation](https://nextjs.org/docs)

## Code

Inline code: \`const x = 42;\`

Code block:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

TypeScript code:
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com"
};
\`\`\`

## Lists

### Unordered Lists

- First item
- Second item
- Third item
* Alternative syntax
* Using asterisks

### Ordered Lists

1. First step
2. Second step
3. Third step
4. Fourth step

## Nested Content

Here's a paragraph with **bold text** and *italics* and \`inline code\` all mixed together.

You can also have [links](https://example.com) in paragraphs.

## Complex Example

To authenticate with the API:

1. Get your API key from the dashboard
2. Add it to your \`.env\` file: \`API_KEY=your_key_here\`
3. Make a request:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.example.com/v1/users
\`\`\`

4. Handle the response

**Important:** Never commit your API keys to version control!

Check the [security documentation](https://docs.example.com/security) for best practices.
`}
      minHeight={700}
    />
  ),
};
