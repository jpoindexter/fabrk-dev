import type { Meta, StoryObj } from "@storybook/nextjs";
import { ExitIntentPopup } from "./exit-intent-popup";

const meta = {
  title: "Landing/Exit Intent Popup",
  component: ExitIntentPopup,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "An exit-intent modal that appears when the user moves their cursor towards the top of the viewport (common exit behavior). Includes localStorage persistence to prevent showing multiple times. Optimized for conversion on landing pages.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Exit Intent Popup Demo
          </h1>
          <p style={{ color: "gray", marginBottom: "1rem" }}>
            Move your cursor to the top edge of the browser window to trigger the exit intent popup.
            The popup will only show once per session (tracked via localStorage).
          </p>
          <p style={{ color: "orange", fontSize: "0.875rem" }}>
            <strong>Note:</strong> Clear localStorage to see the popup again, or use the
            "Always Show" story variant.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExitIntentPopup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default configuration with pricing display. Triggers on mouse exit to top of viewport. Shows once per 7 days via localStorage.",
      },
    },
  },
};

export const WithoutPricing: Story = {
  args: {
    showPricing: false,
    title: "Don't Miss Out!",
    description: "Join 1,000+ developers who are building their SaaS faster with Fabrk.",
  },
  parameters: {
    docs: {
      description: {
        story: "Exit popup without pricing. Focused on social proof and urgency.",
      },
    },
  },
};

export const CustomOffer: Story = {
  args: {
    title: "🎉 Special Launch Week Offer!",
    description:
      "Get 50% off Fabrk boilerplate for the next 48 hours. Don't miss this limited-time deal!",
    ctaText: "Claim My 50% Discount",
    secondaryCtaText: "I'll pay full price later",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Customized for special promotions. Uses urgency and scarcity to drive conversions.",
      },
    },
  },
};

export const Newsletter: Story = {
  args: {
    title: "Stay in the Loop",
    description:
      "Subscribe to our newsletter and get exclusive tips, updates, and early access to new features.",
    ctaText: "Subscribe Now",
    ctaHref: "/newsletter",
    secondaryCtaText: "Maybe later",
    showPricing: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configured for newsletter signups. Good for building an email list without immediate purchase pressure.",
      },
    },
  },
};

export const FastDelay: Story = {
  args: {
    delay: 0,
    title: "Quick! You're About to Leave",
    description: "Give Fabrk a try - it only takes 5 minutes to get started.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows immediately on exit intent without delay. More aggressive conversion approach.",
      },
    },
  },
};
