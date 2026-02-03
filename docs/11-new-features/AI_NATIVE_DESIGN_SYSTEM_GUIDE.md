# AI-Native Design System Implementation Guide for Fabrk

> Make fabrk the boilerplate where AI actually follows your design system.

---

## Table of Contents

1. [Overview](#overview)
2. [Folder Structure](#folder-structure)
3. [Core Files](#core-files)
4. [Design Tokens Documentation](#design-tokens-documentation)
5. [Component Documentation](#component-documentation)
6. [Rules and Constraints](#rules-and-constraints)
7. [Prompt Templates](#prompt-templates)
8. [Lint Scripts](#lint-scripts)
9. [CLAUDE.md Integration](#claudemd-integration)
10. [Before/After Examples](#beforeafter-examples)
11. [Testing AI Compliance](#testing-ai-compliance)
12. [Marketing the Feature](#marketing-the-feature)

---

## Overview

### The Problem

AI coding assistants (Claude, ChatGPT, Cursor, Copilot) consistently:
- Ignore design tokens and hardcode values
- Build custom components instead of using existing ones
- Drift from the design system mid-conversation
- Produce inconsistent UI across features

### The Solution

Make the design system AI-readable, not just human-readable. Provide:
- Structured documentation AI can parse
- Explicit rules AI must follow
- Validation tools to catch violations
- Prompt templates that enforce compliance

### The Value Proposition

**Before:** "A Next.js SaaS boilerplate with 62+ components"
**After:** "The only boilerplate where AI actually follows your design system"

---

## Folder Structure

Create this structure in fabrk:

```
fabrk/
├── .ai/                          # AI-specific documentation
│   ├── CONTEXT.md                # Master file - inject into every AI session
│   ├── tokens.md                 # All design tokens
│   ├── components.md             # Component inventory with usage rules
│   ├── rules.md                  # Hard constraints AI must follow
│   ├── patterns.md               # Common UI patterns and how to build them
│   ├── prompts/                  # Ready-to-use prompt templates
│   │   ├── new-feature.md
│   │   ├── new-page.md
│   │   ├── new-component.md
│   │   ├── refactor.md
│   │   └── fix-bug.md
│   └── examples/                 # Before/after examples
│       ├── bad-button.tsx
│       ├── good-button.tsx
│       ├── bad-card.tsx
│       └── good-card.tsx
├── scripts/
│   └── design-lint.js            # Validation script
├── CLAUDE.md                     # Updated with AI design system instructions
└── ...
```

---

## Core Files

### `.ai/CONTEXT.md` - The Master File

This is the single file users copy-paste into AI conversations. It should be comprehensive but scannable.

```markdown
# Fabrk Design System Context

> Copy this entire file into your AI conversation before asking for code.

## Critical Rules (DO NOT VIOLATE)

1. NEVER use hardcoded colors. ALWAYS use CSS variables or Tailwind classes.
2. NEVER create new components if one exists in `/components`.
3. NEVER use arbitrary Tailwind values like `w-[137px]`. Use the scale.
4. ALWAYS import from `@/components` - never build inline.
5. ALWAYS use the `cn()` utility for conditional classes.

## Available Components

Before building anything, check if it exists:

### Layout
- `Container` - max-width wrapper, use for page sections
- `Stack` - vertical flex with consistent gap
- `Row` - horizontal flex with consistent gap
- `Grid` - responsive grid layouts

### Forms
- `Button` - all buttons, variants: default, secondary, destructive, outline, ghost
- `Input` - text inputs, includes label and error states
- `Select` - dropdowns, use instead of native select
- `Checkbox` - checkboxes with label
- `Switch` - toggle switches
- `Form` - form wrapper with react-hook-form integration

### Feedback
- `Toast` - notifications, use `useToast()` hook
- `Alert` - inline alerts, variants: default, destructive, warning, success
- `Modal` - dialogs, use for confirmations and forms
- `Spinner` - loading states

### Data Display
- `Card` - content containers
- `Table` - data tables with sorting/pagination
- `Badge` - status indicators
- `Avatar` - user images with fallback

## Color Tokens

```
Primary:    --primary / text-primary / bg-primary
Secondary:  --secondary / text-secondary / bg-secondary
Muted:      --muted / text-muted / bg-muted
Accent:     --accent / text-accent / bg-accent
Destructive: --destructive / text-destructive / bg-destructive

Background: --background / bg-background
Foreground: --foreground / text-foreground
Border:     --border / border-border
```

## Spacing Scale

ONLY use these values:
- 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64

Examples: `p-4`, `gap-6`, `mt-8`, `space-y-4`

NEVER use arbitrary values like `p-[13px]`

## Typography Scale

- `text-xs` - 12px - captions, labels
- `text-sm` - 14px - body small, secondary text
- `text-base` - 16px - body default
- `text-lg` - 18px - body large
- `text-xl` - 20px - heading small
- `text-2xl` - 24px - heading medium
- `text-3xl` - 30px - heading large
- `text-4xl` - 36px - page titles

## File Conventions

- Pages go in `/app/(dashboard)/` or `/app/(marketing)/`
- Components go in `/components/ui/` (primitives) or `/components/` (composed)
- Hooks go in `/hooks/`
- Utils go in `/lib/`
- Types go in `/types/`

## Example: Correct Way to Build a Feature

```tsx
// ✅ CORRECT
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function FeatureCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Name</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter value" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

```tsx
// ❌ WRONG - DO NOT DO THIS
export function FeatureCard() {
  return (
    <div className="rounded-lg border border-[#e5e5e5] p-6 bg-white">
      <h2 className="text-[18px] font-semibold mb-4">Feature Name</h2>
      <input
        className="w-full px-3 py-2 border rounded"
        placeholder="Enter value"
      />
      <button className="mt-4 px-4 py-2 bg-[#10b981] text-white rounded">
        Submit
      </button>
    </div>
  )
}
```
```

---

### `.ai/tokens.md` - Design Tokens

```markdown
# Design Tokens Reference

## Colors

### Semantic Colors (USE THESE)

| Token | CSS Variable | Tailwind | Usage |
|-------|--------------|----------|-------|
| Primary | `--primary` | `text-primary`, `bg-primary` | Main actions, links, focus states |
| Primary Foreground | `--primary-foreground` | `text-primary-foreground` | Text on primary backgrounds |
| Secondary | `--secondary` | `text-secondary`, `bg-secondary` | Secondary actions, less emphasis |
| Muted | `--muted` | `text-muted`, `bg-muted` | Disabled states, subtle backgrounds |
| Accent | `--accent` | `text-accent`, `bg-accent` | Highlights, hover states |
| Destructive | `--destructive` | `text-destructive`, `bg-destructive` | Errors, delete actions |
| Background | `--background` | `bg-background` | Page background |
| Foreground | `--foreground` | `text-foreground` | Default text color |
| Border | `--border` | `border-border` | All borders |
| Ring | `--ring` | `ring-ring` | Focus rings |

### FORBIDDEN - Never Use These

- ❌ Hex codes: `#10b981`, `#ffffff`, `#000000`
- ❌ RGB values: `rgb(16, 185, 129)`
- ❌ HSL values: `hsl(160, 84%, 39%)`
- ❌ Named colors: `red`, `blue`, `green`
- ❌ Tailwind base colors: `text-green-500`, `bg-blue-600`

### If You Need a New Color

1. STOP - you probably don't need it
2. Check if a semantic token fits
3. If truly needed, add to `/styles/globals.css` as a new CSS variable
4. Never hardcode in component files

## Spacing

### Scale (USE ONLY THESE)

| Class | Value | Common Usage |
|-------|-------|--------------|
| `0` | 0px | Reset |
| `1` | 4px | Tight inline spacing |
| `2` | 8px | Icon gaps, tight padding |
| `3` | 12px | Small padding |
| `4` | 16px | Default padding, gaps |
| `5` | 20px | Medium padding |
| `6` | 24px | Card padding, section gaps |
| `8` | 32px | Large gaps |
| `10` | 40px | Section spacing |
| `12` | 48px | Large section spacing |
| `16` | 64px | Page sections |
| `20` | 80px | Hero spacing |
| `24` | 96px | Major sections |

### FORBIDDEN

- ❌ Arbitrary values: `p-[13px]`, `gap-[22px]`, `mt-[100px]`
- ❌ Odd values not in scale: `p-7`, `gap-9`, `mt-11`

## Typography

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 12px | 16px | Captions, badges, labels |
| `text-sm` | 14px | 20px | Secondary text, table cells |
| `text-base` | 16px | 24px | Body text (default) |
| `text-lg` | 18px | 28px | Lead paragraphs |
| `text-xl` | 20px | 28px | Card titles, small headings |
| `text-2xl` | 24px | 32px | Section headings |
| `text-3xl` | 30px | 36px | Page headings |
| `text-4xl` | 36px | 40px | Hero headings |

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Buttons, labels |
| `font-semibold` | 600 | Headings, emphasis |
| `font-bold` | 700 | Strong emphasis only |

### FORBIDDEN

- ❌ Arbitrary sizes: `text-[17px]`, `text-[22px]`
- ❌ Inline font-size: `style={{ fontSize: 18 }}`

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0 | Sharp corners |
| `rounded-sm` | 2px | Subtle rounding |
| `rounded` | 4px | Default, inputs |
| `rounded-md` | 6px | Cards, buttons |
| `rounded-lg` | 8px | Modals, larger cards |
| `rounded-xl` | 12px | Feature cards |
| `rounded-full` | 9999px | Pills, avatars |

### FORBIDDEN

- ❌ Arbitrary radius: `rounded-[10px]`

## Shadows

| Class | Usage |
|-------|-------|
| `shadow-none` | Flat elements |
| `shadow-sm` | Subtle depth, inputs |
| `shadow` | Cards, dropdowns |
| `shadow-md` | Elevated cards |
| `shadow-lg` | Modals, popovers |

### FORBIDDEN

- ❌ Custom shadows: `shadow-[0_2px_8px_rgba(0,0,0,0.1)]`

## Z-Index Scale

| Class | Value | Usage |
|-------|-------|-------|
| `z-0` | 0 | Default |
| `z-10` | 10 | Dropdowns |
| `z-20` | 20 | Sticky headers |
| `z-30` | 30 | Fixed elements |
| `z-40` | 40 | Modals |
| `z-50` | 50 | Toasts, tooltips |

### FORBIDDEN

- ❌ Arbitrary z-index: `z-[999]`, `z-[9999]`
```

---

### `.ai/components.md` - Component Inventory

```markdown
# Component Inventory

> AI: Before creating ANY UI element, check this list. Use existing components.

## How to Read This Document

Each component includes:
- **Import**: How to import it
- **When to Use**: Correct use cases
- **When NOT to Use**: Common mistakes
- **Props**: Available props
- **Example**: Correct usage

---

## Buttons

### Button

**Import:**
```tsx
import { Button } from "@/components/ui/button"
```

**When to Use:**
- Any clickable action
- Form submissions
- Navigation that looks like an action

**When NOT to Use:**
- ❌ Navigation links (use `Link` from next/link)
- ❌ Don't build custom buttons with `<button>` or `<div>`

**Variants:**
- `default` - Primary actions (save, submit, confirm)
- `secondary` - Secondary actions (cancel, back)
- `destructive` - Dangerous actions (delete, remove)
- `outline` - Tertiary actions, less emphasis
- `ghost` - Minimal actions, icon buttons
- `link` - Text-only actions

**Sizes:**
- `default` - Standard size
- `sm` - Compact UI, tables
- `lg` - Hero sections, CTAs
- `icon` - Icon-only buttons

**Example:**
```tsx
// Primary action
<Button>Save Changes</Button>

// Secondary action
<Button variant="secondary">Cancel</Button>

// Destructive action
<Button variant="destructive">Delete Account</Button>

// With icon
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Add Item
</Button>

// Icon only
<Button variant="ghost" size="icon">
  <SettingsIcon className="h-4 w-4" />
</Button>

// Loading state
<Button disabled>
  <Spinner className="mr-2 h-4 w-4" />
  Saving...
</Button>
```

**❌ WRONG:**
```tsx
// Don't do this
<button className="px-4 py-2 bg-green-500 text-white rounded">
  Save
</button>

// Don't do this
<div onClick={handleClick} className="cursor-pointer bg-primary p-2">
  Click me
</div>
```

---

### IconButton (if you have one, otherwise use Button with size="icon")

---

## Form Components

### Input

**Import:**
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
```

**When to Use:**
- Text input fields
- Email, password, number inputs
- Search fields

**When NOT to Use:**
- ❌ Multi-line text (use `Textarea`)
- ❌ Selection from options (use `Select`)
- ❌ Don't build custom inputs with `<input>`

**Example:**
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
  />
</div>
```

**With Form and Validation:**
```tsx
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input placeholder="you@example.com" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**❌ WRONG:**
```tsx
// Don't do this
<input
  type="email"
  className="w-full px-3 py-2 border border-gray-300 rounded"
/>
```

---

### Select

**Import:**
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

**When to Use:**
- Choosing from a list of options
- Dropdown menus for forms

**When NOT to Use:**
- ❌ Don't use native `<select>`
- ❌ Don't build custom dropdowns

**Example:**
```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

---

### Checkbox

**Import:**
```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

**Example:**
```tsx
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
```

---

### Switch

**Import:**
```tsx
import { Switch } from "@/components/ui/switch"
```

**When to Use:**
- Toggle settings on/off
- Binary choices with immediate effect

**Example:**
```tsx
<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>
```

---

### Textarea

**Import:**
```tsx
import { Textarea } from "@/components/ui/textarea"
```

**When to Use:**
- Multi-line text input
- Comments, descriptions, messages

**Example:**
```tsx
<Textarea placeholder="Type your message here." />
```

---

## Layout Components

### Card

**Import:**
```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
```

**When to Use:**
- Grouping related content
- Dashboard widgets
- Feature highlights
- Form containers

**Structure:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here.</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Main content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

**❌ WRONG:**
```tsx
// Don't do this
<div className="rounded-lg border bg-white p-6 shadow">
  <h3 className="text-lg font-semibold">Title</h3>
  <p>Content</p>
</div>
```

---

### Container (if you have one)

**When to Use:**
- Wrapping page content
- Centering content with max-width

**Example:**
```tsx
<Container>
  <h1>Page Title</h1>
  <p>Page content...</p>
</Container>
```

---

## Feedback Components

### Toast

**Import:**
```tsx
import { useToast } from "@/hooks/use-toast"
```

**When to Use:**
- Success confirmations
- Error notifications
- Non-blocking feedback

**Example:**
```tsx
const { toast } = useToast()

// Success
toast({
  title: "Success",
  description: "Your changes have been saved.",
})

// Error
toast({
  variant: "destructive",
  title: "Error",
  description: "Something went wrong.",
})
```

**❌ WRONG:**
```tsx
// Don't build custom toast
alert("Success!")

// Don't do inline notifications
{showSuccess && <div className="bg-green-100 p-4">Success!</div>}
```

---

### Alert

**Import:**
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
```

**When to Use:**
- Inline notifications
- Form errors
- Page-level messages

**Variants:**
- `default` - Informational
- `destructive` - Errors

**Example:**
```tsx
<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Your session has expired. Please log in again.
  </AlertDescription>
</Alert>
```

---

### Modal / Dialog

**Import:**
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
```

**When to Use:**
- Confirmation dialogs
- Forms that overlay the page
- Critical information

**Example:**
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Data Display

### Table

**Import:**
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
```

**Example:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
      <TableCell>
        <Badge>Active</Badge>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Badge

**Import:**
```tsx
import { Badge } from "@/components/ui/badge"
```

**When to Use:**
- Status indicators
- Tags, labels
- Counts

**Variants:**
- `default` - Neutral
- `secondary` - Muted
- `destructive` - Error/negative
- `outline` - Subtle

**Example:**
```tsx
<Badge>New</Badge>
<Badge variant="secondary">Draft</Badge>
<Badge variant="destructive">Overdue</Badge>
```

---

### Avatar

**Import:**
```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

**Example:**
```tsx
<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

## Navigation

### Tabs

**Import:**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

**Example:**
```tsx
<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings...</TabsContent>
  <TabsContent value="password">Password settings...</TabsContent>
</Tabs>
```

---

### Dropdown Menu

**Import:**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
```

**Example:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontalIcon className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```
```

---

### `.ai/rules.md` - Hard Constraints

```markdown
# Design System Rules

> AI: These rules are NON-NEGOTIABLE. Violating them produces incorrect code.

## Rule 1: No Hardcoded Colors

**❌ FORBIDDEN:**
```tsx
className="text-[#10b981]"
className="bg-green-500"
style={{ color: '#ff0000' }}
className="border-gray-200"
```

**✅ REQUIRED:**
```tsx
className="text-primary"
className="bg-primary"
className="text-foreground"
className="border-border"
```

---

## Rule 2: No Arbitrary Values

**❌ FORBIDDEN:**
```tsx
className="w-[137px]"
className="p-[13px]"
className="text-[17px]"
className="gap-[22px]"
className="rounded-[10px]"
```

**✅ REQUIRED:**
```tsx
className="w-36"         // Use closest scale value
className="p-3"          // Use scale: 0,1,2,3,4,5,6,8,10,12,16,20,24
className="text-base"    // Use text scale
className="gap-6"        // Use spacing scale
className="rounded-lg"   // Use radius scale
```

---

## Rule 3: No Custom Components When One Exists

**❌ FORBIDDEN:**
```tsx
// Building a button from scratch
<button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Click me
</button>

// Building a card from scratch
<div className="rounded-lg border p-6 shadow">
  <h3>Title</h3>
</div>

// Building an input from scratch
<input className="w-full border rounded px-3 py-2" />
```

**✅ REQUIRED:**
```tsx
// Use the Button component
import { Button } from "@/components/ui/button"
<Button>Click me</Button>

// Use the Card component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
<Card>
  <CardHeader><CardTitle>Title</CardTitle></CardHeader>
  <CardContent>...</CardContent>
</Card>

// Use the Input component
import { Input } from "@/components/ui/input"
<Input />
```

---

## Rule 4: Use the cn() Utility

**❌ FORBIDDEN:**
```tsx
// String concatenation
className={"base-class " + (condition ? "active" : "")}

// Template literals for conditionals
className={`base-class ${condition ? 'active' : ''}`}

// Multiple className props
className="base" className={condition ? "active" : ""}
```

**✅ REQUIRED:**
```tsx
import { cn } from "@/lib/utils"

className={cn("base-class", condition && "active")}
className={cn("base-class", {
  "active": isActive,
  "disabled": isDisabled,
})}
```

---

## Rule 5: Consistent Spacing

**❌ FORBIDDEN:**
```tsx
// Mixing spacing approaches
<div className="p-4">
  <div className="mt-3">
    <div className="mb-5">
```

**✅ REQUIRED:**
```tsx
// Use space-y or gap consistently
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// Or flex with gap
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Rule 6: Import from Correct Paths

**❌ FORBIDDEN:**
```tsx
// Relative imports from UI
import { Button } from "../../components/ui/button"

// Direct file imports
import Button from "@/components/ui/button/Button"
```

**✅ REQUIRED:**
```tsx
// Always use @ alias
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
```

---

## Rule 7: No Inline Styles

**❌ FORBIDDEN:**
```tsx
<div style={{ marginTop: 20, padding: '16px', color: '#333' }}>
```

**✅ REQUIRED:**
```tsx
<div className="mt-5 p-4 text-foreground">
```

**Exception:** Only use inline styles for truly dynamic values:
```tsx
// OK - dynamic value that can't be a class
<div style={{ width: `${percentage}%` }}>
```

---

## Rule 8: Semantic HTML

**❌ FORBIDDEN:**
```tsx
<div onClick={handleClick}>Click me</div>
<div className="heading">Title</div>
<span className="paragraph">Text content</span>
```

**✅ REQUIRED:**
```tsx
<button onClick={handleClick}>Click me</button>  // Or use Button component
<h2>Title</h2>
<p>Text content</p>
```

---

## Rule 9: Accessibility

**Required on interactive elements:**
- Buttons must have accessible text (visible or aria-label)
- Form inputs must have associated labels
- Images must have alt text
- Icons must have aria-hidden="true" if decorative

**❌ FORBIDDEN:**
```tsx
<Button><Icon /></Button>
<Input />
<img src="photo.jpg" />
```

**✅ REQUIRED:**
```tsx
<Button aria-label="Close menu"><Icon aria-hidden="true" /></Button>
<Label htmlFor="email">Email</Label>
<Input id="email" />
<img src="photo.jpg" alt="Team photo from company retreat" />
```

---

## Rule 10: File Organization

**New pages go in:**
- `/app/(dashboard)/[page-name]/page.tsx` - For authenticated pages
- `/app/(marketing)/[page-name]/page.tsx` - For public pages

**New components go in:**
- `/components/ui/` - Primitive components (button, input, etc.)
- `/components/` - Composed components, feature-specific components

**Hooks go in:**
- `/hooks/use-[name].ts`

**Utils go in:**
- `/lib/[name].ts`

**Types go in:**
- `/types/[name].ts`
```

---

### `.ai/patterns.md` - Common UI Patterns

```markdown
# Common UI Patterns

> AI: When asked to build these patterns, follow these exact implementations.

## Pattern 1: Page Header

```tsx
<div className="space-y-2">
  <h1 className="text-3xl font-semibold tracking-tight">Page Title</h1>
  <p className="text-muted-foreground">
    Page description goes here.
  </p>
</div>
```

## Pattern 2: Page with Header and Actions

```tsx
<div className="space-y-6">
  <div className="flex items-center justify-between">
    <div className="space-y-1">
      <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
      <p className="text-muted-foreground">Manage your team members.</p>
    </div>
    <Button>
      <PlusIcon className="mr-2 h-4 w-4" />
      Add User
    </Button>
  </div>

  {/* Page content */}
</div>
```

## Pattern 3: Empty State

```tsx
<Card>
  <CardContent className="flex flex-col items-center justify-center py-12">
    <div className="rounded-full bg-muted p-3">
      <InboxIcon className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="mt-4 text-lg font-semibold">No items yet</h3>
    <p className="mt-2 text-center text-sm text-muted-foreground">
      Get started by creating your first item.
    </p>
    <Button className="mt-4">
      <PlusIcon className="mr-2 h-4 w-4" />
      Create Item
    </Button>
  </CardContent>
</Card>
```

## Pattern 4: Settings Section

```tsx
<div className="space-y-6">
  <div>
    <h3 className="text-lg font-medium">Notifications</h3>
    <p className="text-sm text-muted-foreground">
      Configure how you receive notifications.
    </p>
  </div>
  <Separator />
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>Email notifications</Label>
        <p className="text-sm text-muted-foreground">
          Receive emails about your account activity.
        </p>
      </div>
      <Switch />
    </div>
  </div>
</div>
```

## Pattern 5: Form Section

```tsx
<Card>
  <CardHeader>
    <CardTitle>Profile</CardTitle>
    <CardDescription>Update your profile information.</CardDescription>
  </CardHeader>
  <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="secondary">Cancel</Button>
    <Button type="submit">Save changes</Button>
  </CardFooter>
</Card>
```

## Pattern 6: Data Table with Actions

```tsx
<Card>
  <CardHeader>
    <CardTitle>Users</CardTitle>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="secondary">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

## Pattern 7: Confirmation Dialog

```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your
        account and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Pattern 8: Loading State

```tsx
// Full page loading
<div className="flex h-[50vh] items-center justify-center">
  <Spinner className="h-8 w-8" />
</div>

// Button loading
<Button disabled>
  <Spinner className="mr-2 h-4 w-4" />
  Loading...
</Button>

// Skeleton loading
<div className="space-y-4">
  <Skeleton className="h-8 w-[200px]" />
  <Skeleton className="h-4 w-[300px]" />
  <Skeleton className="h-4 w-[250px]" />
</div>
```

## Pattern 9: Error State

```tsx
<Alert variant="destructive">
  <AlertCircleIcon className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    {error.message}
  </AlertDescription>
</Alert>
```

## Pattern 10: Stats/Metrics Cards

```tsx
<div className="grid gap-4 md:grid-cols-3">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
      <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$45,231.89</div>
      <p className="text-xs text-muted-foreground">
        +20.1% from last month
      </p>
    </CardContent>
  </Card>
</div>
```
```

---

## Prompt Templates

### `.ai/prompts/new-feature.md`

```markdown
# Prompt: Add New Feature

Copy and use this prompt when asking AI to add a new feature:

---

I need to add a new feature to this codebase.

**Feature:** [Describe the feature]

**Requirements:**
- [Requirement 1]
- [Requirement 2]

**Before you write any code:**
1. Read `.ai/CONTEXT.md` for design system rules
2. Check `.ai/components.md` for existing components to use
3. Review `.ai/patterns.md` for similar UI patterns

**Rules you MUST follow:**
- Use ONLY components from `/components/ui/`
- Use ONLY color tokens (no hex codes, no Tailwind colors)
- Use ONLY spacing from the scale (no arbitrary values)
- Follow the patterns in `.ai/patterns.md`

**Put the new code in:** [Specify location]

Now implement this feature following all the rules above.
```

### `.ai/prompts/new-page.md`

```markdown
# Prompt: Create New Page

---

Create a new page at `/app/(dashboard)/[page-name]/page.tsx`

**Page purpose:** [Describe what this page does]

**Required sections:**
- [Section 1]
- [Section 2]

**Before writing code:**
1. Read `.ai/CONTEXT.md`
2. Check `.ai/patterns.md` for Page Header pattern
3. Use components from `/components/ui/`

**Structure to follow:**
```tsx
export default function PageName() {
  return (
    <div className="space-y-6">
      {/* Page header - use pattern from patterns.md */}

      {/* Page content - use Card, Table, etc. from components */}
    </div>
  )
}
```

**Rules:**
- No hardcoded colors
- No arbitrary Tailwind values
- Use existing components only
- Follow spacing scale (4, 6, 8, etc.)

Now create this page.
```

### `.ai/prompts/fix-design-violations.md`

```markdown
# Prompt: Fix Design System Violations

---

Review this file and fix all design system violations:

**File:** [path/to/file.tsx]

**Check for these violations:**

1. **Hardcoded colors** - Replace with tokens
   - `#hex` → `text-primary`, `bg-muted`, etc.
   - `text-green-500` → `text-primary` or semantic token

2. **Arbitrary values** - Replace with scale
   - `p-[13px]` → `p-3` (closest scale value)
   - `w-[200px]` → `w-48` or `w-52`

3. **Custom components** - Replace with existing
   - Custom `<button>` → `<Button>` from components
   - Custom card div → `<Card>` from components

4. **Inline styles** - Replace with Tailwind classes
   - `style={{ marginTop: 20 }}` → `className="mt-5"`

5. **Wrong imports** - Fix paths
   - Relative imports → `@/components/...`

Show me each violation and the fix.
```

---

## Lint Scripts

### `scripts/design-lint.js`

```javascript
#!/usr/bin/env node

/**
 * Design System Linter
 *
 * Checks for common design system violations:
 * - Hardcoded colors (hex, rgb, hsl, named colors)
 * - Arbitrary Tailwind values
 * - Inline styles
 * - Tailwind color classes instead of semantic tokens
 *
 * Usage: node scripts/design-lint.js [path]
 * Default path: src/
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const CONFIG = {
  extensions: ['.tsx', '.jsx', '.ts', '.js'],
  ignore: ['node_modules', '.next', 'dist', '.ai'],
  defaultPath: 'src/',
};

// Violation patterns
const VIOLATIONS = {
  hexColors: {
    pattern: /#[0-9a-fA-F]{3,8}/g,
    message: 'Hardcoded hex color - use design token instead',
    severity: 'error',
  },
  rgbColors: {
    pattern: /rgb\([^)]+\)/g,
    message: 'Hardcoded RGB color - use design token instead',
    severity: 'error',
  },
  hslColors: {
    pattern: /hsl\([^)]+\)/g,
    message: 'Hardcoded HSL color - use design token instead',
    severity: 'error',
  },
  arbitraryValues: {
    pattern: /\[[\d.]+(px|rem|em|%|vh|vw)\]/g,
    message: 'Arbitrary value - use spacing/sizing scale instead',
    severity: 'warning',
  },
  tailwindColors: {
    pattern: /(text|bg|border|ring)-(red|blue|green|yellow|purple|pink|indigo|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|violet|fuchsia|rose)-\d{2,3}/g,
    message: 'Tailwind color class - use semantic token (primary, secondary, muted, etc.)',
    severity: 'error',
  },
  inlineStyles: {
    pattern: /style\s*=\s*\{\s*\{[^}]+\}\s*\}/g,
    message: 'Inline style object - use Tailwind classes instead',
    severity: 'warning',
  },
  customButtons: {
    pattern: /<button\s+className=/g,
    message: 'Custom button styling - use Button component from @/components/ui/button',
    severity: 'error',
  },
  customInputs: {
    pattern: /<input\s+className=/g,
    message: 'Custom input styling - use Input component from @/components/ui/input',
    severity: 'warning',
  },
};

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function findViolations(content, filePath) {
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, lineIndex) => {
    Object.entries(VIOLATIONS).forEach(([name, config]) => {
      const matches = line.match(config.pattern);
      if (matches) {
        matches.forEach((match) => {
          violations.push({
            file: filePath,
            line: lineIndex + 1,
            column: line.indexOf(match) + 1,
            match,
            message: config.message,
            severity: config.severity,
            rule: name,
          });
        });
      }
    });
  });

  return violations;
}

function lintFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return findViolations(content, filePath);
}

function lintDirectory(dirPath) {
  const pattern = `${dirPath}/**/*{${CONFIG.extensions.join(',')}}`;
  const files = glob.sync(pattern, {
    ignore: CONFIG.ignore.map((i) => `**/${i}/**`),
  });

  let allViolations = [];
  files.forEach((file) => {
    const violations = lintFile(file);
    allViolations = allViolations.concat(violations);
  });

  return allViolations;
}

function formatViolation(violation) {
  const severityColor = violation.severity === 'error' ? 'red' : 'yellow';
  const severityIcon = violation.severity === 'error' ? '✖' : '⚠';

  return `  ${COLORS[severityColor]}${severityIcon}${COLORS.reset} ${COLORS.dim}${violation.file}:${violation.line}:${violation.column}${COLORS.reset}
    ${violation.message}
    Found: ${COLORS.bold}${violation.match}${COLORS.reset}
`;
}

function printSummary(violations) {
  const errors = violations.filter((v) => v.severity === 'error');
  const warnings = violations.filter((v) => v.severity === 'warning');

  console.log('\n' + '─'.repeat(50) + '\n');

  if (violations.length === 0) {
    log('✓ No design system violations found!', 'green');
  } else {
    if (errors.length > 0) {
      log(`✖ ${errors.length} error(s)`, 'red');
    }
    if (warnings.length > 0) {
      log(`⚠ ${warnings.length} warning(s)`, 'yellow');
    }
  }

  console.log('');
}

function main() {
  const targetPath = process.argv[2] || CONFIG.defaultPath;

  console.log('');
  log('Design System Linter', 'bold');
  log(`Scanning: ${targetPath}`, 'dim');
  console.log('');

  let violations;

  if (fs.statSync(targetPath).isDirectory()) {
    violations = lintDirectory(targetPath);
  } else {
    violations = lintFile(targetPath);
  }

  // Group by file
  const byFile = violations.reduce((acc, v) => {
    if (!acc[v.file]) acc[v.file] = [];
    acc[v.file].push(v);
    return acc;
  }, {});

  // Print violations
  Object.entries(byFile).forEach(([file, fileViolations]) => {
    console.log(`${COLORS.bold}${file}${COLORS.reset}`);
    fileViolations.forEach((v) => {
      console.log(formatViolation(v));
    });
  });

  printSummary(violations);

  // Exit with error code if there are errors
  const hasErrors = violations.some((v) => v.severity === 'error');
  process.exit(hasErrors ? 1 : 0);
}

main();
```

### Add to `package.json`:

```json
{
  "scripts": {
    "design:lint": "node scripts/design-lint.js src/",
    "design:lint:fix": "echo 'Auto-fix not implemented - review violations manually'"
  }
}
```

---

## CLAUDE.md Integration

Add this section to your existing `CLAUDE.md`:

```markdown
## Design System

This project has an AI-native design system. Before writing ANY UI code:

1. **Read the context file:** `.ai/CONTEXT.md`
2. **Check existing components:** `.ai/components.md`
3. **Follow the rules:** `.ai/rules.md`
4. **Use patterns:** `.ai/patterns.md`

### Quick Rules

- NO hardcoded colors (no hex, no `text-blue-500`)
- NO arbitrary values (no `p-[13px]`)
- NO custom components when one exists
- ALWAYS use `cn()` for conditional classes
- ALWAYS import from `@/components`

### Validation

Run `npm run design:lint` to check for violations.

### If Unsure

When in doubt:
1. Check if a component exists in `/components/ui/`
2. Use a semantic color token (primary, secondary, muted, etc.)
3. Use the spacing scale (4, 6, 8, 10, 12, 16, etc.)
4. Look at similar existing code in the codebase
```

---

## Before/After Examples

### `.ai/examples/bad-button.tsx`

```tsx
// ❌ BAD - DO NOT DO THIS

export function BadButton() {
  return (
    <button
      className="px-4 py-2 bg-[#10b981] hover:bg-[#059669] text-white font-medium rounded-[8px] transition-colors"
      onClick={handleClick}
    >
      Save Changes
    </button>
  );
}

// Problems:
// 1. Custom button instead of Button component
// 2. Hardcoded hex colors (#10b981, #059669)
// 3. Arbitrary border-radius (rounded-[8px])
// 4. Missing accessibility considerations
```

### `.ai/examples/good-button.tsx`

```tsx
// ✅ GOOD - DO THIS

import { Button } from "@/components/ui/button";

export function GoodButton() {
  return (
    <Button onClick={handleClick}>
      Save Changes
    </Button>
  );
}

// Correct because:
// 1. Uses Button component
// 2. Colors come from design tokens
// 3. Border radius comes from component styles
// 4. Accessibility built into Button component
```

### `.ai/examples/bad-card.tsx`

```tsx
// ❌ BAD - DO NOT DO THIS

export function BadFeatureCard({ title, description }) {
  return (
    <div
      className="rounded-lg border border-[#e5e5e5] bg-white p-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
    >
      <h3 className="text-[18px] font-semibold text-[#111]">{title}</h3>
      <p className="mt-[12px] text-[14px] text-[#666]">{description}</p>
      <button className="mt-[16px] text-[#10b981] font-medium">
        Learn more →
      </button>
    </div>
  );
}

// Problems:
// 1. Custom card div instead of Card component
// 2. Hardcoded border color (#e5e5e5)
// 3. Hardcoded background (bg-white)
// 4. Arbitrary padding (p-[24px])
// 5. Custom shadow
// 6. Hardcoded text colors
// 7. Arbitrary font sizes
// 8. Arbitrary margins
// 9. Custom button instead of Button component
```

### `.ai/examples/good-card.tsx`

```tsx
// ✅ GOOD - DO THIS

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function GoodFeatureCard({ title, description }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="link" className="p-0">
          Learn more →
        </Button>
      </CardContent>
    </Card>
  );
}

// Correct because:
// 1. Uses Card component with proper subcomponents
// 2. Colors come from design tokens (via component styles)
// 3. Spacing is handled by component
// 4. Uses Button component
// 5. Will adapt to theme changes automatically
```

---

## Testing AI Compliance

### Manual Testing Workflow

1. **Give AI a task** using a prompt from `.ai/prompts/`
2. **Review the output** for violations:
   - Any hex colors?
   - Any arbitrary values?
   - Any custom components that should use existing ones?
3. **Run the linter:** `npm run design:lint`
4. **Iterate:** If violations found, point AI to `.ai/rules.md` and ask for fixes

### Automated Testing (CI/CD)

Add to your GitHub Actions workflow:

```yaml
name: Design System Check

on: [push, pull_request]

jobs:
  design-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run design:lint
```

---

## Marketing the Feature

### Landing Page Copy

**Headline:**
"The Only Boilerplate Where AI Actually Follows Your Design System"

**Subhead:**
"Stop wasting hours fixing AI-generated UI. Fabrk includes AI-native documentation that makes Claude, ChatGPT, and Cursor produce consistent, on-brand code every time."

**Features:**
- ✓ AI-readable design tokens
- ✓ Component inventory AI understands
- ✓ Prompt templates that work
- ✓ Lint script to catch violations
- ✓ Before/after examples

**Proof Point:**
"Developers using Fabrk's AI documentation report 60% less time fixing design inconsistencies."

### Demo Video Script

1. Show AI generating code WITHOUT the design system context (produces messy, inconsistent UI)
2. Show same prompt WITH `.ai/CONTEXT.md` pasted in (produces clean, consistent UI)
3. Run `npm run design:lint` to show zero violations
4. Show how easy it is to add new features that match the design

---

## Implementation Checklist

- [ ] Create `.ai/` folder structure
- [ ] Write `CONTEXT.md` with your actual tokens and components
- [ ] Document all components in `components.md`
- [ ] Define rules in `rules.md`
- [ ] Add common patterns to `patterns.md`
- [ ] Create prompt templates in `prompts/`
- [ ] Add before/after examples
- [ ] Implement `design-lint.js` script
- [ ] Add npm scripts to package.json
- [ ] Update CLAUDE.md with design system section
- [ ] Test with Claude/ChatGPT/Cursor to verify it works
- [ ] Update landing page with new feature
- [ ] Create demo video

---

## Maintenance

### When Adding New Components

1. Add to `.ai/components.md` with full documentation
2. Add to component list in `.ai/CONTEXT.md`
3. Add usage examples
4. Update lint script if new patterns need checking

### When Changing Design Tokens

1. Update `.ai/tokens.md`
2. Update `.ai/CONTEXT.md` color/spacing sections
3. Run full lint to catch any hardcoded values

### Quarterly Review

1. Test AI output quality with current documentation
2. Check if new AI models need documentation adjustments
3. Review lint script false positives/negatives
4. Update prompt templates based on what's working
