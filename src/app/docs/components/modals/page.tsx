import { FeatureGuideTemplate } from "@/components/docs";
import { DocsSection, DocsCard } from "@/components/docs";
import { docsTypography } from "@/components/docs";
import { Square, PanelRight, MessageSquare, Command } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Modal Components - Fabrk Docs",
  description: "Dialogs, sheets, popovers, and alerts. Accessible modals with focus management and keyboard navigation.",
};

export default function ModalsComponentsPage() {
  return (
    <FeatureGuideTemplate
      code="[0x60]"
      category="Components"
      title="Modal_Components"
      description="Modal components for dialogs, sheets, popovers, and alerts."
      overview="7 overlay components including dialogs, alert dialogs, sheets, popovers, command palette, context menus, and toast notifications. All with focus management and keyboard navigation."
      features={[
        { icon: Square, title: "Dialog", description: "Modal dialogs for forms." },
        { icon: PanelRight, title: "Sheet", description: "Slide-out side panels." },
        { icon: MessageSquare, title: "Popover", description: "Floating triggered content." },
        { icon: Command, title: "Command", description: "Searchable command palette." },
      ]}
      usage={[
        {
          title: "Dialog",
          description: "Modal dialog for forms and confirmations",
          code: `import {
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
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" defaultValue="John Doe" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`,
          language: "tsx",
        },
        {
          title: "Alert Dialog",
          description: "Confirmation dialog for destructive actions",
          code: `import {
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
          <AlertDialogAction className="bg-destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`,
          language: "tsx",
        },
        {
          title: "Sheet (Slide-Out Panel)",
          description: "Side panel that slides in from edge",
          code: `import {
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
          <SheetDescription>Configure your preferences here.</SheetDescription>
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
</SheetContent>`,
          language: "tsx",
        },
        {
          title: "Command Palette",
          description: "Searchable command menu (Cmd+K)",
          code: `import {
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
}`,
          language: "tsx",
        },
        {
          title: "Toast Notifications",
          description: "Toast messages with useToast hook",
          code: `import { useToast } from "@/components/ui/use-toast";
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

// Don't forget to add Toaster to your layout
import { Toaster } from "@/components/ui/toaster";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}`,
          language: "tsx",
        },
      ]}
      previous={{ title: "Charts", href: "/docs/components/charts" }}
      next={{ title: "Uploads", href: "/docs/components/uploads" }}
    >
      {/* Available Components */}
      <DocsSection title="Available Components">
        <DocsCard>
          <div className="space-y-1 font-mono text-sm text-muted-foreground leading-relaxed">
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Dialog</code> - Modal dialog for forms and confirmations</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">AlertDialog</code> - Confirmation dialog for destructive actions</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Sheet</code> - Slide-out panel from edge of screen</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Popover</code> - Floating content triggered by button</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">Command</code> - Command palette for search and actions</div>
            <div>├─ <code className="bg-muted px-1 font-mono text-xs">ContextMenu</code> - Right-click context menu</div>
            <div>└─ <code className="bg-muted px-1 font-mono text-xs">Toast</code> - Notification toasts</div>
          </div>
        </DocsCard>
      </DocsSection>

      {/* Next Steps */}
      <DocsSection title="Next Steps">
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/docs/components/uploads">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Uploads</h3>
                <p className={docsTypography.body}>File and image upload components</p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/docs/components/navigation">
            <Card className="h-full transition-all hover:border-primary/50">
              <CardContent className="p-6">
                <h3 className={`uppercase ${docsTypography.h4} mb-2`}>Navigation</h3>
                <p className={docsTypography.body}>Menus, tabs, breadcrumbs</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </DocsSection>
    </FeatureGuideTemplate>
  );
}
