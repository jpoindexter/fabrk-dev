"use client";

import { ComponentShowcaseTemplate } from "@/components/docs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ToastPage() {
  const { toast } = useToast();

  return (
    <ComponentShowcaseTemplate
      code="[UI.37]"
      category="Feedback"
      title="Toast"
      description="A succinct message that is displayed temporarily at the top of the screen."
      importCode={`import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"`}
      mainPreview={{
        preview: (
          <Button
            onClick={() => {
              toast({
                title: "Notification",
                description: "This is a toast notification.",
              });
            }}
          >
            Show Toast
          </Button>
        ),
        code: `const { toast } = useToast();

<Button
  onClick={() => {
    toast({
      title: "Notification",
      description: "This is a toast notification.",
    });
  }}
>
  Show Toast
</Button>`,
      }}
      variants={[
        {
          title: "Simple Toast",
          description: "Basic toast with just a description.",
          preview: (
            <Button
              onClick={() => {
                toast({
                  description: "Your message has been sent.",
                });
              }}
            >
              Simple Message
            </Button>
          ),
          code: `toast({
  description: "Your message has been sent.",
});`,
        },
        {
          title: "With Title",
          description: "Toast with both title and description.",
          preview: (
            <Button
              onClick={() => {
                toast({
                  title: "Success",
                  description: "Your changes have been saved.",
                });
              }}
            >
              Success Message
            </Button>
          ),
          code: `toast({
  title: "Success",
  description: "Your changes have been saved.",
});`,
        },
        {
          title: "Success Toast",
          description: "Success notification toast.",
          preview: (
            <Button
              onClick={() => {
                const { success } = useToast();
                success("Success", "Your changes have been saved.");
              }}
            >
              Success
            </Button>
          ),
          code: `const { success } = useToast();
success("Success", "Your changes have been saved.");`,
        },
        {
          title: "Error Toast",
          description: "Toast for error messages.",
          preview: (
            <Button
              variant="destructive"
              onClick={() => {
                const { error } = useToast();
                error("Error", "Something went wrong. Please try again.");
              }}
            >
              Show Error
            </Button>
          ),
          code: `const { error } = useToast();
error("Error", "Something went wrong. Please try again.");`,
        },
        {
          title: "With Action",
          description: "Toast with an action button.",
          preview: (
            <Button
              onClick={() => {
                toast({
                  title: "Undo Available",
                  description: "File moved to trash.",
                  action: {
                    label: "Undo",
                    onClick: () => console.log("Undo clicked"),
                  },
                });
              }}
            >
              With Action
            </Button>
          ),
          code: `toast({
  title: "Undo Available",
  description: "File moved to trash.",
  action: {
    label: "Undo",
    onClick: () => console.log("Undo clicked"),
  },
});`,
        },
        {
          title: "Info & Warning",
          description: "Info and warning toast variants.",
          preview: (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  const { info } = useToast();
                  info("Info", "This is informational.");
                }}
              >
                Info
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  const { warning } = useToast();
                  warning("Warning", "Please be careful.");
                }}
              >
                Warning
              </Button>
            </div>
          ),
          code: `const { info, warning } = useToast();

// Info toast
info("Info", "This is informational.");

// Warning toast
warning("Warning", "Please be careful.");`,
        },
      ]}
      props={[
        {
          name: "title",
          type: "string",
          description: "The title of the toast (optional).",
        },
        {
          name: "description",
          type: "string",
          description: "The description text for the toast.",
        },
        {
          name: "action",
          type: "{ label: string; onClick: () => void }",
          description: "Optional action button configuration.",
        },
        {
          name: "success",
          type: "(title: string, description?: string) => void",
          description: "Show a success toast notification.",
        },
        {
          name: "error",
          type: "(title: string, description?: string) => void",
          description: "Show an error toast notification.",
        },
        {
          name: "info",
          type: "(title: string, description?: string) => void",
          description: "Show an info toast notification.",
        },
        {
          name: "warning",
          type: "(title: string, description?: string) => void",
          description: "Show a warning toast notification.",
        },
        {
          name: "dismiss",
          type: "(toastId?: string | number) => void",
          description: "Dismiss a specific toast or all toasts if no ID provided.",
        },
      ]}
      usageExamples={[
        {
          title: "Setup",
          description: "The toast system uses Sonner and is pre-configured in your layout.",
          code: `import { Toaster } from "sonner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`,
        },
        {
          title: "Basic Usage",
          description: "Use the toast hook in your components.",
          code: `import { useToast } from "@/hooks/use-toast";

export function MyComponent() {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: "Notification",
          description: "Your action was successful.",
        });
      }}
    >
      Show Notification
    </Button>
  );
}`,
        },
        {
          title: "Error Handling",
          description: "Show error toasts in try-catch blocks.",
          code: `const { toast } = useToast();

async function handleSubmit() {
  try {
    await saveData();
    toast({
      title: "Success",
      description: "Data saved successfully.",
    });
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to save data.",
    });
  }
}`,
        },
      ]}
      accessibility={[
        "Toasts are announced to screen readers",
        "Automatically dismissed after duration expires",
        "Can be manually dismissed with close button",
        "Keyboard accessible close button",
        "Proper ARIA roles and attributes",
        "Focus management for action buttons",
      ]}
      previous={{ title: "Command", href: "/docs/components/command" }}
      next={{ title: "Cropper", href: "/docs/components/cropper" }}
    />
  );
}
