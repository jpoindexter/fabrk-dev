/**
 * ✅ FABRK COMPONENT
 * LogoCloud Stories - Brand and partner logo showcases
 *
 * @see LogoCloud component documentation
 */

import { LogoCloud } from "@/components/ui/logo-cloud";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof LogoCloud> = {
  title: "UI/Marketing/LogoCloud",
  component: LogoCloud,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: "boolean",
    },
    error: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoCloud>;

// Sample logos using placeholder images
const techCompanies = [
  { name: "Vercel", url: "https://placehold.co/120x40/000000/FFFFFF/png?text=Vercel" },
  { name: "Next.js", url: "https://placehold.co/120x40/000000/FFFFFF/png?text=Next.js" },
  { name: "React", url: "https://placehold.co/120x40/61DAFB/000000/png?text=React" },
  { name: "TypeScript", url: "https://placehold.co/120x40/3178C6/FFFFFF/png?text=TypeScript" },
  { name: "Tailwind", url: "https://placehold.co/120x40/06B6D4/FFFFFF/png?text=Tailwind" },
  { name: "Framer", url: "https://placehold.co/120x40/0055FF/FFFFFF/png?text=Framer" },
];

const enterprises = [
  { name: "Microsoft", url: "https://placehold.co/120x40/5E5E5E/FFFFFF/png?text=Microsoft" },
  { name: "Google", url: "https://placehold.co/120x40/4285F4/FFFFFF/png?text=Google" },
  { name: "Amazon", url: "https://placehold.co/120x40/FF9900/000000/png?text=Amazon" },
  { name: "Apple", url: "https://placehold.co/120x40/555555/FFFFFF/png?text=Apple" },
  { name: "Meta", url: "https://placehold.co/120x40/0668E1/FFFFFF/png?text=Meta" },
  { name: "Netflix", url: "https://placehold.co/120x40/E50914/FFFFFF/png?text=Netflix" },
];

const startups = [
  {
    name: "Stripe",
    url: "https://placehold.co/120x40/635BFF/FFFFFF/png?text=Stripe",
    href: "https://stripe.com",
  },
  {
    name: "Notion",
    url: "https://placehold.co/120x40/000000/FFFFFF/png?text=Notion",
    href: "https://notion.so",
  },
  {
    name: "Linear",
    url: "https://placehold.co/120x40/5E6AD2/FFFFFF/png?text=Linear",
    href: "https://linear.app",
  },
  {
    name: "Figma",
    url: "https://placehold.co/120x40/F24E1E/FFFFFF/png?text=Figma",
    href: "https://figma.com",
  },
  {
    name: "Loom",
    url: "https://placehold.co/120x40/625DF5/FFFFFF/png?text=Loom",
    href: "https://loom.com",
  },
  {
    name: "Airtable",
    url: "https://placehold.co/120x40/FCB400/000000/png?text=Airtable",
    href: "https://airtable.com",
  },
];

/**
 * Default logo cloud
 */
export const Default: Story = {
  args: {
    logos: techCompanies,
  },
};

/**
 * Enterprise clients
 */
export const EnterpriseClients: Story = {
  args: {
    title: "Trusted by industry leaders",
    logos: enterprises,
  },
};

/**
 * With clickable logos
 */
export const Clickable: Story = {
  args: {
    title: "Our partners",
    logos: startups,
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
 * Small set
 */
export const SmallSet: Story = {
  args: {
    title: "As featured in",
    logos: techCompanies.slice(0, 3),
  },
};

/**
 * Large set
 */
export const LargeSet: Story = {
  args: {
    title: "Join thousands of companies",
    logos: [
      ...techCompanies,
      ...enterprises.slice(0, 6),
    ],
  },
};

/**
 * No title
 */
export const NoTitle: Story = {
  args: {
    title: undefined,
    logos: techCompanies,
  },
};

/**
 * Custom title
 */
export const CustomTitle: Story = {
  args: {
    title: "Built with the best tools in the industry",
    logos: techCompanies,
  },
};

/**
 * Investors
 */
export const Investors: Story = {
  args: {
    title: "Backed by leading investors",
    logos: [
      { name: "Y Combinator", url: "https://placehold.co/120x40/FB651E/FFFFFF/png?text=YC" },
      { name: "Sequoia", url: "https://placehold.co/120x40/2A3F2F/FFFFFF/png?text=Sequoia" },
      { name: "a16z", url: "https://placehold.co/120x40/B9121B/FFFFFF/png?text=a16z" },
      { name: "Accel", url: "https://placehold.co/120x40/1569E0/FFFFFF/png?text=Accel" },
      { name: "Index", url: "https://placehold.co/120x40/000000/FFFFFF/png?text=Index" },
      { name: "GV", url: "https://placehold.co/120x40/4285F4/FFFFFF/png?text=GV" },
    ],
  },
};

/**
 * Press mentions
 */
export const PressMentions: Story = {
  args: {
    title: "As seen in",
    logos: [
      { name: "TechCrunch", url: "https://placehold.co/120x40/0A9B00/FFFFFF/png?text=TechCrunch" },
      { name: "Forbes", url: "https://placehold.co/120x40/000000/FFFFFF/png?text=Forbes" },
      { name: "WSJ", url: "https://placehold.co/120x40/1C1C1C/FFFFFF/png?text=WSJ" },
      { name: "Bloomberg", url: "https://placehold.co/120x40/4A4A4A/FFFFFF/png?text=Bloomberg" },
      { name: "VentureBeat", url: "https://placehold.co/120x40/1870C7/FFFFFF/png?text=VentureBeat" },
      { name: "Wired", url: "https://placehold.co/120x40/000000/FFFFFF/png?text=Wired" },
    ],
  },
};

/**
 * Integration partners
 */
export const IntegrationPartners: Story = {
  args: {
    title: "Integrates with your favorite tools",
    logos: [
      { name: "Slack", url: "https://placehold.co/120x40/4A154B/FFFFFF/png?text=Slack" },
      { name: "Zoom", url: "https://placehold.co/120x40/2D8CFF/FFFFFF/png?text=Zoom" },
      { name: "GitHub", url: "https://placehold.co/120x40/181717/FFFFFF/png?text=GitHub" },
      { name: "Jira", url: "https://placehold.co/120x40/0052CC/FFFFFF/png?text=Jira" },
      { name: "Asana", url: "https://placehold.co/120x40/F06A6A/FFFFFF/png?text=Asana" },
      { name: "Salesforce", url: "https://placehold.co/120x40/00A1E0/FFFFFF/png?text=Salesforce" },
    ],
  },
};

/**
 * Tech stack
 */
export const TechStack: Story = {
  render: () => (
    <div className="w-full max-w-5xl space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Built with modern technology</h2>
        <p className="text-lg text-muted-foreground">
          Powered by the best tools in the industry
        </p>
      </div>
      <LogoCloud logos={techCompanies} title={undefined} />
    </div>
  ),
};

/**
 * Client testimonials section
 */
export const ClientTestimonials: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-12">
      <div className="text-center">
        <h2 className="mb-4 text-4xl font-bold">Trusted by the best</h2>
        <p className="text-xl text-muted-foreground">
          Join thousands of companies using our platform
        </p>
      </div>
      <LogoCloud logos={enterprises} title={undefined} />
    </div>
  ),
};

/**
 * Landing page hero
 */
export const LandingPageHero: Story = {
  render: () => (
    <div className="w-full max-w-7xl space-y-16 py-12">
      <div className="text-center">
        <h1 className="mb-6 text-5xl font-bold">
          The platform trusted by industry leaders
        </h1>
        <p className="mb-12 text-xl text-muted-foreground">
          Join over 10,000 companies building the future
        </p>
      </div>
      <LogoCloud logos={[...enterprises, ...startups]} title={undefined} />
    </div>
  ),
};

/**
 * Footer logos
 */
export const FooterLogos: Story = {
  render: () => (
    <div className="w-full max-w-6xl border-t border-border py-8">
      <LogoCloud
        logos={techCompanies.slice(0, 4)}
        title="Proudly built with"
        className="opacity-70"
      />
    </div>
  ),
};
