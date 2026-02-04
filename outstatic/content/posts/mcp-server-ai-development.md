---
title: 'MCP Server: AI-Assisted Development for Fabrk'
status: 'published'
author:
  name: 'Fabrk Team'
slug: 'mcp-server-ai-development'
description: 'Fabrk includes an MCP server that gives AI tools (Claude Code, Cursor) deep knowledge of the codebase. Generate components, pages, and features with context.'
publishedAt: '2026-01-23T10:00:00.000Z'
---

**Give your AI tools superpowers with MCP.**

---

## What is MCP?

Model Context Protocol (MCP) is a standard for giving AI tools context about your codebase.

Instead of AI guessing your patterns, MCP provides:

- Component library documentation
- Design system rules
- Code patterns and examples
- Project structure knowledge

---

## Fabrk's MCP Server

Fabrk includes a pre-built MCP server:

```
mcp-servers/fabrk/
├── src/
│   ├── index.ts       # Server entry
│   ├── tools.ts       # Available tools
│   └── knowledge/     # Codebase knowledge
├── package.json
└── README.md
```

---

## Installation

Build the MCP server:

```bash
cd mcp-servers/fabrk
npm install
npm run build
```

Configure Claude Code or Cursor to use it:

```json
// Claude Code config
{
  "mcpServers": {
    "fabrk": {
      "command": "node",
      "args": ["./mcp-servers/fabrk/dist/index.js"]
    }
  }
}
```

---

## Available Tools

The MCP server provides these tools to AI:

### list_components

List all available UI components:

```
Components available:
- Button (62 variants)
- Card (with Header, Content, Footer)
- Input (text, email, password, search)
- Dialog (modal, sheet, alert)
...
```

### get_component

Get detailed info about a component:

```
Component: Button

Props:
- variant: 'default' | 'destructive' | 'outline' | 'ghost'
- size: 'default' | 'sm' | 'lg' | 'icon'
- asChild: boolean

Example:
<Button variant="outline" size="sm">
  > CLICK ME
</Button>
```

### list_themes

List all 18 available themes:

```
Themes:
- dracula (Purple, hue 280°)
- nord (Blue, hue 220°)
- tokyo-night (Violet, hue 250°)
- gruvbox (Orange, hue 45°)
...
```

### get_design_rules

Get design system rules:

```
Rules:
1. Always use mode.radius for full borders
2. Never hardcode colors
3. Use UPPERCASE for labels and buttons
4. Use design tokens from globals.css
...
```

### generate_page

Generate a new page with proper structure:

```
Generating: /dashboard/analytics

Created:
- src/app/(platform)/dashboard/analytics/page.tsx
- Uses existing components
- Follows design patterns
```

---

## How AI Uses MCP

When you ask AI to build something, MCP provides context:

**Without MCP:**
```
User: Create a stats card

AI: *guesses at component structure*
```

**With MCP:**
```
User: Create a stats card

AI: *queries list_components*
AI: *queries get_design_rules*
AI: Uses Card, Badge from UI library
AI: Applies mode.radius, mode.font
AI: Returns proper terminal-styled component
```

---

## Knowledge Base

The MCP server includes knowledge about:

### Components
- All 62 UI primitives with props
- 8 chart components with options
- Usage examples for each

### Design System
- Color tokens (OKLCH values)
- Spacing scale (8-point grid)
- Typography (monospace rules)
- Border radius patterns

### Patterns
- API route structure
- Authentication flow
- Database queries
- Error handling

### Architecture
- Directory structure
- Route conventions
- Component organization

---

## Custom Tools

Add custom tools for your project:

```typescript
// mcp-servers/fabrk/src/tools.ts

export const customTools = [
  {
    name: 'generate_api_route',
    description: 'Generate a new API route',
    parameters: {
      path: { type: 'string', description: 'Route path' },
      methods: { type: 'array', description: 'HTTP methods' },
    },
    handler: async ({ path, methods }) => {
      // Generate route code
      return generatedCode;
    },
  },
];
```

---

## Benefits

### Consistency
AI always uses correct patterns:
- Imports from the right paths
- Uses existing components
- Follows design rules

### Speed
AI doesn't need to explore:
- Component props are documented
- Examples are provided
- Patterns are known

### Quality
Generated code matches your standards:
- Proper TypeScript types
- Correct styling
- Follows architecture

---

## Supported AI Tools

The MCP server works with:

- **Claude Code** - Full integration
- **Cursor** - Via MCP config
- **Continue** - MCP support
- **Any MCP-compatible tool**

---

## Example Workflow

1. **Ask AI to build a feature:**
   "Create a dashboard with user stats and recent activity"

2. **AI queries MCP:**
   - `list_components` → Gets available components
   - `get_design_rules` → Gets styling requirements
   - `get_component('Card')` → Gets Card details

3. **AI generates code:**
   - Uses `Card`, `Table`, `Badge` from UI library
   - Applies `mode.radius`, `mode.font`
   - Follows terminal styling conventions

4. **Result:**
   Production-ready code that matches your codebase.

---

## Configuration

MCP server options:

```typescript
// mcp-servers/fabrk/src/config.ts
export const config = {
  // Include component documentation
  includeComponents: true,

  // Include design system rules
  includeDesignSystem: true,

  // Include code patterns
  includePatterns: true,

  // Include example code
  includeExamples: true,
};
```

---

## Getting Started

1. Build: `cd mcp-servers/fabrk && npm run build`
2. Configure your AI tool to use the MCP server
3. Start coding with AI assistance
4. AI automatically knows your codebase

Better AI assistance through context.

