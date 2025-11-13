# API Documentation - Quick Reference

Fast reference guide for accessing and using the TypeScript API documentation.

## Quick Access

```bash
# View documentation
npm run docs:serve

# Regenerate documentation
npm run docs:api

# Direct browser access
open docs/api/index.html
```

## Component Quick Links

### Navigation Components
- [Tooltip](modules/tooltip.html) - Contextual help on hover
- [Breadcrumb](modules/breadcrumb.html) - Navigation hierarchy
- [Navigation Menu](modules/navigation-menu.html) - Multi-level navigation
- [Menubar](modules/menubar.html) - Application menu bars

### Layout Components
- [Aspect Ratio](modules/aspect-ratio.html) - Responsive media containers
- [Scroll Area](modules/scroll-area.html) - Custom scrollable regions
- [Collapsible](modules/collapsible.html) - Expandable content
- [Skeleton](modules/skeleton.html) - Loading placeholders

### Interactive Components
- [Hover Card](modules/hover-card.html) - Rich preview cards
- [Context Menu](modules/context-menu.html) - Right-click menus
- [Command](modules/command.html) - Command palette

### Form Components
- [Calendar](modules/calendar.html) - Date picker
- [Combobox](modules/combobox.html) - Searchable select

## Import Patterns

```typescript
// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Breadcrumb
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Calendar
import { Calendar } from "@/components/ui/calendar";

// Command
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

// Context Menu
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// Combobox
import { Combobox } from "@/components/ui/combobox";
```

## Common Props

### Tooltip
```typescript
side?: "top" | "right" | "bottom" | "left"
sideOffset?: number
align?: "start" | "center" | "end"
delayDuration?: number
```

### Calendar
```typescript
mode?: "single" | "multiple" | "range"
selected?: Date | Date[]
onSelect?: (date: Date | undefined) => void
disabled?: boolean
fromDate?: Date
toDate?: Date
```

### Command
```typescript
value?: string
onValueChange?: (value: string) => void
filter?: (value: string, search: string) => number
```

### Combobox
```typescript
options: Array<{ value: string; label: string }>
value?: string
onChange?: (option: Option) => void
placeholder?: string
```

## Usage Examples

### Tooltip
```typescript
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button>Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Calendar
```typescript
const [date, setDate] = useState<Date>();

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

### Command
```typescript
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Copy</CommandItem>
      <CommandItem>Paste</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

### Combobox
```typescript
const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
];

<Combobox
  options={options}
  onChange={(option) => console.log(option)}
/>
```

## Search Tips

- Press `/` to focus search
- Use component names: "Tooltip", "Calendar"
- Search prop names: "sideOffset", "mode"
- Find types: "TooltipProps", "CalendarProps"

## Keyboard Shortcuts

- `/` - Focus search
- `Escape` - Close search
- `Arrow Up/Down` - Navigate results
- `Enter` - Open selected result

## File Structure

```
docs/api/
├── index.html              # Main hub
├── hierarchy.html          # Component hierarchy
├── modules/                # Component docs
│   ├── tooltip.html
│   ├── calendar.html
│   └── ... (11 more)
├── interfaces/             # Type interfaces
├── functions/              # Helper functions
└── variables/              # Exports
```

## Common Tasks

### Find Component Props
1. Open component module page
2. Scroll to "Variables" section
3. Click on component name
4. View prop interface

### View Examples
1. Open component module page
2. Check "Description" section
3. Look for code examples
4. Copy import statement

### Check Return Type
1. Find component in documentation
2. View "Returns" section
3. See return type annotation

## Troubleshooting

**Docs not updating?**
```bash
rm -rf docs/api/
npm run docs:api
```

**Can't find component?**
- Use search (press `/`)
- Check modules/ directory
- Verify component in entryPoints

**TypeScript errors?**
- Check component imports
- Verify prop types match
- Use IDE autocomplete

## Resources

- [Full Documentation Guide](../API_DOCUMENTATION.md)
- [Documentation Summary](API_DOCUMENTATION_SUMMARY.md)
- [TypeDoc Docs](https://typedoc.org/)
- [Component Source](../../src/components/ui/)

---

**Components:** 13 | **Coverage:** 100% | **Size:** 972 KB
