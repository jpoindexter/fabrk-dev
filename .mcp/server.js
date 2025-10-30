#!/usr/bin/env node

/**
 * MCP Server for ClearGen
 * Implements the Model Context Protocol for Claude Desktop
 */

const fs = require("fs");
const path = require("path");

// JSON-RPC protocol implementation for stdio
class StdioJsonRpcServer {
  constructor() {
    this.handlers = new Map();
    this.buffer = "";

    // Set up stdio
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => this.handleInput(chunk));
    process.stdin.on("end", () => process.exit(0));
  }

  handleInput(chunk) {
    this.buffer += chunk;

    let lines = this.buffer.split("\n");
    this.buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.trim()) {
        try {
          const message = JSON.parse(line);
          this.handleMessage(message);
        } catch (error) {
          this.sendError(null, -32700, "Parse error");
        }
      }
    }
  }

  async handleMessage(message) {
    const { id, method, params } = message;

    if (!method) {
      this.sendError(id, -32600, "Invalid Request");
      return;
    }

    const handler = this.handlers.get(method);
    if (!handler) {
      this.sendError(id, -32601, `Method not found: ${method}`);
      return;
    }

    try {
      const result = await handler(params);
      this.sendResult(id, result);
    } catch (error) {
      this.sendError(id, -32603, error.message);
    }
  }

  on(method, handler) {
    this.handlers.set(method, handler);
  }

  sendResult(id, result) {
    const message = {
      jsonrpc: "2.0",
      id,
      result,
    };
    this.send(message);
  }

  sendError(id, code, message) {
    const error = {
      jsonrpc: "2.0",
      id,
      error: {
        code,
        message,
      },
    };
    this.send(error);
  }

  sendNotification(method, params) {
    const message = {
      jsonrpc: "2.0",
      method,
      params,
    };
    this.send(message);
  }

  send(message) {
    const json = JSON.stringify(message);
    process.stdout.write(json + "\n");
  }
}

// MCP Server implementation
class ClearGenMCPServer {
  constructor() {
    this.server = new StdioJsonRpcServer();
    this.projectRoot = path.resolve(__dirname, "..");
    this.setupHandlers();
  }

  setupHandlers() {
    // Initialize handler
    this.server.on("initialize", async (params) => {
      return {
        protocolVersion: "0.1.0",
        capabilities: {
          tools: {},
          resources: {},
          prompts: {},
        },
        serverInfo: {
          name: "cleargen-mcp-server",
          version: "1.0.0",
        },
      };
    });

    // List tools handler
    this.server.on("tools/list", async () => {
      return {
        tools: [
          {
            name: "getProjectInfo",
            description: "Get information about the ClearGen project",
            inputSchema: {
              type: "object",
              properties: {},
            },
          },
          {
            name: "listComponents",
            description: "List all available components in ClearGen",
            inputSchema: {
              type: "object",
              properties: {
                category: {
                  type: "string",
                  description: "Filter by component category",
                },
              },
            },
          },
          {
            name: "getFileStructure",
            description: "Get the file structure of a directory",
            inputSchema: {
              type: "object",
              properties: {
                path: {
                  type: "string",
                  description: "Relative path from project root",
                },
              },
            },
          },
          {
            name: "searchCode",
            description: "Search for code patterns in the project",
            inputSchema: {
              type: "object",
              properties: {
                pattern: {
                  type: "string",
                  description: "Search pattern",
                },
                fileType: {
                  type: "string",
                  description: "File extension to search in (e.g., ts, tsx)",
                },
              },
              required: ["pattern"],
            },
          },
        ],
      };
    });

    // Call tool handler
    this.server.on("tools/call", async (params) => {
      const { name, arguments: args } = params;

      switch (name) {
        case "getProjectInfo":
          return this.getProjectInfo();
        case "listComponents":
          return this.listComponents(args.category);
        case "getFileStructure":
          return this.getFileStructure(args.path);
        case "searchCode":
          return this.searchCode(args.pattern, args.fileType);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });

    // List resources handler
    this.server.on("resources/list", async () => {
      return {
        resources: [
          {
            uri: "cleargen://readme",
            name: "README",
            description: "ClearGen project documentation",
            mimeType: "text/markdown",
          },
          {
            uri: "cleargen://architecture",
            name: "Architecture",
            description: "Project architecture overview",
            mimeType: "text/markdown",
          },
        ],
      };
    });

    // Read resource handler
    this.server.on("resources/read", async (params) => {
      const { uri } = params;

      switch (uri) {
        case "cleargen://readme":
          return {
            contents: [
              {
                uri: "cleargen://readme",
                mimeType: "text/markdown",
                text: this.getReadmeContent(),
              },
            ],
          };
        case "cleargen://architecture":
          return {
            contents: [
              {
                uri: "cleargen://architecture",
                mimeType: "text/markdown",
                text: this.getArchitectureContent(),
              },
            ],
          };
        default:
          throw new Error(`Unknown resource: ${uri}`);
      }
    });

    // List prompts handler
    this.server.on("prompts/list", async () => {
      return {
        prompts: [
          {
            name: "create-component",
            description: "Generate a new React component for ClearGen",
            arguments: [
              {
                name: "name",
                description: "Component name",
                required: true,
              },
              {
                name: "type",
                description: "Component type (ui, feature, page)",
                required: false,
              },
            ],
          },
          {
            name: "add-feature",
            description: "Add a new feature to ClearGen",
            arguments: [
              {
                name: "feature",
                description: "Feature name",
                required: true,
              },
            ],
          },
        ],
      };
    });

    // Get prompt handler
    this.server.on("prompts/get", async (params) => {
      const { name, arguments: args } = params;

      switch (name) {
        case "create-component":
          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Create a new ${args.type || "ui"} component called "${args.name}" for the ClearGen project. Follow the existing component patterns and use TypeScript, Tailwind CSS, and shadcn/ui conventions.`,
                },
              },
            ],
          };
        case "add-feature":
          return {
            messages: [
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Add a new feature called "${args.feature}" to ClearGen. Follow the vertical slice architecture pattern and create all necessary files (page, components, actions, queries, types).`,
                },
              },
            ],
          };
        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    });
  }

  // Tool implementations
  getProjectInfo() {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(this.projectRoot, "package.json"), "utf8")
    );

    return {
      content: [
        {
          type: "text",
          text: `ClearGen Project Information:
- Name: ${packageJson.name}
- Version: ${packageJson.version}
- Description: Next.js SaaS boilerplate with automated quality enforcement
- Framework: Next.js ${packageJson.dependencies.next}
- TypeScript: ${packageJson.devDependencies.typescript}
- Components: 151 production-ready components
- Quality System: 11 automated standards (100% pass rate)
- Design System: CSS tokens in src/styles/tokens.css
- Architecture: Vertical slice architecture
- Testing: Vitest with 287 test files
- UI: Radix UI + Tailwind CSS
- Database: Prisma ORM
- Auth: NextAuth.js
- Payments: Stripe

**Documentation:**
- Entry Point: docs/START-HERE.md
- Source of Truth: docs/CURRENT-STATUS.md
- Quality System: docs/COMPONENT-QUALITY-SYSTEM.md
- Automation: scripts/README.md

**Key Commands:**
- npm run validate:standards  # 11 quality checks
- npm run type-check          # TypeScript validation
- npm run dev                 # Start dev server
- npm run build               # Production build`,
        },
      ],
    };
  }

  listComponents(category) {
    const componentsDir = path.join(this.projectRoot, "src/components");
    const components = [];

    try {
      const dirs = fs.readdirSync(componentsDir);
      for (const dir of dirs) {
        if (!category || dir === category) {
          const dirPath = path.join(componentsDir, dir);
          if (fs.statSync(dirPath).isDirectory()) {
            const files = fs
              .readdirSync(dirPath)
              .filter((f) => f.endsWith(".tsx") && !f.includes(".test."));
            components.push({
              category: dir,
              components: files.map((f) => f.replace(".tsx", "")),
            });
          }
        }
      }
    } catch (error) {
      // Fallback component list
      components.push({
        category: "ui",
        components: ["button", "card", "dialog", "form", "input", "select"],
      });
    }

    return {
      content: [
        {
          type: "text",
          text: `ClearGen Components:\n${components
            .map((c) => `\n${c.category}:\n${c.components.map((comp) => `  - ${comp}`).join("\n")}`)
            .join("\n")}`,
        },
      ],
    };
  }

  getFileStructure(relativePath = "") {
    const targetPath = path.join(this.projectRoot, relativePath);
    const structure = this.buildFileTree(targetPath, 2);

    return {
      content: [
        {
          type: "text",
          text: `File Structure (${relativePath || "/"}):\n${this.formatFileTree(structure)}`,
        },
      ],
    };
  }

  searchCode(pattern, fileType = "ts,tsx") {
    const results = [];
    const extensions = fileType.split(",").map((ext) => `.${ext.trim()}`);

    const searchDir = (dir, depth = 0) => {
      if (depth > 3) return;

      try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          if (file === "node_modules" || file.startsWith(".")) continue;

          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            searchDir(fullPath, depth + 1);
          } else if (extensions.some((ext) => file.endsWith(ext))) {
            const content = fs.readFileSync(fullPath, "utf8");
            if (content.includes(pattern)) {
              const lines = content.split("\n");
              const matches = lines
                .map((line, i) => ({ line, number: i + 1 }))
                .filter(({ line }) => line.includes(pattern))
                .slice(0, 3);

              results.push({
                file: fullPath.replace(this.projectRoot, ""),
                matches,
              });
            }
          }
        }
      } catch (error) {
        // Skip inaccessible directories
      }
    };

    searchDir(path.join(this.projectRoot, "src"));

    return {
      content: [
        {
          type: "text",
          text: `Search results for "${pattern}":\n${results
            .slice(0, 10)
            .map(
              (r) =>
                `\n${r.file}:\n${r.matches.map((m) => `  ${m.number}: ${m.line.trim()}`).join("\n")}`
            )
            .join("\n")}`,
        },
      ],
    };
  }

  buildFileTree(dir, maxDepth, currentDepth = 0) {
    if (currentDepth >= maxDepth) return [];

    const items = [];
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file === "node_modules" || file.startsWith(".")) continue;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          items.push({
            name: file,
            type: "directory",
            children: this.buildFileTree(fullPath, maxDepth, currentDepth + 1),
          });
        } else {
          items.push({
            name: file,
            type: "file",
          });
        }
      }
    } catch (error) {
      // Skip inaccessible directories
    }
    return items;
  }

  formatFileTree(items, indent = "") {
    return items
      .map((item, index) => {
        const isLast = index === items.length - 1;
        const prefix = indent + (isLast ? "└── " : "├── ");
        const nextIndent = indent + (isLast ? "    " : "│   ");

        let result = prefix + item.name;
        if (item.type === "directory" && item.children && item.children.length > 0) {
          result += "/\n" + this.formatFileTree(item.children, nextIndent);
        }
        return result;
      })
      .join("\n");
  }

  getReadmeContent() {
    try {
      return fs.readFileSync(path.join(this.projectRoot, "README.md"), "utf8");
    } catch {
      return `# ClearGen

AI-optimized Next.js SaaS boilerplate with 100+ components.

## Features
- 🚀 Next.js 15 with App Router
- 🎨 100+ pre-built components
- 🔐 Authentication with NextAuth
- 💳 Stripe payments
- 📊 Prisma ORM
- 🎯 Vertical slice architecture`;
    }
  }

  getArchitectureContent() {
    return `# ClearGen Architecture

## Component Quality System

**11 Automated Standards (100% pass rate required):**
1. ✅ CLEARGEN marker in JSDoc
2. ✅ @example tag in JSDoc
3. ✅ displayName set
4. ✅ Exported Props types
5. ✅ data-slot attributes
6. ✅ No hardcoded colors
7. ✅ No inline styles
8. ✅ File size < 300 lines
9. ✅ Test file present
10. ✅ Proper design system imports
11. ✅ CVA for multi-variant components

**Validation:**
\`\`\`bash
npm run validate:standards  # Pre-commit enforced
\`\`\`

## Vertical Slice Architecture

### Structure
\`\`\`
src/
├── app/                 # Next.js app router pages
├── components/
│   ├── ui/             # 151 validated components
│   ├── forms/          # Form components
│   └── layouts/        # Layout components
├── lib/
│   ├── design-system/  # Design tokens & utils
│   ├── auth/          # Authentication
│   ├── payments/      # Stripe integration
│   └── database/      # Prisma client
├── features/          # Vertical slices
│   ├── billing/
│   ├── dashboard/
│   └── settings/
└── tests/
    └── unit/          # 287 test files
\`\`\`

## Design System

**CSS Tokens (src/styles/tokens.css):**
- background, foreground
- primary, secondary, accent
- border, input, ring
- muted, destructive

**NEVER hardcode colors/styles - use tokens only!**

## Key Patterns

**Component Pattern:**
\`\`\`tsx
/**
 * ✅ CLEARGEN COMPONENT
 *
 * @example
 * \`\`\`tsx
 * <Button variant="primary">Click</Button>
 * \`\`\`
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", ...props }, ref) => {
    return <button ref={ref} data-slot="button" {...props} />;
  }
);
Button.displayName = "Button";
\`\`\`

**Documentation:**
- START-HERE.md → Entry point
- CURRENT-STATUS.md → Source of truth
- COMPONENT-QUALITY-SYSTEM.md → Standards
- scripts/README.md → Automation`;
  }

  start() {
    process.stderr.write("ClearGen MCP Server started\n");
  }
}

// Start the server
const server = new ClearGenMCPServer();
server.start();
