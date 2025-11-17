import type { Meta, StoryObj } from "@storybook/react";
import { StickyCTABar } from "./sticky-cta-bar";

const meta = {
  title: "Landing/Sticky CTA Bar",
  component: StickyCTABar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A sticky CTA bar that appears at the bottom of the page after scrolling. Includes dismiss functionality with localStorage persistence. Optimized for conversion on landing pages.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof StickyCTABar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Default configuration with pricing display. Shows after scrolling 300px. Dismissible with localStorage persistence.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Scroll down to see the sticky CTA bar
          </h1>
          <p style={{ color: "gray" }}>
            The sticky bar will appear after you scroll down 300 pixels. Click the X button to dismiss it. The dismissal is saved in localStorage.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const WithoutPrice: Story = {
  args: {
    showPrice: false,
    message: "Start building your SaaS today",
  },
  parameters: {
    docs: {
      description: {
        story: "CTA bar without pricing display. Clean and minimal design.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Scroll to see CTA without price
          </h1>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const CustomMessage: Story = {
  args: {
    message: "Limited time offer - 50% off for first 100 customers!",
    ctaText: "Claim Your Discount",
    ctaHref: "/pricing",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Customized message and CTA text. Perfect for special promotions or limited-time offers.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Custom promotional message
          </h1>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const EarlyShow: Story = {
  args: {
    showAfterScroll: 50,
    message: "Join 1,000+ developers building faster",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configured to show after minimal scrolling (50px). Useful for pages where you want immediate engagement.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "200vh", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Shows after 50px scroll
          </h1>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const AlwaysVisible: Story = {
  args: {
    showAfterScroll: 0,
    message: "Special launch week pricing",
    ctaText: "Get Early Access",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Visible immediately without scrolling. Useful for high-priority campaigns.",
      },
    },
  },
};
