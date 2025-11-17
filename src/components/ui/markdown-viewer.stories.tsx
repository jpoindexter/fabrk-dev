/**
 * ✅ FABRK COMPONENT
 * MarkdownViewer Stories - Formatted markdown content display
 *
 * @see MarkdownViewer component documentation
 */

import { MarkdownViewer } from "@/components/ui/markdown-viewer";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof MarkdownViewer> = {
  title: "UI/Data Display/MarkdownViewer",
  component: MarkdownViewer,
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
type Story = StoryObj<typeof MarkdownViewer>;

const simpleMarkdown = `
<h1>Hello World</h1>
<p>This is a simple paragraph of text.</p>
`;

const articleMarkdown = `
<article>
  <h1>Getting Started with Next.js</h1>
  <p>Next.js is a powerful React framework that makes it easy to build fast, user-friendly web applications.</p>

  <h2>Installation</h2>
  <p>To get started, run the following command:</p>
  <pre><code>npx create-next-app@latest</code></pre>

  <h2>Key Features</h2>
  <ul>
    <li>Server-side rendering</li>
    <li>Static site generation</li>
    <li>API routes</li>
    <li>File-based routing</li>
  </ul>

  <p>Learn more at <a href="https://nextjs.org">nextjs.org</a></p>
</article>
`;

const documentationMarkdown = `
<div>
  <h1>Component API Documentation</h1>

  <h2>Props</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>className</td>
        <td>string</td>
        <td>-</td>
        <td>Additional CSS classes</td>
      </tr>
      <tr>
        <td>loading</td>
        <td>boolean</td>
        <td>false</td>
        <td>Show loading state</td>
      </tr>
    </tbody>
  </table>

  <h2>Usage</h2>
  <pre><code>&lt;MarkdownViewer content={markdown} /&gt;</code></pre>
</div>
`;

const blogPostMarkdown = `
<article>
  <h1>The Future of Web Development</h1>
  <p><em>Published on January 15, 2025</em></p>

  <p>Web development continues to evolve at a rapid pace. Here are some trends to watch in 2025:</p>

  <h2>1. Server Components</h2>
  <p>React Server Components are changing how we think about rendering. They allow us to build faster, more efficient applications by moving more work to the server.</p>

  <h2>2. Edge Computing</h2>
  <p>Edge functions are becoming increasingly popular, enabling developers to run code closer to users for improved performance.</p>

  <blockquote>
    <p>"The edge is the new cloud" - Industry Expert</p>
  </blockquote>

  <h2>3. TypeScript Everywhere</h2>
  <p>TypeScript adoption continues to grow, with more frameworks and libraries providing first-class TypeScript support.</p>

  <h3>Benefits of TypeScript:</h3>
  <ul>
    <li>Better tooling and autocomplete</li>
    <li>Catch errors before runtime</li>
    <li>Improved code documentation</li>
    <li>Easier refactoring</li>
  </ul>

  <p>These trends are shaping the future of how we build for the web.</p>
</article>
`;

const codeExampleMarkdown = `
<div>
  <h1>Code Examples</h1>

  <h2>JavaScript</h2>
  <pre><code>function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));</code></pre>

  <h2>TypeScript</h2>
  <pre><code>interface User {
  id: number;
  name: string;
}

function getUser(id: number): User {
  return { id, name: 'John' };
}</code></pre>

  <h2>CSS</h2>
  <pre><code>.button {
  padding: 0.5rem 1rem;
  background: blue;
  color: white;
  border-radius: 4px;
}</code></pre>
</div>
`;

const listMarkdown = `
<div>
  <h1>Task List</h1>

  <h2>Ordered List</h2>
  <ol>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ol>

  <h2>Unordered List</h2>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>

  <h2>Nested List</h2>
  <ul>
    <li>Parent item
      <ul>
        <li>Child item 1</li>
        <li>Child item 2</li>
      </ul>
    </li>
    <li>Another parent</li>
  </ul>
</div>
`;

const formattedTextMarkdown = `
<div>
  <h1>Text Formatting</h1>

  <p>This text contains <strong>bold</strong>, <em>italic</em>, and <code>inline code</code>.</p>

  <p>You can also have <strong><em>bold and italic</em></strong> combined.</p>

  <p>Here's a link to <a href="https://example.com">example.com</a>.</p>

  <hr />

  <p>Horizontal rules separate content.</p>
</div>
`;

/**
 * Default markdown viewer
 */
export const Default: Story = {
  args: {
    content: simpleMarkdown,
  },
};

/**
 * Article content
 */
export const Article: Story = {
  args: {
    content: articleMarkdown,
  },
};

/**
 * Documentation
 */
export const Documentation: Story = {
  args: {
    content: documentationMarkdown,
  },
};

/**
 * Blog post
 */
export const BlogPost: Story = {
  args: {
    content: blogPostMarkdown,
  },
};

/**
 * Code examples
 */
export const CodeExamples: Story = {
  args: {
    content: codeExampleMarkdown,
  },
};

/**
 * Lists
 */
export const Lists: Story = {
  args: {
    content: listMarkdown,
  },
};

/**
 * Formatted text
 */
export const FormattedText: Story = {
  args: {
    content: formattedTextMarkdown,
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
 * Empty content
 */
export const Empty: Story = {
  args: {
    content: "",
  },
};

/**
 * Help documentation
 */
export const HelpDocumentation: Story = {
  args: {
    content: `
<div>
  <h1>Help Center</h1>

  <h2>Frequently Asked Questions</h2>

  <h3>How do I get started?</h3>
  <p>Getting started is easy! Simply create an account and follow the onboarding process.</p>

  <h3>What payment methods do you accept?</h3>
  <p>We accept all major credit cards, PayPal, and bank transfers.</p>

  <h3>Can I cancel my subscription?</h3>
  <p>Yes, you can cancel your subscription at any time from the account settings page.</p>

  <h2>Contact Support</h2>
  <p>If you need further assistance, please email us at <a href="mailto:support@example.com">support@example.com</a>.</p>
</div>
    `,
  },
};

/**
 * Release notes
 */
export const ReleaseNotes: Story = {
  args: {
    content: `
<div>
  <h1>Version 2.0.0 Release Notes</h1>
  <p><em>Released: January 15, 2025</em></p>

  <h2>New Features</h2>
  <ul>
    <li>Added dark mode support</li>
    <li>Improved performance by 40%</li>
    <li>New dashboard widgets</li>
    <li>Enhanced security features</li>
  </ul>

  <h2>Bug Fixes</h2>
  <ul>
    <li>Fixed login redirect issue</li>
    <li>Resolved data export error</li>
    <li>Corrected timezone calculations</li>
  </ul>

  <h2>Breaking Changes</h2>
  <p><strong>Important:</strong> The API endpoint structure has changed. Please update your integrations.</p>

  <h2>Upgrade Guide</h2>
  <ol>
    <li>Backup your data</li>
    <li>Update dependencies</li>
    <li>Run migration scripts</li>
    <li>Test thoroughly</li>
  </ol>
</div>
    `,
  },
};

/**
 * Terms of service
 */
export const TermsOfService: Story = {
  args: {
    content: `
<div>
  <h1>Terms of Service</h1>
  <p><em>Last updated: January 15, 2025</em></p>

  <h2>1. Agreement to Terms</h2>
  <p>By accessing our service, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

  <h2>2. Use License</h2>
  <p>Permission is granted to temporarily use our service for personal, non-commercial purposes.</p>

  <h3>This license shall not allow you to:</h3>
  <ul>
    <li>Modify or copy the materials</li>
    <li>Use the materials for commercial purposes</li>
    <li>Attempt to reverse engineer any software</li>
    <li>Remove any copyright or proprietary notations</li>
  </ul>

  <h2>3. Disclaimer</h2>
  <p>The materials on our service are provided "as is". We make no warranties, expressed or implied.</p>

  <h2>4. Contact Information</h2>
  <p>For questions about these Terms, contact us at <a href="mailto:legal@example.com">legal@example.com</a>.</p>
</div>
    `,
  },
};

/**
 * Tutorial
 */
export const Tutorial: Story = {
  args: {
    content: `
<div>
  <h1>Building Your First Component</h1>

  <p>In this tutorial, we'll create a simple button component from scratch.</p>

  <h2>Step 1: Create the File</h2>
  <p>Create a new file called <code>Button.tsx</code>:</p>
  <pre><code>export function Button() {
  return &lt;button&gt;Click me&lt;/button&gt;;
}</code></pre>

  <h2>Step 2: Add Props</h2>
  <p>Let's make it more flexible with props:</p>
  <pre><code>interface ButtonProps {
  label: string;
  onClick: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
}</code></pre>

  <h2>Step 3: Add Styling</h2>
  <p>Apply some basic styles:</p>
  <pre><code>&lt;button
  className="px-4 py-2 bg-info text-white rounded"
  onClick={onClick}
&gt;
  {label}
&lt;/button&gt;</code></pre>

  <h2>Conclusion</h2>
  <p>You now have a reusable button component! Next steps:</p>
  <ul>
    <li>Add variant props for different styles</li>
    <li>Add size options</li>
    <li>Include icon support</li>
  </ul>
</div>
    `,
  },
};

/**
 * Privacy policy
 */
export const PrivacyPolicy: Story = {
  args: {
    content: `
<div>
  <h1>Privacy Policy</h1>
  <p><em>Effective date: January 15, 2025</em></p>

  <h2>Information We Collect</h2>
  <p>We collect information that you provide directly to us, including:</p>
  <ul>
    <li>Name and contact information</li>
    <li>Account credentials</li>
    <li>Payment information</li>
    <li>Communications with us</li>
  </ul>

  <h2>How We Use Your Information</h2>
  <p>We use the information we collect to:</p>
  <ol>
    <li>Provide and maintain our services</li>
    <li>Process transactions</li>
    <li>Send you updates and marketing materials</li>
    <li>Improve our services</li>
  </ol>

  <h2>Data Security</h2>
  <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

  <h2>Your Rights</h2>
  <p>You have the right to:</p>
  <ul>
    <li>Access your personal data</li>
    <li>Correct inaccurate data</li>
    <li>Request deletion of your data</li>
    <li>Object to processing</li>
  </ul>

  <h2>Contact Us</h2>
  <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:privacy@example.com">privacy@example.com</a>.</p>
</div>
    `,
  },
};
