import type { Meta, StoryObj } from "@storybook/nextjs";
import { CodeBlock } from "./code-block";

const meta: Meta<typeof CodeBlock> = {
  title: "Developer/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

const typescriptCode = `import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex gap-2">
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`;

const jsonCode = `{
  "name": "fabrk-boilerplate",
  "version": "1.0.0",
  "dependencies": {
    "next": "^16.0.3",
    "react": "^19.0.0",
    "tailwindcss": "^4.0.9"
  }
}`;

const pythonCode = `def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example usage
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`;

const bashCode = `#!/bin/bash

# Deploy script
echo "Starting deployment..."

npm run build
npm run test

if [ $? -eq 0 ]; then
  echo "Deployment successful!"
else
  echo "Deployment failed!"
  exit 1
fi`;

export const TypeScript: Story = {
  args: {
    code: typescriptCode,
    language: "typescript",
    filename: "Counter.tsx",
  },
};

export const JSON: Story = {
  args: {
    code: jsonCode,
    language: "json",
    filename: "package.json",
  },
};

export const Python: Story = {
  args: {
    code: pythonCode,
    language: "python",
    filename: "fibonacci.py",
  },
};

export const Bash: Story = {
  args: {
    code: bashCode,
    language: "bash",
    filename: "deploy.sh",
  },
};

export const WithoutFilename: Story = {
  args: {
    code: typescriptCode,
    language: "typescript",
  },
};

export const WithoutLineNumbers: Story = {
  args: {
    code: typescriptCode,
    language: "typescript",
    filename: "example.ts",
    showLineNumbers: false,
  },
};

export const CustomHeight: Story = {
  args: {
    code: typescriptCode.repeat(5),
    language: "typescript",
    filename: "long-file.ts",
    maxHeight: 200,
  },
};

export const SingleLine: Story = {
  args: {
    code: 'npm install @fabrk/boilerplate',
    language: "bash",
    filename: "install.sh",
  },
};
