import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export default function ModalsComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modals & Dialogs</h1>
        <p className="mt-2 text-muted-foreground">
          Modal components for dialogs, sheets, popovers, and alerts.
        </p>
      </div>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Available Components</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Dialog</code> - Modal dialog for forms and confirmations</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">AlertDialog</code> - Confirmation dialog for destructive actions</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Sheet</code> - Slide-out panel from edge of screen</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Popover</code> - Floating content triggered by button</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Command</code> - Command palette for search and actions</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">ContextMenu</code> - Right-click context menu</li>
            <li><code className="text-sm bg-muted px-1 py-0.5 rounded">Toast</code> - Notification toasts</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Import Examples</h2>
          <CodeBlock language="typescript" code={`// Dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Alert Dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Sheet (slide-out panel)
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Popover
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Command palette
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Context menu
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// Toast
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";`} />
        </CardContent>
      </Card>

      <Card className="bg-zinc-950">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>

          <h3 className="text-lg font-medium mt-6 mb-3">Dialog</h3>
          <CodeBlock language="tsx" code={`import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EditProfileDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="John Doe" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@johndoe" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Alert Dialog (Confirmation)</h3>
          <CodeBlock language="tsx" code={`import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function DeleteConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
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
          <AlertDialogAction className="bg-destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Sheet (Slide-out Panel)</h3>
          <CodeBlock language="tsx" code={`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Configure your preferences here.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {/* Settings content */}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Sheet sides: "top" | "right" | "bottom" | "left"
<SheetContent side="left">
  {/* Content slides in from left */}
</SheetContent>`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Popover</h3>
          <CodeBlock language="tsx" code={`import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Notifications</h4>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              You have 3 unread messages
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Command Palette</h3>
          <CodeBlock language="tsx" code={`import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}`} />

          <h3 className="text-lg font-medium mt-6 mb-3">Toast Notifications</h3>
          <CodeBlock language="tsx" code={`import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export function ToastExample() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Success!",
          description: "Your changes have been saved.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}

// Toast variants
toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive",
});

// With action
toast({
  title: "Event created",
  description: "Your event has been scheduled.",
  action: (
    <ToastAction altText="Undo">Undo</ToastAction>
  ),
});

// Don't forget to add Toaster to your layout
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}`} />
        </CardContent>
      </Card>
    </div>
  );
}
