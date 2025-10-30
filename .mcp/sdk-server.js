#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Create server instance
const server = new Server(
  {
    name: "cleargen-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
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
        description: "List available components in ClearGen",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Component category to filter by",
            },
          },
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "getProjectInfo": {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")
      );
      return {
        content: [
          {
            type: "text",
            text: `ClearGen Project:
- Name: ${packageJson.name}
- Version: ${packageJson.version}
- Description: AI-optimized Next.js SaaS boilerplate
- Components: 100+ pre-built components
- Architecture: Vertical slice architecture`,
          },
        ],
      };
    }

    case "listComponents": {
      const componentsDir = path.join(projectRoot, "src/components");
      const components = [];

      try {
        const dirs = fs.readdirSync(componentsDir);
        for (const dir of dirs) {
          if (!args?.category || dir === args.category) {
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
        components.push({
          category: "ui",
          components: ["button", "card", "dialog", "form", "input"],
        });
      }

      return {
        content: [
          {
            type: "text",
            text: `ClearGen Components:\n${components
              .map(
                (c) => `\n${c.category}:\n${c.components.map((comp) => `  - ${comp}`).join("\n")}`
              )
              .join("\n")}`,
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Define resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "cleargen://readme",
        name: "README",
        description: "ClearGen project documentation",
        mimeType: "text/markdown",
      },
    ],
  };
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "cleargen://readme") {
    try {
      const readme = fs.readFileSync(path.join(projectRoot, "README.md"), "utf8");
      return {
        contents: [
          {
            uri: "cleargen://readme",
            mimeType: "text/markdown",
            text: readme,
          },
        ],
      };
    } catch {
      return {
        contents: [
          {
            uri: "cleargen://readme",
            mimeType: "text/markdown",
            text: "# ClearGen\n\nAI-optimized Next.js SaaS boilerplate.",
          },
        ],
      };
    }
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ClearGen MCP server running");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
