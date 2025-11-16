import type { Meta, StoryObj } from "@storybook/nextjs";
import { Banner } from "./banner";
import { useState } from "react";

const meta: Meta<typeof Banner> = {
  title: "UI/Banner",
  component: Banner,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: {
    variant: "info",
    children: "This is an informational message.",
  },
};

export const InfoWithTitle: Story = {
  args: {
    variant: "info",
    title: "Update Available",
    children: "A new version of the app is available. Please refresh to update.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Your trial period ends in 3 days. Upgrade to continue using the service.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "An error occurred while processing your request. Please try again.",
  },
};

export const WithDismiss: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <div className="text-center p-4 text-muted-foreground">
          Banner dismissed. Refresh to see it again.
        </div>
      );
    }

    return (
      <Banner
        variant="info"
        title="Cookie Notification"
        onDismiss={() => setIsVisible(false)}
      >
        We use cookies to improve your experience. By continuing, you agree to our cookie policy.
      </Banner>
    );
  },
};

export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "Maintenance Scheduled",
    children: "System maintenance is scheduled for tonight at 11 PM EST.",
    action: {
      label: "Learn More",
      onClick: () => alert("Learn more clicked"),
    },
  },
};

export const WithActionAndDismiss: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <div className="text-center p-4 text-muted-foreground">
          Banner dismissed
        </div>
      );
    }

    return (
      <Banner
        variant="info"
        title="New Features Available"
        onDismiss={() => setIsVisible(false)}
        action={{
          label: "View Features",
          onClick: () => alert("View features clicked"),
        }}
      >
        Check out the new features we've added to improve your workflow.
      </Banner>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Banner variant="info" title="Information">
        This is an informational message.
      </Banner>
      <Banner variant="success" title="Success">
        Operation completed successfully.
      </Banner>
      <Banner variant="warning" title="Warning">
        This action requires your attention.
      </Banner>
      <Banner variant="error" title="Error">
        An error occurred while processing.
      </Banner>
    </div>
  ),
};

export const TrialExpiring: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
      <Banner
        variant="warning"
        title="Trial Ending Soon"
        onDismiss={() => setIsVisible(false)}
        action={{
          label: "Upgrade Now",
          onClick: () => alert("Upgrade clicked"),
        }}
      >
        Your trial ends in 3 days. Upgrade to Pro to keep access to all features.
      </Banner>
    );
  },
};

export const SystemMaintenance: Story = {
  render: () => (
    <Banner
      variant="info"
      title="Scheduled Maintenance"
      action={{
        label: "View Schedule",
        onClick: () => alert("Schedule clicked"),
      }}
    >
      We'll be performing system maintenance on Saturday, January 20th from 2-4 AM EST.
      All services will be temporarily unavailable.
    </Banner>
  ),
};

export const PaymentFailed: Story = {
  render: () => (
    <Banner
      variant="error"
      title="Payment Failed"
      action={{
        label: "Update Payment",
        onClick: () => alert("Update payment clicked"),
      }}
    >
      We couldn't process your payment. Please update your payment method to continue your subscription.
    </Banner>
  ),
};

export const AccountVerification: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
      <Banner
        variant="warning"
        title="Verify Your Email"
        onDismiss={() => setIsVisible(false)}
        action={{
          label: "Resend Email",
          onClick: () => alert("Email resent"),
        }}
      >
        Please verify your email address to access all features.
      </Banner>
    );
  },
};

export const FeatureAnnouncement: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
      <Banner
        variant="success"
        title="🎉 New Feature: Dark Mode"
        onDismiss={() => setIsVisible(false)}
        action={{
          label: "Try It Now",
          onClick: () => alert("Dark mode enabled"),
        }}
      >
        Dark mode is now available! Switch between light and dark themes in your settings.
      </Banner>
    );
  },
};

export const MultipleStacked: Story = {
  render: () => (
    <div className="space-y-2">
      <Banner variant="error" title="Action Required">
        Your payment method is expired. Update it to avoid service interruption.
      </Banner>
      <Banner variant="warning" title="Limited Storage">
        You're using 95% of your storage. Upgrade or delete files to free up space.
      </Banner>
      <Banner variant="info" title="New Update">
        Version 2.0 is now available with improved performance and new features.
      </Banner>
    </div>
  ),
};
