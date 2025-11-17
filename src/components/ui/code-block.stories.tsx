/**
 * ✅ FABRK COMPONENT
 * CodeBlock Stories - Syntax-highlighted code display with copy functionality
 *
 * @see CodeBlock component documentation
 */

import { CodeBlock } from "@/components/ui/code-block";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof CodeBlock> = {
  title: "UI/Data Display/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "select",
      options: ["tsx", "jsx", "typescript", "javascript", "css", "bash", "json", "markdown"],
    },
    showLineNumbers: {
      control: "boolean",
    },
    expandable: {
      control: "boolean",
    },
    maxLines: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const reactExample = `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

const typescriptExample = `interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

function getUserById(id: number): User | undefined {
  return users.find(user => user.id === id);
}`;

const cssExample = `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  font-weight: 500;
  transition: all 0.2s;
}

.button:hover {
  background-color: hsl(var(--primary) / 0.9);
}`;

const bashExample = `# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start`;

const jsonExample = `{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0"
  }
}`;

const longCode = `import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation logic
    const newErrors: Partial<FormData> = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Submit form
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (error: unknown) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </Card>
  );
}`;

/**
 * Default code block
 */
export const Default: Story = {
  args: {
    code: reactExample,
    language: "tsx",
  },
};

/**
 * TypeScript code
 */
export const TypeScript: Story = {
  args: {
    code: typescriptExample,
    language: "typescript",
    fileName: "types.ts",
  },
};

/**
 * CSS code
 */
export const CSS: Story = {
  args: {
    code: cssExample,
    language: "css",
    fileName: "button.css",
  },
};

/**
 * Bash commands
 */
export const Bash: Story = {
  args: {
    code: bashExample,
    language: "bash",
    fileName: "setup.sh",
  },
};

/**
 * JSON data
 */
export const JSON: Story = {
  args: {
    code: jsonExample,
    language: "json",
    fileName: "package.json",
  },
};

/**
 * Without line numbers
 */
export const NoLineNumbers: Story = {
  args: {
    code: reactExample,
    language: "tsx",
    showLineNumbers: false,
  },
};

/**
 * Without file name
 */
export const NoFileName: Story = {
  args: {
    code: reactExample,
    language: "tsx",
    fileName: undefined,
  },
};

/**
 * Expandable code block
 */
export const Expandable: Story = {
  args: {
    code: longCode,
    language: "tsx",
    fileName: "ContactForm.tsx",
    expandable: true,
    maxLines: 15,
  },
};

/**
 * Short snippet
 */
export const ShortSnippet: Story = {
  args: {
    code: `const greeting = "Hello, World!";
return greeting;`,
    language: "javascript",
  },
};

/**
 * Single line
 */
export const SingleLine: Story = {
  args: {
    code: `npm install @radix-ui/react-toast`,
    language: "bash",
    showLineNumbers: false,
  },
};

/**
 * Import statement
 */
export const ImportStatement: Story = {
  args: {
    code: `import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";`,
    language: "tsx",
    fileName: "imports.tsx",
  },
};

/**
 * Function example
 */
export const FunctionExample: Story = {
  args: {
    code: `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage
const result = fibonacci(10); // Returns 55`,
    language: "typescript",
    fileName: "fibonacci.ts",
  },
};

/**
 * API route example
 */
export const APIRoute: Story = {
  args: {
    code: `import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = await fetchData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = await saveData(body);
  return NextResponse.json(result);
}`,
    language: "typescript",
    fileName: "route.ts",
  },
};

/**
 * React component
 */
export const ReactComponent: Story = {
  args: {
    code: `export function Alert({ title, message, variant = "default" }) {
  return (
    <div className={\`alert alert-\${variant}\`}>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}`,
    language: "jsx",
    fileName: "Alert.jsx",
  },
};

/**
 * Tailwind CSS classes
 */
export const TailwindClasses: Story = {
  args: {
    code: `<div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
    Card Title
  </h2>
  <p className="text-gray-600 dark:text-gray-400">
    Card content goes here.
  </p>
</div>`,
    language: "tsx",
    showLineNumbers: false,
  },
};

/**
 * Configuration file
 */
export const ConfigFile: Story = {
  args: {
    code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;`,
    language: "javascript",
    fileName: "next.config.js",
  },
};

/**
 * SQL query
 */
export const SQLQuery: Story = {
  args: {
    code: `SELECT u.id, u.name, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.active = true
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC
LIMIT 10;`,
    language: "sql",
    fileName: "query.sql",
  },
};

/**
 * Environment variables
 */
export const EnvironmentVariables: Story = {
  args: {
    code: `# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# API Keys
NEXT_PUBLIC_API_URL="https://api.example.com"
API_SECRET_KEY="your-secret-key-here"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"`,
    language: "bash",
    fileName: ".env.example",
  },
};
