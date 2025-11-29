import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";

export const metadata = {
  title: "Modal Components - Fabrk Docs",
  description: "Dialogs, sheets, popovers, and alerts. Accessible modals with focus management and keyboard navigation.",
};

export default function ModalsComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-4 inline-block border border-border bg-card px-3 py-1">
          <span className="font-mono text-xs text-muted-foreground">[ [0x60] COMPONENTS ] MODALS</span>
        </div>
        <h1 className="font-mono text-2xl font-bold tracking-tight lg:text-3xl">MODAL_COMPONENTS</h1>
        <p className="font-mono text-sm text-muted-foreground mt-2">
          &gt; Modal components for dialogs, sheets, popovers, and alerts.
        </p>
      </div>

      <Card className="rounded-none">
        <CardContent className="p-6">
          <h2 className="font-mono text-lg font-bold mb-4">AVAILABLE_COMPONENTS</h2>
          <ul className="font-mono text-sm text-muted-foreground space-y-1">
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Dialog</code> - Modal dialog for forms and confirmations</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">AlertDialog</code> - Confirmation dialog for destructive actions</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Sheet</code> - Slide-out panel from edge of screen</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Popover</code> - Floating content triggered by button</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Command</code> - Command palette for search and actions</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">ContextMenu</code> - Right-click context menu</li>
            <li><code className="font-mono text-sm bg-muted px-1 py-0.5">Toast</code> - Notification toasts</li>
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="font-mono text-lg font-bold">IMPORT_EXAMPLES</h2>
        </div>
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
      </div>

      <div className="space-y-8">
        <h2 className="font-mono text-lg font-bold">USAGE_EXAMPLES</h2>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">DIALOG</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">ALERT_DIALOG_CONFIRMATION</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">SHEET_SLIDE_OUT_PANEL</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">POPOVER</h3>
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
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              You have 3 unread messages
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}`} />
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">COMMAND_PALETTE</h3>
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
        </div>

        <div className="space-y-4">
          <h3 className="font-mono text-base font-semibold">TOAST_NOTIFICATIONS</h3>
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
        </div>
      </div>
    </div>
  );
}
