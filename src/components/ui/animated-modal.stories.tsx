/**
 * ✅ FABRK COMPONENT
 * AnimatedModal Stories - Framer Motion powered modal dialogs
 *
 * @see AnimatedModal component documentation
 */

import { AnimatedModal } from "@/components/ui/animated-modal";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Check, AlertTriangle, Info, Mail } from "lucide-react";

const meta: Meta<typeof AnimatedModal> = {
  title: "UI/Interactive/AnimatedModal",
  component: AnimatedModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnimatedModal>;

/**
 * Default modal
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Open Modal
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <p className="text-muted-foreground">
            This is the modal content. Click outside or press the close button to dismiss.
          </p>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Confirmation modal
 */
export const Confirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Delete Item
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Deletion">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete this item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Success message
 */
export const SuccessMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Show Success
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Success!">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
                <Check className="size-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Changes saved successfully</p>
                <p className="text-sm text-muted-foreground">
                  Your settings have been updated.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Continue
              </button>
            </div>
          </div>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Warning message
 */
export const WarningMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-yellow-600 px-4 py-2 text-white"
        >
          Show Warning
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Warning">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-6 text-yellow-600" />
              <div>
                <p className="font-medium">This action requires confirmation</p>
                <p className="text-sm text-muted-foreground">
                  Please review the details before proceeding.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-yellow-600 px-4 py-2 text-sm text-white"
              >
                Proceed
              </button>
            </div>
          </div>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Info message
 */
export const InfoMessage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Show Info
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Information">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Info className="size-6 text-blue-600" />
              <div>
                <p className="font-medium">New features available</p>
                <p className="text-sm text-muted-foreground">
                  We've added some exciting new features to help you work better.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Got it
              </button>
            </div>
          </div>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Form modal
 */
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Add Contact
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add New Contact">
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full rounded-md border bg-background px-3 py-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border bg-background px-3 py-2"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <input
                type="tel"
                className="w-full rounded-md border bg-background px-3 py-2"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Add Contact
              </button>
            </div>
          </form>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Newsletter signup
 */
export const NewsletterSignup: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Subscribe
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Subscribe to Newsletter">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="size-6 text-primary" />
              <div>
                <p className="font-medium">Get the latest updates</p>
                <p className="text-sm text-muted-foreground">
                  Join 10,000+ subscribers and stay updated with our weekly newsletter.
                </p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  className="w-full rounded-md border bg-background px-3 py-2"
                  placeholder="your@email.com"
                />
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="agree" className="mt-1" />
                <label htmlFor="agree" className="text-xs text-muted-foreground">
                  I agree to receive marketing emails and can unsubscribe at any time.
                </label>
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Without title
 */
export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Open Modal
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Custom Heading</h2>
            <p className="text-muted-foreground">
              This modal doesn't use the built-in title prop, allowing for custom header designs.
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              Close
            </button>
          </div>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Large content
 */
export const LargeContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          View Terms
        </button>
        <AnimatedModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms of Service"
          className="max-h-[80vh] overflow-y-auto"
        >
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-sm text-muted-foreground">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </p>
            <p className="text-sm text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <p className="text-sm text-muted-foreground">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Decline
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Accept
              </button>
            </div>
          </div>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Feedback modal
 */
export const FeedbackModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Give Feedback
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Send Feedback">
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">How would you rate us?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="size-10 rounded-md border hover:bg-accent"
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Your feedback</label>
              <textarea
                className="w-full rounded-md border bg-background px-3 py-2"
                rows={4}
                placeholder="Tell us what you think..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                Submit
              </button>
            </div>
          </form>
        </AnimatedModal>
      </>
    );
  },
};

/**
 * Multi-step modal
 */
export const MultiStepModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    return (
      <>
        <button
          onClick={() => {
            setIsOpen(true);
            setStep(1);
          }}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        >
          Start Setup
        </button>
        <AnimatedModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Step ${step} of 3`}>
          <div className="space-y-4">
            {step === 1 && (
              <>
                <p className="text-muted-foreground">Let's start with your basic information.</p>
                <input
                  type="text"
                  className="w-full rounded-md border bg-background px-3 py-2"
                  placeholder="Your name"
                />
              </>
            )}
            {step === 2 && (
              <>
                <p className="text-muted-foreground">Tell us about your company.</p>
                <input
                  type="text"
                  className="w-full rounded-md border bg-background px-3 py-2"
                  placeholder="Company name"
                />
              </>
            )}
            {step === 3 && (
              <>
                <p className="text-muted-foreground">Almost done! Choose your plan.</p>
                <div className="space-y-2">
                  {["Free", "Pro", "Enterprise"].map((plan) => (
                    <button
                      key={plan}
                      className="w-full rounded-md border p-3 text-left hover:bg-accent"
                    >
                      {plan}
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className="flex justify-between">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="rounded-md border px-4 py-2 text-sm disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (step === 3) {
                    setIsOpen(false);
                  } else {
                    setStep(step + 1);
                  }
                }}
                className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
              >
                {step === 3 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </AnimatedModal>
      </>
    );
  },
};
