# Components: Cards & Dialogs

Card, dialog, tab, and table patterns.

---

## Card Anatomy

```tsx
<Card className="rounded-none border-border">
  {/* Terminal-style header */}
  <div className="border-b border-border px-4 py-2 flex items-center gap-2">
    <div className="flex gap-1.5">
      <div className="size-2 rounded-full bg-destructive/50" />
      <div className="size-2 rounded-full bg-warning/50" />
      <div className="size-2 rounded-full bg-success/50" />
    </div>
    <span className="font-mono text-xs text-muted-foreground">
      [ [0x00] CARD_TITLE ]
    </span>
  </div>

  {/* Content */}
  <CardContent className="p-4">
    {/* Card content */}
  </CardContent>

  {/* Footer */}
  <CardFooter className="border-t border-border px-4 py-2">
    <Button variant="ghost" className="ml-auto">> ACTION</Button>
  </CardFooter>
</Card>
```

---

## Card Variations

```tsx
// Basic card
<Card className="p-4 rounded-none">Content</Card>

// Interactive card
<Card className="cursor-pointer hover:border-primary transition-colors rounded-none">

// Selected card
<Card className="border-primary bg-primary/5 rounded-none">

// Disabled card
<Card className="opacity-50 pointer-events-none rounded-none">
```

---

## Card Headers

### Simple

```tsx
<div className="border-b border-border px-4 py-2">
  <span className="font-mono text-xs text-muted-foreground">[TITLE]:</span>
</div>
```

### Traffic Light

```tsx
<div className="border-b border-border px-4 py-2 flex items-center gap-2">
  <div className="flex gap-1.5">
    <div className="size-2 rounded-full bg-destructive/50" />
    <div className="size-2 rounded-full bg-warning/50" />
    <div className="size-2 rounded-full bg-success/50" />
  </div>
  <span className="font-mono text-xs text-muted-foreground">filename.tsx</span>
</div>
```

---

## Dialog Pattern

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>> OPEN_DIALOG</Button>
  </DialogTrigger>
  <DialogContent className="rounded-none">
    <DialogHeader>
      <DialogTitle>[DIALOG_TITLE]</DialogTitle>
      <DialogDescription>Dialog description.</DialogDescription>
    </DialogHeader>
    <div className="py-4">{/* Content */}</div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">> CANCEL</Button>
      </DialogClose>
      <Button>> CONFIRM</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## Tabs Pattern

```tsx
<Tabs defaultValue="tab1">
  <TabsList className="rounded-none">
    <TabsTrigger
      value="tab1"
      className="rounded-none hover:text-foreground transition-colors"
    >
      Tab 1
    </TabsTrigger>
    <TabsTrigger
      value="tab2"
      className="rounded-none hover:text-foreground transition-colors"
    >
      Tab 2
    </TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// CRITICAL: Tabs must have hover:text-foreground for contrast
```

---

## Table Pattern

```tsx
<div className="border border-border rounded-none">
  <Table>
    <TableHeader>
      <TableRow className="border-border">
        <TableHead className="font-mono text-xs">[NAME]</TableHead>
        <TableHead className="font-mono text-xs">[STATUS]</TableHead>
        <TableHead className="font-mono text-xs">[ACTIONS]</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow className="border-border">
        <TableCell className="font-mono text-sm">Item Name</TableCell>
        <TableCell>
          <Badge variant="outline" className="rounded-none">Active</Badge>
        </TableCell>
        <TableCell>
          <Button size="sm" variant="ghost">> EDIT</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

---

## Badge Pattern

```tsx
// Variants
<Badge className="rounded-none font-mono text-xs">Default</Badge>
<Badge variant="secondary" className="rounded-none">Secondary</Badge>
<Badge variant="destructive" className="rounded-none">Error</Badge>
<Badge variant="outline" className="rounded-none">Outline</Badge>

// Status badge
<Badge variant="outline" className="flex items-center gap-1 rounded-none">
  <span className="size-1.5 rounded-full bg-success" />
  <span>Active</span>
</Badge>
```

---

## Checklist

- [ ] Cards use `rounded-none`
- [ ] Dialogs have close button
- [ ] Tabs have `hover:text-foreground`
- [ ] Tables use terminal-style headers
- [ ] Badges use `rounded-none`
