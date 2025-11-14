/**
 * ✅ FABRK COMPONENT
 * Modal Stories - Accessible modal dialogs with multiple variants
 *
 * @see Modal component documentation
 */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { AlertTriangle, Info, Trash2 } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "UI/Overlays/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    position: {
      control: "select",
      options: ["center", "top", "bottom"],
    },
    variant: {
      control: "select",
      options: ["modal", "drawer", "sheet"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Default modal
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <p>This is a basic modal dialog. Click outside or press Escape to close.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Confirmation modal
 */
export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete Item</Button>
        <Modal open={open} onOpenChange={setOpen} size="sm">
          <ModalHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" />
              Confirm Deletion
            </div>
          </ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("Item deleted");
                setOpen(false);
              }}
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Form modal
 */
export const Form: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Add User</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalHeader>Add New User</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="Developer" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Add User</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<"sm" | "md" | "lg" | "xl" | null>(null);

    return (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setSize("sm")}>
          Small
        </Button>
        <Button size="sm" onClick={() => setSize("md")}>
          Medium
        </Button>
        <Button size="sm" onClick={() => setSize("lg")}>
          Large
        </Button>
        <Button size="sm" onClick={() => setSize("xl")}>
          Extra Large
        </Button>

        {size && (
          <Modal open={!!size} onOpenChange={() => setSize(null)} size={size}>
            <ModalHeader>{size.toUpperCase()} Modal</ModalHeader>
            <ModalBody>
              <p>This is a {size} modal. Resize to see how it adapts.</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setSize(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  },
};

/**
 * Position variants
 */
export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<"center" | "top" | "bottom" | null>(null);

    return (
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setPosition("top")}>
          Top
        </Button>
        <Button size="sm" onClick={() => setPosition("center")}>
          Center
        </Button>
        <Button size="sm" onClick={() => setPosition("bottom")}>
          Bottom
        </Button>

        {position && (
          <Modal
            open={!!position}
            onOpenChange={() => setPosition(null)}
            position={position}
          >
            <ModalHeader>
              {position.charAt(0).toUpperCase() + position.slice(1)} Position
            </ModalHeader>
            <ModalBody>
              <p>This modal is positioned at the {position}.</p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setPosition(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        )}
      </div>
    );
  },
};

/**
 * Information modal
 */
export const Information: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Info className="mr-2 size-4" />
          Show Info
        </Button>
        <Modal open={open} onOpenChange={setOpen} size="md">
          <ModalHeader>
            <div className="flex items-center gap-2">
              <Info className="size-5 text-blue-500" />
              Information
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-2">
              <p>This is an informational modal dialog.</p>
              <p className="text-sm text-muted-foreground">
                Modal dialogs interrupt the user's workflow and require interaction before continuing.
                Use them sparingly for important information or actions.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Got it</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Scrollable content
 */
export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Long Content</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalHeader>Terms and Conditions</ModalHeader>
          <ModalBody>
            <div className="space-y-4 text-sm">
              {Array.from({ length: 20 }).map((_, i) => (
                <p key={i}>
                  Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * No close on backdrop
 */
export const NoCloseOnBackdrop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (No Backdrop Close)</Button>
        <Modal open={open} onOpenChange={setOpen} closeOnBackdrop={false} size="sm">
          <ModalHeader>Important Action Required</ModalHeader>
          <ModalBody>
            <p>This modal cannot be closed by clicking outside. You must choose an action.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

/**
 * Without footer
 */
export const NoFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Simple Modal</Button>
        <Modal open={open} onOpenChange={setOpen} size="sm">
          <ModalHeader>Quick Message</ModalHeader>
          <ModalBody>
            <p>This modal has no footer. Close it by clicking outside or pressing Escape.</p>
          </ModalBody>
        </Modal>
      </>
    );
  },
};

/**
 * Custom styling
 */
export const CustomStyling: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Custom Style</Button>
        <Modal open={open} onOpenChange={setOpen} size="md">
          <ModalHeader className="border-b-2 border-primary">
            Custom Styled Modal
          </ModalHeader>
          <ModalBody className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <p>This modal demonstrates custom styling on header and body.</p>
          </ModalBody>
          <ModalFooter className="border-t-2 border-primary">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
