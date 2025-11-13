import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: '450px' }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Fabrk?</AccordionTrigger>
        <AccordionContent>
          Fabrk is a production-ready SaaS boilerplate with authentication, payments, database, and
          email built-in.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What tech stack does it use?</AccordionTrigger>
        <AccordionContent>
          Next.js 15, TypeScript, Tailwind CSS, Prisma, NextAuth, Stripe, and React Email.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it customizable?</AccordionTrigger>
        <AccordionContent>
          Yes! Fabrk is fully customizable with design tokens, theme support, and modular
          components.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" style={{ width: '450px' }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Features</AccordionTrigger>
        <AccordionContent>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>Authentication with NextAuth v5</li>
            <li>Stripe payment integration</li>
            <li>PostgreSQL database with Prisma</li>
            <li>React Email templates</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Components</AccordionTrigger>
        <AccordionContent>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>25+ UI components from Radix</li>
            <li>Neo-brutalism design system</li>
            <li>6 color themes available</li>
            <li>Dark mode support</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Deployment</AccordionTrigger>
        <AccordionContent>
          Deploy to Vercel with one click. Supports Docker and containerized deployments.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ width: '500px' }}>
      <AccordionItem value="pricing">
        <AccordionTrigger>What pricing plans do you offer?</AccordionTrigger>
        <AccordionContent>
          We offer three plans: Starter ($99/month), Professional ($299/month), and Enterprise
          ($999/month). All plans include unlimited projects and 24/7 support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="refund">
        <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
        <AccordionContent>
          Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact support for
          a full refund.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>What kind of support do you provide?</AccordionTrigger>
        <AccordionContent>
          All plans include email support with 24-hour response time. Professional and Enterprise
          plans get priority support with 4-hour response time and dedicated Slack channels.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="updates">
        <AccordionTrigger>How often do you release updates?</AccordionTrigger>
        <AccordionContent>
          We ship updates weekly, including bug fixes, new features, and security patches. All
          updates are free for active subscribers.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="item-2" style={{ width: '450px' }}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>Content for section 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2 (Open by default)</AccordionTrigger>
        <AccordionContent>This section starts open when the accordion loads.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>Content for section 3</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
