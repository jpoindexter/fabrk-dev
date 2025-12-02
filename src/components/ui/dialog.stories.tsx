import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"> OPEN_DIALOG"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-mono">[ DIALOG_TITLE ]</DialogTitle>
          <DialogDescription>
            This is a dialog description with terminal-style typography.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground font-mono text-xs">
            Dialog content goes here. Use for confirmations, forms, or important information.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline">{"> CANCEL"}</Button>
          <Button>{"> CONFIRM"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{"> EDIT_PROFILE"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-mono">[ EDIT_PROFILE ]</DialogTitle>
          <DialogDescription>Update your profile information below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="font-mono text-xs">[NAME]:</Label>
            <Input placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label className="font-mono text-xs">[EMAIL]:</Label>
            <Input type="email" placeholder="email@example.com" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">{"> CANCEL"}</Button>
          <Button>{"> SAVE_CHANGES"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{"> DELETE_ITEM"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-mono">[ CONFIRM_DELETE ]</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">{"> CANCEL"}</Button>
          <Button variant="destructive">{"> DELETE"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
