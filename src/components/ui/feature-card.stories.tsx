/**
 * ✅ FABRK COMPONENT
 * FeatureCard Stories - Feature showcase cards for marketing pages
 *
 * @see FeatureCard component documentation
 */

import { FeatureCard } from "@/components/ui/feature-card";
import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  BarChart3,
  Bell,
  Cloud,
  Code,
  FileText,
  Globe,
  Lock,
  Mail,
  Rocket,
  Search,
  Settings,
  Shield,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";

const meta: Meta<typeof FeatureCard> = {
  title: "UI/Marketing/FeatureCard",
  component: FeatureCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    highlighted: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

/**
 * Default feature card
 */
export const Default: Story = {
  args: {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for speed with industry-leading performance.",
  },
};

/**
 * With badge
 */
export const WithBadge: Story = {
  args: {
    icon: Rocket,
    title: "Advanced Analytics",
    description: "Track and analyze your data with powerful insights.",
    badge: "New",
  },
};

/**
 * Highlighted card
 */
export const Highlighted: Story = {
  args: {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security for your peace of mind.",
    highlighted: true,
  },
};

/**
 * Clickable card
 */
export const Clickable: Story = {
  args: {
    icon: Search,
    title: "Smart Search",
    description: "Find what you need instantly with AI-powered search.",
    onClick: () => alert("Feature card clicked!"),
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
};

/**
 * Error state
 */
export const Error: Story = {
  args: {
    error: true,
  },
};

/**
 * Cloud storage
 */
export const CloudStorage: Story = {
  args: {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Automatically sync your data across all devices in real-time.",
  },
};

/**
 * Collaboration
 */
export const Collaboration: Story = {
  args: {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with real-time collaboration tools.",
    badge: "Popular",
  },
};

/**
 * Notifications
 */
export const Notifications: Story = {
  args: {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay informed with intelligent, customizable notifications.",
  },
};

/**
 * Mobile app
 */
export const MobileApp: Story = {
  args: {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your work anywhere with our native mobile apps.",
  },
};

/**
 * Analytics
 */
export const Analytics: Story = {
  args: {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make data-driven decisions with comprehensive analytics.",
    highlighted: true,
  },
};

/**
 * Security
 */
export const Security: Story = {
  args: {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Your data is protected with military-grade encryption.",
  },
};

/**
 * API access
 */
export const APIAccess: Story = {
  args: {
    icon: Code,
    title: "Developer API",
    description: "Build custom integrations with our powerful REST API.",
    badge: "Beta",
  },
};

/**
 * Email integration
 */
export const EmailIntegration: Story = {
  args: {
    icon: Mail,
    title: "Email Integration",
    description: "Connect with your favorite email clients seamlessly.",
  },
};

/**
 * Global reach
 */
export const GlobalReach: Story = {
  args: {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast delivery from servers around the world.",
  },
};

/**
 * Customization
 */
export const Customization: Story = {
  args: {
    icon: Settings,
    title: "Fully Customizable",
    description: "Tailor every aspect to match your workflow and brand.",
  },
};

/**
 * Documentation
 */
export const Documentation: Story = {
  args: {
    icon: FileText,
    title: "Comprehensive Docs",
    description: "Detailed documentation and guides to get you started quickly.",
  },
};

/**
 * Features grid
 */
export const FeaturesGrid: Story = {
  render: () => (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <FeatureCard
        icon={Zap}
        title="Lightning Fast"
        description="Optimized for speed with industry-leading performance."
      />
      <FeatureCard
        icon={Shield}
        title="Secure by Default"
        description="Bank-grade security protecting your data 24/7."
        highlighted={true}
      />
      <FeatureCard
        icon={Cloud}
        title="Cloud Sync"
        description="Automatic synchronization across all your devices."
      />
      <FeatureCard
        icon={Users}
        title="Team Collaboration"
        description="Work together seamlessly with your team."
        badge="Popular"
      />
      <FeatureCard
        icon={BarChart3}
        title="Analytics"
        description="Powerful insights to drive your business forward."
      />
      <FeatureCard
        icon={Globe}
        title="Global CDN"
        description="Fast delivery from servers worldwide."
      />
    </div>
  ),
};

/**
 * Product features
 */
export const ProductFeatures: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-8">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Everything you need to succeed</h2>
        <p className="text-lg text-muted-foreground">
          Powerful features to help you work smarter, not harder
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={Rocket}
          title="Fast Setup"
          description="Get started in minutes with our quick setup process."
          onClick={() => console.log("Fast Setup")}
        />
        <FeatureCard
          icon={Lock}
          title="Secure"
          description="Enterprise-grade security you can trust."
          onClick={() => console.log("Secure")}
        />
        <FeatureCard
          icon={Smartphone}
          title="Mobile Apps"
          description="Work on the go with native mobile apps."
          badge="New"
          onClick={() => console.log("Mobile Apps")}
        />
        <FeatureCard
          icon={Code}
          title="Developer API"
          description="Build custom integrations with our API."
          onClick={() => console.log("Developer API")}
        />
      </div>
    </div>
  ),
};

/**
 * SaaS features
 */
export const SaaSFeatures: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-bold">Built for modern teams</h2>
        <p className="text-xl text-muted-foreground">
          Everything you need to collaborate, create, and grow
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <FeatureCard
          icon={Users}
          title="Team Collaboration"
          description="Real-time collaboration with your entire team. Share ideas, provide feedback, and work together seamlessly."
          highlighted={true}
        />
        <FeatureCard
          icon={BarChart3}
          title="Advanced Analytics"
          description="Track performance, measure success, and make data-driven decisions with powerful analytics tools."
        />
        <FeatureCard
          icon={Shield}
          title="Enterprise Security"
          description="Bank-level security with end-to-end encryption, SSO, and compliance certifications."
          badge="SOC 2"
        />
      </div>
    </div>
  ),
};

/**
 * Platform benefits
 */
export const PlatformBenefits: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-bold">Why choose our platform?</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={Zap}
          title="Blazing Fast"
          description="Lightning-fast performance that keeps up with your workflow."
        />
        <FeatureCard
          icon={Cloud}
          title="Cloud Native"
          description="Built for the cloud with automatic scaling and redundancy."
        />
        <FeatureCard
          icon={Lock}
          title="Secure"
          description="Military-grade encryption and compliance with industry standards."
        />
        <FeatureCard
          icon={Smartphone}
          title="Mobile First"
          description="Beautiful native apps for iOS and Android."
          badge="New"
        />
        <FeatureCard
          icon={Globe}
          title="Global Scale"
          description="Deployed across 15+ regions worldwide for low latency."
        />
        <FeatureCard
          icon={Code}
          title="Developer Friendly"
          description="Comprehensive API and webhooks for custom integrations."
        />
      </div>
    </div>
  ),
};
