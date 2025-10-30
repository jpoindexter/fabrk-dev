#!/usr/bin/env node

/**
 * Simple MCP Server for ClearGen - Minimal implementation for debugging
 */

const readline = require("readline");

// Create interface for reading from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// Send a message to stdout
function send(message) {
  const json = JSON.stringify(message);
  console.log(json);
}

// Log to stderr for debugging (visible in Claude Desktop logs)
function log(message) {
  process.stderr.write(`[MCP Server] ${message}\n`);
}

log("Starting ClearGen MCP Server...");

// Handle incoming messages
rl.on("line", (line) => {
  try {
    const message = JSON.parse(line);
    log(`Received: ${message.method || "response"}`);

    handleMessage(message);
  } catch (error) {
    log(`Error parsing message: ${error.message}`);
    send({
      jsonrpc: "2.0",
      id: null,
      error: {
        code: -32700,
        message: "Parse error",
      },
    });
  }
});

// Handle different message types
function handleMessage(message) {
  const { id, method, params } = message;

  switch (method) {
    case "initialize":
      send({
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "0.1.0",
          capabilities: {
            tools: {},
            resources: {},
          },
          serverInfo: {
            name: "cleargen-mcp",
            version: "1.0.0",
          },
        },
      });
      log("Initialized successfully");
      break;

    case "tools/list":
      send({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "test_tool",
              description: "A simple test tool",
              inputSchema: {
                type: "object",
                properties: {},
              },
            },
          ],
        },
      });
      log("Sent tools list");
      break;

    case "tools/call":
      const { name } = params;
      if (name === "test_tool") {
        send({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: "Test tool executed successfully!",
              },
            ],
          },
        });
        log("Executed test_tool");
      } else {
        send({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Unknown tool: ${name}`,
          },
        });
      }
      break;

    case "resources/list":
      send({
        jsonrpc: "2.0",
        id,
        result: {
          resources: [],
        },
      });
      log("Sent resources list");
      break;

    default:
      if (method) {
        log(`Unknown method: ${method}`);
        send({
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Method not found: ${method}`,
          },
        });
      }
  }
}

// Handle process termination
process.on("SIGINT", () => {
  log("Received SIGINT, shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  log("Received SIGTERM, shutting down...");
  process.exit(0);
});

// Keep the process alive
process.stdin.resume();

log("Server ready and listening for messages");
