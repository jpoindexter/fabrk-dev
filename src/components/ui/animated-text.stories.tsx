/**
 * ✅ FABRK COMPONENT
 * AnimatedText Stories - Framer Motion powered text reveal animations
 *
 * @see AnimatedText component documentation
 */

import { AnimatedText } from "@/components/ui/animated-text";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof AnimatedText> = {
  title: "UI/Interactive/AnimatedText",
  component: AnimatedText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["fade", "slide-up", "word-fade", "char-fade", "wave"],
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"],
    },
    delay: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedText>;

/**
 * Default animated text with fade effect
 */
export const Default: Story = {
  args: {
    text: "Welcome to our platform",
  },
};

/**
 * Fade animation
 */
export const Fade: Story = {
  args: {
    text: "This text fades in smoothly",
    variant: "fade",
  },
};

/**
 * Slide up animation
 */
export const SlideUp: Story = {
  args: {
    text: "This text slides up from below",
    variant: "slide-up",
  },
};

/**
 * Word fade animation
 */
export const WordFade: Story = {
  args: {
    text: "Each word appears one by one",
    variant: "word-fade",
  },
};

/**
 * Character fade animation
 */
export const CharacterFade: Story = {
  args: {
    text: "Every character fades in",
    variant: "char-fade",
  },
};

/**
 * Wave animation
 */
export const Wave: Story = {
  args: {
    text: "Words wave in sequence",
    variant: "wave",
  },
};

/**
 * Hero heading
 */
export const HeroHeading: Story = {
  args: {
    text: "Build Amazing Products",
    variant: "slide-up",
    as: "h1",
    className: "text-5xl font-bold",
  },
};

/**
 * Hero subheading
 */
export const HeroSubheading: Story = {
  args: {
    text: "The platform trusted by thousands of companies worldwide",
    variant: "word-fade",
    as: "h2",
    className: "text-2xl text-muted-foreground",
  },
};

/**
 * Section title
 */
export const SectionTitle: Story = {
  args: {
    text: "Our Amazing Features",
    variant: "fade",
    as: "h2",
    className: "text-4xl font-bold",
  },
};

/**
 * Tagline
 */
export const Tagline: Story = {
  args: {
    text: "Ship faster. Build better. Grow bigger.",
    variant: "word-fade",
    as: "p",
    className: "text-xl text-muted-foreground",
  },
};

/**
 * Call to action
 */
export const CallToAction: Story = {
  args: {
    text: "Start your free trial today",
    variant: "wave",
    as: "h3",
    className: "text-2xl font-bold",
  },
};

/**
 * Product description
 */
export const ProductDescription: Story = {
  args: {
    text: "The all-in-one platform for modern teams to collaborate, ship, and scale",
    variant: "slide-up",
    as: "p",
    className: "text-lg text-muted-foreground max-w-2xl",
  },
};

/**
 * Stats label
 */
export const StatsLabel: Story = {
  args: {
    text: "Trusted by 10,000+ teams worldwide",
    variant: "char-fade",
    as: "p",
    className: "text-sm text-muted-foreground",
  },
};

/**
 * With delay
 */
export const WithDelay: Story = {
  args: {
    text: "This text appears after a delay",
    variant: "fade",
    delay: 0.5,
  },
};

/**
 * Large heading
 */
export const LargeHeading: Story = {
  args: {
    text: "Welcome",
    variant: "wave",
    as: "h1",
    className: "text-7xl font-black",
  },
};

/**
 * Small text
 */
export const SmallText: Story = {
  args: {
    text: "This is a small detail text",
    variant: "fade",
    as: "p",
    className: "text-xs text-muted-foreground",
  },
};

/**
 * Landing page hero
 */
export const LandingPageHero: Story = {
  render: () => (
    <div className="space-y-6 text-center">
      <AnimatedText
        text="The Future of Collaboration"
        variant="slide-up"
        as="h1"
        className="text-6xl font-bold"
      />
      <AnimatedText
        text="Empower your team with tools that actually work together"
        variant="word-fade"
        as="p"
        className="text-xl text-muted-foreground"
        delay={0.3}
      />
      <AnimatedText
        text="Join 50,000+ teams already using our platform"
        variant="fade"
        as="p"
        className="text-sm text-muted-foreground"
        delay={0.6}
      />
    </div>
  ),
};

/**
 * Feature section
 */
export const FeatureSection: Story = {
  render: () => (
    <div className="space-y-4 text-center">
      <AnimatedText
        text="Why Choose Us"
        variant="fade"
        as="h2"
        className="text-4xl font-bold"
      />
      <AnimatedText
        text="We provide everything you need to succeed"
        variant="slide-up"
        as="p"
        className="text-lg text-muted-foreground"
        delay={0.2}
      />
    </div>
  ),
};

/**
 * About section
 */
export const AboutSection: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <AnimatedText
        text="Our Story"
        variant="slide-up"
        as="h2"
        className="text-4xl font-bold"
      />
      <AnimatedText
        text="We started with a simple mission: make collaboration effortless for teams everywhere"
        variant="word-fade"
        as="p"
        className="text-lg text-muted-foreground"
        delay={0.2}
      />
      <AnimatedText
        text="Today we serve over 50,000 teams in 120 countries"
        variant="fade"
        as="p"
        className="text-muted-foreground"
        delay={0.5}
      />
    </div>
  ),
};

/**
 * Testimonial quote
 */
export const TestimonialQuote: Story = {
  render: () => (
    <div className="max-w-xl space-y-4 text-center">
      <AnimatedText
        text="This product has completely transformed how our team works"
        variant="word-fade"
        as="p"
        className="text-2xl italic"
      />
      <AnimatedText
        text="Sarah Johnson, CEO at TechCorp"
        variant="fade"
        as="p"
        className="text-sm text-muted-foreground"
        delay={0.5}
      />
    </div>
  ),
};

/**
 * Pricing section
 */
export const PricingSection: Story = {
  render: () => (
    <div className="space-y-6 text-center">
      <AnimatedText
        text="Simple, Transparent Pricing"
        variant="slide-up"
        as="h2"
        className="text-4xl font-bold"
      />
      <AnimatedText
        text="Choose the perfect plan for your team"
        variant="fade"
        as="p"
        className="text-lg text-muted-foreground"
        delay={0.2}
      />
      <AnimatedText
        text="No hidden fees. Cancel anytime."
        variant="char-fade"
        as="p"
        className="text-sm text-muted-foreground"
        delay={0.4}
      />
    </div>
  ),
};

/**
 * CTA section
 */
export const CTASection: Story = {
  render: () => (
    <div className="space-y-6 text-center">
      <AnimatedText
        text="Ready to Get Started?"
        variant="wave"
        as="h2"
        className="text-5xl font-bold"
      />
      <AnimatedText
        text="Join thousands of teams already using our platform"
        variant="word-fade"
        as="p"
        className="text-xl text-muted-foreground"
        delay={0.3}
      />
    </div>
  ),
};

/**
 * Footer text
 */
export const FooterText: Story = {
  render: () => (
    <div className="space-y-2 text-center">
      <AnimatedText
        text="Built with ❤️ by our amazing team"
        variant="fade"
        as="p"
        className="text-sm text-muted-foreground"
      />
      <AnimatedText
        text="© 2025 Your Company. All rights reserved."
        variant="fade"
        as="p"
        className="text-xs text-muted-foreground"
        delay={0.2}
      />
    </div>
  ),
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 py-12">
      <h2 className="text-2xl font-bold">All Animation Variants</h2>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">Fade</p>
          <AnimatedText
            text="This text fades in smoothly"
            variant="fade"
            className="text-lg"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">Slide Up</p>
          <AnimatedText
            text="This text slides up from below"
            variant="slide-up"
            className="text-lg"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">Word Fade</p>
          <AnimatedText
            text="Each word appears one by one"
            variant="word-fade"
            className="text-lg"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">Character Fade</p>
          <AnimatedText
            text="Every character fades in"
            variant="char-fade"
            className="text-lg"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">Wave</p>
          <AnimatedText
            text="Words wave in sequence"
            variant="wave"
            className="text-lg"
          />
        </div>
      </div>
    </div>
  ),
};
