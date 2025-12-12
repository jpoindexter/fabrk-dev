# Fabrk Boilerplate - API Documentation

Complete TypeScript API documentation for all 13 new UI components added to the Fabrk Boilerplate.

## Overview

This documentation covers the following components:

### Navigation & Structure (4 components)
- **Tooltip** - Contextual help text on hover
- **Breadcrumb** - Navigation hierarchy display
- **Navigation Menu** - Complex navigation patterns
- **Menubar** - Application menu system

### Layout & Content (4 components)
- **Aspect Ratio** - Maintains aspect ratios for media
- **Scroll Area** - Custom scrollbars and scroll containers
- **Collapsible** - Expandable/collapsible content sections
- **Skeleton** - Loading state placeholders

### Interactive Components (3 components)
- **Hover Card** - Rich hover preview cards
- **Context Menu** - Right-click menus
- **Command** - Command palette/search interface

### Form & Data (2 components)
- **Calendar** - Date picker with full customization
- **Combobox** - Searchable select component

## Documentation Structure

### HTML Documentation
The complete HTML documentation is available in the `docs/api/` directory:

- **index.html** - Main documentation hub with search
- **modules/** - Individual component documentation
- **interfaces/** - TypeScript interface definitions
- **types/** - Type alias documentation
- **functions/** - Helper function documentation
- **variables/** - Exported constants and variables

### Viewing the Documentation

**Option 1: Local Server**
```bash
npm run docs:serve
# Opens at http://localhost:3000
```

**Option 2: Direct File Access**
```bash
open docs/api/index.html
```

**Option 3: VS Code Live Server**
- Install "Live Server" extension
- Right-click `docs/api/index.html`
- Select "Open with Live Server"

## Component Documentation Index

### Tooltip
- **Module:** [tooltip.html](modules/tooltip.html)
- **Exports:** `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider`
- **Props:** `TooltipProps`, `TooltipContentProps`, `TooltipTriggerProps`

### Breadcrumb
- **Module:** [breadcrumb.html](modules/breadcrumb.html)
- **Exports:** `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`
- **Props:** Multiple component-specific prop interfaces

### Navigation Menu
- **Module:** [navigation-menu.html](modules/navigation-menu.html)
- **Exports:** `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`
- **Props:** Component-specific prop interfaces with variants

### Menubar
- **Module:** [menubar.html](modules/menubar.html)
- **Exports:** `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarLabel`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarPortal`, `MenubarSubContent`, `MenubarSubTrigger`, `MenubarGroup`, `MenubarSub`, `MenubarShortcut`
- **Props:** Extensive prop interfaces for all menu components

### Aspect Ratio
- **Module:** [aspect-ratio.html](modules/aspect-ratio.html)
- **Exports:** `AspectRatio`
- **Props:** `AspectRatioProps`

### Scroll Area
- **Module:** [scroll-area.html](modules/scroll-area.html)
- **Exports:** `ScrollArea`, `ScrollBar`
- **Props:** `ScrollAreaProps`, `ScrollBarProps`

### Collapsible
- **Module:** [collapsible.html](modules/collapsible.html)
- **Exports:** `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`
- **Props:** `CollapsibleProps`, `CollapsibleTriggerProps`, `CollapsibleContentProps`

### Skeleton
- **Module:** [skeleton.html](modules/skeleton.html)
- **Exports:** `Skeleton`
- **Props:** `SkeletonProps` (extends HTMLAttributes<HTMLDivElement>)

### Hover Card
- **Module:** [hover-card.html](modules/hover-card.html)
- **Exports:** `HoverCard`, `HoverCardTrigger`, `HoverCardContent`
- **Props:** `HoverCardProps`, `HoverCardTriggerProps`, `HoverCardContentProps`

### Context Menu
- **Module:** [context-menu.html](modules/context-menu.html)
- **Exports:** `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuRadioGroup`
- **Props:** Comprehensive prop interfaces for all menu items

### Command
- **Module:** [command.html](modules/command.html)
- **Exports:** `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`
- **Props:** `CommandProps`, `CommandDialogProps`, `CommandInputProps`, `CommandListProps`, `CommandEmptyProps`, `CommandGroupProps`, `CommandItemProps`

### Calendar
- **Module:** [calendar.html](modules/calendar.html)
- **Exports:** `Calendar`
- **Props:** `CalendarProps` (extends DayPickerProps)

### Combobox
- **Module:** [combobox.html](modules/combobox.html)
- **Exports:** `Combobox`
- **Props:** `ComboboxProps` with value, onChange, options, placeholder

## TypeScript Integration

All components are fully typed with TypeScript. The documentation includes:

1. **Component Props** - Complete prop interface definitions
2. **Type Exports** - All exported types and interfaces
3. **Generic Types** - Type parameters and constraints
4. **Return Types** - Component return type annotations
5. **React Types** - React.FC, ReactNode, HTMLAttributes, etc.

### Usage Example

```typescript
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// TypeScript will provide full autocomplete and type checking
function MyComponent() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Documentation Features

### Search Functionality
- Full-text search across all components
- Search by component name, prop name, or type
- Keyboard shortcuts: Press `/` to focus search

### Navigation
- Sidebar navigation with component categories
- Breadcrumb navigation
- Hierarchical view of components
- Index of all exports

### Code Examples
- Inline code samples
- TypeScript type definitions
- Import statements
- Props usage examples

### Source Links
- Direct links to source files on GitHub
- Line number references
- Quick navigation to implementation

## Generating Documentation

### Full Regeneration
```bash
npm run docs:api
```

This command:
1. Scans all 13 component files
2. Extracts TypeScript interfaces and types
3. Generates HTML documentation
4. Creates searchable index
5. Outputs to `docs/api/`

### Configuration
Documentation is configured in `typedoc.json`:
- Entry points: All 13 component files
- Excludes: Test files, stories, node_modules
- Output: HTML format with navigation
- Theme: Default TypeDoc theme
- Plugins: None required for basic HTML output

## Coverage Statistics

### Components Documented: 13/13 (100%)
1. Tooltip ✓
2. Command ✓
3. Hover Card ✓
4. Context Menu ✓
5. Skeleton ✓
6. Collapsible ✓
7. Aspect Ratio ✓
8. Scroll Area ✓
9. Menubar ✓
10. Calendar ✓
11. Combobox ✓
12. Breadcrumb ✓
13. Navigation Menu ✓

### Documentation Completeness
- **Interfaces:** 50+ documented
- **Type Aliases:** 20+ documented
- **Components:** 80+ exported components
- **Props:** Complete prop interfaces for all components
- **Source Coverage:** 100% of component source files

## Maintenance

### Updating Documentation
When component interfaces change:

```bash
# 1. Make changes to component files
# 2. Regenerate documentation
npm run docs:api

# 3. Verify changes
npm run docs:serve
```

### Adding New Components
To document additional components:

1. Add component path to `typedoc.json` entryPoints
2. Run `npm run docs:api`
3. Documentation automatically updates

### Customization
Modify `typedoc.json` to customize:
- Theme and styling
- Navigation structure
- Excluded files
- Output format
- Plugin integration

## Best Practices

### Component Documentation
1. **Always include JSDoc comments** for props
2. **Document complex types** with explanatory comments
3. **Provide usage examples** in component files
4. **Export prop interfaces** for external use
5. **Use descriptive prop names** for clarity

### Type Safety
1. **Use explicit return types** for components
2. **Define prop interfaces** rather than inline types
3. **Export reusable types** for composition
4. **Avoid any types** unless absolutely necessary
5. **Use generics** for flexible component APIs

## Support

### Troubleshooting
- **Documentation not updating?** Run `npm run docs:api` to regenerate
- **Missing components?** Check `typedoc.json` entryPoints
- **TypeScript errors?** Ensure `skipErrorChecking: true` in config
- **Styling issues?** Clear browser cache and reload

### Resources
- [TypeDoc Documentation](https://typedoc.org/)
- [Component Source Files](../../src/components/ui/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Radix UI Documentation](https://www.radix-ui.com/)

## License

This documentation is part of the Fabrk Boilerplate project and follows the same license terms.

---

**Last Updated:** 2025-11-13
**TypeDoc Version:** 0.28.14
**Components:** 13
**Coverage:** 100%
