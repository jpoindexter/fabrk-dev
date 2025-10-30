# ClearGen MCP Server

**Model Context Protocol server for ClearGen - enables AI assistants to understand and work with the project.**

---

## 🎯 What This Does

This MCP server provides AI assistants (Claude Desktop, Cline, etc.) with:
- **Project information** - 151 components, 11 quality standards, architecture
- **Component discovery** - List and search all UI components
- **File structure** - Navigate project organization
- **Code search** - Find patterns across the codebase
- **Documentation access** - README, architecture, quality system
- **Prompts** - Pre-configured prompts for component creation

---

## 📦 Installation

### 1. Install Dependencies

```bash
cd .mcp
npm install
```

### 2. Configure Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "cleargen": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/Documents/GitHub/ClearGen/.mcp/server.js"],
      "env": {
        "PROJECT_NAME": "ClearGen",
        "PROJECT_TYPE": "nextjs-saas-boilerplate"
      }
    },
    "cleargen-filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/YOUR_USERNAME/Documents/GitHub/ClearGen"
      ]
    },
    "cleargen-memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

**Replace `/Users/YOUR_USERNAME/Documents/GitHub/ClearGen` with your actual path!**

### 3. Restart Claude Desktop

Quit and reopen Claude Desktop to load the MCP servers.

---

## 🛠️ Available Tools

### `getProjectInfo`
Get comprehensive ClearGen project information including:
- Component count (151)
- Quality standards (11)
- Documentation locations
- Key commands

**Usage:**
```
Can you show me the ClearGen project info?
```

### `listComponents`
List all available components, optionally filtered by category.

**Parameters:**
- `category` (optional) - Filter by category (e.g., "ui", "forms")

**Usage:**
```
List all UI components
Show me all components in the forms category
```

### `getFileStructure`
Get a tree view of the file structure.

**Parameters:**
- `path` (optional) - Relative path from project root

**Usage:**
```
Show me the src/components file structure
What's in the docs directory?
```

### `searchCode`
Search for code patterns across the project.

**Parameters:**
- `pattern` (required) - Search pattern
- `fileType` (optional) - File extensions (default: "ts,tsx")

**Usage:**
```
Search for "forwardRef" in the codebase
Find all uses of "data-slot" in tsx files
```

---

## 📚 Resources

The MCP server provides these documentation resources:

### `cleargen://readme`
Main README with project overview, setup, and quickstart.

### `cleargen://architecture`
Architecture overview including:
- 11 quality standards
- Component patterns
- Design system rules
- Documentation locations

**Usage:**
```
Show me the ClearGen architecture
What are the quality standards?
```

---

## 🎯 Prompts

Pre-configured prompts for common tasks:

### `create-component`
Generate a new component following ClearGen patterns.

**Arguments:**
- `name` (required) - Component name
- `type` (optional) - Component type (ui, feature, page)

**Usage:**
```
Create a new UI component called "Tooltip"
Add a feature component called "UserProfile"
```

### `add-feature`
Add a new feature using vertical slice architecture.

**Arguments:**
- `feature` (required) - Feature name

**Usage:**
```
Add a new feature called "notifications"
Create a billing feature
```

---

## 🔧 Configuration

### Environment Variables

The MCP server supports these environment variables:

```bash
PROJECT_NAME=ClearGen
PROJECT_TYPE=nextjs-saas-boilerplate
```

These are set in the Claude Desktop config.

### Files

- **`server.js`** - Main MCP server implementation
- **`sdk-server.js`** - Alternative SDK-based implementation
- **`simple-server.js`** - Minimal example server
- **`package.json`** - Dependencies and scripts

---

## 🧪 Testing

Test the MCP server locally:

```bash
# Start the server
node server.js

# Send a test request (in another terminal)
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | node server.js
```

---

## 📖 Integration with ClearGen

The MCP server is aware of:

### Documentation Structure
- `docs/START-HERE.md` - Entry point
- `docs/CURRENT-STATUS.md` - Source of truth
- `docs/COMPONENT-QUALITY-SYSTEM.md` - Quality standards
- `scripts/README.md` - Automation guide

### Quality System
- 11 automated standards
- 100% pass rate requirement
- Pre-commit validation
- `npm run validate:standards`

### Component Patterns
- forwardRef usage
- Exported Props types
- data-slot attributes
- displayName required
- JSDoc with examples

### Design System
- CSS tokens only (no hardcoded colors)
- No inline styles
- Tailwind CSS utilities
- `src/styles/tokens.css`

---

## 🔍 How It Works

The MCP server:

1. **Listens on stdio** - Communicates via JSON-RPC over stdin/stdout
2. **Implements MCP protocol** - Tools, resources, and prompts
3. **Reads project files** - Scans `src/components`, docs, package.json
4. **Returns formatted responses** - Markdown-formatted text for Claude

**Architecture:**
```
Claude Desktop
    ↓ (MCP protocol)
StdioJsonRpcServer
    ↓
ClearGenMCPServer
    ↓
Reads: package.json, src/, docs/
```

---

## 🎯 Benefits for AI Assistants

With this MCP server, Claude can:

✅ **Understand project structure** - Without manually reading files
✅ **Know quality standards** - 11 standards, validation commands
✅ **Find components quickly** - List and search tools
✅ **Follow patterns** - Access to architecture and examples
✅ **Create compliant code** - Prompts pre-configured for ClearGen
✅ **Access documentation** - README, architecture via resources

---

## 🆘 Troubleshooting

### Server not showing in Claude Desktop

**Check:**
1. Config file path is correct (`~/Library/Application Support/Claude/claude_desktop_config.json`)
2. Absolute paths used (not relative)
3. Claude Desktop restarted after config changes
4. No JSON syntax errors in config

**Test:**
```bash
# Verify server.js path exists
ls -la /Users/YOUR_USERNAME/Documents/GitHub/ClearGen/.mcp/server.js

# Test server runs
node /Users/YOUR_USERNAME/Documents/GitHub/ClearGen/.mcp/server.js
# Should print: "ClearGen MCP Server started"
```

### Server starts but tools don't work

**Check:**
1. `package.json` exists in project root
2. `src/components` directory exists
3. Server has read permissions

**Debug:**
```bash
# Check stderr for errors (server logs go to stderr)
node server.js 2>&1 | grep -i error
```

### Wrong project information returned

**Fix:**
Update `server.js` if project details changed:
- Component count
- Documentation locations
- Quality standards

---

## 📝 Extending the Server

### Add a New Tool

1. **Register tool in `tools/list` handler:**
```javascript
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
```

2. **Handle tool call in `tools/call` handler:**
```javascript
case "myNewTool":
  return this.myNewToolImpl(args.param);
```

3. **Implement the tool:**
```javascript
myNewToolImpl(param) {
  return {
    content: [{ type: "text", text: "Result..." }]
  };
}
```

### Add a New Resource

```javascript
// In resources/list
{
  uri: "cleargen://myresource",
  name: "My Resource",
  description: "Description",
  mimeType: "text/markdown"
}

// In resources/read
case "cleargen://myresource":
  return {
    contents: [{
      uri: "cleargen://myresource",
      mimeType: "text/markdown",
      text: this.getMyResourceContent()
    }]
  };
```

---

## 🚀 Future Enhancements

**Potential additions:**
- [ ] Real-time file watching
- [ ] Component usage statistics
- [ ] Quality metrics dashboard
- [ ] Code generation templates
- [ ] Test generation prompts
- [ ] Git integration tools
- [ ] Build status monitoring

---

## 📚 Resources

- **MCP Specification:** https://modelcontextprotocol.io/
- **MCP SDK:** https://github.com/modelcontextprotocol/sdk
- **Claude Desktop Config:** https://docs.anthropic.com/claude/docs/claude-desktop
- **ClearGen Docs:** `../docs/START-HERE.md`

---

**Last Updated:** 2025-01-04
**Maintained by:** ClearGen Team
