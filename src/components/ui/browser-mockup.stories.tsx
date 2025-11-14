/**
 * ✅ FABRK COMPONENT
 * BrowserMockup Stories - Chrome-style window frame for showcasing applications
 *
 * @see BrowserMockup component documentation
 */

import { BrowserMockup } from "@/components/ui/browser-mockup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { BarChart3, Calendar, Home, Search, Settings, User } from "lucide-react";

const meta: Meta<typeof BrowserMockup> = {
  title: "UI/Layout/BrowserMockup",
  component: BrowserMockup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    url: {
      control: "text",
    },
    showUrl: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BrowserMockup>;

/**
 * Default browser mockup
 */
export const Default: Story = {
  args: {
    url: "dashboard.fabrk.dev",
    children: (
      <div className="flex h-96 items-center justify-center bg-gray-50 p-8">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">Welcome to Dashboard</h2>
          <p className="text-gray-600">Your application content goes here</p>
        </div>
      </div>
    ),
  },
};

/**
 * Dashboard interface
 */
export const Dashboard: Story = {
  render: () => (
    <BrowserMockup url="app.example.com/dashboard" className="w-[900px]">
      <div className="bg-gray-50 p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Export
            </Button>
            <Button size="sm">New Report</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          {[
            { label: "Total Users", value: "2,543" },
            { label: "Revenue", value: "$45.2K" },
            { label: "Orders", value: "1,234" },
            { label: "Growth", value: "+12.5%" },
          ].map((stat, i) => (
            <Card key={i} className="p-4">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Chart Placeholder */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
            <Button size="sm" variant="ghost">
              <BarChart3 className="size-4" />
            </Button>
          </div>
          <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-500">
            Chart visualization
          </div>
        </Card>
      </div>
    </BrowserMockup>
  ),
};

/**
 * Login page
 */
export const LoginPage: Story = {
  render: () => (
    <BrowserMockup url="app.example.com/login" className="w-[600px]">
      <div className="flex min-h-96 items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <Card className="w-full max-w-md p-6">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-1 text-sm text-gray-600">Sign in to your account</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <Button className="w-full">Sign In</Button>
          </div>
        </Card>
      </div>
    </BrowserMockup>
  ),
};

/**
 * Landing page
 */
export const LandingPage: Story = {
  render: () => (
    <BrowserMockup url="example.com" className="w-[900px]">
      <div className="bg-white">
        {/* Navigation */}
        <nav className="border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900">Brand</div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Features
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Pricing
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                About
              </a>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="px-8 py-20 text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            Build Something Amazing
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            The best platform for your next project
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Start Free Trial</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 px-8 py-16">
          <div className="grid grid-cols-3 gap-8">
            {["Fast", "Secure", "Scalable"].map((feature) => (
              <Card key={feature} className="p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{feature}</h3>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </BrowserMockup>
  ),
};

/**
 * Settings page
 */
export const SettingsPage: Story = {
  render: () => (
    <BrowserMockup url="app.example.com/settings" className="w-[800px]">
      <div className="flex min-h-[500px]">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 bg-gray-50 p-4">
          <nav className="space-y-1">
            {[
              { icon: User, label: "Profile" },
              { icon: Settings, label: "General" },
              { icon: Calendar, label: "Notifications" },
              { icon: Search, label: "Privacy" },
            ].map((item, i) => (
              <button
                key={i}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="size-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">Settings</h1>
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value="John Doe"
                className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value="john@example.com"
                className="w-full max-w-md rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </BrowserMockup>
  ),
};

/**
 * Without URL bar
 */
export const NoUrlBar: Story = {
  args: {
    showUrl: false,
    children: (
      <div className="flex h-64 items-center justify-center bg-white p-8">
        <h2 className="text-2xl font-bold text-gray-900">Clean Browser Frame</h2>
      </div>
    ),
  },
};

/**
 * Custom URL
 */
export const CustomUrl: Story = {
  args: {
    url: "myapp.production.com/admin",
    children: (
      <div className="flex h-64 items-center justify-center bg-gray-50 p-8">
        <h2 className="text-xl font-semibold text-gray-900">Custom Domain</h2>
      </div>
    ),
  },
};

/**
 * Blog post
 */
export const BlogPost: Story = {
  render: () => (
    <BrowserMockup url="blog.example.com/post-title" className="w-[700px]">
      <div className="bg-white p-8">
        <article className="prose max-w-none">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Getting Started with Next.js
          </h1>
          <p className="mb-6 text-sm text-gray-600">Published on January 15, 2025</p>

          <p className="mb-4 text-gray-700">
            Next.js is a powerful React framework that enables you to build fast, user-friendly
            web applications with ease. In this guide, we'll walk through the basics.
          </p>

          <h2 className="mb-3 mt-6 text-2xl font-bold text-gray-900">Installation</h2>
          <p className="mb-4 text-gray-700">
            To get started, you'll need to have Node.js installed on your machine. Then run:
          </p>

          <pre className="mb-6 rounded-md bg-gray-900 p-4 text-sm text-white">
            npx create-next-app@latest
          </pre>

          <h2 className="mb-3 text-2xl font-bold text-gray-900">Project Structure</h2>
          <p className="text-gray-700">
            Next.js uses a file-based routing system. Each file in the pages directory
            automatically becomes a route.
          </p>
        </article>
      </div>
    </BrowserMockup>
  ),
};

/**
 * E-commerce product page
 */
export const ProductPage: Story = {
  render: () => (
    <BrowserMockup url="shop.example.com/product/123" className="w-[800px]">
      <div className="bg-white p-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
            <span className="text-gray-400">Product Image</span>
          </div>

          {/* Details */}
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">Premium Headphones</h1>
            <p className="mb-4 text-2xl font-semibold text-blue-600">$299.99</p>
            <p className="mb-6 text-gray-600">
              High-quality wireless headphones with active noise cancellation and premium sound.
            </p>

            <div className="mb-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Color</label>
                <div className="flex gap-2">
                  {["Black", "White", "Silver"].map((color) => (
                    <button
                      key={color}
                      className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:border-gray-400"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </BrowserMockup>
  ),
};

/**
 * Email interface
 */
export const EmailInterface: Story = {
  render: () => (
    <BrowserMockup url="mail.example.com" className="w-[900px]">
      <div className="flex h-[500px]">
        {/* Sidebar */}
        <div className="w-56 border-r border-gray-200 bg-gray-50 p-4">
          <Button className="mb-4 w-full">Compose</Button>
          <nav className="space-y-1">
            {["Inbox", "Sent", "Drafts", "Spam", "Trash"].map((folder) => (
              <button
                key={folder}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {folder}
              </button>
            ))}
          </nav>
        </div>

        {/* Email List */}
        <div className="w-80 border-r border-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="border-b border-gray-200 p-4 hover:bg-gray-50"
            >
              <p className="font-medium text-gray-900">Email Subject {i}</p>
              <p className="mt-1 text-sm text-gray-600">Preview text...</p>
            </div>
          ))}
        </div>

        {/* Email Content */}
        <div className="flex-1 p-6">
          <h2 className="mb-2 text-xl font-bold text-gray-900">Email Subject</h2>
          <p className="mb-4 text-sm text-gray-600">From: sender@example.com</p>
          <p className="text-gray-700">Email content would appear here...</p>
        </div>
      </div>
    </BrowserMockup>
  ),
};

/**
 * Small size
 */
export const SmallSize: Story = {
  args: {
    url: "mini.app",
    className: "w-[400px]",
    children: (
      <div className="flex h-48 items-center justify-center bg-white p-4">
        <p className="text-center text-sm text-gray-700">Compact browser mockup</p>
      </div>
    ),
  },
};

/**
 * Full width
 */
export const FullWidth: Story = {
  args: {
    url: "wideapp.com",
    className: "w-full max-w-6xl",
    children: (
      <div className="flex h-64 items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-8">
        <h2 className="text-3xl font-bold text-gray-900">Full Width Display</h2>
      </div>
    ),
  },
};
