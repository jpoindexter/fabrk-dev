/**
 * ✅ FABRK COMPONENT
 * AnimatedButton Stories - Framer Motion powered interactive buttons
 *
 * @see AnimatedButton component documentation
 */

import { AnimatedButton } from "@/components/ui/animated-button";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { ArrowRight, Download, Play, Sparkles } from "lucide-react";

const meta: Meta<typeof AnimatedButton> = {
  title: "UI/Interactive/AnimatedButton",
  component: AnimatedButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["scale", "magnetic", "shimmer", "pulse", "bounce", "slide"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedButton>;

/**
 * Default animated button with scale effect
 */
export const Default: Story = {
  args: {
    children: "Click me",
    variant: "scale",
  },
};

/**
 * Scale animation
 */
export const Scale: Story = {
  args: {
    children: "Scale Animation",
    variant: "scale",
  },
};

/**
 * Magnetic animation
 */
export const Magnetic: Story = {
  args: {
    children: "Magnetic Effect",
    variant: "magnetic",
  },
};

/**
 * Shimmer animation
 */
export const Shimmer: Story = {
  args: {
    children: "Shimmer Gradient",
    variant: "shimmer",
  },
};

/**
 * Pulse animation
 */
export const Pulse: Story = {
  args: {
    children: "Pulse Effect",
    variant: "pulse",
  },
};

/**
 * Bounce animation
 */
export const Bounce: Story = {
  args: {
    children: "Bounce Effect",
    variant: "bounce",
  },
};

/**
 * Slide animation
 */
export const Slide: Story = {
  args: {
    children: "Slide Effect",
    variant: "slide",
  },
};

/**
 * With icon
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        Get Started
        <ArrowRight className="ml-2 size-4" />
      </>
    ),
    variant: "scale",
  },
};

/**
 * Download button
 */
export const DownloadButton: Story = {
  args: {
    children: (
      <>
        <Download className="mr-2 size-4" />
        Download Now
      </>
    ),
    variant: "bounce",
  },
};

/**
 * Play button
 */
export const PlayButton: Story = {
  args: {
    children: (
      <>
        <Play className="mr-2 size-4" />
        Watch Demo
      </>
    ),
    variant: "pulse",
  },
};

/**
 * Call to action
 */
export const CallToAction: Story = {
  args: {
    children: (
      <>
        Start Free Trial
        <Sparkles className="ml-2 size-4" />
      </>
    ),
    variant: "shimmer",
    className: "text-lg px-8 py-4",
  },
};

/**
 * Small size
 */
export const SmallSize: Story = {
  args: {
    children: "Small Button",
    variant: "scale",
    className: "text-sm px-4 py-2",
  },
};

/**
 * Large size
 */
export const LargeSize: Story = {
  args: {
    children: "Large Button",
    variant: "scale",
    className: "text-xl px-8 py-4",
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "scale",
    disabled: true,
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <AnimatedButton variant="scale">Scale</AnimatedButton>
      <AnimatedButton variant="magnetic">Magnetic</AnimatedButton>
      <AnimatedButton variant="shimmer">Shimmer</AnimatedButton>
      <AnimatedButton variant="pulse">Pulse</AnimatedButton>
      <AnimatedButton variant="bounce">Bounce</AnimatedButton>
      <AnimatedButton variant="slide">Slide</AnimatedButton>
    </div>
  ),
};

/**
 * Hero CTA buttons
 */
export const HeroButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <AnimatedButton variant="shimmer" className="px-8 py-4 text-lg">
        Get Started Free
      </AnimatedButton>
      <AnimatedButton
        variant="magnetic"
        className="border-2 bg-transparent px-8 py-4 text-lg text-foreground"
      >
        Watch Demo
      </AnimatedButton>
    </div>
  ),
};

/**
 * Marketing page CTAs
 */
export const MarketingCTAs: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <AnimatedButton variant="shimmer" className="px-10 py-5 text-xl">
          <Sparkles className="mr-2 size-5" />
          Start Building Today
        </AnimatedButton>
        <p className="text-sm text-muted-foreground">No credit card required</p>
      </div>

      <div className="flex gap-4">
        <AnimatedButton variant="bounce">
          <Download className="mr-2 size-4" />
          Download App
        </AnimatedButton>
        <AnimatedButton variant="pulse" className="border-2 bg-transparent text-foreground">
          Learn More
          <ArrowRight className="ml-2 size-4" />
        </AnimatedButton>
      </div>
    </div>
  ),
};

/**
 * Action buttons
 */
export const ActionButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <AnimatedButton variant="scale">Save Changes</AnimatedButton>
      <AnimatedButton variant="slide" className="border-2 bg-transparent text-foreground">
        Cancel
      </AnimatedButton>
      <AnimatedButton variant="bounce" className="bg-green-600 hover:bg-green-700">
        Confirm
      </AnimatedButton>
      <AnimatedButton variant="pulse" className="bg-red-600 hover:bg-red-700">
        Delete
      </AnimatedButton>
    </div>
  ),
};

/**
 * Social buttons
 */
export const SocialButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <AnimatedButton variant="magnetic" className="w-full bg-blue-600">
        Continue with Facebook
      </AnimatedButton>
      <AnimatedButton variant="magnetic" className="w-full bg-black">
        Continue with GitHub
      </AnimatedButton>
      <AnimatedButton variant="magnetic" className="w-full bg-white text-black">
        Continue with Google
      </AnimatedButton>
    </div>
  ),
};

/**
 * Landing page hero
 */
export const LandingPageHero: Story = {
  render: () => (
    <div className="flex min-h-96 flex-col items-center justify-center space-y-8 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">Build Better Products</h1>
        <p className="text-xl text-muted-foreground">
          The platform trusted by thousands of companies worldwide
        </p>
      </div>
      <div className="flex gap-4">
        <AnimatedButton variant="shimmer" className="px-8 py-4 text-lg">
          Start Free Trial
          <ArrowRight className="ml-2 size-5" />
        </AnimatedButton>
        <AnimatedButton
          variant="scale"
          className="border-2 bg-transparent px-8 py-4 text-lg text-foreground"
        >
          <Play className="mr-2 size-5" />
          Watch Video
        </AnimatedButton>
      </div>
    </div>
  ),
};
