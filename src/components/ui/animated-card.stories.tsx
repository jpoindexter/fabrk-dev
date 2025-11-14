/**
 * ✅ FABRK COMPONENT
 * AnimatedCard Stories - Framer Motion powered cards with scroll animations
 *
 * @see AnimatedCard component documentation
 */

import { AnimatedCard } from "@/components/ui/animated-card";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { BarChart3, Code, Globe, Lock, Rocket, Sparkles, Star, Users, Zap } from "lucide-react";

const meta: Meta<typeof AnimatedCard> = {
  title: "UI/Interactive/AnimatedCard",
  component: AnimatedCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["fade-up", "scale", "flip", "lift", "glow"],
    },
    delay: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedCard>;

/**
 * Default animated card with fade-up effect
 */
export const Default: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Animated Card</h3>
        <p className="text-muted-foreground">
          Scroll to see the entrance animation
        </p>
      </div>
    ),
  },
};

/**
 * Fade up animation
 */
export const FadeUp: Story = {
  args: {
    variant: "fade-up",
    children: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Fade Up</h3>
        <p className="text-muted-foreground">
          Card fades in and slides up from below
        </p>
      </div>
    ),
  },
};

/**
 * Scale animation
 */
export const Scale: Story = {
  args: {
    variant: "scale",
    children: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Scale</h3>
        <p className="text-muted-foreground">
          Card scales up smoothly on entrance
        </p>
      </div>
    ),
  },
};

/**
 * Flip animation
 */
export const Flip: Story = {
  args: {
    variant: "flip",
    children: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Flip</h3>
        <p className="text-muted-foreground">
          Card flips in with 3D rotation effect
        </p>
      </div>
    ),
  },
};

/**
 * Lift animation
 */
export const Lift: Story = {
  args: {
    variant: "lift",
    children: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Lift</h3>
        <p className="text-muted-foreground">
          Card lifts up on hover with spring effect
        </p>
      </div>
    ),
  },
};

/**
 * Glow animation
 */
export const Glow: Story = {
  args: {
    variant: "glow",
    children: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Glow</h3>
        <p className="text-muted-foreground">
          Card glows with primary color on hover
        </p>
      </div>
    ),
  },
};

/**
 * Feature card
 */
export const FeatureCard: Story = {
  args: {
    variant: "lift",
    children: (
      <div className="space-y-4">
        <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="size-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Lightning Fast</h3>
        <p className="text-muted-foreground">
          Optimized for speed with industry-leading performance metrics
        </p>
      </div>
    ),
  },
};

/**
 * Product card
 */
export const ProductCard: Story = {
  args: {
    variant: "scale",
    children: (
      <div className="w-64 space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-purple-400 to-pink-600">
          <div className="flex size-full items-center justify-center text-2xl font-bold text-white">
            Product
          </div>
        </div>
        <div>
          <h3 className="font-bold">Premium Headphones</h3>
          <p className="text-sm text-muted-foreground">High-quality audio</p>
          <p className="mt-2 text-xl font-bold">$299</p>
        </div>
      </div>
    ),
  },
};

/**
 * Stats card
 */
export const StatsCard: Story = {
  args: {
    variant: "fade-up",
    children: (
      <div className="w-48 space-y-2 text-center">
        <div className="text-4xl font-bold text-primary">99.9%</div>
        <div className="text-sm font-medium">Uptime</div>
        <p className="text-xs text-muted-foreground">Last 12 months</p>
      </div>
    ),
  },
};

/**
 * Team member card
 */
export const TeamMember: Story = {
  args: {
    variant: "flip",
    children: (
      <div className="w-64 space-y-4 text-center">
        <div className="mx-auto size-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
        <div>
          <h3 className="font-bold">John Doe</h3>
          <p className="text-sm text-muted-foreground">CEO & Founder</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Leading the team with vision and innovation
        </p>
      </div>
    ),
  },
};

/**
 * Testimonial card
 */
export const Testimonial: Story = {
  args: {
    variant: "glow",
    children: (
      <div className="w-80 space-y-4">
        <div className="flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <p className="italic">
          "This product has completely transformed how our team works. Highly
          recommended!"
        </p>
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600" />
          <div>
            <div className="text-sm font-medium">Sarah Johnson</div>
            <div className="text-xs text-muted-foreground">Product Manager</div>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Pricing card
 */
export const PricingCard: Story = {
  args: {
    variant: "lift",
    children: (
      <div className="w-72 space-y-6">
        <div>
          <h3 className="text-2xl font-bold">Professional</h3>
          <div className="mt-2">
            <span className="text-4xl font-bold">$29</span>
            <span className="text-muted-foreground">/month</span>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-green-500" />
            Unlimited projects
          </li>
          <li className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-green-500" />
            Advanced analytics
          </li>
          <li className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-green-500" />
            Priority support
          </li>
        </ul>
        <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Get Started
        </button>
      </div>
    ),
  },
};

/**
 * Service card
 */
export const ServiceCard: Story = {
  args: {
    variant: "fade-up",
    children: (
      <div className="w-80 space-y-4">
        <div className="flex size-16 items-center justify-center rounded-lg bg-blue-500/10">
          <Code className="size-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold">Web Development</h3>
        <p className="text-sm text-muted-foreground">
          Custom web applications built with modern technologies and best
          practices
        </p>
        <a href="#" className="inline-flex items-center text-sm font-medium text-primary">
          Learn more →
        </a>
      </div>
    ),
  },
};

/**
 * With delay
 */
export const WithDelay: Story = {
  args: {
    variant: "fade-up",
    delay: 0.5,
    children: (
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Delayed Animation</h3>
        <p className="text-muted-foreground">
          This card animates 0.5 seconds after scroll
        </p>
      </div>
    ),
  },
};

/**
 * Feature grid
 */
export const FeatureGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <AnimatedCard variant="fade-up" delay={0}>
        <div className="space-y-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <Rocket className="size-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold">Fast Setup</h3>
          <p className="text-sm text-muted-foreground">
            Get started in minutes with our quick setup
          </p>
        </div>
      </AnimatedCard>

      <AnimatedCard variant="fade-up" delay={0.1}>
        <div className="space-y-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
            <Lock className="size-6 text-green-600" />
          </div>
          <h3 className="text-lg font-bold">Secure</h3>
          <p className="text-sm text-muted-foreground">
            Bank-grade security for your data
          </p>
        </div>
      </AnimatedCard>

      <AnimatedCard variant="fade-up" delay={0.2}>
        <div className="space-y-4">
          <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
            <Globe className="size-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold">Global</h3>
          <p className="text-sm text-muted-foreground">
            Worldwide coverage and support
          </p>
        </div>
      </AnimatedCard>
    </div>
  ),
};

/**
 * Stats grid
 */
export const StatsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <AnimatedCard variant="scale" delay={0}>
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold text-primary">10K+</div>
          <div className="text-sm text-muted-foreground">Active Users</div>
        </div>
      </AnimatedCard>

      <AnimatedCard variant="scale" delay={0.1}>
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold text-primary">99.9%</div>
          <div className="text-sm text-muted-foreground">Uptime</div>
        </div>
      </AnimatedCard>

      <AnimatedCard variant="scale" delay={0.2}>
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold text-primary">24/7</div>
          <div className="text-sm text-muted-foreground">Support</div>
        </div>
      </AnimatedCard>

      <AnimatedCard variant="scale" delay={0.3}>
        <div className="space-y-2 text-center">
          <div className="text-3xl font-bold text-primary">150+</div>
          <div className="text-sm text-muted-foreground">Countries</div>
        </div>
      </AnimatedCard>
    </div>
  ),
};

/**
 * Team showcase
 */
export const TeamShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {["Alice Johnson", "Bob Smith", "Carol Williams"].map((name, i) => (
        <AnimatedCard key={name} variant="flip" delay={i * 0.1}>
          <div className="space-y-4 text-center">
            <div className="mx-auto size-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-600" />
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-xs text-muted-foreground">Team Member</div>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  ),
};

/**
 * Services showcase
 */
export const ServicesShowcase: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Our Services</h2>
        <p className="text-muted-foreground">
          Comprehensive solutions for your business
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatedCard variant="lift">
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <Code className="size-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Development</h3>
            <p className="text-sm text-muted-foreground">
              Custom software development with cutting-edge technologies
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard variant="lift">
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-purple-500/10">
              <BarChart3 className="size-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold">Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Data-driven insights to grow your business
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard variant="lift">
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
              <Users className="size-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold">Consulting</h3>
            <p className="text-sm text-muted-foreground">
              Expert guidance for your digital transformation
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard variant="lift">
          <div className="space-y-4">
            <div className="flex size-12 items-center justify-center rounded-lg bg-orange-500/10">
              <Sparkles className="size-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-bold">Design</h3>
            <p className="text-sm text-muted-foreground">
              Beautiful, user-centered design solutions
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  ),
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">All Animation Variants</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatedCard variant="fade-up">
          <div className="space-y-2">
            <h3 className="font-bold">Fade Up</h3>
            <p className="text-sm text-muted-foreground">
              Fades in and slides up
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard variant="scale">
          <div className="space-y-2">
            <h3 className="font-bold">Scale</h3>
            <p className="text-sm text-muted-foreground">
              Scales up smoothly
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard variant="flip">
          <div className="space-y-2">
            <h3 className="font-bold">Flip</h3>
            <p className="text-sm text-muted-foreground">
              3D flip rotation
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard variant="lift">
          <div className="space-y-2">
            <h3 className="font-bold">Lift</h3>
            <p className="text-sm text-muted-foreground">
              Lifts up on hover
            </p>
          </div>
        </AnimatedCard>

        <AnimatedCard variant="glow">
          <div className="space-y-2">
            <h3 className="font-bold">Glow</h3>
            <p className="text-sm text-muted-foreground">
              Glows on hover
            </p>
          </div>
        </AnimatedCard>
      </div>
    </div>
  ),
};
