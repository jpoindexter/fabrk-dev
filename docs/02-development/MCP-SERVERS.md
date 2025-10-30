# MCP Servers

Model Context Protocol (MCP) servers provide AI assistants with tools and context for working with your project.

## Table of Contents

- [Overview](#overview)
- [Available Servers](#available-servers)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

---

## Overview

This project includes MCP servers that enable Claude Code and other AI assistants to:

- **Access project information** - Components, architecture, documentation
- **Run tests** - Unit tests, E2E tests, coverage reports
- **Search code** - Find patterns and components across the codebase
- **Navigate files** - Understand project structure

---

## Available Servers

### 1. Project MCP Server (`.mcp/`)

Located in `.mcp/server.js`, this server provides:

**Tools:**
- `getProjectInfo` - Get project overview and statistics
- `listComponents` - List all UI components
- `getFileStructure` - Navigate project directories
- `searchCode` - Search for code patterns

**Resources:**
- `fabrk://readme` - Main README
- `fabrk://architecture` - Architecture documentation
- `fabrk://testing` - Testing guide

**Prompts:**
- `create-component` - Generate new components
- `add-feature` - Add new features

### 2. Testing MCP Server (`mcp-servers/testing/`)

Located in `mcp-servers/testing/index.js`, this server provides:

**Tools:**
- `runTests` - Run Vitest unit tests
- `runE2eTests` - Run Playwright E2E tests
- `getTestResults` - Retrieve test results
- `getCoverage` - Get coverage reports
- `runLint` - Run ESLint
- `runTypeCheck` - Run TypeScript type checking

---

## Installation

### 1. Install Dependencies

```bash
# Install project MCP server dependencies
cd .mcp
npm install
cd ..

# Install testing MCP server dependencies
cd mcp-servers/testing
npm install
cd ../..
```

### 2. Configure Claude Desktop

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "fabrk-project": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/Fabrk_plate/.mcp/server.js"],
      "env": {
        "PROJECT_NAME": "Fabrk",
        "PROJECT_TYPE": "nextjs-saas-boilerplate"
      }
    },
    "fabrk-testing": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/Fabrk_plate/mcp-servers/testing/index.js"]
    },
    "fabrk-filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/ABSOLUTE/PATH/TO/Fabrk_plate"
      ]
    }
  }
}
```

**Important:** Replace `/ABSOLUTE/PATH/TO/Fabrk_plate` with your actual project path!

To get your absolute path:
```bash
pwd
# Example: /Users/yourname/Documents/GitHub/Fabrk_plate
```

### 3. Restart Claude Desktop

Quit and reopen Claude Desktop to load the MCP servers.

---

## Configuration

### Project MCP Server

The project MCP server can be configured via environment variables:

```json
{
  "env": {
    "PROJECT_NAME": "Fabrk",
    "PROJECT_TYPE": "nextjs-saas-boilerplate"
  }
}
```

### Testing MCP Server

The testing MCP server automatically detects your test configuration from:
- `package.json` - Test scripts
- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration

---

## Usage

### With Claude Code

Once configured, you can use natural language to interact with MCP servers:

#### Project Information
```
"Show me the project structure"
"List all UI components"
"Find uses of forwardRef in the codebase"
"Show me the architecture documentation"
```

#### Testing
```
"Run the unit tests"
"Run E2E tests for the landing page"
"Show me the test coverage"
"Run the linter"
"Check TypeScript types"
```

#### Development
```
"Create a new component called Tooltip"
"Add a feature for notifications"
"Search for authentication code"
```

### Manual Testing

You can test MCP servers manually:

```bash
# Test project MCP server
cd .mcp
node server.js
# Type: {"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}
# Press Ctrl+D

# Test testing MCP server
cd mcp-servers/testing
node index.js
# Type: {"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}
# Press Ctrl+D
```

---

## Available Tools

### Project MCP Server Tools

#### `getProjectInfo`
Get comprehensive project information.

**Usage:**
```
"Show me the project info"
"What's the project structure?"
```

**Returns:**
- Component count
- Documentation locations
- Key commands
- Architecture overview

#### `listComponents`
List all components, optionally filtered by category.

**Parameters:**
- `category` (optional) - Filter by category (e.g., "ui", "forms")

**Usage:**
```
"List all UI components"
"Show me components in the forms category"
```

#### `getFileStructure`
Get a tree view of the file structure.

**Parameters:**
- `path` (optional) - Relative path from project root

**Usage:**
```
"Show me the src/components structure"
"What's in the docs directory?"
```

#### `searchCode`
Search for code patterns across the project.

**Parameters:**
- `pattern` (required) - Search pattern
- `fileType` (optional) - File extensions (default: "ts,tsx")

**Usage:**
```
"Search for 'forwardRef' in the codebase"
"Find all uses of 'Button' in tsx files"
```

### Testing MCP Server Tools

#### `runTests`
Run Vitest unit tests.

**Parameters:**
- `filter` (optional) - Filter by test name/file
- `coverage` (boolean) - Generate coverage report

**Usage:**
```
"Run all unit tests"
"Run button tests with coverage"
```

#### `runE2eTests`
Run Playwright E2E tests.

**Parameters:**
- `testFile` (optional) - Specific test file
- `project` (optional) - Browser project (chromium, firefox, webkit)

**Usage:**
```
"Run E2E tests"
"Run landing page tests in Firefox"
```

#### `getTestResults`
Get the latest test results.

**Usage:**
```
"Show me the test results"
"What was the last test output?"
```

#### `getCoverage`
Get test coverage report.

**Usage:**
```
"Show me the coverage report"
"What's our test coverage?"
```

---

## Troubleshooting

### MCP Server Not Showing in Claude Desktop

**Check:**
1. Config file path is correct
2. Absolute paths used (not relative)
3. Claude Desktop restarted after config changes
4. No JSON syntax errors in config

**Verify:**
```bash
# Check server path exists
ls -la /path/to/Fabrk_plate/.mcp/server.js

# Test server runs
node /path/to/Fabrk_plate/.mcp/server.js
```

### Tools Don't Work

**Check:**
1. Dependencies installed (`npm install` in `.mcp/` and `mcp-servers/testing/`)
2. Project structure matches expected layout
3. Server has read permissions

**Debug:**
```bash
# Check server logs (stderr)
node server.js 2>&1 | grep -i error
```

### Testing Tools Fail

**Check:**
1. Test dependencies installed (`npm install`)
2. Test commands work manually:
   ```bash
   npm run test
   npm run test:e2e
   ```
3. Development server is not already running (for E2E tests)

---

## Architecture

### How MCP Servers Work

```
Claude Desktop/Code
    ↓ (MCP Protocol - JSON-RPC)
MCP Server (stdio)
    ↓
Your Project
    ↓
Returns: Tools, Resources, Prompts
```

### Communication Flow

1. **Claude requests tool** - Sends JSON-RPC request via stdin
2. **MCP server processes** - Executes tool logic
3. **Server responds** - Returns formatted response via stdout
4. **Claude uses result** - Incorporates into context

---

## Extending MCP Servers

### Add a New Tool

Edit `.mcp/server.js` or `mcp-servers/testing/index.js`:

```javascript
// 1. Register tool
{
  name: "myNewTool",
  description: "What it does",
  inputSchema: {
    type: "object",
    properties: {
      param: { type: "string", description: "Parameter" }
    }
  }
}

// 2. Handle tool call
case "myNewTool":
  return await myNewToolImpl(args.param);

// 3. Implement function
async function myNewToolImpl(param) {
  return {
    content: [{ type: "text", text: "Result..." }]
  };
}
```

### Add a New Resource

```javascript
// In resources/list
{
  uri: "fabrk://myresource",
  name: "My Resource",
  description: "Description",
  mimeType: "text/markdown"
}

// In resources/read
case "fabrk://myresource":
  return {
    contents: [{
      uri: "fabrk://myresource",
      mimeType: "text/markdown",
      text: getMyResourceContent()
    }]
  };
```

---

## Resources

- [MCP Specification](https://modelcontextprotocol.io/)
- [MCP SDK](https://github.com/modelcontextprotocol/sdk)
- [Claude Desktop Config](https://docs.anthropic.com/claude/docs/claude-desktop)
- [Testing Guide](./TESTING.md)

---

**Last Updated:** 2025-10-30
