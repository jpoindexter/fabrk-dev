"use client";

/**
 * Component Showcase Page
 * Single page displaying ALL UI components for visual consistency review
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { mode, formatLabel, formatButtonText } from "@/lib/design-system";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { WindowControls, WindowHeader } from "@/components/ui/window-controls";
import { CodeBlock } from "@/components/ui/code-block";
import { Calendar } from "@/components/ui/calendar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  Mail,
  Settings,
  User,
  Bell,
  ChevronDown,
  Search,
  Plus,
  Trash2,
  Edit,
  MoreHorizontal,
  Home,
  FileText
} from "lucide-react";

function Section({ title, code, children }: { title: string; code: string; children: React.ReactNode }) {
  return (
    <section className="border-border bg-card mb-8 border">
      <div className="border-border flex items-center gap-2 border-b px-4 py-2">
        <WindowControls size="sm" />
        <span className={cn("text-muted-foreground text-xs", mode.font)}>
          [ [{code}] {title.toUpperCase().replace(/ /g, "_")} ]
        </span>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export default function ComponentShowcasePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <TooltipProvider>
      <div className={cn("min-h-screen bg-background p-8", mode.font)}>
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <header className="mb-12 text-center">
            <div className={cn("border-border bg-card mb-4 inline-block border px-4 py-1", mode.radius)}>
              <span className="text-muted-foreground text-xs">[ [0x00] COMPONENT_SHOWCASE ]</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold">ALL_COMPONENTS</h1>
            <p className="text-muted-foreground text-sm">
              &gt; Visual consistency review - all components on one page
            </p>
          </header>

          {/* ==================== BUTTONS ==================== */}
          <Section title="Buttons" code="0x01">
            <div className="space-y-6">
              <div>
                <h3 className="text-muted-foreground mb-3 text-xs">[VARIANTS]:</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">&gt; DEFAULT</Button>
                  <Button variant="secondary">&gt; SECONDARY</Button>
                  <Button variant="outline">&gt; OUTLINE</Button>
                  <Button variant="ghost">&gt; GHOST</Button>
                  <Button variant="link">&gt; LINK</Button>
                  <Button variant="destructive">&gt; DESTRUCTIVE</Button>
                </div>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-3 text-xs">[SIZES]:</h3>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">&gt; SMALL</Button>
                  <Button size="default">&gt; DEFAULT</Button>
                  <Button size="lg">&gt; LARGE</Button>
                  <Button size="xl">&gt; EXTRA_LARGE</Button>
                  <Button size="icon" aria-label="Settings"><Settings className="h-4 w-4" /></Button>
                </div>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-3 text-xs">[STATES]:</h3>
                <div className="flex flex-wrap gap-3">
                  <Button loading>&gt; LOADING</Button>
                  <Button disabled>&gt; DISABLED</Button>
                  <Button><Mail className="mr-2 h-4 w-4" /> &gt; WITH_ICON</Button>
                </div>
              </div>
            </div>
          </Section>

          {/* ==================== INPUTS ==================== */}
          <Section title="Form Inputs" code="0x02">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="text-input">{formatLabel("Text Input")}</Label>
                  <Input id="text-input" placeholder="Enter text..." />
                </div>
                <div>
                  <Label htmlFor="email-input">{formatLabel("Email")}</Label>
                  <Input id="email-input" type="email" placeholder="name@example.com" />
                </div>
                <div>
                  <Label htmlFor="password-input">{formatLabel("Password")}</Label>
                  <Input id="password-input" type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label htmlFor="disabled-input">{formatLabel("Disabled")}</Label>
                  <Input id="disabled-input" placeholder="Disabled input" disabled />
                </div>
                <div>
                  <Label htmlFor="search-input">{formatLabel("Search")}</Label>
                  <div className="relative">
                    <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <Input id="search-input" className="pl-10" placeholder="Search..." />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="textarea">{formatLabel("Textarea")}</Label>
                  <Textarea id="textarea" placeholder="Type your message..." rows={4} />
                </div>
                <div>
                  <Label htmlFor="select">{formatLabel("Select")}</Label>
                  <Select>
                    <SelectTrigger id="select">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{formatLabel("Slider")}</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <span className="text-muted-foreground text-xs">Value: {sliderValue[0]}</span>
                </div>
              </div>
            </div>
          </Section>

          {/* ==================== CHECKBOXES & RADIO & SWITCH ==================== */}
          <Section title="Selection Controls" code="0x03">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4">
                <h3 className="text-muted-foreground mb-3 text-xs">[CHECKBOX]:</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox1" aria-label="Accept terms" />
                  <Label htmlFor="checkbox1">{formatLabel("Accept terms")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox2" defaultChecked aria-label="Subscribe" />
                  <Label htmlFor="checkbox2">{formatLabel("Subscribe")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox3" disabled aria-label="Disabled" />
                  <Label htmlFor="checkbox3">{formatLabel("Disabled")}</Label>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-muted-foreground mb-3 text-xs">[RADIO]:</h3>
                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="r1" />
                    <Label htmlFor="r1">{formatLabel("Option 1")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="r2" />
                    <Label htmlFor="r2">{formatLabel("Option 2")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="r3" />
                    <Label htmlFor="r3">{formatLabel("Option 3")}</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <h3 className="text-muted-foreground mb-3 text-xs">[SWITCH]:</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="switch1" aria-label="Notifications" />
                  <Label htmlFor="switch1">{formatLabel("Notifications")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch2" defaultChecked aria-label="Dark mode" />
                  <Label htmlFor="switch2">{formatLabel("Dark mode")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="switch3" disabled aria-label="Disabled" />
                  <Label htmlFor="switch3">{formatLabel("Disabled")}</Label>
                </div>
              </div>
            </div>
          </Section>

          {/* ==================== BADGES ==================== */}
          <Section title="Badges" code="0x04">
            <div className="flex flex-wrap gap-3">
              <Badge>DEFAULT</Badge>
              <Badge variant="secondary">SECONDARY</Badge>
              <Badge variant="outline">OUTLINE</Badge>
              <Badge variant="destructive">DESTRUCTIVE</Badge>
              <Badge className="bg-success text-success-foreground">SUCCESS</Badge>
              <Badge className="bg-warning text-warning-foreground">WARNING</Badge>
            </div>
          </Section>

          {/* ==================== ALERTS ==================== */}
          <Section title="Alerts" code="0x05">
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>DEFAULT_ALERT</AlertTitle>
                <AlertDescription>This is a default informational alert message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>ERROR_ALERT</AlertTitle>
                <AlertDescription>This is a destructive error alert message.</AlertDescription>
              </Alert>
            </div>
          </Section>

          {/* ==================== CARDS ==================== */}
          <Section title="Cards" code="0x06">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>CARD_TITLE</CardTitle>
                  <CardDescription>Card description text goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Card content with some example text.</p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline">&gt; CANCEL</Button>
                  <Button>&gt; CONFIRM</Button>
                </CardFooter>
              </Card>
              <Card>
                <WindowHeader filename="example.tsx" />
                <CardContent className="p-4">
                  <p className="text-sm">Card with window header for terminal style.</p>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* ==================== TABS ==================== */}
          <Section title="Tabs" code="0x07">
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">&gt; TAB_1</TabsTrigger>
                <TabsTrigger value="tab2">&gt; TAB_2</TabsTrigger>
                <TabsTrigger value="tab3">&gt; TAB_3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="border-border mt-4 border p-4">
                <p className="text-sm">Content for Tab 1</p>
              </TabsContent>
              <TabsContent value="tab2" className="border-border mt-4 border p-4">
                <p className="text-sm">Content for Tab 2</p>
              </TabsContent>
              <TabsContent value="tab3" className="border-border mt-4 border p-4">
                <p className="text-sm">Content for Tab 3</p>
              </TabsContent>
            </Tabs>
          </Section>

          {/* ==================== ACCORDION ==================== */}
          <Section title="Accordion" code="0x08">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>ACCORDION_ITEM_1</AccordionTrigger>
                <AccordionContent>
                  Content for the first accordion item.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>ACCORDION_ITEM_2</AccordionTrigger>
                <AccordionContent>
                  Content for the second accordion item.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>ACCORDION_ITEM_3</AccordionTrigger>
                <AccordionContent>
                  Content for the third accordion item.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Section>

          {/* ==================== DIALOGS ==================== */}
          <Section title="Dialogs & Modals" code="0x09">
            <div className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">&gt; OPEN_DIALOG</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>DIALOG_TITLE</DialogTitle>
                    <DialogDescription>Dialog description text goes here.</DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm">Dialog content</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">&gt; CANCEL</Button>
                    <Button>&gt; CONFIRM</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">&gt; OPEN_SHEET</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>SHEET_TITLE</SheetTitle>
                    <SheetDescription>Sheet description text goes here.</SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <p className="text-sm">Sheet content</p>
                  </div>
                  <SheetFooter>
                    <Button>&gt; SAVE_CHANGES</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">&gt; ALERT_DIALOG</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ARE_YOU_SURE?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>&gt; CANCEL</AlertDialogCancel>
                    <AlertDialogAction>&gt; CONTINUE</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Section>

          {/* ==================== POPOVERS & TOOLTIPS ==================== */}
          <Section title="Popovers & Tooltips" code="0x0A">
            <div className="flex flex-wrap gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">&gt; POPOVER</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">POPOVER_TITLE</h4>
                    <p className="text-muted-foreground text-sm">Popover content goes here.</p>
                  </div>
                </PopoverContent>
              </Popover>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">&gt; HOVER_ME</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip content</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    &gt; DROPDOWN <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Section>

          {/* ==================== PROGRESS ==================== */}
          <Section title="Progress & Loading" code="0x0B">
            <div className="space-y-6">
              <div>
                <h3 className="text-muted-foreground mb-3 text-xs">[PROGRESS_BAR]:</h3>
                <Progress value={33} className="w-full" />
                <span className="text-muted-foreground mt-1 block text-xs">33%</span>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-3 text-xs">[SKELETON]:</h3>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* ==================== TABLE ==================== */}
          <Section title="Table" code="0x0C">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NAME</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ROLE</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell><Badge className="bg-success text-success-foreground">ACTIVE</Badge></TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label="Edit"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell><Badge className="bg-warning text-warning-foreground">PENDING</Badge></TableCell>
                  <TableCell>User</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label="Edit"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Wilson</TableCell>
                  <TableCell><Badge variant="destructive">INACTIVE</Badge></TableCell>
                  <TableCell>User</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label="Edit"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" aria-label="More"><MoreHorizontal className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Section>

          {/* ==================== AVATARS ==================== */}
          <Section title="Avatars" code="0x0D">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
          </Section>

          {/* ==================== NAVIGATION ==================== */}
          <Section title="Navigation" code="0x0E">
            <div className="space-y-6">
              <div>
                <h3 className="text-muted-foreground mb-3 text-xs">[BREADCRUMB]:</h3>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div>
                <h3 className="text-muted-foreground mb-3 text-xs">[PAGINATION]:</h3>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </Section>

          {/* ==================== CALENDAR ==================== */}
          <Section title="Calendar" code="0x0F">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border-border border"
            />
          </Section>

          {/* ==================== CODE BLOCK ==================== */}
          <Section title="Code Block" code="0x10">
            <CodeBlock
              code={`function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");`}
              language="typescript"
            />
          </Section>

          {/* ==================== SEPARATORS ==================== */}
          <Section title="Separators" code="0x11">
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center gap-4">
                <span className="text-sm">Item 1</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm">Item 2</span>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm">Item 3</span>
              </div>
            </div>
          </Section>

          {/* ==================== WINDOW CONTROLS ==================== */}
          <Section title="Window Controls" code="0x12">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="text-muted-foreground mb-2 text-xs">[XS]:</h4>
                  <WindowControls size="xs" />
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-2 text-xs">[SM]:</h4>
                  <WindowControls size="sm" />
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-2 text-xs">[MD]:</h4>
                  <WindowControls size="md" />
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-2 text-xs">[LG]:</h4>
                  <WindowControls size="lg" />
                </div>
                <div>
                  <h4 className="text-muted-foreground mb-2 text-xs">[ANIMATED]:</h4>
                  <WindowControls size="sm" animated />
                </div>
              </div>
            </div>
          </Section>

          {/* Footer */}
          <footer className="border-border mt-12 border-t pt-8 text-center">
            <p className="text-muted-foreground text-xs">
              [ [0xFF] END_OF_COMPONENTS ] Total: 50+ components
            </p>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
}
