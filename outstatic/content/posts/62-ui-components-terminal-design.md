---
title: '62 UI Components: A Complete Terminal Design System'
status: 'published'
author:
  name: 'Fabrk Team'
slug: '62-ui-components-terminal-design'
description: 'Fabrk includes 62 pre-built UI components styled for terminal aesthetics. From buttons to data tables, everything is ready to use.'
publishedAt: '2026-01-31T10:00:00.000Z'
---

**62 components. 18 themes. Zero design debt.**

---

## The Component Problem

Building UI from scratch is slow. Inconsistent. Error-prone.

Every SaaS ends up with:
- Slightly different button styles
- Inconsistent spacing
- Accessibility gaps
- Design debt

Fabrk solves this with 62 pre-built components.

---

## Component Categories

### Form Controls (12 components)

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputSearch } from '@/components/ui/input-search';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { DatePicker } from '@/components/ui/date-picker';
import { TimePicker } from '@/components/ui/time-picker';
import { FileUpload } from '@/components/ui/file-upload';
```

### Layout (8 components)

```tsx
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { Accordion } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Resizable } from '@/components/ui/resizable';
import { Collapsible } from '@/components/ui/collapsible';
```

### Feedback (8 components)

```tsx
import { Alert } from '@/components/ui/alert';
import { Toast } from '@/components/ui/toast';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { Spinner } from '@/components/ui/spinner';
import { EmptyState } from '@/components/ui/empty-state';
```

### Navigation (6 components)

```tsx
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { ContextMenu } from '@/components/ui/context-menu';
import { Menubar } from '@/components/ui/menubar';
```

### Overlay (5 components)

```tsx
import { Dialog } from '@/components/ui/dialog';
import { Sheet } from '@/components/ui/sheet';
import { Popover } from '@/components/ui/popover';
import { HoverCard } from '@/components/ui/hover-card';
import { AlertDialog } from '@/components/ui/alert-dialog';
```

### Data Display (6 components)

```tsx
import { Table } from '@/components/ui/table';
import { Avatar } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Command } from '@/components/ui/command';
import { DataTable } from '@/components/ui/data-table';
import { Label } from '@/components/ui/label';
```

---

## Usage Pattern

All components use the `mode` object for theme-aware styling:

```tsx
import { mode } from '@/design-system';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FeatureCard() {
  return (
    <Card className={cn('border border-border', mode.radius)}>
      <CardHeader>
        <span className="font-mono text-xs text-muted-foreground">
          [ FEATURE ]
        </span>
      </CardHeader>
      <CardContent>
        <Button className={cn(mode.radius, mode.font)}>
          > LEARN MORE
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Design Tokens

Every component uses design tokens, never hardcoded colors:

```tsx
// CORRECT - uses design tokens
<Button className="bg-primary text-primary-foreground" />

// WRONG - hardcoded colors break themes
<Button className="bg-purple-500 text-white" />
```

---

## Terminal Styling

Components follow terminal conventions:

- **Labels**: UPPERCASE in brackets `[ STATUS ]`
- **Buttons**: UPPERCASE with prefix `> SUBMIT`
- **Typography**: Monospace via `mode.font`
- **Borders**: Dynamic radius via `mode.radius`

---

## Accessibility

All 62 components are:

- WCAG 2.2 AA compliant
- Keyboard navigable
- Screen reader compatible
- Focus-visible styled

Accessibility is built-in, not bolted on.

---

## Charts (8 Additional)

Beyond UI primitives, Fabrk includes 8 chart components:

```tsx
import { BarChart } from '@/components/charts/bar-chart';
import { LineChart } from '@/components/charts/line-chart';
import { AreaChart } from '@/components/charts/area-chart';
import { PieChart } from '@/components/charts/pie-chart';
import { DonutChart } from '@/components/charts/donut-chart';
import { FunnelChart } from '@/components/charts/funnel-chart';
import { Gauge } from '@/components/charts/gauge';
import { Sparkline } from '@/components/charts/sparkline';
```

All charts follow the same theming system.

---

## Rule #1

**Never build UI from scratch.**

Before creating any element, check `src/components/ui/` first. The component you need probably exists.

```bash
# List all available components
ls src/components/ui/
ls src/components/charts/
```

---

## Customization

Need to modify a component? Extend, don't replace:

```tsx
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn('bg-primary text-primary-foreground', className)}
      {...props}
    />
  );
}
```

The base components remain untouched.

---

## Getting Started

1. Browse available components in `src/components/ui/`
2. Import what you need
3. Apply `mode.radius` and `mode.font` for terminal styling
4. Use design tokens for colors

62 components. Zero decisions. Ship faster.

