/**
 * ✅ FABRK COMPONENT
 * AnimatedList Stories - Framer Motion powered staggered list animations
 *
 * @see AnimatedList component documentation
 */

import { AnimatedList } from "@/components/ui/animated-list";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { Award, Check, Globe, Shield, Star, TrendingUp, Users, Zap } from "lucide-react";

const meta: Meta<typeof AnimatedList> = {
  title: "UI/Interactive/AnimatedList",
  component: AnimatedList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    delay: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
    stagger: {
      control: { type: "range", min: 0, max: 0.5, step: 0.05 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AnimatedList>;

/**
 * Default animated list
 */
export const Default: Story = {
  args: {
    children: [
      <div key="1" className="rounded-lg border bg-card p-4">
        First item
      </div>,
      <div key="2" className="rounded-lg border bg-card p-4">
        Second item
      </div>,
      <div key="3" className="rounded-lg border bg-card p-4">
        Third item
      </div>,
    ],
  },
};

/**
 * Features list
 */
export const FeaturesList: Story = {
  args: {
    children: [
      <div key="1" className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Lightning Fast</h3>
          <p className="text-sm text-muted-foreground">
            Optimized for speed with industry-leading performance
          </p>
        </div>
      </div>,
      <div key="2" className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-green-500/10">
          <Shield className="size-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold">Secure by Default</h3>
          <p className="text-sm text-muted-foreground">
            Bank-grade security for your data and applications
          </p>
        </div>
      </div>,
      <div key="3" className="flex items-start gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
          <Globe className="size-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold">Global Scale</h3>
          <p className="text-sm text-muted-foreground">
            Worldwide coverage with 99.9% uptime guarantee
          </p>
        </div>
      </div>,
    ],
  },
};

/**
 * Checklist
 */
export const Checklist: Story = {
  args: {
    children: [
      <div key="1" className="flex items-center gap-3">
        <Check className="size-5 text-green-600" />
        <span>Project setup complete</span>
      </div>,
      <div key="2" className="flex items-center gap-3">
        <Check className="size-5 text-green-600" />
        <span>Dependencies installed</span>
      </div>,
      <div key="3" className="flex items-center gap-3">
        <Check className="size-5 text-green-600" />
        <span>Configuration verified</span>
      </div>,
      <div key="4" className="flex items-center gap-3">
        <Check className="size-5 text-green-600" />
        <span>Ready to build</span>
      </div>,
    ],
  },
};

/**
 * Stats list
 */
export const StatsList: Story = {
  args: {
    children: [
      <div key="1" className="rounded-lg border bg-card p-6">
        <div className="text-3xl font-bold text-primary">10K+</div>
        <div className="text-sm text-muted-foreground">Active Users</div>
      </div>,
      <div key="2" className="rounded-lg border bg-card p-6">
        <div className="text-3xl font-bold text-primary">99.9%</div>
        <div className="text-sm text-muted-foreground">Uptime</div>
      </div>,
      <div key="3" className="rounded-lg border bg-card p-6">
        <div className="text-3xl font-bold text-primary">24/7</div>
        <div className="text-sm text-muted-foreground">Support</div>
      </div>,
    ],
  },
};

/**
 * Testimonials
 */
export const Testimonials: Story = {
  args: {
    children: [
      <div key="1" className="rounded-lg border bg-card p-6">
        <div className="mb-3 flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mb-4 text-sm italic">
          "This product has completely transformed our workflow."
        </p>
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600" />
          <div className="text-sm font-medium">Sarah Johnson</div>
        </div>
      </div>,
      <div key="2" className="rounded-lg border bg-card p-6">
        <div className="mb-3 flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mb-4 text-sm italic">"Outstanding support and incredible features."</p>
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-600" />
          <div className="text-sm font-medium">Mike Chen</div>
        </div>
      </div>,
      <div key="3" className="rounded-lg border bg-card p-6">
        <div className="mb-3 flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mb-4 text-sm italic">"Best investment we've made this year."</p>
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-green-400 to-blue-600" />
          <div className="text-sm font-medium">Emily Davis</div>
        </div>
      </div>,
    ],
  },
};

/**
 * Benefits list
 */
export const BenefitsList: Story = {
  args: {
    children: [
      <div key="1" className="flex gap-3">
        <div className="size-6 shrink-0 rounded-full bg-green-500" />
        <div>
          <div className="font-medium">Increase productivity</div>
          <div className="text-sm text-muted-foreground">Save up to 10 hours per week</div>
        </div>
      </div>,
      <div key="2" className="flex gap-3">
        <div className="size-6 shrink-0 rounded-full bg-green-500" />
        <div>
          <div className="font-medium">Reduce costs</div>
          <div className="text-sm text-muted-foreground">Cut operational expenses by 30%</div>
        </div>
      </div>,
      <div key="3" className="flex gap-3">
        <div className="size-6 shrink-0 rounded-full bg-green-500" />
        <div>
          <div className="font-medium">Improve collaboration</div>
          <div className="text-sm text-muted-foreground">Keep your team aligned and productive</div>
        </div>
      </div>,
      <div key="4" className="flex gap-3">
        <div className="size-6 shrink-0 rounded-full bg-green-500" />
        <div>
          <div className="font-medium">Scale with confidence</div>
          <div className="text-sm text-muted-foreground">Grow without technical limitations</div>
        </div>
      </div>,
    ],
  },
};

/**
 * Timeline
 */
export const Timeline: Story = {
  args: {
    children: [
      <div key="1" className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            1
          </div>
          <div className="h-full w-px bg-border" />
        </div>
        <div className="pb-8">
          <h3 className="font-semibold">Sign Up</h3>
          <p className="text-sm text-muted-foreground">Create your account in seconds</p>
        </div>
      </div>,
      <div key="2" className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            2
          </div>
          <div className="h-full w-px bg-border" />
        </div>
        <div className="pb-8">
          <h3 className="font-semibold">Set Up</h3>
          <p className="text-sm text-muted-foreground">Configure your workspace and invite team</p>
        </div>
      </div>,
      <div key="3" className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            3
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Start Building</h3>
          <p className="text-sm text-muted-foreground">Begin creating amazing projects</p>
        </div>
      </div>,
    ],
  },
};

/**
 * Pricing features
 */
export const PricingFeatures: Story = {
  args: {
    children: [
      <div key="1" className="flex items-center gap-2">
        <Check className="size-5 text-green-600" />
        <span className="text-sm">Unlimited projects</span>
      </div>,
      <div key="2" className="flex items-center gap-2">
        <Check className="size-5 text-green-600" />
        <span className="text-sm">Advanced analytics</span>
      </div>,
      <div key="3" className="flex items-center gap-2">
        <Check className="size-5 text-green-600" />
        <span className="text-sm">Priority support</span>
      </div>,
      <div key="4" className="flex items-center gap-2">
        <Check className="size-5 text-green-600" />
        <span className="text-sm">Custom integrations</span>
      </div>,
      <div key="5" className="flex items-center gap-2">
        <Check className="size-5 text-green-600" />
        <span className="text-sm">99.9% uptime SLA</span>
      </div>,
    ],
  },
};

/**
 * With custom stagger
 */
export const CustomStagger: Story = {
  args: {
    stagger: 0.2,
    children: [
      <div key="1" className="rounded-lg border bg-card p-4">
        Slower stagger animation
      </div>,
      <div key="2" className="rounded-lg border bg-card p-4">
        Each item appears
      </div>,
      <div key="3" className="rounded-lg border bg-card p-4">
        With more delay
      </div>,
    ],
  },
};

/**
 * With delay
 */
export const WithDelay: Story = {
  args: {
    delay: 0.5,
    children: [
      <div key="1" className="rounded-lg border bg-card p-4">
        List starts
      </div>,
      <div key="2" className="rounded-lg border bg-card p-4">
        After a delay
      </div>,
      <div key="3" className="rounded-lg border bg-card p-4">
        Then animates in
      </div>,
    ],
  },
};

/**
 * Achievement badges
 */
export const Achievements: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold">Our Achievements</h2>
      <AnimatedList>
        {[
          {
            icon: Award,
            title: "Industry Leader",
            description: "Recognized by leading publications",
          },
          { icon: Users, title: "50K+ Customers", description: "Trusted by thousands worldwide" },
          { icon: TrendingUp, title: "300% Growth", description: "Year over year expansion" },
          { icon: Star, title: "4.9/5 Rating", description: "Highest customer satisfaction" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg border bg-card p-4">
            <item.icon className="size-6 text-primary" />
            <div>
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.description}</div>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  ),
};

/**
 * Product features showcase
 */
export const ProductFeatures: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Everything You Need</h2>
        <p className="text-muted-foreground">All the features to help your team succeed</p>
      </div>
      <AnimatedList stagger={0.15}>
        {[
          { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed" },
          { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption" },
          { icon: Globe, title: "Global CDN", desc: "Worldwide coverage" },
          { icon: Users, title: "Team Collaboration", desc: "Work together seamlessly" },
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border bg-card p-6">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
              <feature.icon className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  ),
};

/**
 * Step-by-step guide
 */
export const StepByStepGuide: Story = {
  render: () => (
    <div className="w-full max-w-xl space-y-8">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-bold">Getting Started</h2>
        <p className="text-muted-foreground">Follow these simple steps to begin</p>
      </div>
      <AnimatedList className="space-y-6" stagger={0.2}>
        {[
          { step: 1, title: "Create Account", desc: "Sign up with your email" },
          { step: 2, title: "Verify Email", desc: "Check your inbox for verification" },
          { step: 3, title: "Set Up Profile", desc: "Complete your profile information" },
          { step: 4, title: "Start Building", desc: "Begin using the platform" },
        ].map((item) => (
          <div key={item.step} className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {item.step}
            </div>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </AnimatedList>
    </div>
  ),
};
